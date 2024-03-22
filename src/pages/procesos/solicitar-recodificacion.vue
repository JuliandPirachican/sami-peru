<!-- eslint-disable camelcase -->
<script setup>
import { useAppStore } from '@/stores/app'
import sinImagen from '@images/sin_imagen.png'


definePage({
  meta: {
    action: 'peru/proc_come_soli_reco',
    subject: 'peru/proc_come_soli_reco',
  },
})

const appStore = useAppStore()

const formulario = ref({
  identificacion: '',
  codigo: '',
  nombres: '',
  apellidos: '',
  zona: '',
  sector: '',
  direccion: '',
  telefono: '',
  celular: '',
  correo: '',
  selectedTipoRecodificacion: null,
  observacion: '',
  srcFormatoSolicitud: sinImagen,
  codigoFormatoSolicitud: 0,
  srcReciboServicio: sinImagen,
  codigoReciboServicio: 0,
  srcDni: sinImagen,
  codigoDni: 0,
  srcFormatoRuc: sinImagen,
  codigoFormatoRuc: 0,
})

const uploadInputFormatoSolicitud = ref()
const uploadInputReciboServicio = ref()
const uploadInputDni = ref()
const uploadInputFormatoRuc = ref()
const archivoFoto = ref(null)

const tiposOptions = ref([
  { id: 'dni_ruc',       text: 'Cambio dni por Ruc' },
  { id: 'ruc_dni',       text: 'Cambio ruc por dni' },
  { id: 'zona',          text: 'Cambio zona' },
  { id: 'direccion',     text: 'Cambio dirección' },
  { id: 'celular_email', text: 'Otros: Celular/email' },
])

const errorIdentificacion = ref(false)
const errorMensajeIdentificacion = ref('')

const errorCodigo = ref(false)
const errorMensajeCodigo = ref('')

const errorTipoRecodificacion = ref(false)
const errorMensajeTipoRecodificacion = ref('')

const errorObservacion = ref(false)
const errorMensajeObservacion = ref('')

onMounted(async () => {
  appStore.titulo(`Procesos / Solicitar recodificación`)
})

const limpiarValidacion = () => {
  errorIdentificacion.value = false
  errorMensajeIdentificacion.value = ''

  errorCodigo.value = false
  errorMensajeCodigo.value = ''

  errorTipoRecodificacion.value = false
  errorMensajeTipoRecodificacion.value = ''

  errorObservacion.value = false
  errorMensajeObservacion.value = ''
}


const onRegistrar = async () => {
  limpiarValidacion()
  try {
    appStore.mensaje('Generando proceso')
    appStore.loading(true)

    const data  = await $api(`/api/sami/v1/procesos/solicitud-recodificacion/registrar`, {
      method: "post",
      body: {
        identificacion: (formulario.value.identificacion === null) ? '' : formulario.value.identificacion,
        codigo: (formulario.value.codigo === null) ? '' : formulario.value.codigo,
        tipoRecodificacion: (formulario.value.selectedTipoRecodificacion === null) ? '' : formulario.value.selectedTipoRecodificacion,
        observacion: (formulario.value.observacion === null) ? '' : formulario.value.observacion,
        codigoFormatoSolicitud: (formulario.value.codigoFormatoSolicitud === 0) ? '0' : formulario.value.codigoFormatoSolicitud,
        codigoReciboServicio: (formulario.value.codigoReciboServicio === 0) ? '0' : formulario.value.codigoReciboServicio,
        codigoDni: (formulario.value.codigoDni === 0) ? '0' : formulario.value.codigoDni,
        codigoFormatoRuc: (formulario.value.codigoFormatoRuc === 0) ? '0' : formulario.value.codigoFormatoRuc,
      },
    })

    onLimpiar()

    let mensaje = data.message
    mensaje = mensaje.toLowerCase()
    mensaje = mensaje.charAt(0).toUpperCase() + mensaje.slice(1)
    appStore.mensajeSnackbar(mensaje)
    appStore.color("success")
    appStore.snackbar(true)

  } catch (error) {
    const { data } = error.response._data
    if (typeof data != "undefined") {
      for (var key in data)
      {
        if (key == 'identificacion') {
          errorIdentificacion.value = true
          errorMensajeIdentificacion.value = data[key]
        }
        if (key == 'codigo') {
          errorCodigo.value = true
          errorMensajeCodigo.value = data[key]
        }
        if (key == 'tipoRecodificacion') {
          errorTipoRecodificacion.value = true
          errorMensajeTipoRecodificacion.value = data[key]
        }
        if (key == 'observacion') {
          errorObservacion.value = true
          errorMensajeObservacion.value = data[key]
        }
      }
    }
  }
  finally {
    appStore.loading(false)
  }
  
}

const onLimpiar = () => {
  limpiarValidacion()

  formulario.value = {
    identificacion: '',
    codigo: '',
    nombres: '',
    apellidos: '',
    zona: '',
    sector: '',
    direccion: '',
    telefono: '',
    celular: '',
    correo: '',
    isIdentificacion: false,
    selectedTipoRecodificacion: null,
    observacion: '',
    srcFormatoSolicitud: sinImagen,
    codigoFormatoSolicitud: 0,
    srcReciboServicio: sinImagen,
    codigoReciboServicio: 0,
    srcDni: sinImagen,
    codigoDni: 0,
    srcFormatoRuc: sinImagen,
    codigoFormatoRuc: 0,
  }
}

const proc_come_soli_reco_nume_iden = async() => {
  limpiarValidacion()

  try {
    appStore.mensaje('Obteniendo provincias')
    appStore.loading(true)

    const data  = await $api(`/api/sami/v1/procesos/solicitud-recodificacion/asesora`, {
      method: "get",
      query: {
        identificacion: (formulario.value.identificacion === null) ? '' : formulario.value.identificacion,
      },
    })
    
    const dato = data.data.data_glob

    formulario.value.codigo = dato.cons_terc
    formulario.value.nombres = dato.nomb_terc
    formulario.value.apellidos = dato.apel_terc
    formulario.value.zona = dato.codi_zona
    formulario.value.sector = dato.codi_sect
    formulario.value.direccion = dato.dire_terc
    formulario.value.telefono = dato.tele_ases
    formulario.value.celular = dato.celu_ases
    formulario.value.correo = dato.corr_ases
    formulario.value.isIdentificacion = true

    let mensaje = data.message
    mensaje = mensaje.toLowerCase()
    mensaje = mensaje.charAt(0).toUpperCase() + mensaje.slice(1)
    appStore.mensajeSnackbar(mensaje)
    appStore.color("success")
    appStore.snackbar(true)
    
  } catch (error) {
    const { data } = error.response._data    
    if (typeof data != "undefined") {
      for (var key in data)
      {
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

const proc_come_soli_reco_bind_text = async () => {
  const regex = new RegExp('^[a-zA-Z0-9- ]+$')

  const key = String.fromCharCode(
    !event.charCode ? event.which : event.charCode,
  )

  if (!regex.test(key)) {
    event.preventDefault()
    
    return false
  }
  
  return true
}

const proc_come_soli_reco_bind_nume = async () => {
  const regex = new RegExp('^[0-9]+$')

  const key = String.fromCharCode(
    !event.charCode ? event.which : event.charCode,
  )

  if (!regex.test(key)) {
    event.preventDefault()
    
    return false
  }
  
  return true
}

const handleFileUpload = async tipo => {
  try {
    appStore.mensaje('Subiendo archivo')
    appStore.loading(true)
    let fileInput = ''
    if(tipo === 1) {
      fileInput = uploadInputFormatoSolicitud.value
    } else if (tipo === 2) {
      fileInput = uploadInputReciboServicio.value
    } else if (tipo === 3) {
      fileInput = uploadInputDni.value
    } else if (tipo === 4) {
      fileInput = uploadInputFormatoRuc.value
    }
    archivoFoto.value = fileInput.files[0]

    const dataForm = new FormData()

    dataForm.append('fileToUpload', archivoFoto.value)
    dataForm.append('numero', formulario.value.identificacion)
    dataForm.append('codigo', tipo)

    const response  = await $api(`/api/sami/v1/procesos/solicitud-recodificacion/archivo`, {
      method: "post",
      body: dataForm,
    })
 
    const foto = await response.message
    switch (tipo) {
    case 1:
      formulario.value.srcFormatoSolicitud = foto
      formulario.value.codigoFormatoSolicitud = 1
      break
    case 2:
      formulario.value.srcReciboServicio = foto
      formulario.value.codigoReciboServicio = 1
      break
    case 3:
      formulario.value.srcDni = foto
      formulario.value.codigoDni = 1
      break
    case 4:
      formulario.value.srcFormatoRuc = foto
      formulario.value.codigoFormatoRuc = 1
      break
    default:
    }

    appStore.mensajeSnackbar('Imagen cargada con éxito.')
    appStore.color("success")
    appStore.snackbar(true)
    // eslint-disable-next-line no-empty
  } catch (error) {
    const { data } = error.response._data    
    if (typeof data != "undefined") {
      for (var key in data)
      {
        if (key == 'numero') {
          errorIdentificacion.value = true
          errorMensajeIdentificacion.value = data[key]
        }
      }
    }
  } finally {
    appStore.loading(false)
    appStore.mensaje('')
  }
}
</script>

<template>
  <div>
    <AppPlantilla>
      <template #botones>
        <RegistrarBoton @procesar="onRegistrar" />
        <LimpiarBoton @procesar="onLimpiar" />
      </template>
      <template #contenido>
        <VRow>
          <VCol cols="12">
            <VCard title="Datos asesora">
              <VCardText>
                <VRow>
                  <VCol
                    cols="12"
                    md="3"
                  >
                    <AppTextField
                      v-model="formulario.identificacion"
                      label="Doc. ident."
                      type="text"
                      placeholder="Ingresar doc. ident."
                      autocomplete="off"
                      :disabled="formulario.isIdentificacion"
                      :error="errorIdentificacion"
                      :error-messages="errorMensajeIdentificacion"
                      @keyup.enter="proc_come_soli_reco_nume_iden"
                      @keydown.tab="proc_come_soli_reco_nume_iden"
                      @keypress="proc_come_soli_reco_bind_nume"
                    />
                  </VCol>
                </VRow>

                <VRow>
                  <VCol
                    cols="12"
                    md="2"
                  >
                    <AppTextField
                      v-model="formulario.codigo"
                      label="Código"
                      type="text"
                      autocomplete="off"
                      disabled
                      :error="errorCodigo"
                      :error-messages="errorMensajeCodigo"
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="5"
                  >
                    <AppTextField
                      v-model="formulario.nombres"
                      label="Nombre(s)"
                      type="text"
                      autocomplete="off"
                      disabled
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="5"
                  >
                    <AppTextField
                      v-model="formulario.apellidos"
                      label="Apellido(s)"
                      type="text"
                      autocomplete="off"
                      disabled
                    />
                  </VCol>
                </VRow>

                <VRow>
                  <VCol
                    cols="12"
                    md="3"
                  >
                    <AppTextField
                      v-model="formulario.zona"
                      label="Zona"
                      type="text"
                      autocomplete="off"
                      disabled
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="3"
                  >
                    <AppTextField
                      v-model="formulario.sector"
                      label="Sector"
                      type="text"
                      autocomplete="off"
                      disabled
                    />
                  </VCol>
                </VRow>

                <VRow>
                  <VCol
                    cols="12"
                    md="12"
                  >
                    <AppTextField
                      v-model="formulario.direccion"
                      label="Dirección"
                      type="text"
                      autocomplete="off"
                      disabled
                    />
                  </VCol>
                </VRow>

                <VRow>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formulario.telefono"
                      label="Teléfono casa"
                      type="text"
                      autocomplete="off"
                      disabled
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formulario.celular"
                      label="Teléfono celular"
                      type="text"
                      autocomplete="off"
                      disabled
                    />
                  </VCol>
                </VRow>

                <VRow>
                  <VCol
                    cols="12"
                    md="12"
                  >
                    <AppTextField
                      v-model="formulario.correo"
                      label="Correo electrónico"
                      type="text"
                      autocomplete="off"
                      disabled
                    />
                  </VCol>
                </VRow>
              </VCardText>
            </VCard>
            <VCard title="Datos Solicitud">
              <VCardText>
                <VRow>
                  <VCol
                    cols="12"
                    md="12"
                  >
                    <VRadioGroup
                      v-model="formulario.selectedTipoRecodificacion"
                      label="Tipo recodificación"
                      :error="errorTipoRecodificacion"
                      :error-messages="errorMensajeTipoRecodificacion"
                      inline
                    >
                      <VRadio
                        v-for="option in tiposOptions"
                        :key="option.id"
                        :label="option.text"
                        :value="option.id"
                      />
                    </VRadioGroup>
                  </VCol>
                </VRow>

                <VRow>
                  <VCol
                    cols="12"
                    md="12"
                  >
                    <VTextarea
                      v-model="formulario.observacion"
                      label="Ingresa observación solicitud"
                      :error="errorObservacion"
                      :error-messages="errorMensajeObservacion"
                      maxlength="100"
                      rows="3"
                      @keypress="proc_come_soli_reco_bind_text"
                    />
                  </VCol>
                </VRow>

                <VRow>
                  <VCol
                    cols="12"
                    md="3"
                    class="d-flex flex-column align-items-center justify-content-center text-center"
                  >
                    <VImg
                      :width="300"
                      alt="Formato solicitud"
                      aspect-ratio="16/9"
                      cover
                      :src="formulario.srcFormatoSolicitud"
                    />
                    <h4 class="my-4">
                      Formato solicitud
                    </h4>
                    <div :class="(formulario.srcFormatoSolicitud.includes('fotos') || formulario.srcFormatoSolicitud.includes('temporales')) ? 'd-flex justify-center' : 'd-flex justify-center'">
                      <input
                        ref="uploadInputFormatoSolicitud"
                        type="file"
                        class="d-none"
                        accept=".jpg"
                        @change="handleFileUpload(1)"
                      >
                      <VBtn
                        color="primary"
                        @click="$refs.uploadInputFormatoSolicitud.click()"
                      >
                        SUBIR
                      </VBtn>
                    </div>
                  </VCol>

                  <VCol
                    cols="12"
                    md="3"
                    class="d-flex flex-column align-items-center justify-content-center text-center"
                  >
                    <VImg
                      :width="300"
                      alt="Recibo servicio"
                      aspect-ratio="16/9"
                      cover
                      :src="formulario.srcReciboServicio"
                    />
                    <h4 class="my-4">
                      Recibo servicio
                    </h4>
                    <div :class="(formulario.srcReciboServicio.includes('fotos') || formulario.srcReciboServicio.includes('temporales')) ? 'd-flex justify-center' : 'd-flex justify-center'">
                      <input
                        ref="uploadInputReciboServicio"
                        type="file"
                        class="d-none"
                        accept=".jpg"
                        @change="handleFileUpload(2)"
                      >
                      <VBtn
                        color="primary"
                        @click="$refs.uploadInputReciboServicio.click()"
                      >
                        SUBIR
                      </VBtn>
                    </div>
                  </VCol>

                  <VCol
                    cols="12"
                    md="3"
                    class="d-flex flex-column align-items-center justify-content-center text-center"
                  >
                    <VImg
                      :width="300"
                      alt="Dni"
                      aspect-ratio="16/9"
                      cover
                      :src="formulario.srcDni"
                    />
                    <h4 class="my-4">
                      Dni
                    </h4>
                    <div :class="(formulario.srcDni.includes('fotos') || formulario.srcDni.includes('temporales')) ? 'd-flex justify-center' : 'd-flex justify-center'">
                      <input
                        ref="uploadInputDni"
                        type="file"
                        class="d-none"
                        accept=".jpg"
                        @change="handleFileUpload(3)"
                      >
                      <VBtn
                        color="primary"
                        @click="$refs.uploadInputDni.click()"
                      >
                        SUBIR
                      </VBtn>
                    </div>
                  </VCol>

                  <VCol
                    cols="12"
                    md="3"
                    class="d-flex flex-column align-items-center justify-content-center text-center"
                  >
                    <VImg
                      :width="300"
                      alt="Formato Ruc"
                      aspect-ratio="16/9"
                      cover
                      :src="formulario.srcFormatoRuc"
                    />
                    <h4 class="my-4">
                      Formato Ruc
                    </h4>
                    <div :class="(formulario.srcFormatoRuc.includes('fotos') || formulario.srcFormatoRuc.includes('temporales')) ? 'd-flex justify-center' : 'd-flex justify-center'">
                      <input
                        ref="uploadInputFormatoRuc"
                        type="file"
                        class="d-none"
                        accept=".jpg"
                        @change="handleFileUpload(4)"
                      >
                      <VBtn
                        color="primary"
                        @click="$refs.uploadInputFormatoRuc.click()"
                      >
                        SUBIR
                      </VBtn>
                    </div>
                  </VCol>
                </VRow>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </template>
    </AppPlantilla>
  </div>
</template>
