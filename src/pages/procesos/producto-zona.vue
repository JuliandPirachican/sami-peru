<script setup>
import { useAppStore } from '@/stores/app';
import { EncryptStorage } from 'encrypt-storage';
import JqxGrid from 'jqwidgets-scripts/jqwidgets-vue3/vue_jqxgrid.vue';
import { useDisplay } from 'vuetify';
 
definePage({
  meta: {
    action: 'colombia/proc_come_prod_zona',
    subject: 'colombia/proc_come_prod_zona',
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
    { title: 'Campaña',     key: 'codi_camp' },
    { title: 'Zona',        key: 'codi_zona' },
    { title: 'Cod Lide',      key: 'codi_sect' },
    { title: 'Código',      key: 'codi_prod' },
    { title: 'Producto',    key: 'nomb_prod' },
    { title: 'Doc. ident.', key: 'nume_iden' },
    { title: 'Asesora',     key: 'nomb_terc' },
  ]
})
 
const columnaGlobal = computed(() => {
  return [
    {
      text: 'Fila',
      dataField: 'cons_prod',
      hidden: true,
    },
    {
      text: 'Campaña',
      dataField: 'codi_camp',
      width: (mobile.value)? null :'10%',
      align: 'center',
      cellsalign: 'center',
      editable: false,
    },
    {
      text: 'Zona',
      dataField: 'codi_zona',
      width: (mobile.value)? null :'10%',
      align: 'center',
      cellsalign: 'center',
      editable: false,
    },
    {
      text: 'Cod Lide',
      dataField: 'codi_sect',
      width: (mobile.value)? null :'10%',
      align: 'center',
      cellsalign: 'center',
      editable: false,
    },
    {
      text: 'Código',
      dataField: 'codi_prod',
      width: (mobile.value)? null :'15%',
      align: 'center',
      cellsalign: 'center',
      editable: false,
    },
    {
      text: 'Producto',
      dataField: 'nomb_prod',
      width: (mobile.value)? null :'20%',
      align: 'center',
      cellsalign: 'left',
      editable: false,
    },
    {
      text: 'Doc. ident.',
      dataField: 'nume_iden',
      width: (mobile.value)? null :'15%',
      align: 'center',
      cellsalign: 'left',
      columntype: 'textbox',
    },
    {
      text: 'Asesora',
      dataField: 'nomb_terc',
      width: (mobile.value)? null :'20%',
      align: 'center',
      cellsalign: 'left',
      editable: false,
    },
  ]
})
 
const sourceGlobal = ref({
  localdata: [],
  datafields: [
    { name: 'cons_prod', type: 'number' },
    { name: 'codi_camp', type: 'string' },
    { name: 'codi_zona', type: 'string' },
    { name: 'codi_prod', type: 'string' },
    { name: 'nomb_prod', type: 'string' },
    { name: 'nume_iden', type: 'string' },
    { name: 'codi_sect', type: 'string' },
    { name: 'nomb_terc', type: 'string' },
  ],
  datatype: 'json',
})
 
const adaptadorGlobal = new jqx.dataAdapter(sourceGlobal.value)
const refFileUpload = ref()
const refGridGlobal = ref()
const localization = appStore.localization
 
onMounted(async () => {
  appStore.titulo(`Procesos / Producto zona`)
  await obtenerCampana()
  await obtenerZona()
})
 
const obtenerCampana = async () => {
  try {
    appStore.mensaje('Obteniendo campañas')
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
      console.log(e.response.data)
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
 
    const response  = await $api(`/api/comun/v1/zonas`, {
      method: "get",
      query: {
        codigo: userData.codi_perf,
      },
    })
 
    const itemZona = response.data.data_glob
    
    itemZona.forEach(element =>
      zonaOptions.value.push({
        id: element.codi_zona,
        text: element.codi_zona,
      }),
    )
  } catch (e) {
    if(e.response !== undefined) {
      // eslint-disable-next-line no-console
      console.log(e.response.data)
    }
  }
  finally {
    appStore.loading(false)
  }
}
 
const onGenerar = async () => {
  try {
    limpiarValidacion()
 
    sourceGlobal.value.localdata =  []
    refGridGlobal.value.updatebounddata('cells')
    refGridGlobal.value.refreshfilterrow()
  
    appStore.mensaje('Obteniendo información')
    appStore.loading(true)
 
    const { data } = await $api(`/api/sami/v1/procesos/producto-zona/productos`, {
      method: "get",
      query: {
        campana: (formulario.value.campana === null) ? '' : formulario.value.campana,
        zona: (formulario.value.zona === null) ? '' : formulario.value.zona,
      },
    })
 
    sourceGlobal.value.localdata =  data.data_glob
    refGridGlobal.value.updatebounddata('cells')
    refGridGlobal.value.refreshfilterrow()
    
  } catch (error) {
    if(error.response !== undefined) {
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
  sourceGlobal.value.localdata =  []
  refGridGlobal.value.updatebounddata('cells')
  refGridGlobal.value.refreshfilterrow()
}
 
const onExcel = async () => {
  try {
    appStore.mensaje('Generando archivo')
    appStore.loading(true)
 
    const { data } = await $api(`/api/sami/v1/procesos/producto-zona/excel`, {
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
 
const onEditar = async event => {
  appStore.mensaje('Generando proceso')
  appStore.loading(true)
 
  const { args } = event
  const rowIndex = args.rowindex
  const cellValue = args.value
  try {
    const numeIden = cellValue.trim()
    const codiZona = refGridGlobal.value.getcellvaluebyid(rowIndex, 'codi_zona')
    const consProd = refGridGlobal.value.getcellvaluebyid(rowIndex, 'cons_prod')
 
    const { data } = await $api(`/api/sami/v1/procesos/producto-zona/productos`, {
      method: "put",
      body: {
        documento: numeIden,
        zona: codiZona,
        codigo: consProd,
      },
    })
 
    const { nomb_terc, codi_sect } = data
 
    refGridGlobal.value.setcellvalue(rowIndex, 'nomb_terc', nomb_terc)
    refGridGlobal.value.setcellvalue(rowIndex, 'codi_sect', codi_sect)
  } catch (error) {
    refGridGlobal.value.setcellvalue(rowIndex, 'nume_iden', '')
    refGridGlobal.value.setcellvalue(rowIndex, 'codi_sect', '')
    refGridGlobal.value.setcellvalue(rowIndex, 'nomb_terc', '')
  }
  appStore.loading(false)
  appStore.mensaje('')
}
    
const limpiarValidacion = () => {
  errorCampana.value = false
  errorMensajeCampana.value = ''
 
  errorZona.value = false
  errorMensajeZona.value = ''
}
 
const onSubir = () => {
  refFileUpload.value.click()
}
 
const handleFileUpload = async () => {
  try {
    appStore.mensaje('Subiendo archivo')
    appStore.loading(true)
  
    const dataForm = new FormData()
 
    dataForm.append('file', refFileUpload.value.files[0])
    dataForm.append('campana', (formulario.value.campana === null) ? '' : formulario.value.campana)
    dataForm.append('zona', (formulario.value.zona === null) ? '' : formulario.value.zona)
 
    await $api(`/api/sami/v1/procesos/producto-zona/masivo`, {
      method: "post",
      body: dataForm,
    })
    
   
    
    appStore.mensajeSnackbar('Archivo cargado con éxito.')
    appStore.color("success")
    appStore.snackbar(true)
    setTimeout(() => {
      onGenerar()
    }, 1000)
  } catch (error) {
    if(error.response !== undefined) {
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
  } finally {
    refFileUpload.value.value = ''
    appStore.loading(false)
    appStore.mensaje('')
  }
}
</script>
 
<template>
  <div>
    <AppPlantilla>
      <template #botones>
        <GenerarBoton @procesar="onGenerar" />
        <ExcelBoton @procesar="onExcel" />
        <SubirBoton disabled @procesar="onSubir" />
        <LimpiarBoton @procesar="onLimpiar" />
      </template>
 
      <template #contenido>
        <input
          ref="refFileUpload"
          type="file"
          class="d-none"
          accept=".txt"
          @change="handleFileUpload"
        >
        <VRow>
          <VCol cols="12">
            <VCard title="Buscar producto zona">
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
            <VCard title="Lista producto zona">
              <VCardText>
                <JqxGrid
                  ref="refGridGlobal"
                  theme="material"
                  width="100%"
                  :localization="localization"
                  :enablehover="false"
                  :height="450"
                  :columns="columnaGlobal"
                  :source="adaptadorGlobal"
                  columnsresize
                  :columnsautoresize="false"
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
                  editable
                  @cellendedit="onEditar($event)"
                />
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </template>
    </AppPlantilla>
  </div>
</template>
