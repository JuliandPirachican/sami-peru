<script setup>
import { useAppStore } from '@/stores/app';
import JqxGrid from 'jqwidgets-scripts/jqwidgets-vue3/vue_jqxgrid.vue';
import { useDisplay } from 'vuetify';

definePage({
  meta: {
    action: 'colombia/repo_cons_asig_sect',
    subject: 'colombia/repo_cons_asig_sect',
  },
})

const { mobile } = useDisplay()
const appStore = useAppStore()

const formulario = ref({
  campana: null,
  zona: null,
})

const campanaOptions = ref([])
const errorCampana = ref(false)
const errorMensajeCampana = ref('')

const zonaOptions = ref([])
const errorZona = ref(false)
const errorMensajeZona = ref('')

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
      key: 'nomb_zona',
      title: 'Nombre Zona',
    },
    {
      key: 'codi_sect',
      title: 'Sector',
    },
    {
      key: 'desc_sect',
      title: 'Nombre Sector',
    },
    {
      key: 'nume_iden',
      title: 'Premio',
    },
    {
      key: 'nomb_terc',
      title: 'Nombre(s) y Apellido(s)',
    },
  ]
})

const columnasGlobal = computed(() => {
  return [
    {
      text: 'Item',
      dataField: 'cons_fila',
      width: '65',
      align: 'center',
      cellsalign: 'center',
    },
    {
      text: 'Zona',
      dataField: 'codi_zona',
      width: '65',
      align: 'center',
      cellsalign: 'center',
    },
    {
      text: 'Nombre Zona',
      dataField: 'nomb_zona',
      width: '130',
      align: 'center',
      cellsalign: 'center',
    },
    {
      text: 'Sector',
      dataField: 'codi_sect',
      width: '65',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist',
    },
    {
      text: 'Nombre Sector',
      dataField: 'desc_sect',
      width: '130',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist',
    },
    {
      text: 'Numero Identificacion',
      dataField: 'nume_iden',
      width: '150',
      align: 'center',
      cellsalign: 'left',
    },
    {
      text: 'Nombre(s) y apellido(s)',
      dataField: 'nomb_terc',
      align: 'center',
      width: '350',
      cellsalign: 'left',
    },
  ]
})

const sourceGlobal = ref({
  localdata: [],
  datafields: [
    { name: 'cons_fila', type: 'string' },
    { name: 'codi_zona', type: 'string' },
    { name: 'nomb_zona', type: 'string' },
    { name: 'codi_sect', type: 'string' },
    { name: 'desc_sect', type: 'string' },
    { name: 'nume_iden', type: 'string' },
    { name: 'nomb_terc', type: 'string' },
  ],
  datatype: 'json',
})

const adaptadorGlobal = new jqx.dataAdapter(sourceGlobal.value)
const refGridGlobal = ref()

const localization = appStore.localization

onMounted(async () => {
  appStore.titulo(`Reportes / Consulta Asignacion Sectores`)
  await obtenerCampana()
  await obtenerZona()
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

const obtenerZona = async () => {
  try {
    appStore.mensaje('Obteniendo zona')
    appStore.loading(true)

    const { data } = await $api(`/api/comun/v1/zonas`, {
      method: "GET",
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

    const { data } = await $api(`/api/sami/v1/reportes/consulta-asignacion-sector`, {
      method: "get",
      query: {
        campana: (formulario.value.campana === null) ? '' : formulario.value.campana,
        zona: (formulario.value.zona === null) ? '' : formulario.value.zona,
      },
    })
    console.log(data)
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
        if (key == 'zona') {
          errorZona.value = true
          errorMensajeZona.value = data[key]
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
  errorZona.value = false
  errorMensajeZona.value = ''
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

      const { data } = await $api(`/api/sami/v1/reportes/lider-ganadoras-zona/excel`, {
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
            <VCard title="Buscar Asignaciones">
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
                </VRow>
              </VCardText>
            </VCard>
          </VCol>

          <VCol cols="12">
            <VCard title="Listado De Asignaciones">
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
