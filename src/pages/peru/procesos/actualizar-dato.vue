<!-- eslint-disable camelcase -->
<script setup>
import { useAppStore } from '@/stores/app'

definePage({
  meta: {
    action: 'peru/proc_come_actu_dato_simp',
    subject: 'peru/proc_come_actu_dato_simp',
  },
})

const userData = JSON.parse(localStorage.getItem('userData'))
const appStore = useAppStore()

const formulario = ref({
  identificacion: '',
  nombres: '',
  apellidos: '',
  zona: '',
  sector: '',
  direccion: '',
  telefono: '',
  celular: '',
  correo: '',
})

const errorIdentificacion = ref(false)
const errorMensajeIdentificacion = ref('')

const errorTelefono = ref(false)
const errorMensajeTelefono = ref('')

const errorCelular = ref(false)
const errorMensajeCelular = ref('')

const errorCorreo = ref(false)
const errorMensajeCorreo = ref('')

const loginData = JSON.parse(localStorage.getItem('login'))

onMounted(async () => {
  appStore.titulo(`${loginData.pais} / Procesos / Actualizar dato simple`)
})

const limpiarValidacion = () => {
  errorIdentificacion.value = false
  errorMensajeIdentificacion.value = ''

  errorTelefono.value = false
  errorMensajeTelefono.value = ''

  errorCelular.value = false
  errorMensajeCelular.value = ''

  errorCorreo.value = false
  errorMensajeCorreo.value = ''
}


const onRegistrar = async () => {
  limpiarValidacion()
  try {
    appStore.mensaje('Generando proceso')
    appStore.loading(true)

    const response = await $api(`/api/sami/v1/procesos/actualizar-dato-simple`, {
      method: "post",
      body: {
        identificacion: (formulario.value.identificacion === null) ? '' : formulario.value.identificacion,
        telefono: (formulario.value.telefono === null) ? '' : formulario.value.telefono,
        celular: (formulario.value.celular === null) ? '' : formulario.value.celular,
        correo: (formulario.value.correo === null) ? '' : formulario.value.correo,
      },
    })

    onLimpiar()

    let mensaje = response.data.message
    mensaje = mensaje.toLowerCase()
    mensaje = mensaje.charAt(0).toUpperCase() + mensaje.slice(1)
    appStore.mensajeSnackbar(mensaje)
    appStore.color("success")
    appStore.snackbar(true)

  } catch (e) {
    const { data } =  e.response._data  
    if (typeof data != "undefined") {
      for (var key in data)
      {
        if (key == 'identificacion') {
          errorIdentificacion.value = true
          errorMensajeIdentificacion.value = data[key]
        }
        if (key == 'telefono') {
          errorTelefono.value = true
          errorMensajeTelefono.value = data[key]
        }
        if (key == 'celular') {
          errorCelular.value = true
          errorMensajeCelular.value = data[key]
        }
        if (key == 'correo') {
          errorCorreo.value = true
          errorMensajeCorreo.value = data[key]
        }
      }
    }
  }
  finally {
    appStore.loading(false)
  }
  
}

const obtenerDatosSimples = async () => {
  limpiarValidacion()
  
  try {
    appStore.mensaje('Obteniendo información')
    appStore.loading(true)

    const { data } = await $api(`/api/sami/v1/procesos/actualizar-dato-simple/datos`, {

      method: "get",
      query: {
        identificacion: (formulario.value.identificacion === null) ? '' : formulario.value.identificacion,
      },
    })

    const dato = data.data_glob

    formulario.value.nombres = dato.nomb_terc
    formulario.value.apellidos = dato.apel_terc
    formulario.value.zona = dato.codi_zona
    formulario.value.sector = dato.codi_sect
    formulario.value.direccion = dato.dire_terc
    formulario.value.telefono = dato.tele_ases
    formulario.value.celular = dato.celu_ases
    formulario.value.correo = dato.corr_ases

    let mensaje = response.data.message
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
  formulario.value.identificacion = ''
  formulario.value.nombres = ''
  formulario.value.apellidos = ''
  formulario.value.zona = ''
  formulario.value.sector = ''
  formulario.value.direccion = ''
  formulario.value.telefono = ''
  formulario.value.celular = ''
  formulario.value.correo = ''
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
            <VCard title="Datos Asesora">
              <VCardText>
                <VRow>
                  <VCol
                    cols="12"
                    md="4"
                  >
                    <AppTextField
                      v-model="formulario.identificacion"
                      label="Nro identificación"
                      type="text"
                      placeholder="Ingresar nro identificación"
                      autocomplete="off"
                      :error="errorIdentificacion"
                      :error-messages="errorMensajeIdentificacion"
                      @keyup.enter="obtenerDatosSimples"
                      @keydown.tab="obtenerDatosSimples"
                    />
                  </VCol>
                </VRow>

                <VRow>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formulario.nombres"
                      label="Nombre(s)"
                      type="text"
                      placeholder=""
                      autocomplete="off"
                      disabled="true"
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formulario.apellidos"
                      label="Apellido(s)"
                      type="text"
                      placeholder=""
                      autocomplete="off"
                      disabled="true"
                    />
                  </VCol>
                </VRow>

                <VRow>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formulario.zona"
                      label="Zona"
                      type="text"
                      placeholder=""
                      autocomplete="off"
                      disabled="true"
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formulario.sector"
                      label="Sector"
                      type="text"
                      placeholder=""
                      autocomplete="off"
                      disabled="true"
                      class="col-md-6"
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
                      placeholder=""
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
                    <VLabel class="text-h5">
                      Datos Simples
                    </VLabel>
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
                      placeholder="Ingresar teléfono casa"
                      autocomplete="off"
                      :error="errorTelefono"
                      :error-messages="errorMensajeTelefono"
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
                      placeholder="Ingresar teléfono celular"
                      autocomplete="off"
                      :error="errorCelular"
                      :error-messages="errorMensajeCelular"
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
                      placeholder="Ingresar correo electrónico"
                      autocomplete="off"
                      :error="errorCorreo"
                      :error-messages="errorMensajeCorreo"
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
