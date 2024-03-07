<!-- eslint-disable camelcase -->
<script setup>
import { useAppStore } from '@/stores/app'

definePage({
  meta: {
    action: 'peru/proc_cart_resp_inci_diar',
    subject: 'peru/proc_cart_resp_inci_diar',
  },
})

const userData = JSON.parse(localStorage.getItem('userData'))
const appStore = useAppStore()

const formulario = ref({
  dniAsesora: '',
  codigo: '',
  nombreAsesora: '',
  numeroIncidencia: '',
  campana: '',
  deudaInicial: '',
  incidencia: '',
  gestionActual: '',
  entidad: '',
  respuesta: '',
  urlSolicitud: '',
  isRespuesta: true,
  isDniAsesora: false,
})

const errorIdentificacion = ref(false)
const errorMensajeIdentificacion = ref('')

const errorRespuesta = ref(false)
const errorMensajeRespuesta = ref('')

const loginData = JSON.parse(localStorage.getItem('login'))

onMounted(async () => {
  appStore.titulo(`${loginData.pais} / Procesos / Respuesta incidencia diaria`)
})

const limpiarValidacion = () => {
  errorIdentificacion.value = false
  errorMensajeIdentificacion.value = ''

  errorRespuesta.value = false
  errorMensajeRespuesta.value = ''
}


const onRegistrar = async () => {
  limpiarValidacion()
  try {
    appStore.mensaje('Generando proceso')
    appStore.loading(true)

    const data  = await $api(`/api/sami/v1/procesos/respuesta-incidencia-diaria`, {
      method: "post",
      body: {
        numeroIncidencia: (formulario.value.numeroIncidencia === null) ? '' : formulario.value.numeroIncidencia,
        respuesta: (formulario.value.respuesta === null) ? '' : formulario.value.respuesta,
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
        if (key == 'numeroIncidencia') {
          errorIdentificacion.value = true
          errorMensajeIdentificacion.value = data[key]
        }
        if (key == 'respuesta') {
          errorRespuesta.value = true
          errorMensajeRespuesta.value = data[key]
        }
      }
    }
  }
  finally {
    appStore.loading(false)
  }
  
}

const obtenerDatosAsesora = async () => {
  limpiarValidacion()

  try {
    appStore.mensaje('Obteniendo información')
    appStore.loading(true)

    const data  = await $api(`/api/sami/v1/procesos/respuesta-incidencia-diaria/datos`, {
      method: "get",
      query: {
        identificacion: (formulario.value.dniAsesora === null) ? '' : formulario.value.dniAsesora,
      },
    })

    const dato = data.data.data_glob

    formulario.value.codigo = dato.cons_terc
    formulario.value.nombreAsesora = dato.nomb_terc
    formulario.value.numeroIncidencia = dato.cons_inci
    formulario.value.campana = dato.camp_inci
    formulario.value.deudaInicial = dato.deud_inci
    formulario.value.incidencia = dato.obse_inci
    formulario.value.gestionActual = dato.gest_inci
    formulario.value.entidad = dato.enti_inci
    formulario.value.respuesta = dato.resp_inci
    formulario.value.isRespuesta = false
    formulario.value.isDniAsesora = true

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

const onLimpiar = () => {
  limpiarValidacion()
  formulario.value.dniAsesora = ''
  formulario.value.codigo = ''
  formulario.value.nombreAsesora = ''
  formulario.value.numeroIncidencia = ''
  formulario.value.campana = ''
  formulario.value.deudaInicial = ''
  formulario.value.incidencia = ''
  formulario.value.gestionActual = ''
  formulario.value.entidad = ''
  formulario.value.respuesta = ''
  formulario.value.urlSolicitud = ''
  formulario.value.isRespuesta = true
  formulario.value.isDniAsesora = false
}

const proc_cart_resp_inci_diar_bind_nume_iden = async () => {
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

const proc_cart_resp_inci_diar_bind_resp_inci = async () => {
  const regex = new RegExp('^[A-Za-z ]+$')

  const key = String.fromCharCode(
    !event.charCode ? event.which : event.charCode,
  )

  if (!regex.test(key)) {
    event.preventDefault()

    return false
  }
  
  return true
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
            <VCard>
              <VCardText>
                <VRow>
                  <VCol
                    cols="12"
                    md="3"
                  >
                    <AppTextField
                      v-model="formulario.dniAsesora"
                      label="Nro identificación"
                      type="text"
                      placeholder="Ingresar nro identificación"
                      autocomplete="off"
                      :disabled="formulario.isDniAsesora"
                      :error="errorIdentificacion"
                      :error-messages="errorMensajeIdentificacion"
                      @keyup.enter="obtenerDatosAsesora"
                      @keydown.tab="obtenerDatosAsesora"
                      @keypress="proc_cart_resp_inci_diar_bind_nume_iden"
                    />
                  </VCol>
                </VRow>

                <VRow>
                  <VCol
                    cols="12"
                    md="3"
                  >
                    <AppTextField
                      v-model="formulario.codigo"
                      label="Código"
                      type="text"
                      autocomplete="off"
                      disabled="true"
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formulario.nombreAsesora"
                      label="Nombres y apellido(s)"
                      type="text"
                      autocomplete="off"
                      disabled="true"
                    />
                  </VCol>
                </VRow>

                <VRow>
                  <VCol
                    cols="12"
                    md="3"
                  >
                    <AppTextField
                      v-model="formulario.numeroIncidencia"
                      label="Nro incidencia"
                      type="text"
                      autocomplete="off"
                      disabled="true"
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="3"
                  >
                    <AppTextField
                      v-model="formulario.campana"
                      label="Campaña"
                      type="text"
                      autocomplete="off"
                      disabled="true"
                      class="col-md-6"
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="3"
                  >
                    <AppTextField
                      v-model="formulario.deudaInicial"
                      label="Deuda inicial"
                      type="text"
                      autocomplete="off"
                      disabled="true"
                      class="col-md-6"
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="3"
                  >
                    <AppTextField
                      v-model="formulario.incidencia"
                      label="Incidencia"
                      type="text"
                      autocomplete="off"
                      disabled="true"
                      class="col-md-6"
                    />
                  </VCol>
                </VRow>

                <VRow>
                  <VCol
                    cols="12"
                    md="3"
                  >
                    <AppTextField
                      v-model="formulario.gestionActual"
                      label="Gestión actual"
                      type="text"
                      autocomplete="off"
                      disabled="true"
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="3"
                  >
                    <AppTextField
                      v-model="formulario.entidad"
                      label="Entidad externa"
                      type="text"
                      autocomplete="off"
                      disabled="true"
                    />
                  </VCol>
                </VRow>

                <VRow>
                  <VCol
                    cols="12"
                    md="12"
                  >
                    <AppTextField
                      v-model="formulario.respuesta"
                      label="Respuesta"
                      type="text"
                      placeholder="Ingresar respuesta"
                      autocomplete="off"
                      :disabled="formulario.isRespuesta"
                      :error="errorRespuesta"
                      :error-messages="errorMensajeRespuesta"
                      @keypress="proc_cart_resp_inci_diar_bind_resp_inci"
                    />
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
