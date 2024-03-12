<!-- eslint-disable camelcase -->
<script setup>
import { useAppStore } from '@/stores/app'
import { useDisplay } from 'vuetify'
import { VDataTable } from 'vuetify/labs/VDataTable'

definePage({
  meta: {
    action: 'peru/proc_come_gest_vaca',
    subject: 'peru/proc_come_gest_vaca',
  },
})

const { mobile } = useDisplay()
const appStore = useAppStore()
const userData = JSON.parse(localStorage.getItem('userData'))

const items = ref([])
const selected = ref([])

const formulario = ref({
  codigo: '',
  reemplazo: null,
  observacion: '',
})

const reemplazoOptions = ref([
  { id: 'No', text: 'No' },
  { id: 'Backup', text: 'Backup' },
  { id: 'Lider', text: 'Lider' },
])

const errorReemplazo = ref(false)
const errorMensajeReemplazo = ref('')

const errorObservacion = ref(false)
const errorMensajeObservacion = ref('')

const isOpenEditar = ref(false)

const headers = computed(() => {
  return [
    { title: '', key: 'acciones', sortable: false, width: '10px' },
    { title: 'Código', key: 'cons_vaca' },
    { title: 'Zona', key: 'codi_zona' },
    { title: 'Nombre(s) y apellido(s)', key: 'nomb_vend' },
    { title: 'Fecha inicial', key: 'fech_inic' },
    { title: 'Fecha final', key: 'fech_fina' },
    { title: 'Dia(s).', key: 'nume_diaa' },
  ]
})

const loginData = JSON.parse(localStorage.getItem('login'))

onMounted(async () => {
  appStore.titulo(`Procesos / Gestionar vacaciones`)
})

const onSeleccionar = data => {
  formulario.value.codigo = data.cons_vaca
  isOpenEditar.value = true
}

const onCloseEditar = () => {
  onLimpiar()
  limpiarValidacion()
  isOpenEditar.value = false
  onGenerar()
}

const onGenerar = async () => {
  try {
    appStore.mensaje('Obteniendo información')
    appStore.loading(true)

    const { data } = await $api(`/api/sami/v1/procesos/gestionar-vacaciones/vacaciones`, {
      method: "get",
    })

    items.value = []
    selected.value = []
    items.value = data.data_glob
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error.message)
  }
  finally {
    appStore.loading(false)
  }
}

const onAprobar = async () => {
  try {
    appStore.mensaje('Generando proceso')
    appStore.loading(true)

    limpiarValidacion()

    const data  = await $api(`/api/sami/v1/procesos/gestionar-vacaciones/aprobar`, {
      method: "put",
      body: {
        codigo: (formulario.value.codigo === null) ? '' : formulario.value.codigo,
        reemplazo: (formulario.value.reemplazo === null) ? '' : formulario.value.reemplazo,
        observacion: (formulario.value.observacion === null) ? '' : formulario.value.observacion,
      },
    })

    onCloseEditar()

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
        if (key == 'reemplazo') {
          errorReemplazo.value = true
          errorMensajeReemplazo.value = data[key]
        }
      }
    }
  }
  finally {
    appStore.loading(false)
  }
}

const onRechazar= async () => {
  try {
    appStore.mensaje('Generando proceso ')
    appStore.loading(true)
    
    limpiarValidacion()

    const data  = await $api(`/api/sami/v1/procesos/gestionar-vacaciones/rechazar`, {
      method: "put",
      body: {
        codigo: (formulario.value.codigo === null) ? '' : formulario.value.codigo,
        reemplazo: (formulario.value.reemplazo === null) ? '' : formulario.value.reemplazo,
        observacion: (formulario.value.observacion === null) ? '' : formulario.value.observacion,
      },
    })

    onCloseEditar()

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

const onLimpiar= async () => {
  items.value = []
  selected.value = []
  formulario.value = {
    codigo: '',
    reemplazo: null,
    observacion: '',
  }
}

const onExcel = async () => {
  try {
    appStore.mensaje('Generando archivo')
    appStore.loading(true)

    const { data } = await $api(`/api/sami/v1/procesos/gestionar-vacaciones/excel`, {
      method: "post", 
      body: {
        data: items.value,
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
  errorReemplazo.value = false
  errorMensajeReemplazo.value =  ''

  errorObservacion.value = false
  errorMensajeObservacion.value = ''
}

const proc_come_gest_vaca_bind_text = async () => {
  const regex = new RegExp('^[A-Za-z0-9. ]+$')

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
        <GenerarBoton @procesar="onGenerar" />
        <ExcelBoton @procesar="onExcel" />
        <LimpiarBoton @procesar="onLimpiar" />
      </template>
      <template #contenido>
        <VRow>
          <VCol cols="12">
            <VCard>
              <VCardText>
                <VDataTable
                  v-model="selected"
                  :headers="headers"
                  :items="items"
                  no-data-text=""
                  fixed-header
                  height="400"
                  class="text-no-wrap"
                  :items-per-page="-1"
                >
                  <template #item.acciones="{ item }">
                    <IconBtn @click="onSeleccionar(item)">
                      <VIcon icon="tabler-edit" />
                    </IconBtn>
                  </template>
                  <template #bottom />
                </VDataTable>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </template>
    </AppPlantilla>
    <VDialog
      :fullscreen="(mobile) ? true : false"
      :max-width="(mobile) ? undefined : 1200"
      persistent
      :model-value="isOpenEditar"
    >
      <VCard color="background">
        <VToolbar color="secondary">
          <VBtn
            v-if="mobile"
            icon
            color="default"
            :rounded="false"
            @click="onCloseEditar"
          >
            <VIcon icon="tabler-x" />
          </VBtn>
          <VToolbarTitle class="ms-md-4 ms-n2">
            Gestionar vacaciones
          </VToolbarTitle>

          <VSpacer />

          <VToolbarItems>
            <VBtn
              v-if="!mobile"
              icon
              @click="onCloseEditar"
            >
              <VIcon icon="tabler-x" />
            </VBtn>
          </VToolbarItems>
        </VToolbar>

        <VCard>
          <VRow class="mt-1">
            <VCol cols="12">
              <div class="d-flex justify-end flex-wrap gap-x-4 gap-y-4 me-2">
                <AprobarBoton @procesar="onAprobar" />
                <RechazarBoton @procesar="onRechazar" />
              </div>
            </VCol>
          </VRow>
          <VCardText>
            <VRow>
              <VCol
                cols="12"
                md="3"
              >
                <AppSelect
                  v-model="formulario.reemplazo"
                  :items="reemplazoOptions"
                  label="Reemplazo ?"
                  placeholder="Seleccionar reemplazo"
                  item-title="text"
                  item-value="id"
                  :error="errorReemplazo"
                  :error-messages="errorMensajeReemplazo"
                />
              </VCol>
            </VRow>
            <VRow>
              <VCol
                cols="12"
                md="12"
              >
                <AppTextField
                  v-model="formulario.observacion"
                  label="Observación"
                  type="text"
                  placeholder="Ingresar obsevación"
                  autocomplete="off"
                  :error="errorObservacion"
                  :error-messages="errorMensajeObservacion"
                  @keypress="proc_come_gest_vaca_bind_text"
                />
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
      </VCard>
    </VDialog>
  </div>
</template>

<style lang="scss">
.flat-picker-custom-style {
  inset-block: auto 8px;
}
</style>
