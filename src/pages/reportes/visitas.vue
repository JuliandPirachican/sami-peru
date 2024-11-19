<script setup>
import { useAppStore } from '@/stores/app';
import JqxGrid from 'jqwidgets-scripts/jqwidgets-vue3/vue_jqxgrid.vue';


definePage({
  meta: {
    action: 'colombia/repo_come_visi',
    subject: 'colombia/repo_come_visi',
  },
})


const appStore = useAppStore();
const refGridGlobal=ref()

const formulario = ref({
  campana: null,
})


const headers = computed(() => {
  return [
    {
      text: 'Zona',
      dataField: 'codi_zona',
      width: '150',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist'
    },
    {
      text: 'Sector',
      dataField: 'codi_sect',
      width: '150',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist'
    },
    {
      text: 'Nro. Identificación',
      dataField: 'nume_iden',
      width: '170',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist'
      // , aggregates: ['count']
    },
    {
      text: 'Nombre',
      dataField: 'nomb_terc',
      width: '250',
      align: 'center',
      cellsalign: 'center',
    },
    {
      text: 'Apellidos',
      dataField: 'apel_terc',
      width: '250',
      align: 'center',
      cellsalign: 'center',
    },
    {
      text: 'Celular',
      dataField: 'celu_ter1',
      width: '150',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist'
    },
    {
      text: 'Dirección',
      dataField: 'dire_terc',
      width: '150',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist'
    },
    {
      text: 'Fecha',
      dataField: 'fech_visi',
      width: '180',
      align: 'center',
      cellsalign: 'center',
    },
    {
      text: 'Tipo',
      dataField: 'tipo_usua',
      width: '150',
      align: 'center',
      cellsalign: 'center',
    },
    {
      text: 'Perfil',
      dataField: 'valo_perf',
      width: '150',
      align: 'center',
      cellsalign: 'center',
    },
    {
      text: 'Status',
      dataField: 'esta_acti',
      width: '150',
      align: 'center',
      cellsalign: 'center',
    },
    {
      text: 'Observación',
      dataField: 'obse_visi',
      width: '150',
      align: 'center',
      cellsalign: 'center',
    },
    {
      text: 'Tipo  Visita',
      dataField: 'obse_deta',
      width: '150',
      align: 'center',
      cellsalign: 'center',
    },
    {
      text: 'Pasa Pedido',
      dataField: 'esta_pedi',
      width: '150',
      align: 'center',
      cellsalign: 'center',
    },
    {
      text: 'Celular App',
      dataField: 'celu_terc',
      width: '150',
      align: 'center',
      cellsalign: 'center',
    },
    {
      text: 'Correo Electronico',
      dataField: 'emai_terc',
      width: '150',
      align: 'center',
      cellsalign: 'center',
    },
    {
      text: 'Distancia',
      dataField: 'dist_visi',
      width: '150',
      align: 'center',
      cellsalign: 'center',
    },
    
 
    {
      text: 'Distancia < 50M',
      dataField: 'acti_esta',
      width: '150',
      align: 'center',
      cellsalign: 'center',
    },
    
  ]
});

const sourceGlobal = ref({
  localdata: [],
  datafields: [
    { name: 'nume_iden', type: 'integer' },
    { name: 'nomb_terc', type: 'string' },
    { name: 'apel_terc', type: 'string' },
    { name: 'codi_zona', type: 'string' },
    { name: 'codi_sect', type: 'string' },
    { name: 'celu_ter1', type: 'string' },
    { name: 'dire_terc', type: 'string' },
    { name: 'fech_visi', type: 'string' },
    { name: 'tipo_usua', type: 'string' },
    { name: 'valo_perf', type: 'string' },
    { name: 'esta_acti', type: 'string' },
    { name: 'obse_visi', type: 'string' },
    { name: 'obse_deta', type: 'string' },
    { name: 'dist_visi', type: 'string' },
    { name: 'acti_esta', type: 'string' },
    { name: 'celu_terc', type: 'string' },
    { name: 'emai_terc', type: 'string' },
    { name: 'esta_pedi', type: 'string' },
  ],
  datatype: 'json',
})
const adaptadorGlobal = new jqx.dataAdapter(sourceGlobal.value)
const localization =  {
    filterselectstring: ' ',
};

const items = ref([])

const campanaOptions = ref([])
const errorCampana = ref(false)
const errorMensajeCampana = ref('')

const rowsPerPage = ref(100)
const currentPage = ref(1)

const itemsDetalleVisible = computed(() => {
  // Calcula las filas visibles según la página actual y el número de filas por página
  const start = (currentPage.value - 1) * rowsPerPage.value
  const end = start + rowsPerPage.value
  
  return items.value.slice(start, end)
})

onMounted(async () => {
  appStore.titulo(`Reportes / Azzorti Maps`)
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

    items.value = []

    const { data } = await $api(`/api/sami/v1/reportes/visita-zona`, {
      method: "get",
      query: {
        campana: (formulario.value.campana === null) ? '' : formulario.value.campana,
      },
    })

    items.value = data.data_glob
    sourceGlobal.value.localdata = data.data_glob
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
  }
  items.value = []
  refGridGlobal.value.updatebounddata('cells')
}

const onExcel = async () => {
  try {
    appStore.mensaje('Generando archivo')
    appStore.loading(true)

    const { data } = await $api(`/api/sami/v1/reportes/visita-zona/excel`, {
      method: "post",
      body: {
        cabecera: headers.value,
        detalle: items.value,
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
            <VCard title="Buscar en Azzorti Maps">
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
            <VCard title="Lista Azzorti Maps">
              <VCardText>
                <JqxGrid
                  ref="refGridGlobal"
                  theme="material"
                  width="100%"
                  :height="450"
                  :columns="headers"
                  :source="adaptadorGlobal"
                  :localization="localization"
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
