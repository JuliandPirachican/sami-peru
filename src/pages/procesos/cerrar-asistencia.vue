<script setup>
import { useAppStore } from '@/stores/app'

definePage({
  meta: {
    action: 'peru/proc_come_cerr_asis',
    subject: 'peru/proc_come_cerr_asis',
  },
})

const userData = JSON.parse(localStorage.getItem('userData'))
const appStore = useAppStore()

const formulario = ref({
  tipo: null,
  campana: null,
  zona: null,
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

const loginData = JSON.parse(localStorage.getItem('login'))

onMounted(async () => {
  appStore.titulo(`Procesos / Cerrar asistencia`)
  await obtenerReunion()
  await obtenerCampana()
  await obtenerZona()
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
      console.log(e.response._data)
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

const onRegistrar = async () => {
  limpiarValidacion()
  try {
    appStore.mensaje('Generando proceso')
    appStore.loading(true)

    const { data } = await $api( `/api/sami/v1/procesos/cerrar-asistencia`, {
      method: "post",
      body: {
        tipo: (formulario.value.tipo === null) ? '' : formulario.value.tipo,
        campana: (formulario.value.campana === null) ? '' : formulario.value.campana,
        zona: (formulario.value.zona === null) ? '' : formulario.value.zona,
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
  }
}


const limpiarValidacion = () => {
  errorTipo.value = false
  errorMensajeTipo.value = ''
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
        <RegistrarBoton @procesar="onRegistrar" />
        <LimpiarBoton @procesar="onLimpiar" />
      </template>
      <template #contenido>
        <VRow>
          <VCol cols="12">
            <VCard>
              <VCardText>
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
                    :error="errorTipo"
                    :error-messages="errorMensajeTipo"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="4"
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
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </template>
    </AppPlantilla>
  </div>
</template>
