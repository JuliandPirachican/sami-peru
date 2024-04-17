<!-- eslint-disable camelcase -->
<script setup>
import { useAppStore } from '@/stores/app'
import JqxGrid from "jqwidgets-scripts/jqwidgets-vue3/vue_jqxgrid.vue"

definePage({
  meta: {
    action: 'peru/repo_come_segu_cier_camp_pais',
    subject: 'peru/repo_come_segu_cier_camp_pais',
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

// eslint-disable-next-line sonarjs/no-identical-functions
const claseAsertividad = (row, columnfield, value) => {
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
    key: 'obje_inco_camp',
  },
  {
    title: '% Proyección',
    key: 'porc_inco_prim',
  },
  {
    title: '% Reproyección',
    key: 'porc_inco_segu',
  },
  {
    title: 'Estimacion de cierre',
    key: 'obje_inco_cier',
  },
  {
    title: 'Facturacion',
    key: 'pedi_inco_fact',
  },
  {
    title: 'Dif  sol con ped. vs sin ped.',
    key: 'dife_inco_1',
  },
  {
    title: 'Dif cierre vs obj',
    key: 'dife_inco_2',
  },
  {
    title: 'Total estimacion vs obj',
    key: 'dife_inco_3',
  },
  {
    title: 'Total cierre vs obj',
    key: 'obje_inco_cier_tota',
  },
  {
    title: '% Cump. estimación',
    key: 'cump_inco_esti',
  },
  {
    title: '% Cump. cierre',
    key: 'cump_inco_cier',
  },
  {
    title: 'Objetivo',
    key: 'obje_rete_camp',
  },
  {
    title: '% Proyección',
    key: 'porc_rete_prim',
  },
  {
    title: '% Reproyección',
    key: 'porc_rete_segu',
  },
  {
    title: 'Estimacion de cierre',
    key: 'obje_rete_cier',
  },
  {
    title: 'Facturacion',
    key: 'pedi_rete_fact',
  },
  {
    title: 'Dif sol con ped. vs sin ped.',
    key: 'dife_rete_1',
  },
  {
    title: 'Dif cierre vs obj',
    key: 'dife_rete_2',
  },
  {
    title: 'Total estimacion vs obj',
    key: 'dife_rete_3',
  },
  {
    title: 'Total cierre vs obj',
    key: 'obje_rete_cier_tota',
  },
  {
    title: '% Cump. estimación',
    key: 'cump_rete_esti',
  },
  {
    title: '% Cump. cierre',
    key: 'cump_rete_cier',
  },
  {
    title: 'Objetivo',
    key: 'obje_acti_prim',
  },
  {
    title: 'Estimación',
    key: 'obje_acti_cier',
  },
  {
    title: 'Facturacion',
    key: 'obje_acti_fact',
  },
  {
    title: 'Objetivo',
    key: 'obje_tota_camp',
  },
  {
    title: '% Proyección',
    key: 'porc_tota_prim',
  },
  {
    title: '% Reproyección',
    key: 'porc_tota_segu',
  },
  {
    title: 'Estimacion de cierre',
    key: 'obje_tota_cier',
  },
  {
    title: 'Facturacion',
    key: 'pedi_tota_fact',
  },
  {
    title: 'Dif  sol con ped. vs sin ped.',
    key: 'dife_tota_1',
  },
  {
    title: 'Dif cierre vs obj',
    key: 'dife_tota_2',
  },
  {
    title: 'Total estimacion vs obj',
    key: 'dife_tota_3',
  },
  {
    title: 'Total cierre vs obj',
    key: 'obje_tota_cier_tota',
  },
  {
    title: '% Cump. estimación',
    key: 'cump_tota_esti',
  },
  {
    title: '% Cump. cierre',
    key: 'cump_tota_cier',
  },
  {
    title: 'Estimación',
    key: 'obje_capi_cier',
  },
  {
    title: 'Facturado',
    key: 'capi_actu',
  },
  {
    title: '% Asertividad',
    key: 'porc_aser',
  },
]

const cabeceraDetalle = [
  {
    title: 'Corte',
    key: 'codi_cort',
  },
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
    key: 'obje_inco_camp',
  },
  {
    title: '% Proyección',
    key: 'porc_inco_prim',
  },
  {
    title: '% Reproyección',
    key: 'porc_inco_segu',
  },
  {
    title: 'Estimacion de cierre',
    key: 'obje_inco_cier',
  },
  {
    title: 'Facturacion',
    key: 'pedi_inco_fact',
  },
  {
    title: 'Dif  sol con ped. vs sin ped.',
    key: 'dife_inco_1',
  },
  {
    title: 'Dif cierre vs obj',
    key: 'dife_inco_2',
  },
  {
    title: 'Total estimacion vs obj',
    key: 'dife_inco_3',
  },
  {
    title: 'Total cierre vs obj',
    key: 'obje_inco_cier_tota',
  },
  {
    title: '% Cump. estimación',
    key: 'cump_inco_esti',
  },
  {
    title: '% Cump. cierre',
    key: 'cump_inco_cier',
  },
  {
    title: 'Objetivo',
    key: 'obje_rete_camp',
  },
  {
    title: '% Proyección',
    key: 'porc_rete_prim',
  },
  {
    title: '% Reproyección',
    key: 'porc_rete_segu',
  },
  {
    title: 'Estimacion de cierre',
    key: 'obje_rete_cier',
  },
  {
    title: 'Facturacion',
    key: 'pedi_rete_fact',
  },
  {
    title: 'Dif  sol con ped. vs sin ped.',
    key: 'dife_rete_1',
  },
  {
    title: 'Dif cierre vs obj',
    key: 'dife_rete_2',
  },
  {
    title: 'Total estimacion vs obj',
    key: 'dife_rete_3',
  },
  {
    title: 'Total cierre vs obj',
    key: 'obje_rete_cier_tota',
  },
  {
    title: '% Cump. estimación',
    key: 'cump_rete_esti',
  },
  {
    title: '% Cump. cierre',
    key: 'cump_rete_cier',
  },
  {
    title: 'Objetivo',
    key: 'obje_acti_prim',
  },
  {
    title: 'Estimación',
    key: 'obje_acti_cier',
  },
  {
    title: 'Facturacion',
    key: 'obje_acti_fact',
  },
  {
    title: 'Objetivo',
    key: 'obje_tota_camp',
  },
  {
    title: '% Proyección',
    key: 'porc_tota_prim',
  },
  {
    title: '% Reproyección',
    key: 'porc_tota_segu',
  },
  {
    title: 'Estimacion de cierre',
    key: 'obje_tota_cier',
  },
  {
    title: 'Facturacion',
    key: 'pedi_tota_fact',
  },
  {
    title: 'Dif sol con ped. vs sin ped.',
    key: 'dife_tota_1',
  },
  {
    title: 'Dif cierre vs obj',
    key: 'dife_tota_2',
  },
  {
    title: 'Total estimacion vs obj',
    key: 'dife_tota_3',
  },
  {
    title: 'Total cierre vs obj',
    key: 'obje_tota_cier_tota',
  },
  {
    title: '% Cump. estimación',
    key: 'cump_tota_esti',
  },
  {
    title: '% Cump. cierre',
    key: 'cump_tota_cier',
  },
  {
    title: 'Estimación',
    key: 'obje_capi_cier',
  },
  {
    title: 'Facturado',
    key: 'capi_actu',
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
    width: '60',
    align: 'center',
    cellsalign: 'center',
    filtertype: 'checkedlist',
    pinned: true,
    editable: false,
  },
  {
    text: 'Nro zonas',
    datafield: 'tota_zona',
    width: '80',
    align: 'center',
    cellsalign: 'center',
    pinned: true,
    editable: false,
  },
  {
    text: 'Objetivo',
    datafield: 'obje_inco_camp',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
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
    text: '% Proyección',
    datafield: 'porc_inco_prim',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P',
    editable: false,
    aggregates: [
      {

        T: function (aggregatedValue, currentValue, column, record) {
          
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.obje_inco_prim
          sumaObje += record.obje_inco_camp
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
    text: '% Reproyección',
    datafield: 'porc_inco_segu',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P',
    editable: false,
    aggregates: [
      {

        T: function (aggregatedValue, currentValue, column, record) {
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.obje_inco_segu
          sumaObje += record.obje_inco_camp
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
    text: 'Estimacion de cierre',
    datafield: 'obje_inco_cier',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
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
    text: 'Facturacion',
    datafield: 'pedi_inco_fact',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
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
    text: 'Dif sol con ped. vs sin ped.',
    datafield: 'dife_inco_1',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
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
    text: 'Dif cierre vs obj',
    datafield: 'dife_inco_2',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
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
    text: 'Total estimacion vs obj',
    datafield: 'dife_inco_3',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
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
    text: 'Total cierre vs obj',
    datafield: 'obje_inco_cier_tota',
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
    editable: true,
    validation(cell, value) {
      if (value === '0') {
        return true
      }
      
      return !(value === '')
    },
    cellclassname() {
      return 'text-secondary bg-primary-light'
    },
  },
  {
    text: '% Cump. estimación',
    datafield: 'cump_inco_esti',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P',
    editable: false,
    aggregates: [
      {

        T: function (aggregatedValue, currentValue, column, record) {
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.obje_inco_cier
          sumaObje += record.obje_inco_camp
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
    text: '% Cump. cierre',
    datafield: 'cump_inco_cier',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P',
    editable: false,
    aggregates: [
      {

        T: function (aggregatedValue, currentValue, column, record) {
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.obje_inco_cier_tota
          sumaObje += record.obje_inco_camp
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
    cellclassname: claseCumplimientoIncorporacionCierre,
  },

  {
    text: 'Objetivo',
    datafield: 'obje_rete_camp',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
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
    text: '% Proyección',
    datafield: 'porc_rete_prim',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P',
    editable: false,
    aggregates: [
      {

        T: function (aggregatedValue, currentValue, column, record) {
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.obje_rete_prim
          sumaObje += record.obje_rete_camp
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
  },
  {
    text: '% Reproyección',
    datafield: 'porc_rete_segu',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P',
    editable: false,
    aggregates: [
      {

        T: function (aggregatedValue, currentValue, column, record) {
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.obje_rete_segu
          sumaObje += record.obje_rete_camp
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
  },
  {
    text: 'Estimacion de cierre',
    datafield: 'obje_rete_cier',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
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
    text: 'Facturacion',
    datafield: 'pedi_rete_fact',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
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
    text: 'Dif  sol con ped. vs sin ped.',
    datafield: 'dife_rete_1',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
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
    text: 'Dif cierre vs obj',
    datafield: 'dife_rete_2',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
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
    text: 'Total estimacion vs obj',
    datafield: 'dife_rete_3',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
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
    text: 'Total cierre vs obj',
    datafield: 'obje_rete_cier_tota',
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
    editable: true,
    validation(cell, value) {
      if (value === '0') {
        return true
      }
      
      return !(value === '')
    },
    cellclassname() {
      return 'text-secondary bg-primary-light'
    },
  },
  {
    text: '% Cump. estimación',
    datafield: 'cump_rete_esti',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P',
    editable: false,
    aggregates: [
      {

        T: function (aggregatedValue, currentValue, column, record) {
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.obje_rete_cier
          sumaObje += record.obje_rete_camp
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
    cellclassname: claseCumplimientoRetencionEstimado,
  },
  {
    text: '% Cump. cierre',
    datafield: 'cump_rete_cier',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P',
    editable: false,
    aggregates: [
      {

        T: function (aggregatedValue, currentValue, column, record) {
          
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.obje_rete_cier_tota
          sumaObje += record.obje_rete_camp
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
    cellclassname: claseCumplimientoRetencionCierre,
  },
  {
    text: 'Objetivo',
    datafield: 'obje_acti_prim',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P2',
    editable: false,
    columngroup: 'acti',
  },
  {
    text: 'Estimación',
    datafield: 'obje_acti_cier',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P2',
    editable: false,
    columngroup: 'acti',
  },
  {
    text: 'Facturacion',
    datafield: 'obje_acti_fact',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P2',
    editable: false,
    aggregates: [
      {

        'T': function(aggregatedValue, currentValue, column, record) {
          
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
  },
  {
    text: 'Objetivo',
    datafield: 'obje_tota_camp',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
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
    text: '% Proyección',
    datafield: 'porc_tota_prim',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P',
    editable: false,
    aggregates: [
      {

        T: function (aggregatedValue, currentValue, column, record) {
          
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.obje_tota_prim
          sumaObje += record.obje_tota_camp
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
  },
  {
    text: '% Reproyección',
    datafield: 'porc_tota_segu',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P',
    editable: false,
    aggregates: [
      {

        T: function (aggregatedValue, currentValue, column, record) {
          
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.obje_tota_segu
          sumaObje += record.obje_tota_camp
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
  },
  {
    text: 'Estimacion de cierre',
    datafield: 'obje_tota_cier',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
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
    text: 'Facturacion',
    datafield: 'pedi_tota_fact',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
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
    text: 'Dif  sol con ped. vs sin ped.',
    datafield: 'dife_tota_1',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
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
    text: 'Dif cierre vs obj',
    datafield: 'dife_tota_2',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
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
    text: 'Total estimacion vs obj',
    datafield: 'dife_tota_3',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
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
    text: 'Total cierre vs obj',
    datafield: 'obje_tota_cier_tota',
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
    editable: false,
  },
  {
    text: '% Cump. estimación',
    datafield: 'cump_tota_esti',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P',
    editable: false,
    aggregates: [
      {

        T: function (aggregatedValue, currentValue, column, record) {
          
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.obje_tota_cier
          sumaObje += record.obje_tota_camp
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
    cellclassname: claseCumplimientoTotalEstimado,
  },
  {
    text: '% Cump. cierre',
    datafield: 'cump_tota_cier',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P',
    editable: false,
    aggregates: [
      {

        T: function (aggregatedValue, currentValue, column, record) {
          
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.obje_tota_cier_tota
          sumaObje += record.obje_tota_camp
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
    cellclassname: claseCumplimientoTotalCierre,
  },
  {
    text: 'Estimación',
    datafield: 'obje_capi_cier',
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
    columngroup: 'capi',
    editable: false,
  },
  {
    text: 'Facturado',
    datafield: 'capi_actu',
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
    columngroup: 'capi',
    editable: false,
  },
  {
    text: '% Asertividad',
    datafield: 'porc_aser',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P',
    aggregates: [
      {

        T: function (aggregatedValue, currentValue, column, record) {
          
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.pedi_tota_fact
          sumaObje += record.obje_tota_cier_tota
          let total = 0
  
          if (parseInt(sumaObje) > 0 && parseInt(sumaFact) > 0) {
    
            total = 100 * (parseInt(sumaFact) / parseInt(sumaObje))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
    editable: false,
    cellclassname: claseAsertividad,
  },
]

const columnasDetalle = [
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
    text: 'Corte',
    datafield: 'codi_cort',
    width: '60',
    align: 'center',
    cellsalign: 'center',
    filtertype: 'checkedlist',
    pinned: true,
    editable: false,
  },
  {
    text: 'Región',
    datafield: 'codi_area',
    width: '60',
    align: 'center',
    cellsalign: 'center',
    filtertype: 'checkedlist',
    pinned: true,
    editable: false,
  },
  {
    text: 'Nro zonas',
    datafield: 'tota_zona',
    width: '80',
    align: 'center',
    cellsalign: 'center',
    pinned: true,
    editable: false,
  },
  {
    text: 'Objetivo',
    datafield: 'obje_inco_camp',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
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
    text: '% Proyección',
    datafield: 'porc_inco_prim',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P',
    editable: false,
    aggregates: [
      {

        T: function (aggregatedValue, currentValue, column, record) {
          
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.obje_inco_prim
          sumaObje += record.obje_inco_camp
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
    text: '% Reproyección',
    datafield: 'porc_inco_segu',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P',
    editable: false,
    aggregates: [
      {

        T: function (aggregatedValue, currentValue, column, record) {
          
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.obje_inco_segu
          sumaObje += record.obje_inco_camp
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
    text: 'Estimacion de cierre',
    datafield: 'obje_inco_cier',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
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
    text: 'Facturacion',
    datafield: 'pedi_inco_fact',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
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
    text: 'Dif  sol con ped. vs sin ped.',
    datafield: 'dife_inco_1',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
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
    text: 'Dif cierre vs obj',
    datafield: 'dife_inco_2',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
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
    text: 'Total estimacion vs obj',
    datafield: 'dife_inco_3',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
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
    text: 'Total cierre vs obj',
    datafield: 'obje_inco_cier_tota',
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
    editable: true,
    validation(cell, value) {
      if (value === '0') {
        return true
      }
      
      return !(value === '')
    },
    cellclassname() {
      return 'text-secondary bg-primary-light'
    },
  },
  {
    text: '% Cump. estimación',
    datafield: 'cump_inco_esti',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P',
    editable: false,
    aggregates: [
      {

        T: function (aggregatedValue, currentValue, column, record) {
          
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.obje_inco_cier
          sumaObje += record.obje_inco_camp
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
    text: '% Cump. cierre',
    datafield: 'cump_inco_cier',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P',
    editable: false,
    aggregates: [
      {

        T: function (aggregatedValue, currentValue, column, record) {
          
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.obje_inco_cier_tota
          sumaObje += record.obje_inco_camp
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
    cellclassname: claseCumplimientoIncorporacionCierre,
  },

  {
    text: 'Objetivo',
    datafield: 'obje_rete_camp',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
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
    text: '% Proyección',
    datafield: 'porc_rete_prim',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P',
    editable: false,
    aggregates: [
      {

        T: function (aggregatedValue, currentValue, column, record) {
          
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.obje_rete_prim
          sumaObje += record.obje_rete_camp
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
  },
  {
    text: '% Reproyección',
    datafield: 'porc_rete_segu',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P',
    editable: false,
    aggregates: [
      {

        T: function (aggregatedValue, currentValue, column, record) {
          
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.obje_rete_segu
          sumaObje += record.obje_rete_camp
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
  },
  {
    text: 'Estimacion de cierre',
    datafield: 'obje_rete_cier',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
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
    text: 'Facturacion',
    datafield: 'pedi_rete_fact',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
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
    text: 'Dif  sol con ped. vs sin ped.',
    datafield: 'dife_rete_1',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
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
    text: 'Dif cierre vs obj',
    datafield: 'dife_rete_2',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
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
    text: 'Total estimacion vs obj',
    datafield: 'dife_rete_3',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
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
    text: 'Total cierre vs obj',
    datafield: 'obje_rete_cier_tota',
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
    editable: true,
    validation(cell, value) {
      if (value === '0') {
        return true
      }
      
      return !(value === '')
    },
    cellclassname() {
      return 'text-secondary bg-primary-light'
    },
  },
  {
    text: '% Cump. estimación',
    datafield: 'cump_rete_esti',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P',
    editable: false,
    aggregates: [
      {

        T: function (aggregatedValue, currentValue, column, record) {
          
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.obje_rete_cier
          sumaObje += record.obje_rete_camp
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
    cellclassname: claseCumplimientoRetencionEstimado,
  },
  {
    text: '% Cump. cierre',
    datafield: 'cump_rete_cier',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P',
    editable: false,
    aggregates: [
      {

        T: function (aggregatedValue, currentValue, column, record) {
          
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.obje_rete_cier_tota
          sumaObje += record.obje_rete_camp
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
    cellclassname: claseCumplimientoRetencionCierre,
  },
  {
    text: 'Objetivo',
    datafield: 'obje_acti_prim',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P2',
    editable: false,
    columngroup: 'acti',
  },
  {
    text: 'Estimación',
    datafield: 'obje_acti_cier',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P2',
    editable: false,
    columngroup: 'acti',
  },
  {
    text: 'Facturacion',
    datafield: 'obje_acti_fact',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P2',
    editable: false,
    aggregates: [
      {

        'T': function(aggregatedValue, currentValue, column, record) {
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
  },
  {
    text: 'Objetivo',
    datafield: 'obje_tota_camp',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
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
    text: '% Proyección',
    datafield: 'porc_tota_prim',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P',
    editable: false,
    aggregates: [
      {

        T: function (aggregatedValue, currentValue, column, record) {
          
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.obje_tota_prim
          sumaObje += record.obje_tota_camp
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
  },
  {
    text: '% Reproyección',
    datafield: 'porc_tota_segu',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P',
    editable: false,
    aggregates: [
      {

        T: function (aggregatedValue, currentValue, column, record) {
          
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.obje_tota_segu
          sumaObje += record.obje_tota_camp
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
  },
  {
    text: 'Estimacion de cierre',
    datafield: 'obje_tota_cier',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
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
    text: 'Facturacion',
    datafield: 'pedi_tota_fact',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
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
    text: 'Dif  sol con ped. vs sin ped.',
    datafield: 'dife_tota_1',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
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
    text: 'Dif cierre vs obj',
    datafield: 'dife_tota_2',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
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
    text: 'Total estimacion vs obj',
    datafield: 'dife_tota_3',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
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
    text: 'Total cierre vs obj',
    datafield: 'obje_tota_cier_tota',
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
    editable: false,
  },
  {
    text: '% Cump. estimación',
    datafield: 'cump_tota_esti',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P',
    editable: false,
    aggregates: [
      {
        T: function (aggregatedValue, currentValue, column, record) {
          
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.obje_tota_cier
          sumaObje += record.obje_tota_camp
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
    cellclassname: claseCumplimientoTotalEstimado,
  },
  {
    text: '% Cump. cierre',
    datafield: 'cump_tota_cier',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P',
    editable: false,
    aggregates: [
      {
        T: function (aggregatedValue, currentValue, column, record) {
          
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.obje_tota_cier_tota
          sumaObje += record.obje_tota_camp
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
    cellclassname: claseCumplimientoTotalCierre,
  },
  {
    text: 'Estimación',
    datafield: 'obje_capi_cier',
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
    columngroup: 'capi',
    editable: false,
  },
  {
    text: 'Facturado',
    datafield: 'capi_actu',
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
    columngroup: 'capi',
    editable: false,
  },
  {
    text: '% Asertividad',
    datafield: 'porc_aser',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P',
    aggregates: [
      {

        T: function (aggregatedValue, currentValue, column, record) {
          
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.pedi_tota_fact
          sumaObje += record.obje_tota_cier_tota
          let total = 0
  
          if (parseInt(sumaObje) > 0 && parseInt(sumaFact) > 0) {
    
            total = 100 * (parseInt(sumaFact) / parseInt(sumaObje))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
    editable: false,
    cellclassname: claseAsertividad,
  },
]

const columnasGrupo = [
  {
    text: 'Pedidos totales',
    align: 'center',
    name: 'tota',
  },
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
    text: 'Capitalización',
    align: 'center',
    name: 'capi',
  },
  {
    text: '% Actividad',
    align: 'center',
    name: 'acti',
  },
]

const sourceGlobal = ref({
  localdata: [],
  datafields: [
    { name: 'codi_area', type: 'string' },
    { name: 'obse_zona', type: 'string' },
    { name: 'tota_zona', type: 'number' },
    { name: 'obje_inco_camp', type: 'number' },
    { name: 'obje_inco_prim', type: 'number' },
    { name: 'porc_inco_prim', type: 'number' },
    { name: 'obje_inco_segu', type: 'number' },
    { name: 'porc_inco_segu', type: 'number' },
    { name: 'obje_inco_cier', type: 'number' },
    { name: 'pedi_inco_fact', type: 'number' },
    { name: 'pedi_inco_pend', type: 'number' },
    { name: 'obje_inco_cier_tota', type: 'number' },
    { name: 'cump_inco_esti', type: 'number' },
    { name: 'cump_inco_cier', type: 'number' },
    { name: 'dife_inco_1', type: 'number' },
    { name: 'dife_inco_2', type: 'number' },
    { name: 'dife_inco_3', type: 'number' },
    { name: 'obje_rete_camp', type: 'number' },
    { name: 'obje_rete_prim', type: 'number' },
    { name: 'porc_rete_prim', type: 'number' },
    { name: 'obje_rete_segu', type: 'number' },
    { name: 'porc_rete_segu', type: 'number' },
    { name: 'obje_rete_cier', type: 'number' },
    { name: 'pedi_rete_fact', type: 'number' },
    { name: 'pedi_rete_pend', type: 'number' },
    { name: 'obje_rete_cier_tota', type: 'number' },
    { name: 'cump_rete_esti', type: 'number' },
    { name: 'cump_rete_cier', type: 'number' },
    { name: 'dife_rete_1', type: 'number' },
    { name: 'dife_rete_2', type: 'number' },
    { name: 'dife_rete_3', type: 'number' },

    { name: 'obje_tota_camp', type: 'number' },
    { name: 'obje_tota_prim', type: 'number' },
    { name: 'porc_tota_prim', type: 'number' },
    { name: 'obje_tota_segu', type: 'number' },
    { name: 'porc_tota_segu', type: 'number' },
    { name: 'obje_tota_cier', type: 'number' },
    { name: 'pedi_tota_fact', type: 'number' },
    { name: 'pedi_tota_pend', type: 'number' },
    { name: 'obje_tota_cier_tota', type: 'number' },
    { name: 'cump_tota_esti', type: 'number' },
    { name: 'cump_tota_cier', type: 'number' },
    { name: 'dife_tota_1', type: 'number' },
    { name: 'dife_tota_2', type: 'number' },
    { name: 'dife_tota_3', type: 'number' },

    { name: 'capi_actu', type: 'number' },
    { name: 'obje_capi_cier', type: 'number' },
    { name: 'porc_aser', type: 'number' },

    { name: 'obje_acti_prim', type: 'number' },
    { name: 'obje_acti_cier', type: 'number' },
    { name: 'obje_acti_fact', type: 'number' },

    { name: 'acti_inic', type: 'number' },
    { name: 'nume_pedi', type: 'number' },
    { name: 'tota_ingr', type: 'number' },
    { name: 'tota_rein', type: 'number' },
  ],
  datatype: 'json',
})

const sourceDetalle = ref({
  localdata: [],
  datafields: [
    { name: 'codi_cort', type: 'number' },
    { name: 'codi_area', type: 'string' },
    { name: 'obse_zona', type: 'string' },
    { name: 'tota_zona', type: 'number' },
    { name: 'obje_inco_camp', type: 'number' },
    { name: 'obje_inco_prim', type: 'number' },
    { name: 'porc_inco_prim', type: 'number' },
    { name: 'obje_inco_segu', type: 'number' },
    { name: 'porc_inco_segu', type: 'number' },
    { name: 'obje_inco_cier', type: 'number' },
    { name: 'pedi_inco_fact', type: 'number' },
    { name: 'pedi_inco_pend', type: 'number' },
    { name: 'obje_inco_cier_tota', type: 'number' },
    { name: 'cump_inco_esti', type: 'number' },
    { name: 'cump_inco_cier', type: 'number' },
    { name: 'dife_inco_1', type: 'number' },
    { name: 'dife_inco_2', type: 'number' },
    { name: 'dife_inco_3', type: 'number' },
    { name: 'obje_rete_camp', type: 'number' },
    { name: 'obje_rete_prim', type: 'number' },
    { name: 'porc_rete_prim', type: 'number' },
    { name: 'obje_rete_segu', type: 'number' },
    { name: 'porc_rete_segu', type: 'number' },
    { name: 'obje_rete_cier', type: 'number' },
    { name: 'pedi_rete_fact', type: 'number' },
    { name: 'pedi_rete_pend', type: 'number' },
    { name: 'obje_rete_cier_tota', type: 'number' },
    { name: 'cump_rete_esti', type: 'number' },
    { name: 'cump_rete_cier', type: 'number' },
    { name: 'dife_rete_1', type: 'number' },
    { name: 'dife_rete_2', type: 'number' },
    { name: 'dife_rete_3', type: 'number' },

    { name: 'obje_tota_camp', type: 'number' },
    { name: 'obje_tota_prim', type: 'number' },
    { name: 'porc_tota_prim', type: 'number' },
    { name: 'obje_tota_segu', type: 'number' },
    { name: 'porc_tota_segu', type: 'number' },
    { name: 'obje_tota_cier', type: 'number' },
    { name: 'pedi_tota_fact', type: 'number' },
    { name: 'pedi_tota_pend', type: 'number' },
    { name: 'obje_tota_cier_tota', type: 'number' },
    { name: 'cump_tota_esti', type: 'number' },
    { name: 'cump_tota_cier', type: 'number' },
    { name: 'dife_tota_1', type: 'number' },
    { name: 'dife_tota_2', type: 'number' },
    { name: 'dife_tota_3', type: 'number' },

    { name: 'capi_actu', type: 'number' },
    { name: 'obje_capi_cier', type: 'number' },
    { name: 'porc_aser', type: 'number' },

    { name: 'obje_acti_prim', type: 'number' },
    { name: 'obje_acti_cier', type: 'number' },
    { name: 'obje_acti_fact', type: 'number' },

    { name: 'acti_inic', type: 'number' },
    { name: 'nume_pedi', type: 'number' },
    { name: 'tota_ingr', type: 'number' },
    { name: 'tota_rein', type: 'number' },
  ],
  datatype: 'json',
})

const adaptadorGlobal = new jqx.dataAdapter(sourceGlobal.value)
const adaptadorDetalle = new jqx.dataAdapter(sourceDetalle.value)

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

    sourceDetalle.value.localdata =  data.data_deta
    refGridDetalle.value.updatebounddata('cells')
    refGridDetalle.value.refreshfilterrow()
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
  sourceDetalle.value.localdata = []
  refGridDetalle.value.updatebounddata('cells')
  refGridDetalle.value.refreshfilterrow()
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

      const { data } = await $api(`/api/sami/v1/reportes/seguimiento-cierre-pais/excel`, {
        method: "post",
        body: {
          cabeceraGlobal: cabeceraGlobal,
          detalleGlobal: JSON.stringify(refGridGlobal.value.exportdata('xml')),
          cabeceraDetalle: cabeceraDetalle,
          detalleDetalle: JSON.stringify(refGridDetalle.value.exportdata('xml')),
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

const onRegistrar = async () => {
  const dataInfoGlob = refGridGlobal.value.getdatainformation()
  const dataRowsGlob = dataInfoGlob.rowscount
  if(dataRowsGlob == 0 ) {
    appStore.mensajeSnackbar('No tiene ningun seguimiento de cierre por registrar.')
    appStore.color("error")
    appStore.snackbar(true)
  } else {
    try {
      appStore.mensaje('Generando proceso')
      appStore.loading(true)

      const data  = await $api(`/api/sami/v1/reportes/seguimiento-cierre-pais`, {
        method: "post",
        body: {
          campana: (formulario.value.campana === null) ? '' : formulario.value.campana,
          data: JSON.stringify(
            refGridGlobal.value.exportdata(
              'xml',
              null,
              false,
              null,
              true,
            ),
          ),
        },
      })
    
      appStore.mensajeSnackbar(`${data.message}`)
      appStore.color("success")
      appStore.snackbar(true)
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
}

const onEditar = event => {
  const { args } = event
  const columnDataField = args.datafield
  const rowIndex = args.rowindex
  const cellValue = args.value
  if (columnDataField === 'obje_inco_cier') {
    let objeReteCier = refGridGlobal.value.getcellvaluebyid(rowIndex, 'obje_rete_cier')
    let objeTota = refGridGlobal.value.getcellvaluebyid(rowIndex, 'obje_tota')
    let objeInco = refGridGlobal.value.getcellvaluebyid(rowIndex, 'obje_inco')
    const objeIncoCier = parseInt(cellValue)
    if (!Number.isNaN(objeIncoCier)) {
      objeReteCier = parseInt(objeReteCier)
      objeTota = parseInt(objeTota)
      objeInco = parseInt(objeInco)
      let objeTotaCier = parseInt(objeReteCier) + parseInt(objeIncoCier)
      let porcIncoCier = (parseInt(objeIncoCier) / parseInt(objeInco)) * 100
      porcIncoCier = parseFloat(porcIncoCier).toFixed(2)
      let porcTotaCier = (parseInt(objeTotaCier) / parseInt(objeTota)) * 100
      porcTotaCier = parseFloat(porcTotaCier).toFixed(2)

      refGridGlobal.value.setcellvalue(rowIndex, 'porc_inco_cier', porcIncoCier)
      refGridGlobal.value.setcellvalue(rowIndex, 'obje_tota_cier', objeTotaCier)
      refGridGlobal.value.setcellvalue(rowIndex, 'porc_tota_cier', porcTotaCier)
    }
  } else if (columnDataField === 'obje_rete_cier') {
    let objeIncoCier = refGridGlobal.value.getcellvaluebyid(rowIndex, 'obje_inco_cier')
    let objeTota = refGridGlobal.value.getcellvaluebyid(rowIndex, 'obje_tota')
    let objeRete = refGridGlobal.value.getcellvaluebyid(rowIndex, 'obje_rete')
    const objeReteCier = parseInt(cellValue)
    if (!Number.isNaN(objeReteCier)) {
      objeIncoCier = parseInt(objeIncoCier)
      objeTota = parseInt(objeTota)
      objeRete = parseInt(objeRete)
      
      const objeTotaCier = parseInt(objeReteCier) + parseInt(objeIncoCier)
      let porcReteCier = (parseInt(objeReteCier) / parseInt(objeRete)) * 100
      porcReteCier = parseFloat(porcReteCier).toFixed(2)
      let porcTotaCier = (parseInt(objeTotaCier) / parseInt(objeTota)) * 100
      porcTotaCier = parseFloat(porcTotaCier).toFixed(2)

      refGridGlobal.value.setcellvalue(rowIndex, 'porc_rete_cier', porcReteCier)
      refGridGlobal.value.setcellvalue(rowIndex, 'obje_tota_cier', objeTotaCier)
      refGridGlobal.value.setcellvalue(rowIndex, 'porc_tota_cier', porcTotaCier)
    }
  }
}
</script>

<template>
  <div>
    <AppPlantilla>
      <template #botones>
        <GenerarBoton @procesar="onGenerar" />
        <ExcelBoton @procesar="onExcel" />
        <RegistrarBoton @procesar="onRegistrar" />
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
                  :columnsautoresize="false"
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

          <VCol cols="12">
            <VCard title="Consolidado región">
              <VCardText>
                <JqxGrid
                  ref="refGridDetalle"
                  theme="material"
                  width="100%"
                  :localization="localization"
                  :height="450"
                  :columns="columnasDetalle"
                  :source="adaptadorDetalle"
                  :columngroups="columnasGrupo"
                  columnsresize
                  :columnsautoresize="false"
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
                  :editable="false"
                />
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </template>
    </AppPlantilla>
  </div>
</template>
