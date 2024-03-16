<!-- eslint-disable camelcase -->
<script setup>
import { useAppStore } from '@/stores/app'

definePage({
  meta: {
    action: 'peru/proc_come_posi_ases',
    subject: 'peru/proc_come_posi_ases',
  },
})

const appStore = useAppStore()

const formulario = ref({
  dniReferente: '',
  nombreReferente: '',
  apellidoReferente: '',
  dniReferido: '',
  nombreReferido: '',
  apellidoReferido: '',
  telefonoReferido: '',
  correoReferido: '',
  selectedDepartamento: null,
  selectedProvincia: null,
  selectedDistrito: null,
  urbanizacionReferido: '',
  calleReferido: '',
  cruceReferido: '',
  mzReferido: '',
  ltReferido: '',
  nroReferido: '',
  kmReferido: '',
  intReferido: '',
  referenciaReferido: '',
  selectedMedio: null,
})

const mediosOptions = ref([])
const departamentosOptions = ref([])
const provinciasOptions = ref([])
const distritosOptions = ref([])

const errorDniReferente = ref(false)
const errorMensajeDniReferente = ref('')

const errorDniReferido = ref(false)
const errorMensajeDniReferido = ref('')

const errorNombreReferido = ref(false)
const errorMensajeNombreReferido = ref('')

const errorApellidoReferido = ref(false)
const errorMensajeApellidoReferido = ref('')

const errorTelefonoReferido = ref(false)
const errorMensajeTelefonoReferido = ref('')

const errorCorreoReferido = ref(false)
const errorMensajeCorreoReferido = ref('')

const errorSelectedDepartamento = ref(false)
const errorMensajeSelectedDepartamento = ref('')

const errorSelectedProvincia = ref(false)
const errorMensajeSelectedProvincia = ref('')

const errorSelectedDistrito = ref(false)
const errorMensajeSelectedDistrito = ref('')

const errorDireccion = ref(false)
const errorMensajeDireccion = ref('')

const errorReferenciaReferido = ref(false)
const errorMensajeReferenciaReferido = ref('')

const errorSelectedMedios = ref(false)
const errorMensajeSelectedMedios = ref('')

onMounted(async () => {
  appStore.titulo(`Procesos / Posible asesora`)
  await obtenerDepartamentos()
  await obtenerMedios()
})

const limpiarValidacion = () => {
  errorDniReferente.value = false
  errorMensajeDniReferente.value = ''

  errorDniReferido.value = false
  errorMensajeDniReferido.value = ''

  errorNombreReferido.value = false
  errorMensajeNombreReferido.value = ''

  errorApellidoReferido.value = false
  errorMensajeApellidoReferido.value = ''

  errorTelefonoReferido.value = false
  errorMensajeTelefonoReferido.value = ''

  errorCorreoReferido.value = false
  errorMensajeCorreoReferido.value = ''

  errorSelectedDepartamento.value = false
  errorMensajeSelectedDepartamento.value = ''

  errorSelectedProvincia.value = false
  errorMensajeSelectedProvincia.value = ''

  errorSelectedDistrito.value = false
  errorMensajeSelectedDistrito.value = ''

  errorDireccion.value = false
  errorMensajeDireccion.value = ''

  errorReferenciaReferido.value = false
  errorMensajeReferenciaReferido.value = ''

  errorSelectedMedios.value = false
  errorMensajeSelectedMedios.value = ''
}

const onRegistrar = async () => {
  limpiarValidacion()
  try {
    appStore.mensaje('Generando proceso')
    appStore.loading(true)

    let direAses = ''
    if (formulario.value.urbanizacionReferido.trim() !== '') {
      direAses += `Urb ${formulario.value.urbanizacionReferido.trim()} `
    }
    if (formulario.value.calleReferido.trim() !== '') {
      direAses += `Calle ${formulario.value.calleReferido.trim()} `
    }
    if (formulario.value.cruceReferido.trim() !== '') {
      direAses += `Cruce ${formulario.value.cruceReferido.trim()} `
    }
    if (formulario.value.mzReferido.trim() !== '') {
      direAses += `Mz ${formulario.value.mzReferido.trim()} `
    }
    if (formulario.value.ltReferido.trim() !== '') {
      direAses += `Lt ${formulario.value.ltReferido.trim()} `
    }
    if (formulario.value.nroReferido.trim() !== '') {
      direAses += `Nro ${formulario.value.nroReferido.trim()} `
    }
    if (formulario.value.kmReferido.trim() !== '') {
      direAses += `Km ${formulario.value.kmReferido.trim()} `
    }
    if (formulario.value.intReferido.trim() !== '') {
      direAses += `Int ${formulario.value.intReferido.trim()} `
    }
    direAses = direAses.trim()

    const data  = await $api(`/api/sami/v1/procesos/registrar-posible-asesora`, {
      method: "post",
      body: {
        dniReferente: (formulario.value.dniReferente === null) ? '' : formulario.value.dniReferente,
        dniReferido: (formulario.value.dniReferido === null) ? '' : formulario.value.dniReferido,
        nombreReferido: (formulario.value.nombreReferido === null) ? '' : formulario.value.nombreReferido,
        apellidoReferido: (formulario.value.apellidoReferido === null) ? '' : formulario.value.apellidoReferido,
        telefonoReferido: (formulario.value.telefonoReferido === null) ? '' : formulario.value.telefonoReferido,
        correoReferido: (formulario.value.correoReferido === null) ? '' : formulario.value.correoReferido,
        direAses: direAses,
        referenciaReferido: (formulario.value.referenciaReferido === null) ? '' : formulario.value.referenciaReferido,
        selectedDepartamento: (formulario.value.selectedDepartamento === null) ? '' : formulario.value.selectedDepartamento,
        selectedProvincia: (formulario.value.selectedProvincia === null) ? '' : formulario.value.selectedProvincia,
        selectedDistrito: (formulario.value.selectedDistrito === null) ? '' : formulario.value.selectedDistrito,
        selectedMedio: (formulario.value.selectedMedio === null) ? '' : formulario.value.selectedMedio,
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
        if (key == 'dniReferente') {
          errorDniReferente.value = true
          errorMensajeDniReferente.value = data[key]
        }
        if (key == 'dniReferido') {
          errorDniReferido.value = true
          errorMensajeDniReferido.value = data[key]
        }
        if (key == 'nombreReferido') {
          errorNombreReferido.value = true
          errorMensajeNombreReferido.value = data[key]
        }
        if (key == 'apellidoReferido') {
          errorApellidoReferido.value = true
          errorMensajeApellidoReferido.value = data[key]
        }
        if (key == 'telefonoReferido') {
          errorTelefonoReferido.value = true
          errorMensajeTelefonoReferido.value = data[key]
        }
        if (key == 'correoReferido') {
          errorCorreoReferido.value = true
          errorMensajeCorreoReferido.value = data[key]
        }
        if (key == 'direAses') {
          errorDireccion.value = true
          errorMensajeDireccion.value = data[key]
        }
        if (key == 'referenciaReferido') {
          errorReferenciaReferido.value = true
          errorMensajeReferenciaReferido.value = data[key]
        }
        if (key == 'selectedDepartamento') {
          errorSelectedDepartamento.value = true
          errorMensajeSelectedDepartamento.value = data[key]
        }
        if (key == 'selectedProvincia') {
          errorSelectedProvincia.value = true
          errorMensajeSelectedProvincia.value = data[key]
        }
        if (key == 'selectedDistrito') {
          errorSelectedDistrito.value = true
          errorMensajeSelectedDistrito.value = data[key]
        }
        if (key == 'selectedMedio') {
          errorSelectedMedios.value = true
          errorMensajeSelectedMedios.value = data[key]
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
  formulario.value.dniReferente = ''
  formulario.value.nombreReferente = ''
  formulario.value.apellidoReferente = ''
  formulario.value.dniReferido = ''
  formulario.value.nombreReferido = ''
  formulario.value.apellidoReferido = ''
  formulario.value.telefonoReferido = ''
  formulario.value.correoReferido = ''
  formulario.value.selectedDepartamento = null
  formulario.value.selectedProvincia = null
  formulario.value.selectedDistrito = null
  formulario.value.urbanizacionReferido = ''
  formulario.value.calleReferido = ''
  formulario.value.cruceReferido = ''
  formulario.value.mzReferido = ''
  formulario.value.ltReferido = ''
  formulario.value.nroReferido = ''
  formulario.value.kmReferido = ''
  formulario.value.intReferido = ''
  formulario.value.referenciaReferido = ''
  formulario.value.selectedMedio = null
  formulario.value.isDniReferente = false
  formulario.value.isDniReferido = false

  

  provinciasOptions.value = []
  distritosOptions.value = []
}

const proc_come_posi_ases_nume_iden = async () => {
  limpiarValidacion()

  try {
    appStore.mensaje('Obteniendo información')
    appStore.loading(true)

    const  data  = await $api( `/api/sami/v1/procesos/registrar-posible-asesora/datos-referente`, {
      method: "get",
      query: {
        dniReferente: (formulario.value.dniReferente === null) ? '' : formulario.value.dniReferente,
      },
    })

    const dato = data.data.data_glob

    formulario.value.nombreReferente = dato.nomb_terc
    formulario.value.apellidoReferente = dato.apel_terc
    formulario.value.isDniReferente = true

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
        if (key == 'dniReferente') {
          errorDniReferente.value = true
          errorMensajeDniReferente.value = data[key]
        }
      }
    }
  }
  finally {
    appStore.loading(false)
  }
  
}

const proc_come_posi_ases_nume_iden_hijo = async () => {
  limpiarValidacion()

  try {
    appStore.mensaje('Obteniendo información')
    appStore.loading(true)

    const { data } = await $api( `/api/sami/v1/procesos/registrar-posible-asesora/datos-referido`, {
      method: "get",
      query: {
        dniReferido: (formulario.value.dniReferido === null) ? '' : formulario.value.dniReferido,
      },
    })

    formulario.value.isDniReferido = true

  } catch (error) {
    const { data } = error.response._data    
    if (typeof data != "undefined") {
      for (var key in data)
      {
        if (key == 'dniReferido') {
          errorDniReferido.value = true
          errorMensajeDniReferido.value = data[key]
        }
      }
    }
  }
  finally {
    appStore.loading(false)
  }
  
}

const proc_come_posi_ases_bind_text = async () => {
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

const proc_come_posi_ases_bind_nume = async () => {
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

const proc_come_posi_ases_bind_corr = async () => {
  const regex = new RegExp('^[a-zA-Z0-9-_.@]+$')

  const key = String.fromCharCode(
    !event.charCode ? event.which : event.charCode,
  )

  if (!regex.test(key)) {
    event.preventDefault()
    
    return false
  }
  
  return true
}

const obtenerMedios = async () => {
  try {
    appStore.mensaje('Obteniendo medios')
    appStore.loading(true)

    const { data } = await $api(`/api/sami/v1/procesos/registrar-posible-asesora/datos-medios`, {
      method: "get",
    })

    const itemMedios = data.data_glob.slice(0, 40)
    
    itemMedios.forEach(element => 
      mediosOptions.value.push({
        id: element.cons_medi,
        text: element.nomb_medi,
      }),
    )
  } catch (e) {
    if(e.response !== undefined) {
      // eslint-disable-next-line no-console
      console.log(e.response._data)
    }
  }
  finally {
    appStore.loading(false)
  }
}

const obtenerDepartamentos = async () => {
  try {
    appStore.mensaje('Obteniendo departamentos')
    appStore.loading(true)

    const { data } = await $api(`/api/sami/v1/procesos/registrar-posible-asesora/datos-departamentos`, {
      method: "get",
    })
    
    const itemDepartamentos = data.data_glob.slice(0, 40)
    
    itemDepartamentos.forEach(element => 
      departamentosOptions.value.push({
        id: element.cons_dpto,
        text: element.nomb_dpto,
      }),
    )
  } catch (e) {
    if(e.response !== undefined) {
      // eslint-disable-next-line no-console
      console.log(e.response._data)
    }
  }
  finally {
    appStore.loading(false)
  }
}

const obtenerProvincia = async() => {
  try {
    appStore.mensaje('Obteniendo provincias')
    appStore.loading(true)

    formulario.value.selectedProvincia = null
    formulario.value.selectedDistrito = null

    provinciasOptions.value = []
    distritosOptions.value = []

    const { data } = await $api(`/api/sami/v1/procesos/registrar-posible-asesora/datos-provincias`, {
      method: "get",
      query: {
        departamento: (formulario.value.selectedDepartamento === null) ? '' : formulario.value.selectedDepartamento,
      },
    })
    
    const itemProvincias = data.data_glob.slice(0, 40)
    
    itemProvincias.forEach(element => 
      provinciasOptions.value.push({
        id: element.cons_ciud,
        text: element.nomb_ciud,
      }),
    )
  } catch (e) {
    if(e.response !== undefined) {
      // eslint-disable-next-line no-console
      console.log(e.response._data)
    }
  }
  finally {
    appStore.loading(false)
  }
}

const obtenerDistrito = async() => {
  try {
    appStore.mensaje('Obteniendo distritos')
    appStore.loading(true)

    formulario.value.selectedDistrito = null

    distritosOptions.value = []

    const { data } = await $api (`/api/sami/v1/procesos/registrar-posible-asesora/datos-distritos`, {
      method: "get",
      query: {
        provincia: (formulario.value.selectedProvincia === null) ? '' : formulario.value.selectedProvincia,
      },
    })
    
    const itemDistritos = data.data_glob.slice(0, 40)
    
    itemDistritos.forEach(element => 
      distritosOptions.value.push({
        id: element.cons_barr,
        text: element.nomb_barr,
      }),
    )
  } catch (e) {
    if(e.response !== undefined) {
      // eslint-disable-next-line no-console
      console.log(e.response._data)
    }
  }
  finally {
    appStore.loading(false)
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
            <VCard title="Datos Referente">
              <VCardText>
                <VRow>
                  <VCol
                    cols="12"
                    md="3"
                  >
                    <AppTextField
                      v-model="formulario.dniReferente"
                      label="Doc. ident."
                      type="text"
                      placeholder="Ingresar doc. ident."
                      autocomplete="off"
                      :disabled="formulario.isDniReferente"
                      :error="errorDniReferente"
                      :error-messages="errorMensajeDniReferente"
                      @keyup.enter="proc_come_posi_ases_nume_iden"
                      @keydown.tab="proc_come_posi_ases_nume_iden"
                      @keypress="proc_come_posi_ases_bind_text"
                    />
                  </VCol>
                </VRow>

                <VRow>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formulario.nombreReferente"
                      label="Nombre(s)"
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
                      v-model="formulario.apellidoReferente"
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
                    md="12"
                  >
                    <VLabel class="text-h5">
                      Datos Referido
                    </VLabel>
                  </VCol>
                </VRow>

                <VRow>
                  <VCol
                    cols="12"
                    md="3"
                  >
                    <AppTextField
                      v-model="formulario.dniReferido"
                      label="Doc. ident."
                      type="text"
                      placeholder="Ingresar doc. ident."
                      autocomplete="off"
                      :disabled="formulario.isDniReferido"
                      :error="errorDniReferido"
                      :error-messages="errorMensajeDniReferido"
                      @keyup.enter="proc_come_posi_ases_nume_iden_hijo"
                      @keydown.tab="proc_come_posi_ases_nume_iden_hijo"
                      @keypress="proc_come_posi_ases_bind_text"
                    />
                  </VCol>
                </VRow>

                <VRow>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formulario.nombreReferido"
                      label="Nombre(s)"
                      placeholder="Ingresar nombre(s)"
                      type="text"
                      autocomplete="off"
                      :error="errorNombreReferido"
                      :error-messages="errorMensajeNombreReferido"
                      @keypress="proc_come_posi_ases_bind_text"
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formulario.apellidoReferido"
                      label="Apellido(s)"
                      placeholder="Ingresar apellido(s)"
                      type="text"
                      autocomplete="off"
                      :error="errorApellidoReferido"
                      :error-messages="errorMensajeApellidoReferido"
                      @keypress="proc_come_posi_ases_bind_text"
                    />
                  </VCol>
                </VRow>

                <VRow>
                  <VCol
                    cols="12"
                    md="3"
                  >
                    <AppTextField
                      v-model="formulario.telefonoReferido"
                      label="Teléfono"
                      placeholder="Ingresar teléfono"
                      type="text"
                      autocomplete="off"
                      :error="errorTelefonoReferido"
                      :error-messages="errorMensajeTelefonoReferido"
                      @keypress="proc_come_posi_ases_bind_nume"
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="9"
                  >
                    <AppTextField
                      v-model="formulario.correoReferido"
                      label="Correo electrónico"
                      placeholder="Ingresar correo electrónico"
                      type="text"
                      autocomplete="off"
                      :error="errorCorreoReferido"
                      :error-messages="errorMensajeCorreoReferido"
                      @keypress="proc_come_posi_ases_bind_corr"
                    />
                  </VCol>
                </VRow>

                <VRow justify="space-between">
                  <VCol
                    cols="12"
                    md="4"
                  >
                    <AppSelect
                      v-model="formulario.selectedDepartamento"
                      :items="departamentosOptions"
                      label="Departamento"
                      placeholder="Seleccionar departamento"
                      item-title="text"
                      item-value="id"
                      :error="errorSelectedDepartamento"
                      :error-messages="errorMensajeSelectedDepartamento"
                      @update:model-value="obtenerProvincia"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="4"
                  >
                    <AppSelect
                      v-model="formulario.selectedProvincia"
                      :items="provinciasOptions"
                      label="Provincia"
                      placeholder="Seleccionar provincia"
                      item-title="text"
                      item-value="id"
                      :error="errorSelectedProvincia"
                      :error-messages="errorMensajeSelectedProvincia"
                      @update:model-value="obtenerDistrito"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="4"
                  >
                    <AppSelect
                      v-model="formulario.selectedDistrito"
                      :items="distritosOptions"
                      label="Distrito"
                      placeholder="Seleccionar distrito"
                      item-title="text"
                      item-value="id"
                      :error="errorSelectedDistrito"
                      :error-messages="errorMensajeSelectedDistrito"
                    />
                  </VCol>
                </VRow>

                <VRow>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formulario.urbanizacionReferido"
                      label="Dirección"
                      placeholder="Ingresar dirección"
                      type="text"
                      autocomplete="off"
                      :error="errorDireccion"
                      :error-messages="errorMensajeDireccion"
                      @keypress="proc_come_posi_ases_bind_text"
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="3"
                  >
                    <AppTextField
                      v-model="formulario.calleReferido"
                      label="Calle"
                      placeholder="Ingresar calle"
                      type="text"
                      autocomplete="off"
                      @keypress="proc_come_posi_ases_bind_text"
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="3"
                  >
                    <AppTextField
                      v-model="formulario.cruceReferido"
                      label="Cruce"
                      placeholder="Cruce con calle"
                      type="text"
                      autocomplete="off"
                      @keypress="proc_come_posi_ases_bind_text"
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="2"
                  >
                    <AppTextField
                      v-model="formulario.mzReferido"
                      label="Mz"
                      placeholder="Mz"
                      type="text"
                      autocomplete="off"
                      @keypress="proc_come_posi_ases_bind_text"
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="2"
                  >
                    <AppTextField
                      v-model="formulario.ltReferido"
                      label="Lt"
                      placeholder="Lt"
                      type="text"
                      autocomplete="off"
                      @keypress="proc_come_posi_ases_bind_text"
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="2"
                  >
                    <AppTextField
                      v-model="formulario.nroReferido"
                      label="Nro"
                      placeholder="Nro"
                      type="text"
                      autocomplete="off"
                      @keypress="proc_come_posi_ases_bind_text"
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="2"
                  >
                    <AppTextField
                      v-model="formulario.kmReferido"
                      label="Km"
                      placeholder="Km"
                      type="text"
                      autocomplete="off"
                      @keypress="proc_come_posi_ases_bind_text"
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="2"
                  >
                    <AppTextField
                      v-model="formulario.intReferido"
                      label="Int"
                      placeholder="Int"
                      type="text"
                      autocomplete="off"
                      @keypress="proc_come_posi_ases_bind_text"
                    />
                  </VCol>
                </VRow>

                <VRow>
                  <VCol
                    cols="12"
                    md="12"
                  >
                    <AppTextField
                      v-model="formulario.referenciaReferido"
                      label="Referencia"
                      placeholder="Ingresar referencia"
                      type="text"
                      autocomplete="off"
                      :error="errorReferenciaReferido"
                      :error-messages="errorMensajeReferenciaReferido"
                      @keypress="proc_come_posi_ases_bind_text"
                    />
                  </VCol>
                </VRow>
                <VRow justify="space-between">
                  <VCol
                    cols="12"
                    md="3"
                  >
                    <AppSelect
                      v-model="formulario.selectedMedio"
                      :items="mediosOptions"
                      label="Medio contacto"
                      placeholder="Seleccionar medio"
                      item-title="text"
                      item-value="id"
                      :error="errorSelectedMedios"
                      :error-messages="errorMensajeSelectedMedios"
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
