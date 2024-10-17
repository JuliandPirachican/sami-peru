<script setup>
import { useAppStore } from '@/stores/app';
import { EncryptStorage } from 'encrypt-storage';
import JqxGrid from 'jqwidgets-scripts/jqwidgets-vue3/vue_jqxgrid.vue';


definePage({
  meta: {
    action: 'colombia/repo_come_asis_conf',
    subject: 'colombia/repo_come_asis_conf',
  },
})

const encryptStorage = new EncryptStorage('AZZORTI-SAMI', {
  storageType: 'localStorage',
})

const userData = encryptStorage.getItem('userData')
const appStore = useAppStore()

const formulario = ref({
  campana: null,
  zona: null,
})

const headers = computed(() => {
  return [
    {
      text: 'Campaña',
      dataField: 'codi_camp',
      width: '100',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist'
    }
   ,{
      text: 'Region',
      dataField: 'codi_area',
      width: '100',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist'
    }
   ,{
      text: 'Zona',
      dataField: 'codi_zona',
      width: '100',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist'
    }
   ,{
      text: 'Sector',
      dataField: 'codi_sect',
      width: '80',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist'
    }
   ,{
      text: 'Nro. Iden',
      dataField: 'nume_iden',
      width: '120 ',
      align: 'center',
      cellsalign: 'center'
      // , aggregates: ['count']
    }
   ,{
      text: 'Nombre(s) y Apellido(s)',
      dataField: 'nomb_terc',
      width: '250',
      align: 'center',
      cellsalign: 'center',
    }
   ,{
      text: 'Usuario',
      dataField: 'usua_pedi',
      width: '180',
      align: 'center',
      cellsalign: 'center',
    },
    {
      text: 'Fecha De Pedido',
      dataField: 'fech_pedi',
      width: '150',
      align: 'center',
      cellsalign: 'center',
    }
   ,{
      text: 'Fecha De Facturacion',
      dataField: 'fech_fact',
      width: '150',
      align: 'center',
      cellsalign: 'center',
    }
   ,{
      text: 'Fecha De Embalaje',
      dataField: 'fech_emba',
      width: '150',
      align: 'center',
      cellsalign: 'center',
    }
   ,{
      text: 'Fecha De Despacho',
      dataField: 'fech_desp',
      width: '150',
      align: 'center',
      cellsalign: 'center',
    }
   ,{
      text: 'Fecha De Entrega',
      dataField: 'fech_reci',
      width: '150',
      align: 'center',
      cellsalign: 'center',
    }
    
  ]
});

const sourceGlobal = ref({
  localdata: [],
  datafields: [
    { name: 'codi_camp', type: 'string' },
    { name: 'codi_area', type: 'string' },
    { name: 'codi_zona', type: 'string' },
    { name: 'codi_sect', type: 'string' },
    { name: 'nume_iden', type: 'integer'},
    { name: 'nomb_terc', type: 'string' },
    { name: 'usua_pedi', type: 'string' },
    { name: 'fech_pedi', type: 'string' },
    { name: 'fech_fact', type: 'string' },
    { name: 'fech_emba', type: 'string' },
    { name: 'fech_desp', type: 'string' },
    { name: 'fech_reci', type: 'string' },
  ],
  datatype: 'json',
})
const adaptadorGlobal = new jqx.dataAdapter(sourceGlobal.value)
const localization =  {
    filterselectstring: ' ',
};

const items = ref([])
const refGridGlobal=ref()


const campanaOptions = ref([])
const errorCampana = ref(false)
const errorMensajeCampana = ref('')

const zonaOptions = ref([])
const errorZona = ref(false)
const errorMensajeZona = ref('')

onMounted(async () => {
  appStore.titulo(`Reportes / Ciclo pedido`)
  await obtenerCampana()
  await obtenerZona()
})

const obtenerCampana = async () => {
  try {
    appStore.mensaje('Obteniendo campaña')
    appStore.loading(true)

    const { data }  = await $api(`/api/comun/v1/campanas`, {
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

    items.value = []

    const { data } = await $api(`/api/sami/v1/reportes/ciclo-pedido`, {
      method: "GET",
      query: {
        campana: (formulario.value.campana === null) ? '' : formulario.value.campana,
        zona: (formulario.value.zona === null) ? '' : formulario.value.zona,
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
  items.value = []
}

const onExcel = async () => {
  try {
    appStore.mensaje('Generando archivo')
    appStore.loading(true)

    const { data } = await $api(`/api/sami/v1/reportes/ciclo-pedido/excel`, {
      method: "POST",
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
}
</script>

<template>
  <div>
    <AppPlantilla>
      <template #titulo>
        <AppTitulo titulo="Reportes | Ciclo pedido" />
      </template>
      <template #botones>
        <GenerarBoton @procesar="onGenerar" />
        <ExcelBoton @procesar="onExcel" />
        <LimpiarBoton @procesar="onLimpiar" />
      </template>
      <template #contenido>
        <VRow>
          <VCol cols="12">
            <VCard title="Buscar ciclo pedido">
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
            <VCard title="Lista ciclo pedido">
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
