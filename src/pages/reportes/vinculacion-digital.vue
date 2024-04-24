<!-- eslint-disable camelcase -->
<script setup>
import { useAppStore } from '@/stores/app'
import { EncryptStorage } from 'encrypt-storage'
import JqxGrid from "jqwidgets-scripts/jqwidgets-vue3/vue_jqxgrid.vue"
import { useDisplay } from 'vuetify'

definePage({
  meta: {
    action: 'peru/repo_come_vinc_digi',
    subject: 'peru/repo_come_vinc_digi',
  },
})

const encryptStorage = new EncryptStorage('AZZORTI-SAMI', {
  storageType: 'localStorage',
})

const { mobile } = useDisplay()
const appStore = useAppStore()
const userData = encryptStorage.getItem('userData')

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

const cabecera = computed(() => {
  return [
    {
      title: 'Fecha envio',
      key: 'fech_envi',
    },
    {
      title: 'Campaña',
      key: 'codi_camp',
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
      title: 'Documento identidad',
      key: 'nume_iden',
    },
    {
      title: 'Primer nombre',
      key: 'prim_nomb',
    },
    {
      title: 'Segundo nombre',
      key: 'segu_nomb',
    },
    {
      title: 'Primer apellido',
      key: 'prim_apel',
    },
    {
      title: 'Segundo apellido',
      key: 'segu_apel',
    },
    {
      title: 'Celular',
      key: 'celu_ases',
    },
    {
      title: 'Departamento',
      key: 'nomb_dpto',
    },
    {
      title: 'Provincia',
      key: 'nomb_ciud',
    },
    {
      title: 'Dirección',
      key: 'dire_ases',
    },
    {
      title: 'Fecha nacimiento',
      key: 'fech_naci',
    },
    {
      title: 'Sexo',
      key: 'codi_sexo',
    },
    {
      title: 'Estado',
      key: 'esta_fina',
    },
  ]
})

const columnasGlobal = [
  {
    text: 'Fecha envio',
    dataField: 'fech_envi',
    width: '10%',
    cellsalign: 'center',
    align: 'center',
  },
  {
    text: 'Campaña',
    dataField: 'codi_camp',
    width: '10%',
    cellsalign: 'center',
    align: 'center',
  },
  {
    text: 'Zona',
    dataField: 'codi_zona',
    width: '10%',
    cellsalign: 'center',
    align: 'center',
  },
  {
    text: 'Sector',
    dataField: 'codi_sect',
    width: '10%',
    cellsalign: 'center',
    align: 'center',
  },
  {
    text: 'Documento identidad',
    dataField: 'nume_iden',
    width: '10%',
    cellsalign: 'left',
    align: 'center',
  },
  {
    text: 'Primer nombre',
    dataField: 'prim_nomb',
    width: '10%',
    cellsalign: 'left',
    align: 'center',
  },
  {
    text: 'Segundo nombre',
    dataField: 'segu_nomb',
    width: '10%',
    cellsalign: 'left',
    align: 'center',
  },
  {
    text: 'Primer apellido',
    dataField: 'prim_apel',
    width: '10%',
    cellsalign: 'left',
    align: 'center',
  },
  {
    text: 'Segundo apellido',
    dataField: 'segu_apel',
    width: '10%',
    cellsalign: 'left',
    align: 'center',
  },
  {
    text: 'Celular',
    dataField: 'celu_ases',
    width: '10%',
    cellsalign: 'left',
    align: 'center',
  },
  {
    text: 'Departamento',
    dataField: 'nomb_dpto',
    width: '10%',
    cellsalign: 'left',
    align: 'center',
  },
  {
    text: 'Provincia',
    dataField: 'nomb_ciud',
    width: '10%',
    cellsalign: 'left',
    align: 'center',
  },
  {
    text: 'Dirección',
    dataField: 'dire_ases',
    width: '10%',
    cellsalign: 'left',
    align: 'center',
  },
  {
    text: 'Fecha nacimiento',
    dataField: 'fech_naci',
    width: '10%',
    cellsalign: 'left',
    align: 'center',
  },
  {
    text: 'Sexo',
    dataField: 'codi_sexo',
    width: '10%',
    cellsalign: 'left',
    align: 'center',
  },
  {
    text: 'Estado',
    dataField: 'esta_fina',
    width: '10%',
    cellsalign: 'left',
    align: 'center',
  },

]

const sourceGlobal = ref({
  localdata: [],
  datafields: [
    { name: 'pdf', type: 'string' },
    { name: 'docu_lide', type: 'string' },
    { name: 'nomb_lide', type: 'string' },
    { name: 'codi_zona', type: 'string' },
    { name: 'codi_sect', type: 'string' },
    { name: 'codi_camp', type: 'string' },
    { name: 'fech_envi', type: 'string' },
    { name: 'cons_docu', type: 'string' },
    { name: 'nume_iden', type: 'string' },
    { name: 'prim_nomb', type: 'string' },
    { name: 'segu_nomb', type: 'string' },
    { name: 'prim_apel', type: 'string' },
    { name: 'segu_apel', type: 'string' },
    { name: 'corr_ases', type: 'string' },
    { name: 'fech_naci', type: 'string' },
    { name: 'codi_sexo', type: 'string' },
    { name: 'nomb_dpto', type: 'string' },
    { name: 'nomb_ciud', type: 'string' },
    { name: 'celu_ases', type: 'string' },
    { name: 'nume_refe', type: 'string' },
    { name: 'nomb_refe', type: 'string' },
    { name: 'dire_ases', type: 'string' },
    { name: 'nomb_barr', type: 'string' },
    { name: 'dire_entr', type: 'string' },
    { name: 'cuen_regr', type: 'string' },
    { name: 'zona_geo', type: 'string' },
    { name: 'vali_geo', type: 'string' },
    { name: 'cart_cast', type: 'string' },
    { name: 'pedi_prep', type: 'string' },
    { name: 'cons_barr', type: 'string' },
    { name: 'esta_fina', type: 'string' },
  ],
  datatype: 'json',
})

const adaptadorGlobal = new jqx.dataAdapter(sourceGlobal.value)
const refGridGlobal = ref()
const localization = appStore.localization

onMounted(async () => {
  appStore.titulo(`Reportes / Vinculación digital`)
  await obtenerCampana()
  await obtenerZona()
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
      // eslint-disable-next-line no-console
      console.log( e.response._data)
    }
  }
  finally {
    appStore.loading(false)
  }
}

const onGenerar = async () => {
  try {
    limpiarValidacion()

    refGridGlobal.value.refreshfilterrow()
    refGridGlobal.value.clearselection()
    refGridGlobal.value.clear()

    appStore.mensaje('Obteniendo información')
    appStore.loading(true)

    const { data } = await $api(`/api/sami/v1/procesos/vinculacion-digital/reporte`, {
      method: "get",
      query: {
        campana: formulario.value.campana,
        zona: formulario.value.zona,
      },
    })

    sourceGlobal.value.localdata = data
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

const onExcel = async () => {
  try {
    appStore.mensaje('Generando archivo')
    appStore.loading(true)

    const { data }  = await $api(`/api/sami/v1/procesos/vinculacion-digital/excel`, {
      method: "post", 
      body: {
        cabecera: cabecera.value,
        detalle: JSON.stringify(refGridGlobal.value.exportdata('xml')),
      },
    })
    
    window.open(`${$base}/temporales/${data}`, '_blank')
  } catch (e) {
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

  sourceGlobal.value.localdata = []
  refGridGlobal.value.updatebounddata('cells')
  refGridGlobal.value.refreshfilterrow()
  refGridGlobal.value.clearselection()
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
            <VCard title="Buscar inscripción">
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
                      placeholder="Seleccionar campana"
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
            <VCard title="Lista inscripción">
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
                  scrollmode="logical"
                  showfilterrow
                  :columnsmenu="false"
                />
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </template>
    </AppPlantilla>
  </div>
</template>

