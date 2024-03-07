<script setup>
import { useAppStore } from '@/stores/app'
import { useDisplay } from 'vuetify'
import { VDataTable } from 'vuetify/labs/VDataTable'

definePage({
  meta: {
    action: 'peru/repo_come_dire_lide',
    subject: 'peru/repo_come_dire_lide',
  },
})

const { mobile } = useDisplay()
const appStore = useAppStore()
const userData = JSON.parse(localStorage.getItem('userData'))

const itemsInicial = ref([])
const multiSearch =  ref({})
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
    { title: '', key: 'acciones', sortable: false, width: '10px' },
    { title: 'Región', key: 'codi_area' },
    { title: 'Zona', key: 'codi_zona' },
    { title: 'Sector', key: 'codi_sect' },
    { title: 'Nro documento', key: 'nume_iden' },
    { title: 'Nombres y apellidos', key: 'nomb_terc' },
    { title: 'Telf. personal', key: 'tele_terc' },
    { title: 'Telf. RPC', key: 'celu_terc' },
    { title: 'Correo electrónico', key: 'mail_ases' },
    { title: 'Departamento', key: 'nomb_dpto' },
    { title: 'Provincia', key: 'nomb_ciud' },
    { title: 'Distrito', key: 'nomb_barr' },
    { title: 'Dirección', key: 'dire_terc' },
    { title: 'Referencia', key: 'dire_refe' },
    { title: 'Latutud', key: 'cx' },
    { title: 'Longitud', key: 'cy' },
    { title: 'Cumpleaños', key: 'fech_naci' },
    { title: 'Fecha ingreso', key: 'fech_ingr' },
    { title: 'Estado', key: 'acti_esta' },
  ]
})

const items = computed(() => {
  if(multiSearch.value) {
    return itemsInicial.value.filter(item => {
      return Object.entries(multiSearch.value).every(([key, value]) => {
        if (value.includes("|") && !value.includes("!")) {
          let el = value.split("|")
          
          return el.some(elem =>
            (item[key] || "").toString().toUpperCase().startsWith(elem.toString().toUpperCase()),
          )
        }
        if (value.substring(0, 1) === "!" && !value.includes("|")) {
          let el = value.split("!")
          
          return el.some(elem =>
            !(item[key] || "").toString().toUpperCase().startsWith(elem.toString().toUpperCase()),
          )
        }
        if (value.includes("|") && value.substring(0, 1) === "!") {
          let el = value.split("!")[1].split("|")
          
          return !el.some(elem =>
            (item[key] || "").toString().toUpperCase().startsWith(elem.toString().toUpperCase()),
          )
        }
        if (value.substring(0, 1) === ">") {
          let el = value.split(">")
          if (item[key] !== " ") {
            return Number(item[key] || "") > el[1]
          }
        }
        if (value.substring(0, 1) === "<") {
          let el = value.split("<")
          if (item[key] !== " ") {
            return Number(item[key] || "") < el[1]
          }
        }
        if (value.substring(0, 1) === "=") {
          let el = value.split("=")
          
          return (item[key] || "").toString().toUpperCase() === el[1].toString().toUpperCase()
        }
        
        return (item[key] || "").toString().toUpperCase().includes(value.toString().toUpperCase())
      })
    })
  } else {
    return itemsInicial.value
  }
})

const loginData = JSON.parse(localStorage.getItem('login'))

onMounted(async () => {
  appStore.titulo(`${loginData.pais} / Reportes / Directorio lider`)
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
    itemsInicial.value = data.data_glob
    
  } catch (e) {
  }
  finally {
    appStore.loading(false)
  }
}

const onLimpiar= async () => {
  items.value = []
  itemsInicial.value = []
  multiSearch.value = {}
}

const onExcel = async () => {
  try {
    appStore.mensaje('Generando archivo')
    appStore.loading(true)

    const { data } = await $api(`/api/sami/v1/reportes/directorio-lider/excel`, {
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

    const { data } = await $api(`/api/sami/v1/reportes/directorio-lider`, {
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
                  no-data-text=""
                  fixed-header
                  height="400"
                  class="text-no-wrap"
                  :items-per-page="-1"
                >
                  <template #top>
                    <!-- v-container, v-col and v-row are just for decoration purposes. -->
                    <VRow>
                      <VCol
                        cols="12"
                        md="3"
                      >
                        <VTextField
                          v-model="multiSearch['codi_area']"
                          append-inner-icon="tabler-search"
                          variant="underlined"
                          type="text"
                          label="Región"
                          class="mb-2"
                        />
                      </VCol>
                      <VCol
                        cols="12"
                        md="3"
                      >
                        <VTextField
                          v-model="multiSearch['codi_zona']"
                          append-inner-icon="tabler-search"
                          variant="underlined"
                          type="text"
                          label="Zona"
                          class="mb-2"
                        />
                      </VCol>
                      <VCol
                        cols="12"
                        md="3"
                      >
                        <VTextField
                          v-model="multiSearch['codi_sect']"
                          append-inner-icon="tabler-search"
                          variant="underlined"
                          type="text"
                          label="Sector"
                          class="mb-2"
                        />
                      </VCol>
                      <VCol
                        cols="12"
                        md="3"
                      >
                        <VTextField
                          v-model="multiSearch['nomb_terc']"
                          append-inner-icon="tabler-search"
                          variant="underlined"
                          type="text"
                          label="Nombres y apellido"
                          class="mb-2"
                        />
                      </VCol>
                    </VRow>
                  </template>
           
                  <template #item.acciones="{ item }">
                    <VBtn
                      icon
                      size="x-small"
                      color="primary"
                      variant="text"
                      @click="onSeleccionar(item)"
                    >
                      <VIcon
                        size="22"
                        icon="tabler-pencil"
                      />
                    </VBtn>
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
