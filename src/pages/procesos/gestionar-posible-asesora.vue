<!-- eslint-disable camelcase -->
<script setup>
import { useAppStore } from '@/stores/app';
import { useDisplay } from 'vuetify';
import { VDataTable } from 'vuetify/labs/VDataTable';

definePage({
  meta: {
    action: 'colombia/proc_come_gest_posi_ases',
    subject: 'colombia/proc_come_gest_posi_ases',
  },
})

const { mobile } = useDisplay()
const appStore = useAppStore()

const items = ref([])

const posible = ref({
  consecutivoPosibleAsesora: '',
  selectedEstado: null,
  observacionGestion: '',
})

const formulario = ref({
  campana: null,
})

const estadoOptions = ref([
  { id: 'Si contactada(o)', text: 'Si contactada(o)' },
  { id: 'No contactada(o)', text: 'No contactada(o)' },
])

const campanaOptions = ref([])
const errorCampana = ref(false)
const errorMensajeCampana = ref('')

const errorEstado = ref(false)
const errorMensajeEstado = ref('')

const errorObservacion = ref(false)
const errorMensajeObservacion = ref('')

const isOpenEditar = ref(false)

const headers = computed(() => {
  return [
    { title: '', key: 'acciones', sortable: false, width: '10px' },
    { title: 'Campaña', key: 'codi_camp' },
    { title: 'Zona', key: 'codi_zona' },
    { title: 'Sector', key: 'codi_sect' },
    { title: 'Usuario', key: 'acti_usua' },
    { title: 'Doc. ident. referente', key: 'nume_refe' },
    { title: 'Nombre(s) y apellido(s) referente', key: 'nomb_refe' },
    { title: 'Doc. ident. referido', key: 'nume_iden' },
    { title: 'Nombre(s) y apellido(s) referido', key: 'nomb_ases' },
    { title: 'Departamento', key: 'nomb_dpto' },
    { title: 'Provincia', key: 'nomb_prov' },
    { title: 'Distrito', key: 'nomb_dist' },
    { title: 'Dirección', key: 'dire_ases' },
    { title: 'Teléfono', key: 'tele_ases' },
    { title: 'Correo electronico', key: 'corr_ases' },
  ]
})

onMounted(async () => {
  appStore.titulo(`Procesos / Gestionar posible asesora`)
  await obtenerCampana()
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

const onGenerar = async () => {
  try {
    limpiarValidacion()

    items.value = []

    appStore.mensaje('Obteniendo información')
    appStore.loading(true)

    const { data } = await $api(`/api/sami/v1/procesos/gestionar-posible-asesora/asesoras`, {
      method: "get",
      query: {
        campana: formulario.value.campana,
      },
    })

    items.value = []
    items.value = data.data_glob
    
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

const onLimpiar= async () => {
  items.value = []
  formulario.value = {
    campana: null,
  }
}

const onLimpiarDetalle= async () => {
  limpiarValidacionDetalle()
  posible.value = {
    selectedEstado: null,
    observacionGestion: '',
  }
}

const onExcel = async () => {
  try {
    appStore.mensaje('Generando archivo')
    appStore.loading(true)

    const { data } = await $api(`/api/sami/v1/procesos/gestionar-posible-asesora/excel`, {
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

const onSeleccionar = data => {
  posible.value.consecutivoPosibleAsesora = data.cons_posi
  isOpenEditar.value = true
}

const onCloseEditar = () => {
  isOpenEditar.value = false
  posible.value = {
    consecutivoPosibleAsesora: '',
    selectedEstado: null,
    observacionGestion: '',
  }
}

const onRegistrar = async () => {
  try {
    limpiarValidacion()
    appStore.mensaje('Actualizando datos')
    appStore.loading(true)

    const data = await $api(`/api/sami/v1/procesos/gestionar-posible-asesora`, {
      method: "put",
      body: {
        consecutivoPosibleAsesora: (posible.value.consecutivoPosibleAsesora === null) ? '' : posible.value.consecutivoPosibleAsesora,
        selectedEstado: (posible.value.selectedEstado === null) ? '' : posible.value.selectedEstado,
        observacionGestion: (posible.value.observacionGestion === null) ? '' : posible.value.observacionGestion,
      },
    })
        
    onCloseEditar()
    let mensaje = data.message
    mensaje = mensaje.toLowerCase()
    mensaje = mensaje.charAt(0).toUpperCase() + mensaje.slice(1)
    appStore.mensajeSnackbar(mensaje)
    appStore.color("success")
    appStore.snackbar(true)
    nextTick(() => {
      onGenerar()
    })
  } catch (error) {
    const { data } = error.response._data
    if (typeof data != "undefined") {
      for (var key in data)
      {
        if (key == 'selectedEstado') {
          errorEstado.value = true
          errorMensajeEstado.value = data[key]
        }
        if (key == 'observacionGestion') {
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

const limpiarValidacion = () => {
  errorCampana.value = false
  errorMensajeCampana.value = ''

  errorEstado.value = false
  errorMensajeEstado.value = ''

  errorObservacion.value = false
  errorMensajeObservacion.value = ''
}

const limpiarValidacionDetalle = () => {
  errorEstado.value = false
  errorMensajeEstado.value = ''

  errorObservacion.value = false
  errorMensajeObservacion.value = ''
}

const proc_come_gest_posi_ases_bind_obse_gest = async () => {
  const regex = new RegExp('^[A-Za-z0-9 ]+$')

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
                <VDataTable
                  :headers="headers"
                  :items="items"
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
      :max-width="(mobile) ? undefined : 750"
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
            Gestionar posible asesora
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
        <VCardText>
          <VRow>
            <VCol
              cols="12"
              md="4"
            >
              <AppSelect
                v-model="posible.selectedEstado"
                :items="estadoOptions"
                label="Estado"
                placeholder="Seleccionar estado"
                item-title="text"
                item-value="id"
                :error="errorEstado"
                :error-messages="errorMensajeEstado"
              />
            </VCol>

            <VCol cols="12">
              <AppTextField
                v-model="posible.observacionGestion"
                label="Observación"
                type="text"
                placeholder="Ingresar observación"
                autocomplete="off"
                :error="errorObservacion"
                :error-messages="errorMensajeObservacion"
                @keypress="proc_come_gest_posi_ases_bind_obse_gest"
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol>
              <div class="d-flex justify-space-between align-center">
                <LimpiarBoton @procesar="onLimpiarDetalle" />
                <RegistrarBoton @procesar="onRegistrar" />
              </div>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VDialog>
  </div>
</template>

<style lang="scss">
.flat-picker-custom-style {
  inset-block: auto 8px;
}
</style>
