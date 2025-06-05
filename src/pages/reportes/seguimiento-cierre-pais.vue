<!-- eslint-disable camelcase -->
<script setup>
import { useAppStore } from '@/stores/app';
import JqxGrid from "jqwidgets-scripts/jqwidgets-vue3/vue_jqxgrid.vue";

definePage({
  meta: {
    action: 'colombia/repo_come_segu_cier_camp_pais',
    subject: 'colombia/repo_come_segu_cier_camp_pais',
  },
})

const appStore = useAppStore()

const formulario = ref({
  campana: null,
})

const claseCumplimientoIncorporacion =(row, columnfield, value) => {
  const data = parseFloat(value).toFixed(2)
  if (data >= 100) {
    return `text-success`
  }
  if (data >= 90 && data < 100) {
    return `text-warning`
  }
  
  return `text-error`
}
    
// eslint-disable-next-line sonarjs/no-identical-functions
const claseCumplimientoIncorporacionCierre = (row, columnfield, value) => {
  const data = parseFloat(value).toFixed(2)
  if (data >= 100) {
    return `text-success`
  }
  if (data >= 90 && data < 100) {
    return `text-warning`
  }
  
  return `text-error`
}
    
// eslint-disable-next-line sonarjs/no-identical-functions
const claseCumplimientoRetencionEstimado = (row, columnfield, value) => {
  const data = parseFloat(value).toFixed(2)
  if (data >= 100) {
    return `text-success`
  }
  if (data >= 90 && data < 100) {
    return `text-warning`
  }
  
  return `text-error`
}
    
// eslint-disable-next-line sonarjs/no-identical-functions
const claseCumplimientoRetencionCierre = (row, columnfield, value) => {
  const data = parseFloat(value).toFixed(2)
  if (data >= 100) {
    return `text-success`
  }
  if (data >= 90 && data < 100) {
    return `text-warning`
  }
  
  return `text-error`
}
    
// eslint-disable-next-line sonarjs/no-identical-functions
const claseCumplimientoTotalEstimado =(row, columnfield, value) => {
  const data = parseFloat(value).toFixed(2)
  if (data >= 100) {
    return `text-success`
  }
  if (data >= 90 && data < 100) {
    return `text-warning`
  }
  
  return `text-error`
}
    
// eslint-disable-next-line sonarjs/no-identical-functions
const claseCumplimientoTotalCierre = (row, columnfield, value) => {
  const data = parseFloat(value).toFixed(2)
  if (data >= 100) {
    return `text-success`
  }
  if (data >= 90 && data < 100) {
    return `text-warning`
  }
  
  return `text-error`
}



const cabeceraGlobal = [
  {
    title: 'Región',
    key: 'codi_area',
  },
  {
    title: 'Nro zonas',
    key: 'tota_zona',
  },
  {
    title: 'Objetivo',
    key: 'tota_obje',
  },
  {
    title: 'Proyección',
    key: 'tota_proy',
  },
   {
    title: 'Seguimiento',
    key: 'tota_segui',
  },
  
  {
    title: 'Objetivo',
    key: 'obje_inco',
  },
  
 
  {
    title: 'Estimacion de cierre',
    key: 'obje_inco_cier',
  },
  {
    title: 'Facturacion',
    key: 'fact_inco',
  },
  {
    title: 'proyeccion de incorporacion',
    key: 'obje_inco_prime',
  },
  {
  title: 'Cump. fact.',
  key:'cump_inco_fact',
  },
 
  {
  title: 'Pend. fact.',
  key:'pend_inco_fact',
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
    title: 'Dife. tota.',
    key: 'dife_inco_tota',
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
    title: 'Pend. fact.',
    key: 'pend_fact_rete_cons',
  },
  {
    title: 'Total',
    key: 'tota_rete_cons',
  },
  {
    title: '% Cump.',
    key: 'cump_rete_cons',
  },
  {
    title: '1 Camp. ante.',
    key: 'camp_con2_ante',
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
    title: 'Pend. fact.',
    key: 'pend_fact_rete_cons_segu',
  },
  {
    title: 'Total',
    key: 'tota_rete_cons_segu',
  },
  {
    title: '% Cump.',
    key: 'cump_rete_cons_segu',
  },
  {
    title: '2 Camp. ante.',
    Key: 'obje_rete_cons_terc',
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
    title: 'Pend. fact.',
    key: 'pend_fact_rete_cons_terc',
  },
  {
    title: 'Total',
    key: 'tota_rete_cons_terc',
  },
  {
    title: '% Cump.',
    key: 'cump_rete_cons_terc',
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
    title:'Cump. fact.',
    key: 'cump_fact_rete_cons_cuar',
  },
  {
    title: 'Pend. fact.',
    key: 'pend_fact_rete_cons_cuar',
  },
  {
    title: 'Total',
    key: 'tota_rete_cons_cuar',
  },
  {
    title: '% Cump.',
    key: 'cump_rete_cons_cuar',
  },
  {
    title: 'peg21',
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
    title: '%Ret. pend',
    key: 'porc_pe21',
  },
  {
    title: 'Pend. fact.',
    key: 'pend_fact_pe21',
  },
  {
    title: 'Total',
    key: 'tota_pe21',
  },
  {
    title: '%Ret. pend',
    key: 'cump_pe21',
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
    title: '%Ret. pend',
    key: 'porc_pe42',
  },
  {
    title: 'Pend. fact.',
    key: 'pend_fact_pe42',
  },
  {
    title: 'Total',
    key: 'tota_pe42',
  },
  {
    title: '%Ret. pend',
    key: 'cump_pe42',
  },
  {
    title: 'Peg43',
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
    title: '% Ret. pend.',
    key: 'porc_pe63',
  },
  {
    title: 'Pend. fact.',
    key: 'pend_fact_pe63',
  },
  {
    title: 'Total',
    key: 'tota_pe63',
  },
  {
    title: '% Ret. pend.',
    key: 'cump_pe63',
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
    title: 'proyeccion de consecutividad 2do pedido',
    key: 'cons_rete_prim',
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
    title: 'Pend. fact.',
    key: 'pend_fact_pegs',
  },
  {
    title: 'Total',
    key: 'tota_pegs',
  },
  {
    title: '% Cump',
    key: 'cump_pegs',
  },
  {
    title: 'pos. reing.',
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
    title: 'Cump. fact.',
    key: 'porc_rein',
  },
  {
    title: 'Pend. fact.',
    key: 'pend_fact_rein',
  },
  {
    title: 'Total',
    key: 'tota_fact_rein',
  },
  {
    title: '% Cump.',
    key: 'cump_rein',
  },
  {
    title: 'Objetivo',
    key: 'obje_tota',
  },
  {
    title:'Facturado',
    key: 'fact_tota',
  },
  {
    title:'Cumpl. Fact',
    key: 'cump_fact_tota',
  },
  {
    title:'proyeccion de consecutividad 3er pedido',
    key: 'cons_segu_obje',
  },
  {
    title:'proyeccion de consecutividad 4to pedido',
    key: 'cons_terc_obje',
  },
  {
    title:'proyeccion de peg21',
    key: 'pe21_obje',
  },
  {
    title:'proyeccion de retencion',
    key: 'pegs_obje',
  },
   {
    title:'proyeccion de reingresos',
    key: 'rein_obje',
  },
  {
    title:'proyeccion de capitalizacion',
    key: 'capi_obje',
  },
  {
    title:'proyeccion de pedidos totales',
    key: 'proy_pedi_tota',
  },
  {
    title:' proyeccion de peg63',
    key: 'pe63_obje',
  },
  {
    title:'proyeccion de peg42',
    key: 'pe42_obje',
  },
  {
    title: 'Pend. fact.',
    key: 'pend_fact_tota',
  },
  {
    title: 'Total',
    key: 'tota_tota',
  },
  {
    title: 'Objetivo Ventas',
    key: 'obje_vent',
  },
  {
    title: 'proyeccion de consecutividad',
    key: 'obje_cons_lide',
  },
  {
    title: 'Venta',
    key: 'fact_vent',
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
    title: 'Capi. pend.',
    key: 'tota_capi_pend',
  },
  {
    title: '% Asertividad',
    key: 'porc_aser',
  },
]


let sumaFact = 0
let sumaObje = 0
let sumaActiInic = 0
let sumaNumePedi = 0
let sumaTotaIngr = 0
let sumaTotaRein = 0

const columnasGlobal = [
  {
    datafield: 'obje_inco_prim',
    hidden: true,
  },
  {
    datafield: 'obje_inco_segu',
    hidden: true,
  },
 
  {
    datafield: 'obje_rete_prim',
    hidden: true,
  },
  {
    datafield: 'obje_rete_segu',
    hidden: true,
  },
  {
    datafield: 'obje_tota_prim',
    hidden: true,
  },
  {
    datafield: 'obje_tota_segu',
    hidden: true,
  },
  {
    datafield: 'acti_inic',
    hidden: true,
  },
  {
    datafield: 'nume_pedi',
    hidden: true,
  },
  {
    datafield: 'tota_ingr',
    hidden: true,
  },
  {
    datafield: 'tota_rein',
    hidden: true,
  },
  {
    text: 'Región',
    datafield: 'codi_area',
    width: '70',
    align: 'center',
    cellsalign: 'center',
    filtertype: 'checkedlist',
    pinned: true,
    hidden: false,
    editable: false,
  },
  {
    text: 'Nro zonas',
    datafield: 'tota_zona',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    pinned: true,
    hidden: false,
    editable: false,
  },
  {
    text: 'Objetivo',
    datafield: 'tota_obje',
    width: '80',
    align: 'center',
    cellsalign: 'center',
    pinned: true,
    hidden: false,
    editable: false,
  },
  {
    text: 'Proyección',
    datafield: 'tota_proy',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    pinned: true,
    hidden: false,
    editable: false,
  },
  {
    text: 'Seguimiento',
    datafield: 'tota_segui',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    pinned: true,
    hidden: false,
    editable: false,
  },
  {
    text: 'Objetivo',
    datafield: 'obje_inco',
    width: '90',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
    hidden: false,
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
    text: 'proyeccion de incorporacion',
    datafield: 'obje_inco_prime',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
    hidden: false,
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
    datafield: 'fact_inco',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
    hidden: false,
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
    datafield: 'cump_inco_fact',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P2',
    hidden: false,
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue, column, record) {
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaObje += record.obje_inco
          sumaFact += record.fact_inco
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
  },

  {
    text: 'Pend. fact.',
    datafield: 'pend_inco_fact',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
    hidden: false,
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
    text: 'Total',
    datafield: 'tota_inco',
    width: '60',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
    hidden: false,
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
    text: '% Cump. ',
    datafield: 'cump_inco',
    width: '80',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P',
    editable: false,
    hidden: false,
    aggregates: [
      {

        T: function (aggregatedValue, currentValue, column, record) {
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.obje_inco_cier
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
    text: 'Dife. tota.',
    datafield: 'dife_inco_tota',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
    hidden: false,
    aggregates: [
      {

        T: function (aggregatedValue, currentValue, column, record) {
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.obje_inco_cier
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
    datafield: 'obje_rete_cons',
    width: '80',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
    hidden: false,
    aggregates: [
      {

        T: function(aggregatedValue, currentValue) {
  
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'Cons',
  },
  {
    text: 'proyeccion de consecutividad',
    datafield: 'obje_cons_lide',
    width: '80',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
    hidden: false,
    aggregates: [
      {

        T: function(aggregatedValue, currentValue) {
  
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'Cons',
  },
  
  {
    text: 'Facturado',
    datafield: 'fact_rete_cons',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
    hidden: false,
    aggregates: [
      {
        T: function(aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'Cons',
  },
  {
    text: 'Cump. fact.',
    datafield: 'cump_fact_rete_cons',
    width: '100',
     align: 'center',
    cellsalign: 'center',
    cellsformat: 'P2',
    hidden: false,
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue, column, record) {
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.fact_rete_cons
          sumaObje += record.obje_rete_cons
          let total = 0
          
          if (parseInt(sumaObje) > 0 && parseInt(sumaFact) > 0) {
            
            total = 100 * (parseInt(sumaFact) / parseInt(sumaObje))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
    columngroup: 'Cons',
  },
  {
    text: 'Pend. fact.',
    datafield: 'pend_fact_rete_cons',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
    hidden: false,
    aggregates: [
      {
        T: function(aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'Cons',
  },
  {
    text: 'Total',
    datafield: 'tota_rete_cons',
    width: '60',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
    hidden: false,
    aggregates: [
      {
        T: function(aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'Cons',
  },
  {
    text: '% Cump.',
    datafield: 'cump_rete_cons',
    width: '80',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P',
    editable: false,
    hidden: false,
    aggregates: [
      {
        T: function(aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'Cons',
    cellclassname: claseCumplimientoRetencionCierre,
  },
  {
    text: '1 Camp. ante.',
    datafield: 'obje_rete_cons_segu',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
    hidden: false,
    aggregates: [
      {
        T: function(aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'Cons_2',
  },
   {
    text: 'proyeccion de consecutividad 2do pedido',
    datafield: 'cons_rete_prim',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
    hidden: false,
    aggregates: [
      {
        T: function(aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'Cons_2',
  },
  {
    text: 'Facturado',
    datafield: 'fact_rete_cons_segu',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
    hidden: false,
    aggregates: [
      {
        T: function(aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'Cons_2',
  },
  {
    text: 'Cump. fact.',
    datafield: 'cump_fact_rete_cons_segu',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P',
    editable: false,
    hidden: false,
    aggregates: [
      {
        T: function(aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'Cons_2',
    cellclassname: claseCumplimientoRetencionCierre,
  },
  {
    text: 'Pend. fact.',  
    datafield: 'pend_fact_rete_cons_segu',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
    hidden: false,
    aggregates: [
      {
        T: function(aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'Cons_2',
  },
  {
    text: 'Total',  
    datafield: 'tota_rete_cons_segu',
    width: '70',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
    hidden: false,
    aggregates: [
      {
        T: function(aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'Cons_2',
  },
  {
    text: '% Cump.',  
    datafield: 'cump_rete_cons_segu',
    width: '80',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P',
    editable: false,
    hidden: false,
    aggregates: [
      {
        T: function(aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'Cons_2',
    cellclassname: claseCumplimientoRetencionCierre,
  },
  {
    text: '2 Camp. ante.',  
    datafield: 'obje_rete_cons_terc',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
    hidden: false,
    aggregates: [
      {
        T: function(aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'Cons_3',
  },
  {
    text: 'proyeccion de consecutividad 3er pedido',  
    datafield: 'cons_segu_obje',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
    hidden: false,
    aggregates: [
      {
        T: function(aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'Cons_3',
  },
  {
    text: 'Facturado',  
    datafield: 'fact_rete_cons_terc',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
    hidden: false,
    aggregates: [
      {
        T: function(aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'Cons_3',
  },
  {
    text: 'Cump. fact.',  
    datafield: 'cump_fact_rete_cons_terc',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P',
    editable: false,
    hidden: false,
    aggregates: [
      {
        T: function(aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'Cons_3',
    cellclassname: claseCumplimientoRetencionCierre,
  },
  {
    text: 'Pend. fact.',  
    datafield: 'pend_fact_rete_cons_terc',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
    hidden: false,
    aggregates: [
      {
        T: function(aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'Cons_3',
  },
  {
    text: 'Total',  
    datafield: 'tota_rete_cons_terc',
    width: '70',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
    hidden: false,
    aggregates: [
      {
        T: function(aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'Cons_3',
  },
  {
    text: '% Cump.',  
    datafield: 'cump_rete_cons_terc',
    width: '80',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P',
    editable: false,
    hidden: false,
    aggregates: [
      {
        T: function(aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'Cons_3',
    cellclassname: claseCumplimientoRetencionCierre,
  },
  {
    text: '3 Camp. ante.',  
    datafield: 'obje_rete_cons_cuar',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
    hidden: false,
    aggregates: [
      {
        T: function(aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'Cons_4',
  },
  {
    text: 'proyeccion de consecutividad 4to pedido',  
    datafield: 'cons_terc_obje',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
    hidden: false,
    aggregates: [
      {
        T: function(aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'Cons_4',
  },
  {
    text: 'Facturado',  
    datafield: 'fact_rete_cons_cuar',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
    hidden: false,
    aggregates: [
      {
        T: function(aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'Cons_4',
  },
  {
    text: 'Cump. fact.',  
    datafield: 'cump_fact_rete_cons_cuar',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P',
    editable: false,
    hidden: false,
    aggregates: [
      {
        T: function(aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'Cons_4',
    cellclassname: claseCumplimientoRetencionCierre,
  },
  {
    text: 'Pend. fact.',  
    datafield: 'pend_fact_rete_cons_cuar',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
    hidden: false,
    aggregates: [
      {
        T: function(aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'Cons_4',
  },
  {
    text: 'Total',  
    datafield: 'tota_rete_cons_cuar',
    width: '70',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
    hidden: false,
    aggregates: [
      {
        T: function(aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'Cons_4',
  },
  {
    text: '% Cump.',  
    datafield: 'cump_rete_cons_cuar',
    width: '80',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P',
    editable: false,
    hidden: false,
    aggregates: [
      {
        T: function(aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'Cons_4',
    cellclassname: claseCumplimientoRetencionCierre,
  },
  {
    text: 'peg21',  
    datafield: 'fact_pe21_ante',
    width: '80',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
    hidden: false,
    aggregates: [
      {
        T: function(aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'peg21',
  },
  {
    text: 'proyeccion de peg21',  
    datafield: 'pe21_obje',
    width: '80',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
    hidden: false,
    aggregates: [
      {
        T: function(aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'peg21',
  },
  {
    text: 'Objetivo',  
    datafield: 'obje_pe21',
    width: '80',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
    hidden: false,
    aggregates: [
      {
        T: function(aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'peg21',
  },
  {
    text: 'Ret. peg21',  
    datafield: 'fact_pe21',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
    hidden: false,
    aggregates: [
      {
        T: function(aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'peg21',
  },
  {
    text: '%Ret. pend.',  
    datafield: 'porc_pe21',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P',
    editable: false,
    hidden: false,
    aggregates: [
      {
        T: function(aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'peg21',
  },
  
  {
    text: 'Pend. fact.',  
    datafield: 'pend_fact_pe21',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
    hidden: false,
    aggregates: [
      {
        T: function(aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'peg21',
  },

  {
    text: 'Total',  
    datafield: 'tota_pe21',
    width: '70',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
    hidden: false,
    aggregates: [
      {
        T: function(aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'peg21',
  },
  {
    text: '%Ret. pend.',  
    datafield: 'cump_pe21',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P',
    editable: false,
    hidden: false,
    aggregates: [
      {
        T: function(aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'peg21',
    
  },
  {
      text: 'Peg42',  
      datafield: 'fact_pe42_ante',
      width: '80',
      align: 'center',
      cellsalign: 'center',
      cellsformat: 'N',
      editable: false,
      hidden: false,
      aggregates: [
        {
          T: function(aggregatedValue, currentValue) {
            aggregatedValue += currentValue
            
            return aggregatedValue
          },
        },
      ],
      columngroup: 'peg42',
  },
  {
      text: 'proyeccion de peg42',  
      datafield: 'pe42_obje',
      width: '80',
      align: 'center',
      cellsalign: 'center',
      cellsformat: 'N',
      editable: false,
      hidden: false,
      aggregates: [
        {
          T: function(aggregatedValue, currentValue) {
            aggregatedValue += currentValue
            
            return aggregatedValue
          },
        },
      ],
      columngroup: 'peg42',
  },
  {
      text: 'Objetivo',  
      datafield: 'obje_pe42',
      width: '80',
      align: 'center',
      cellsalign: 'center',
      cellsformat: 'N',
      editable: false,
      hidden: false,
      aggregates: [
        {
          T: function(aggregatedValue, currentValue) {
            aggregatedValue += currentValue
            
            return aggregatedValue
          },
        },
      ],
      columngroup: 'peg42',
    },
  {
      text: 'Ret. peg42',  
      datafield: 'fact_pe42',
      width: '100',
      align: 'center',
      cellsalign: 'center',
      cellsformat: 'N',
      editable: false,
      hidden: false,
      aggregates: [
        {
          T: function(aggregatedValue, currentValue) {
            aggregatedValue += currentValue
            
            return aggregatedValue
          },
        },
      ],
      columngroup: 'peg42',
    },
  {
      text: '% Ret. pend.',  
      datafield: 'porc_pe42',
      width: '120',
      align: 'center',
      cellsalign: 'center',
      cellsformat: 'N',
      editable: false,
      hidden: false,
      aggregates: [
        {
          T: function(aggregatedValue, currentValue) {
            aggregatedValue += currentValue
            
            return aggregatedValue
          },
        },
      ],
      columngroup: 'peg42',
    },
  {
      text: 'Pend. fact.',  
      datafield: 'pend_fact_pe42',
      width: '100',
      align: 'center',
      cellsalign: 'center',
      cellsformat: 'N',
      editable: false,
      hidden: false,
      aggregates: [
        {
          T: function(aggregatedValue, currentValue) {
            aggregatedValue += currentValue
            
            return aggregatedValue
          },
        },
      ],
      columngroup: 'peg42',
    },
  {
      text: 'Total',  
      datafield: 'tota_pe42',
      width: '70',
      align: 'center',
      cellsalign: 'center',
      cellsformat: 'N',
      editable: false,
      hidden: false,
      aggregates: [
        {
          T: function(aggregatedValue, currentValue) {
            aggregatedValue += currentValue
            
            return aggregatedValue
          },
        },
      ],
      columngroup: 'peg42',
    },
  {
      text: '% Ret. pend.',
      datafield: 'cump_pe42',  
      width: '120',
      align: 'center',
      cellsalign: 'center',
      cellsformat: 'N',
      editable: false,
      hidden: false,
      aggregates: [
        {
          T: function(aggregatedValue, currentValue) {
            aggregatedValue += currentValue
            
            return aggregatedValue
          },
        },
      ],
      columngroup: 'peg42',
    },
  {
      text: 'peg63',
      datafield: 'fact_pe63_ante',  
      width: '80',
      align: 'center',
      cellsalign: 'center',
      cellsformat: 'N',
      editable: false,
      hidden: false,
      aggregates: [
        {
          T: function(aggregatedValue, currentValue) {
            aggregatedValue += currentValue
            
            return aggregatedValue
          },
        },
      ],
      columngroup: 'peg63',
    },
    {
      text: 'proyeccion de peg63',
      datafield: 'pe63_obje',  
      width: '80',
      align: 'center',
      cellsalign: 'center',
      cellsformat: 'N',
      editable: false,
      hidden: false,
      aggregates: [
        {
          T: function(aggregatedValue, currentValue) {
            aggregatedValue += currentValue
            
            return aggregatedValue
          },
        },
      ],
      columngroup: 'peg63',
    },
    {
      text: 'Objetivo',
      datafield: 'obje_pe63',  
      width: '80',
      align: 'center',
      cellsalign: 'center',
      cellsformat: 'N',
      editable: false,
      hidden: false,
      aggregates: [
        {
          T: function(aggregatedValue, currentValue) {
            aggregatedValue += currentValue
            
            return aggregatedValue
          },
        },
      ],
      columngroup: 'peg63',
    },
  {
      text: 'Ret. peg63',
      datafield: 'fact_pe63',  
      width: '100',
      align: 'center',
      cellsalign: 'center',
      cellsformat: 'N',
      editable: false,
      hidden: false,
      aggregates: [
        {
          T: function(aggregatedValue, currentValue) {
            aggregatedValue += currentValue
            
            return aggregatedValue
          },
        },
      ],
      columngroup: 'peg63',
    },
  {
      text: '% Ret. pend.',
      datafield: 'porc_pe63',  
      width: '120',
      align: 'center',
      cellsalign: 'center',
      cellsformat: 'N',
      editable: false,
      hidden: false,
      aggregates: [
        {
          T: function(aggregatedValue, currentValue) {
            aggregatedValue += currentValue
            
            return aggregatedValue
          },
        },
      ],
      columngroup: 'peg63',
    },
  {
      text: 'Pend. fact.',
      datafield: 'pend_fact_pe63',  
      width: '100',
      align: 'center',
      cellsalign: 'center',
      cellsformat: 'N',
      editable: false,
      hidden: false,
      aggregates: [
        {
          T: function(aggregatedValue, currentValue) {
            aggregatedValue += currentValue
            
            return aggregatedValue
          },
        },
      ],
      columngroup: 'peg63',
    },
  {
      text: 'Total',
      datafield: 'tota_pe63',  
      width: '70',
      align: 'center',
      cellsalign: 'center',
      cellsformat: 'N',
      editable: false,
      hidden: false,
      aggregates: [
        {
          T: function(aggregatedValue, currentValue) {
            aggregatedValue += currentValue
            
            return aggregatedValue
          },
        },
      ],
      columngroup: 'peg63',
    },
  {
      text: '%ret. pend.',
      datafield: 'cump_pe63',  
      width: '120',
      align: 'center',
      cellsalign: 'center',
      cellsformat: 'N',
      editable: false,
      hidden: false,
      aggregates: [
        {
          T: function(aggregatedValue, currentValue) {
            aggregatedValue += currentValue
            
            return aggregatedValue
          },
        },
      ],
      columngroup: 'peg63',
    },
{
    text: 'Pegs',
    datafield: 'fact_pegs_ante',
    width: '80',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
    hidden: false,
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
    text: 'Objetivo',
    datafield: 'obje_pegs',
    width: '80',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
    hidden: false,
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
    text: 'proyeccion de retencion',
    datafield: 'pegs_obje',
    width: '80',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
    hidden: false,
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
    text: 'Ret. pegs',
    datafield: 'fact_pegs',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
    hidden: false,
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
    text: 'Cump. Fact.',
    datafield: 'porc_pegs',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P',
    editable: false,
    hidden: false,
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
    text: 'Pend. fact.', 
    datafield: 'pend_fact_pegs',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
    hidden: false,
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
    text: 'Total',
    datafield: 'tota_pegs',
    width: '70',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
    hidden: false,
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
    text: '% Cump',
    datafield: 'cump_pegs',
    width: '80',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P',
    editable: false,
    hidden: false,
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
    text: 'Pos. reing.',
    datafield: 'fact_rein_ante',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
    hidden: false,
    aggregates: [
      {

        T: function(aggregatedValue, currentValue) {
  
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'rein',
  },
  {
    text: 'Objetivo',
    datafield: 'obje_rein',
    width: '80',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
    hidden: false,
    aggregates: [
      {

        T: function(aggregatedValue, currentValue) {
  
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'rein',
  },
    {
    text: 'proyeccion de reingresos',
    datafield: 'rein_obje',
    width: '80',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
    hidden: false,
    aggregates: [
      {

        T: function(aggregatedValue, currentValue) {
  
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'rein',
  },
  {
    text: 'Facturado',
    datafield: 'fact_rein',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
    hidden: false,
    aggregates: [
      {

        T: function(aggregatedValue, currentValue) {
  
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'rein',
  },
  {
    text: 'Cump. fact.',
    datafield: 'porc_rein',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
    hidden: false,
    aggregates: [
      {

        T: function(aggregatedValue, currentValue) {
  
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'rein',
  },
  {
    text: 'Pend. fact.',
    datafield: 'pend_fact_rein',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
    hidden: false,
    aggregates: [
      {

        T: function(aggregatedValue, currentValue) {
  
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'rein',
  },
  {
    text: 'Total',
    datafield: 'tota_fact_rein',
    width: '70',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
    hidden: false,
    aggregates: [
      {

        T: function(aggregatedValue, currentValue) {
  
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'rein',
  },
  {
    text: '% Cump.',
    datafield: 'cump_rein',
    width: '80',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
    hidden: false,
    aggregates: [
      {

        T: function(aggregatedValue, currentValue) {
  
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'rein',
  },
   {
    text: 'Objetivo',
    datafield: 'obje_capi',
    width: '80',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    hidden: false,
    aggregates: [
      {

        T: function(aggregatedValue, currentValue) {
  
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'capi',
    editable: false,
  },
  {
    text: 'proyeccion de capitalizacion',
    datafield: 'capi_obje',
    width: '80',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    hidden: false,
    aggregates: [
      {

        T: function(aggregatedValue, currentValue) {
  
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'capi',
    editable: false,
  },
  {
    text: 'Facturado',
    datafield: 'fact_capi',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    hidden: false,
    aggregates: [
      {

        T: function(aggregatedValue, currentValue) {
  
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'capi',
    editable: false,
  },
  {
    text: 'Capi. pend.',
    datafield: 'tota_capi_pend',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    hidden: false,
    aggregates: [
      {

        T: function(aggregatedValue, currentValue) {
  
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'capi',
    editable: false,
  },

  {
    text: 'Objetivo',
    datafield: 'obje_tota',
    width: '80',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
    hidden: false,
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
    text: 'proyeccion de pedidos totales',
    datafield: 'proy_pedi_tota',
    width: '80',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
    hidden: false,
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
    datafield: 'fact_tota',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
    hidden: false,
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
    text: 'Cump. Fact',
    datafield: 'cump_fact_tota',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
    hidden: false,
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
    text: 'Pend. Fact',
    datafield: 'pend_fact_tota',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
    hidden: false,
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
    text: 'Total',
    datafield: 'tota_tota',
    width: '70',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
    hidden: false,
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
    text: 'Objetivo Ventas',
    datafield: 'obje_vent',
    width: '150',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
    hidden: false,
    aggregates: [
      {

        T: function(aggregatedValue, currentValue) {
  
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'vent',
  },
  {
    text: 'Venta',
    datafield: 'fact_vent',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
    hidden: false,
    aggregates: [
      {

        T: function(aggregatedValue, currentValue) {
  
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'vent',
  },

]

const columnasGrupo = [
  
  {
    text: 'Incorporación',
    align: 'center',
    name: 'inco',
  },
  
  {
    text: 'Capitalización',
    align: 'center',
    name: 'capi',
  },
  
  {
    text: 'Consecutividad',
    align: 'center',
    name: 'Cons',
  },
  {
    text: 'Consecutividad 2do pedido 100%',
    align: 'center',
    name: 'Cons_2',
  },
  {
    text: 'Consecutividad 3er pedido 80%',
    align: 'center',
    name: 'Cons_3',
  },
  {
    text: 'Consecutividad 4to pedido 70%',
    align: 'center',
    name: 'Cons_4',
  },
  {
    text: 'Peg21 Minimo 50%',
    align: 'center',
    name: 'peg21',
  },
  {
    text: 'Peg42 Minimo 35%',
    align: 'center',
    name: 'peg42',
  },
  {
    text: 'Peg63 Minimo 25%',
    align: 'center',
    name: 'peg63',
  },
  {
    text: 'Retención Total', 
    align: 'center',
    name: 'rete',
  },
   {
    text: 'Reingresos', 
    align: 'center',
    name: 'rein',
  },
  {
    text: 'Pedidos totales',
    align: 'center',
    name: 'tota',
  },
  {
    text: 'Venta',
    align: 'center',
    name: 'vent',
  },
]

const sourceGlobal = ref({
  localdata: [],
  datafields: [
    { name: 'codi_area', type: 'string' },
    { name: 'obse_zona', type: 'string' },
    { name: 'cons_rete_prim', type: 'string' },
   { name: 'cons_segu_obje', type: 'string' },
      { name: 'pegs_obje', type: 'string' },
      { name: 'rein_obje', type: 'string' },
      { name: 'capi_obje', type: 'string' },
    { name: 'tota_zona', type: 'number' },
    { name: 'tota_obje', type: 'number' },
    { name: 'tota_proy', type: 'number' },
    { name: 'tota_segui', type: 'number' },
    { name: 'obje_inco', type: 'number' },
    { name: 'obje_inco_prim', type: 'number' },
    { name: 'obje_inco_segu', type: 'number' },
    { name: 'obje_cons_lide', type: 'number' },
    { name: 'cons_terc_obje', type: 'number' },
    { name: 'fact_inco', type: 'number' },
     { name: 'obje_inco_prime', type: 'number' },
    { name: 'pedi_inco_pend', type: 'number' },
    { name: 'cump_inco', type: 'number' },
    { name: 'dife_inco_tota', type: 'number' },
   { name: 'pe21_obje', type: 'number' },
   { name: 'pe42_obje', type: 'number' },
    { name: 'tota_inco', type: 'number' },
    { name: 'cump_inco_fact', type: 'number' },
     { name: 'proy_pedi_tota', type: 'number' },
    { name: 'pend_inco_fact', type: 'number' },
    { name: 'obje_rete_cons', type: 'number' },
    { name: 'fact_rete_cons', type: 'number' },
    { name: 'cump_fact_rete_cons', type: 'number' },
    { name: 'pend_fact_rete_cons', type: 'number' }, 
    { name: 'tota_rete_cons', type: 'number' },
    { name: 'cump_rete_cons', type: 'number' },
    { name: 'obje_rete_cons_segu', type: 'number' },
    { name: 'fact_rete_cons_segu', type: 'number' },
    { name: 'cump_fact_rete_cons_segu', type: 'number' },
    { name: 'pend_fact_rete_cons_segu', type: 'number' },
    { name: 'tota_rete_cons_segu', type: 'number' },
    { name: 'cump_rete_cons_segu', type: 'number' },
    { name: 'obje_rete_cons_terc', type: 'number' },
    { name: 'fact_rete_cons_terc', type: 'number' },
    { name: 'cump_fact_rete_cons_terc', type: 'number' },
    { name: 'pend_fact_rete_cons_terc', type: 'number' },
    { name: 'tota_rete_cons_terc', type: 'number' },
    { name: 'cump_rete_cons_terc', type: 'number' },
    { name: 'obje_rete_cons_cuar', type: 'number' },
    { name: 'fact_rete_cons_cuar', type: 'number' },
    { name: 'cump_fact_rete_cons_cuar', type: 'number' },
    { name: 'pend_fact_rete_cons_cuar', type: 'number' },
    { name: 'tota_rete_cons_cuar', type: 'number' },
    { name: 'cump_rete_cons_cuar', type: 'number' },
    { name: 'fact_pe21_ante', type: 'number' },
    { name: 'obje_pe21', type: 'number' },
    { name: 'fact_pe21', type: 'number' },
    { name: 'porc_pe21', type: 'number' },
    { name: 'pend_fact_pe21', type: 'number' },
    { name: 'tota_pe21', type: 'number' },
    { name: 'cump_pe21', type: 'number' },
    { name: 'fact_pe42_ante', type: 'number' },
    { name: 'obje_pe42', type: 'number' },
    { name: 'fact_pe42', type: 'number'},
    { name: 'porc_pe42', type: 'number'},
    { name: 'pend_fact_pe42', type: 'number'},
    { name: 'tota_pe42', type: 'number'},
    { name: 'cump_pe42', type: 'number'},
    { name: 'fact_pe63_ante', type: 'number'},
    { name: 'obje_pe63', type: 'number'},
    { name: 'fact_pe63', type: 'number'},
    { name: 'porc_pe63', type: 'number'},
    { name: 'pend_fact_pe63', type: 'number'},
    { name: 'tota_pe63', type: 'number'},
    { name: 'cump_pe63', type: 'number'},
    { name: 'fact_pegs_ante', type: 'number' },
    { name: 'obje_pegs', type: 'number' },
    { name: 'obje_rete_prim', type: 'number' },
   { name: 'pe63_obje', type: 'number' },
    { name: 'obje_rete_segu', type: 'number' },
    { name: 'fact_pegs', type: 'number' },
    { name: 'porc_pegs', type: 'number' },
    { name: 'pedi_rete_pend', type: 'number' },
    { name: 'pend_fact_pegs', type: 'number' },
    { name: 'tota_pegs', type: 'number' },
    { name: 'cump_pegs', type: 'number' },
    { name: 'fact_rein_ante', type: 'number' },
    { name: 'obje_rein', type: 'number' },
    { name: 'fact_rein', type: 'number' },
    { name: 'porc_rein', type: 'number' },
    { name: 'pend_fact_rein', type: 'number' },
    { name: 'tota_fact_rein', type: 'number' },
    { name: 'cump_rein', type: 'number' },
    { name: 'obje_rete_cier', type: 'number' },
    { name: 'pedi_rete_fact', type: 'number' },
    { name: 'pedi_rete_pend', type: 'number' },
    { name: 'obje_rete_cier_tota', type: 'number' },
    { name: 'cump_rete_esti', type: 'number' },
    { name: 'cump_rete_cier', type: 'number' },
    { name: 'dife_rete_1', type: 'number' },
    { name: 'dife_rete_2', type: 'number' },
    { name: 'dife_rete_3', type: 'number' },  
    { name: 'obje_tota', type: 'number' },
    { name: 'fact_tota', type: 'number' },
    { name: 'cump_fact_tota', type: 'number' },
    { name: 'pend_fact_tota', type: 'number' },
    { name: 'tota_tota', type: 'number' },
    { name: 'obje_vent', type: 'number' },
    { name: 'fact_vent', type: 'number' },
    { name: 'obje_tota_prim', type: 'number' },
   
    { name: 'obje_tota_segu', type: 'number' },
  

    { name: 'pedi_tota_pend', type: 'number' },

    { name: 'fact_capi', type: 'number' },
    { name: 'tota_capi_pend', type: 'number' },
    { name: 'obje_capi', type: 'number' },
    { name: 'porc_aser', type: 'number' },

    { name: 'acti_inic', type: 'number' },
    { name: 'nume_pedi', type: 'number' },
    { name: 'tota_ingr', type: 'number' },
    { name: 'tota_rein', type: 'number' },
  ],
  datatype: 'json',
})


const adaptadorGlobal = new jqx.dataAdapter(sourceGlobal.value)

const refGridGlobal = ref()
const refGridDetalle = ref()
      
const campanaOptions = ref([])
const errorCampana = ref(false)
const errorMensajeCampana = ref('')

const localization = appStore.localization

onMounted(async () => {
  appStore.titulo(`Reportes / Seguimiento cierre pais`)
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
    appStore.mensaje('Obteniendo información')
    appStore.loading(true)
    limpiarValidacion()
    
    const { data } = await $api(`/api/sami/v1/reportes/seguimiento-cierre-pais`, {
      method: "get",
      query: {
        campana: (formulario.value.campana === null) ? '' : formulario.value.campana,
      },
    })

    sourceGlobal.value.localdata =  data.data_glob
    refGridGlobal.value.updatebounddata('cells')
    refGridGlobal.value.refreshfilterrow()

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
  }
  sourceGlobal.value.localdata = []
  refGridGlobal.value.updatebounddata('cells')
  refGridGlobal.value.refreshfilterrow()

}

const onExcel = async () => {
  const dataInfoGlob = refGridGlobal.value.getdatainformation()
  const dataRowsGlob = dataInfoGlob.rowscount
  if(dataRowsGlob == 0 ) {
    appStore.mensajeSnackbar('No tiene ningun seguimiento de cierre por exportar.')
    appStore.color("error")
    appStore.snackbar(true)
  }  else {
    try {
      appStore.mensaje('Generando archivo')
      appStore.loading(true)
      const columns = refGridGlobal.value.columns;
      let visi_colu=[];
      columns.forEach((column, index) => {
        if (!column.hidden || column.datafield == 'codi_sect') {
          // visi_colu.push(column.datafield)
          visi_colu.push({"key":column.datafield,"title":column.text})
        }
      });

      
      console.log(visi_colu)
      const { data } = await $api(`/api/sami/v1/reportes/seguimiento-cierre-pais/excel`, {
        method: "post",
        body: {
          cabeceraGlobal: visi_colu,
          detalleGlobal: JSON.stringify(refGridGlobal.value.exportdata('xml')),

        },
      })
    
      window.open(`${$base}/temporales/${data}`, '_blank')
    } catch (e) {
      console.log(e)
    }
    finally {
      appStore.loading(false)
    }
  }
}

// const onRegistrar = async () => {
//   const dataInfoGlob = refGridGlobal.value.getdatainformation()
//   const dataRowsGlob = dataInfoGlob.rowscount
//   if(dataRowsGlob == 0 ) {
//     appStore.mensajeSnackbar('No tiene ningun seguimiento de cierre por registrar.')
//     appStore.color("error")
//     appStore.snackbar(true)
//   } else {
//     try {
//       appStore.mensaje('Generando proceso')
//       appStore.loading(true)

//       const data  = await $api(`/api/sami/v1/reportes/seguimiento-cierre-pais`, {
//         method: "post",
//         body: {
//           campana: (formulario.value.campana === null) ? '' : formulario.value.campana,
//           data: JSON.stringify(
//             refGridGlobal.value.exportdata(
//               'xml',
//               null,
//               false,
//               null,
//               true,
//             ),
//           ),
//         },
//       })
    
//       appStore.mensajeSnackbar(`${data.message}`)
//       appStore.color("success")
//       appStore.snackbar(true)
//     } catch (e) {
//     }
//     finally {
//       appStore.loading(false)
//     }
//   }
// }

const limpiarValidacion = () => {
  errorCampana.value = false
  errorMensajeCampana.value = ''
}

// const onEditar = event => {
//   const { args } = event
//   const columnDataField = args.datafield
//   const rowIndex = args.rowindex
//   const cellValue = args.value
//   if (columnDataField === 'obje_inco_cier') {
//     let objeReteCier = refGridGlobal.value.getcellvaluebyid(rowIndex, 'obje_rete_cier')
//     let objeTota = refGridGlobal.value.getcellvaluebyid(rowIndex, 'obje_tota')
//     let objeInco = refGridGlobal.value.getcellvaluebyid(rowIndex, 'obje_inco')
//     const objeIncoCier = parseInt(cellValue)
//     if (!Number.isNaN(objeIncoCier)) {
//       objeReteCier = parseInt(objeReteCier)
//       objeTota = parseInt(objeTota)
//       objeInco = parseInt(objeInco)
//       let objeTotaCier = parseInt(objeReteCier) + parseInt(objeIncoCier)
//       let porcIncoCier = (parseInt(objeIncoCier) / parseInt(objeInco)) * 100
//       porcIncoCier = parseFloat(porcIncoCier).toFixed(2)
//       let porcTotaCier = (parseInt(objeTotaCier) / parseInt(objeTota)) * 100
//       porcTotaCier = parseFloat(porcTotaCier).toFixed(2)

//       refGridGlobal.value.setcellvalue(rowIndex, 'porc_inco_cier', porcIncoCier)
//       refGridGlobal.value.setcellvalue(rowIndex, 'porc_tota_cier', porcTotaCier)
//     }
//   } else if (columnDataField === 'obje_rete_cier') {
//     let objeIncoCier = refGridGlobal.value.getcellvaluebyid(rowIndex, 'obje_inco_cier')
//     let objeTota = refGridGlobal.value.getcellvaluebyid(rowIndex, 'obje_tota')
//     let objeRete = refGridGlobal.value.getcellvaluebyid(rowIndex, 'obje_rete')
//     const objeReteCier = parseInt(cellValue)
//     if (!Number.isNaN(objeReteCier)) {
//       objeIncoCier = parseInt(objeIncoCier)
//       objeTota = parseInt(objeTota)
//       objeRete = parseInt(objeRete)
      
//       const objeTotaCier = parseInt(objeReteCier) + parseInt(objeIncoCier)
//       let porcReteCier = (parseInt(objeReteCier) / parseInt(objeRete)) * 100
//       porcReteCier = parseFloat(porcReteCier).toFixed(2)
//       let porcTotaCier = (parseInt(objeTotaCier) / parseInt(objeTota)) * 100
//       porcTotaCier = parseFloat(porcTotaCier).toFixed(2)

//       refGridGlobal.value.setcellvalue(rowIndex, 'porc_rete_cier', porcReteCier)
//       refGridGlobal.value.setcellvalue(rowIndex, 'porc_tota_cier', porcTotaCier)
//     }
//   }
// }
</script>

<template>
  <div>
    <AppPlantilla>
      <template #botones>
        <GenerarBoton @procesar="onGenerar" />
        <ExcelBoton @procesar="onExcel" />
        <!-- <RegistrarBoton @procesar="onRegistrar" /> -->
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
                </VRow>
              </VCardText>
            </VCard>
          </VCol>

          <VCol cols="12">
            <VCard title="Consolidado corte">
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
                  editable
                  editmode="click"
                  @cellendedit="onEditar($event)"
                />
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </template>
    </AppPlantilla>
  </div>
</template>
