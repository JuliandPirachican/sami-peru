<!-- eslint-disable camelcase -->
<script setup>
import { useAppStore } from '@/stores/app';
import { EncryptStorage } from 'encrypt-storage';
import JqxGrid from 'jqwidgets-scripts/jqwidgets-vue3/vue_jqxgrid.vue';


definePage({
  meta: {
    action: 'colombia/repo_come_prep_pedi',
    subject: 'colombia/repo_come_prep_pedi',
  },
})

const encryptStorage = new EncryptStorage('AZZORTI-SAMI', {
  storageType: 'localStorage',
})

const userData = encryptStorage.getItem('userData')
const appStore = useAppStore()
const refGridGlobal=ref();
const refGridDetalle=ref();

const formulario = ref({
  campana: null,
  zona: null,
})

const filtro = ref('')
const itemsGlobal = ref([])
const itemsDetalleTotal = ref([])

const itemsDetalle = computed(() => {
  if (filtro.value != '') {
    return itemsDetalleTotal.value.filter(item => {
      return (item['nume_iden'] || "").toString().toUpperCase().includes(filtro.value.toString().toUpperCase())

    })
  } else {
    return itemsDetalleTotal.value
  }
});

const headersGlobal = computed(() => {
  return [
    {
      text: '',
      dataField: 'acciones',
      width: '50',
      align: 'center',
      cellsalign: 'center',
      // filtertype: 'checkedlist'
    },
    {
      text: 'Corte',
      dataField: 'codi_cort',
      width: '100',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist'
    },
    {
      text: 'Region',
      dataField: 'codi_area',
      width: '100',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist'
    },
    {
      text: 'Zona',
      dataField: 'codi_zona',
      width: '100',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist'
    },
    {
      text: 'Sector',
      dataField: 'codi_sect',
      width: '100',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist'
    },
    {
      text: 'Nro. Iden',
      dataField: 'nume_iden',
      width: '160',
      align: 'center',
      cellsalign: 'center'
      // , aggregates: ['count']
    },
    {
      text: 'Nombre(s) y Apellido(s)',
      dataField: 'nomb_terc',
      width: '250',
      align: 'center',
      cellsalign: 'center',
    },
    {
      text: 'Azzorti Proyecta',
      dataField: 'cant_prep',
      width: '180',
      align: 'center',
      cellsalign: 'center',
    },
    {
      text: 'Pedido',
      dataField: 'cant_pedi',
      width: '150',
      align: 'center',
      cellsalign: 'center',
    },
    {
      text: '% Cumplimiento',
      dataField: 'porc_prep',
      width: '150',
      align: 'center',
      cellsalign: 'center',
    },
    
  ]
});

const sourceGlobal = ref({
  localdata: [],
  datafields: [
    { name: 'acciones', type: 'string' },
    { name: 'codi_cort', type: 'string' },
    { name: 'codi_area', type: 'string' },
    { name: 'codi_zona', type: 'string' },
    { name: 'codi_sect', type: 'string' },
    { name: 'nume_iden', type: 'integer' },
    { name: 'nomb_terc', type: 'string' },
    { name: 'cant_prep', type: 'string' },
    { name: 'cant_pedi', type: 'string' },
    { name: 'porc_prep', type: 'string' },
  ],
  datatype: 'json',
})
const adaptadorGlobal = new jqx.dataAdapter(sourceGlobal.value)
const localization =  {
    filterselectstring: ' ',
};

const headersDetalle1 = [
  {
    title: 'Corte',
    key: 'codi_cort',
  },
  {
    title: 'Región',
    key: 'codi_area',
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
    title: 'Nro ident.',
    key: 'nume_iden',
  },
  {
    title: 'Nombre(s) y Apellido(s)',
    key: 'nomb_terc',
  },
  {
    title: 'Código',
    key: 'codi_prod',
  },
  {
    title: 'Descripción',
    key: 'nomb_prod',
  },
  {
    title: 'Cantidad',
    key: 'cant_prod',
  },
  {
    title: 'Página',
    key: 'nume_pagi',
  },
  {
    title: 'Estado',
    key: 'esta_prep',
  },
]

const headersDetalle = computed(() => {
  return [
    {
      text: 'Corte',
      dataField: 'codi_cort',
      width: '100',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist'
    },
    {
      text: 'Region',
      dataField: 'codi_area',
      width: '100',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist'
    },
    {
      text: 'Zona',
      dataField: 'codi_zona',
      width: '100',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist'
    },
    {
      text: 'Sector',
      dataField: 'codi_sect',
      width: '100',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist'
    },
    {
      text: 'Nro. Iden',
      dataField: 'nume_iden',
      width: '160',
      align: 'center',
      cellsalign: 'center'
      // , aggregates: ['count']
    },
    {
      text: 'Nombre(s) y Apellido(s)',
      dataField: 'nomb_terc',
      width: '250',
      align: 'center',
      cellsalign: 'center',
    },
    {
      text: 'Código',
      dataField: 'codi_prod',
      width: '180',
      align: 'center',
      cellsalign: 'center',
    },
    {
      text: 'Descripción',
      dataField: 'nomb_prod',
      width: '150',
      align: 'center',
      cellsalign: 'center',
    },
    {
      text: 'Cantidad',
      dataField: 'cant_prod',
      width: '150',
      align: 'center',
      cellsalign: 'center',
    },
    {
      text: 'Página',
      dataField: 'nume_pagi',
      width: '150',
      align: 'center',
      cellsalign: 'center',
    },
    {
      text: 'Estado',
      dataField: 'esta_prep',
      width: '150',
      align: 'center',
      cellsalign: 'center',
    },
    
  ]
});

const sourceDetalle = ref({
  localdata: [],
  datafields: [
    { name: 'acciones', type: 'string' },
    { name: 'codi_cort', type: 'string' },
    { name: 'codi_area', type: 'string' },
    { name: 'codi_zona', type: 'string' },
    { name: 'codi_sect', type: 'string' },
    { name: 'nume_iden', type: 'integer' },
    { name: 'nomb_terc', type: 'string' },
    { name: 'codi_prod', type: 'string' },
    { name: 'nomb_prod', type: 'string' },
    { name: 'cant_prod', type: 'string' },
    { name: 'nume_pagi', type: 'string' },
    { name: 'esta_prep', type: 'string' },
  ],
  datatype: 'json',
})
const adaptadorDetalle = new jqx.dataAdapter(sourceDetalle.value)
const localizationDetail =  {
    filterselectstring: ' ',
};

      
const campanaOptions = ref([])
const errorCampana = ref(false)
const errorMensajeCampana = ref('')

const zonaOptions = ref([])
const errorZona = ref(false)
const errorMensajeZona = ref('')

onMounted(async () => {
  appStore.titulo(`Reportes / Azzorti Proyecta`)
  await obtenerCampana()
  await obtenerZona()
})

const obtenerCampana = async () => {
  try {
    appStore.mensaje('Obteniendo campañas')
    appStore.loading(true)

    const { data } = await $api(`/api/sami/v1/reportes/prepedido/campanas`, {
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

const onGenerar = async () => {
  try {
    appStore.mensaje('Obteniendo información')
    appStore.loading(true)
    limpiarValidacion()

    filtro.value = ''
    // itemsGlobal.value = []
    // itemsDetalleTotal.value = []

    const { data } = await $api(`/api/sami/v1/reportes/prepedido`, {
      method: "get",
      query: {
        campana: (formulario.value.campana === null) ? '' : formulario.value.campana,
        zona: (formulario.value.zona === null) ? '' : formulario.value.zona,
      },
    })

    itemsGlobal.value = data.data_glob
    itemsDetalleTotal.value = data.data_deta
    sourceGlobal.value.localdata = data.data_glob
    refGridGlobal.value.updatebounddata('cells')
    refGridGlobal.value.refreshfilterrow()

    sourceDetalle.value.localdata = data.data_deta
    refGridDetalle.value.updatebounddata('cells')
    refGridDetalle.value.refreshfilterrow()
    
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
  formulario.value = {
    campana: null,
    zona: null,
  }
  filtro.value = ''
  itemsGlobal.value = []
  itemsDetalleTotal.value = []
  refGridGlobal.value.updatebounddata('cells')
  refGridDetalle.value.updatebounddata('cells')
}

const onExcel = async () => {
  try {
    appStore.mensaje('Generando archivo')
    appStore.loading(true)
    console.log(itemsGlobal.value)
    console.log(itemsDetalle.value)
    const { data } = await $api( `/api/sami/v1/reportes/prepedido/excel`, {
      method: "post",
      body: {
        data_glob: itemsGlobal.value,
        data_deta: itemsDetalle.value,
        cabeceraGlobal:headersGlobal.value,
        cabeceraDetalle:headersDetalle.value  
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
}

const onSeleccionar = item => {
  filtro.value = item.nume_iden
}

const limpiarFiltro = hideOverlay => {
  filtro.value = ''
  setTimeout(hideOverlay, 1500)
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
            <VCard title="Buscar Azzorti Proyecta">
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
            <VCard title="Lista general Azzorti Proyecta">
              <VCardText>
                <JqxGrid
                  ref="refGridGlobal"
                  theme="material"
                  width="100%"
                  :height="450"
                  :columns="headersGlobal"
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
          <VCol cols="12">
            <AppCardActions
              title="Lista detalle Azzorti Proyecta"
              action-refresh
              @refresh="limpiarFiltro"
            >
              <VCardText>
                <JqxGrid
                  ref="refGridDetalle"
                  theme="material"
                  width="100%"
                  :height="450"
                  :columns="headersDetalle"
                  :source="adaptadorDetalle"
                  :localization="localizationDetail"
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
            </AppCardActions>
          </VCol>
        </VRow>
      </template>
    </AppPlantilla>
  </div>
</template>
