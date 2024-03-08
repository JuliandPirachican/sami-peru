<script setup>
import { useAppStore } from '@/stores/app'
import { VDataTable } from 'vuetify/labs/VDataTable'

definePage({
  meta: {
    action: 'peru/repo_come_insc_movi',
    subject: 'peru/repo_come_insc_movi',
  },
})

const appStore = useAppStore()
const userData = JSON.parse(localStorage.getItem('userData'))

const items = ref([])
const errorCampana = ref(false)
const errorMensajeCampana = ref('')

const formulario = ref({
  campana: null,
})

const campanaOptions = ref([])

const headers = [
  {
    title: 'Región',
    key: 'codi_area',
  },
  {
    title: 'Zona app',
    key: 'zona_zona',
  },
  {
    title: 'Sector app',
    key: 'zona_sect',
  },
  {
    title: 'Zona',
    key: 'codi_zona',
  },
  {
    title: 'Sector',
    key: 'codi_sect',
  },
  {
    title: 'Documento ident.',
    key: 'nume_iden',
  },
  {
    title: 'Nombre(s) y apellido(s)',
    key: 'nomb_terc',
  },
  {
    title: 'Estado',
    key: 'esta_insc',
  },
  {
    title: 'Usuario',
    key: 'usua_modi',
  },
  {
    title: 'Fecha',
    key: 'fech_modi',
  },
  {
    title: '1ra Fact.',
    key: 'fech_fact',
  },
  {
    title: '1ra Desp.',
    key: 'fech_desp',
  },
  {
    title: 'Ult. Fact.',
    key: 'ulti_fact',
  },
  {
    title: 'Folio',
    key: 'nume_foli',
  },
  {
    title: 'Latitud',
    key: 'coor_cx',
  },
  {
    title: 'Longitud',
    key: 'coor_cy',
  },
  {
    title: 'Observación',
    key: 'obse_insc',
  },
  {
    title: 'Fecha app',
    key: 'hora_zona',
  },
]

const loginData = JSON.parse(localStorage.getItem('login'))

onMounted(async () => {
  appStore.titulo(`Reportes / Inscripciones`)
  await obtenerCampana()
})

const obtenerCampana = async () => {
  try {
    appStore.mensaje('Obteniendo campaña')
    appStore.loading(true)

    const { data } = await $api(`/api/comun/v1/campanas/futuras`, {
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

const onGenerar = async () => {
  try {
    appStore.mensaje('Obteniendo información')
    appStore.loading(true)
    limpiarValidacion()
    onLimpiar()

    const { data } = await $api(`/api/sami/v1/reportes/inscripcion-asesora-movil`, {
      method: "get",
      query: {
        campana: (formulario.value.campana === null) ? '' : formulario.value.campana,
      },
    })

    items.value = data.data_glob
  } catch (e) {
  }
  finally {
    appStore.loading(false)
  }
}

const onLimpiar= async () => {
  items.value = []
}

const onExcel = async () => {
  try {
    appStore.mensaje('Generando archivo')
    appStore.loading(true)

    const { data } = await $api(`/api/sami/v1/reportes/inscripcion-asesora-movil/excel`, {
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
            <VCard title="Buscar inscripciones">
              <VCardText>
                <VRow justify="space-between">
                  <VCol
                    cols="12"
                    md="4"
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
                </VRow>
              </VCardText>
            </VCard>
          </VCol>

          <VCol cols="12">
            <VCard title="Lista de inscripciones">
              <VCardText>
                <VDataTable
                  :headers="headers"
                  :items="items"         
                  fixed-header
                  height="400"
                  class="text-no-wrap"
                  :items-per-page="-1"
                >
                  <template #item.nume_foli="{ item }">
                    <VChip
                      v-if="item.nume_foli.toLowerCase() === '0' || item.nume_foli.toLowerCase() === null || item.nume_foli.toLowerCase() === '' "
                      color="error"
                    >
                      {{ item.nume_foli }}
                    </VChip>
                    <span v-else>
                      {{ item.nume_foli }}
                    </span>
                  </template>
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

<style lang="scss">
.flat-picker-custom-style {
  inset-block: auto 8px;
}
</style>
