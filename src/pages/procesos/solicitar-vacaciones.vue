<!-- eslint-disable camelcase -->
<script setup>
import { useAppStore } from '@/stores/app'
import Swal from 'sweetalert2'
import { VDataTable } from 'vuetify/labs/VDataTable'

definePage({
  meta: {
    action: 'peru/proc_come_soli_vaca',
    subject: 'peru/proc_come_soli_vaca',
  },
})

const appStore = useAppStore()


const items = ref([])
const aprobadoresOptions = ref([])

const errorFechaIngreso = ref(false)
const errorMensajeFechaIngreso = ref('')

const errorFechaInicio = ref(false)
const errorMensajeFechaInicio = ref('')

const errorFechaFin = ref(false)
const errorMensajeFechaFin = ref('')

const errorAprobador = ref(false)
const errorMensajeAprobador = ref('')

const now = new Date()

now.setDate(1)
now.setMonth(now.getMonth() + 1)


const formulario = ref({
  fechaIngreso: '',
  diasPendientes: 0,
  diasTruncos: 0,
  total: 0,
  fechaInicio: null,
  fechaFin: null,
  nroDias: 0,
  aprobador: null,
  min: new Date(now),
  minFin: new Date(now),
  minDate: new Date(now),
})

const isOpenEditar = ref(false)

const headers = computed(() => {
  return [
    { key: 'cons_vaca', title: 'Código', sortable: true },
    { key: 'codi_zona', title: 'Zona', sortable: true },
    { key: 'fech_inic', title: 'Fecha inicial', sortable: true },
    { key: 'fech_fina', title: 'Fecha final', sortable: true },
    { key: 'nume_diaa', title: 'Dia(s)', sortable: true },
    { key: 'acti_esta', title: 'Estado', sortable: true },
    { key: 'usua_apro', title: 'Aprobador', sortable: true },
  ]
})

onMounted(async () => {
  appStore.titulo(`Procesos / Solicitud vacaciones`)
  await onGenerar()
})

const onGenerar = async () => {
  try {
    appStore.mensaje('Obteniendo información')
    appStore.loading(true)

    const data   = await $api(`/api/sami/v1/procesos/solicitud-vacaciones/vacaciones`, {
      method: "get",
    })

    items.value = []
    items.value = data.data.data_glob
    
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

const onIniciar = async () => {
  try {
    appStore.mensaje('Obteniendo datos')
    appStore.loading(true)

    const data = await $api(`/api/sami/v1/procesos/solicitud-vacaciones/iniciar`, {
      method: "get",
    })

    formulario.value.fechaIngreso = data.data.data_glob.fech_ingr

    if (data.data.data_glob.pend_cump < 0) {
      formulario.value.diasPendientes = 0
    } else {
      formulario.value.diasPendientes = parseInt(data.data.data_glob.pend_cump, 10)
    }

    formulario.value.diasTruncos = parseInt(data.data.data_glob.pend_acum, 10)
    formulario.value.total = formulario.value.diasTruncos + formulario.value.diasPendientes

    const itemAprobador = data.data.data_deta

    itemAprobador.forEach(element => 
      aprobadoresOptions.value.push({
        id: element.codi_usua,
        text: element.nomb_terc,
      }),
    )

    nextTick(() => {
      if (formulario.value.total <= 0) {
        Swal.fire({
          title: 'Solicitud de vacaciones',
          text: 'Usuario no tiene vacaciones pendientes.',
          icon: 'warning',
          confirmButtonText: 'Aceptar',
          customClass: {
            confirmButton: 'v-btn bg-error',
          },
          showClass: {
            popup: 'animate__animated animate__bounceIn',
          },
          buttonsStyling: false,
        }).then(result => {
          if (result.isConfirmed) {
          }
        })
      } else {
        isOpenEditar.value = true
      }
    })
    
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

const onSeleccionar = async () => {
  await onIniciar()
}

const onCloseEditar = () => {
  isOpenEditar.value = false
  formulario.value = {
    fechaIngreso: '',
    diasPendientes: 0,
    diasTruncos: 0,
    total: 0,
    fechaInicio: null,
    fechaFin: null,
    nroDias: 0,
    aprobador: null,
    min: new Date(now),
    minFin: new Date(now),
    minDate: new Date(now),
  }
  items.value = []
  aprobadoresOptions.value = []
  onGenerar()
}

const onRegistrar = async () => {
  try {
    limpiarValidacion()
    appStore.mensaje('Generando proceso')
    appStore.loading(true)

    const data  = await $api(`/api/sami/v1/procesos/solicitud-vacaciones/registrar`, {
      method: "post",
      body: {
        fechaIngreso: (formulario.value.fechaIngreso === null) ? '' : formulario.value.fechaIngreso,
        fechaInicio: (formulario.value.fechaInicio === null) ? '' : formulario.value.fechaInicio,
        fechaFin: (formulario.value.fechaFin === null) ? '' : formulario.value.fechaFin,
        aprobador: (formulario.value.aprobador === null) ? '' : formulario.value.aprobador,
        nroDias: (formulario.value.nroDias === null) ? '' : formulario.value.nroDias,
        total: (formulario.value.total === null) ? '' : formulario.value.total,
      },
    })

    onCloseEditar()
    let mensaje = data.message
    mensaje = mensaje.toLowerCase()
    mensaje = mensaje.charAt(0).toUpperCase() + mensaje.slice(1)

    Swal.fire({
      title: 'Solicitud de vacaciones',
      text: mensaje,
      icon: 'success',
      confirmButtonText: 'Aceptar',
      customClass: {
        confirmButton: 'v-btn bg-error',
      },
      showClass: {
        popup: 'animate__animated animate__bounceIn',
      },
      buttonsStyling: false,
    }).then(result => {
      if (result.isConfirmed) {
      }
    })
  } catch (error) {
    const { data } = error.response._data
    if (typeof data != "undefined") {
      for (var key in data)
      {
        if (key == 'fechaIngreso') {
          errorFechaIngreso.value = true
          errorMensajeFechaIngreso.value = data[key]
        }
        if (key == 'fechaInicio') {
          errorFechaInicio.value = true
          errorMensajeFechaInicio.value = data[key]
        }
        if (key == 'fechaFin') {
          errorFechaFin.value = true
          errorMensajeFechaFin.value = data[key]
        }
        if (key == 'aprobador') {
          errorAprobador.value = true
          errorMensajeAprobador.value = data[key]
        }
      }
    }
  }
  finally {
    appStore.loading(false)
  }
}

const limpiarValidacion = () => {
  errorFechaIngreso.value = false
  errorMensajeFechaIngreso.value = ''

  errorFechaInicio.value = false
  errorMensajeFechaInicio.value = ''

  errorFechaFin.value = false
  errorMensajeFechaFin.value = ''

  errorAprobador.value = false
  errorMensajeAprobador.value = ''
}

const onLimpiar = () => {
  formulario.value.fechaInicio = null
  formulario.value.fechaFin = null
  formulario.value.nroDias = 0
  formulario.value.aprobador = null
}

const proc_come_soli_vaca_fech_fina = () => {
  const day1 = new Date(formulario.value.fechaInicio)
  const day2 = new Date(formulario.value.fechaFin)

  if (day2.getDay() === 4) {

    let mensaje = 'No se puede escoger fecha final un dia viernes, se le autoseleccionará domingo como dia final'
    mensaje = mensaje.toLowerCase()
    mensaje = mensaje.charAt(0).toUpperCase() + mensaje.slice(1)
    appStore.mensajeSnackbar(mensaje)
    appStore.color("success")
    appStore.snackbar(true)

    formulario.value.fechaFin = new Date(day2.setDate(day2.getDate() + 3))

    const difference = Math.abs(day2 - day1)
    const days = difference / (1000 * 3600 * 24)

    formulario.value.nroDias = days

    /*Swal.fire({
      title: 'Solicitud de vacaciones',
      text: 'No se puede escoger fecha final un dia viernes, se le autoseleccionará domingo como dia final',
      icon: 'warning',
      confirmButtonText: 'Aceptar',
      customClass: {
        confirmButton: 'btn btn-success',
      },
      showClass: {
        popup: 'animate__animated animate__bounceIn',
      },
      buttonsStyling: false,
    }).then(result => {
      if (result.isConfirmed) {
        formulario.value.fechaFin = new Date(day2.setDate(day2.getDate() + 3))

        const difference = Math.abs(day2 - day1)
        const days = difference / (1000 * 3600 * 24)

        formulario.value.nroDias = days
      }
    })*/
  } else {
    if(formulario.value.fechaFin != null){
      const difference = Math.abs(day2 - day1)
      const days = difference / (1000 * 3600 * 24)

      formulario.value.nroDias = days + 1
    }
    
  }
}

const proc_come_soli_vaca_fech_inic = () => {
  formulario.value.fechaFin = null
  formulario.value.minFin = formulario.value.fechaInicio
  formulario.value.nroDias = 0
}
</script>

<template>
  <div>
    <AppPlantilla>
      <template #botones>
        <GenerarBoton @procesar="onGenerar" />
        <VBtn
          :block="mobile"
          color="secondary"
          @click="onSeleccionar"
        >
          <VIcon
            start
            icon="tabler-edit"
          />
          Nueva solicitud
        </VBtn>
      </template>

      <template #contenido>
        <VRow>
          <VCol cols="12">
            <VCard>
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
                  <template #bottom />
                </VDataTable>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
        <VDialog
          :fullscreen="(mobile) ? true : false"
          :max-width="(mobile) ? undefined : 1200"
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
                Solicitud vacaciones
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
                <VCol>
                  <div class="d-flex justify-end">
                    <LimpiarBoton
                      style="margin-inline-end: 10px;"
                      @procesar="onLimpiar"
                    />
                    <RegistrarBoton @procesar="onRegistrar" />
                  </div>
                </VCol>
              </VRow>
              <VRow>
                <VCol
                  cols="12"
                  md="12"
                >
                  <VLabel class="text-h5">
                    Información general
                  </VLabel>
                </VCol>
              </VRow>
              <VRow>
                <VCol
                  cols="12"
                  md="3"
                >
                  <AppTextField
                    v-model="formulario.fechaIngreso"
                    label="Fecha ingreso(dd/mm/aaaa)"
                    type="text"
                    autocomplete="off"
                    :error="errorFechaIngreso"
                    :error-messages="errorMensajeFechaIngreso"
                    disabled
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="3"
                >
                  <AppTextField
                    v-model="formulario.diasPendientes"
                    label="Dia(s) pendiente(s)"
                    type="text"
                    placeholder="0"
                    autocomplete="off"
                    disabled
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="3"
                >
                  <AppTextField
                    v-model="formulario.diasTruncos"
                    label="Dia(s) trunco(s)"
                    type="text"
                    placeholder="0"
                    autocomplete="off"
                    disabled
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="3"
                >
                  <AppTextField
                    v-model="formulario.total"
                    label="Total"
                    type="text"
                    placeholder="0"
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
                  <VLabel class="text-h5">
                    Detalle solicitud
                  </VLabel>
                </VCol>
              </VRow>
              <VRow>
                <VCol
                  cols="12"
                  md="6"
                >
                  <AppDateTimePicker
                    v-model="formulario.fechaInicio"
                    label="Fecha inicio"
                    placeholder="Seleccionar fecha"
                    autocomplete="off"
                    :error="errorFechaInicio"
                    :error-messages="errorMensajeFechaInicio"
                    @input="proc_come_soli_vaca_fech_inic"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <AppDateTimePicker
                    v-model="formulario.fechaFin"
                    label="Fecha fin"
                    placeholder="Seleccionar fecha"
                    autocomplete="off"
                    :error="errorFechaFin"
                    :error-messages="errorMensajeFechaFin"
                    @input="proc_come_soli_vaca_fech_fina"
                  />
                </VCol>
              </VRow>
              <VRow>
                <VCol
                  cols="12"
                  md="3"
                >
                  <AppTextField
                    v-model="formulario.nroDias"
                    label="Nro días"
                    type="number"
                    placeholder="0"
                    autocomplete="off"
                    disabled
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="4"
                >
                  <AppSelect
                    v-model="formulario.aprobador"
                    :items="aprobadoresOptions"
                    label="Aprobador"
                    placeholder="Seleccionar aprobador"
                    item-title="text"
                    item-value="id"
                    :error="errorAprobador"
                    :error-messages="errorMensajeAprobador"
                  />
                </VCol>
              </VRow>
            </VCardText>
          </VCard>
        </VDialog>
      </template>
    </AppPlantilla>
  </div>
</template>

<style lang="scss">
.flat-picker-custom-style {
  inset-block: auto 8px;
}
</style>
