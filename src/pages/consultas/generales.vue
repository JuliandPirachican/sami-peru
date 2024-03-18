<script setup>
import { useAppStore } from '@/stores/app'
import ConsultaGemmaDialog from '@/views/peru/cons_come_cons_gene/ConsultaGemmaDialog.vue'
import MovimientoReferidoDialog from '@/views/peru/cons_come_cons_gene/MovimientoReferidoDialog.vue'
import PaqueteLiderDialog from '@/views/peru/cons_come_cons_gene/PaqueteLiderDialog.vue'
import PremioEnviarDialog from '@/views/peru/cons_come_cons_gene/PremioEnviarDialog.vue'
import ServicioDetalleDialog from '@/views/peru/cons_come_cons_gene/ServicioDetalleDialog.vue'
import { EncryptStorage } from 'encrypt-storage'

definePage({
  meta: {
    action: 'peru/cons_come_cons_gene',
    subject: 'peru/cons_come_cons_gene',
  },
})

const encryptStorage = new EncryptStorage('AZZORTI-SAMI', {
  storageType: 'localStorage',
})

// *Declaracion de variables
const appStore = useAppStore()
const userData = encryptStorage.getItem('userData')

const headersGlobal = ref([])
const itemsGlobal = ref([])
const dialogGlobalVisible = ref(false) 
const dialogGlobalTitulo = ref('')
const dialogGlobalProcesar = ref('')

const headersGlobalDetalle = ref([])
const itemsGlobalDetalle = ref([])
const dialogGlobalGlobalTitulo = ref('')
const dialogGlobalDetalleTitulo = ref('')

const headersDetalle = ref([])
const itemsDetalle = ref([])
const dialogDetalleVisible = ref(false) 
const dialogDetalleTitulo = ref('')
const dialogDetalleProcesar = ref('')

const dataAsesora = ref({})
const segmentacion = ref('')
const errorDocumentoIdentidad = ref(false)
const errorMensajeDocumentoIdentidad = ref('')
const errorNombre = ref(false)
const errorMensajeNombre = ref ('')
const errorApellido = ref(false)
const errorMensajeApellido= ref ('')

const formulario = ref({
  documento: '',
  nombre: '',
  apellido: '',
})

const opciones = ref([])

const tituloDialog = ref([])

const paqueteLiderVisible = ref(false)
const dataPaqueteLider = ref([])

const servicioDetalleVisible = ref(false)
const dataServicioDetalle = ref([])

const dataPremioVenta = ref([])

const premioEnviarVisible = ref(false)
const dataPremioEnviar = ref([])

const movimientoReferidoVisible = ref(false)
const dataMovimientoReferido = ref([])

const consultaGemmaVisible = ref(false)
const dataConsultaGemma = ref([])

onMounted(() => {
  appStore.titulo(`Consultas / Generales`)
})

// *Metodos
/* 
  ^Metodo limpiarValidacion 
  ^Limpia las valicaciones del formulario
*/
const limpiarValidacion = () => {
  errorDocumentoIdentidad.value = false
  errorMensajeDocumentoIdentidad.value = ''
  errorNombre.value = false
  errorMensajeNombre.value = ''
  errorApellido.value = false
  errorMensajeApellido.value= ''
}

const limpiaDataGlobalDialog = () => {
  dialogGlobalDetalleTitulo.value = ''
  dialogGlobalGlobalTitulo.value = ''
  headersGlobal.value = []
  headersGlobalDetalle.value = []
  itemsGlobal.value = []
  itemsGlobalDetalle.value = []
}

/*
  ^Metodo onGenerar
  ^Busca la asesora por documento - nombre - apelido
*/
// eslint-disable-next-line sonarjs/cognitive-complexity
const onGenerar = async () => {
  limpiarValidacion()
  if (formulario.value.documento == '' && formulario.value.nombre == '' && formulario.value.apellido == '') {
    errorDocumentoIdentidad.value = true
    errorNombre.value = true
    errorApellido.value = true 
    appStore.mensajeSnackbar('No a ingresado ningun parametro.')
    appStore.color("error")
    appStore.snackbar(true)
  } else {
    try {
      appStore.mensaje('Obteniendo información')
      appStore.loading(true)

      const response = await $api(`/api/inca/consultas/v1/generales/cliente`, {
        method: "GET",
        query: {
          documento: formulario.value.documento,
          nombre: formulario.value.nombre,
          apellido: formulario.value.apellido,
          codigo: userData.codi_perf,
          perfil: userData.valo_perf,
        },
      })

      const data = response.data.data_glob
      if (data.length > 1) {
        headersGlobal.value = [
          {
            title: '',
            key: 'acciones',
            sortable: false,
          },
          {
            title: 'Zona',
            key: 'codi_zona',
          },
          {
            title: 'Dni / Ruc',
            key: 'nume_iden',
          },
          {
            title: 'Nombre(s)',
            key: 'nomb_terc',
          },
          {
            title: 'Apellido(s)',
            key: 'apel_terc',
          },
        ]
        itemsGlobal.value = data
        dialogGlobalTitulo.value = 'Detalle asesora'
        dialogGlobalProcesar.value = onSeleccionarAsesora
        dialogGlobalVisible.value = true
      } else {
        seleccionarAsesora(data[0])
      }
    
    } catch (e) {
      console.log(e)
    }
    finally {
      appStore.loading(false)
    }
  }
}

/*
  ^Metodo onLimpiar
  ^Limpia el formulario
*/
// eslint-disable-next-line sonarjs/cognitive-complexity
const onLimpiar= async () => {
  limpiarValidacion()
  limpiaDataGlobalDialog()
  dataAsesora.value = {}
  formulario.value = {
    documento: '',
    nombre: '',
    apellido: '',
  }
  opciones.value = []
  segmentacion.value = ''
}

/* 
  ^Metodo onSeleccionarAsesora 
  ^Busca el detalle de la asesora dentro del array
*/
const onSeleccionarAsesora = asesora => {
  const data = itemsGlobal.value.filter(value => value.nume_iden === asesora.nume_iden)
  if (data.length > 0) {
    seleccionarAsesora(data[0])
  } else {
    appStore.mensajeSnackbar('Error al obtener detalle, por favor intente nuevamente.')
    appStore.color("error")
    appStore.snackbar(true)
  }
}

const seleccionarAsesora = asesora => {
  dataAsesora.value = asesora
  formulario.value = {
    documento: dataAsesora.value.nume_iden,
    nombre: dataAsesora.value.nomb_terc,
    apellido: dataAsesora.value.apel_terc,
  }
  if (dataAsesora.value.desc_segm !== '') {
    segmentacion.value += `${dataAsesora.value.desc_segm}`
  }
  if (dataAsesora.value.ases_estr  !== '') {
    if (segmentacion.value !== '') {
      segmentacion.value += ' | '
    }
    segmentacion.value += 'Asesora estrella'
  }
  if (dataAsesora.value.clie_gema  !== '') {
    if (segmentacion.value !== '') {
      segmentacion.value += ' | '
    }
    segmentacion.value += `Nivel gemmas ${dataAsesora.value.nive_gema }`
  }
  dialogGlobalVisible.value = false
  
  opciones.value = [
    {
      titulo: 'Cartera general',
      subtitulo: `Código : ${dataAsesora.value.codi_terc}`,
      click: onCarteraGeneral,
      icono: 'tabler-currency-dollar',
    },
    {
      titulo: 'Facturas generales ',
      subtitulo: `Identificación : ${dataAsesora.value.nume_iden}`,
      click: onFacturaGeneral,
      icono: 'tabler-file-invoice',
    },
    {
      titulo: 'Paquete líder',
      subtitulo: `Identificación : ${dataAsesora.value.cons_terc}`,
      click: onPaqueteLider,
      icono: 'tabler-box-multiple',
    },
    {
      titulo: 'Premios enviados',
      subtitulo: `Zona : ${dataAsesora.value.codi_zona} Corte: ${dataAsesora.value.codi_cort}`,
      click: onPremioEnviado,
      icono: 'tabler-gift',
    },
    {
      titulo: 'Ingresos',
      subtitulo: `Nombre(s) : ${dataAsesora.value.nomb_terc}`,
      click: onIngresoGeneral,
      icono: 'tabler-currency-dollar',
    },
    {
      titulo: 'Movimiento servicio',
      subtitulo: `Apelllido(s) : ${dataAsesora.value.apel_terc}`,
      click: onServicioGeneral,
      icono: 'tabler-24-hours',
    },
    {
      titulo: 'Premios por referidos',
      subtitulo: `Fecha nacimiento : ${dataAsesora.value.fech_naci}`,
      click: onPremioReferido,
      icono: 'tabler-gift',
    },
    {
      titulo: 'Premios por ventas',
      subtitulo: `Teléfono(s) : ${dataAsesora.value.tele_terc}`,
      click: onPremioVenta,
      icono: 'tabler-gift',
    },
    {
      titulo: 'Direción',
      subtitulo: `Fecha nacimiento : ${dataAsesora.value.dire_terc}`,
      click: null,
      icono: 'tabler-home',
    },
    {
      titulo: 'Reclamos por premios',
      subtitulo: `Distrito: ${dataAsesora.value.nomb_barr}`,
      click: onReclamoGeneral,
      icono: 'tabler-user-exclamation',
    },
    {
      titulo: 'Premios por enviar',
      subtitulo: `Provincia: ${dataAsesora.value.nomb_ciud}`,
      click: onPremioEnviar,
      icono: 'tabler-bus-stop',
    },
    {
      titulo: 'Recodificación',
      subtitulo: `Provincia: ${dataAsesora.value.nomb_ciud}`,
      click: onRecodificacion,
      icono: 'tabler-home-edit',
    },
    {
      titulo: 'Sanciones',
      subtitulo: `Dígito : ${dataAsesora.value.digi_terc} Anterior : ${dataAsesora.value.ante_terc}`,
      click: onSancion,
      icono: 'tabler-user-x',
    },
    {
      titulo: 'Cupo',
      subtitulo: `${dataAsesora.value.cupo_cred}`,
      click: null,
      icono: 'tabler-credit-card',
    },
    {
      titulo: 'Cartera por documento',
      subtitulo: `Saldo cartera : ${dataAsesora.value.sald_docu}`,
      click: onCarteraDocumentoGeneral,
      icono: 'tabler-files-off',
    },
    {
      titulo: 'Recibos',
      subtitulo: `Saldo a favor RC : ${dataAsesora.value.sald_ingr}`,
      click: onRecibo,
      icono: 'tabler-file-dollar',
    },
    {
      titulo: 'Nota de crédito',
      subtitulo: `Saldo a favor NC : ${dataAsesora.value.sald_nota}`,
      click: onNotaCredito,
      icono: 'tabler-file-minus',
    },
    {
      titulo: 'Estado de cuenta',
      subtitulo: `Número de pedido : ${dataAsesora.value.nume_pedi}`,
      click: onEstadoCuenta,
      icono: 'tabler-file-invoice',
    },
    {
      titulo: 'Movimiento referido',
      subtitulo: `Abono`,
      click: onMovimientoReferido,
      icono: 'tabler-users',
    },
    {
      titulo: 'Referencias personales',
      subtitulo: `Valor castigado : ${dataAsesora.value.valo_cast}`,
      click: onReferenciaPersonal,
      icono: 'tabler-user',
    },
    {
      titulo: 'Sorteo aniversario',
      subtitulo: `Opciones`,
      click: null,
      icono: 'tabler-certificate',
    },
    {
      titulo: 'Última reunión',
      subtitulo: `Referida por : ${dataAsesora.value.refe_clie}`,
      click: null,
      icono: 'tabler-calendar-event',
    },
    {
      titulo: 'Club de la felicidad',
      subtitulo: `Líder : ${dataAsesora.value.lide_clie}`,
      click: onClubFelicidad,
      icono: 'tabler-mood-smile-beam',
    },
  ]
  if (dataAsesora.value.clie_gema === 'X') {
    opciones.value.push(
      {
        titulo: 'Consultar gemmas',
        subtitulo: `Nivel gemmas : ${dataAsesora.value.nive_gema}`,
        click: onConsultarGemma,
        icono: 'tabler-question-mark',
      },
    )
  }
  
}

/* 
  ^Metodo onCarteraGeneral 
  ^Obtiene lista de carteras y abre el dialogo
*/

const onCarteraGeneral = async () => {
  try {
    appStore.mensaje('Obteniendo información')
    appStore.loading(true)
    limpiaDataGlobalDialog()

    const response = await $api(`/api/sami/v1/consulta/general/cartera-general`, {
      method: "GET",
      query: {
        'cons_terc': dataAsesora.value.cons_terc,
      },
    })

    const data = response.data.data_glob
    if (data.length > 0) {
      headersGlobal.value =  [
        {
          title: '',
          key: 'acciones',
          sortable: false,
        },
        {
          title: 'Campaña',
          key: 'codi_camp',
        },
        {
          title: 'Documento',
          key: 'nomb_docu',
        },
        {
          title: 'Número',
          key: 'nume_docu',
        },
        {
          title: 'Fecha documento',
          key: 'fech_docu',
        },
        {
          title: 'Fecha cierre',
          key: 'fech_cier',
        },
        {
          title: 'Valor documento',
          key: 'valo_docu',
          align: 'end',
        },
        {
          title: 'Nro cuota',
          key: 'nume_cuot',
          align: 'end',
        },
        {
          title: 'Saldo 21di',
          key: 'sald_21di',
          align: 'end',
        },
        {
          title: 'Saldo 31di',
          key: 'sald_31di', 
          align: 'end',
        },
        {
          title: 'Saldo 45di',
          key: 'sald_45di',
          align: 'end',
        },
        {
          title: 'Saldo 90di',
          key: 'sald_90di',
          align: 'end',
        },
        {
          title: 'Saldo 120di',
          key: 'sald_120di',
          align: 'end',
        },
        {
          title: 'Saldo actual',
          key: 'sald_actu',
          align: 'end',
        },
      ]
      itemsGlobal.value = data
      dialogGlobalTitulo.value ="Cartera general"
      dialogGlobalProcesar.value = onSeleccionarCarteraGeneral
      dialogGlobalVisible.value = true
    }
  } catch (e) {
  }
  finally {
    appStore.loading(false)
  }
}

/* 
  ^Metodo onSeleccionarCarteraGeneral 
  ^Obtiene detalle de la cartera y abre el dialogo
*/

const onSeleccionarCarteraGeneral = async cartera => {
  try {
    appStore.mensaje('Obteniendo información')
    appStore.loading(true)

    const response = await $api(`/api/sami/v1/consulta/general/cartera-detalle`, {
      method: "GET",
      query: {
        'cons_terc': dataAsesora.value.cons_terc,
        'nume_docu': cartera.nume_docu,
        'ctrl_indi': cartera.nume_cuot,
      },
    })

    const data = response.data.data_glob
    if (data.length > 0) {
      headersDetalle.value =   [
        {
          title: 'Campaña',
          key: 'codi_camp',
        },
        {
          title: 'Nro ingreso',
          key: 'nume_ingr',
        },
        {
          title: 'Concepto',
          key: 'codi_conc',
        },
        {
          title: 'Documento',
          key: 'desc_docu',
        },
        {
          title: 'Numero',
          key: 'nume_docu',
        },
        {
          title: 'Nro cuota',
          key: 'indi_inte',
        },
        {
          title: 'Valor ingreso',
          key: 'valo_ingr',
        },
        {
          title: 'Fecha',
          key: 'fech_apli',
        },
        {
          title: 'Estado',
          key: 'acti_ingr',
        },
      ]
      itemsDetalle.value = data
      dialogDetalleTitulo.value ="Detalle de ingreso aplicado"
      dialogDetalleProcesar.value = ''
      dialogDetalleVisible.value = true
    }
  } catch (e) {
  }
  finally {
    appStore.loading(false)
  }
}

/* 
  ^Metodo onFacturaGeneral 
  ^Obtiene lista de facturas generales y abre el dialogo
*/

const onFacturaGeneral = async () => {
  try {
    appStore.mensaje('Obteniendo información')
    appStore.loading(true)
    limpiaDataGlobalDialog()

    const response = await $api(`/api/sami/v1/consulta/general/factura-general`, {
      method: "GET",
      query: {
        'cons_terc': dataAsesora.value.cons_terc,
      },
    })

    const data = response.data.data_glob
    if (data.length > 0) {
      headersGlobal.value =  [
        {
          title: '',
          key: 'acciones',
          sortable: false,
        },
        {
          title: 'Numero',
          key: 'nume_fact',
        },
        {
          title: 'Tipo documento',
          key: 'tipo_docu',
        },
        {
          title: 'Factura electrónica',
          key: 'fact_srii',
        },
        {
          title: 'Campaña',
          key: 'codi_camp',
        },
        {
          title: 'Fec. ingreso',
          key: 'fech_ingr',
        },
        {
          title: 'Fecha',
          key: 'fech_docu',
        },
        {
          title: 'Nro pedido',
          key: 'nume_iden',
        },
        {
          title: 'Total',
          key: 'tota_fact',
        },
        {
          title: 'Neto',
          key: 'tota_neto',
        },
        {
          title: 'Orden',
          key: 'tota_orde',
        },
        {
          title: 'Flete',
          key: 'tota_flet',
        },
        {
          title: 'Igv',
          key: 'tota_ivaa',
        },
        {
          title: 'Público',
          key: 'tota_publ',
        },
        {
          title: 'Ptos descontados',
          key: 'punt_desc',
        },
        {
          title: 'Estado',
          key: 'esta_pedi',
        },
        {
          title: 'Pedidos',
          key: 'nume_pedi',
        },
        {
          title: 'Embalaje',
          key: 'esta_emba',
        },
        {
          title: 'F. embalaje',
          key: 'fech_emba',
        },
        {
          title: 'F. recibido',
          key: 'fech_reci',
        },
        {
          title: 'Empaque',
          key: 'fech_empa',
        },
        {
          title: 'Fec. envio',
          key: 'fech_envi',
        },
        {
          title: 'Est. envio',
          key: 'esta_envi',
        },
        {
          title: 'Usuario',
          key: 'acti_usua',
        },
        {
          title: 'Cant. cajas',
          key: 'cant_caja',
        },
      ]
      itemsGlobal.value = data
      dialogGlobalTitulo.value ="Facturas generales"
      dialogGlobalProcesar.value = onSeleccionarFacturaGeneral
      dialogGlobalVisible.value = true
    }
  } catch (e) {
  }
  finally {
    appStore.loading(false)
  }
}

/* 
  ^Metodo onSeleccionarFacturaGeneral 
  ^Obtiene detalle de la factura y abre el dialogo
*/

const onSeleccionarFacturaGeneral = async factura => {
  try {
    appStore.mensaje('Obteniendo información')
    appStore.loading(true)

    const response = await $api( `/api/sami/v1/consulta/general/factura-detalle`, {
      method: "GET",
      query: {
        'cons_terc': dataAsesora.value.cons_terc,
        'nume_docu': factura.nume_fact,
      },
    })

    const data = response.data.data_glob
    if (data.length > 0) {
      headersDetalle.value =  [
        {
          title: 'Codi. prod.',
          key: 'codi_prod',
        },
        {
          title: 'Codi. vent.',
          key: 'codi_vent',
        },
        {
          title: 'Descripción',
          key: 'nomb_prod',
        },
        {
          title: 'Linea',
          key: 'nomb_line',
        },
        {
          title: 'Unid.',
          key: 'nomb_unid',
        },
        {
          title: 'Cant. pedi.',
          key: 'camt_pedi',
        },
        {
          title: 'Cant. desp.',
          key: 'cant_desp',
        },
        {
          title: 'Cant. eval.',
          key: 'cant_eval',
        },
        {
          title: 'Cant. emba.',
          key: 'cant_emba',
        },
        {
          title: 'Cant. devo.',
          key: 'cant_devo',
        },
        {
          title: 'Valor cata.',
          key: 'valo_cata',
        },
        {
          title: 'Igv',
          key: 'valo_ivaa',
        },
        {
          title: 'Indi.',
          key: 'indi_ofer',
        },
        {
          title: '% Desc.',
          key: 'porc_desc',
        },
        {
          title: 'Prec. neto',
          key: 'prec_neto',
        },
        {
          title: 'Neto + Igv',
          key: 'prec_tota',
        },
        {
          title: 'Catálogo',
          key: 'tota_cata',
        },
        {
          title: 'Ganancia',
          key: 'tota_gana',
        },
        {
          title: 'Esta. emba.',
          key: 'esta_emba',
        },
        {
          title: 'Puntos',
          key: 'tota_punt',
        },
        {
          title: 'Pagina',
          key: 'nume_pagi',
        },
        {
          title: 'Desc. conc.',
          key: 'desc_conc',
        },
      ]
      itemsDetalle.value = data
      dialogDetalleTitulo.value = `Detalle documento - ${factura.nume_fact}`
      dialogDetalleProcesar.value = ''
      dialogDetalleVisible.value = true
    }
  } catch (e) {
  }
  finally {
    appStore.loading(false)
  }
}

/* 
  ^Metodo onPaqueteLider 
  ^Obtiene lista de paquete de lider y abre el dialogo
*/

const onPaqueteLider = async () => {
  try {
    appStore.mensaje('Obteniendo información')
    appStore.loading(true)
    limpiaDataGlobalDialog()

    const response = await $api(`/api/sami/v1/consulta/general/paquete-lider`, {
      method: "GET",
      query: {
        'cons_terc': dataAsesora.value.cons_terc,
      },
    }) 

    const data = response.data.data_glob
    if (data.length > 0) {
      dataPaqueteLider.value = response.data
      paqueteLiderVisible.value = true
    }
  } catch (e) {
  }
  finally {
    appStore.loading(false)
  }
}

/* 
  ^Metodo onPremioEnviado 
  ^Obtiene lista de premios enviados y abre el dialogo
*/

const onPremioEnviado = async () => {
  try {
    appStore.mensaje('Obteniendo información')
    appStore.loading(true)
    limpiaDataGlobalDialog()

    const response = await $api(`/api/sami/v1/consulta/general/premio-enviado`, {
      method: "GET",
      query: {
        'cons_terc': dataAsesora.value.cons_terc,
      },
    })

    const data = response.data.data_glob
    if (data.length >0){
      headersGlobal.value = [
        {
          title: 'Camp. gene.',
          key: 'codi_camp',
        },
        {
          title: 'Camp. envi.',
          key: 'camp_envi',
        },
        {
          title: 'Producto',
          key: 'codi_prod',
        },
        {
          title: 'Descripción',
          key: 'nomb_prod',
        },
        {
          title: 'Cantidad',
          key: 'cant_prem',
        },
        {
          title: 'Tipo documento',
          key: 'tipo_docu',
        },
        {
          title: 'Nro documento',
          key: 'nume_docu',
        },
      ]
      itemsGlobal.value = data
      dialogGlobalTitulo.value = 'Movimiento general de premios enviado'
      dialogGlobalProcesar.value = ''
      dialogGlobalVisible.value = true
    }
  } catch (e) {
  }
  finally {
    appStore.loading(false)
  }
}

/* 
  ^Metodo onIngresoGeneral 
  ^Obtiene lista de ingresos generales y abre el dialogo
*/

const onIngresoGeneral = async () => {
  try {
    appStore.mensaje('Obteniendo información')
    appStore.loading(true)
    limpiaDataGlobalDialog()

    const response = await $api(`/api/sami/v1/consulta/general/ingreso-general`, {
      method: "GET",
      query: {
        'cons_terc': dataAsesora.value.cons_terc,
      },
    })

    const data = response.data.data_glob
    if (data.length > 0) {
      headersGlobal.value = [
        {
          title: '',
          key: 'acciones',
        },
        {
          title: 'Nro comprobante',
          key: 'nume_cons',
        },
        {
          title: 'Campaña',
          key: 'codi_camp',
        },
        {
          title: 'Nro ingreso',
          key: 'nume_ingr',
        },
        {
          title: 'Concepto',
          key: 'codi_conc',
        },
        {
          title: 'Fecha ingreso',
          key: 'fech_ingr',
        },
        {
          title: 'Fecha grabada',
          key: 'fech_grab',
        },
        {
          title: 'Banco',
          key: 'nomtab_b',
        },
        {
          title: 'Valor ingresado',
          key: 'valo_ingr',
        },
        {
          title: 'Saldo ingreso',
          key: 'sald_ingr',
        },
        {
          title: 'Estado',
          key: 'acti_ingr',
        },
      ]
      itemsGlobal.value = data
      dialogGlobalTitulo.value = 'Ingresos'
      dialogGlobalProcesar.value = onSeleccionarIngresoGeneral
      dialogGlobalVisible.value = true
    }
  } catch (e) {
  }
  finally {
    appStore.loading(false)
  }
}

/* 
  ^Metodo onSeleccionarIngresoGeneral 
  ^Obtiene detalle del ingreso y abre el dialogo
*/

const onSeleccionarIngresoGeneral = async ingreso => {
  try {
    appStore.mensaje('Obteniendo información')
    appStore.loading(true)

    const response = await $api(`/api/sami/v1/consulta/general/ingreso-detalle`, {
      method: "get",
      query: {
        'cons_terc': dataAsesora.value.cons_terc,
        'nume_ingr': ingreso.nume_ingr,
      },
    })

    const data = response.data.data_glob
    if (data.length > 0) {
      headersDetalle.value =  [
        {
          title: 'Documento',
          key: 'tipo_docu',
        },
        {
          title: 'Nro documento',
          key: 'nume_docu',
        },
        {
          title: 'Valor ingreso',
          key: 'valo_ingr',
        },
        {
          title: 'Fecha aplicada',
          key: 'fech_apli',
        },
        {
          title: 'Fecha grabada',
          key: 'fech_grab',
        },
      ]
      itemsDetalle.value = data
      dialogDetalleTitulo.value = ' Detalle ingreso'
      dialogDetalleProcesar.value = ''
      dialogDetalleVisible.value = true
    }
  } catch (e) {
  }
  finally {
    appStore.loading(false)
  }
}

/* 
  ^Metodo onServicioGeneral 
  ^Obtiene lista de movimientos de servicios generales y abre el dialogo
*/

const onServicioGeneral = async () => {
  try {
    appStore.mensaje('Obteniendo información')
    appStore.loading(true)
    limpiaDataGlobalDialog()

    const response = await $api(`/api/sami/v1/consulta/general/servicio-general`, {
      method: "GET",
      query: {
        'cons_terc': dataAsesora.value.cons_terc,
      },
    })

    const data = response.data.data_glob
    if (data.length > 0) {
      headersGlobal.value = [
        {
          title: '',
          key: 'acciones',
        },
        {
          title: 'Fecha movimiento',
          key: 'fech_movi',
        },
        {
          title: 'Nro documento',
          key: 'nume_docu',
        },
        {
          title: 'Nro servicio',
          key: 'nume_serv',
        },
        {
          title: 'Camp. fact.',
          key: 'codi_camp',
        },
        {
          title: 'Camp. recl.',
          key: 'codi_cams',
        },
        {
          title: 'Tipo',
          key: 'tipo_serv',
        },
        {
          title: 'Indi.',
          key: 'proc_indi',
        },
        {
          title: 'Factura',
          key: 'nume_fact',
        },
        {
          title: 'Producto',
          key: 'codi_prod',
        },
        {
          title: 'Descripción',
          key: 'nomb_prod',
        },
        {
          title: 'Salida',
          key: 'codi_sali',
        },
        {
          title: 'Cantidad',
          key: 'cant_movi',
        },
        {
          title: 'Ofer.',
          key: 'indi_ofer',
        },
        {
          title: 'Nro nota',
          key: 'nume_nota',
        },
        {
          title: 'Conc.',
          key: 'codi_conc',
        },
        {
          title: 'Sub conc.',
          key: 'codi_subc',
        },
        {
          title: 'Usuario',
          key: 'acti_usua',
        },
        {
          title: 'Observación',
          key: 'obse_item',
        },
      ]
      itemsGlobal.value = data
      dialogGlobalProcesar.value = onSeleccionarServicioGeneral
      dialogGlobalTitulo.value = 'Movimiento de servicios'
      dialogGlobalVisible.value = true
    }
  } catch (e) {
  }
  finally {
    appStore.loading(false)
  }
}

/* 
  ^Metodo onSeleccionarServicioGeneral 
  ^Obtiene detalle del movimiento de servicio  y abre el dialogo del detalle de ingreso general
*/

const onSeleccionarServicioGeneral = async servicio => {
  try {
    appStore.mensaje('Obteniendo información')
    appStore.loading(true)

    const response = await $api(`/api/sami/v1/consulta/general/servicio-detalle`, {
      method: "GET",
      query: {
        'cons_terc': dataAsesora.value.cons_terc,
        'codi_prod': servicio.codi_sali,
      },
    })

    const data = response.data.data_glob
    if (data.length === 0) {
      dataServicioDetalle.value = []
    } else {
      dataServicioDetalle.value = data
      servicioDetalleVisible.value = true
    }
  } catch (e) {
  }
  finally {
    appStore.loading(false)
  }
}

/* 
  ^Metodo onPremioReferido
  ^Obtiene lista de premios referidos y abre el dialogo
*/

const onPremioReferido = async () => {
  try {
    appStore.mensaje('Obteniendo información')
    appStore.loading(true)
    limpiaDataGlobalDialog()

    const response = await $api(`/api/sami/v1/consulta/general/premio-referido`, {
      method: "GET",
      query: {
        'cons_terc': dataAsesora.value.cons_terc,
      },
    })

    const data = response.data.data_glob
    if (data.length > 0) {
      headersGlobal.value = [
        {
          title: 'Código',
          key: 'codi_terc',
        },
        {
          title: 'Nombre(s)',
          key: 'nomb_terc',
        },
        {
          title: 'Apellido(s)',
          key: 'apel_terc',
        },
        {
          title: 'Campaña',
          key: 'camp_cdgo',
        },
        {
          title: 'Premio 1',
          key: 'opci_prem',
        },
        {
          title: 'Premio 2',
          key: 'opci_pre2',
        },
        {
          title: 'Premio 3',
          key: 'opci_pre3',
        },
        {
          title: 'Premio 4',
          key: 'opci_pre4',
        },
        {
          title: 'Fecha',
          key: 'fech_grab',
        },
        {
          title: 'Pr referido',
          key: 'prem_refe',
        },
        {
          title: 'Rfdo',
          key: 'marc_refe',
        },
        {
          title: 'Reft',
          key: 'marc_cons',
        },
      ]
      itemsGlobal.value = data
      dialogGlobalTitulo.value = 'Premios por referidos'
      dialogGlobalProcesar.value = ''
      dialogGlobalVisible.value = true
    }
  } catch (e) {
  }
  finally {
    appStore.loading(false)
  }
}

/* 
  ^Metodo onPremioVenta
  ^Obtiene lista de premios ventas y abre el dialogo
*/

const onPremioVenta = async () => {
  try {
    appStore.mensaje('Obteniendo información')
    appStore.loading(true)
    limpiaDataGlobalDialog()

    const response = await $api(`/api/sami/v1/consulta/general/premio-venta`, {
      method: "GET",
      query: {
        'cons_terc': dataAsesora.value.cons_terc,
      },
    })

    const data = response.data.data_glob
    if (data.length > 0) {
      headersGlobal.value = [
        {
          title: 'Concurso',
          key: 'codi_conc',
        },
        {
          title: 'Campaña',
          key: 'codi_camp',
        },
        {
          title: 'Zona',
          key: 'codi_vend',
        },
        {
          title: 'Vta pública',
          key: 'vnta_publ',
        },
        {
          title: 'Devolución',
          key: 'tota_devo',
        },
        {
          title: 'Vta. neta',
          key: 'vnta_neta',
        },
        {
          title: 'Premio 1',
          key: 'prim_prem',
        },
        {
          title: 'Premio 2',
          key: 'segu_prem',
        },
        {
          title: 'Marca',
          key: 'marc_gana',
        },
      ]
      itemsGlobal.value = data
      dialogGlobalTitulo.value = 'Premios por ventas'
      dialogGlobalProcesar.value = ''
      dialogGlobalVisible.value = true
      dataPremioVenta.value = []
    }
  } catch (e) {
  }
  finally {
    appStore.loading(false)
  }
}

/* 
  ^Metodo onIngresoGeneral 
  ^Obtiene lista de ingresos generales y abre el dialogo
*/

const onReclamoGeneral = async () => {
  try {
    appStore.mensaje('Obteniendo información')
    appStore.loading(true)
    limpiaDataGlobalDialog()

    const response = await $api(`/api/sami/v1/consulta/general/reclamo-premio-general`, {
      method: "GET",
      query: {
        'cons_terc': dataAsesora.value.cons_terc,
      },
    })

    const data = response.data.data_glob
    if (data.length > 0) {
      headersGlobal.value = [
        {
          title: '',
          key: 'acciones',
        },
        {
          title: 'Campaña',
          key: 'camp_proc',
        },
        {
          title: 'Nro boleta',
          key: 'nume_bole',
        },
        {
          title: 'Nro interno',
          key: 'nume_serv',
        },
        {
          title: 'Fecha movimiento',
          key: 'fech_proc',
        },
        {
          title: 'Observación general',
          key: 'obse_recl',
        },
        {
          title: 'Usuario',
          key: 'acti_usua',
        },
      ]
      itemsGlobal.value = data
      dialogGlobalTitulo.value = 'Reclamos por premios'
      dialogGlobalProcesar.value = onSeleccionarReclamoGeneral
      dialogGlobalVisible.value = true
    }
  } catch (e) {
  }
  finally {
    appStore.loading(false)
  }
}

/* 
  ^Metodo onSeleccionarIngresoGeneral 
  ^Obtiene detalle del ingreso y abre el dialogo
*/

const onSeleccionarReclamoGeneral = async reclamo => {
  try {
    appStore.mensaje('Obteniendo información')
    appStore.loading(true)

    const response = await $api(`/api/sami/v1/consulta/general/reclamo-premio-detalle`, {
      method: "get",
      query: {
        'cons_terc': dataAsesora.value.cons_terc,
        'nume_bole': reclamo.nume_bole,
      },
    })

    const data = response.data.data_glob
    if (data.length > 0) {
      headersDetalle.value = [
        {
          title: 'Nro. boleta',
          key: 'nume_bole',
        },
        {
          title: 'Producto',
          key: 'codi_prod',
        },
        {
          title: 'Descripción',
          key: 'nomb_prod',
        },
        {
          title: 'Cantidad',
          key: 'cant_movi',
        },
        {
          title: 'Campaña',
          key: 'camp_cdgo',
        },
        {
          title: 'Indi.',
          key: 'indi_recl',
        },
      ]
      itemsDetalle.value = data
      dialogDetalleTitulo.value = 'Detalle factura'
      dialogDetalleProcesar.value = ''
      dialogDetalleVisible.value = true
    }
  } catch (e) {
  }
  finally {
    appStore.loading(false)
  }
}

/* 
  ^Metodo onPremioEnviar
  ^Obtiene lista de premios pendientes por enviar y abre el dialogo
*/

const onPremioEnviar = async () => {
  try {
    appStore.mensaje('Obteniendo información')
    appStore.loading(true)
    limpiaDataGlobalDialog()

    const response = await $api( `/api/sami/v1/consulta/general/premio-pendiente-envio`, {
      method: "get",
      query: {
        'cons_terc': dataAsesora.value.cons_terc,
      },
    })

    const data = response.data.data_gana
    if (data.length === 0) {
      dataPremioEnviar.value = []
      tituloDialog.value = []
    } else {
      tituloDialog.value = ['Premios pendiente para facturar', 'Premios pendiente por enviar']
      dataPremioEnviar.value = response.data.data
      premioEnviarVisible.value = true
    }
  } catch (e) {
  }
  finally {
    appStore.loading(false)
  }
}

/* 
  ^Metodo onRecodificacion
  ^Obtiene lista de recodificaciones y abre el dialogo
*/

const onRecodificacion = async () => {
  try {
    appStore.mensaje('Obteniendo información')
    appStore.loading(true)
    limpiaDataGlobalDialog()

    const response = await $api(`/api/sami/v1/consulta/general/recodificacion`, {
      method: "get",
      query: {
        'cons_terc': dataAsesora.value.cons_terc,
      },
    })

    const data = response.data.data_glob
    if (data.length > 0) {
      headersGlobal.value = [
        {
          title: 'Código ant.',
          key: 'codi_ante',
        },
        {
          title: 'Campaña',
          key: 'codi_camp',
        },
        {
          title: 'Usuario',
          key: 'acti_usua',
        },
        {
          title: 'Hora',
          key: 'acti_hora',
        },
      ]
      itemsGlobal.value = data
      dialogGlobalTitulo.value = 'Recodificación'
      dialogGlobalProcesar.value = ''
      dialogGlobalVisible.value = true
    } 
  } catch (e) {
  }
  finally {
    appStore.loading(false)
  }
}

/* 
  ^Metodo onSancion
  ^Obtiene lista de sanciones y abre el dialogo
*/

const onSancion = async () => {
  try {
    appStore.mensaje('Obteniendo información')
    appStore.loading(true)
    limpiaDataGlobalDialog()

    const response = await $api(`/api/sami/v1/consulta/general/sancion`, {
      method: "get",
      query: {
        'cons_terc': dataAsesora.value.cons_terc,
      },
    })

    
    headersGlobal.value = [
      {
        title: 'Campaña',
        key: 'codi_camp',
      },
      {
        title: 'Código',
        key: 'codi_sanc',
      },
      {
        title: 'Descripción',
        key: 'nomb_sanc',
      },
      {
        title: 'Usuario',
        key: 'acti_usua',
      },
      {
        title: 'Fecha',
        key: 'acti_hora',
      },
      {
        title: 'Observación',
        key: 'obse_sanc',
      },
    ]

    headersGlobalDetalle.value = [
      {
        title: 'Campaña',
        key: 'codi_camp',
      },
      {
        title: 'Código',
        key: 'codi_sanc',
      },
      {
        title: 'Descripción',
        key: 'nomb_sanc',
      },
      {
        title: 'Usuario',
        key: 'acti_usua',
      },
      {
        title: 'Fecha',
        key: 'acti_hora',
      },
      {
        title: 'Observación',
        key: 'obse_sanc',
      },
    ]
    
    itemsGlobal.value = response.data.data_glob
    itemsGlobalDetalle.value = response.data.data_hist

    dialogGlobalTitulo.value = 'Sanciones'
    dialogGlobalDetalleTitulo.value = 'Sancion(es) histórica(s)'
    dialogGlobalProcesar.value = ''
    dialogGlobalVisible.value = true
    
  } catch (e) {
    console.log(e)
  }
  finally {
    appStore.loading(false)
  }
}

/* 
  ^Metodo onCarteraDocumentoGeneral 
  ^Obtiene lista de carteras por documento y abre el dialogo
*/

const onCarteraDocumentoGeneral = async () => {
  try {
    appStore.mensaje('Obteniendo información')
    appStore.loading(true)
    limpiaDataGlobalDialog()

    const response = await $api(`/api/sami/v1/consulta/general/cartera-documento-general`, {
      method: "GET",
      query: {
        'cons_terc': dataAsesora.value.cons_terc,
      },
    })

    const data = response.data.data_glob
    if (data.length > 0) {
      headersGlobal.value = [
        {
          title: '',
          key: 'acciones',
          sortable: false,
        },
        {
          title: 'Campaña',
          key: 'codi_camp',
        },
        {
          title: 'Tipo',
          key: 'codi_docu',
        },
        {
          title: 'Documento',
          key: 'desc_docu',
        },
        {
          title: 'Número',
          key: 'nume_docu',
        },
        {
          title: 'Fecha documento',
          key: 'fech_docu',
        },
        {
          title: 'Nro cuota',
          key: 'indi_inte',
        },
        {
          title: 'Fech. cierre 01',
          key: 'fech_ve21',
        },
        {
          title: 'Fech. cierre 02',
          key: 'fech_ve31',
        },
        {
          title: 'Fech. cierre 03',
          key: 'fech_ve45',
        },
        {
          title: 'Valor docu.',
          key: 'valo_docu',
        },
        {
          title: 'Saldo docu.',
          key: 'sald_docu',
        },
        {
          title: 'Estado',
          key: 'esta_docu',
        },
      ]
      itemsGlobal.value = data
      dialogGlobalTitulo.value = 'Cartera detallada por documento'
      dialogGlobalProcesar.value = onSeleccionarCarteraDocumentoGeneral
      dialogGlobalVisible.value = true
    } 
  } catch (e) {
  }
  finally {
    appStore.loading(false)
  }
}

/* 
  ^Metodo onSeleccionarCarteraDocumentoGeneral 
  ^Obtiene detalle de la cartera por documento y abre el dialogo
*/

const onSeleccionarCarteraDocumentoGeneral = async cartera => {
  try {
    appStore.mensaje('Obteniendo información')
    appStore.loading(true)

    const response = await $api( `/api/sami/v1/consulta/general/cartera-documento-detalle`, {
      method: "GET",
      query: {
        'cons_terc': dataAsesora.value.cons_terc,
        'nume_docu': cartera.nume_docu,
        'ctrl_indi': cartera.indi_inte,
      },
    })

    const data = response.data.data_glob
    if (data.length > 0) {
      headersDetalle.value = [
        {
          title: 'Campaña',
          key: 'codi_camp',
        },
        {
          title: 'Nro ingreso',
          key: 'nume_ingr',
        },
        {
          title: 'Concepto',
          key: 'codi_conc',
        },
        {
          title: 'Documento',
          key: 'desc_docu',
        },
        {
          title: 'Numero',
          key: 'nume_docu',
        },
        {
          title: 'Nro cuota',
          key: 'indi_inte',
        },
        {
          title: 'Valor ingreso',
          key: 'valo_ingr',
        },
        {
          title: 'Fecha',
          key: 'fech_apli',
        },
        {
          title: 'Estado',
          key: 'acti_ingr',
        },
      ]
      itemsDetalle.value = data
      dialogDetalleProcesar.value = ''
      dialogDetalleTitulo.value = 'Detalle de ingreso aplicado'
      dialogDetalleVisible.value = true
    }
  } catch (e) {
  }
  finally {
    appStore.loading(false)
  }
}

/* 
  ^Metodo onRecibo 
  ^Obtiene lista de recibos y abre el dialogo
*/

const onRecibo = async () => {
  try {
    appStore.mensaje('Obteniendo información')
    appStore.loading(true)
    limpiaDataGlobalDialog()

    const response = await $api( `/api/sami/v1/consulta/general/recibo`, {
      method: "GET",
      query: {
        'cons_terc': dataAsesora.value.cons_terc,
      },
    })

    const data = response.data.data_glob
    if (data.length > 0) {
      headersGlobal.value = [
        {
          title: 'Consignación',
          key: 'nume_cons',
        },
        {
          title: 'Campaña',
          key: 'codi_camp',
        },
        {
          title: 'Nro ingreso',
          key: 'nume_ingr',
        },
        {
          title: 'Concepto',
          key: 'codi_conc',
        },
        {
          title: 'Fech. ingr.',
          key: 'fech_ingr',
        },
        {
          title: 'Fech. grabado',
          key: 'fech_grab',
        },
        {
          title: 'Banco',
          key: 'nomb_banc',
        },
        {
          title: 'Valor ingr.',
          key: 'valo_ingr',
        },
        {
          title: 'Saldo',
          key: 'sald_ingr',
        },
        {
          title: 'Estado',
          key: 'acti_ingr',
        },
      ]
      itemsGlobal.value = data
      dialogGlobalProcesar.value = ''
      dialogGlobalTitulo.value = 'Recibos'
      dialogGlobalVisible.value = true
    }
  } catch (e) {
  }
  finally {
    appStore.loading(false)
  }
}

/* 
  ^Metodo onNotaCredito 
  ^Obtiene lista de notas de creditos y abre el dialogo
*/

const onNotaCredito = async () => {
  try {
    appStore.mensaje('Obteniendo información')
    appStore.loading(true)
    limpiaDataGlobalDialog()

    const response = await $api(`/api/sami/v1/consulta/general/nota-credito`, {
      method: "GET",
      query: {
        'cons_terc': dataAsesora.value.cons_terc,
      },
    })

    const data = response.data.data_glob
    if (data.length > 0) {
      headersGlobal.value = [
        {
          title: 'Campaña',
          key: 'codi_camp',
        },
        {
          title: 'Documento',
          key: 'tipo_docu',
        },
        {
          title: 'Nota',
          key: 'nume_nota',
        },
        {
          title: 'Fecha grab.',
          key: 'fech_grab',
        },
        {
          title: 'Fecha nota.',
          key: 'fech_nota',
        },
        {
          title: 'Concepto',
          key: 'nomb_conc',
        },
        {
          title: 'Observación',
          key: 'obse_nota',
        },
        {
          title: 'Valor nota',
          key: 'valo_nota',
        },
        {
          title: 'Saldo nota',
          key: 'sald_nota',
        },
        {
          title: 'Estado',
          key: 'acti_nota',
        },
      ]
      itemsGlobal.value = data
      dialogGlobalProcesar.value = ''
      dialogGlobalTitulo.value = 'Notas de creditos'
      dialogGlobalVisible.value = true
    }
  } catch (e) {
  }
  finally {
    appStore.loading(false)
  }
}

/* 
  ^Metodo onEstadoCuenta 
  ^Obtiene lista de estado de cuenta y abre el dialogo
*/

const onEstadoCuenta = async () => {
  try {
    appStore.mensaje('Obteniendo información')
    appStore.loading(true)
    limpiaDataGlobalDialog()

    const response = await $api(`/api/sami/v1/consulta/general/estado-cuenta`, {
      method: "GET",
      query: {
        'cons_terc': dataAsesora.value.cons_terc,
      },
    })

    const data = response.data.data_glob
    if (data.length > 0) {
      headersGlobal.value = [
        [
          {
            title: 'Tipo',
            key: 'tipo_docu',
          },
          {
            title: 'Documento',
            key: 'nume_docu',
          },
          {
            title: 'Fecha emisión',
            key: 'fech_docu',
          },
          {
            title: 'Fecha vencimiento',
            key: 'fech_ve21',
          },
          {
            title: 'Campaña',
            key: 'codi_camp',
          },
          {
            title: 'Nro cuota',
            key: 'indi_inte',
          },
          {
            title: 'Valor documento',
            key: 'valo_docu',
          },
          {
            title: 'Valor aplicado',
            key: 'valo_apli',
          },
          {
            title: 'Saldo documento',
            key: 'sald_docu',
          },
        ],
      ]
      headersGlobalDetalle.value = [
        {
          title: 'Tipo',
          key: 'tipo_docu',
        },
        {
          title: 'Documento',
          key: 'nume_nota',
        },
        {
          title: 'Fecha emisión',
          key: 'fech_nota',
        },
        {
          title: 'Campaña',
          key: 'codi_camp',
        },
        {
          title: 'Valor documento',
          key: 'valo_nota',
        },
        {
          title: 'Valor aplicado',
          key: 'valo_apli',
        },
        {
          title: 'Saldo documento',
          key: 'sald_nota',
        },
      ]
      itemsGlobal.value = response.data.data_glob
      itemsGlobalDetalle.value = response.data.data_deta
      dialogGlobalTitulo.value = 'Estado de cuenta'
      dialogGlobalProcesar.value = ''
      dialogGlobalVisible.value = true
    }
  } catch (e) {
    console.log(e)
  }
  finally {
    appStore.loading(false)
  }
}

/* 
  ^Metodo onMovimientoReferido 
  ^Obtiene lista de movimiento de referido y abre el dialogo
*/

const onMovimientoReferido = async () => {
  try {
    appStore.mensaje('Obteniendo información')
    appStore.loading(true)
    limpiaDataGlobalDialog()

    const response = await $api(`/api/sami/v1/consulta/general/movimiento-referido`, {
      method: "GET",
      query: {
        'cons_terc': dataAsesora.value.cons_terc,
      },
    })

    const data = response.data.data_glob
    if (data.length === 0) {
      dataMovimientoReferido.value = []
    } else {
      dataMovimientoReferido.value = response.data.data
      movimientoReferidoVisible.value = true
    }
  } catch (e) {
  }
  finally {
    appStore.loading(false)
  }
}

/* 
  ^Metodo onReferenciaPersonal 
  ^Obtiene lista de referencia personales y abre el dialogo
*/

const onReferenciaPersonal = async () => {
  try {
    appStore.mensaje('Obteniendo información')
    appStore.loading(true)
    limpiaDataGlobalDialog()

    const response = await $api(`/api/sami/v1/consulta/general/referencia-personal`, {
      method: "GET",
      query: {
        'cons_terc': dataAsesora.value.cons_terc,
      },
    })

    const data = response.data.data_glob
    if (data.length > 0) {
      headersGlobal.value = [
        {
          title: 'Tipo',
          key: 'tipo_refe',
        },
        {
          title: 'Nombre(s)',
          key: 'nomb_refe',
        },
        {
          title: 'Direción',
          key: 'dire_refe',
        },
        {
          title: 'Teléfono',
          key: 'tele_refe',
        },
        {
          title: 'Parentesco',
          key: 'nomb_pare',
        },
        {
          title: 'Provincia',
          key: 'nomb_ciud',
        },
      ]
      itemsGlobal.value = data
      dialogGlobalTitulo.value = 'Referencias personales'
      dialogGlobalProcesar.value = ''
      dialogGlobalVisible.value = true
    }
  } catch (e) {
  }
  finally {
    appStore.loading(false)
  }
}

/* 
  ^Metodo onClubFelicidad 
  ^Obtiene lista de club de la felicidad y abre el dialogo
*/

const onClubFelicidad = async () => {
  try {
    appStore.mensaje('Obteniendo información')
    appStore.loading(true)
    limpiaDataGlobalDialog()

    const response = await $api(`/api/sami/v1/consulta/general/club-felicidad`, {
      method: "GET",
      query: {
        'cons_terc': dataAsesora.value.cons_terc,
      },
    })

    const data = response.data.data_acti
    if (data.length > 0) {
      headersGlobal.value = [
        {
          title: 'Concepto',
          key: 'nomb_conc',
        },
        {
          title: 'Puntos',
          key: 'cant_conc',
        },
      ]

      headersGlobalDetalle.value = [
        {
          title: 'Concepto',
          key: 'nomb_conc',
        },
        {
          title: 'Puntos',
          key: 'cant_conc',
        },
      ]
      
      itemsGlobal.value = response.data.data_acti
      itemsGlobalDetalle.value = response.data.data_acti_hist
      dialogGlobalTitulo.value= 'Club de la felicidad'
      dialogGlobalProcesar.value = ''
      dialogGlobalGlobalTitulo.value =  `Constelación de estrellas - ${response.data.camp_actu}`
      dialogGlobalDetalleTitulo.value =  `Constelación de estrellas - ${response.data.camp_hist}`
      dialogGlobalVisible.value = true
      
    }
  } catch (e) {
  }
  finally {
    appStore.loading(false)
  }
}

/* 
  ^Metodo onConsultarGemma 
  ^Obtiene lista de gemmas y abre el dialogo
*/

const onConsultarGemma = async () => {
  try {
    appStore.mensaje('Obteniendo información')
    appStore.loading(true)
    limpiaDataGlobalDialog()

    const response = await $api( `/api/sami/v1/consulta/general/gemma`, {
      method: "GET",
      query: {
        'cons_terc': dataAsesora.value.cons_terc,
      },
    })

    const data = response.data.data_glob
    if (data.length === 0) {
      dataConsultaGemma.value = []
    } else {
      dataConsultaGemma.value = response.data.data_glob
      consultaGemmaVisible.value = true
    }
  } catch (e) {
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
        <GenerarBoton @procesar="onGenerar" />
        <LimpiarBoton @procesar="onLimpiar" />
      </template>
      <template #contenido>
        <VRow class="match-height">
          <VCol cols="12">
            <VCard title="Buscar asesora">
              <VCardText>
                <VRow>
                  <VCol
                    cols="12"
                    md="4"
                  >
                    <AppTextField
                      v-model="formulario.documento"
                      label="Documento de identidad"
                      type="text"
                      placeholder="Ingresar documento"
                      autocomplete="off"
                      :error="errorDocumentoIdentidad"
                      :error-messages="errorMensajeDocumentoIdentidad"
                      @keyup.enter="onGenerar"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="4"
                  >
                    <AppTextField
                      v-model="formulario.nombre"
                      label="Nombre(s)"
                      type="text"
                      placeholder="Ingresar nombre"
                      autocomplete="off"
                      :error="errorNombre"
                      :error-messages="errorMensajeNombre"
                      @keyup.enter="onGenerar"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="4"
                  >
                    <AppTextField
                      v-model="formulario.apellido"
                      label="Apellido(s)"
                      type="text"
                      placeholder="Ingresar apellido"
                      autocomplete="off"
                      :error="errorApellido"
                      :error-messages="errorMensajeApellido"
                      @keyup.enter="onGenerar"
                    />
                  </VCol>
                </VRow>
              </VCardText>
            </VCard>
          </VCol>
          <VCol
            v-if="segmentacion!=''"
            cols="12"
          >
            <div class="d-flex w-100">
              <div class="d-flex align-center">
                <VAvatar
                  color="warning"
                  variant="tonal"
                  size="42"
                  class="me-3"
                >
                  <VIcon
                    size="24"
                    icon="tabler-info-triangle"
                  />
                </VAvatar>
              </div>
              <div class="d-flex w-100">
                <div>
                  <h4 class="text-h4 text-wrap">
                    {{ segmentacion }}
                  </h4>
                </div>
              </div>
            </div>
          </VCol>
          <VCol
            v-for="(item, index) in opciones"
            :key="index"
            cols="12"
            md="6"
            lg="4"
          >
            <VCard>
              <VCardText>
                <VRow> 
                  <VCol>
                    <div class="d-flex w-100">
                      <div class="d-flex align-center">
                        <VAvatar
                          color="primary"
                          variant="tonal"
                          size="42"
                          class="me-3"
                        >
                          <VIcon
                            size="24"
                            :icon="item.icono"
                          />
                        </VAvatar>
                      </div>
                      <div class="d-flex w-100">
                        <div class="d-flex flex-column me-auto w-100">
                          <div>
                            <span class="text-sm mb-auto">
                              {{ item.subtitulo }}
                            </span>
                          </div>
                          <div>
                            <h5 class="text-h5 text-wrap">
                              {{ item.titulo }}
                            </h5>
                          </div>
                          <VBtn
                            v-if="item.click != null"
                            class="d-md-none mt-2"
                            color="secondary"
                            block
                            @click="item.click"
                          >
                            <VIcon
                              start
                              icon="tabler-code-plus"
                            />
                            Ver
                          </VBtn>
                        </div>
                        <div class="d-flex align-center">
                          <VBtn
                            v-if="item.click != null"
                            class="ms-3 d-none d-md-flex"
                            color="secondary"
                            @click="item.click"
                          >
                            <VIcon
                              start
                              icon="tabler-code-plus"
                            />
                            Ver
                          </VBtn>
                        </div>
                      </div>
                    </div>
                  </VCol>
                </VRow>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </template>
    </AppPlantilla>
    <AppTableDialog 
      v-model:isOpen="dialogGlobalVisible"
      v-model:headers="headersGlobal"
      v-model:items="itemsGlobal"
      v-model:headersDetalle="headersGlobalDetalle"
      v-model:itemsDetalle="itemsGlobalDetalle"
      v-model:title="dialogGlobalTitulo"
      v-model:titleGlobal="dialogGlobalGlobalTitulo"
      v-model:titleDetalle="dialogGlobalDetalleTitulo"
      @procesar="dialogGlobalProcesar"
    />
    <AppTableDialog 
      v-model:isOpen="dialogDetalleVisible"
      v-model:headers="headersDetalle"
      v-model:items="itemsDetalle"
      v-model:title="dialogDetalleTitulo"
      @procesar="dialogDetalleProcesar"
    />
    <PaqueteLiderDialog 
      v-model:isOpen="paqueteLiderVisible"
      v-model:data="dataPaqueteLider"
    />
    <ServicioDetalleDialog 
      v-model:isOpen="servicioDetalleVisible"
      v-model:data="dataServicioDetalle"
    />
    <PremioEnviarDialog 
      v-model:isOpen="premioEnviarVisible"
      v-model:titulo="tituloDialog"
      v-model:data="dataPremioEnviar"
    />
    <MovimientoReferidoDialog 
      v-model:isOpen="movimientoReferidoVisible"
      v-model:data="dataMovimientoReferido"
    />
    <ConsultaGemmaDialog 
      v-model:isOpen="consultaGemmaVisible"
      v-model:data="dataConsultaGemma"
    />
  </div>
</template>
