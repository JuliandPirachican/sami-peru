<script setup>
import { useAppStore } from '@/stores/app'
import { EncryptStorage } from 'encrypt-storage'
import { useDisplay } from 'vuetify'
import { VDataTable } from 'vuetify/labs/VDataTable'

definePage({
  meta: {
    action: 'peru/repo_come_dire_lide',
    subject: 'peru/repo_come_dire_lide',
  },
})

const encryptStorage = new EncryptStorage('AZZORTI-SAMI', {
  storageType: 'localStorage',
})

const { mobile } = useDisplay()
const appStore = useAppStore()
const userData = encryptStorage.getItem('userData')

const items = ref([])
const errorCorreo = ref(false)
const mensajeCorreo = ref('')
const errorFecha = ref(false)
const mensajeFecha = ref('')

const lider = ref({
  consTerc: 0,
  numeIden: '',
  fechNaci: '',
  mailAses: '',
})

const isOpenEditar = ref(false)

const headers = computed(() => {
  return [
    { title: '', key: 'acciones', sortable: false },
    { title: 'Región', key: 'codi_area', sortable: false },
    { title: 'Zona', key: 'codi_zona', sortable: false },
    { title: 'Sector', key: 'codi_sect', sortable: false },
    { title: 'Nro documento', key: 'nume_iden', sortable: false },
    { title: 'Nombres y apellidos', key: 'nomb_terc', sortable: false },
    { title: 'Telf. personal', key: 'tele_terc', sortable: false },
    { title: 'Telf. RPC', key: 'celu_terc', sortable: false },
    { title: 'Correo electrónico', key: 'mail_ases', sortable: false },
    { title: 'Departamento', key: 'nomb_dpto', sortable: false },
    { title: 'Provincia', key: 'nomb_ciud', sortable: false },
    { title: 'Distrito', key: 'nomb_barr', sortable: false },
    { title: 'Dirección', key: 'dire_terc', sortable: false },
    { title: 'Referencia', key: 'dire_refe', sortable: false },
    { title: 'Latitud', key: 'cx', sortable: false },
    { title: 'Longitud', key: 'cy', sortable: false },
    { title: 'Cumpleaños', key: 'fech_naci', sortable: false },
    { title: 'Fecha ingreso', key: 'fech_ingr', sortable: false },
    { title: 'Estado', key: 'acti_esta', sortable: false },
  ]
})

onMounted(async () => {
  appStore.titulo(`Reportes / Directorio lider`)
  await onGenerar()
})

const onGenerar = async () => {
  try {
    appStore.mensaje('Obteniendo información')
    appStore.loading(true)
    onLimpiar()

    const { data } = await $api(`/api/sami/v1/reportes/directorio-lider`, {
      method: "get",
      query: {
        codigo: userData.codi_perf,
        perfil: userData.valo_perf,
      },
    })

    items.value = data.data_glob
    
  } catch (e) {
  }
  finally {
    appStore.loading(false)
  }
}

const onLimpiar= async () => {
  items.value = []
}

const onExcel = async () => {
  try {
    appStore.mensaje('Generando archivo')
    appStore.loading(true)

    const { data } = await $api(`/api/sami/v1/reportes/directorio-lider/excel`, {
      method: "post",
      body: {
        cabecera: headers.value,
        detalle: items.value,
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
  lider.value.consTerc = data.cons_terc
  lider.value.numeIden = data.nume_iden
  lider.value.mailAses = data.mail_ases
  if(data.fech_naci != '') {
    lider.value.fechNaci = new Date(data.fech_naci)
  }
  isOpenEditar.value = true
}

const onCloseEditar = () => {
  isOpenEditar.value = false
  lider.value = {
    consTerc: 0,
    numeIden: '',
    fechNaci: '',
    mailAses: '',
  }
}

const onRegistrar = async () => {
  try {
    limpiarValidacion()
    appStore.mensaje('Actualizando lider')
    appStore.loading(true)

    const data  = await $api(`/api/sami/v1/reportes/directorio-lider`, {
      method: "put",
      body: {
        // eslint-disable-next-line camelcase
        cons_terc: lider.value.consTerc,
        // eslint-disable-next-line camelcase
        fech_naci: lider.value.fechNaci,
        // eslint-disable-next-line camelcase
        mail_ases: lider.value.mailAses,
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
        if (key == 'mail_ases') {
          errorCorreo.value = true
          mensajeCorreo.value = data[key]
        }
      }
    }
  }
  finally {
    appStore.loading(false)
  }
}

const limpiarValidacion = () => {
  errorCorreo.value = false
  mensajeCorreo.value = ''
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
            <VCard title="Lista de lideres">
              <VCardText>
                <VDataTable
                  :headers="headers"
                  :items="items"
                  fixed-header
                  height="400"
                  class="text-no-wrap"
                  :items-per-page="-1"
                >
                  <template #top />
           
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
        <VToolbar color="primary">
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
            Modificar lider
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
            <VCol cols="12">
              <AppTextField
                v-model="lider.numeIden"
                label="Nro documento identificación"
                type="text"
                placeholder="Ingresar documento"
                autocomplete="off"
                readonly
              />
            </VCol>
            <VCol cols="12">
              <AppTextField
                v-model="lider.mailAses"
                label="Correo electrónico"
                type="text"
                placeholder="Ingresar correo"
                autocomplete="off"
                :error="errorCorreo"
                :error-messages="mensajeCorreo"
              />
            </VCol>
            <VCol cols="12">
              <AppDateTimePicker
                v-model="lider.fechNaci"
                label="Fecha cumpleaños"
                :config="{ dateFormat: 'd-m-Y' }"
                :error="errorFecha"
                :error-messages="mensajeFecha"
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol>
              <div class="d-flex justify-space-between align-center">
                <CancelarBoton @procesar="onCloseEditar" />
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
