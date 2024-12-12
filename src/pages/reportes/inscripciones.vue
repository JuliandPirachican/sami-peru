<script setup>
import { useAppStore } from '@/stores/app';
import JqxGrid from 'jqwidgets-scripts/jqwidgets-vue3/vue_jqxgrid.vue';


definePage({
  meta: {
    action: 'colombia/repo_come_insc_movi',
    subject: 'colombia/repo_come_insc_movi',
  },
})

const appStore = useAppStore()
const refGridGlobal=ref()

const items = ref([])
const errorCampana = ref(false)
const errorMensajeCampana = ref('')

const formulario = ref({
  campana: null,
})

const campanaOptions = ref([])

const headers = computed(() => {
  return [
    {
      text: 'Region',
      dataField: 'codi_area',
      width: '150',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist'
    },
    {
      text: 'Zona App',
      dataField: 'zona_zona',
      width: '150',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist'
    },
    {
      text: 'Sector App',
      dataField: 'zona_sect',
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
      dataField: 'nomb_terc',
      width: '250',
      align: 'center',
      cellsalign: 'center',
    },
    {
      text: 'Estado',
      dataField: 'esta_insc',
      width: '180',
      align: 'center',
      cellsalign: 'center',
    },
    {
      text: 'Usuario',
      dataField: 'usua_modi',
      width: '180',
      align: 'center',
      cellsalign: 'center',
    },
    {
      text: 'Fecha',
      dataField: 'fech_modi',
      width: '180',
      align: 'center',
      cellsalign: 'center',
    },
    {
      text: '1ra Fact.',
      dataField: 'fech_fact',
      width: '150',
      align: 'center',
      cellsalign: 'center',
    },
    {
      text: '1ra Desp.',
      dataField: 'fech_desp',
      width: '150',
      align: 'center',
      cellsalign: 'center',
    },
    {
      text: 'Ult Fact.',
      dataField: 'ulti_fact',
      width: '150',
      align: 'center',
      cellsalign: 'center',
    },
    {
      text: 'Folio',
      dataField: 'nume_foli',
      width: '150',
      align: 'center',
      cellsalign: 'center',
    },
    {
      text: 'Latitud',
      dataField: 'coor_cx',
      width: '150',
      align: 'center',
      cellsalign: 'center',
    },
    {
      text: 'Longitud',
      dataField: 'coor_cy',
      width: '150',
      align: 'center',
      cellsalign: 'center',
    },
    {
      text: 'Observacion',
      dataField: 'obse_insc',
      width: '150',
      align: 'center',
      cellsalign: 'center',
    },
    {
      text: 'Fecha App',
      dataField: 'hora_zona',
      width: '150',
      align: 'center',
      cellsalign: 'center',
    },
    
  ]
});

const sourceGlobal = ref({
  localdata: [],
  datafields: [
    { name: 'codi_area', type: 'string' },
    { name: 'zona_zona', type: 'string' },
    { name: 'zona_sect', type: 'string' },
    { name: 'codi_zona', type: 'string' },
    { name: 'codi_sect', type: 'string' },
    { name: 'nume_iden', type: 'integer' },
    { name: 'nomb_terc', type: 'string' },
    { name: 'esta_insc', type: 'string' },
    { name: 'fech_modi', type: 'string' },
    { name: 'fech_fact', type: 'string' },
    { name: 'fech_desp', type: 'string' },
    { name: 'ulti_fact', type: 'string' },
    { name: 'nume_foli', type: 'string' },
    { name: 'coor_cx', type: 'string' },
    { name: 'coor_cy', type: 'string' },
    { name: 'obse_insc', type: 'string' },
    { name: 'hora_zona', type: 'string' },
  ],
  datatype: 'json',
});

const adaptadorGlobal = new jqx.dataAdapter(sourceGlobal.value)
const localization =  {
    filterselectstring: ' ',
};


onMounted(async () => {
  appStore.titulo(`Reportes / Incorporacion Digital`)
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
    sourceGlobal.value.localdata = data.data_glob
    refGridGlobal.value.updatebounddata('cells')
    refGridGlobal.value.refreshfilterrow()
  } catch (e) {
  }
  finally {
    appStore.loading(false)
  }
}

const onLimpiar= async () => {
  items.value = []
  refGridGlobal.value.updatebounddata('cells')
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
            <VCard title="Buscar Incorporacion Digital">
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
            <VCard title="Lista De Incorporaciones Digitales">
              <VCardText>
                <!-- <VDataTable
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
                </VDataTable> -->
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

<style lang="scss">
.flat-picker-custom-style {
  inset-block: auto 8px;
}
</style>
