<script setup>
import { useAppStore } from '@/stores/app';
import { EncryptStorage } from 'encrypt-storage';
import JqxGrid from 'jqwidgets-scripts/jqwidgets-vue3/vue_jqxgrid.vue';



definePage({
  meta: {
    action: 'colombia/repo_come_refe',
    subject: 'colombia/repo_come_refe',
  },
})

const encryptStorage = new EncryptStorage('AZZORTI-SAMI', {
  storageType: 'localStorage',
})

const userData = encryptStorage.getItem('userData')
const appStore = useAppStore();
const refGridGlobal=ref()


const formulario = ref({
  campana: null,
  zona: null,
})

const items = ref([])

const headers1 = computed(() => {
  return [
    {
      title: 'Campaña',
      key: 'codi_camp',
    },
    {
      title: 'Corte',
      key: 'codi_cort',
    },
    {
      title: 'Región',
      key: 'codi_area',
    },
    {
      title: 'Zona referido',
      key: 'codi_zona_hijo',
    },
    {
      title: 'Sector referido',
      key: 'codi_sect_hijo',
    },
    {
      title: 'Nro ident. referido',
      key: 'nume_iden_hijo',
    },
    {
      title: 'Nombre(s) y apellido(s) referido',
      key: 'nomb_terc_hijo',
    },
    {
      title: 'Zona referente',
      key: 'codi_zona',
    },
    {
      title: 'Sector referente',
      key: 'codi_sect',
    },
    {
      title: 'Nro iden. referente',
      key: 'nume_iden_padr',
    },
    {
      title: 'Nombre(s) y apellido(s) referente',
      key: 'nomb_terc_padr',
    },
    {
      title: '1er pedido',
      key: 'opci_pre1',
    },
    {
      title: '2do pedido',
      key: 'opci_pre2',
    },
    {
      title: '3er pedido',
      key: 'opci_pre3',
    },
    {
      title: '4to pedido',
      key: 'opci_pre4',
    },
  ]
});

const headers = computed(() => {
  return [
    {
      text: 'Campaña',
      dataField: 'codi_camp',
      width: '150',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist'
    },
    {
      text: 'Corte',
      dataField: 'codi_cort',
      width: '150',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist'
    },
    {
      text: 'Region',
      dataField: 'codi_area',
      width: '150',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist'
    },
    {
      text: 'Zona Referido',
      dataField: 'codi_zona_hijo',
      width: '150',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist'
    },
    {
      text: 'Sector Referido',
      dataField: 'codi_sect_hijo',
      width: '150',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist'
    },
    {
      text: 'Nro. Iden Referido',
      dataField: 'nume_iden_hijo',
      width: '170',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist'
      // , aggregates: ['count']
    },
    {
      text: 'Nombre(s) y Apellido(s) Referido',
      dataField: 'nomb_terc_hijo',
      width: '250',
      align: 'center',
      cellsalign: 'center',
    },
    {
      text: 'Zona Referente',
      dataField: 'codi_zona_padr',
      width: '150',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist'
    },
    {
      text: 'Sector Referente',
      dataField: 'codi_sect_padr',
      width: '150',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist'
    },
    {
      text: 'Nro. Iden Referente',
      dataField: 'nume_iden_padr',
      width: '170',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist'
      // , aggregates: ['count']
    },
    {
      text: 'Nombre(s) y Apellido(s) Referente',
      dataField: 'nomb_terc_padr',
      width: '250',
      align: 'center',
      cellsalign: 'center',
    },
    {
      text: '1er Pedido',
      dataField: 'opci_pre1',
      width: '180',
      align: 'center',
      cellsalign: 'center',
    },
    {
      text: '2do Pedido',
      dataField: 'opci_pre2',
      width: '150',
      align: 'center',
      cellsalign: 'center',
    },
    {
      text: '3er Pedido',
      dataField: 'opci_pre3',
      width: '150',
      align: 'center',
      cellsalign: 'center',
    },
    {
      text: '4to Pedido',
      dataField: 'opci_pre4',
      width: '150',
      align: 'center',
      cellsalign: 'center',
    },
    
  ]
});

const sourceGlobal = ref({
  localdata: [],
  datafields: [
    { name: 'codi_camp', type: 'string' },
    { name: 'codi_cort', type: 'string' },
    { name: 'codi_area', type: 'string' },
    { name: 'codi_zona_hijo', type: 'string' },
    { name: 'codi_sect_hijo', type: 'string' },
    { name: 'nume_iden_hijo', type: 'integer' },
    { name: 'nomb_terc_hijo', type: 'string' },
    { name: 'codi_zona_padr', type: 'string' },
    { name: 'codi_sect_padr', type: 'string' },
    { name: 'nume_iden_padr', type: 'integer' },
    { name: 'nomb_terc_padr', type: 'string' },
    { name: 'opci_pre1', type: 'string' },
    { name: 'opci_pre2', type: 'string' },
    { name: 'opci_pre3', type: 'string' },
    { name: 'opci_pre4', type: 'string' },
  ],
  datatype: 'json',
})
const adaptadorGlobal = new jqx.dataAdapter(sourceGlobal.value)
const localization =  {
    filterselectstring: ' ',
};

const campanaOptions = ref([])
const errorCampana = ref(false)
const errorMensajeCampana = ref('')

const zonaOptions = ref([])
const errorZona = ref(false)
const errorMensajeZona = ref('')

onMounted(async () => {
  appStore.titulo(`Reportes / Referidos`)
  await obtenerCampana()
  await obtenerZona()
})

const obtenerCampana = async () => {
  try {
    appStore.mensaje('Obteniendo campañas')
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

const onGenerar = async () => {
  try {
    appStore.mensaje('Obteniendo información')
    appStore.loading(true)
    limpiarValidacion()

    items.value = []

    const { data } = await $api(`/api/sami/v1/reportes/referido`, {
      method: "get",
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

    const { data } = await $api(`/api/sami/v1/reportes/referido/excel`, {
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
            <VCard title="Buscar referidos">
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
            <VCard title="Lista referido">
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
