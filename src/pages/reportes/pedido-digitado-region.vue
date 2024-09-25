<!-- eslint-disable camelcase -->
<script setup>
import { useAppStore } from '@/stores/app';
import { EncryptStorage } from 'encrypt-storage';
import { useDisplay } from 'vuetify';
import { VDataTable } from 'vuetify/labs/VDataTable';

definePage({
  meta: {
    action: 'colombia/repo_come_pedi_digi_regi',
    subject: 'colombia/repo_come_pedi_digi_regi',
  },
})

const encryptStorage = new EncryptStorage('AZZORTI-SAMI', {
  storageType: 'localStorage',
})

const { mobile } = useDisplay()
const userData = encryptStorage.getItem('userData')
const appStore = useAppStore()

const formulario = ref({
  campana: null,
  area: null,
})


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
]

const itemsGlobal = ref([])

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
]

const itemsDetalle = ref([])

const headersCorte = [
  {
    title: 'Corte',
    key: 'codi_cort',
  },
  {
    title: 'Región',
    key: 'codi_area',
  },
  {
    title: 'N° Zonas',
    key: 'codi_zona',
  },
  {
    title: 'Objetivo',
    key: 'obje_inco',
  },
  {
    title: 'Facturado',
    key: 'fact_inco',
  },
  {
    title: 'Cump. Fact.',
    key: 'cump_fact_inco',
  },
  {
    title: 'Pend. Fact.',
    key: 'pend_fact_inco',
  },
  {
    title: 'Total',
    key: 'tota_inco',
  },
  {
    title: '% Cump.',
    key: 'cump_inco',
  },
  {
    title: 'Objetivo',
    key: 'obje_rete',
  },
  {
    title: 'Facturado',
    key: 'fact_rete',
  },
  {
    title: 'Cump. Fact.',
    key: 'cump_fact_rete',
  },
  {
    title: 'Pend. Fact.',
    key: 'pend_fact_rete',
  },
  {
    title: 'Total',
    key: 'tota_rete',
  },
  {
    title: '% Cump.',
    key: 'cump_rete',
  },
  {
    title: '% Acti.',
    key: 'acti_rete',
  },
  {
    title: 'Objetivo',
    key: 'obje_tota',
  },
  {
    title: 'Facturado',
    key: 'fact_tota',
  },
  {
    title: 'Cump. Fact.',
    key: 'cump_fact_tota',
  },
  {
    title: 'Pend. Fact.',
    key: 'pend_fact_tota',
  },
  {
    title: 'Total',
    key: 'tota_tota',
  },
  {
    title: '% Cump.',
    key: 'cump_tota',
  },
  {
    title: 'Capi.',
    key: 'fact_capi',
  },
  {
    title: 'Facturación',
    key: 'valo_docu',
  },
  {
    title: 'Saldo 21di',
    key: 'sald_21di',
  },
  {
    title: '% Cobr. 21di',
    key: 'porc_21di',
  },
  {
    title: 'Saldo Actu.',
    key: 'sald_docu',
  },
  {
    title: '% Actu.',
    key: 'porc_docu',
  },
]

const itemsCorte = ref([])

const headersZona = [
  {
    title: 'Corte',
    key: 'codi_cort',
  },
  {
    title: 'Región',
    key: 'codi_area',
  },
  {
    title: 'Zona',
    key: 'codi_zona',
  },
  {
    title: 'Gerente Zonal',
    key: 'nomb_vend',
  },
  {
    title: 'Objetivo',
    key: 'obje_inco',
  },
  {
    title: 'Facturado',
    key: 'fact_inco',
  },
  {
    title: 'Cump. Fact.',
    key: 'cump_fact_inco',
  },
  {
    title: 'Pend. Fact.',
    key: 'pend_fact_inco',
  },
  {
    title: 'Total',
    key: 'tota_inco',
  },
  {
    title: '% Cump.',
    key: 'cump_inco',
  },
  {
    title: 'Objetivo',
    key: 'obje_rete',
  },
  {
    title: 'Facturado',
    key: 'fact_rete',
  },
  {
    title: 'Cump. Fact.',
    key: 'cump_fact_rete',
  },
  {
    title: 'Pend. Fact.',
    key: 'pend_fact_rete',
  },
  {
    title: 'Total',
    key: 'tota_rete',
  },
  {
    title: '% Cump.',
    key: 'cump_rete',
  },
  {
    title: '% Obje. Acti.',
    key: 'obje_acti',
  },
  {
    title: '% Acti.',
    key: 'acti_rete',
  },
  {
    title: 'Objetivo',
    key: 'obje_tota',
  },
  {
    title: 'Facturado',
    key: 'fact_tota',
  },
  {
    title: 'Cump. Fact.',
    key: 'cump_fact_tota',
  },
  {
    title: 'Pend. Fact.',
    key: 'pend_fact_tota',
  },
  {
    title: 'Total',
    key: 'tota_tota',
  },
  {
    title: '% Cump.',
    key: 'cump_tota',
  },
  {
    title: 'Capi.',
    key: 'fact_capi',
  },
  {
    title: 'Vta. Linea',
    key: 'vent_line',
  },
  {
    title: 'Faltante',
    key: 'vent_falt',
  },
  {
    title: 'Vta. Rece.',
    key: 'vent_rece',
  },
  {
    title: '% Falt.',
    key: 'porc_falt',
  },
  {
    title: 'Facturado',
    key: 'pppp_fact',
  },
  {
    title: 'Recepcionado',
    key: 'pppp_rece',
  },

  {
    title: 'Facturación',
    key: 'valo_docu',
  },
  {
    title: 'Saldo 21di',
    key: 'sald_21di',
  },
  {
    title: '% Cobr. 21di',
    key: 'porc_21di',
  },
  {
    title: 'Saldo Actu.',
    key: 'sald_docu',
  },
  {
    title: '% Actu.',
    key: 'porc_docu',
  },
  {
    title: 'Reingresos',
    key: 'tota_rein',
  },
  {
    title: 'Egresos',
    key: 'tota_egre',
  },
  {
    title: 'Act. Final',
    key: 'acti_fina',
  },
  {
    title: 'P Rreingreso',
    key: 'posi_rein',
  },
  {
    title: 'Peg21',
    key: 'posi_eg21',
  },

  {
    title: 'Peg42',
    key: 'posi_eg42',
  },

  {
    title: 'Peg63',
    key: 'posi_eg63',
  },

  {
    title: 'Ret. Peg21',
    key: 'rete_eg21',
  },
  {
    title: 'Ret. Peg42',
    key: 'rete_eg42',
  },

  {
    title: 'Ret. Peg63',
    key: 'rete_eg63',
  },
]

const itemsZona = ref([])

const headersSubDetalle = ref([])
const itemsSubDetalle = ref([])
const campanaOptions = ref([])
const errorCampana = ref(false)
const errorMensajeCampana = ref('')

const areaOptions = ref([])
const errorArea = ref(false)
const errorMensajeArea = ref('')
const modalDetalle = ref(false)
const conceptoTitulo = ref('')
const conceptoCodigo = ref(0)
const conceptoCantidad = ref(0)

onMounted(async () => {
  appStore.titulo(`Reportes / Pedido digitado región`)
  initConfiguracion()
  await obtenerCampana()
  await obtenerRegion()
})

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
      nomb_conc: 'Retención',
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
      nomb_conc: 'Cobranza 21 días',
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
      fact_conc: `COP. 0.00`,
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
      cons_fila: '0',
      nomb_conc: 'Pedidos pendientes de retención consecutivas',
      cant_conc: '0',
      porc_conc: '',
    },
    {
      cons_fila: '0',
      nomb_conc: 'Pedidos pendientes de retención consecutivas 2do pedido',
      cant_conc: '0',
      porc_conc: '',
    },
    {
      cons_fila: '0',
      nomb_conc: 'Pedidos pendientes de retención consecutivas 3er pedido',
      cant_conc: '0',
      porc_conc: '',
    },
    {
      cons_fila: '0',
      nomb_conc: 'Pedidos pendientes de retención consecutivas 4to pedido',
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
      cons_fila: '0',
      nomb_conc: 'Pedidos pendientes de retención reingresos',
      cant_conc: '0',
      porc_conc: '',
    },
    {
      cons_fila: '1',
      nomb_conc: 'Pedidos pendientes de retención',
      cant_conc: '0',
      porc_conc: '0.00 %',
    },
    {
      cons_fila: '2',
      nomb_conc: 'Pedidos pendientes de incorporación',
      cant_conc: '0',
      porc_conc: '0.00 %',
    },
    {
      cons_fila: '0',
      nomb_conc: 'Total pedidos pendientes por facturar',
      cant_conc: '0',
      porc_conc: '',
    },
    {
      cons_fila: '4',
      nomb_conc: 'Retenidos de retención',
      cant_conc: '0',
      porc_conc: '',
    },
    {
      cons_fila: '5',
      nomb_conc: 'Retenidos de incorporación',
      cant_conc: '0',
      porc_conc: '',
    },
    {
      cons_fila: '0',
      nomb_conc: 'Total pedidos retenidos',
      cant_conc: '0',
      porc_conc: '',
    },
  ]

  itemsCorte.value = []
  itemsZona.value = []
}

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

const obtenerRegion = async () => {
  try {
    appStore.mensaje('Obteniendo región')
    appStore.loading(true)

    const { data } = await $api(`/api/comun/v1/areas`, {
      method: "get",
      query: {
        codigo: userData.codi_perf,
      },
    })

    const itemArea = data.data_glob
    
    itemArea.forEach(element => 
      areaOptions.value.push({
        id: element.codi_area,
        text: element.codi_area,
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
    appStore.mensaje('Obteniendo información')
    appStore.loading(true)
    limpiarValidacion()

    initConfiguracion()

    const { data } = await $api(`/api/sami/v1/reportes/pedidos-digitados-region`, {
      method: "get",
      query: {
        campana: (formulario.value.campana === null) ? '' : formulario.value.campana,
        region: (formulario.value.area === null) ? '' : formulario.value.area,
      },
    })

    itemsGlobal.value = data.data_glob
    itemsDetalle.value = data.data_deta
    itemsCorte.value = data.data_cort
    itemsZona.value = data.data_zona
    
  } catch (error) {
    const { data } = error.response._data    
    if (typeof data != "undefined") {
      for (var key in data)
      {
        if (key == 'campana') {
          errorCampana.value = true
          errorMensajeCampana.value = data[key]
        }
        if (key == 'region') {
          errorArea.value = true
          errorMensajeArea.value = data[key]
        }
      }
    }
  }
  finally {
    appStore.loading(false)
  }
}

const onLimpiar= async () => {
  formulario.value = {
    campana: null,
    area: null,
  }
  initConfiguracion()
}

const onExcel = async () => {
  try {
    appStore.mensaje('Generando archivo')
    appStore.loading(true);
    console.log(itemsGlobal.value)
    console.log(itemsDetalle.value)
    console.log(itemsCorte.value)
    console.log(itemsZona.value)

    const { data } = await $api(`/api/sami/v1/reportes/pedidos-digitados-region/excel`, {
      method: "post",
      body: {
        data_glob: itemsGlobal.value,
        data_deta: itemsDetalle.value,
        data_cort: itemsCorte.value,
        data_zona: itemsZona.value,
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
  errorCampana.value = false
  errorMensajeCampana.value = ''
  errorArea.value = false
  errorMensajeArea.value = ''
}

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

const initConfiguracionDetalle = () => {
  if (
    conceptoCodigo.value === '1' || conceptoCodigo.value === '2') {
    headersSubDetalle.value = [
      {
        title: 'Código',
        key: 'codi_terc',
        sortable: true,
      },
      {
        title: 'Nro ident.',
        key: 'nume_iden',
        sortable: true,
      },
      {
        title: 'Corte',
        key: 'codi_cort',
        sortable: true,
      },
      {
        title: 'Zona',
        key: 'codi_zona',
        sortable: true,
      },
      {
        title: 'Sector',
        key: 'codi_sect',
        sortable: true,
      },
      {
        title: 'Status',
        key: 'codi_esta',
        sortable: true,
      },
      {
        title: 'Nombre(s) y Apellido(s)',
        key: 'nomb_terc',
        sortable: true,
      },
      {
        title: 'Público',
        key: 'tota_publ',
        sortable: true,
      },
      {
        title: 'Ingresado por',
        key: 'nomb_ingr',
        sortable: true,
      },
      {
        title: 'Ulti. Campaña',
        key: 'codi_camp',
        sortable: true,
      },
      {
        title: 'Observación',
        key: 'obse_pedi',
        sortable: true,
      },
    ]
  } else if (conceptoCodigo.value === '4') {
    headersSubDetalle.value  = [
      {
        title: 'Código',
        key: 'codi_terc',
        sortable: true,
      },
      {
        title: 'Nro ident.',
        key: 'nume_iden',
        sortable: true,
      },
      {
        title: 'Corte',
        key: 'codi_cort',
        sortable: true,
      },
      {
        title: 'Zona',
        key: 'codi_zona',
        sortable: true,
      },
      {
        title: 'Sector',
        key: 'codi_sect',
        sortable: true,
      },
      {
        title: 'Status',
        key: 'codi_esta',
        sortable: true,
      },
      {
        title: 'Nombre(s) y Apellido(s)',
        key: 'nomb_terc',
        sortable: true,
      },
      {
        title: 'Teléfono',
        key: 'tele_terc',
        sortable: true,
      },
      {
        title: 'Público',
        key: 'tota_publ',
        sortable: true,
      },
      {
        title: 'Ingresado por',
        key: 'nomb_ingr',
        sortable: true,
      },
      {
        title: 'Ulti. Campaña',
        key: 'codi_camp',
        sortable: true,
      },
      {
        title: 'Observación',
        key: 'obse_pedi',
        sortable: true,
      },
      {
        title: 'Cart',
        key: 'moti_cart',
        sortable: true,
      },
      {
        title: 'Cupo',
        key: 'moti_cupo',
        sortable: true,
      },
      {
        title: 'Code',
        key: 'moti_code',
        sortable: true,
      },
      {
        title: 'Mini',
        key: 'moti_mini',
        sortable: true,
      },
      {
        title: 'Bloq',
        key: 'moti_bloq',
        sortable: true,
      },
    ]
  } else if (conceptoCodigo.value === '5') {
    headersSubDetalle.value = [
      {
        title: 'Código',
        key: 'codi_terc',
        sortable: true,
      },
      {
        title: 'Nro ident.',
        key: 'nume_iden',
        sortable: true,
      },
      {
        title: 'Corte',
        key: 'codi_cort',
        sortable: true,
      },
      {
        title: 'Zona',
        key: 'codi_zona',
        sortable: true,
      },
      {
        title: 'Sector',
        key: 'codi_sect',
        sortable: true,
      },
      {
        title: 'Status',
        key: 'codi_esta',
        sortable: true,
      },
      {
        title: 'Nombre(s) y Apellido(s)',
        key: 'nomb_terc',
        sortable: true,
      },
      {
        title: 'Público',
        key: 'tota_publ',
        sortable: true,
      },
      {
        title: 'Ingresado por',
        key: 'nomb_ingr',
        sortable: true,
      },
      {
        title: 'Ulti. Campaña',
        key: 'codi_camp',
        sortable: true,
      },
      {
        title: 'Fecha',
        key: 'fech_docu',
        sortable: true,
      },
      {
        title: 'Observación',
        key: 'obse_pedi',
        sortable: true,
      },
      {
        title: 'Cart',
        key: 'moti_cart',
        sortable: true,
      },
      {
        title: 'Cupo',
        key: 'moti_cupo',
        sortable: true,
      },
      {
        title: 'Code',
        key: 'moti_code',
        sortable: true,
      },
      {
        title: 'Mini',
        key: 'moti_mini',
        sortable: true,
      },
      {
        title: 'Bloq',
        key: 'moti_bloq',
        sortable: true,
      },
    ]
  }
}

const onCloseConcepto = () => {
  modalDetalle.value = false
  conceptoTitulo.value = ''
  conceptoCodigo.value = 0
  conceptoCantidad.value = 0
  headersSubDetalle.value = []
  itemsSubDetalle.value = []
}

const onGenerarDetalle = async () => {
  try {
    appStore.mensaje('Obteniendo información')
    appStore.loading(true)

    const { data } = await $api(`/api/sami/v1/reportes/pedidos-digitados-region/detalle`, {
      method: "get",
      query: {
        titulo: conceptoTitulo.value,
        cantidad: conceptoCantidad.value,
      },
    })

    itemsSubDetalle.value = data.dato
    
  } catch (error) {
    console.log(error)
  }
  finally {
    appStore.loading(false)
  }
}

const onExcelConcepto = async () => {
  try {
    appStore.mensaje('Generando archivo')
    appStore.loading(true)

    const { data } = await $api(`/api/sami/v1/reportes/pedidos-digitados-region/excelDetalle`, {
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
                      v-model="formulario.area"
                      :items="areaOptions"
                      label="Región"
                      placeholder="Seleccionar región"
                      item-title="text"
                      item-value="id"
                      :error="errorArea"
                      :error-messages="errorMensajeArea"
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

          <VCol cols="12">
            <VCard title="Detalle corte">
              <VCardText>
                <VDataTable
                  :headers="headersCorte"
                  :items="itemsCorte"
                  :items-per-page="-1"
                  item-key="codi_cort"
                  class="text-no-wrap"
                  
                  fixed-header
                  density="compact"
                  height="400"
                >
                  <template #headers>
                    <tr>
                      <th rowspan="2">
                        CORTE
                      </th>
                      <th rowspan="2">
                        REGIÓN
                      </th>
                      <th rowspan="2">
                        NRO ZONA
                      </th> 
                      <th
                        colspan="6"
                        class="text-center"
                      >
                        INCORPORACION
                      </th>
                      <th 
                        colspan="7" 
                        class="text-center"
                      >
                        RETENCION
                      </th>
                      <th
                        colspan="7"
                        class="text-center"
                      >
                        PEDIDOS TOTALES
                      </th>
                      <th 
                        colspan="5"
                        class="text-center"
                      >
                        COBRANZA
                      </th>
                    </tr>
                    <tr>
                      <th>OBJETIVO</th>
                      <th>FACTURADO</th>
                      <th>CUMP. FACT.</th>
                      <th>PEND. FACT.</th>
                      <th>TOTAL</th>
                      <th>% CUMP.</th>

                      <th>OBJETIVO</th>
                      <th>FACTURADO</th>
                      <th>CUMP. FACT.</th>
                      <th>PEND. FACT.</th>
                      <th>TOTAL</th>
                      <th>% CUMP.</th>
                      <th>% ACTI.</th>

                      <th>OBJETIVO</th>
                      <th>FACTURADO</th>
                      <th>CUMP. FACT.</th>
                      <th>PEND. FACT.</th>
                      <th>'TOTAL</th>
                      <th>% CUMP.</th>
                      <th>CAPI.</th>

                      <th>FACTURACIÓN</th>
                      <th>SALDO 21DI</th>
                      <th>% COBR. 21DI</th>
                      <th>SALDO ACTU.</th>
                      <th>% ACTU.</th>
                    </tr>
                  </template>
                  <template #item.obje_inco="{ item }">
                    <VChip color="warning">
                      {{ item.obje_inco }}
                    </VChip>
                  </template>
                  <template #item.fact_inco="{ item }">
                    <VChip color="warning">
                      {{ item.fact_inco }}
                    </VChip>
                  </template>
                  <template #item.cump_fact_inco="{ item }">
                    <VChip color="warning">
                      {{ item.cump_fact_inco }}
                    </VChip>
                  </template>
                  <template #item.pend_fact_inco="{ item }">
                    <VChip color="warning">
                      {{ item.pend_fact_inco }}
                    </VChip>
                  </template>
                  <template #item.tota_inco="{ item }">
                    <VChip color="warning">
                      {{ item.tota_inco }}
                    </VChip>
                  </template>
                  <template #item.cump_inco="{ item }">
                    <VChip color="warning">
                      {{ item.cump_inco }}
                    </VChip>
                  </template>

                  <template #item.obje_rete="{ item }">
                    <VChip color="success">
                      {{ item.obje_rete }}
                    </VChip>
                  </template>
                  <template #item.fact_rete="{ item }">
                    <VChip color="success">
                      {{ item.fact_rete }}
                    </VChip>
                  </template>
                  <template #item.cump_fact_rete="{ item }">
                    <VChip color="success">
                      {{ item.cump_fact_rete }}
                    </VChip>
                  </template>
                  <template #item.pend_fact_rete="{ item }">
                    <VChip color="success">
                      {{ item.pend_fact_rete }}
                    </VChip>
                  </template>
                  <template #item.tota_rete="{ item }">
                    <VChip color="success">
                      {{ item.tota_rete }}
                    </VChip>
                  </template>
                  <template #item.cump_rete="{ item }">
                    <VChip color="success">
                      {{ item.cump_rete }}
                    </VChip>
                  </template>
                  <template #item.acti_rete="{ item }">
                    <VChip color="success">
                      {{ item.acti_rete }}
                    </VChip>
                  </template>

                  <template #item.obje_tota="{ item }">
                    <VChip color="error">
                      {{ item.obje_tota }}
                    </VChip>
                  </template>
                  <template #item.fact_tota="{ item }">
                    <VChip color="error">
                      {{ item.fact_tota }}
                    </VChip>
                  </template>
                  <template #item.cump_fact_tota="{ item }">
                    <VChip color="error">
                      {{ item.cump_fact_tota }}
                    </VChip>
                  </template>
                  <template #item.pend_fact_tota="{ item }">
                    <VChip color="error">
                      {{ item.pend_fact_tota }}
                    </VChip>
                  </template>
                  <template #item.tota_tota="{ item }">
                    <VChip color="error">
                      {{ item.tota_tota }}
                    </VChip>
                  </template>
                  <template #item.cump_tota="{ item }">
                    <VChip color="error">
                      {{ item.cump_tota }}
                    </VChip>
                  </template>
                  <template #item.fact_capi="{ item }">
                    <VChip color="error">
                      {{ item.fact_capi }}
                    </VChip>
                  </template>              
                  <template #bottom />
                </VDataTable>
              </VCardText>
            </VCard>
          </VCol>

          <VCol cols="12">
            <VCard title="Detalle zona">
              <VCardText>
                <VDataTable
                  :headers="headersZona"
                  :items="itemsZona"
                  :items-per-page="-1"
                  class="text-no-wrap"
                  
                  fixed-header
                  density="compact"
                  height="400"
                >
                  <template #headers>
                    <tr>
                      <th rowspan="2">
                        CORTE
                      </th>
                      <th rowspan="2">
                        REGIÓN
                      </th>
                      <th rowspan="2">
                        ZONA
                      </th>
                      <th rowspan="2">
                        GERENTE ZONA
                      </th>
                      <th
                        colspan="6"
                        class="text-center"
                      >
                        INCORPORACION
                      </th>
                      <th 
                        colspan="8" 
                        class="text-center"
                      >
                        RETENCION
                      </th>
                      <th
                        colspan="7"
                        class="text-center"
                      >
                        PEDIDOS TOTALES
                      </th>
                      <th 
                        colspan="4"
                        class="text-center"
                      >
                        FACTURACIÓN
                      </th>
                      <th 
                        colspan="2"
                        class="text-center"
                      >
                        P.P.P.
                      </th>
                      <th 
                        colspan="5"
                        class="text-center"
                      >
                        COBRANZA
                      </th>
                      <th rowspan="2">
                        REINGRESOS
                      </th>
                      <th rowspan="2">
                        EGRESOS
                      </th>
                      <th rowspan="2">
                        ACT. FINAL
                      </th>
                      <th rowspan="2">
                        P. REINGRESO
                      </th>

                      <th rowspan="2">
                        PEG21
                      </th>
                      <th rowspan="2">
                        PEG42
                      </th>
                      <th rowspan="2">
                        PEG63
                      </th>
                      <th rowspan="2">
                        RET. PEG21
                      </th>
                      <th rowspan="2">
                        RET. PEG42
                      </th>
                      <th rowspan="2">
                        RET. PEG63
                      </th>
                    </tr>
                    <tr>
                      <th>OBJETIVO</th>
                      <th>FACTURADO</th>
                      <th>CUMP. FACT.</th>
                      <th>PEND. FACT.</th>
                      <th>TOTAL</th>
                      <th>% CUMP.</th>
                      <th>OBJETIVO</th>
                      <th>FACTURADO</th>
                      <th>CUMP. FACT.</th>
                      <th>PEND. FACT.</th>
                      <th>TOTAL</th>
                      <th>% CUMP.</th>
                      <th>% OBJE. ACTI.</th>
                      <th>% ACTI.</th>
                      <th>OBJETIVO</th>
                      <th>FACTURADO</th>
                      <th>CUMP. FACT.</th>
                      <th>PEND. FACT.</th>
                      <th>TOTAL</th>
                      <th>% CUMP.</th>
                      <th>CAPI.</th>
                      <th>VTA. LINEA</th>
                      <th>FALTANTE</th>
                      <th>VTA. RECE.</th>
                      <th>% FALT.</th>
                      <th>FACTURADO</th>
                      <th>RECEPCIONADO</th>
                      <th>FACTURACIÓN</th>
                      <th>SALDO 21DI</th>
                      <th>% COBR. 21DI</th>
                      <th>SALDO ACTU.</th>
                      <th>% ACTU.</th>
                    </tr>
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
          <template #bottom />
        </VDataTable>
      </VCard>
    </VDialog>
  </div>
</template>
