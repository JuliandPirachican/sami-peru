<!-- eslint-disable camelcase -->
<script setup>
import { useAppStore } from '@/stores/app'
import sinImagen from '@images/sin_imagen.png'
import { EncryptStorage } from 'encrypt-storage'
import JqxGrid from "jqwidgets-scripts/jqwidgets-vue3/vue_jqxgrid.vue"
import VueEasyLightbox from 'vue-easy-lightbox'
import { useDisplay } from 'vuetify'

definePage({
  meta: {
    action: 'colombia/repo_come_vinc_digi',
    subject: 'colombia/repo_come_vinc_digi',
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
})

const campanaOptions = ref([])
const errorCampana = ref(false)
const errorMensajeCampana = ref('')

const cabecera = computed(() => {
  return [
    {
      title: 'Medio',
      key: 'medi_comu',
    },
    {
      title: 'Fecha envio',
      key: 'fech_envi',
    },
    {
      title: 'Campaña envio',
      key: 'codi_camp',
    },
    {
      title: 'Campaña ingreso',
      key: 'camp_ingr',
    },
    {
      title: 'Zona APP',
      key: 'codi_zona',
    },
    {
      title: 'Sector APP',
      key: 'codi_sect',
    },
    {
      title: 'Geo Zona',
      key: 'geo_zona',
    },
    {
      title: 'Geo Sector',
      key: 'geo_sect',
    },
    {
      title: 'Zona Final',
      key: 'zona_fina',
    },
    {
      title: 'Sector Final',
      key: 'sect_fina',
    },
    {
      title: 'Estatus',
      key: 'esta_acti',
    },
    {
      title: 'Región',
      key: 'regi_ases',
    },
    {
      title: 'Facturado',
      key: 'nume_fact',
    },
    {
      title: 'Documento identidad referida',
      key: 'nume_refe',
    },
    {
      title: 'Nombre referida',
      key: 'nomb_refe',
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
      title: 'Distrito',
      key: 'nomb_barr',
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
    {
      title: 'Observación',
      key: 'obse_segu',
    },
  ]
})

const columnasGlobal = computed(() => {
  return [
    {
      text: 'Medio',
      dataField: 'medi_comu',
      width: (mobile.value) ? '25%':'10%',
      cellsalign: 'left',
      align: 'center',
    },
    {
      text: 'Fecha envio',
      dataField: 'fech_envi',
      width: (mobile.value)? '25%' : '10%',
      cellsalign: 'center',
      align: 'center',
    },
    {
      text: 'Campaña envio',
      dataField: 'codi_camp',
      width: (mobile.value)? '25%' : '10%',
      cellsalign: 'center',
      align: 'center',
    },
    {
      text: 'Campaña ingreso',
      dataField: 'camp_ingr',
      width: (mobile.value)? '25%' : '10%',
      cellsalign: 'center',
      align: 'center',
    },
    {
      text: 'Zona APP',
      dataField: 'codi_zona',
      width: (mobile.value)? '25%' : '10%',
      cellsalign: 'center',
      align: 'center',
    },
    {
      text: 'Sector APP',
      dataField: 'codi_sect',
      width: (mobile.value)? '25%' : '10%',
      cellsalign: 'center',
      align: 'center',
    },
    {
      text: 'Geo Zona',
      dataField: 'geo_zona',
      width: (mobile.value)? '25%' : '10%',
      cellsalign: 'center',
      align: 'center',
    },
    {
      text: 'Geo Sector',
      dataField: 'geo_sect',
      width: (mobile.value)? '25%' : '10%',
      cellsalign: 'center',
      align: 'center',
    },
    {
      text: 'Zona Final',
      dataField: 'zona_fina',
      width: (mobile.value)? '25%' : '10%',
      cellsalign: 'center',
      align: 'center',
    },
    {
      text: 'Sector Final',
      dataField: 'sect_fina',
      width: (mobile.value)? '25%' : '10%',
      cellsalign: 'center',
      align: 'center',
    },
    {
      text: 'Estatus',
      dataField: 'esta_acti',
      width: (mobile.value)? '25%' : '10%',
      cellsalign: 'center',
      align: 'center',
    },
    {
      text: 'Región',
      dataField: 'regi_ases',
      width: (mobile.value)? '25%' : '10%',
      cellsalign: 'center',
      align: 'center',
    },
    {
      text: 'Facturado',
      dataField: 'nume_fact',
      width: (mobile.value)? '25%' : '10%',
      cellsalign: 'center',
      align: 'center',
    },
    {
      text: 'Documento identidad referida',
      dataField: 'nume_refe',
      width: (mobile.value)? '25%' : '10%',
      cellsalign: 'center',
      align: 'center',
    },
    {
      text: 'Nombre referida',
      dataField: 'nomb_refe',
      width: (mobile.value)? '25%' : '10%',
      cellsalign: 'center',
      align: 'center',
    },
    {
      text: 'Documento identidad',
      dataField: 'nume_iden',
      width: (mobile.value)? '25%' : '10%',
      cellsalign: 'left',
      align: 'center',
    },
    {
      text: 'Primer nombre',
      dataField: 'prim_nomb',
      width: (mobile.value)? '25%' : '10%',
      cellsalign: 'left',
      align: 'center',
    },
    {
      text: 'Segundo nombre',
      dataField: 'segu_nomb',
      width: (mobile.value)? '25%' : '10%',
      cellsalign: 'left',
      align: 'center',
    },
    {
      text: 'Primer apellido',
      dataField: 'prim_apel',
      width: (mobile.value)? '25%' : '10%',
      cellsalign: 'left',
      align: 'center',
    },
    {
      text: 'Segundo apellido',
      dataField: 'segu_apel',
      width: (mobile.value)? '25%' : '10%',
      cellsalign: 'left',
      align: 'center',
    },
    {
      text: 'Celular',
      dataField: 'celu_ases',
      width: (mobile.value)? '25%' : '10%',
      cellsalign: 'left',
      align: 'center',
    },
    {
      text: 'Departamento',
      dataField: 'nomb_dpto',
      width: (mobile.value)? '25%' : '10%',
      cellsalign: 'left',
      align: 'center',
    },
    {
      text: 'Provincia',
      dataField: 'nomb_ciud',
      width: (mobile.value)? '25%' : '10%',
      cellsalign: 'left',
      align: 'center',
    },
    {
      text: 'Distrito',
      dataField: 'nomb_barr',
      width: (mobile.value)? '25%' : '10%',
      cellsalign: 'left',
      align: 'center',
    },
    {
      text: 'Dirección',
      dataField: 'dire_ases',
      width: (mobile.value)? '25%' : '20%',
      cellsalign: 'left',
      align: 'center',
    },
    {
      text: 'Fecha nacimiento',
      dataField: 'fech_naci',
      width: (mobile.value)? '25%' : '10%',
      cellsalign: 'left',
      align: 'center',
    },
    {
      text: 'Sexo',
      dataField: 'codi_sexo',
      width: (mobile.value)? '25%' : '10%',
      cellsalign: 'left',
      align: 'center',
    },
    {
      text: 'Estado',
      dataField: 'esta_fina',
      width: (mobile.value)? '25%' : '10%',
      cellsalign: 'left',
      align: 'center',
    },
    {
      text: 'Observación',
      dataField: 'obse_segu',
      width: (mobile.value)? '25%' : '10%',
      cellsalign: 'left',
      align: 'center',
    },
  ]
})

const sourceGlobal = ref({
  localdata: [],
  datafields: [
    { name: 'docu_lide', type: 'string' },
    { name: 'nomb_lide', type: 'string' },
    { name: 'codi_zona', type: 'string' },
    { name: 'codi_sect', type: 'string' },
    { name: 'codi_camp', type: 'string' },
    { name: 'camp_ingr', type: 'string' },
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
    { name: 'geo_zona', type: 'string' },
    { name: 'geo_sect', type: 'string' },
    { name: 'zona_fina', type: 'string' },
    { name: 'sect_fina', type: 'string' },
    { name: 'esta_acti', type: 'string' },
    { name: 'regi_ases', type: 'string' },
    { name: 'nume_fact', type: 'string' },
    { name: 'obse_segu', type: 'string' },
    { name: 'medi_comu', type: 'string' },
  ],
  datatype: 'json',
})

const adaptadorGlobal = new jqx.dataAdapter(sourceGlobal.value)
const refGridGlobal = ref()
const localization = appStore.localization

const modalImagen = ref(false)
const imagenTitulo = ref('')

const imagen = ref(
  {
    srcDniFrontal: '',
    srcDniAdverso: '',
    srcSelfie: '',
    srcServicio: '',
  },
)

onMounted(async () => {
  appStore.titulo(`Reportes / Vinculación digital`)
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
      },
    })

    sourceGlobal.value.localdata = data
    refGridGlobal.value.updatebounddata('cells')
    refGridGlobal.value.refreshfilterrow()
    refGridGlobal.value.clearselection()
    refGridGlobal.value.autoresizecolumns()
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

const onExcel = async () => {
  const dataInfoGlob = refGridGlobal.value.getdatainformation()
  const dataRowsGlob = dataInfoGlob.rowscount
  if(dataRowsGlob == 0 ) {
    appStore.mensajeSnackbar('No tiene información por exportar.')
    appStore.color("error")
    appStore.snackbar(true)
  } else {
    try {
      appStore.mensaje('Generando archivo')
      appStore.loading(true)

      const { data }  = await $api(`/api/sami/v1/procesos/vinculacion-digital/excel`, {
        method: "post", 
        body: {
          cabecera: cabecera.value,
          detalle: refGridGlobal.value.getrows(),
        },
      })
    
      window.open(`${$base}/temporales/${data}`, '_blank')
    } catch (e) {
    }
    finally { 
      appStore.loading(false)
    }
  }
}

const onLimpiar= async () => {
  formulario.value = {
    campana: null,
  }

  sourceGlobal.value.localdata = []
  refGridGlobal.value.updatebounddata('cells')
  refGridGlobal.value.refreshfilterrow()
  refGridGlobal.value.clearselection()
}

const limpiarValidacion = () => {
  errorCampana.value = false
  errorMensajeCampana.value = ''
}

const onVerImagen = async () => {
  appStore.mensaje('Generando archivo')
  appStore.loading(true)

  const rowindexes = refGridGlobal.value.getselectedrowindex()

  if (rowindexes === -1) {
    appStore.mensajeSnackbar('No tiene vinculacion seleccionada.')
    appStore.color("error")
    appStore.snackbar(true)
  } else {
    try {
      appStore.mensaje('Generando proceso.')
      appStore.loading(true)

      const dataRecord = refGridGlobal.value.getrowdata(rowindexes)
      const codiCamp = dataRecord.codi_camp
      const numeIden = dataRecord.nume_iden

      await $api(`/api/sami/v1/procesos/vinculacion-digital/imagen`, {
        method: "post",
        body: {
          campana: codiCamp,
          documento: numeIden,
        },
      })
      imagenTitulo.value = `Imagen de la solicitud ${numeIden}`

      const baseURL = import.meta.env.VITE_API

      imagen.value.srcSelfie =  `${baseURL}/temporales/vinculacion/image_0002${numeIden}.jpg`
      imagen.value.srcDniFrontal = `${baseURL}/temporales/vinculacion/${numeIden}_cedu.jpg`
      imagen.value.srcDniAdverso =  `${baseURL}/temporales/vinculacion/${numeIden}_docu.jpg`
      imagen.value.srcServicio =  `${baseURL}/temporales/vinculacion/${numeIden}_recibo.jpg`
      modalImagen.value = true
    } catch (error) {

    } finally {
      appStore.loading(false)
      appStore.mensaje('')
    }
  }
}

const onCloseImagen = () => {
  modalImagen.value = false
  imagenTitulo.value = ''
  imagen.value = {
    srcDniFrontal: '',
    srcDniAdverso: '',
    srcSelfie: '',
    srcServicio: '',
  }
}

const errorImagen = tipo => {
  if(tipo === 1) {
    imagen.value.srcSelfie = sinImagen
  } else if (tipo === 2) {
    imagen.value.srcDniFrontal = sinImagen
  } else if (tipo === 3) {
    imagen.value.srcDniAdverso = sinImagen
  } else if (tipo === 4) {
    imagen.value.srcServicio = sinImagen
  }
}


const visible = ref()
const imgs = ref([])
const index = ref()

const verImagen = (title, src) => {
  imgs.value = [
    { title, src },
  ]
  visible.value = true
}

const ocultarImagen = () => {
  visible.value = false
}
</script>

<template>
  <div>
    <AppPlantilla>
      <template #botones>
        <GenerarBoton @procesar="onGenerar" />
        <ExcelBoton @procesar="onExcel" />
        <ImagenBoton @procesar="onVerImagen" />
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
    <VDialog
      :fullscreen="(mobile) ? true : false"
      :max-width="(mobile) ? undefined : 1100"
      persistent
      :model-value="modalImagen"
    >
      <VCard color="background">
        <VToolbar color="primary">
          <VBtn
            v-if="mobile"
            icon
            color="default"
            :rounded="false"
            @click="onCloseImagen"
          >
            <VIcon icon="tabler-x" />
          </VBtn>
          <VToolbarTitle>
            {{ imagenTitulo }}
          </VToolbarTitle>
          <VSpacer />
          <VToolbarItems>
            <VBtn
              v-if="!mobile"
              icon
              @click="onCloseImagen"
            >
              <VIcon icon="tabler-x" />
            </VBtn>
          </VToolbarItems>
        </VToolbar>
        <VCardText>
          <VRow>
            <VCol
              cols="12"
              md="4"
              class="d-flex flex-column align-items-center justify-content-center text-center"
            >
              <VImg
                :width="300"
                alt="Selfie"
                aspect-ratio="16/9"
                :src="imagen.srcSelfie"
                @error="errorImagen(1)"
              />
              <h4 class="my-4">
                Selfie
              </h4>
              <div :class="(imagen.srcSelfie.includes('temporales')) ? 'd-flex justify-space-between' : 'd-flex justify-center'">
                <VBtn
                  v-if="imagen.srcSelfie.includes('vinculacion') || imagen.srcSelfie.includes('temporales')"
                  block
                  variant="outlined"
                  color="secondary"
                  @click="verImagen('Selfie', imagen.srcSelfie)"
                >
                  VER IMAGEN
                </VBtn>
              </div>
            </VCol>

            <VCol
              cols="12"
              md="4"
              class="d-flex flex-column align-items-center justify-content-center text-center"
            >
              <VImg
                :width="300"
                alt=" Dni frontal"
                aspect-ratio="16/9"
                :src="imagen.srcDniFrontal"
                @error="errorImagen(2)"
              />
              <h4 class="my-4">
                Documento frontal
              </h4>
              <div :class="(imagen.srcDniFrontal.includes('temporales')) ? 'd-flex justify-space-between' : 'd-flex justify-center'">
                <VBtn
                  v-if="imagen.srcDniFrontal.includes('vinculacion') || imagen.srcDniFrontal.includes('temporales')"
                  block
                  variant="outlined"
                  color="secondary"
                  @click="verImagen('Cédula frontal', imagen.srcDniFrontal)"
                >
                  VER IMAGEN
                </VBtn>
              </div>
            </VCol>

            <VCol
              cols="12"
              md="4"
              class="d-flex flex-column align-items-center justify-content-center text-center"
            >
              <VImg
                :width="300"
                alt="Cédula adverso"
                aspect-ratio="16/9"
                :src="imagen.srcDniAdverso"
                @error="errorImagen(3)"
              />
              <h4 class="my-4">
                Documento adverso
              </h4>
              <div :class="(imagen.srcDniAdverso.includes('temporales')) ? 'd-flex justify-space-between' : 'd-flex justify-center'">
                <VBtn
                  v-if="imagen.srcDniAdverso.includes('vinculacion') || imagen.srcDniAdverso.includes('temporales')"
                  block
                  variant="outlined"
                  color="secondary"
                  @click="verImagen('Cédula adverso', imagen.srcDniAdverso)"
                >
                  VER IMAGEN
                </VBtn>
              </div>
            </VCol>

            <VCol
              cols="12"
              md="4"
              class="d-flex flex-column align-items-center justify-content-center text-center"
            >
              <VImg
                :width="300"
                alt="Recibo"
                aspect-ratio="16/9"
                :src="imagen.srcServicio"
                @error="errorImagen(4)"
              />
              <h4 class="my-4">
                Recibo
              </h4>
              <div :class="(imagen.srcServicio.includes('temporales')) ? 'd-flex justify-space-between' : 'd-flex justify-center'">
                <VBtn
                  v-if="imagen.srcServicio.includes('vinculacion') || imagen.srcServicio.includes('temporales')"
                  block
                  variant="outlined"
                  color="secondary"
                  @click="verImagen('Recibo', imagen.srcServicio)"
                >
                  VER IMAGEN
                </VBtn>
              </div>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VDialog>
    <VueEasyLightbox
      esc-disabled
      :visible="visible"
      :imgs="imgs"
      :index="index"
      @hide="ocultarImagen"
    />
  </div>
</template>

