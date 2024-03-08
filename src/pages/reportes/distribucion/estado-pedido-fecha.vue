<script setup>
import { useAppStore } from '@/stores/app'
import { VDataTable } from 'vuetify/labs/VDataTable'

definePage({
  meta: {
    action: 'peru/repo_dist_esta_pedi_fech',
    subject: 'peru/repo_dist_esta_pedi_fech',
  },
})

const userData = JSON.parse(localStorage.getItem('userData'))
const appStore = useAppStore()

const formulario = ref({
  campana: null,
  zona: null,
  sector: null,
  identificacion: null,
})

const campanaOptions = ref([])
const errorCampana = ref(false)
const errorMensajeCampana = ref('')

const zonaOptions = ref([])
const errorZona = ref(false)
const errorMensajeZona = ref('')

const sectorOptions = ref([])
const errorSector = ref(false)
const errorMensajeSector = ref('')

const errorIdentificacion = ref(false)
const errorMensajeIdentificacion = ref('')

const items = ref([])

const headers = computed(() => {
  return [
    { key: 'cons_fila', title: 'Item' },
    { key: 'codi_camp', title: 'Campaña' },
    { key: 'codi_zona', title: 'Zona' },
    { key: 'codi_sect', title: 'Sector' },
    { key: 'nume_iden', title: 'Nro ident.' },
    { key: 'nomb_comp', title: 'Nombre(s) y Apellido(s)' },
    { key: 'nume_fact', title: 'Pedido' },
    { key: 'fech_fact', title: 'Picking' },
    { key: 'fech_desp', title: 'Transito' },
    { key: 'fech_asig', title: 'Reparto' },
    { key: 'fech_entr', title: 'Entregado' },
    { key: 'fech_devo', title: 'Devolución' },
  ]
})

const loginData = JSON.parse(localStorage.getItem('login'))

onMounted(async () => {
  appStore.titulo(`Reportes / Distribucion / Estado pedido fecha`)
  await obtenerCampana()
  await obtenerZona()
})

const obtenerCampana = async () => {
  try {
    appStore.mensaje('Obteniendo campaña')
    appStore.loading(true)

    const { data } = await $api(`/api/comun/v1/campanas`, {
      method: "get",
    })
    
    const itemCampana = data.data_glob.slice(0, 40)
    
    itemCampana.forEach(element => 
      campanaOptions.value.push({
        id: element.codi_camp,
        text: element.codi_camp,
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

const obtenerZona = async () => {
  try {
    appStore.mensaje('Obteniendo zona')
    appStore.loading(true)

    const { data } = await $api(`/api/comun/v1/zonas`, {
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

const onZonaChange = async () => {
  try {
    sectorOptions.value = []
    formulario.value.sector = null

    appStore.mensaje('Obteniendo sectores')
    appStore.loading(true)

    const { data } = await $api(`/api/comun/v1/sectores`, {
      method: "get",
      query: {
        zona: (formulario.value.zona === null) ? '' : formulario.value.zona,
      },
    })

    const itemSector = data.data_glob

    itemSector.forEach(element =>
      sectorOptions.value.push({
        id: element.codi_sect,
        text: element.codi_sect,
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

const onGenerar = async () => {
  try {
    appStore.mensaje('Obteniendo información')
    appStore.loading(true)
    limpiarValidacion()

    items.value = []

    const { data } = await $api(`/api/sami/v1/reportes/estado-pedido-fecha`, {
      method: "get",
      query: {
        campana: (formulario.value.campana === null) ? '' : formulario.value.campana,
        zona: (formulario.value.zona === null) ? '' : formulario.value.zona,
        sector: (formulario.value.sector === null) ? '' : formulario.value.sector,
        identificacion: (formulario.value.identificacion === null) ? '' : formulario.value.identificacion,
      },
    })

    items.value = data.data_glob
    
  } catch (error) {
    const { data } = error.response._data    
    if (typeof data != "undefined") {
      for (var key in data)
      {
        if (key == 'campana') {
          errorCampana.value = true
          errorMensajeCampana.value = data[key]
        }
        if (key == 'zona') {
          errorZona.value = true
          errorMensajeZona.value = data[key]
        }
        if (key == 'identificacion') {
          errorIdentificacion.value = true
          errorMensajeIdentificacion.value = data[key]
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
    campana: null,
    zona: null,
    sector: null,
    identificacion: null,
  }

  items.value = []
}

const onExcel = async () => {
  try {
    appStore.mensaje('Generando archivo')
    appStore.loading(true)

    const { data } = await $api(`/api/sami/v1/reportes/estado-pedido-fecha/excel`, {
      method: "post",
      body: {
        data: items.value,
      },
    })
    
    window.open(`${$base}/temporales/${data}`, '_blank')
  } catch (e) {
  }
  finally {
    appStore.loading(false)
  }
}

const limpiarValidacion = () => {
  errorCampana.value = false
  errorMensajeCampana.value = ''
  errorZona.value = false
  errorMensajeZona.value = ''
  errorIdentificacion.value = false
  errorMensajeIdentificacion.value = ''
}
</script>

<template>
  <div>
    <AppPlantilla>
      <template #botones>
        <GenerarBoton @procesar="onGenerar" />
        <ExcelBoton @procesar="onExcel" />
        <LimpiarBoton @procesar="onLimpiar" />
      </template>
      <template #contenido>
        <VRow>
          <VCol cols="12">
            <VCard title="Buscar pedidos">
              <VCardText>
                <VRow justify="space-between">
                  <VCol
                    cols="12"
                    md="3"
                  >
                    <AppSelect
                      v-model="formulario.campana"
                      :items="campanaOptions"
                      label="Campaña"
                      placeholder="Seleccionar campaña"
                      item-title="text"
                      item-value="id"
                      :error="errorCampana"
                      :error-messages="errorMensajeCampana"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="3"
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
                      @update:model-value="onZonaChange"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="3"
                  >
                    <AppSelect
                      v-model="formulario.sector"
                      :items="sectorOptions"
                      label="Sector"
                      placeholder="Seleccionar sector"
                      item-title="text"
                      item-value="id"
                      :error="errorSector"
                      :error-messages="errorMensajeSector"
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="3"
                  >
                    <AppTextField
                      v-model="formulario.identificacion"
                      label="Nro. identificación"
                      type="text"
                      placeholder="Ingresar nro. identificación"
                      autocomplete="off"
                      :error="errorIdentificacion"
                      :error-messages="errorMensajeIdentificacion"
                    />
                  </VCol>
                </VRow>
              </VCardText>
            </VCard>
          </VCol>

          <VCol cols="12">
            <VCard title="Lista de pedidos">
              <VCardText>
                <VDataTable
                  :headers="headers"
                  :items="items"
                  :items-per-page="-1"
                  class="text-no-wrap"
                  
                  fixed-header
                  height="400"
                >
                  <template #bottom />
                </VDataTable>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </template>
    </AppPlantilla>
  </div>
</template>
