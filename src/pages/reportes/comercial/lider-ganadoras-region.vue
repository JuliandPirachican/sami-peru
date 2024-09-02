<script setup>
import { useAppStore } from '@/stores/app'
import JqxGrid from 'jqwidgets-scripts/jqwidgets-vue3/vue_jqxgrid.vue'
import { useDisplay } from 'vuetify'

definePage({
  meta: {
    action: 'colombia/repo_come_lide_gana_regi',
    subject: 'colombia/repo_come_lide_gana_regi',
  },
})

const encryptStorage = new EncryptStorage('AZZORTI-SAMI', {
  storageType: 'localStorage',
})

const { mobile } = useDisplay()
const userData = encryptStorage.getItem('userData')
const appStore = useAppStore()

const formulario = ref({
  campana: null,
  area: null,
})

const campanaOptions = ref([])
const errorCampana = ref(false)
const errorMensajeCampana = ref('')

const areaOptions = ref([])
const errorArea = ref(false)
const errorMensajeArea = ref('')

const items = ref([])

const headers = computed(() => {
  return [
    {
      key: 'cons_fila',
      title: 'Item',
    },
    {
      key: 'codi_zona',
      title: 'Zona',
    },
    {
      key: 'nume_lide',
      title: 'Nro lideres',
    },
    {
      key: 'nume_gana',
      title: 'Nro ganadoras',
    },
    {
      key: 'porc_gana',
      title: 'Porcentaje',
    },
  ]
})

const columnasGlobal = computed(() => {
  return [
    {
      text: 'Item',
      dataField: 'cons_fila',
      width: '75',
      align: 'center',
      cellsalign: 'center',
    },
    {
      text: 'Zona',
      dataField: 'codi_zona',
      width: '225',
      align: 'center',
      cellsalign: 'center',
    },
    {
      text: 'Nro lideres',
      dataField: 'nume_lide',
      width: '225',
      align: 'center',
      cellsalign: 'center',
    },
    {
      text: 'Nro ganadoras',
      dataField: 'nume_gana',
      width: '225',
      align: 'center',
      cellsalign: 'center',
    },
    {
      text: 'Porcentaje',
      dataField: 'porc_gana',
      width: '225',
      align: 'center',
      cellsalign: 'center',
    },
  ]
})

const sourceGlobal = ref({
  localdata: [],
  datafields: [
    { name: 'cons_fila', type: 'string' },
    { name: 'codi_zona', type: 'string' },
    { name: 'nume_lide', type: 'string' },
    { name: 'nume_gana', type: 'string' },
    { name: 'porc_gana', type: 'string' },
  ],
  datatype: 'json',
})

const adaptadorGlobal = new jqx.dataAdapter(sourceGlobal.value)
const refGridGlobal = ref()

const localization = appStore.localization

onMounted(async () => {
  appStore.titulo(`Reportes / Lideres ganadoras región`)
  await obtenerCampana()
  await obtenerArea()
})

const obtenerCampana = async () => {
  try {
    appStore.mensaje('Obteniendo campaña')
    appStore.loading(true)


    const { data } = await $api(`/api/comun/v1/campanas`, {
      method: "GET",
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
      // eslint-disable-next-line no-console
      console.log(e.response._data)
    }
  }
  finally {
    appStore.loading(false)
  }
}

const obtenerArea = async () => {
  try {
    appStore.mensaje('Obteniendo región')
    appStore.loading(true)

    const { data } = await $api(`/api/comun/v1/areas`, {
      method: "get",

      query: {
        codigo: userData.codi_perf,
      },
    })

    const itemArea = data.data_glob
    
    itemArea.forEach(element => 
      areaOptions.value.push({
        id: element.codi_area,
        text: element.codi_area,
      }),
    )
  } catch (e) {
    if(e.response !== undefined) {
      // eslint-disable-next-line no-console
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

    const { data } = await $api(`/api/sami/v1/reportes/lider-ganadoras-region`, {
      method: "get",
      query: {
        campana: (formulario.value.campana === null) ? '' : formulario.value.campana,
        area: (formulario.value.area === null) ? '' : formulario.value.area,
      },
    })

    items.value = data.data_glob

    sourceGlobal.value.localdata =  data.data_glob
    refGridGlobal.value.updatebounddata('cells')
    refGridGlobal.value.refreshfilterrow()
  } catch (error) {
    const { data } = error.response._data    
    if (typeof data != "undefined") {
      for (var key in data)
      {
        if (key == 'campana') {
          errorCampana.value = true
          errorMensajeCampana.value = data[key]
        }
        if (key == 'area') {
          errorArea.value = true
          errorMensajeArea.value = data[key]
        }
      }
    }
  }
  finally {
    appStore.loading(false)
  }
}

const onLimpiar= async () => {
  sourceGlobal.value.localdata =  []
  refGridGlobal.value.updatebounddata('cells')

  items.value = []
}

const limpiarValidacion = () => {
  errorCampana.value = false
  errorMensajeCampana.value = ''
  errorArea.value = false
  errorMensajeArea.value = ''
}

const onExcel = async () => {
  const dataInfoGlob = refGridGlobal.value.getdatainformation()
  const dataRowsGlob = dataInfoGlob.rowscount

  if(dataRowsGlob == 0 ) {
    appStore.mensajeSnackbar('No tiene información para exportar.')
    appStore.color("error")
    appStore.snackbar(true)
  } else {
    try {
      appStore.mensaje('Generando archivo')
      appStore.loading(true)

      const { data } = await $api(`/api/sami/v1/reportes/lider-ganadoras-region/excel`, {
        method: "post",
        body: {
          cabecera: headers.value,
          detalle: items.value,
        },
      })
    
      window.open(`${$base}/temporales/${data}`, '_blank')
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
    finally {
      appStore.loading(false)
    }
  }
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
            <VCard title="Buscar">
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
                  <VCol
                    cols="12"
                    md="4"
                  >
                    <AppSelect
                      v-model="formulario.area"
                      :items="areaOptions"
                      label="Región"
                      placeholder="Seleccionar región"
                      item-title="text"
                      item-value="id"
                      :error="errorArea"
                      :error-messages="errorMensajeArea"
                    />
                  </VCol>
                </VRow>
              </VCardText>
            </VCard>
          </VCol>

          <VCol cols="12">
            <VCard>
              <VCardText>
                <JqxGrid
                  ref="refGridGlobal"
                  theme="material"
                  width="100%"
                  :localization="localization"
                  :height="450"
                  :columns="columnasGlobal"
                  :source="adaptadorGlobal"
                  columnsresize
                  columnsautoresize
                  enableanimations
                  sortable
                  sortmode="many"
                  filterable
                  :altrows="false"
                  :showemptyrow="false"
                  columnsreorder
                  selectionmode="singlecell"
                  scrollmode="logical"
                  showfilterrow
                  :columnsmenu="false"
                  :editable="false"
                />
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </template>
    </AppPlantilla>
  </div>
</template>
