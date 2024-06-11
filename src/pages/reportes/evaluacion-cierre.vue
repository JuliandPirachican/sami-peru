<!-- eslint-disable camelcase -->
<script setup>
import { useAppStore } from '@/stores/app';
import JqxGrid from "jqwidgets-scripts/jqwidgets-vue3/vue_jqxgrid.vue";
import { useDisplay } from 'vuetify';
import { VDataTable } from 'vuetify/labs/VDataTable';

definePage({
  meta: {
    action: 'colombia/repo_come_eval_cier',
    subject: 'colombia/repo_come_eval_cier',
  },
})

const { mobile } = useDisplay()
const appStore = useAppStore()

const formulario = ref({
  campana: null,
  zona: null,
})

const refGridGlobal = ref()

const general = ref({
  lima: '0',
  objetivoIncorporacion: '0',
  facturadoIncorporacion: '0',
  cumplimientoIncorporacion: '0.00',
  objetivoRetencion: '0',
  facturadoRetencion: '0',
  cumplimientoRetencion: '0.00',
})

const cabeceraGlobal = [
  {
    title: 'Zona',
    key: 'codi_zona',
  },
  {
    title: 'Sector',
    key: 'codi_sect',
  },
  {
    title: 'Lider',
    key: 'nomb_lide',
  },
  {
    title: 'Act. inic.',
    key: 'acti_inic',
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
    title: 'Cump. fact.',
    key: 'cump_fact_tota',
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
    title: 'Cump. fact.',
    key: 'cump_fact_inco',
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
    title: 'Cump. fact.',
    key: 'cump_fact_rete',
  },
  {
    title: 'Camp. ante.',
    key: 'porc_acti_ante',
  },
  {
    title: 'Objetivo',
    key: 'obje_acti',
  },
  {
    title: 'Facturado',
    key: 'porc_acti',
  },
  {
    title: 'Rete. camp. ant.',
    key: 'fact_rete_cons_ante',
  },
  {
    title: 'Objetivo',
    key: 'obje_rete_cons',
  },
  {
    title: 'Facturado',
    key: 'fact_rete_cons',
  },
  {
    title: 'Cump. fact.',
    key: 'cump_fact_rete_cons',
  },
  {
    title: '1 Camp. ante.',
    key: 'obje_rete_cons_segu',
  },
  {
    title: 'Facturado',
    key: 'fact_rete_cons_segu',
  },
  {
    title: 'Cump. fact.',
    key: 'cump_fact_rete_cons_segu',
  },
  {
    title: '2 Camp. ante.',
    key: 'obje_rete_cons_terc',
  },
  {
    title: 'Facturado',
    key: 'fact_rete_cons_terc',
  },
  {
    title: 'Cump. fact.',
    key: 'cump_fact_rete_cons_terc',
  },
  {
    title: '3 Camp. ante.',
    key: 'obje_rete_cons_cuar',
  },
  {
    title: 'Facturado',
    key: 'fact_rete_cons_cuar',
  },
  {
    title: 'Cump. fact.',
    key: 'cump_fact_rete_cons_cuar',
  },
  {
    title: 'Peg21',
    key: 'fact_pe21_ante',
  },
  {
    title: 'Objetivo',
    key: 'obje_pe21',
  },
  {
    title: 'Ret. peg21',
    key: 'fact_pe21',
  },
  {
    title: '% Ret. fact.',
    key: 'porc_pe21',
  },
  {
    title: 'Peg42',
    key: 'fact_pe42_ante',
  },
  {
    title: 'Objetivo',
    key: 'obje_pe42',
  },
  {
    title: 'Ret. peg42',
    key: 'fact_pe42',
  },
  {
    title: '% Ret. fact.',
    key: 'porc_pe42',
  },
  {
    title: 'Peg63',
    key: 'fact_pe63_ante',
  },
  {
    title: 'Objetivo',
    key: 'obje_pe63',
  },
  {
    title: 'Ret. peg63',
    key: 'fact_pe63',
  },
  {
    title: '% Ret. fact.',
    key: 'porc_pe63',
  },
  {
    title: 'Pegs',
    key: 'fact_pegs_ante',
  },
  {
    title: 'Objetivo',
    key: 'obje_pegs',
  },
  {
    title: 'Ret. pegs',
    key: 'fact_pegs',
  },
  {
    title: 'Cump. fact.',
    key: 'porc_pegs',
  },
  {
    title: 'Pos. reing.',
    key: 'fact_rein_ante',
  },
  {
    title: 'Objetivo',
    key: 'obje_rein',
  },
  {
    title: 'Facturado',
    key: 'fact_rein',
  },
  {
    title: '% Cump',
    key: 'porc_rein',
  },
  {
    title: 'Objetivo',
    key: 'obje_capi',
  },
  {
    title: 'Facturado',
    key: 'fact_capi',
  },
  {
    title: 'Pend. 21di',
    key: 'pend_21di',
  },
  {
    title: '% Cobr. 21di.',
    key: 'porc_21di',
  },
  {
    title: 'Pend. 31di',
    key: 'pend_31di',
  },
  {
    title: '% Cobr. 31di.',
    key: 'porc_31di',
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
    title: 'Ingreso lider',
    key: 'camp_ingr',
  },
  {
    title: 'Nivel de lider',
    key: 'nive_lide',
  },
]

const getClaseCumplimiento = (row, columnfield, value, objeField, thresholdSuccess, thresholdWarning) => {
  const dataRecord = refGridGlobal.value.getrowdata(row)
  const objeValue = parseFloat(dataRecord[objeField]).toFixed(2)
  const cumpValue = parseFloat(value).toFixed(2)

  if (objeValue === '0.00') {
    return ''
  } else if (cumpValue >= thresholdSuccess) {
    return 'text-success'
  } else if (cumpValue >= thresholdWarning && cumpValue < thresholdSuccess) {
    return 'text-warning'
  }

  return 'text-error'
}

const claseCumplimientoTotal = (row, columnfield, value) => {
  return getClaseCumplimiento(row, columnfield, value, 'obje_tota', 100, 80)
}

const claseCumplimientoIncorporacion = (row, columnfield, value) => {
  return getClaseCumplimiento(row, columnfield, value, 'obje_inco', 100, 80)
}

const claseCumplimientoRetencion = (row, columnfield, value) => {
  return getClaseCumplimiento(row, columnfield, value, 'obje_rete', 100, 95)
}

const clasePorcentajeActividad = (row, columnfield, value) => {
  return getClaseCumplimiento(row, columnfield, value, 'obje_acti', Infinity, NaN)
}

const claseObjetivoRetencionConsecutiva = (row, columnfield, value) => {
  const dataRecord = refGridGlobal.value.getrowdata(row)
  const objeReteSist = parseInt(dataRecord.obje_rete_cons_sist)
  const objeRete = parseInt(value)
  let porcReteCons = 100 * (objeRete / objeReteSist)
  porcReteCons = parseFloat(porcReteCons).toFixed(2)

  if (objeReteSist === 0) {
    return ''
  } else if (porcReteCons >= 100) {
    return 'text-success'
  } else if (porcReteCons >= 80 && porcReteCons < 100) {
    return 'text-warning'
  }

  return 'text-error'
}

const claseCumplimientoRetencionConsecutiva = (row, columnfield, value) => {
  return getClaseCumplimiento(row, columnfield, value, 'fact_rete_cons_ante', 100, 90)
}

const claseCumplimientoConsecutivaSegundo = (row, columnfield, value) => {
  return getClaseCumplimiento(row, columnfield, value, 'obje_rete_cons_segu', 100, 80)
}

const claseCumplimientoConsecutivaTercer = (row, columnfield, value) => {
  return getClaseCumplimiento(row, columnfield, value, 'obje_rete_cons_terc', 80, 70)
}

const claseCumplimientoConsecutivaCuarto = (row, columnfield, value) => {
  return getClaseCumplimiento(row, columnfield, value, 'obje_rete_cons_cuar', 70, 60)
}

const claseObjetivoPeg21 = (row, columnfield, value) => {
  return getClaseCumplimiento(row, columnfield, value, 'fact_pe21', 100, 80)
}

const clasePorcentajePeg21 = (row, columnfield, value) => {
  return getClaseCumplimiento(row, columnfield, value, 'obje_pe21', 100, 90)
}

const claseObjetivoPeg42 = (row, columnfield, value) => {
  return getClaseCumplimiento(row, columnfield, value, 'fact_pe42', 100, 80)
}

const clasePorcentajePeg42 = (row, columnfield, value) => {
  return getClaseCumplimiento(row, columnfield, value, 'obje_pe42', 100, 90)
}

const claseObjetivoPeg63 = (row, columnfield, value) => {
  return getClaseCumplimiento(row, columnfield, value, 'fact_pe63', 100, 80)
}

const clasePorcentajePeg63 = (row, columnfield, value) => {
  return getClaseCumplimiento(row, columnfield, value, 'obje_pe63', 100, 90)
}

const claseObjetivoPegs = (row, columnfield, value) => {
  return getClaseCumplimiento(row, columnfield, value, 'fact_pegs', 100, 80)
}

const clasePorcentajePegs = (row, columnfield, value) => {
  return getClaseCumplimiento(row, columnfield, value, 'obje_pegs', 100, 90)
}

const claseObjetivoReingreso = (row, columnfield, value) => {
  return getClaseCumplimiento(row, columnfield, value, 'fact_rein', 100, 80)
}

const clasePorcentajeReingreso = (row, columnfield, value) => {
  return getClaseCumplimiento(row, columnfield, value, 'obje_rein', 100, 90)
}

const claseFacturacionCapitalizacion = (row, columnfield, value) => {
  const dataRecord = refGridGlobal.value.getrowdata(row)
  const objeCapi = parseInt(dataRecord.obje_capi)

  if (objeCapi === 0) {
    return ''
  } else if (parseInt(value) >= objeCapi) {
    return 'text-success'
  } else if (parseInt(value) >= 1 && parseInt(value) < objeCapi) {
    return 'text-warning'
  }

  return 'text-error'
}

const clasePorcentaje21dias = (row, columnfield, value) => {
  const dataRecord = refGridGlobal.value.getrowdata(row)
  const valoDocu = parseFloat(dataRecord.valo_docu).toFixed(2)
  const porc21di = parseFloat(value).toFixed(2)
  const data = 88

  if (valoDocu === '0.00') {
    return ''
  } else if (porc21di >= data) {
    return 'text-success'
  }

  return 'text-error'
}

const clasePorcentaje31dias = (row, columnfield, value) => {
  const dataRecord = refGridGlobal.value.getrowdata(row)
  const valoDocu = parseFloat(dataRecord.valo_docu).toFixed(2)
  const porc31di = parseFloat(value).toFixed(2)

  if (valoDocu === '0.00') {
    return ''
  } else if (porc31di >= 92) {
    return 'text-success'
  }

  return 'text-error'
}


const columnasGrupo = [
  {
    text: 'Incorporación',
    align: 'center',
    name: 'inco',
  },
  {
    text: 'Pedidos de retención',
    align: 'center',
    name: 'rete',
  },
  {
    text: 'Pedidos totales',
    align: 'center',
    name: 'tota',
  },
  {
    text: 'Consecutividad pedido de retención 90%',
    align: 'center',
    name: 'cons',
  },
  {
    text: 'Consecutividad 2do pedido 100%',
    align: 'center',
    name: 'cons_segu',
  },
  {
    text: 'Consecutividad 3er pedido 80%',
    align: 'center',
    name: 'cons_terc',
  },
  {
    text: 'Consecutividad 4to pedido 70%',
    align: 'center',
    name: 'cons_cuar',
  },
  {
    text: 'Ppp',
    align: 'center',
    name: 'pppp',
  },
  {
    text: 'Cobranza',
    align: 'center',
    name: 'cobr',
  },
  {
    text: 'Capitalización',
    align: 'center',
    name: 'capi',
  },
  {
    text: '% Actividad',
    align: 'center',
    name: 'acti',
  },
  {
    text: 'Peg21 40%',
    align: 'center',
    name: 'pe21',
  },
  {
    text: 'Peg42 30%',
    align: 'center',
    name: 'pe42',
  },
  {
    text: 'Peg63 25%',
    align: 'center',
    name: 'pe63',
  },
  {
    text: 'Suma pegs 35%',
    align: 'center',
    name: 'suma',
  },
  {
    text: 'Reingresos 10%',
    align: 'center',
    name: 'rein',
  },
  {
    text: 'Productividad retención líder',
    align: 'center',
    name: 'lide',
  },
]

let sumaFact = 0
let sumaObje = 0
let sumaValo = 0
let sumaSald = 0
let sumaLine = 0
let sumaPedi = 0
let sumaActiInic = 0
let sumaNumePedi = 0
let sumaTotaIngr = 0
let sumaTotaRein = 0
let sumaRece = 0
          
const columnasGlobal = [
  {
    text: 'Zona',
    dataField: 'codi_zona',
    width: '60',
    align: 'center',
    cellsalign: 'center',
    pinned: true,
  },
  {
    text: 'Sector',
    dataField: 'codi_sect',
    width: '60',
    align: 'center',
    cellsalign: 'center',
    pinned: true,
  },
  {
    text: 'Lider',
    dataField: 'nomb_lide',
    width: '250',
    align: 'center',
    pinned: true,
  },
  {
    text: 'Act. inic.',
    dataField: 'acti_inic',
    width: '80',
    align: 'center',
    cellsalign: 'center',
    pinned: true,
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Objetivo',
    dataField: 'obje_tota',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'tota',
  },
  {
    text: 'Facturado',
    dataField: 'fact_tota',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'tota',
  },
  {
    text: 'Cump. fact.',
    dataField: 'cump_fact_tota',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P2',
    aggregates: [
      {
        
        T: function(aggregatedValue, currentValue, column, record) {
          
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.fact_tota
          sumaObje += record.obje_tota
          let total = 0
          
          if (parseInt(sumaObje) > 0 && parseInt(sumaFact) > 0) {
            
            total = 100 * (parseInt(sumaFact) / parseInt(sumaObje))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
    columngroup: 'tota',
    cellclassname: claseCumplimientoTotal,
  },
  {
    text: 'Objetivo',
    dataField: 'obje_inco',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'inco',
  },
  {
    text: 'Facturado',
    dataField: 'fact_inco',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'inco',
  },
  {
    text: 'Cump. fact.',
    dataField: 'cump_fact_inco',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P2',
    aggregates: [
      {
        
        T: function(aggregatedValue, currentValue, column, record) {
          
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.fact_inco
          sumaObje += record.obje_inco
          let total = 0
          
          if (parseInt(sumaObje) > 0 && parseInt(sumaFact) > 0) {
            
            total = 100 * (parseInt(sumaFact) / parseInt(sumaObje))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
    columngroup: 'inco',
    cellclassname: claseCumplimientoIncorporacion,
  },
  {
    text: 'Objetivo',
    dataField: 'obje_rete',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'rete',
  },
  {
    text: 'Facturado',
    dataField: 'fact_rete',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'rete',
  },
  {
    text: 'Cump. fact.',
    dataField: 'cump_fact_rete',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P2',
    aggregates: [
      {
        
        T: function(aggregatedValue, currentValue, column, record) {
          
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.fact_rete
          sumaObje += record.obje_rete
          let total = 0
          
          if (parseInt(sumaObje) > 0 && parseInt(sumaFact) > 0) {
            
            total = 100 * (parseInt(sumaFact) / parseInt(sumaObje))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
    columngroup: 'rete',
    cellclassname: claseCumplimientoRetencion,
  },
  {
    text: 'acti inic ante',
    dataField: 'acti_inic_ante',
    hidden: true,
  },
  {
    text: 'nume pedi ante',
    dataField: 'nume_pedi_ante',
    hidden: true,
  },
  {
    text: 'tota ingr ante',
    dataField: 'tota_ingr_ante',
    hidden: true,
  },
  {
    text: 'tota rein ante',
    dataField: 'tota_rein_ante',
    hidden: true,
  },
  {
    text: 'nume pedi',
    dataField: 'nume_pedi',
    hidden: true,
  },
  {
    text: 'tota ingr',
    dataField: 'tota_ingr',
    hidden: true,
  },
  {
    text: 'tota rein',
    dataField: 'tota_rein',
    hidden: true,
  },
  {
    text: 'nume pedi acti',
    dataField: 'nume_pedi_acti',
    hidden: true,
  },
  {
    text: 'Camp. ante.',
    dataField: 'porc_acti_ante',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P2',
    aggregates: [
      {
        
        T: function(aggregatedValue, currentValue, column, record) {
          
          if (record.visibleindex === 0) {
            sumaActiInic = 0
            sumaNumePedi = 0
            sumaTotaIngr = 0
            sumaTotaRein = 0
          }
          sumaActiInic += record.acti_inic_ante
          sumaNumePedi += record.nume_pedi_ante
          sumaTotaIngr += record.tota_ingr_ante
          sumaTotaRein += record.tota_rein_ante
          let total = 0
          
          if (parseInt(sumaActiInic) > 0 && parseInt(sumaNumePedi) - parseInt(sumaTotaIngr) - parseInt(sumaTotaRein) > 0) {
            
            total = 100 * (parseInt(parseInt(sumaNumePedi) - parseInt(sumaTotaIngr) - parseInt(sumaTotaRein)) / parseInt(sumaActiInic))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
    columngroup: 'acti',
  },
  {
    text: 'Objetivo',
    dataField: 'obje_acti',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P2',
    columngroup: 'acti',
    aggregates: [
      {
        
        T: function(aggregatedValue, currentValue, column, record) {
          
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.acti_inic
          sumaObje += record.nume_pedi_acti
          let total = 0
          
          if (parseInt(sumaFact) > 0 && parseFloat(sumaObje) > 0) {
            
            total = 100 * (parseFloat(sumaObje) / parseInt(sumaFact))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
  },
  {
    text: 'Facturado',
    dataField: 'porc_acti',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P2',
    aggregates: [
      {
        
        T: function(aggregatedValue, currentValue, column, record) {
          
          if (record.visibleindex === 0) {
            sumaActiInic = 0
            sumaNumePedi = 0
            sumaTotaIngr = 0
            sumaTotaRein = 0
          }
          sumaActiInic += record.acti_inic
          sumaNumePedi += record.nume_pedi
          sumaTotaIngr += record.tota_ingr
          sumaTotaRein += record.tota_rein
          let total = 0
          
          if (parseInt(sumaActiInic) > 0 && parseInt(sumaNumePedi) - parseInt(sumaTotaIngr) - parseInt(sumaTotaRein) > 0) {
            
            total = 100 * (parseInt(parseInt(sumaNumePedi) - parseInt(sumaTotaIngr) - parseInt(sumaTotaRein)) / parseInt(sumaActiInic))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
    columngroup: 'acti',
    cellclassname: clasePorcentajeActividad,
  },
  {
    text: 'Rete. camp. ant.',
    dataField: 'fact_rete_cons_ante',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'cons',
  },
  {
    text: 'Objetivo',
    dataField: 'obje_rete_cons',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'cons',
    cellsrenderer: claseObjetivoRetencionConsecutiva,
  },
  {
    text: 'Facturado',
    dataField: 'fact_rete_cons',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'cons',
  },
  {
    text: 'Cump. fact.',
    dataField: 'cump_fact_rete_cons',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P2',
    aggregates: [
      {
        
        T: function(aggregatedValue, currentValue, column, record) {
          
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.fact_rete_cons
          sumaObje += record.obje_rete_cons
          let total = 0
          
          if (parseInt(sumaFact) > 0 && parseInt(sumaObje) > 0) {
            
            total = 100 * (parseInt(sumaFact) / parseInt(sumaObje))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
    columngroup: 'cons',
    cellclassname: claseCumplimientoRetencionConsecutiva,
  },
  {
    text: '1 Camp. ante.',
    dataField: 'obje_rete_cons_segu',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'cons_segu',
  },
  {
    text: 'Facturado',
    dataField: 'fact_rete_cons_segu',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'cons_segu',
  },
  {
    text: 'Cump. fact.',
    dataField: 'cump_fact_rete_cons_segu',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P2',
    aggregates: [
      {
        
        T: function(aggregatedValue, currentValue, column, record) {
          
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.fact_rete_cons_segu
          sumaObje += record.obje_rete_cons_segu
          let total = 0
          
          if (parseInt(sumaFact) > 0 && parseInt(sumaObje) > 0) {
            
            total = 100 * (parseInt(sumaFact) / parseInt(sumaObje))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
    columngroup: 'cons_segu',
    cellclassname: claseCumplimientoConsecutivaSegundo,
  },
  {
    text: '2 Camp. ante.',
    dataField: 'obje_rete_cons_terc',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'cons_terc',
  },
  {
    text: 'Facturado',
    dataField: 'fact_rete_cons_terc',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'cons_terc',
  },
  {
    text: 'Cump. fact.',
    dataField: 'cump_fact_rete_cons_terc',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P2',
    aggregates: [
      {
        
        T: function(aggregatedValue, currentValue, column, record) {
          
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.fact_rete_cons_terc
          sumaObje += record.obje_rete_cons_terc
          let total = 0
          
          if (parseInt(sumaFact) > 0 && parseInt(sumaObje) > 0) {
            
            total = 100 * (parseInt(sumaFact) / parseInt(sumaObje))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
    columngroup: 'cons_terc',
    cellclassname: claseCumplimientoConsecutivaTercer,
  },
  {
    text: '3 Camp. ante.',
    dataField: 'obje_rete_cons_cuar',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'cons_cuar',
  },
  {
    text: 'Facturado',
    dataField: 'fact_rete_cons_cuar',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'cons_cuar',
  },
  {
    text: 'Cump. fact.',
    dataField: 'cump_fact_rete_cons_cuar',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P2',
    aggregates: [
      {
        
        T: function(aggregatedValue, currentValue, column, record) {
          
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.fact_rete_cons_cuar
          sumaObje += record.obje_rete_cons_cuar
          let total = 0
          
          if (parseInt(sumaFact) > 0 && parseInt(sumaObje) > 0) {
            
            total = 100 * (parseInt(sumaFact) / parseInt(sumaObje))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
    columngroup: 'cons_cuar',
    cellclassname: claseCumplimientoConsecutivaCuarto,
  },
  {
    text: 'Peg21',
    dataField: 'fact_pe21_ante',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'pe21',
  },
  {
    text: 'Objetivo',
    dataField: 'obje_pe21',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'pe21',
    cellsrenderer: claseObjetivoPeg21,
  },
  {
    text: 'Ret. peg21',
    dataField: 'fact_pe21',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'pe21',
  },
  {
    text: '% Ret. fact.',
    dataField: 'porc_pe21',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P2',
    columngroup: 'pe21',
    cellclassname: clasePorcentajePeg21,
  },
  {
    text: 'Peg42',
    dataField: 'fact_pe42_ante',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'pe42',
  },
  {
    text: 'Objetivo',
    dataField: 'obje_pe42',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'pe42',
    cellsrenderer: claseObjetivoPeg42,
  },
  {
    text: 'Ret. peg42',
    dataField: 'fact_pe42',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'pe42',
  },
  {
    text: '% Ret. fact.',
    dataField: 'porc_pe42',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P2',
    aggregates: [
      {
        
        T: function(aggregatedValue, currentValue, column, record) {
          
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.fact_pe42
          sumaObje += record.obje_pe42
          let total = 0
          
          if (parseInt(sumaFact) > 0 && parseInt(sumaObje) > 0) {
            
            total = 100 * (parseInt(sumaFact) / parseInt(sumaObje))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
    columngroup: 'pe42',
    cellclassname: clasePorcentajePeg42,
  },
  {
    text: 'Peg63',
    dataField: 'fact_pe63_ante',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'pe63',
  },
  {
    text: 'Objetivo',
    dataField: 'obje_pe63',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'pe63',
    cellsrenderer: claseObjetivoPeg63,
  },
  {
    text: 'Ret. peg63',
    dataField: 'fact_pe63',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'pe63',
  },
  {
    text: '% Ret. fact.',
    dataField: 'porc_pe63',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P2',
    aggregates: [
      {
        
        T: function(aggregatedValue, currentValue, column, record) {
          
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.fact_pe63
          sumaObje += record.obje_pe63
          let total = 0
          
          if (parseInt(sumaFact) > 0 && parseInt(sumaObje) > 0) {
            
            total = 100 * (parseInt(sumaFact) / parseInt(sumaObje))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
    columngroup: 'pe63',
    cellclassname: clasePorcentajePeg63,
  },
  {
    text: 'Pegs',
    dataField: 'fact_pegs_ante',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'suma',
  },
  {
    text: 'Objetivo',
    dataField: 'obje_pegs',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'suma',
    cellsrenderer: claseObjetivoPegs,
  },
  {
    text: 'Ret. pegs',
    dataField: 'fact_pegs',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'suma',
  },
  {
    text: 'Cump. fact.',
    dataField: 'porc_pegs',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P2',
    aggregates: [
      {
        
        T: function(aggregatedValue, currentValue, column, record) {
          
          if (record.visibleindex=== 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.fact_pegs
          sumaObje += record.obje_pegs
          let total = 0
          
          if (parseInt(sumaFact) > 0 && parseInt(sumaObje) > 0) {
            
            total = 100 * (parseInt(sumaFact) / parseInt(sumaObje))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
    columngroup: 'suma',
    cellclassname: clasePorcentajePegs,
  },
  {
    text: 'Pos. reing.',
    columngroup: 'rein',
    dataField: 'fact_rein_ante',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Objetivo',
    columngroup: 'rein',
    dataField: 'obje_rein',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellsrenderer: claseObjetivoReingreso,
  },
  {
    text: 'Facturado',
    columngroup: 'rein',
    dataField: 'fact_rein',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: '% Cump',
    columngroup: 'rein',
    dataField: 'porc_rein',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellclassname: clasePorcentajeReingreso,
    cellsformat: 'P2',
    aggregates: [
      {
        
        T: function(aggregatedValue, currentValue, column, record) {
          
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.fact_rein
          sumaObje += record.obje_rein
          let total = 0
          
          if (parseInt(sumaFact) > 0 && parseInt(sumaObje) > 0) {
            
            total = 100 * (parseInt(sumaFact) / parseInt(sumaObje))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
  },
  {
    text: 'Objetivo',
    columngroup: 'capi',
    dataField: 'obje_capi',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Facturado',
    columngroup: 'capi',
    dataField: 'fact_capi',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: claseFacturacionCapitalizacion,
  },
  {
    text: 'valo docu',
    dataField: 'valo_docu',
    hidden: true,
  },
  {
    text: 'sald 21di',
    dataField: 'sald_21di',
    hidden: true,
  },
  {
    text: 'sald 31di',
    dataField: 'sald_31di',
    hidden: true,
  },
  {
    text: 'Pend. 21di',
    columngroup: 'cobr',
    dataField: 'pend_21di',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'D2',
    aggregates: [
      {
        
        T: function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: '% Cobr. 21di.',
    columngroup: 'cobr',
    dataField: 'porc_21di',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'D2',
    aggregates: [
      {
        
        T: function(aggregatedValue, currentValue, column, record) {
          
          if (record.visibleindex === 0) {
            sumaValo = 0
            sumaSald = 0
          }
          sumaValo += record.valo_docu
          sumaSald += record.sald_21di
          let total = 0
          
          if (parseInt(sumaValo) > 0 && parseInt(sumaSald) > 0) {
            total = 100 - 100 * (parseFloat(sumaSald) / parseFloat(sumaValo))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
    cellclassname: clasePorcentaje21dias,
  },
  {
    text: 'Pend. 31di',
    columngroup: 'cobr',
    dataField: 'pend_31di',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'D2',
    aggregates: [
      {
        
        T: function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: '% Cobr. 31di.',
    columngroup: 'cobr',
    dataField: 'porc_31di',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'D2',
    aggregates: [
      {
        
        T: function(aggregatedValue, currentValue, column, record) {
          
          if (record.visibleindex === 0) {
            sumaValo = 0
            sumaSald = 0
          }
          sumaValo += record.valo_docu
          sumaSald += record.sald_31di
          let total = 0
          
          if (parseInt(sumaValo) > 0 && parseInt(sumaSald) > 0) {
            total = 100 - 100 * (parseFloat(sumaSald) / parseFloat(sumaValo))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
    cellclassname: clasePorcentaje31dias,
  },
  {
    text: 'tota line',
    dataField: 'tota_line',
    hidden: true,
    cellsformat: 'D2',
  },
  {
    text: 'tota rece',
    dataField: 'tota_rece',
    hidden: true,
    cellsformat: 'D2',
  },
  {
    text: 'Facturado',
    columngroup: 'pppp',
    dataField: 'pppp_fact',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    cellsformat: 'D2',
    aggregates: [
      {
        
        T: function(aggregatedValue, currentValue, column, record) {
          
          if (record.visibleindex === 0) {
            sumaLine = 0
            sumaPedi = 0
          }
          sumaLine += record.tota_line
          sumaPedi += record.nume_pedi
          let total = 0
          
          if (parseInt(sumaPedi) > 0 && parseInt(sumaLine) > 0) {
            
            total = parseFloat(sumaLine) / parseFloat(sumaPedi)
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
  },
  {
    text: 'Recepcionado',
    columngroup: 'pppp',
    dataField: 'pppp_rece',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    cellsformat: 'D2',
    aggregates: [
      {
        
        T: function(aggregatedValue, currentValue, column, record) {
          
          if (record.visibleindex === 0) {
            sumaRece = 0
            sumaPedi = 0
          }
          sumaRece += record.tota_rece
          sumaPedi += record.nume_pedi
          let total = 0
          
          if (parseInt(sumaPedi) > 0 && parseInt(sumaRece) > 0) {
            
            total = parseFloat(sumaRece) / parseFloat(sumaPedi)
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
  },
  {
    text: 'Ingreso lider',
    columngroup: 'lide',
    dataField: 'camp_ingr',
    width: '150',
    align: 'left',
    cellsalign: 'center',
  },
  {
    text: 'Nivel de lider',
    columngroup: 'lide',
    dataField: 'nive_lide',
    width: '150',
    align: 'left',
    cellsalign: 'center',
  },
  {
    text: 'porc canj',
    dataField: 'porc_canj',
    hidden: true,
  },
  {
    text: 'vent neto',
    dataField: 'vent_neto',
    hidden: true,
  },
]

const sourceGlobal = ref({
  localdata: [],
  datafields: [
    { name: 'obje_rete_cons_sist', type: 'number' },
    { name: 'obje_pe21_sist', type: 'number' },
    { name: 'obje_pe42_sist', type: 'number' },
    { name: 'obje_pe63_sist', type: 'number' },
    { name: 'obje_pegs_sist', type: 'number' },
    { name: 'obje_rein_sist', type: 'number' },
    { name: 'codi_zona', type: 'string' },
    { name: 'codi_sect', type: 'string' },
    { name: 'nomb_lide', type: 'string' },
    { name: 'acti_inic', type: 'number' },
    { name: 'obje_tota', type: 'number' },
    { name: 'fact_tota', type: 'number' },
    { name: 'cump_fact_tota', type: 'number' },
    { name: 'obje_inco', type: 'number' },
    { name: 'fact_inco', type: 'number' },
    { name: 'cump_fact_inco', type: 'number' },
    { name: 'obje_rete', type: 'number' },
    { name: 'fact_rete', type: 'number' },
    { name: 'cump_fact_rete', type: 'number' },
    { name: 'nume_pedi', type: 'number' },
    { name: 'tota_ingr', type: 'number' },
    { name: 'tota_rein', type: 'number' },
    { name: 'acti_inic', type: 'number' },
    { name: 'nume_pedi_ante', type: 'number' },
    { name: 'tota_ingr_ante', type: 'number' },
    { name: 'tota_rein_ante', type: 'number' },
    { name: 'acti_inic_ante', type: 'number' },
    { name: 'obje_acti', type: 'number' },
    { name: 'porc_acti', type: 'number' },
    { name: 'nume_pedi_acti', type: 'number' },
    { name: 'porc_acti_ante', type: 'number' },
    { name: 'fact_rete_cons_ante', type: 'number' },
    { name: 'obje_rete_cons', type: 'number' },
    { name: 'fact_rete_cons', type: 'number' },
    { name: 'cump_fact_rete_cons', type: 'number' },
    { name: 'obje_rete_cons_segu', type: 'number' },
    { name: 'fact_rete_cons_segu', type: 'number' },
    { name: 'cump_fact_rete_cons_segu', type: 'number' },
    { name: 'obje_rete_cons_terc', type: 'number' },
    { name: 'fact_rete_cons_terc', type: 'number' },
    { name: 'cump_fact_rete_cons_terc', type: 'number' },
    { name: 'obje_rete_cons_cuar', type: 'number' },
    { name: 'fact_rete_cons_cuar', type: 'number' },
    { name: 'cump_fact_rete_cons_cuar', type: 'number' },
    { name: 'fact_pe21_ante', type: 'number' },
    { name: 'obje_pe21', type: 'number' },
    { name: 'fact_pe21', type: 'number' },
    { name: 'porc_pe21', type: 'number' },
    { name: 'fact_pe42_ante', type: 'number' },
    { name: 'obje_pe42', type: 'number' },
    { name: 'fact_pe42', type: 'number' },
    { name: 'porc_pe42', type: 'number' },
    { name: 'fact_pe63_ante', type: 'number' },
    { name: 'obje_pe63', type: 'number' },
    { name: 'fact_pe63', type: 'number' },
    { name: 'porc_pe63', type: 'number' },
    { name: 'fact_pegs_ante', type: 'number' },
    { name: 'obje_pegs', type: 'number' },
    { name: 'fact_pegs', type: 'number' },
    { name: 'porc_pegs', type: 'number' },
    { name: 'obje_rein', type: 'number' },
    { name: 'fact_rein', type: 'number' },
    { name: 'porc_rein', type: 'number' },
    { name: 'fact_capi', type: 'number' },
    { name: 'obje_capi', type: 'number' },
    { name: 'valo_docu', type: 'number' },
    { name: 'porc_21di', type: 'number' },
    { name: 'sald_21di', type: 'number' },
    { name: 'pend_21di', type: 'number' },
    { name: 'pend_31di', type: 'number' },
    { name: 'porc_31di', type: 'number' },
    { name: 'sald_31di', type: 'number' },
    { name: 'tota_line', type: 'number' },
    { name: 'tota_rece', type: 'number' },
    { name: 'pppp_fact', type: 'number' },
    { name: 'pppp_rece', type: 'number' },
    { name: 'camp_ingr', type: 'number' },
    { name: 'nive_lide', type: 'string' },
    { name: 'nive_lide_proy', type: 'string' },
    { name: 'porc_canj', type: 'number' },
    { name: 'vent_neto', type: 'number' },
    { name: 'fact_rein_ante', type: 'number' },
  ],
  datatype: 'json',
})

const adaptadorGlobal = new jqx.dataAdapter(sourceGlobal.value)

const itemsDetalle = ref([])

const headersDetalle = computed(() => {
  return [
    {
      title: 'Puesto',
      key: 'nume_fila',
    }, {
      title: 'Sector',
      key: 'codi_sect',
    }, {
      title: 'Lider',
      key: 'nomb_lide',
    }, {
      title: 'Pedi. total',
      key: 'porc_pedi',
    }, {
      title: 'obje inco',
      key: 'obje_inco',
      cellsformat: 'N',
      hidden: true,
    }, {
      title: 'Incorporación',
      key: 'porc_inco',
    },  {
      title: 'Pedi. rete.',
      key: 'porc_rete',
    }, {
      title: '% Acti.',
      key: 'porc_acti',
    }, {
      title: 'Cons. pedi. rete.',
      key: 'porc_rete_cons',
    },  {
      title: 'Cons. 2do pedi.',
      key: 'porc_rete_segu',
    }, {
      title: 'Cons. 3er pedi.',
      key: 'porc_rete_terc',
    }, {
      title: 'Cons. 4to pedi.',
      key: 'porc_rete_cuar',
    }, {
      title: 'Suma ret. pegs',
      key: 'porc_pegs',
    }, {
      title: 'Capi.',
      key: 'fact_capi',
    }, {
      title: 'Cobr. 21di.',
      key: 'porc_cobr',
    }, {
      title: 'Cambios & Devo.',
      key: 'porc_canj',
    }, {
      title: 'Nivel de lider',
      key: 'nume_nive',
    }, {
      title: 'Puntaje',
      key: 'peso_tota',
    },
  ]
})
      
const campanaOptions = ref([])
const errorCampana = ref(false)
const errorMensajeCampana = ref('')

const zonaOptions = ref([])
const errorZona = ref(false)
const errorMensajeZona = ref('')
const isOpen = ref(false)   

const localization = appStore.localization

onMounted(async () => {
  appStore.titulo(`Reportes / Evaluación cierre`)
  await obtenerCampana()
  await obtenerZona()
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

const onGenerar = async () => {
  try {
    appStore.mensaje('Obteniendo información')
    appStore.loading(true)
    limpiarValidacion()
    general.value = {
      lima: '',
      objetivoIncorporacion: '0',
      facturadoIncorporacion: '0',
      cumplimientoIncorporacion: '0.00',
      objetivoRetencion: '0',
      facturadoRetencion: '0',
      cumplimientoRetencion: '0.00',
    }
    
    const { data } = await $api(`/api/sami/v1/reportes/evaluacion-cierre-zona`, {
      method: "get",
      query: {
        campana: (formulario.value.campana === null) ? '' : formulario.value.campana,
        zona: (formulario.value.zona === null) ? '' : formulario.value.zona,
      },
    })

    sourceGlobal.value.localdata =  data.data_glob
    refGridGlobal.value.updatebounddata('cells')
    refGridGlobal.value.refreshfilterrow()

    general.value = {
      lima: data.lima_prov,
      objetivoIncorporacion: data.obje_inco,
      facturadoIncorporacion: data.fact_inco,
      cumplimientoIncorporacion: data.porc_inco,
      objetivoRetencion: data.obje_rete,
      facturadoRetencion: data.fact_rete,
      cumplimientoRetencion: data.porc_rete,
    }
  } catch (error) {
    if(typeof error.response !== "undefined") {
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

const onRanking = async () => {
  const dataInfoGlob = refGridGlobal.value.getdatainformation()
  const dataRowsGlob = dataInfoGlob.rowscount
  if(dataRowsGlob == 0 ) {
    appStore.mensajeSnackbar('No tiene ninguna información para generar ranking.')
    appStore.color("error")
    appStore.snackbar(true)
  } else {
    try {
      appStore.mensaje('Generando proceso')
      appStore.loading(true)
      limpiarValidacion()
      itemsDetalle.value = []

      const { data } = await $api(`/api/sami/v1/reportes/evaluacion-cierre-zona`, {
        method: "post",
        body: {
          campana: (formulario.value.campana === null) ? '' : formulario.value.campana,
          zona: (formulario.value.zona === null) ? '' : formulario.value.zona,
          data: JSON.stringify(refGridGlobal.value.exportdata('xml')),
        },
      })

      itemsDetalle.value = data.data_glob
      isOpen.value = true
    } catch (error) {
      if(typeof error.response !== "undefined") {
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
}

const onLimpiar= async () => {
  formulario.value = {
    campana: null,
    zona: null,
  }
  general.value = {
    lima: '',
    objetivoIncorporacion: '0',
    facturadoIncorporacion: '0',
    cumplimientoIncorporacion: '0.00',
    objetivoRetencion: '0',
    facturadoRetencion: '0',
    cumplimientoRetencion: '0.00',
  }
  sourceGlobal.value.localdata = []
  refGridGlobal.value.updatebounddata('cells')
  refGridGlobal.value.refreshfilterrow()
  itemsDetalle.value = []
}

const onExcel = async () => {
  const dataInfoGlob = refGridGlobal.value.getdatainformation()
  const dataRowsGlob = dataInfoGlob.rowscount
  if(dataRowsGlob == 0 ) {
    appStore.mensajeSnackbar('No tiene ningun seguimiento de cierre por exportar.')
    appStore.color("error")
    appStore.snackbar(true)
  } else {
    try {
      appStore.mensaje('Generando archivo')
      appStore.loading(true)

      const { data } = await $api(`/api/sami/v1/reportes/evaluacion-cierre-zona/excel`, {
        method: "post",
        body: {
          general: general.value,
          cabeceraGlobal: cabeceraGlobal,
          detalleGlobal: JSON.stringify(refGridGlobal.value.exportdata('xml')),
        },
      })
    
      window.open(`${$base}/temporales/${data}`, '_blank')
    } catch (e) {
    }
    finally {
      appStore.loading(false)
    }
  }

  
}

const limpiarValidacion = () => {
  errorCampana.value = false
  errorMensajeCampana.value = ''
  errorZona.value = false
  errorMensajeZona.value = ''
}

const onClose = () => {
  isOpen.value = false
  itemsDetalle.value = []
}
</script>

<template>
  <div>
    <AppPlantilla>
      <template #botones>
        <GenerarBoton @procesar="onGenerar" />
        <ExcelBoton @procesar="onExcel" />
        <RankingBoton @procesar="onRanking" />
        <LimpiarBoton @procesar="onLimpiar" />
      </template>
      <template #contenido>
        <VRow>
          <VCol cols="12">
            <VCard title="Buscar seguimiento">
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
            <VCard title="Información general">
              <VCardText>
                <VTable
                  density="compact" 
                  class="text-no-wrap"
                >
                  <thead>
                    <tr>
                      <th class="text-uppercase">
                        CONCEPTO
                      </th>
                      <th class="text-uppercase">
                        OBJ. ZONA
                      </th>
                      <th class="text-uppercase">
                        FACTURADO
                      </th>
                      <th class="text-uppercase">
                        % CUMPLIMIENTO
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Incorporación</td>
                      <td>{{ general.objetivoIncorporacion }}</td>
                      <td>{{ general.facturadoIncorporacion }}</td>
                      <td>{{ general.cumplimientoIncorporacion }}</td>
                    </tr>
                    <tr>
                      <td>Retención</td>
                      <td>{{ general.objetivoRetencion }}</td>
                      <td>{{ general.facturadoRetencion }}</td>
                      <td>{{ general.cumplimientoRetencion }}</td>
                    </tr>
                  </tbody>
                </VTable>
              </VCardText>
            </VCard>
          </VCol>

          <VCol cols="12">
            <VCard>
              <VCardText>
                <JqxGrid
                  ref="refGridGlobal"
                  theme="material"
                  width="100%"
                  :localization="localization"
                  :height="450"
                  :columns="columnasGlobal"
                  :source="adaptadorGlobal"
                  :columngroups="columnasGrupo"
                  columnsresize
                  columnsautoresize
                  enableanimations
                  sortable
                  sortmode="many"
                  filterable
                  :altrows="false"
                  :showemptyrow="false"
                  columnsreorder
                  showstatusbar
                  showaggregates
                  selectionmode="singlecell"
                  scrollmode="logical"
                  showfilterrow
                  :columnsmenu="false"
                />
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
      :model-value="isOpen"
    >
      <VCard color="background">
        <VToolbar color="secondary">
          <VBtn
            v-if="mobile"
            icon
            color="default"
            :rounded="false"
            @click="onClose"
          >
            <VIcon icon="tabler-x" />
          </VBtn>
          <VToolbarTitle>
            Evaluacion ranking
          </VToolbarTitle>
          <VSpacer />
          <VToolbarItems>
            <VBtn
              v-if="!mobile"
              icon
              @click="onClose"
            >
              <VIcon icon="tabler-x" />
            </VBtn>
          </VToolbarItems>
        </VToolbar>
        <VDataTable
          :headers="headersDetalle"
          :items="itemsDetalle"
          :items-per-page="-1"
          class="text-no-wrap"
          fixed-header
          :height="(!mobile)? (itemsDetalle.length > 15) ? 400 : null: null"
        >
          <template #bottom />
        </VDataTable>
      </VCard>
    </VDialog>
  </div>
</template>
