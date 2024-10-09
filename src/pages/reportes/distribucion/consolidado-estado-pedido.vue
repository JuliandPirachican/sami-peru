<script setup>
import { useAppStore } from '@/stores/app';
import JqxGrid from 'jqwidgets-scripts/jqwidgets-vue3/vue_jqxgrid.vue';

definePage({
  meta: {
    action: 'colombia/repo_dist_cons_esta_pedi',
    subject: 'colombia/repo_dist_cons_esta_pedi',
  },
})

const appStore = useAppStore()
const refGridGlobal=ref()

const formulario = ref({
  campana: null,
  zona: null,
  sector: null,
  identificacion: null,
  estado: null,
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

const estadoOptions = ref([
  { id: 'picking', text: 'En proceso de picking' },
  { id: 'no_asignado', text: 'Transito desde Azzorti a repartidor' },
  { id: 'asignado', text: 'En reparto' },
  { id: 'entregado', text: 'Entregado' },
  { id: 'motivado', text: 'Pedido rechazado' },
])

const errorEstado = ref(false)
const errorMensajeEstado = ref('')

const errorIdentificacion = ref(false)
const errorMensajeIdentificacion = ref('')

const items = ref([])
const headers = computed(() => {
  return [
    {
      text: 'Item',
      dataField: 'cons_fila',
      width: '50',
      align: 'center',
      cellsalign: 'center',
      // filtertype: 'checkedlist'
    },
    {
      text: 'Campaña',
      dataField: 'codi_camp',
      width: '150',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist'
    },
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
      text: 'Nro. Iden',
      dataField: 'nume_iden',
      width: '170',
      align: 'center',
      cellsalign: 'center'
      // , aggregates: ['count']
    },
    {
      text: 'Nombre(s) y Apellido(s)',
      dataField: 'nomb_comp',
      width: '250',
      align: 'center',
      cellsalign: 'center',
    },
    {
      text: 'Pedido',
      dataField: 'nume_fact',
      width: '180',
      align: 'center',
      cellsalign: 'center',
    },
    {
      text: 'Estado',
      dataField: 'esta_fina',
      width: '150',
      align: 'center',
      cellsalign: 'center',
    },
    
  ]
});

const sourceGlobal = ref({
  localdata: [],
  datafields: [
    { name: 'cons_fila', type: 'string' },
    { name: 'codi_camp', type: 'string' },
    { name: 'codi_zona', type: 'string' },
    { name: 'codi_sect', type: 'string' },
    { name: 'nume_iden', type: 'integer' },
    { name: 'nomb_comp', type: 'string' },
    { name: 'nume_fact', type: 'string' },
    { name: 'esta_fina', type: 'string' },
  ],
  datatype: 'json',
})
const adaptadorGlobal = new jqx.dataAdapter(sourceGlobal.value)
const localization =  {
    filterselectstring: ' ',
};

onMounted(async () => {
  appStore.titulo(`Reportes / Distribucion / Consolidado estado pedido`)
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

    const { data } = await $api(`/api/sami/v1/reportes/consolidado-estado-pedido`, {
      method: "get",
      query: {
        campana: (formulario.value.campana === null) ? '' : formulario.value.campana,
        zona: (formulario.value.zona === null) ? '' : formulario.value.zona,
        sector: (formulario.value.sector === null) ? '' : formulario.value.sector,
        identificacion: (formulario.value.identificacion === null) ? '' : formulario.value.identificacion,
        estado: (formulario.value.estado === null) ? '' : formulario.value.estado,
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
    estado: null,
  }

  items.value = []
  refGridGlobal.value.updatebounddata('cells')
}

const onExcel = async () => {
  try {
    appStore.mensaje('Generando archivo')
    appStore.loading(true)

    const { data } = await $api(`/api/sami/v1/reportes/consolidado-estado-pedido/excel`, {
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
                      @update:model-value="onZonaChange"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="4"
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
                </VRow>

                <VRow justify="space-between">
                  <VCol
                    cols="12"
                    md="4"
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
              
                  <VCol
                    cols="12"
                    md="4"
                  >
                    <AppSelect
                      v-model="formulario.estado"
                      :items="estadoOptions"
                      label="Estado"
                      placeholder="Seleccionar estado"
                      item-title="text"
                      item-value="id"
                      :error="errorEstado"
                      :error-messages="errorMensajeEstado"
                    />
                  </VCol>
                </VRow>
              </VCardText>
            </VCard>
          </VCol>

          <VCol cols="12">
            <VCard title="Lista de pedidos">
              <VCardText>
                <!-- <VDataTable
                  :headers="headers"
                  :items="items"
                  :items-per-page="-1"
                  class="text-no-wrap"
                  
                  fixed-header
                  height="400"
                >
                  <template #bottom />
                </VDataTable> -->

                <JqxGrid
                  ref="refGridGlobal"
                  theme="material"
                  width="100%"
                  :height="450"
                  :columns="headers"
                  :localization="localization"
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
