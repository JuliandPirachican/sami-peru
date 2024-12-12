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
const refGridGlobal=ref()

const formulario = ref({
  campana: null,
  zona: null,
  tipo: null,
})

const itemsInicial = ref([])
const multiSearch =  ref({})


const headers = computed(() => {
  return [
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
      text: 'Fecha',
      dataField: 'acti_hora',
      width: '180',
      align: 'center',
      cellsalign: 'center',
    },
    {
      text: 'Tipo',
      dataField: 'nomb_reun',
      width: '150',
      align: 'center',
      cellsalign: 'center',
    },
    
  ]
})


const sourceGlobal = ref({
  localdata: [],
  datafields: [
    { name: 'codi_cort', type: 'string' },
    { name: 'codi_area', type: 'string' },
    { name: 'codi_zona', type: 'string' },
    { name: 'codi_sect', type: 'string' },
    { name: 'nume_iden', type: 'integer' },
    { name: 'nomb_terc', type: 'string' },
    { name: 'acti_hora', type: 'string' },
    { name: 'nomb_reun', type: 'string' },
  ],
  datatype: 'json',
})
const adaptadorGlobal = new jqx.dataAdapter(sourceGlobal.value)
const localization =  {
    filterselectstring: ' ',
};

const items = computed(() => {
  if(multiSearch.value) {
    return itemsInicial.value.filter(item => {
      return Object.entries(multiSearch.value).every(([key, value]) => {
        if (value.includes("|") && !value.includes("!")) {
          let el = value.split("|")
                    
          return el.some(elem =>
            (item[key] || "").toString().toUpperCase().startsWith(elem.toString().toUpperCase()),
          )
        }
        if (value.substring(0, 1) === "!" && !value.includes("|")) {
          let el = value.split("!")
          
          return el.some(elem =>
            !(item[key] || "").toString().toUpperCase().startsWith(elem.toString().toUpperCase()),
          )
        }
        if (value.includes("|") && value.substring(0, 1) === "!") {
          let el = value.split("!")[1].split("|")
          
          return !el.some(elem =>
            (item[key] || "").toString().toUpperCase().startsWith(elem.toString().toUpperCase()),
          )
        }
        if (value.substring(0, 1) === ">") {
          let el = value.split(">")
          if (item[key] !== " ") {
            return Number(item[key] || "") > el[1]
          }
        }
        if (value.substring(0, 1) === "<") {
          let el = value.split("<")
          if (item[key] !== " ") {
            return Number(item[key] || "") < el[1]
          }
        }
        if (value.substring(0, 1) === "=") {
          let el = value.split("=")
          
          return (item[key] || "").toString().toUpperCase() === el[1].toString().toUpperCase()
        }
        
        return (item[key] || "").toString().toUpperCase().includes(value.toString().toUpperCase())
      })
    })
  } else {
    return itemsInicial.value
  }
})

//const items = ref([])

const campanaOptions = ref([])
const errorCampana = ref(false)
const errorMensajeCampana = ref('')

const zonaOptions = ref([])
const errorZona = ref(false)
const errorMensajeZona = ref('')
const tipoOptions = ref([])

onMounted(async () => {
  appStore.titulo(`Reportes / Asistencia conferencia`)
  await obtenerCampana()
  await obtenerZona()
  await obtenerReunion()
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

const obtenerReunion = async () => {
  try {
    appStore.mensaje('Obteniendo reuniones')
    appStore.loading(true)

    const { data } = await $api( `/api/comun/v1/reuniones`, {
      method: "get",
    })
    

    const itemReunion = data.data_glob

    
    itemReunion.forEach(element => 
      tipoOptions.value.push({
        id: element.nomb_reun,
        text: element.nomb_reun,
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

    //onLimpiar()
    items.value = []
    itemsInicial.value = []

    const { data } = await $api(`/api/sami/v1/reportes/asistencia-reunion`, {
      method: "get",
      query: {
        campana: (formulario.value.campana === null) ? '' : formulario.value.campana,
        zona: (formulario.value.zona === null) ? '' : formulario.value.zona,
        reunion: (formulario.value.tipo === null) ? '' : formulario.value.tipo,
      },
    })

    items.value = data.data_glob
    itemsInicial.value = data.data_glob
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
    tipo: null,
  }
  refGridGlobal.value.updatebounddata('cells')
  items.value = []
  itemsInicial.value = []
}

const onExcel = async () => {
  try {
    appStore.mensaje('Generando archivo')
    appStore.loading(true)

    const { data } = await $api(`/api/sami/v1/reportes/asistencia-reunion/excel`, {
      method: "post",
      body: {
        cabecera: headers.value,
        detalle: items.value,
      },
    })

    window.open(`${$base}/temporales/${data}`, '_blank')
  } catch (e) {
    console.log(e)
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
          <VCol
            cols="12"
            class="d-flex justify-end flex-wrap gap-x-4 gap-y-4"
          />
          <VCol cols="12">
            <VCard title="Buscar asistencia">
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
                  <VCol
                    cols="12"
                    md="4"
                  >
                    <AppSelect
                      v-model="formulario.tipo"
                      :items="tipoOptions"
                      label="Tipo reunión"
                      placeholder="Seleccionar tipo"
                      item-title="text"
                      item-value="id"
                    />
                  </VCol>
                </VRow>
              </VCardText>
            </VCard>
          </VCol>

          <VCol cols="12">
            <VCard title="Lista asistencia">
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
                  <!-- showstatusbar -->
                  <!-- showaggregates -->
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </template>
    </AppPlantilla>
  </div>
  <div />
</template>
