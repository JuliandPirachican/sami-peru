<!-- eslint-disable camelcase -->
<script setup>
import { useAppStore } from '@/stores/app'
import sinImagen from '@images/sin_imagen.png'
import { EncryptStorage } from 'encrypt-storage'
import VueEasyLightbox from 'vue-easy-lightbox'
import { useDisplay } from 'vuetify'
import { VDataTable } from 'vuetify/labs/VDataTable'

definePage({
  meta: {
    action: 'peru/proc_come_conf_insc_movi',
    subject: 'peru/proc_come_conf_insc_movi',
  },
})

const encryptStorage = new EncryptStorage('AZZORTI-SAMI', {
  storageType: 'localStorage',
})

const { mobile } = useDisplay()
const appStore = useAppStore()
const userData = encryptStorage.getItem('userData')

const items = ref([])
const selected = ref([])

const formulario = ref({
  campana: null,
  zona: null,
})

const uploadInputSolicitudFrontal = ref()
const uploadInputSolicitudAdversa = ref()
const uploadInputSolicitudAdversa2 = ref()
const uploadInputDniAdverso = ref()
const uploadInputDniFrontal = ref()
const uploadInputReciboServicio = ref()
const uploadInputFachadaCasa = ref()
const uploadInputCentralRiesgo = ref()

const preinscripcion = ref({
  tabindex: 1,
  tipoDocumento: null,
  nrodocumento: '',
  nroDocumentoAntiguo: '',
  nombres: '',
  apellidos: '',
  departamento: null,
  provincia: null,
  distrito: null,
  tipoVia: null,
  direccion: '',
  campana: '',
  zona: '',
  sector: '',
  fechaNacimiento: null,
  identificacionReferido: '',
  nombreReferido: '',
  telefono: '',
  celular: '',
  correo: '',
  srcDniFrontal: '',
  srcDniAdverso: '',
  srcSolicitudFrontal: '',
  srcSolicitudAdversa: '',
  srcSolicitudAdversa2: '',
  srcReciboServicio: '',
  srcCentralRiesgo: '',
  srcFachadaCasa: '',
  parentesco: '',
  nombreParentesco: '',
  apellidoParentesco: '',
  telefonoParentesco: '',
  celularParentesco: '',
})

const archivoFoto = ref(null)

const tipoDocumentoOptions = ref([
  { id: 'E', text: 'Carnet extranjeria' },
  { id: 'D', text: 'Dni' },
  { id: 'R', text: 'Ruc' },
])

const tipoViaOptions = ref([
  { id: 'aahh', text: 'Asentamiento humano' },
  { id: 'asoc', text: 'Asociación' },
  { id: 'av',   text: 'Avenida' },
  { id: 'cal',  text: 'Calle' },
  { id: 'car',  text: 'Carretera' },
  { id: 'cas',  text: 'Caserio' },
  { id: 'jr',   text: 'Jiron' },
  { id: 'km',   text: 'Kilómetro' },
  { id: 'mz',   text: 'Manzana' },
  { id: 'pje',  text: 'Pasaje' },
  { id: 'prol', text: 'Prolongación' },
  { id: 'pj',   text: 'Pueblo joven' },
  { id: 'sec',  text: 'Sector' },
  { id: 'urb',  text: 'Urbanización' },
  { id: 'otro', text: 'Otro' },
])

const campanaOptions = ref([])
const errorCampana = ref(false)
const errorMensajeCampana = ref('')

const zonaOptions = ref([])
const errorZona = ref(false)
const errorMensajeZona = ref('')

const errorTipoDocumento = ref(false)
const errorMensajeTipoDocumento = ref('')

const errorNroDocumento = ref(false)
const errorMensajeNroDocumento = ref('')

const errorNombres = ref(false)
const errorMensajeNombres = ref('')

const errorApellidos = ref(false)
const errorMensajeApellidos = ref('')

const departamentoOptions = ref([])
const errorDepartamento = ref(false)
const errorMensajeDepartamento = ref('')

const provinciaOptions = ref([])
const errorProvincia = ref(false)
const errorMensajeProvincia = ref('')

const distritoOptions = ref([])
const errorDistrito = ref(false)
const errorMensajeDistrito = ref('')

const parentescoOptions = ref([])

const errorTipoVia = ref(false)
const errorMensajeTipoVia = ref('')

const errorDireccion = ref(false)
const errorMensajeDireccion = ref('')

const errorCelular = ref(false)
const errorMensajeCelular = ref('')

const errorCorreo = ref(false)
const errorMensajeCorreo = ref('')

const errorTelefono = ref(false)
const errorMensajeTelefono = ref('')

const errorTelefonoParentesco = ref(false)
const errorMensajeTelefonoParentesco = ref('')

const errorCelularParentesco = ref(false)
const errorMensajeCelularParentesco = ref('')

const errorIdentificacionReferido = ref(false)
const errorMensajeIdentificacionReferido = ref('')

const isOpenEditar = ref(false)

const headers = computed(() => {
  return [
    { title: '', key: 'acciones', sortable: false, width: '10px' },
    { title: 'Campaña', key: 'codi_camp' },
    { title: 'Zona', key: 'codi_zona' },
    { title: 'Sector', key: 'codi_sect' },
    { title: 'Estado', key: 'esta_prei' },
    { title: 'Fecha', key: 'acti_hora' },
    { title: 'Tipo docu.', key: 'tipo_docu' },
    { title: 'Nro docu.', key: 'nume_docu' },
    { title: 'Nombre(s)', key: 'nomb_terc' },
    { title: 'Apellido(s)', key: 'apel_terc' },
    { title: 'Provincia', key: 'nomb_ciud' },
    { title: 'Distrito', key: 'nomb_barr' },
    { title: 'Dirección', key: 'dire_terc' },
    { title: 'tipo_via', key: 'tipo_viaa', hidden: true },
    { title: 'cons_dpto', key: 'cons_dpto', hidden: true },
    { title: 'cons_ciud', key: 'cons_ciud', hidden: true },
    { title: 'cons_barr', key: 'cons_barr', hidden: true },
    { title: 'fech_naci', key: 'fech_naci', hidden: true },
    { title: 'tele_terc', key: 'tele_terc', hidden: true },
    { title: 'celu_terc', key: 'celu_terc', hidden: true },
    { title: 'corr_ases', key: 'corr_ases', hidden: true },
    { title: 'imag_1', key: 'imag_1', hidden: true },
    { title: 'imag_2', key: 'imag_2', hidden: true },
    { title: 'imag_3', key: 'imag_3', hidden: true },
    { title: 'imag_4', key: 'imag_4', hidden: true },
    { title: 'imag_5', key: 'imag_5', hidden: true },
    { title: 'imag_6', key: 'imag_6', hidden: true },
    { title: 'imag_7', key: 'imag_7', hidden: true },
    { title: 'imag_8', key: 'imag_8', hidden: true },
    { title: 'cedu_refe', key: 'cedu_refe', hidden: true },
    { title: 'nomb_refe', key: 'nomb_refe', hidden: true },
    { title: 'nomb_pare', key: 'nomb_pare', hidden: true },
    { title: 'apel_pare', key: 'apel_pare', hidden: true },
    { title: 'tele_pare', key: 'tele_pare', hidden: true },
    { title: 'celu_pare', key: 'celu_pare', hidden: true },
    { title: 'codi_pare', key: 'codi_pare', hidden: true },
  ]
})

const visibleHeaders = computed(() => headers.value.filter(header => !header.hidden))

onMounted(async () => {
  appStore.titulo(`Procesos / Confirmar inscripción`)
  await obtenerCampana()
  await obtenerZona()
  await obtenerDepartamentos()
  await obtenerParentescos()
  preinscripcion.value.fechaNacimiento = new Date()
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

const obtenerDepartamentos = async () => {
  try {
    appStore.mensaje('Obteniendo departamentos')
    appStore.loading(true)

    preinscripcion.value.provincia = null
    preinscripcion.value.distrito = null

    const response = await $api(`/api/comun/v1/departamentos`, {
      method: "get",
    })
    
    const itemDepartamentos = response.data.data_glob.slice(0, 40)
    
    itemDepartamentos.forEach(element => 
      departamentoOptions.value.push({
        id: element.cons_dpto,
        text: element.nomb_dpto,
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

const obtenerParentescos = async () => {
  try {
    appStore.mensaje('Obteniendo parentescos')
    appStore.loading(true)

    const { data } = await $api(`/api/sami/v1/procesos/confirmar-preinscripcion-movil/parentescos`, {
      method: "get",
    })
    
    const itemParentescos = data.data_glob.slice(0, 40)
    
    itemParentescos.forEach(element => 
      parentescoOptions.value.push({
        id: element.codi_pare,
        text: element.nomb_pare,
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

const obtenerProvincias = async() => {
  try {
    appStore.mensaje('Obteniendo provincias')
    appStore.loading(true)

    provinciaOptions.value = []

    const { data } = await $api(`/api/comun/v1/provincias`, {
      method: "get",
      query: {
        departamento: (preinscripcion.value.departamento === null) ? '' : preinscripcion.value.departamento,
      },
    })
    
    const itemProvincias = data.data_glob.slice(0, 40)
    
    itemProvincias.forEach(element => 
      provinciaOptions.value.push({
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

const updateProvincias = async() => {
  try {
    appStore.mensaje('Obteniendo provincias')
    appStore.loading(true)

    preinscripcion.value.provincia = null
    preinscripcion.value.distrito = null

    provinciaOptions.value = []
    distritoOptions.value = []

    const { data } = await $api(`/api/comun/v1/provincias`, {
      method: "get",
      query: {
        departamento: (preinscripcion.value.departamento === null) ? '' : preinscripcion.value.departamento,
      },
    })
    
    const itemProvincias = data.data_glob.slice(0, 40)
    
    itemProvincias.forEach(element => 
      provinciaOptions.value.push({
        id: element.cons_ciud,
        text: element.nomb_ciud,
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

const obtenerDistritos = async() => {
  try {
    appStore.mensaje('Obteniendo distritos')
    appStore.loading(true)

    distritoOptions.value = []

    const { data } = await $api(`/api/comun/v1/distritos`, {
      method: "get",
      query: {
        departamento: (preinscripcion.value.departamento === null) ? '' : preinscripcion.value.departamento,
        provincia: (preinscripcion.value.provincia === null) ? '' : preinscripcion.value.provincia,
      },
    })
    
    const itemDistritos = data.data_glob.slice(0, 80)
    
    itemDistritos.forEach(element => 
      distritoOptions.value.push({
        id: element.cons_barr,
        text: element.nomb_barr,
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

const updateDistritos = async() => {
  try {
    appStore.mensaje('Obteniendo distritos')
    appStore.loading(true)

    preinscripcion.value.distrito = null

    distritoOptions.value = []

    const { data } = await $api(`/api/comun/v1/distritos`, {
      method: "get",
      query: {
        departamento: (preinscripcion.value.departamento === null) ? '' : preinscripcion.value.departamento,
        provincia: (preinscripcion.value.provincia === null) ? '' : preinscripcion.value.provincia,
      },
    })
    
    const itemDistritos = data.data_glob.slice(0, 80)
    
    itemDistritos.forEach(element => 
      distritoOptions.value.push({
        id: element.cons_barr,
        text: element.nomb_barr,
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

const onSeleccionar = async data => {
  preinscripcion.value.tabindex = 1
  preinscripcion.value.tipoDocumento = data.tipo_docu
  preinscripcion.value.nrodocumento = data.nume_docu
  preinscripcion.value.nroDocumentoAntiguo = data.nume_docu
  preinscripcion.value.nombres = data.nomb_terc
  preinscripcion.value.apellidos = data.apel_terc
  preinscripcion.value.departamento = data.cons_dpto
  preinscripcion.value.provincia = data.cons_ciud
  preinscripcion.value.distrito = data.cons_barr
  preinscripcion.value.tipoVia = data.tipo_viaa
  preinscripcion.value.direccion = data.dire_terc
  preinscripcion.value.campana = data.codi_camp
  preinscripcion.value.zona = data.codi_zona
  preinscripcion.value.sector = data.codi_sect
  preinscripcion.value.fechaNacimiento = data.fech_naci
  preinscripcion.value.identificacionReferido = data.cedu_refe
  preinscripcion.value.nombreReferido = data.nomb_refe
  preinscripcion.value.telefono = data.tele_terc
  preinscripcion.value.celular = data.celu_terc
  preinscripcion.value.correo = data.corr_ases

  preinscripcion.value.srcDniFrontal = data.imag_1
  preinscripcion.value.srcDniAdverso = data.imag_2
  preinscripcion.value.srcSolicitudFrontal = data.imag_3
  preinscripcion.value.srcSolicitudAdversa = data.imag_4
  preinscripcion.value.srcSolicitudAdversa2 = data.imag_8
  preinscripcion.value.srcReciboServicio = data.imag_5
  preinscripcion.value.srcCentralRiesgo = data.imag_6
  preinscripcion.value.srcFachadaCasa = data.imag_7

  preinscripcion.value.parentesco = data.codi_pare
  preinscripcion.value.nombreParentesco = data.nomb_pare
  preinscripcion.value.apellidoParentesco = data.apel_pare
  preinscripcion.value.telefonoParentesco = data.tele_pare
  preinscripcion.value.celularParentesco = data.celu_pare

  await obtenerProvincias()
  await obtenerDistritos()
  isOpenEditar.value = true
}

const onCloseEditar = () => {
  limpiarValidacion()
  isOpenEditar.value = false
  preinscripcion.value = {
    tabindex: 1,
    tipoDocumento: null,
    nrodocumento: '',
    nroDocumentoAntiguo: '',
    nombres: '',
    apellidos: '',
    departamento: null,
    provincia: null,
    distrito: null,
    tipoVia: null,
    direccion: '',
    campana: '',
    zona: '',
    sector: '',
    fechaNacimiento: null,
    identificacionReferido: '',
    nombreReferido: '',
    telefono: '',
    celular: '',
    correo: '',
    srcDniFrontal: '',
    srcDniAdverso: '',
    srcSolicitudFrontal: '',
    srcSolicitudAdversa: '',
    srcSolicitudAdversa2: '',
    srcReciboServicio: '',
    srcCentralRiesgo: '',
    srcFachadaCasa: '',
    parentesco: '',
    nombreParentesco: '',
    apellidoParentesco: '',
    telefonoParentesco: '',
    celularParentesco: '',
  }
}

const onGenerar = async () => {
  try {
    limpiarValidacion()

    appStore.mensaje('Obteniendo información')
    appStore.loading(true)

    const { data } = await $api(`/api/sami/v1/procesos/confirmar-preinscripcion-movil/preinscripciones`, {
      method: "get",
      query: {
        campana: formulario.value.campana,
        zona: formulario.value.zona,
      },
    })

    items.value = []
    selected.value = []
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

const onAprobar = async () => {
  if(selected.value.length > 1 || selected.value.length == 0 ) {
    appStore.mensajeSnackbar('Debe seleccionar una preinscripción')
    appStore.color("error")
    appStore.snackbar(true)
  } else {
    try {
      appStore.mensaje('Generando proceso')
      appStore.loading(true)

      const  data  = await $api(`/api/sami/v1/procesos/confirmar-preinscripcion-movil/aprobar`, {
        method: "put",
        body: {
          nrodocumento: JSON.stringify(selected.value),
        },
      })

      onLimpiar()

      let mensaje = data.message
      mensaje = mensaje.toLowerCase()
      mensaje = mensaje.charAt(0).toUpperCase() + mensaje.slice(1)
      appStore.mensajeSnackbar(mensaje)
      appStore.color("success")
      appStore.snackbar(true)
    } catch (e) {
    }
    finally {
      appStore.loading(false)
    }

  }
  
}

const onRechazar = async () => {
  if(selected.value.length > 1 || selected.value.length == 0 ) {
    appStore.mensajeSnackbar('Debe seleccionar una preinscripción')
    appStore.color("error")
    appStore.snackbar(true)
  } else {
    try {
      appStore.mensaje('Generando proceso')
      appStore.loading(true)

      const data = await $api(`/api/sami/v1/procesos/confirmar-preinscripcion-movil/rechazar`, {
        method: "put",
        body: {
          nrodocumento: JSON.stringify(selected.value),
        },
      })

      onLimpiar()

      let mensaje = data.message
      mensaje = mensaje.toLowerCase()
      mensaje = mensaje.charAt(0).toUpperCase() + mensaje.slice(1)
      appStore.mensajeSnackbar(mensaje)
      appStore.color("success")
      appStore.snackbar(true)
    } catch (e) {
    }
    finally {
      appStore.loading(false)
    }

  }
}

const onLimpiar= async () => {
  items.value = []
  selected.value = []
  formulario.value = {
    campana: null,
    zona: null,
  }
}

const onExcel = async () => {
  try {
    appStore.mensaje('Generando archivo')
    appStore.loading(true)

    const { data }  = await $api(`/api/sami/v1/procesos/confirmar-preinscripcion-movil/excel`, {
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

const onRegistrar = async () => { 
  try {
    limpiarValidacion()
    appStore.mensaje('Actualizando datos')
    appStore.loading(true)

    const data  = await $api(`/api/sami/v1/procesos/confirmar-preinscripcion-movil`, {
      method: "put",
      body: {
        tipoDocumento: (preinscripcion.value.tipoDocumento === null) ? '' : preinscripcion.value.tipoDocumento,
        nroDocumentoAntiguo: (preinscripcion.value.nroDocumentoAntiguo === null) ? '' : preinscripcion.value.nroDocumentoAntiguo,
        nrodocumento: (preinscripcion.value.nrodocumento === null) ? '' : preinscripcion.value.nrodocumento,
        nombres: (preinscripcion.value.nombres === null) ? '' : preinscripcion.value.nombres,
        apellidos: (preinscripcion.value.apellidos === null) ? '' : preinscripcion.value.apellidos,
        departamento: (preinscripcion.value.departamento === null) ? '' : preinscripcion.value.departamento,
        provincia: (preinscripcion.value.provincia === null) ? '' : preinscripcion.value.provincia,
        distrito: (preinscripcion.value.distrito === null) ? '' : preinscripcion.value.distrito,
        direccion: (preinscripcion.value.direccion === null) ? '' : preinscripcion.value.direccion,
        zona: (preinscripcion.value.zona === null) ? '' : preinscripcion.value.zona,
        sector: (preinscripcion.value.sector === null) ? '' : preinscripcion.value.sector,
        identificacionReferido: (preinscripcion.value.identificacionReferido === null) ? '' : preinscripcion.value.identificacionReferido,
        fechaNacimiento: (preinscripcion.value.fechaNacimiento === null) ? '' : preinscripcion.value.fechaNacimiento,
        telefono: (preinscripcion.value.telefono === null) ? '' : preinscripcion.value.telefono,
        celular: (preinscripcion.value.celular === null) ? '' : preinscripcion.value.celular,
        correo: (preinscripcion.value.correo === null) ? '' : preinscripcion.value.correo,
        tipoVia: (preinscripcion.value.tipoVia === null) ? '' : preinscripcion.value.tipoVia,
        parentesco: (preinscripcion.value.parentesco === null) ? '' : preinscripcion.value.parentesco,
        nombreParentesco: (preinscripcion.value.nombreParentesco === null) ? '' : preinscripcion.value.nombreParentesco,
        apellidoParentesco: (preinscripcion.value.apellidoParentesco === null) ? '' : preinscripcion.value.apellidoParentesco,
        telefonoParentesco: (preinscripcion.value.telefonoParentesco === null) ? '' : preinscripcion.value.telefonoParentesco,
        celularParentesco: (preinscripcion.value.celularParentesco === null) ? '' : preinscripcion.value.celularParentesco,
        campana: (preinscripcion.value.campana === null) ? '' : preinscripcion.value.campana,
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
        if (key == 'nrodocumento') {
          errorNroDocumento.value = true
          errorMensajeNroDocumento.value = data[key]
        }
        if (key == 'nombres') {
          errorNombres.value = true
          errorMensajeNombres.value = data[key]
        }
        if (key == 'apellidos') {
          errorApellidos.value = true
          errorMensajeApellidos.value = data[key]
        }
        if (key == 'departamento') {
          errorDepartamento.value = true
          errorMensajeDepartamento.value = data[key]
        }
        if (key == 'provincia') {
          errorProvincia.value = true
          errorMensajeProvincia.value = data[key]
        }
        if (key == 'distrito') {
          errorDistrito.value = true
          errorMensajeDistrito.value = data[key]
        }
        if (key == 'tipoVia') {
          errorTipoVia.value = true
          errorMensajeTipoVia.value = data[key]
        }
        if (key == 'tipoDocumento') {
          errorTipoDocumento.value = true
          errorMensajeTipoDocumento.value = data[key]
        }
        if (key == 'direccion') {
          errorDireccion.value = true
          errorMensajeDireccion.value = data[key]
        }
        if (key == 'zona') {
          errorZona.value = true
          errorMensajeZona.value = data[key]
        }
        if (key == 'celular') {
          errorCelular.value = true
          errorMensajeCelular.value = data[key]
        }
        if (key == 'correo') {
          errorCorreo.value = true
          errorMensajeCorreo.value = data[key]
        }
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

const limpiarValidacion = () => {
  errorCampana.value = false
  errorMensajeCampana.value =  ''

  errorZona.value = false
  errorMensajeZona.value = ''

  errorTipoDocumento.value = false
  errorMensajeTipoDocumento.value = ''

  errorNroDocumento.value = false
  errorMensajeNroDocumento.value = ''

  errorNombres.value = false
  errorMensajeNombres.value = ''

  errorApellidos.value = false
  errorMensajeApellidos.value = ''

  errorDepartamento.value = false
  errorMensajeDepartamento.value = ''

  errorProvincia.value = false
  errorMensajeProvincia.value = ''

  errorDistrito.value = false
  errorMensajeDistrito.value = ''

  errorTipoVia.value = false
  errorMensajeTipoVia.value = ''

  errorDireccion.value = false
  errorMensajeDireccion.value = ''

  errorCelular.value = false
  errorMensajeCelular.value = ''

  errorCorreo.value = false
  errorMensajeCorreo.value = ''

  errorTelefono.value = false
  errorMensajeTelefono.value = ''

  errorTelefonoParentesco.value = false
  errorMensajeTelefonoParentesco.value = ''

  errorCelularParentesco.value = false
  errorMensajeCelularParentesco.value = ''

  errorIdentificacionReferido.value = false
  errorMensajeIdentificacionReferido.value = ''
}

const proc_come_conf_insc_movi_bind_nume = async () => {
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

const proc_come_conf_insc_movi_bind_text = async () => {
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

const proc_come_conf_insc_movi_bind_corr = async () => {
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

const visible = ref()
const imgs = ref([])
const index = ref()

const verImagen = (title, src) => {
  imgs.value = [
    { title, src },
  ]
  visible.value = true
}

const ocultarImagen = () => {
  visible.value = false
}

const errorImagen = tipo => {
  if(tipo === 1) {
    preinscripcion.value.srcSolicitudFrontal = sinImagen
  } else if (tipo === 2) {
    preinscripcion.value.srcSolicitudAdversa = sinImagen
  } else if (tipo === 3) {
    preinscripcion.value.srcSolicitudAdversa2 = sinImagen
  } else if (tipo === 4) {
    preinscripcion.value.srcDniFrontal = sinImagen
  } else if (tipo === 5) {
    preinscripcion.value.srcDniAdverso = sinImagen
  } else if (tipo === 6) {
    preinscripcion.value.srcReciboServicio = sinImagen
  } else if (tipo === 7) {
    preinscripcion.value.srcCentralRiesgo = sinImagen
  } else if (tipo === 8) {
    preinscripcion.value.srcFachadaCasa = sinImagen
  }
}

const handleFileUpload = async tipo => {
  try {
    appStore.mensaje('Subiendo archivo')
    appStore.loading(true)
    let fileInput = ''
    if(tipo === 3) {
      fileInput = uploadInputSolicitudFrontal.value
    } else if (tipo === 4) {
      fileInput = uploadInputSolicitudAdversa.value
    } else if (tipo === 8) {
      fileInput = uploadInputSolicitudAdversa2.value
    } else if (tipo === 1) {
      fileInput = uploadInputDniFrontal.value
    } else if (tipo === 2) {
      fileInput = uploadInputDniAdverso.value
    } else if (tipo === 5) {
      fileInput = uploadInputReciboServicio.value
    } else if (tipo === 6) {
      fileInput = uploadInputCentralRiesgo.value
    } else if (tipo === 7) {
      fileInput = uploadInputFachadaCasa.value
    }
    archivoFoto.value = fileInput.files[0]

    const dataForm = new FormData()

    dataForm.append('fileToUpload', archivoFoto.value)
    dataForm.append('numero', preinscripcion.value.nrodocumento)
    dataForm.append('codigo', tipo)

    const data = await $api(`/api/sami/v1/procesos/confirmar-preinscripcion-movil/archivo`, {
      method: "post",
      body: dataForm,
    })
 
    const foto = await data.message
    switch (tipo) {
    case 3:
      preinscripcion.value.srcSolicitudFrontal = foto
      break
    case 4:
      preinscripcion.value.srcSolicitudAdversa = foto
      break
    case 8:
      preinscripcion.value.srcSolicitudAdversa2 = foto
      break
    case 1:
      preinscripcion.value.srcDniFrontal = foto
      break
    case 2:
      preinscripcion.value.srcDniAdverso = foto
      break
    case 5:
      preinscripcion.value.srcReciboServicio = foto
      break
    case 6:
      preinscripcion.value.srcCentralRiesgo = foto
      break
    case 7:
      preinscripcion.value.srcFachadaCasa = foto
      break
    default:
    }

    appStore.mensajeSnackbar('Imagen cargada con éxito.')
    appStore.color("success")
    appStore.snackbar(true)
    // eslint-disable-next-line no-empty
  } catch (error) {
    console.log(error)
  } finally {
    appStore.loading(false)
    appStore.mensaje('')
  }
}
</script>

<template>
  <div>
    <AppPlantilla>
      <template #botones>
        <GenerarBoton @procesar="onGenerar" />
        <AprobarBoton @procesar="onAprobar" />
        <RechazarBoton @procesar="onRechazar" />
        <ExcelBoton @procesar="onExcel" />
        <LimpiarBoton @procesar="onLimpiar" />
      </template>
      <template #contenido>
        <VRow>
          <VCol cols="12">
            <VCard title="Buscar inscripción">
              <VCardText>
                <VRow justify="space-between">
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
                </VRow>
              </VCardText>
            </VCard>
          </VCol>
          <VCol cols="12">
            <VCard title="Lista inscripción">
              <VCardText>
                <VRow>
                  <VDataTable
                    v-model="selected"
                    :headers="visibleHeaders"
                    :items="items"
                    fixed-header
                    height="400"
                    class="text-no-wrap"
                    :items-per-page="-1"
                    show-select
                    item-value="nume_docu"
                  >
                    <template #item.acciones="{ item }">
                      <IconBtn @click="onSeleccionar(item)">
                        <VIcon icon="tabler-edit" />
                      </IconBtn>
                    </template>
                    <template #bottom />
                  </VDataTable>
                </VRow>
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
        <VToolbar color="primary">
          <VBtn
            v-if="mobile"
            icon
            color="default"
            :rounded="false"
            @click="onCloseConcepto"
          >
            <VIcon icon="tabler-x" />
          </VBtn>
          <VToolbarTitle>
            Confirmar inscripción
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
          <template #extension>
            <VTabs
              v-model="preinscripcion.tabindex"
              align-tabs="left"
              color="dark"
            >
              <VTab :value="1">
                <span class="text-secondary">Datos personales</span>
              </VTab>
              <VTab :value="2">
                <span class="text-secondary">Dirección</span>
              </VTab>
              <VTab :value="3">
                <span class="text-secondary">Referencia</span>
              </VTab>
              <VTab :value="4">
                <span class="text-secondary">Imagenes</span>
              </VTab>
              <VTab :value="5">
                <span class="text-secondary">Referencia personal</span>
              </VTab>
            </VTabs>
          </template>
        </VToolbar>
        <VCardText class="px-md-0 px-3 pt-md-0 pt-2">
          <VRow class="d-flex flex-column">
            <VCol cols="12">
              <VWindow v-model="preinscripcion.tabindex">
                <VWindowItem :value="1">
                  <VCard>
                    <VCardText>
                      <VRow>
                        <VCol
                          cols="12"
                          md="3"
                        >
                          <AppSelect
                            v-model="preinscripcion.tipoDocumento"
                            :items="tipoDocumentoOptions"
                            label="Tipo documento"
                            placeholder="Seleccionar tipo documento"
                            item-title="text"
                            item-value="id"
                            :error="errorTipoDocumento"
                            :error-messages="errorMensajeTipoDocumento"
                          />
                        </VCol>
                      </VRow>
                      <VRow>
                        <VCol
                          cols="12"
                          md="3"
                        >
                          <AppTextField
                            v-model="preinscripcion.nrodocumento"
                            label="Nro documento"
                            type="text"
                            placeholder="Ingresar nro documento"
                            autocomplete="off"
                            :error="errorNroDocumento"
                            :error-messages="errorMensajeNroDocumento"
                            @keypress="proc_come_conf_insc_movi_bind_nume"
                          />
                        </VCol>
                      </VRow>
                      <VRow>
                        <VCol
                          cols="12"
                          md="6"
                        >
                          <AppTextField
                            v-model="preinscripcion.nombres"
                            label="Nombre(s)"
                            type="text"
                            placeholder="Ingresar nombre(s)"
                            autocomplete="off"
                            :error="errorNombres"
                            :error-messages="errorMensajeNombres"
                            @keypress="proc_come_conf_insc_movi_bind_text"
                          />
                        </VCol>

                        <VCol
                          cols="12"
                          md="6"
                        >
                          <AppTextField
                            v-model="preinscripcion.apellidos"
                            label="Apellido(s)"
                            type="text"
                            placeholder="Ingresar apellido(s)"
                            autocomplete="off"
                            :error="errorApellidos"
                            :error-messages="errorMensajeApellidos"
                            @keypress="proc_come_conf_insc_movi_bind_text"
                          />
                        </VCol>
                      </VRow>
                    </VCardText>
                  </VCard>
                </VWindowItem>
                <VWindowItem :value="2">
                  <VCard>
                    <VCardText>
                      <VRow>
                        <VCol
                          cols="12"
                          md="4"
                        >
                          <AppSelect
                            v-model="preinscripcion.departamento"
                            :items="departamentoOptions"
                            label="Departamento"
                            placeholder="Seleccionar departamento"
                            item-title="text"
                            item-value="id"
                            :error="errorDepartamento"
                            :error-messages="errorMensajeDepartamento"
                            @update:model-value="updateProvincias"
                          />
                        </VCol>

                        <VCol
                          cols="12"
                          md="4"
                        >
                          <AppSelect
                            v-model="preinscripcion.provincia"
                            :items="provinciaOptions"
                            label="Provincia"
                            placeholder="Seleccionar provincia"
                            item-title="text"
                            item-value="id"
                            :error="errorProvincia"
                            :error-messages="errorMensajeProvincia"
                            @update:model-value="updateDistritos"
                          />
                        </VCol>

                        <VCol
                          cols="12"
                          md="4"
                        >
                          <AppSelect
                            v-model="preinscripcion.distrito"
                            :items="distritoOptions"
                            label="Distrito"
                            placeholder="Seleccionar distrito"
                            item-title="text"
                            item-value="id"
                            :error="errorDistrito"
                            :error-messages="errorMensajeDistrito"
                          />
                        </VCol>
                      </VRow>
                      <VRow>
                        <VCol
                          cols="12"
                          md="4"
                        >
                          <AppSelect
                            v-model="preinscripcion.tipoVia"
                            :items="tipoViaOptions"
                            label="Tipo via"
                            placeholder="Seleccionar tipo via"
                            item-title="text"
                            item-value="id"
                            :error="errorTipoVia"
                            :error-messages="errorMensajeTipoVia"
                          />
                        </VCol>
                      </VRow>
                      <VRow>
                        <VCol
                          cols="12"
                          md="12"
                        >
                          <AppTextField
                            v-model="preinscripcion.direccion"
                            label="Dirección"
                            type="text"
                            placeholder="Ingresar dirección"
                            autocomplete="off"
                            :error="errorDireccion"
                            :error-messages="errorMensajeDireccion"
                            @keypress="proc_come_conf_insc_movi_bind_text"
                          />
                        </VCol>
                      </VRow>
                      <VRow>
                        <VCol
                          cols="12"
                          md="4"
                        >
                          <AppTextField
                            v-model="preinscripcion.campana"
                            label="Campaña"
                            type="text"
                            placeholder="Ingresar campaña"
                            autocomplete="off"
                            :error="errorCampana"
                            :error-messages="errorMensajeCampana"
                            @keypress="proc_come_conf_insc_movi_bind_nume"
                          />
                        </VCol>
                        <VCol
                          cols="12"
                          md="4"
                        >
                          <AppTextField
                            v-model="preinscripcion.zona"
                            label="Zona"
                            type="text"
                            placeholder="Ingresar zona"
                            autocomplete="off"
                            disabled
                            :error="errorZona"
                            :error-messages="errorMensajeZona"
                            @keypress="proc_come_conf_insc_movi_bind_nume"
                          />
                        </VCol>

                        <VCol
                          cols="12"
                          md="4"
                        >
                          <AppTextField
                            v-model="preinscripcion.sector"
                            label="Sector"
                            type="text"
                            placeholder="Ingresar sector"
                            autocomplete="off"
                            @keypress="proc_come_conf_insc_movi_bind_nume"
                          />
                        </VCol>
                      </VRow>
                    </VCardText>
                  </VCard>
                </VWindowItem>
                <VWindowItem :value="3">
                  <VCard>
                    <VCardText>
                      <VRow>
                        <VCol
                          cols="12"
                          md="3"
                        >
                          <AppDateTimePicker
                            v-model="preinscripcion.fechaNacimiento"
                            label="Fecha de nacimiento"
                            :config="{ dateFormat: 'd/m/Y' }"
                          />
                        </VCol>
                      </VRow>
                      <VRow>
                        <VCol
                          cols="12"
                          md="4"
                        >
                          <AppTextField
                            v-model="preinscripcion.identificacionReferido"
                            label="Referido por"
                            type="text"
                            placeholder="Ingresar nro de identidad"
                            autocomplete="off"
                            :error="errorIdentificacionReferido"
                            :error-messages="errorMensajeIdentificacionReferido"
                            @keypress="proc_come_conf_insc_movi_bind_nume"
                          />
                        </VCol>

                        <VCol
                          cols="12"
                          md="8"
                        >
                          <AppTextField
                            v-model="preinscripcion.nombreReferido"
                            label="Nombre(s) y apellido(s)"
                            type="text"
                            autocomplete="off"
                            disabled
                          />
                        </VCol>
                      </VRow>
                      <VRow>
                        <VCol
                          cols="12"
                          md="4"
                        >
                          <AppTextField
                            v-model="preinscripcion.telefono"
                            label="Teléfono fijo"
                            type="text"
                            placeholder="Ingresar teléfono fijo"
                            autocomplete="off"
                            :error="errorTelefono"
                            :error-messages="errorMensajeTelefono"
                            @keypress="proc_come_conf_insc_movi_bind_nume"
                          />
                        </VCol>

                        <VCol
                          cols="12"
                          md="8"
                        >
                          <AppTextField
                            v-model="preinscripcion.celular"
                            label="Teléfono celular"
                            type="text"
                            placeholder="Ingresar teléfono celular"
                            autocomplete="off"
                            :error="errorCelular"
                            :error-messages="errorMensajeCelular"
                            @keypress="proc_come_conf_insc_movi_bind_nume"
                          />
                        </VCol>
                      </VRow>
                      <VRow>
                        <VCol
                          cols="12"
                          md="8"
                        >
                          <AppTextField
                            v-model="preinscripcion.correo"
                            label="Correo electrónico"
                            type="text"
                            placeholder="Ingresar correo electrónico"
                            autocomplete="off"
                            :error="errorCorreo"
                            :error-messages="errorMensajeCorreo"
                            @keypress="proc_come_conf_insc_movi_bind_corr"
                          />
                        </VCol>
                      </VRow>
                    </VCardText>
                  </VCard>
                </VWindowItem>
                <VWindowItem :value="4">
                  <VCard>
                    <VCardText>
                      <VRow>
                        <VCol
                          cols="12"
                          md="3"
                          class="d-flex flex-column align-items-center justify-content-center text-center"
                        >
                          <VImg
                            :width="300"
                            alt="Solicitud frontal"
                            aspect-ratio="16/9"
                            :src="preinscripcion.srcSolicitudFrontal"
                            @error="errorImagen(1)"
                          />
                          <h4 class="my-4">
                            Solicitud frontal
                          </h4>
                          <div :class="(preinscripcion.srcSolicitudFrontal.includes('fotos') || preinscripcion.srcSolicitudFrontal.includes('temporales')) ? 'd-flex justify-space-between' : 'd-flex justify-center'">
                            <input
                              ref="uploadInputSolicitudFrontal"
                              type="file"
                              class="d-none"
                              accept=".jpg"
                              @change="handleFileUpload(3)"
                            >
                            <VBtn
                              color="primary"
                              @click="$refs.uploadInputSolicitudFrontal.click()"
                            >
                              SUBIR
                            </VBtn>
                            <VBtn
                              v-if="preinscripcion.srcSolicitudFrontal.includes('fotos') || preinscripcion.srcSolicitudFrontal.includes('temporales')"
                              variant="outlined"
                              color="secondary"
                              @click="verImagen('Solicitud frontal', preinscripcion.srcSolicitudFrontal)"
                            >
                              VER
                            </VBtn>
                          </div>
                        </VCol>

                        <VCol
                          cols="12"
                          md="3"
                          class="d-flex flex-column align-items-center justify-content-center text-center"
                        >
                          <VImg
                            :width="300"
                            alt="Solicitud adversa 1"
                            aspect-ratio="16/9"
                            :src="preinscripcion.srcSolicitudAdversa"
                            @error="errorImagen(2)"
                          />
                          <h4 class="my-4">
                            Solicitud adversa 1
                          </h4>
                          <div :class="(preinscripcion.srcSolicitudAdversa.includes('fotos') || preinscripcion.srcSolicitudAdversa.includes('temporales')) ? 'd-flex justify-space-between' : 'd-flex justify-center'">
                            <input
                              ref="uploadInputSolicitudAdversa"
                              type="file"
                              class="d-none"
                              accept=".jpg"
                              @change="handleFileUpload(4)"
                            >
                            <VBtn
                              color="primary"
                              @click="$refs.uploadInputSolicitudAdversa.click()"
                            >
                              SUBIR
                            </VBtn>
                            <VBtn
                              v-if="preinscripcion.srcSolicitudAdversa.includes('fotos') || preinscripcion.srcSolicitudAdversa.includes('temporales')"
                              variant="outlined"
                              color="secondary"
                              @click="verImagen('Solicitud adversa 1', preinscripcion.srcSolicitudAdversa)"
                            >
                              VER
                            </VBtn>
                          </div>
                        </VCol>

                        <VCol
                          cols="12"
                          md="3"
                          class="d-flex flex-column align-items-center justify-content-center text-center"
                        >
                          <VImg
                            :width="300"
                            alt="Solicitud adversa 2"
                            aspect-ratio="16/9"
                            :src="preinscripcion.srcSolicitudAdversa2"
                            @error="errorImagen(3)"
                          />
                          <h4 class="my-4">
                            Solicitud adversa 2
                          </h4>
                          <div :class="(preinscripcion.srcSolicitudAdversa2.includes('fotos') || preinscripcion.srcSolicitudAdversa2.includes('temporales')) ? 'd-flex justify-space-between' : 'd-flex justify-center'">
                            <input
                              ref="uploadInputSolicitudAdversa2"
                              type="file"
                              class="d-none"
                              accept=".jpg"
                              @change="handleFileUpload(8)"
                            >
                            <VBtn
                              color="primary"
                              @click="$refs.uploadInputSolicitudAdversa2.click()"
                            >
                              SUBIR
                            </VBtn>
                            <VBtn
                              v-if="preinscripcion.srcSolicitudAdversa2.includes('fotos') || preinscripcion.srcSolicitudAdversa2.includes('temporales')"
                              variant="outlined"
                              color="secondary"
                              @click="verImagen('Solicitud adversa 2', preinscripcion.srcSolicitudAdversa2)"
                            >
                              VER
                            </VBtn>
                          </div>
                        </VCol>

                        <VCol
                          cols="12"
                          md="3"
                          class="d-flex flex-column align-items-center justify-content-center text-center"
                        >
                          <VImg
                            :width="300"
                            alt=" Dni frontal"
                            aspect-ratio="16/9"
                            :src="preinscripcion.srcDniFrontal"
                            @error="errorImagen(4)"
                          />
                          <h4 class="my-4">
                            Dni frontal
                          </h4>
                          <div :class="(preinscripcion.srcDniFrontal.includes('fotos') || preinscripcion.srcDniFrontal.includes('temporales')) ? 'd-flex justify-space-between' : 'd-flex justify-center'">
                            <input
                              ref="uploadInputDniFrontal"
                              type="file"
                              class="d-none"
                              accept=".jpg"
                              @change="handleFileUpload(1)"
                            >
                            <VBtn
                              color="primary"
                              @click="$refs.uploadInputDniFrontal.click()"
                            >
                              SUBIR
                            </VBtn>
                            <VBtn
                              v-if="preinscripcion.srcDniFrontal.includes('fotos') || preinscripcion.srcDniFrontal.includes('temporales')"
                              variant="outlined"
                              color="secondary"
                              @click="verImagen('Dni frontal', preinscripcion.srcDniFrontal)"
                            >
                              VER
                            </VBtn>
                          </div>
                        </VCol>
                      </VRow>

                      <VRow>
                        <VCol
                          cols="12"
                          md="3"
                          class="d-flex flex-column align-items-center justify-content-center text-center"
                        >
                          <VImg
                            :width="300"
                            alt="Dni adverso"
                            aspect-ratio="16/9"
                            :src="preinscripcion.srcDniAdverso"
                            @error="errorImagen(5)"
                          />
                          <h4 class="my-4">
                            Dni adverso
                          </h4>
                          <div :class="(preinscripcion.srcDniAdverso.includes('fotos') || preinscripcion.srcDniAdverso.includes('temporales')) ? 'd-flex justify-space-between' : 'd-flex justify-center'">
                            <input
                              ref="uploadInputDniAdverso"
                              type="file"
                              class="d-none"
                              accept=".jpg"
                              @change="handleFileUpload(2)"
                            >
                            <VBtn
                              color="primary"
                              @click="$refs.uploadInputDniAdverso.click()"
                            >
                              SUBIR
                            </VBtn>
                            <VBtn
                              v-if="preinscripcion.srcDniAdverso.includes('fotos') || preinscripcion.srcDniAdverso.includes('temporales')"
                              variant="outlined"
                              color="secondary"
                              @click="verImagen('Dni adverso', preinscripcion.srcDniAdverso)"
                            >
                              VER
                            </VBtn>
                          </div>
                        </VCol>

                        <VCol
                          cols="12"
                          md="3"
                          class="d-flex flex-column align-items-center justify-content-center text-center"
                        >
                          <VImg
                            :width="300"
                            alt="Recibo de servicio"
                            aspect-ratio="16/9"
                            :src="preinscripcion.srcReciboServicio"
                            @error="errorImagen(6)"
                          />
                          <h4 class="my-4">
                            Recibo de servicio
                          </h4>
                          <div :class="(preinscripcion.srcReciboServicio.includes('fotos') || preinscripcion.srcReciboServicio.includes('temporales')) ? 'd-flex justify-space-between' : 'd-flex justify-center'">
                            <input
                              ref="uploadInputReciboServicio"
                              type="file"
                              class="d-none"
                              accept=".jpg"
                              @change="handleFileUpload(5)"
                            >
                            <VBtn
                              color="primary"
                              @click="$refs.uploadInputReciboServicio.click()"
                            >
                              SUBIR
                            </VBtn>
                            <VBtn
                              v-if="preinscripcion.srcReciboServicio.includes('fotos') || preinscripcion.srcReciboServicio.includes('temporales')"
                              variant="outlined"
                              color="secondary"
                              @click="verImagen('Recibo de servicio', preinscripcion.srcReciboServicio)"
                            >
                              VER
                            </VBtn>
                          </div>
                        </VCol>

                        <VCol
                          cols="12"
                          md="3"
                          class="d-flex flex-column align-items-center justify-content-center text-center"
                        >
                          <VImg
                            :width="300"
                            alt="Central de riesgo"
                            aspect-ratio="16/9"
                            :src="preinscripcion.srcCentralRiesgo"
                            @error="errorImagen(7)"
                          />
                          <h4 class="my-4">
                            Central de riesgo
                          </h4>
                          <div :class="(preinscripcion.srcCentralRiesgo.includes('fotos') || preinscripcion.srcCentralRiesgo.includes('temporales')) ? 'd-flex justify-space-between' : 'd-flex justify-center'">
                            <input
                              ref="uploadInputCentralRiesgo"
                              type="file"
                              class="d-none"
                              accept=".jpg"
                              @change="handleFileUpload(6)"
                            >
                            <VBtn
                              color="primary"
                              @click="$refs.uploadInputCentralRiesgo.click()"
                            >
                              SUBIR
                            </VBtn>
                            <VBtn
                              v-if="preinscripcion.srcCentralRiesgo.includes('fotos') || preinscripcion.srcCentralRiesgo.includes('temporales')"
                              variant="outlined"
                              color="secondary"
                              @click="verImagen('Central de riesgo', preinscripcion.srcCentralRiesgo)"
                            >
                              VER
                            </VBtn>
                          </div>
                        </VCol>

                        <VCol
                          cols="12"
                          md="3"
                          class="d-flex flex-column align-items-center justify-content-center text-center"
                        >
                          <VImg
                            :width="300"
                            alt="Otros"
                            aspect-ratio="16/9"
                            :src="preinscripcion.srcFachadaCasa"
                            @error="errorImagen(8)"
                          />
                          <h4 class="my-4">
                            Otros
                          </h4>
                          <div :class="(preinscripcion.srcFachadaCasa.includes('fotos') || preinscripcion.srcFachadaCasa.includes('temporales')) ? 'd-flex justify-space-between' : 'd-flex justify-center'">
                            <input
                              ref="uploadInputFachadaCasa"
                              type="file"
                              class="d-none"
                              accept=".jpg"
                              @change="handleFileUpload(7)"
                            >
                            <VBtn
                              color="primary"
                              @click="$refs.uploadInputFachadaCasa.click()"
                            >
                              SUBIR
                            </VBtn>
                            <VBtn
                              v-if="preinscripcion.srcFachadaCasa.includes('fotos') || preinscripcion.srcFachadaCasa.includes('temporales')"
                              variant="outlined"
                              color="secondary"
                              @click="verImagen('Otros', preinscripcion.srcFachadaCasa)"
                            >
                              VER
                            </VBtn>
                          </div>
                        </VCol>
                      </VRow>
                    </VCardText>
                  </VCard>
                </VWindowItem>
                <VWindowItem :value="5">
                  <VCard>
                    <VCardText>
                      <VRow>
                        <VCol
                          cols="12"
                          md="4"
                        >
                          <AppSelect
                            v-model="preinscripcion.parentesco"
                            :items="parentescoOptions"
                            label="Tipo parentesco"
                            placeholder="Seleccionar parentesco"
                            item-title="text"
                            item-value="id"
                          />
                        </VCol>
                      </VRow>
                      <VRow>
                        <VCol
                          cols="12"
                          md="4"
                        >
                          <AppTextField
                            v-model="preinscripcion.nombreParentesco"
                            label="Nombre(s)"
                            type="text"
                            placeholder="Ingresar nombres"
                            autocomplete="off"
                            @keypress="proc_come_conf_insc_movi_bind_text"
                          />
                        </VCol>

                        <VCol
                          cols="12"
                          md="4"
                        >
                          <AppTextField
                            v-model="preinscripcion.apellidoParentesco"
                            label="Apellido(s)"
                            type="text"
                            placeholder="Ingresar apellidos"
                            autocomplete="off"
                            @keypress="proc_come_conf_insc_movi_bind_text"
                          />
                        </VCol>
                      </VRow>
                      <VRow>
                        <VCol
                          cols="12"
                          md="3"
                        >
                          <AppTextField
                            v-model="preinscripcion.telefonoParentesco"
                            label="Teléfono fijo"
                            type="text"
                            placeholder="Ingresar teléfono fijo"
                            autocomplete="off"
                            :error="errorTelefonoParentesco"
                            :error-messages="errorMensajeTelefonoParentesco"
                            @keypress="proc_come_conf_insc_movi_bind_nume"
                          />
                        </VCol>
                        <VCol
                          cols="12"
                          md="3"
                        >
                          <AppTextField
                            v-model="preinscripcion.celularParentesco"
                            label="Teléfono celular"
                            type="text"
                            placeholder="Ingresar celular"
                            autocomplete="off"
                            :error="errorCelularParentesco"
                            :error-messages="errorMensajeCelularParentesco"
                            @keypress="proc_come_conf_insc_movi_bind_nume"
                          />
                        </VCol>
                      </VRow>
                    </VCardText>
                  </VCard>
                </VWindowItem>
              </VWindow>  
            </VCol>
            <VCol
              cols="12" 
              class="d-flex justify-space-between"
            >
              <VBtn
                :block="(mobile) ? true : false"
                type="button"
                variant="outlined"
                color="error"
                class="mx-6"
                @click="onCloseEditar"
              >
                CANCELAR
              </VBtn>
              <VBtn
                :block="(mobile) ? true : false"
                class="mx-6"
                color="secondary"
                @click="onRegistrar"
              >
                REGISTRAR
              </VBtn>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VDialog>
    <VueEasyLightbox
      esc-disabled
      :visible="visible"
      :imgs="imgs"
      :index="index"
      @hide="ocultarImagen"
    />
  </div>
</template>

<style lang="scss">
.flat-picker-custom-style {
  inset-block: auto 8px;
}
</style>
