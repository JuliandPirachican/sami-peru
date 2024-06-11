<script setup>
import { useAppStore } from '@/stores/app';
import { EncryptStorage } from 'encrypt-storage';
import mapboxgl from 'mapbox-gl';
import { PerfectScrollbar } from 'vue3-perfect-scrollbar';

definePage({
  meta: {
    action: 'colombia/repo_come_trac_zona',
    subject: 'colombia/repo_come_trac_zona',
  },
})

const encryptStorage = new EncryptStorage('AZZORTI-SAMI', {
  storageType: 'localStorage',
})

const userData = encryptStorage.getItem('userData')
const appStore = useAppStore()
const accessToken = 'pk.eyJ1Ijoic29jaWFsZXhwbG9yZXIiLCJhIjoiREFQbXBISSJ9.dwFTwfSaWsHvktHrRtpydQ'
const map = ref()
const isLeftSidebarOpen = ref(false)

const formulario = ref({
  zona: null,
  fecha: null,
})



const zonaOptions = ref([])
const errorZona = ref(false)
const errorMensajeZona = ref('')

const errorFecha = ref(false)
const errorMensajeFecha = ref('')

const latitud = ref('-12.0431800')
const longitud = ref('-77.0282400')
const geoJson = ref([])

const posicionActual = () => {
  navigator.geolocation.getCurrentPosition(function(data) {
    latitud.value = data.coords.latitude
    longitud.value = data.coords.longitude
  })
}

onMounted(async () => {
  appStore.titulo(`Reportes / Tracking zona`)
  await obtenerZona()
  posicionActual()
  mapboxgl.accessToken = accessToken
  map.value = new mapboxgl.Map({
    container: 'mapContainer',
    style: 'mapbox://styles/mapbox/light-v9',
    center: [
      longitud.value,
      latitud.value,
    ],
    zoom: 15,
  })
})

watch(latitud, () => {
  map.value.flyTo({
    center: [
      longitud.value,
      latitud.value,
    ],
    zoom: 16,
  })
})

const obtenerZona = async () => {
  try {
    appStore.mensaje('Obteniendo zona')
    appStore.loading(true)

    const { data } = await $api( `/api/comun/v1/zonas`, {
      method: "get",
      query: {
        codigo: userData.codi_perf,
      },
    })
    

    const itemZona = data.data_glob
    
    itemZona.forEach(element => 
      zonaOptions.value.push({
        id: element.codi_zona,
        text: element.codi_zona,
      }),
    )
  } catch (e) {
    if(e.response !== undefined) {
      console.log(e.response._data)
    }
  }
  finally {
    appStore.loading(false)
  }
}

var currentMarkers =ref([])

const onGenerar = async () => {
  try {
    appStore.mensaje('Obteniendo información')
    appStore.loading(true)
    limpiarValidacion()
    isLeftSidebarOpen.value = false
    if (currentMarkers.value!==null) {
      for (var i = currentMarkers.value.length - 1; i >= 0; i--) {
        currentMarkers.value[i].remove()
      }
      posicionActual()
    }

    const { data } = await $api(`/api/sami/v1/reportes/tracking-zona`, {
      method: "get",
      query: {
        zona: (formulario.value.zona === null) ? '' : formulario.value.zona,
        fecha: (formulario.value.fecha === null) ? '' : formulario.value.fecha,
      },
    })

    geoJson.value = data.data_glob

    for (let index = 0; index < geoJson.value.length; index++) {
      const el = document.createElement('div')
      if(index == 0 || index == (geoJson.value.length - 1) ){
        el.className = 'marker-inicio'
      } else {
        el.className = 'marker'
      }
      
      latitud.value = geoJson.value[0].cy
      longitud.value = geoJson.value[0].cx

      var oneMarker= new mapboxgl.Marker(el)
        .setLngLat([geoJson.value[index].cx, geoJson.value[index].cy])
        .addTo(map.value)

      currentMarkers.value.push(oneMarker)
    }
    isLeftSidebarOpen.value = true
  } catch (error) {
    console.log(error)
    
    const { data } = error.response._data    
    if (typeof data != "undefined") {
      for (var key in data)
      {
        if (key == 'zona') {
          errorZona.value = true
          errorMensajeZona.value = data[key]
        }
        if (key == 'fecha') {
          errorFecha.value = true
          errorMensajeFecha.value = data[key]
        }
      }
    }
  }
  finally {
    appStore.loading(false)
  }
}

const onLimpiar= async () => {
  formulario.value = {
    zona: null,
    fecha: null,
  }

  if (currentMarkers.value!==null) {
    for (var i = currentMarkers.value.length - 1; i >= 0; i--) {
      currentMarkers.value[i].remove()
    }
    posicionActual()
  }
  isLeftSidebarOpen.value = false
}

const limpiarValidacion = () => {
  errorZona.value = false
  errorMensajeZona.value = ''
  errorFecha.value = false
  errorMensajeFecha.value = ''
}

const onSeleccionarTracking = (cx, cy) => {
  latitud.value = cy
  longitud.value = cx
}
</script>

<template>
  <div>
    <AppPlantilla>
      <template #botones>
        <GenerarBoton @procesar="onGenerar" />
        <LimpiarBoton @procesar="onLimpiar" />
      </template>
      <template #contenido>
        <VRow>
          <VCol cols="12">
            <VCard title="Buscar tracking">
              <VCardText>
                <VRow justify="space-between">
                  <VCol
                    cols="12"
                    md="4"
                  >
                    <AppSelect
                      v-model="formulario.zona"
                      :items="zonaOptions"
                      label="Zona"
                      placeholder="Seleccionar zona"
                      item-title="text"
                      item-value="id"
                      :error="errorZona"
                      :error-messages="errorMensajeZona"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="4"
                  >
                    <AppDateTimePicker
                      v-model="formulario.fecha"
                      label="Fecha"
                      placeholder="Seleccionar fecha"
                      :error="errorFecha"
                      :error-messages="errorMensajeFecha"
                    />
                  </VCol>
                </VRow>
              </VCardText>
            </VCard>
          </VCol>

          <VCol cols="12">
            <VLayout class="fleet-app-layout">
              <VNavigationDrawer
                v-model="isLeftSidebarOpen"
                width="320"
                absolute
                touchless
                location="start"
              >
                <VCard
                  class="h-100 fleet-navigation-drawer"
                  flat
                >
                  <VCardItem>
                    <VCardTitle>
                      Tranking zona {{ formulario.zona }}
                    </VCardTitle>

                    <template #append>
                      <IconBtn
                        class="d-lg-none navigation-close-btn"
                        @click="isLeftSidebarOpen = !isLeftSidebarOpen"
                      >
                        <VIcon icon="tabler-x" />
                      </IconBtn>
                    </template>
                  </VCardItem>

                  <!-- 👉 Perfect Scrollbar -->
                  <PerfectScrollbar
                    :options="{ wheelPropagation: false, suppressScrollX: true }"
                    style="block-size: calc(100% - 100px);"
                  >
                    <VCardText class="pt-0">
                      <div
                        v-for="(data, index) in geoJson"
                        :key="index"
                        class="mb-6"
                      >
                        <VExpandTransition mode="out-in">
                          <div @click="onSeleccionarTracking(data.cx, data.cy)">
                            <VTimeline
                              align="start"
                              truncate-line="both"
                              side="end"
                              density="compact"
                              line-thickness="1"
                              class="ps-2"
                            >
                              <VTimelineItem
                                icon="tabler-circle-check"
                                dot-color="rgb(var(--v-theme-surface))"
                                icon-color="success"
                                fill-dot
                                size="22"
                                :elevation="0"
                              >
                                <div class="text-sm text-uppercase text-success font-weight-medium">
                                  {{ data.codi_usua }}
                                </div>
                                <div class="app-timeline-title">
                                  {{ data.acti_hora }}
                                </div>
                                <div class="app-timeline-text">
                                  Latitud: {{ data.cy }}
                                </div>
                                <div class="app-timeline-text">
                                  Longitud: {{ data.cx }}
                                </div>
                              </VTimelineItem>
                            </VTimeline>
                          </div>
                        </VExpandTransition>
                      </div>
                    </VCardText>
                  </PerfectScrollbar>
                </VCard>
              </VNavigationDrawer>
              <VMain>
                <div class="h-100">
                  <div
                    id="mapContainer"
                    class="basemap"
                  />
                </div>
              </VMain>
            </VLayout>
          </VCol>
        </VRow>
      </template>
    </AppPlantilla>
  </div>
</template>

<style lang="scss">
/* stylelint-disable-next-line scss/load-no-partial-leading-underscore */
@use "@styles/variables/_vuetify.scss";
/* stylelint-disable-next-line scss/load-no-partial-leading-underscore */
@use "@core/scss/base/_mixins.scss";
@import "mapbox-gl/dist/mapbox-gl.css";

/* stylelint-disable-next-line indentation */
.fleet-app-layout {
  border-radius: vuetify.$card-border-radius;

  @include mixins.elevation(vuetify.$card-elevation);

  $sel-fleet-app-layout: &;

  @at-root {
    .skin--bordered {
      @include mixins.bordered-skin($sel-fleet-app-layout);
    }
  }
}

.navigation-toggle-btn{
  position: absolute;
  z-index: 1;
  inset-block-start: 1rem;
  inset-inline-start: 1rem;
}

.navigation-close-btn{
  position: absolute;
  z-index: 1;
  inset-block-start: 1rem;
  inset-inline-end: 1rem;
}

.basemap {
  block-size: 100%;
  inline-size: 100%;
}

.flat-picker-custom-style {
  inset-block: auto 8px;
}

.marker-focus {
  filter: drop-shadow(0 0 7px rgb(var(--v-theme-primary)));
}

.mapboxgl-ctrl-bottom-left,
.mapboxgl-ctrl-bottom-right {
  display: none;
}

.fleet-navigation-drawer{
  .v-timeline .v-timeline-divider__dot .v-timeline-divider__inner-dot{
    box-shadow: none;
  }
}


.marker {
  position: absolute;
  border: 4px solid #000;
  border-radius: 50% 50% 50% 0;
  block-size: 20px;
  inline-size: 20px;
  inset-block-start: 40%;
  inset-inline-start: 50%;
  margin-inline-start: -115px;
  transform: rotate(-45deg);
}

.marker::after {
  position: absolute;
  border-radius: 50%;
  background-color: #000;
  block-size: 10px;
  content: '';
  inline-size: 10px;
  inset-block-start: 50%;
  inset-inline-start: 50%;
  margin-block-start: -5px;
  margin-inline-start: -5px;
}

.marker-inicio {
  position: absolute;
  border: 4px solid #ff5733;
  border-radius: 50% 50% 50% 0;
  block-size: 20px;
  inline-size: 20px;
  inset-block-start: 40%;
  inset-inline-start: 50%;
  margin-inline-start: -115px;
  transform: rotate(-45deg);
}

.marker-inicio::after {
  position: absolute;
  border-radius: 50%;
  background-color: #ff5733;
  block-size: 10px;
  content: '';
  inline-size: 10px;
  inset-block-start: 50%;
  inset-inline-start: 50%;
  margin-block-start: -5px;
  margin-inline-start: -5px;
}

.mapboxgl-popup {
  max-inline-size: 200px;
}
/* stylelint-disable-next-line selector-id-pattern */
#mapContainer {
  block-size: 60vh !important;
}
</style>
