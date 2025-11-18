<style >
.swal2-container {
  z-index: 9999 !important;
}
</style>
<!-- eslint-disable camelcase -->
<script setup>
import { useAppStore } from '@/stores/app';
import { EncryptStorage } from 'encrypt-storage';
import Swal from 'sweetalert2';
import { useDisplay } from 'vuetify';
import { VDataTable } from 'vuetify/labs/VDataTable';
import { VBtn } from 'vuetify/lib/components/index.mjs';



definePage({
  meta: {
    action: 'colombia/repo_come_pedi_digi',
    subject: 'colombia/repo_come_pedi_digi',
  },
});


const encryptStorage = new EncryptStorage('AZZORTI-SAMI', {
  storageType: 'localStorage',
});

const { mobile } = useDisplay();
const userData = encryptStorage.getItem('userData');
const appStore = useAppStore();

const formulario = ref({
  campana: null,
  zona: null,
});

const pedi_sele_libe = ref(new Set());
const camp_sele=ref('');
const keyRow = row =>`${row.codi_terc}-${camp_sele.value}-${row.nume_iden ?? ''}`;

/**
 * Agrega o elimina una fila de la seleccion
 * @param {Object} row - Fila de la tabla
 * @param {Boolean} checked - True si se selecciona, false si no
 */
const toggleSeleccion = (row, checked) => {
const k = keyRow(row)
  if (checked) pedi_sele_libe.value.add(k)
  else pedi_sele_libe.value.delete(k)
}

const headersGlobal = [
  {
    key: 'nomb_conc',
    title: 'Concepto',
  },
  { key: 'line_desc', title: '' },
  {
    key: 'obje_conc',
    title: 'Objetivo',
  },
  { key: 'falt_desc', title: '' },
  {
    key: 'fact_conc',
    title: 'Facturado',
  },
  { key: 'rece_desc', title: '' },
  {
    key: 'porc_conc',
    title: 'Porcentaje',
  },
];

const itemsGlobal = ref([]);

const headersDetalle = [
  {
    key: 'cons_fila',
    title: '',
    width: '10px',
  },
  {
    key: 'nomb_conc',
    title: 'Concepto',
  },
  {
    key: 'cant_conc',
    title: 'Cantidad',
    width: '10px',
  },
  {
    key: 'porc_conc',
    title: 'Porcentaje',
    width: '10px',
  },
];

const itemsDetalle = ref([]);

const headersSubDetalle = ref([]);
const itemsSubDetalle = ref([]);
const campanaOptions = ref([]);
const errorCampana = ref(false);
const errorMensajeCampana = ref('');

const zonaOptions = ref([]);
const errorZona = ref(false);
const errorMensajeZona = ref('');
const modalDetalle = ref(false);
const conceptoTitulo = ref('');
const conceptoCodigo = ref(0);
const conceptoCantidad = ref(0);

onMounted(async () => {
  appStore.titulo(`Reportes / Pedido digitado zona`)
  initConfiguracion()
  await obtenerCampana()
  await obtenerZona()
});

/**
 * Inicializa la configuración de la tabla con los conceptos
 * globales y locales para el reporte de pedido digitado por zona.
 * 
 * @returns {void} No devuelve nada.
 */
const initConfiguracion = () => {
  itemsGlobal.value = [
    {
      nomb_conc: 'Incorporación',
      line_desc: '',
      obje_conc: '0',
      falt_desc: '',
      fact_conc: '0',
      rece_desc: '',
      porc_conc: '0.00 %',
    }, 
    {
      nomb_conc: 'Pedidos Totales',
      line_desc: '',
      obje_conc: '0',
      falt_desc: '',
      fact_conc: '0',
      rece_desc: '',
      porc_conc: '0.00 %',
    },
    {
      nomb_conc: 'Venta',
      line_desc: 'Linea',
      obje_conc: `COP. 0.00`,
      falt_desc: 'Faltante',
      fact_conc: `COP. 0.00`,
      rece_desc: 'Recepcionado',
      porc_conc: `COP. 0.00`,
    },
    {
      nomb_conc: 'P.P. Facturado',
      line_desc: '',
      obje_conc: `COP. 0.00`,
      falt_desc: '',
      fact_conc: 'P.P. Recepcionado',
      rece_desc: '',
      porc_conc: `COP. 0.00`,
    },
    {
      nomb_conc: 'Cobranza 31 días',
      line_desc: '',
      obje_conc: `COP. 0.00`,
      falt_desc: '',
      fact_conc: `COP. 0.00`,
      rece_desc: '',
      porc_conc: '0.00 %',
    },
    {
      nomb_conc: 'Cobranza saldo actual',
      line_desc: '',
      obje_conc: `COP. 0.00`,
      falt_desc: '',
      fact_conc: `COP.0.00`,
      rece_desc: '',
      porc_conc: '0.00 %',
    },
    {
      nomb_conc: '% Actividad',
      line_desc: '',
      obje_conc: '0.00 %',
      falt_desc: '',
      fact_conc: 'Capitalización',
      rece_desc: '',
      porc_conc: '0',
    },
  ]

  itemsDetalle.value = [
    {
      cons_fila: '1',
      nomb_conc: 'Ingresados por gerente de zona',
      cant_conc: '0',
      porc_conc: '',
    },
    {
      cons_fila: '2',
      nomb_conc: 'Digitados por asesora (web)',
      cant_conc: '0',
      porc_conc: '',
    },
    {
      cons_fila: '3',
      nomb_conc: 'Ingresados por azzorti',
      cant_conc: '0',
      porc_conc: '',
    },
    {
      cons_fila: '15',
      nomb_conc: 'Ingresados por app movil',
      cant_conc: '0',
      porc_conc: '',
    }, 
    {
      cons_fila: '0',
      nomb_conc: 'Total facturados consecutivas',
      cant_conc: '0',
      porc_conc: '',
    },
    {
      cons_fila: '0',
      nomb_conc: 'Total facturados ciclo de nuevas 2do pedido',
      cant_conc: '0',
      porc_conc: '',
    },
    {
      cons_fila: '0',
      nomb_conc: 'Total facturados ciclo de nuevas 3er pedido',
      cant_conc: '0',
      porc_conc: '',
    },
    {
      cons_fila: '0',
      nomb_conc: 'Total facturados ciclo de nuevas 4to pedido',
      cant_conc: '0',
      porc_conc: '',
    },
    {
      cons_fila: '0',
      nomb_conc: 'Total facturados ret. peg21',
      cant_conc: '0',
      porc_conc: '',
    },
    {
      cons_fila: '0',
      nomb_conc: 'Total facturados ret. peg42',
      cant_conc: '0',
      porc_conc: '',
    },
    {
      cons_fila: '0',
      nomb_conc: 'Total facturados ret. peg63',
      cant_conc: '0',
      porc_conc: '',
    },
    {
      cons_fila: '0',
      nomb_conc: 'Total facturados reingresos',
      cant_conc: '0',
      porc_conc: '',
    },
    {
      cons_fila: '6',
      nomb_conc: 'Pedidos facturados de incorporacion',
      cant_conc: '0',
      porc_conc: '',
    },
    {
      cons_fila: '14',
      nomb_conc: 'Total pedidos facturados',
      cant_conc: '0',
      porc_conc: '',
    },
    {
      cons_fila: '0',
      nomb_conc: 'Total pedidos pendientes por facturar',
      cant_conc: '0',
      porc_conc: '0.00 %',
    },
    {
      cons_fila: '11',
      nomb_conc: 'Total pedidos retenidos',
      cant_conc: '0',
      porc_conc: '',
    },
    {
      cons_fila: '13',
      nomb_conc: 'Total pedidos digitados',
      cant_conc: '0',
      porc_conc: '',
    },
    {
      cons_fila: '0',
      nomb_conc: 'Pedidos pendientes consecutivas',
      cant_conc: '0',
      porc_conc: '',
    },
    {
      cons_fila: '0',
      nomb_conc: 'Pedidos pendientes ciclo de nuevas 2do pedido',
      cant_conc: '0',
      porc_conc: '',
    },
    {
      cons_fila: '0',
      nomb_conc: 'Pedidos pendientes ciclo de nuevas 3er pedido',
      cant_conc: '0',
      porc_conc: '',
    },
    {
      cons_fila: '0',
      nomb_conc: 'Pedidos pendientes ciclo de nuevas 4to pedido',
      cant_conc: '0',
      porc_conc: '',
    },
    {
      cons_fila: '0',
      nomb_conc: 'Pedidos pendientes de retención peg21',
      cant_conc: '0',
      porc_conc: '',
    },
    {
      cons_fila: '0',
      nomb_conc: 'Pedidos pendientes de retención peg42',
      cant_conc: '0',
      porc_conc: '',
    },
    {
      cons_fila: '0',
      nomb_conc: 'Pedidos pendientes de retención peg63',
      cant_conc: '0',
      porc_conc: '',
    },
 
    {
      cons_fila: '7',
      nomb_conc: 'Pedidos pendientes de activas',
      cant_conc: '0',
      porc_conc: '0.00 %',
    },
    {
      cons_fila: '8',
      nomb_conc: 'Pedidos pendientes de incorporación',
      cant_conc: '0',
      porc_conc: '0.00 %',
    },
 
    {
      cons_fila: '11',
      nomb_conc: 'Retenidos de activas',
      cant_conc: '0',
      porc_conc: '',
    },
    {
      cons_fila: '12',
      nomb_conc: 'Retenidos de incorporación',
      cant_conc: '0',
      porc_conc: '',
    },

    {
      cons_fila: '0',
      nomb_conc: 'Información adicional',
      cant_conc: '',
      porc_conc: '',
    },
    {
      cons_fila: '9',
      nomb_conc: 'Pedidos pendientes por grabar web asesora',
      cant_conc: '0',
      porc_conc: '',
    },
    {
      cons_fila: '10',
      nomb_conc: 'Incorporaciones rechazadas campaña',
      cant_conc: '0',
      porc_conc: '',
    },
  ]
};

/**
 * Obtiene la lista de campañas futuras desde la API.
 * 
 * @returns {Promise<void>} Promesa que se resuelve cuando se completa la petición.
 */
const obtenerCampana = async () => {
  try {
    appStore.mensaje('Obteniendo campaña')
    appStore.loading(true)

    const { data } = await $api(`/api/comun/v1/campanas/futuras`, {
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

/**
 * Obtiene la lista de zonas desde la API.
 * 
 * @returns {Promise<void>} Promesa que se resuelve cuando se completa la petición.
 */
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

/**
 * Genera un informe de seguimiento de cierre de zona
 * 
 * @returns {Promise<void>} Promesa que se resuelve cuando se completa la petición.
 */
const onGenerar = async () => {
  try {
    appStore.mensaje('Obteniendo información')
    appStore.loading(true)
    limpiarValidacion()

    initConfiguracion()
    camp_sele.value=formulario.value.campana;
    const { data } = await $api(`/api/sami/v1/reportes/pedidos-digitados`, {
      method: "get",
      query: {
        campana: (formulario.value.campana === null) ? '' : formulario.value.campana,
        zona: (formulario.value.zona === null) ? '' : formulario.value.zona,
      },
    })

    itemsGlobal.value = data.data_glob
    itemsDetalle.value = data.data_deta
    
  } catch (error) {
    if(typeof error.response != "undefined") {
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
   
  }
  finally {
    appStore.loading(false)
  }
}

/**
 * Limpia el formulario y configura los valores por defecto.
 * 
 * @returns {Promise<void>} Promesa que se resuelve cuando se 
 * completa la petición.
 */
const onLimpiar= async () => {
  formulario.value = {
    campana: null,
    zona: null,
  }
  initConfiguracion()
}

/**
 * Genera un archivo Excel con la información de seguimiento
 * de cierre de zona.
 * 
 * @returns {Promise<void>} Promesa que se resuelve cuando se
 * completa la petición.
 */
const onExcel = async () => {
  try {
    appStore.mensaje('Generando archivo')
    appStore.loading(true)

    const { data } = await $api(`/api/sami/v1/reportes/pedidos-digitados/excel`, {
      method: "post",
      body: {
        data_glob: itemsGlobal.value,
        data_deta: itemsDetalle.value,
      },
    })
    
    window.open(`${$base}/temporales/${data}`, '_blank')
  } catch (e) {
  }
  finally {
    appStore.loading(false)
  }
}

/**
 * Limpia los errores de la validación.
 * 
 * @returns {void} No devuelve nada.
 */
const limpiarValidacion = () => {
  errorCampana.value = false
  errorMensajeCampana.value = ''
  errorZona.value = false
  errorMensajeZona.value = ''
}

/**
 * Obtiene el detalle de un concepto.
 * 
 * @param {Object} item - Objeto que contiene la información del concepto.
 * @returns {Promise<void>} Promesa que se resuelve cuando se completa la petición.
 */
const onSeleccionar = async item => {
  const cantConc = parseInt(item.cant_conc)
  const nombConc = item.nomb_conc
  if (cantConc === 0) {
    appStore.mensajeSnackbar(`No tiene información para el concepto ${nombConc}`)
    appStore.color("error")
    appStore.snackbar(true)
  } else {
    conceptoTitulo.value = nombConc
    conceptoCodigo.value = item.cons_fila
    conceptoCantidad.value = cantConc

    initConfiguracionDetalle()
    await onGenerarDetalle()
    modalDetalle.value = true
  }
}

/**
 * Configura los headers de la tabla de detalle según el concepto seleccionado.
 * 
 * @returns {void} No devuelve nada.
 */
const initConfiguracionDetalle = () => {
  console.log('conceptoCodigo.value', conceptoCodigo.value)
  if (
    conceptoCodigo.value === '1'
        || conceptoCodigo.value === '2'
        || conceptoCodigo.value === '3'
        || conceptoCodigo.value === '4'
        || conceptoCodigo.value === '5'
        || conceptoCodigo.value === '6'
        || conceptoCodigo.value === '14'
        || conceptoCodigo.value === '15'
  ) {
    headersSubDetalle.value = [
      {
        title: 'Código',
        key: 'codi_terc',
      },
      {
        title: 'Documento ident.',
        key: 'nume_iden',
      },
      {
        title: 'Sector',
        key: 'codi_sect',
      },
      {
        title: 'Status',
        key: 'codi_esta',
      },
      {
        title: 'Nombre(s) y apellido(s)',
        key: 'nomb_terc',
      },
      {
        title: 'Público',
        key: 'tota_publ',
      },
      {
        title: 'Ingresado por',
        key: 'nomb_ingr',
      },
      {
        title: 'Ulti. Campaña',
        key: 'codi_camp',
      },
      {
        title: 'Fecha',
        key: 'fech_docu',
      },
    ]
  }
  if (conceptoCodigo.value === '13') {
    headersSubDetalle.value  = [
      {
        title: 'Código',
        key: 'codi_terc',
      },
      {
        title: 'Documento ident.',
        key: 'nume_iden',
      },
      {
        title: 'Sector',
        key: 'codi_sect',
      },
      {
        title: 'Status',
        key: 'codi_esta',
      },
      {
        title: 'Nombre(s) y apellido(s)',
        key: 'nomb_terc',
      },
      {
        title: 'Público',
        key: 'tota_publ',
      },
      {
        title: 'Ingresado por',
        key: 'nomb_ingr',
      },
      {
        title: 'Ulti. Campaña',
        key: 'codi_camp',
      },
      {
        title: 'Fecha',
        key: 'fech_docu',
      },
  
      {
        title: 'Nivel',
        key: 'nive_gemm',
      },
      {
        title: 'Observación',
        key: 'obse_pedi',
      },
    ]
  }
  if (conceptoCodigo.value === '7' || conceptoCodigo.value === '8') {
    headersSubDetalle.value  = [
      {
        title: 'Código',
        key: 'codi_terc',
      },
      {
        title: 'Documento ident.',
        key: 'nume_iden',
      },
      {
        title: 'Sector',
        key: 'codi_sect',
      },
      {
        title: 'Status',
        key: 'codi_esta',
      },
      {
        title: 'Nombre(s) y apellido(s)',
        key: 'nomb_terc',
      },
      {
        title: 'Público',
        key: 'tota_publ',
      },
      {
        title: 'Ingresado por',
        key: 'nomb_ingr',
      },
      {
        title: 'Ulti. Campaña',
        key: 'codi_camp',
      },
      {
        title: 'Observación',
        key: 'obse_pedi',
      },
    ]
  }
  if (conceptoCodigo.value === '11' || conceptoCodigo.value === '12') {
    headersSubDetalle.value  = [
      {
        title: 'Código',
        key: 'codi_terc',
      },
      {
        title: 'Documento ident.',
        key: 'nume_iden',
      },
      {
        title: 'Sector',
        key: 'codi_sect',
      },
      {
        title: 'Status',
        key: 'codi_esta',
      },
      {
        title: 'Nombre(s) y apellido(s)',
        key: 'nomb_terc',
      },
      {
        title: 'Teléfono',
        key: 'tele_terc',
      },
      {
        title: 'Saldo',
        key: 'sald_docu',
      },
      {
        title: 'Público',
        key: 'tota_publ',
      },
      {
        title: 'Crédito',
        key: 'tota_cred',
      },
      {
        title: 'Exc. Cred.',
        key: 'cred_exce',
      },
      {
        title: 'Ingresado por',
        key: 'nomb_ingr',
      },
      {
        title: 'Ulti. Campaña',
        key: 'codi_camp',
      },
      {
        title: 'Observación',
        key: 'obse_pedi',
      },
      {
        title: 'Cart',
        key: 'moti_cart',
      },
      {
        title: 'Cupo',
        key: 'moti_cupo',
      },
      {
        title: 'Code',
        key: 'moti_code',
      },
      {
        title: 'Mont Mini',
        key: 'moti_mini',
      },
      {
        title: 'Rete X Prod',
        key: 'rete_prod',
      },
      {
        title: 'Bloq',
        key: 'moti_bloq',
      },
      {
        title: 'Mont Min Publico',
        key: 'moti_minp',
      },
      {
        title: 'Aprobar Min',
        key: 'libe_pedi',
      },
    ]
  }
  if (conceptoCodigo.value === '9') {
    headersSubDetalle.value = [
      {
        title: 'Código',
        key: 'codi_terc',
      },
      {
        title: 'Documento ident.',
        key: 'nume_iden',
      },
      {
        title: 'Sector',
        key: 'codi_sect',
      },
      {
        title: 'Status',
        key: 'codi_esta',
      },
      {
        title: 'Nombre(s) y apellido(s)',
        key: 'nomb_terc',
      },
      {
        title: 'Ingresado por',
        key: 'nomb_ingr',
      },
      {
        title: 'Ulti Campaña',
        key: 'codi_camp',
      },
    ]
  }
  if (conceptoCodigo.value === '10') {
    headersSubDetalle.value  = [
      {
        title: 'Documento ident.',
        key: 'nume_iden',
      },
      {
        title: 'Asesora',
        key: 'nomb_terc',
      },
      {
        title: 'Código',
        key: 'codi_rech',
      },
      {
        title: 'Nombre',
        key: 'nomb_rech',
      },
      {
        title: 'Observación',
        key: 'obse_gene',
      },
    ]
  }
}

/**
 * Cierra el modal de detalle de un concepto y reinicia los valores
 * de los campos conceptoTitulo, conceptoCodigo, conceptoCantidad, headersSubDetalle e itemsSubDetalle.
 */
const onCloseConcepto = () => {
  modalDetalle.value = false
  conceptoTitulo.value = ''
  conceptoCodigo.value = 0
  conceptoCantidad.value = 0
  headersSubDetalle.value = []
  itemsSubDetalle.value = []
}

/**
 * Obtiene la lista de detalles de un concepto digitado y
 * lo asigna a itemsSubDetalle.
 * 
 * @param {string} conceptoTitulo - Título del concepto digitado.
 * @param {string} campana - Código de la campaña.
 * @param {number} cantidad - Cantidad a filtrar.
 */
const onGenerarDetalle = async () => {
  try {
    appStore.mensaje('Obteniendo información')
    appStore.loading(true)

    const { data } = await $api(`/api/sami/v1/reportes/pedidos-digitados/detalle`, {
      method: "get",
      query: {
        titulo: conceptoTitulo.value,
        campana: (formulario.value.campana === null) ? '' : formulario.value.campana,
        cantidad: conceptoCantidad.value,
      },
    });
    console.log('data.dato', data.dato)
    itemsSubDetalle.value = data.dato
    
  } catch (error) {
    console.log(error)
  }
  finally {
    appStore.loading(false)
  }
}

/**
 * Genera un archivo Excel con la información de seguimiento
 * de cierre de zona.
 * 
 * @returns {Promise<void>} Promesa que se resuelve cuando se
 * completa la petición.
 */
const onExcelConcepto = async () => {
  try {
    appStore.mensaje('Generando archivo')
    appStore.loading(true)

    const { data } = await $api(`/api/sami/v1/reportes/pedidos-digitados/excelDetalle`, {
      method: "post",
      body: {
        cabecera: headersSubDetalle.value,
        detalle: itemsSubDetalle.value,
      },
    })
    
    window.open(`${$base}/temporales/${data}`, '_blank')
  } catch (e) {
  }
  finally {
    appStore.loading(false)
  }
}

/**liberar pedidos */


/**
 * Función que permite liberar los pedidos seleccionados
 * 
 * @returns {Promise<void>} Promesa que se resuelve cuando 
 * se completa la liberación de los pedidos
 */
const gene_conf_libe_pedi = async () => {
    if (pedi_sele_libe.value.size === 0) {
      appStore.mensajeSnackbar('No ha seleccionado ningún pedido para liberar')
      appStore.color("error")
      appStore.snackbar(true)
      return
    }
    let html_conf_libe_pedi ="<div class='row'>";
    html_conf_libe_pedi+="  <div class='col text-center'>";
    html_conf_libe_pedi+="    Atencion.<br> Esta a punto de liberar <strong>"+pedi_sele_libe.value.size+" </strong> Pedido(s). ";
    html_conf_libe_pedi+="    <br>";
    html_conf_libe_pedi+="    <strong>¿Desea continuar?</strong>";
    html_conf_libe_pedi+="  </div>";
    html_conf_libe_pedi+="</div>";

    Swal.fire({
      title: 'Liberacion de pedidos',
      html: html_conf_libe_pedi,
      icon: 'warning',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: 'Liberar '+pedi_sele_libe.value.size+' pedido(s)',
      cancelButtonText: 'Cancelar Liberacion',
      customClass: {
        confirmButton: 'v-btn bg-primary mr-1',
        cancelButton: 'v-btn bg-error ml-1',
      },
    }).then(result => {
      if (result.isConfirmed) {
        onLiberarPedido()
      }
      
      if (result.isDismissed || result.isDenied) {
        console.log('Cancelado')
        pedi_sele_libe.value = new Set()
        return
      }
    });
};


/**
 * Función que permite liberar los pedidos seleccionados
 * 
 * @returns {Promise<void>} Promesa que se resuelve el
 * envio de la liberación de los pedidos al servidor
 */
const onLiberarPedido = async () => {
  try {
    console.log('Liberar pedidos')


    appStore.mensaje('Liberando pedidos')
    appStore.loading(true)

    const listaPedidos = Array.from(pedi_sele_libe.value)

    await $api(`/api/sami/v1/reportes/pedidos-digitados/liberarPedido`, {
      method: "post",
      body: {
        pedi_lide: listaPedidos,
        usuario: userData.codi_perf,
      },
    })

    appStore.mensajeSnackbar('Pedidos liberados con éxito')
    appStore.color("success")
    appStore.snackbar(true)
    pedi_sele_libe.value = new Set()
    await onGenerarDetalle()
    await onGenerar()
  } catch (e) {
    if(e.response !== undefined) {
      const { data } = e.response._data    
      if (typeof data != "undefined" && data.message) {
        appStore.mensajeSnackbar(data.message)
        appStore.color("error")
        appStore.snackbar(true)
      }
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
        <GenerarBoton @procesar="onGenerar" />
        <ExcelBoton @procesar="onExcel" />
        <LimpiarBoton @procesar="onLimpiar" />
      </template>
      <template #contenido>
        <VRow>
          <VCol cols="12">
            <VCard title="Buscar pedidos">
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
            <VCard>
              <VCardText>
                <VDataTable
                  :headers="headersGlobal"
                  :items="itemsGlobal"
                  :items-per-page="-1"
                  class="text-no-wrap"
                  
                  fixed-header
                  density="compact"
                >
                  <template #bottom />
                </VDataTable>
              </VCardText>
            </VCard>
          </VCol>

          <VCol cols="12">
            <VCard>
              <VCardText>
                <VDataTable
                  :headers="headersDetalle"
                  :items="itemsDetalle"
                  :items-per-page="-1"
                  class="text-no-wrap"
                  
                  fixed-header
                  density="compact"
                  height="400"
                >
                  <template #item.cons_fila="{ item }">
                    <IconBtn 
                      v-if="item.cons_fila !== '0'"
                      @click="onSeleccionar(item)"
                    >
                      <VIcon icon="tabler-search" />
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
      :max-width="(mobile) ? undefined : 1100"
      persistent
      :model-value="modalDetalle"
    >
      <VCard color="background">
        <VToolbar color="secondary">
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
            {{ conceptoTitulo }}
          </VToolbarTitle>
          <VSpacer />
          <VToolbarItems>
            <VMenu transition="slide-y-transition">
              <template #activator="{ props }">
                <VBtn
                  color="default"
                  :icon="mobile"
                  v-if="conceptoTitulo === 'Total pedidos retenidos'"
                >
                  <VIcon
                    v-if="mobile"
                    size="x-large"
                    icon="tabler-dots-vertical"
                  />
                  <span @click="gene_conf_libe_pedi()"  >Liberar Pedidos</span>
                </VBtn>
                <VBtn
                  color="default"
                  v-bind="props"
                  :icon="mobile"
                >
                  <VIcon
                    v-if="mobile"
                    size="x-large"
                    icon="tabler-dots-vertical"
                  />
                  <span v-if="!mobile">ACCIONES</span>
                </VBtn>
              </template>
              <VList>
                <VListItem
                  link
                  @click="onExcelConcepto"
                >
                  <template #prepend>
                    <VIcon
                      size="20"
                      icon="tabler-file-export"
                      class="enter-icon text-disabled"
                    />
                  </template>
                  <VListItemTitle>
                    Exportar
                  </VListItemTitle>
                </VListItem>
              </VList>
            </VMenu>
            <VBtn
              v-if="!mobile"
              icon
              @click="onCloseConcepto"
            >
              <VIcon icon="tabler-x" />
            </VBtn>
          </VToolbarItems>
        </VToolbar>
        <VDataTable
          :headers="headersSubDetalle"
          :items="itemsSubDetalle"
          :items-per-page="-1"
          class="text-no-wrap"
          no-data-text="Sin información para mostrar"
          fixed-header
          :height="(!mobile)? (itemsSubDetalle.length > 15) ? 400 : null: null"
        > 
        <template #item.libe_pedi="{ item }" v-if="conceptoTitulo === 'Total pedidos retenidos'">
          <div class="d-flex justify-center align-center">
            <VCheckbox
              :model-value="pedi_sele_libe.has(keyRow(item.raw ?? item))"
              @update:model-value="val => toggleSeleccion(item.raw ?? item, val)"
              density="compact"
              hide-details
              v-if="item.libe_pedi === 'X'"
            />
          </div>
        </template>
          <template #bottom />
        </VDataTable>
      </VCard>
    </VDialog>
  </div>
</template>
