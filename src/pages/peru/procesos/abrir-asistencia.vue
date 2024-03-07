<script setup>
import { useAppStore } from '@/stores/app'

definePage({
  meta: {
    action: 'peru/proc_come_abri_asis',
    subject: 'peru/proc_come_abri_asis',
  },
})

const userData = JSON.parse(localStorage.getItem('userData'))
const appStore = useAppStore()

const formulario = ref({
  tipo: null,
  campana: null,
  zona: null,
  codigo: null,
  hora: null,
  fecha: null,
})

const tipoOptions = ref([])
const errorTipo = ref(false)
const errorMensajeTipo = ref('')

const campanaOptions = ref([])
const errorCampana = ref(false)
const errorMensajeCampana = ref('')

const zonaOptions = ref([])
const errorZona = ref(false)
const errorMensajeZona = ref('')

const errorCodigo = ref(false)
const errorMensajeCodigo = ref('')

const errorHora = ref(false)
const errorMensajeHora = ref('')

const horaOptions = ref([
  { id: '08:00:00', text: '08:00:00' },
  { id: '09:00:00', text: '09:00:00' },
  { id: '10:00:00', text: '10:00:00' },
  { id: '11:00:00', text: '11:00:00' },
  { id: '12:00:00', text: '12:00:00' },
  { id: '13:00:00', text: '13:00:00' },
  { id: '14:00:00', text: '14:00:00' },
  { id: '15:00:00', text: '15:00:00' },
  { id: '16:00:00', text: '16:00:00' },
  { id: '17:00:00', text: '17:00:00' },
  { id: '18:00:00', text: '18:00:00' },
  { id: '19:00:00', text: '19:00:00' },
  { id: '20:00:00', text: '20:00:00' },
  { id: '21:00:00', text: '21:00:00' },
  { id: '22:00:00', text: '22:00:00' },
  { id: '23:00:00', text: '23:00:00' },
  { id: '24:00:00', text: '24:00:00' },
])

const errorFecha = ref(false)
const errorMensajeFecha = ref('')

const loginData = JSON.parse(localStorage.getItem('login'))

onMounted(async () => {
  appStore.titulo(`${loginData.pais} / Procesos / Abrir asistencia`)
  await obtenerReunion()
  await obtenerCampana()
  await obtenerZona()
  formulario.value.hora = '18:00:00'
  formulario.value.fecha = new Date()
})

const obtenerReunion = async () => {
  try {
    appStore.mensaje('Obteniendo reuniones')
    appStore.loading(true)

    const { data } = await $api(`/api/comun/v1/reuniones`, {
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
      // eslint-disable-next-line no-console
      console.log(e.response.data)
    }
  }
  finally {
    appStore.loading(false)
  }
}

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
      // eslint-disable-next-line no-console
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

const onRegistrar = async () => {
  limpiarValidacion()
  try {
    appStore.mensaje('Generando proceso')
    appStore.loading(true)

    const data = await $api(`/api/sami/v1/procesos/abrir-asistencia`, {
      method: "post",
      body: {
        tipo: (formulario.value.tipo === null) ? '' : formulario.value.tipo,
        campana: (formulario.value.campana === null) ? '' : formulario.value.campana,
        zona: (formulario.value.zona === null) ? '' : formulario.value.zona,
        codigo: (formulario.value.codigo === null) ? '' : formulario.value.codigo,
        hora: (formulario.value.hora === null) ? '' : formulario.value.hora,
        fecha: (formulario.value.fecha === null) ? '' : formulario.value.fecha,
      },
    })
    
    let mensaje = data.message
    mensaje = mensaje.toLowerCase()
    mensaje = mensaje.charAt(0).toUpperCase() + mensaje.slice(1)
    appStore.mensajeSnackbar(mensaje)
    appStore.color("success")
    appStore.snackbar(true)
    onLimpiar()
  } catch (error) {
    const { data } = error.response._data 
    if (typeof data != "undefined") {
      for (var key in data)
      {
        if (key == 'tipo') {
          errorTipo.value = true
          errorMensajeTipo.value = data[key]
        }
        if (key == 'campana') {
          errorCampana.value = true
          errorMensajeCampana.value = data[key]
        }
        if (key == 'zona') {
          errorZona.value = true
          errorMensajeZona.value = data[key]
        }
        if (key == 'codigo') {
          errorCodigo.value = true
          errorMensajeCodigo.value = data[key]
        }
        if (key == 'fecha') {
          errorFecha.value = true
          errorMensajeFecha.value = data[key]
        }
      }
    }
  }
  finally {
    appStore.loading(false)
  }
}

const onLimpiar= async () => {
  limpiarValidacion()

  formulario.value = {
    tipo: null, 
    campana: null,
    zona: null,
    codigo: null,
    hora: '18:00:00',
    fecha: new Date(),
  }
}

const limpiarValidacion = () => {
  errorTipo.value = false
  errorMensajeTipo.value = ''
  errorCampana.value = false
  errorMensajeCampana.value = ''
  errorZona.value = false
  errorMensajeZona.value = ''
  errorCodigo.value = false
  errorMensajeCodigo.value = ''
  errorHora.value = false
  errorMensajeHora.value = ''
  errorFecha.value = false
  errorMensajeFecha.value = ''
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
                    <AppSelect
                      v-model="formulario.tipo"
                      :items="tipoOptions"
                      label="Tipo reunión"
                      placeholder="Seleccionar tipo"
                      item-title="text"
                      item-value="id"
                      :error="errorTipo"
                      :error-messages="errorMensajeTipo"
                    />
                  </VCol>
                </VRow>

                <VRow>
                  <VCol
                    cols="12"
                    md="3"
                  >
                    <AppSelect
                      v-model="formulario.campana"
                      :items="campanaOptions"
                      label="Campaña de lanzamiento"
                      placeholder="Seleccionar campaña"
                      item-title="text"
                      item-value="id"
                      :error="errorCampana"
                      :error-messages="errorMensajeCampana"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="3"
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
                <VRow>
                  <VCol
                    cols="12"
                    md="3"
                  >
                    <AppTextField
                      v-model="formulario.codigo"
                      label="Código"
                      type="text"
                      placeholder="Ingresar código"
                      autocomplete="off"
                      :error="errorCodigo"
                      :error-messages="errorMensajeCodigo"
                    />
                  </VCol>
                </VRow>

                <VRow>
                  <VCol
                    cols="12"
                    md="3"
                  >
                    <AppSelect
                      v-model="formulario.hora"
                      :items="horaOptions"
                      label="Hora inicio"
                      placeholder="Seleccionar hora"
                      item-title="text"
                      item-value="id"
                      :error="errorHora"
                      :error-messages="errorMensajeHora"
                    />
                  </VCol>
                </VRow>

                <VRow>
                  <VCol
                    cols="12"
                    md="3"
                  >
                    <AppDateTimePicker
                      v-model="formulario.fecha"
                      label="Fecha conferencia"
                      placeholder="Seleccionar fecha"
                      :error="errorFecha"
                      :error-messages="errorMensajeFecha"
                      disabled="true"
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
