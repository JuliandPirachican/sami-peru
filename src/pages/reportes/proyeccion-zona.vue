<!-- eslint-disable camelcase -->
<script setup>
import JqxGrid from 'jqwidgets-scripts/jqwidgets-vue3/vue_jqxgrid.vue';

import { useAppStore } from '@/stores/app';
import { $api, $base } from '@/utils/api';

import { EncryptStorage } from 'encrypt-storage';


definePage({
  meta: {
    action: 'colombia/repo_come_proy_camp',
    subject: 'colombia/repo_come_proy_camp',
  },
})


const encryptStorage = new EncryptStorage('AZZORTI-SAMI', {
  storageType: 'localStorage',
})

const userData = encryptStorage.getItem('userData')
const appStore = useAppStore()



const formulario = ref({
  campana: null,
  zona: null,
})

const general = ref({
  lima: '',
  objetivoIncorporacion: '0',
  proyeccionIncorporacion: '0',
  reproyeccionIncorporacion: '0',
  objetivoRetencion: '0',
  proyeccionRetencion: '0',
  reproyeccionRetencion: '0',
  objetivoActividad: '0.00',
  proyeccionActividad: '0.00',
  reproyeccionActividad: '0.00',
})

const variables = ref([
  { title: 'Todos', value: 0 },
  { title: 'Pedidos totales', value: 1 },
  { title: 'Pedidos de actividad', value: 2 },
  { title: 'Pedidos de retención', value: 3 },
  { title: 'Capitalización', value: 4 },
  { title: 'Cobranza', value: 5 },
  { title: 'Consecutividad', value: 6 },
])

const columnas = ref([
  { title: 'Objetivo formula éxito', value: 0 },
  { title: 'Objetivo proyección', value: 1 },
  { title: 'Objetivo reproyección', value: 2 },
])

const selectedVariable = ref(0)
const selectedColumna = ref(0)

const items = ref([])

const claseIncorporacion = (row, columnfield, value) => {
  const dataRecord = refGridGlobal.value.getrowdata(row)
  // eslint-disable-next-line
      const dataObje = parseInt(dataRecord.pedi_inco_obje);
  let dataProy = 0
  if (columnfield === 'pedi_inco_prim') {
    dataProy = parseInt(dataRecord.pedi_inco_prim)
  } else {
    dataProy = parseInt(dataRecord.pedi_inco_segu)
  }
  const porcProy = parseFloat(100 * (dataProy / dataObje)).toFixed(2)
  if (dataObje === 0) {
    return `bg-primary-light text-secondary`
  }
  if (dataProy === 0) {
    return `bg-primary-light text-secondary`
  }
  if (porcProy >= 100) {
    return `bg-primary-light text-success`
  }
  if (porcProy >= 80 && porcProy < 100) {
    return `bg-primary-light text-warning`
  }
  
  return `bg-primary-light text-error`
}

const claseRetencion = (row, columnfield, value) => {
  const dataRecord = refGridGlobal.value.getrowdata(row)
  const dataObje = parseInt(dataRecord.pedi_rete_obje)
  let dataProy = 0
  if (columnfield === 'pedi_rete_prim') {
    dataProy = parseInt(dataRecord.pedi_rete_prim)
  } else {
    // eslint-disable-next-line
        dataProy = parseInt(dataRecord.pedi_rete_segu);
  }
  const porcProy = parseFloat(100 * (dataProy / dataObje)).toFixed(2)
  if (dataObje === 0) {
    return ``
  }
  if (dataProy === 0) {
    return ``
  }
  if (porcProy >= 100) {
    return `text-success`
  }
  if (porcProy >= 80 && porcProy < 100) {
    return 'text-warning'
  }
  
  return `text-error`
}
    
const claseActividad = (row, columnfield, value) => {
  const dataRecord = refGridGlobal.value.getrowdata(row)
  const dataObje = parseInt(dataRecord.acti_obje_pedi)
  let dataProy = 0
  if (columnfield === 'acti_prim') {
    dataProy = parseInt(dataRecord.acti_prim)
  } else {
    dataProy = parseInt(dataRecord.acti_segu)
  }
  const porcProy = parseFloat(100 * (dataProy / dataObje)).toFixed(2)
  if (dataObje === 0) {
    return ``
  }
  if (dataProy === 0) {
    return ``
  }
  if (porcProy >= 100) {
    return `text-success`
  }
  
  return `text-error`
}

const claseConsecutividadRetencion =  (row, columnfield, value) => {
  const dataRecord = refGridGlobal.value.getrowdata(row)
  const dataObje = parseInt(dataRecord.cons_rete_obje)
  let dataProy = 0
  if (columnfield === 'cons_rete_prim') {
    dataProy = parseInt(dataRecord.cons_rete_prim)
  } else {
    dataProy = parseInt(dataRecord.cons_rete_segu)
  }
  const porcProy = parseFloat(100 * (dataProy / dataObje)).toFixed(2)
  if (dataObje === 0) {
    return `bg-primary-light text-secondary`
  }
  if (dataProy === 0) {
    return `bg-primary-light text-secondary`
  }
  if (porcProy >= 100) {
    return `bg-primary-light text-success`
  }
  if (porcProy >= 80 && porcProy < 100) {
    return `bg-primary-light text-warning`
  }
  
  return `bg-primary-light text-error`
}
    
const claseProyeccionPeg21 = (row, columnfield, value) => {
  const dataRecord = refGridGlobal.value.getrowdata(row)
  const dataObje = parseInt(dataRecord.pe21_obje)
  let dataProy = 0
  if (columnfield === 'pe21_prim') {
    dataProy = parseInt(dataRecord.pe21_prim)
  } else {
    dataProy = parseInt(dataRecord.pe21_segu)
  }
  const porcProy = parseFloat(100 * (dataProy / dataObje)).toFixed(2)
  if (dataObje === 0) {
    return `bg-primary-light text-secondary`
  }
  if (dataProy === 0) {
    return `bg-primary-light text-secondary`
  }
  if (porcProy >= 100) {
    return `bg-primary-light text-success`
  }
  if (porcProy >= 80 && porcProy < 100) {
    return `bg-primary-light text-warning`
  }
  
  return `bg-primary-light text-error`
}

const claseProyeccionPeg42 = (row, columnfield, value) => {
  const dataRecord = refGridGlobal.value.getrowdata(row)
  // eslint-disable-next-line
      const dataObje = parseInt(dataRecord.pe42_obje);
  let dataProy = 0
  if (columnfield === 'pe42_prim') {
    // eslint-disable-next-line
        dataProy = parseInt(dataRecord.pe42_prim);
  } else {
    // eslint-disable-next-line
        dataProy = parseInt(dataRecord.pe42_segu);
  }
  const porcProy = parseFloat(100 * (dataProy / dataObje)).toFixed(2)
  if (dataObje === 0) {
    return `bg-primary-light text-secondary`
  }
  if (dataProy === 0) {
    return `bg-primary-light text-secondary`
  }
  if (porcProy >= 100) {
    return `bg-primary-light text-success`
  }
  if (porcProy >= 80 && porcProy < 100) {
    return `bg-primary-light text-warning`
  }
  
  return `bg-primary-light text-error`
}

const claseProyeccionPeg63 = (row, columnfield, value) => {
  const dataRecord = refGridGlobal.value.getrowdata(row)
  const dataObje = parseInt(dataRecord.pe63_obje)
  let dataProy = 0
  if (columnfield === 'pe63_prim') {
    dataProy = parseInt(dataRecord.pe63_prim)
  } else {
    dataProy = parseInt(dataRecord.pe63_segu)
  }
  const porcProy = parseFloat(100 * (dataProy / dataObje)).toFixed(2)
  if (dataObje === 0) {
    return `text-secondary bg-primary-light`
  }
  if (dataProy === 0) {
    return `text-secondary bg-primary-light`
  }
  if (porcProy >= 100) {
    return `text-success bg-primary-light`
  }
  if (porcProy >= 80 && porcProy < 100) {
    return `text-warning bg-primary-light`
  }
  
  return `text-error bg-primary-light`
}

const claseProyeccionPegs = (row, columnfield, value) => {
  const dataRecord = refGridGlobal.value.getrowdata(row)
  const dataObje = parseInt(dataRecord.pegs_obje)
  let dataProy = 0
  if (columnfield === 'pegs_prim') {
    dataProy = parseInt(dataRecord.pegs_prim)
  } else {
    dataProy = parseInt(dataRecord.pegs_segu)
  }
  const porcProy = parseFloat(100 * (dataProy / dataObje)).toFixed(2)
  if (dataObje === 0) {
    return ''
  }
  if (dataProy === 0) {
    return ''
  }
  if (porcProy >= 100) {
    return 'text-sucess'
  }
  if (porcProy >= 80 && porcProy < 100) {
    return 'text-warning'
  }
  
  return 'text-error'
}

const claseProyeccionReingreso = (row, columnfield, value) => {
  const dataRecord = refGridGlobal.value.getrowdata(row)
  const dataObje = parseInt(dataRecord.rein_obje)
  let dataProy = 0
  if (columnfield === 'rein_prim') {
    dataProy = parseInt(dataRecord.rein_prim)
  } else {
    dataProy = parseInt(dataRecord.rein_segu)
  }
  const porcProy = parseFloat(100 * (dataProy / dataObje)).toFixed(2)
  if (dataObje === 0) {
    return `bg-primary-light text-secondary`
  }
  if (dataProy === 0) {
    return `bg-primary-light text-secondary`
  }
  if (porcProy >= 100) {
    return `bg-primary-light text-success`
  }
  if (porcProy >= 80 && porcProy < 100) {
    return `bg-primary-light text-warning`
  }
  
  return `bg-primary-light text-error`
}

const claseCapitalizacion = (row, columnfield, value) => {
  if (value <= 0) {
    return `text-error`
  }
  
  return `text-success`
}

let sumaNumePedi = 0
let sumaTotaIngr = 0
let sumaTotaRein = 0
let sumaActiInic = 0
let sumaActiObjePedi = 0
let sumaActiPrim = 0
let sumaActiSegu = 0

/**columnas de la grilla */
const columnaGlobal = [
  {
    text: 'Sector',
    dataField: 'codi_sect',
    width: '60',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: true,
    filtertype: 'checkedlist',
    columna: 'A',
  },
  {
    text: 'Lider',
    dataField: 'nomb_vend',
    width: '250',
    align: 'center',
    cellsalign: 'left',
    editable: false,
    pinned: true,
    filtertype: 'checkedlist',
    columna: 'B',
  },
  {
    text: 'Act. inic.',
    dataField: 'acti_inic',
    width: '80',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: true,
    cellsformat: 'N',
    filtertype: 'number',
    columna: 'C',
    aggregates: [
      {
        T: function (aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue!==undefined && !isNaN(aggregatedValue)?aggregatedValue:0
        },
      },
    ],
  },
  {
    text: 'Proyección',
    dataField: 'pedi_inco_obje',   
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: true,
    columngroup: 'tota',
    cellsformat: 'N',
    filtertype: 'number',
    columna: 'D',
    aggregates: [
      {
        T: function (aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue!==undefined && !isNaN(aggregatedValue)?aggregatedValue:0
        },
      },
    ],
  },
  {
    text: 'Seguimiento',
    dataField: 'segui_inco',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: true,
    columngroup: 'tota',
    cellsformat: 'N',
    filtertype: 'number',
    columna: 'E',
    aggregates: [
      {
        T: function (aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue!==undefined && !isNaN(aggregatedValue)?aggregatedValue:0
        },
      },
    ],
  },
  {
    text: 'Ped. Camp. Ante',
    datafield: 'pedi_rete',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    columngroup: 'inco',
    cellsformat: 'N',
    filtertype: 'number',
    columna: 'F',
    aggregates: [
      {
        T: function (aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue!==undefined && !isNaN(aggregatedValue)?aggregatedValue:0
        },
      },
    ],
  },
  {
    text: 'Proyeccion',
    dataField: 'pedi_inco_prim',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: true,
    columngroup: 'inco',
    cellsformat: 'N',
    filtertype: 'number',
    columna: 'G',
    aggregates: [
      {
        T: function (aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue!==undefined && !isNaN(aggregatedValue)?aggregatedValue:0
        },
      },
    ],
  },
  {
    text: 'Seguimiento',
    dataField: 'segui_conse',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: true,
    columngroup: 'inco',
    cellsformat: 'N',
    filtertype: 'number',
    columna: 'H',
    aggregates: [
      {
        T: function (aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue!==undefined && !isNaN(aggregatedValue)?aggregatedValue:0
        },
      },
    ],
  },
  {
    text: '1. Camp. Ante',
    datafield: 'cons_segu_camp_ante',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    columngroup: 'rete',
    cellsformat: 'N',
    filtertype: 'number',
    columna: 'I',
    aggregates: [
      {
        T: function (aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue!==undefined && !isNaN(aggregatedValue)?aggregatedValue:0
        },
      },
    ],
  },
  
  {
    text: 'Proyeccion',
    datafield: 'pedi_rete_segu_ocul',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: true,
    columngroup: 'rete',
    cellsformat: 'N',
    filtertype: 'number',
    columna: 'J',
    aggregates: [
      {
        T: function (aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue!==undefined && !isNaN(aggregatedValue)?aggregatedValue:0
        },
      },
    ],
  },
  {
    text: 'Seguimiento',
    datafield: 'pedi_rete_prim',
    hidden: false,
    width: '130',
    align: 'center',
    cellsalign: 'center',
    editable: true,
    columngroup: 'rete',
    cellsformat: 'N',
    filtertype: 'number',
    columna: 'K',
    aggregates: [
      {
        T: function (aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue!==undefined && !isNaN(aggregatedValue)?aggregatedValue:0
        },
      },
    ],
    cellclassname: claseRetencion,
  },
  {
    text: '2. Camp. Ante.',
    datafield: 'pedi_rete_terc_ante',
    hidden: false,
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    columngroup: 'acti',
    cellsformat: 'N',
    filtertype: 'number',
    columna: 'L',
    aggregates: [
      {
        T: function (aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue!==undefined && !isNaN(aggregatedValue)?aggregatedValue:0
        },
      },
    ],
    cellclassname: claseRetencion,
  },
  {
    text: 'Proyección',
    datafield: 'cons_rete_prim_ocul',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: true,
    columngroup: 'acti',
    cellsformat: 'P2',
    filtertype: 'number',
    columna: 'M',
    aggregates: [
      {
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue!==undefined && !isNaN(aggregatedValue)?aggregatedValue:0

        },
      },
    ],
  },
  {
    text: 'Seguimiento',
    datafield: 'cons_rete_segu_ocul',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: true,
    columngroup: 'acti',
    cellsformat: 'P2',
    filtertype: 'number',
    columna: 'N',
    aggregates: [
      {
        T: function (aggregatedValue, currentValue) {
          
            
          aggregatedValue += currentValue
          
          return aggregatedValue!==undefined && !isNaN(aggregatedValue)?aggregatedValue:0
          
        },
      },
    ],
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
    text: '3. Camp. Ante.',
    datafield: 'pedi_rete_cuar_ante',
    hidden: false,
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    columngroup: 'cons4_ped',
    cellsformat: 'N',
    filtertype: 'number',
    columna: 'O',
    aggregates: [
      {
        T: function (aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue!==undefined && !isNaN(aggregatedValue)?aggregatedValue:0
        },
      },
    ],
    cellclassname: claseRetencion,
  },
  {
    text: 'Proyección',
    datafield: 'proy_segu',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: true,
    columngroup: 'cons4_ped',
    cellsformat: 'P2',
    filtertype: 'number',
    columna: 'P',
    aggregates: [
      {
        T: function (aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue!==undefined && !isNaN(aggregatedValue)?aggregatedValue:0
        },
      },
    ],
  },
  {
    text: 'Seguimiento',
    datafield: 'proy_segu1',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: true,
    columngroup: 'cons4_ped',
    cellsformat: 'P2',
    filtertype: 'number',
    columna: 'Q',
    aggregates: [
      {
        T: function (aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue!==undefined && !isNaN(aggregatedValue)?aggregatedValue:0
        },
      },
    ],
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
    text: 'Peg21',
    datafield: 'pe21',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    columngroup: 'pe21',
    cellsformat: 'N',
    filtertype: 'number',
    columna: 'R',
    aggregates: [
      {
        T: function (aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue!==undefined && !isNaN(aggregatedValue)?aggregatedValue:0
        },
      },
    ],
  },
  {
    text: 'Proyección',
    datafield: 'pe21_obje',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: true,
    columngroup: 'pe21',
    cellsformat: 'N',
    filtertype: 'number',
    columna: 'S',
    aggregates: [
      {
        T: function (aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue!==undefined && !isNaN(aggregatedValue)?aggregatedValue:0
        },
      },
    ],
  },
  {
    text: 'Seguimiento',
    datafield: 'pe21_prim',
    hidden: false,
    width: '130',
    align: 'center',
    cellsalign: 'center',
    editable: true,
    columngroup: 'pe21',
    cellsformat: 'N',
    filtertype: 'number',
    columna: 'T',
    aggregates: [
      {
        T: function (aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue!==undefined && !isNaN(aggregatedValue)?aggregatedValue:0
        },
      },
    ],
    validation(cell, value) {
      if (value === '0') {
        return true
      }
      
      return !(value === '')
    },
    cellclassname: claseProyeccionPeg21,
  },
  {
    text: 'Peg42',
    datafield: 'pe42',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    columngroup: 'pe42',
    cellsformat: 'N',
    filtertype: 'number',
    columna: 'U',
    aggregates: [
      {
        T: function (aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue!==undefined && !isNaN(aggregatedValue)?aggregatedValue:0
        },
      },
    ],
  },
  {
    text: 'Proyección',
    datafield: 'pe42_obje',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: true,
    columngroup: 'pe42',
    cellsformat: 'N',
    filtertype: 'number',
    columna: 'V',
    aggregates: [
      {
        T: function (aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue!==undefined && !isNaN(aggregatedValue)?aggregatedValue:0
        },
      },
    ],
  },
  {
    text: 'Seguimiento',
    datafield: 'pe42_prim',
    hidden: false,
    width: '130',
    align: 'center',
    cellsalign: 'center',
    editable: true,
    columngroup: 'pe42',
    cellsformat: 'N',
    filtertype: 'number',
    columna: 'W',
    aggregates: [
      {
        T: function (aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue!==undefined && !isNaN(aggregatedValue)?aggregatedValue:0
        },
      },
    ],
    validation(cell, value) {
      if (value === '0') {
        return true
      }
      
      return !(value === '')
    },
    cellclassname: claseProyeccionPeg42,
  },
  {
    text: 'Peg63',
    datafield: 'pe63',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    columngroup: 'pe63',
    cellsformat: 'N',
    filtertype: 'number',
    columna: 'X',
    aggregates: [
      {
        T: function (aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue!==undefined && !isNaN(aggregatedValue)?aggregatedValue:0
        },
      },
    ],
  },
  {
    text: 'Proyección',
    datafield: 'pe63_obje',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: true,
    columngroup: 'pe63',
    cellsformat: 'N',
    filtertype: 'number',
    columna: 'Y',
    aggregates: [
      {
        T: function (aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue!==undefined && !isNaN(aggregatedValue)?aggregatedValue:0
        },
      },
    ],
  },
  {
    text: 'Seguimiento',
    datafield: 'pe63_prim',
    hidden: false,
    width: '130',
    align: 'center',
    cellsalign: 'center',
    editable: true,
    columngroup: 'pe63',
    cellsformat: 'N',
    filtertype: 'number',
    columna: 'Z',
    aggregates: [
      {
        T: function (aggregatedValue, currentValue) {
          aggregatedValue += currentValue
       
          return aggregatedValue!==undefined && !isNaN(aggregatedValue)?aggregatedValue:0
        },
      },
    ],
    validation(cell, value) {
      if (value === '0') {
        return true
      }
      
      return !(value === '')
    },
    cellclassname: claseProyeccionPeg63,
  },

  {
    text: 'Pegs',
    datafield: 'pegs',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    columngroup: 'pegs',
    cellsformat: 'N',
    filtertype: 'number',
    columna: 'AA',
    aggregates: [
      {
        T: function (aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue!==undefined && !isNaN(aggregatedValue)?aggregatedValue:0
        },
      },
    ],
  },
  {
    text: 'Proyección',
    datafield: 'pegs_obje',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: true,
    columngroup: 'pegs',
    cellsformat: 'N',
    filtertype: 'number',
    columna: 'AB',
    aggregates: [
      {
        T: function (aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue!==undefined && !isNaN(aggregatedValue)?aggregatedValue:0
        },
      },
    ],
  },
  {
    text: 'Seguimiento',
    datafield: 'pegs_prim',
    hidden: false,
    width: '130',
    align: 'center',
    cellsalign: 'center',
    editable: true,
    columngroup: 'pegs',
    cellsformat: 'N',
    filtertype: 'number',
    columna: 'AC',
    aggregates: [
      {
        T: function (aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue!==undefined && !isNaN(aggregatedValue)?aggregatedValue:0
        },
      },
    ],
    cellclassname: claseProyeccionPegs,
  },
  {
    text: 'Pos rein',
    datafield: 'rein',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    columngroup: 'rein',
    cellsformat: 'N',
    filtertype: 'number',
    columna: 'AD',
    aggregates: [
      {
        T: function (aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue!==undefined && !isNaN(aggregatedValue)?aggregatedValue:0
        },
      },
    ],
  },
  {
    text: 'Proyeccion',
    datafield: 'rein_obje',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: true,
    columngroup: 'rein',
    cellsformat: 'N',
    filtertype: 'number',
    columna: 'AE',
    aggregates: [
      {
        T: function (aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue!==undefined && !isNaN(aggregatedValue)?aggregatedValue:0
        },
      },
    ],
  },
  {
    text: 'Seguimiento',
    datafield: 'rein_prim',
    hidden: false,
    width: '130',
    align: 'center',
    cellsalign: 'center',
    editable: true,
    columngroup: 'rein',
    cellsformat: 'N',
    filtertype: 'number',
    columna: 'AF',
    aggregates: [
      {
        T: function (aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue!==undefined && !isNaN(aggregatedValue)?aggregatedValue:0
        },
      },
    ],
    validation(cell, value) {
      if (value === '0') {
        return true
      }
      
      return !(value === '')
    },
    cellclassname: claseProyeccionReingreso,
  },
  {
    text: 'Proyección',
    datafield: 'capi_obje',
    width: '130',
    align: 'center',
    cellsalign: 'center',
    editable: true,
    columngroup: 'capi',
    cellsformat: 'N',
    filtertype: 'number',
    columna: 'AG',
    aggregates: [
      {
        T: function (aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue!==undefined && !isNaN(aggregatedValue)?aggregatedValue:0
        },
      },
    ],
    cellclassname: claseCapitalizacion,
  },
  {
    text: 'Seguimiento',
    datafield: 'capi_repr',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: true,
    hidden: false,
    columngroup: 'capi',
    cellsformat: 'N',
    filtertype: 'number',
    columna: 'AH',
    aggregates: [
      {
        T: function (aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue!==undefined && !isNaN(aggregatedValue)?aggregatedValue:0
        },
      },
    ],
    cellclassname: claseCapitalizacion,
  },
  {
    text: 'Objetivo Minimo',
    datafield: 'tota_vent',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    columngroup: 'pedi_tota',
    editable: false,
    cellsformat: 'D2',
    filtertype: 'number',
    columna: 'AI',
    aggregates: [
      {
        T: function (aggregatedValue, currentValue) { 
          aggregatedValue += currentValue
          
          return aggregatedValue!==undefined && !isNaN(aggregatedValue)?aggregatedValue:0
        },
      },
    ],
  },
  {
    text: 'Proyeccion',
    datafield: 'cobr',
    width: '160',
    align: 'center',
    cellsalign: 'center',
    editable: true,
    columngroup: 'pedi_tota',
    cellsformat: 'D2',
    filtertype: 'number',
    columna: 'AJ',
    aggregates: [
      {
        T: function (aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue!==undefined && !isNaN(aggregatedValue)?aggregatedValue:0
        },
      },
    ],
  },
  {
    text: 'Seguimiento',
    datafield: 'cobr_colc',
    width: '180',
    align: 'center',
    cellsalign: 'center',
    editable: true,
    columngroup: 'pedi_tota',
    cellsformat: 'D2',
    filtertype: 'number',
    columna: 'AK',
    aggregates: [
      {
        T: function (aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue!==undefined && !isNaN(aggregatedValue)?aggregatedValue:0
        },
      },
    ],
  },
  {
    text: 'Nivel lider proyeccion',
    datafield: 'nive_lide',
    columngroup: 'nive_lide',
    width: '180',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    columna: 'AL',
  },
  {
    text: 'Nivel lider seguimiento',
    datafield: 'nive_lide_segui',
    columngroup: 'nive_lide',
    width: '180',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    columna: 'AM',
  },
]
/**columnas de agrupacion de la grilla */
const columnasGrupo = [
  {
    text: 'Incorporacion',
    align: 'center',
    name: 'tota',
  },
  {
    text: 'Consecutividad',
    align: 'center',
    name: 'inco',
  },
  {
    text: 'Consecutividad 2do pedido',
    align: 'center',
    name: 'rete',
  },
  {
    text: 'Consecutividad 3er pedido',
    align: 'center',
    name: 'acti',
  },
  {
    text: 'Consecutividad 4to pedido',
    align: 'center',
    name: 'cons4_ped',
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
    text: 'Suma de Pegs 35%',
    align: 'center',
    name: 'pegs',
  },
  {
    text: 'Reingresos 10%',
    align: 'center',
    name: 'rein',
  },
  {
    text: 'Capitalización',
    align: 'center',
    name: 'capi',
  },
  {
    text: 'Pedidos Totales',
    align: 'center',
    name: 'pedi_tota',
  },
  {
    text: 'Nivel lider',
    align: 'center',
    name: 'nive_lide',
  }
]

const sourceGlobal = ref({
  localdata: [],
  datafields: [
    { name: 'codi_sect', type: 'string' },
    { name: 'nomb_vend', type: 'string' }, 
    { name: 'acti_inic', type: 'number' },
    { name: 'pedi_tota_obje', type: 'number' },
    { name: 'pedi_tota_prim', type: 'number' },
    { name: 'pedi_tota_segu', type: 'number' },
    { name: 'pedi_inco_obje', type: 'number' },
    { name: 'pedi_inco_prim', type: 'number' },
    { name: 'pedi_inco_segu', type: 'number' },
    { name: 'pedi_rete_obje', type: 'number' },
    { name: 'pedi_rete_prim', type: 'number' },
    { name: 'pedi_rete_segu', type: 'number' },
    { name: 'acti_camp_ante', type: 'number' },
    { name: 'acti_obje', type: 'number' },
    { name: 'nume_acti', type: 'number' },
    { name: 'acti_obje_pedi', type: 'number' },
    { name: 'acti_porc_prim', type: 'number' },
    { name: 'acti_prim', type: 'number' },
    { name: 'acti_porc_segu', type: 'number' },
    { name: 'acti_segu', type: 'number' },
    { name: 'cons_rete_camp_ante', type: 'number' },
    { name: 'cons_rete_obje', type: 'number' },
    { name: 'cons_rete_prim', type: 'number' },
    { name: 'cons_rete_segu', type: 'number' },
    { name: 'cons_segu_camp_ante', type: 'number' },
    { name: 'cons_segu_obje', type: 'number' },
    { name: 'cons_terc_camp_ante', type: 'number' },
    { name: 'cons_terc_obje', type: 'number' },
    { name: 'cons_cuar_camp_ante', type: 'number' },
    { name: 'cons_cuar_obje', type: 'number' },
    { name: 'pe21', type: 'number' },
    { name: 'pe21_obje', type: 'number' },
    { name: 'pe21_prim', type: 'number' },
    { name: 'pe21_segu', type: 'number' },
    { name: 'pe42', type: 'number' },
    { name: 'pe42_obje', type: 'number' },
    { name: 'pe42_prim', type: 'number' },
    { name: 'pe42_segu', type: 'number' },
    { name: 'pe63', type: 'number' },
    { name: 'pe63_obje', type: 'number' },
    { name: 'pe63_prim', type: 'number' },
    { name: 'pe63_segu', type: 'number' },
    { name: 'pegs', type: 'number' },
    { name: 'pegs_obje', type: 'number' },
    { name: 'pegs_prim', type: 'number' },
    { name: 'pegs_segu', type: 'number' },
    { name: 'rein', type: 'number' },
    { name: 'rein_obje', type: 'number' },
    { name: 'rein_prim', type: 'number' },
    { name: 'rein_segu', type: 'number' },
    { name: 'capi_obje', type: 'number' },
    { name: 'capi_repr', type: 'number' },
    { name: 'tota_vent', type: 'number' },
    { name: 'cobr', type: 'number' },
    { name: 'cobr_colc', type: 'number' },
    { name: 'tota_pedi_ante', type: 'number' },
    { name: 'co92_colc', type: 'number' },
    { name: 'nive_lide', type: 'number' },
    { name: 'proy_segu', type: 'number' },
    { name: 'proy_segu1', type: 'number' },
  ],
  datatype: 'json',
})

const adaptadorGlobal = new jqx.dataAdapter(sourceGlobal.value)
const refGridGlobal = ref()

const localization = appStore.localization

const campanaOptions = ref([])
const errorCampana = ref(false)
const errorMensajeCampana = ref('')

const zonaOptions = ref([])
const errorZona = ref(false)
const errorMensajeZona = ref('')

/**
 * este evento sirve para editar 
 * comportamientos de la grilla 
 * como suma de las variables de las columnas 
 * entre otras cosas
 * @param event 
 */
const onEditar = event => {
  const { args } = event;
  const columnDataField = args.datafield;
  const rowIndex = args.rowindex;
  const cellValue = args.value;

  /**
   * Suma de las columnas 
   * de objetivos de proyección de pegs21, pegs42 y pegs63
   */
  if (columnDataField === 'pe21_obje' || columnDataField === 'pe42_obje' || columnDataField === 'pe63_obje') {
    let newValue = cellValue;
    let proyPeg21 = columnDataField === 'pe21_obje' ? newValue : refGridGlobal.value.getcellvaluebyid(rowIndex, 'pe21_obje');
    let proyPeg42 = columnDataField === 'pe42_obje' ? newValue : refGridGlobal.value.getcellvaluebyid(rowIndex, 'pe42_obje');
    let proyPeg63 = columnDataField === 'pe63_obje' ? newValue : refGridGlobal.value.getcellvaluebyid(rowIndex, 'pe63_obje');

    if (proyPeg21 > 0 || proyPeg42 > 0 || proyPeg63 > 0) {
      let sumProyPeg = proyPeg21 + proyPeg42 + proyPeg63;
      if (sumProyPeg >= 0) {
        refGridGlobal.value.setcellvalue(rowIndex, 'pegs_obje', sumProyPeg)
      }else{
        refGridGlobal.value.setcellvalue(rowIndex, 'pegs_obje', 0)
      }
    }
    
  }

  /**
   * Suma de las columnas 
   * de objetivos de seguimiento de pegs21, pegs42 y pegs63
   */
  if (columnDataField === 'pe21_prim' || columnDataField === 'pe42_prim' || columnDataField === 'pe63_prim') {
    let newValue = cellValue;
    let proyPeg21 = columnDataField === 'pe21_prim' ? newValue : refGridGlobal.value.getcellvaluebyid(rowIndex, 'pe21_prim');
    let proyPeg42 = columnDataField === 'pe42_prim' ? newValue : refGridGlobal.value.getcellvaluebyid(rowIndex, 'pe42_prim');
    let proyPeg63 = columnDataField === 'pe63_prim' ? newValue : refGridGlobal.value.getcellvaluebyid(rowIndex, 'pe63_prim');

    if (proyPeg21 > 0 || proyPeg42 > 0 || proyPeg63 > 0) {
      let sumProyPeg = proyPeg21 + proyPeg42 + proyPeg63;
      if (sumProyPeg >= 0) {
        refGridGlobal.value.setcellvalue(rowIndex, 'pegs_prim', sumProyPeg)
      }else{
        refGridGlobal.value.setcellvalue(rowIndex, 'pegs_prim', 0)
      }
    }
    
  }


  /**
   * Suma de las columnas 
   * de objetivos de seguimiento de pegs21, pegs42 y pegs63
   * para validar si puede capitalizar o no la proyección
   * el valor sumado se coloca en la columna de proyeccion de la capitalización
   */
  if (columnDataField === 'pedi_inco_obje' || columnDataField === 'rein_obje' || columnDataField === 'pe63_obje') {
    let newValue = cellValue;
    let proyInco = columnDataField === 'pedi_inco_obje' ? newValue : refGridGlobal.value.getcellvaluebyid(rowIndex, 'pedi_inco_obje');
    let proyRein = columnDataField === 'rein_obje' ? newValue : refGridGlobal.value.getcellvaluebyid(rowIndex, 'rein_obje');
    let Peg63 = columnDataField === 'pe63' ? newValue : refGridGlobal.value.getcellvaluebyid(rowIndex, 'pe63');
    let proyPeg63 = columnDataField === 'pe63_obje' ? newValue : refGridGlobal.value.getcellvaluebyid(rowIndex, 'pe63_obje');
    console.log(proyInco+" "+ proyRein+" "+ Peg63+" "+proyPeg63)
    if (proyInco > 0 || proyRein > 0 || proyPeg63 > 0) {
      let sumProyCapi = (proyInco + proyRein)  - (proyPeg63-Peg63);
      console.log(sumProyCapi)
      if (sumProyCapi >= 0) {
        refGridGlobal.value.setcellvalue(rowIndex, 'capi_obje', sumProyCapi)
      }else{
        refGridGlobal.value.setcellvalue(rowIndex, 'capi_obje', 0)
      }
    }
    
  }
 
  /**
   * Suma de las columnas 
   * de objetivos de proyeccion de incorporacion, reingresos,pegs21, pegs42 y pegs63
   * para validar si puede cumple el objetivos de pedidos o no la proyección
   * el valor sumado se coloca en la columna de proyeccion de pedidos totales
   */
  if (columnDataField === 'pedi_inco_obje' || columnDataField === 'pedi_inco_prim' || columnDataField === 'pe21_obje'
  || columnDataField === 'pe42_obje' || columnDataField === 'pe63_obje' || columnDataField === 'rein_obje'
  ) {
    let newValue = cellValue;
    let proyInco = columnDataField === 'pedi_inco_obje' ? newValue : refGridGlobal.value.getcellvaluebyid(rowIndex, 'pedi_inco_obje');
    let proyPediInco = columnDataField === 'pedi_inco_prim' ? newValue : refGridGlobal.value.getcellvaluebyid(rowIndex, 'pedi_inco_prim');
    let Peg21Obje = columnDataField === 'pe21_obje' ? newValue : refGridGlobal.value.getcellvaluebyid(rowIndex, 'pe21_obje'); 
    let Peg42Obje = columnDataField === 'pe42_obje' ? newValue : refGridGlobal.value.getcellvaluebyid(rowIndex, 'pe42_obje'); 
    let Peg63Obje = columnDataField === 'pe63_obje' ? newValue : refGridGlobal.value.getcellvaluebyid(rowIndex, 'pe63_obje'); 
    let proyReinObje = columnDataField === 'rein_obje' ? newValue : refGridGlobal.value.getcellvaluebyid(rowIndex, 'rein_obje');
    console.log(proyInco+" "+ proyPediInco+" "+ Peg21Obje+" "+Peg42Obje+" "+Peg63Obje+" "+proyReinObje);

    if (proyInco > 0 || proyPediInco > 0 || Peg21Obje > 0 || Peg42Obje > 0 || Peg63Obje > 0 || proyReinObje > 0) {
      let sumProyCapi = proyInco+proyPediInco+Peg21Obje+Peg42Obje+Peg63Obje-proyReinObje;
      console.log(sumProyCapi)
      if (sumProyCapi >= 0) {
        refGridGlobal.value.setcellvalue(rowIndex, 'cobr', sumProyCapi)
      }else{
        refGridGlobal.value.setcellvalue(rowIndex, 'cobr', 0)
      }
    }
    
  }
  /**
   * Suma de las columnas 
   * de objetivos de seguimiento de incorporacion, reingresos,pegs21, pegs42 y pegs63
   * para validar si puede cumple el objetivos de pedidos o no el seguimiento
   */
  if (columnDataField === 'segui_inco' || columnDataField === 'segui_conse' || columnDataField === 'pe21_prim'
  || columnDataField === 'pe42_prim' || columnDataField === 'pe63_prim' || columnDataField === 'rein_prim'
  ) {
    let newValue = cellValue!==""||cellValue!==undefined ?cellValue:0;
    let proyInco = columnDataField === 'segui_inco' ? newValue : refGridGlobal.value.getcellvaluebyid(rowIndex, 'segui_inco');
    let proyPediInco = columnDataField === 'segui_conse' ? newValue : refGridGlobal.value.getcellvaluebyid(rowIndex, 'segui_conse');
    let Peg21Segui = columnDataField === 'pe21_prim' ? newValue : refGridGlobal.value.getcellvaluebyid(rowIndex, 'pe21_prim'); 
    let Peg42Segui = columnDataField === 'pe42_prim' ? newValue : refGridGlobal.value.getcellvaluebyid(rowIndex, 'pe42_prim'); 
    let Peg63Segui = columnDataField === 'pe63_prim' ? newValue : refGridGlobal.value.getcellvaluebyid(rowIndex, 'pe63_prim'); 
    let proyReinSegui = columnDataField === 'rein_prim' ? newValue : refGridGlobal.value.getcellvaluebyid(rowIndex, 'rein_prim');
    console.log(proyInco+" "+ proyPediInco+" "+ Peg21Segui+" "+Peg42Segui+" "+Peg63Segui+" "+proyReinSegui);

    if (proyInco > 0 || proyPediInco > 0 || Peg21Segui > 0 || Peg42Segui > 0 || Peg63Segui > 0 || proyReinSegui > 0) {
      let sumProyCapi = parseInt(proyInco)+parseInt(proyPediInco)+parseInt(Peg21Segui)+parseInt(Peg42Segui)+parseInt(Peg63Segui)+parseInt(proyReinSegui);
      console.log(sumProyCapi)
      if (sumProyCapi >= 0) {
        refGridGlobal.value.setcellvalue(rowIndex, 'cobr_colc', sumProyCapi)
      }else{
        refGridGlobal.value.setcellvalue(rowIndex, 'cobr_colc', 0)
      }
    }
    
  }
 
}


onMounted(async () => {
  appStore.titulo(`Reportes / Proyeccion zona`)
  await obtenerCampana()
  await obtenerZona()

  // await mostrarVariables(selectedVariable.value)
})

const obtenerCampana = async () => {
  try {
    appStore.mensaje('Obteniendo campañas')
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

const onGenerar = async () => {
  try {
    appStore.mensaje('Obteniendo información')
    appStore.loading(true)
    limpiarValidacion()
    general.value = {
      lima: '',
      objetivoIncorporacion: '0',
      proyeccionIncorporacion: '0',
      reproyeccionIncorporacion: '0',
      objetivoRetencion: '0',
      proyeccionRetencion: '0',
      reproyeccionRetencion: '0',
      objetivoActividad: '0.00',
      proyeccionActividad: '0.00',
      reproyeccionActividad: '0.00',
    }
    items.value = []

    const { data } = await $api(`/api/sami/v1/reportes/proyeccion-campana-zona`, {
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
      proyeccionIncorporacion: data.obje_inco_proy,
      reproyeccionIncorporacion: data.obje_inco_repr,
      objetivoRetencion: data.obje_rete,
      proyeccionRetencion: data.obje_rete_proy,
      reproyeccionRetencion: data.obje_rete_repr,
      objetivoActividad: data.obje_acti,
      proyeccionActividad: data.obje_acti_proy,
      reproyeccionActividad: data.obje_acti_repr,
    }
    
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

const onLimpiar= async () => {
  formulario.value = {
    campana: null,
    zona: null,
  }
  general.value = {
    lima: '',
    objetivoIncorporacion: '0',
    proyeccionIncorporacion: '0',
    reproyeccionIncorporacion: '0',
    objetivoRetencion: '0',
    proyeccionRetencion: '0',
    reproyeccionRetencion: '0',
    objetivoActividad: '0.00',
    proyeccionActividad: '0.00',
    reproyeccionActividad: '0.00',
  }
  sourceGlobal.value.localdata = []
  refGridGlobal.value.updatebounddata('cells') 
  refGridGlobal.value.refreshfilterrow()
}

const onExcel = async () => {
  try {
    appStore.mensaje('Generando archivo')
    appStore.loading(true)

    // Exportar datos manualmente a XML
    const rows = refGridGlobal?.value?.getrows?.(); // Obtener las filas de la cuadrícula
    if (!rows || rows.length === 0) {
      appStore.mensajeSnackbar("No hay datos en la cuadrícula para exportar.");
      appStore.color("error");
      appStore.snackbar(true);
      return;
    }

    let xmlData = `<?xml version="1.0" encoding="UTF-8"?>\n<rows>\n`;

    rows.forEach((row, index) => {
      xmlData += `  <row id="${index + 1}">\n`;
      for (const [key, value] of Object.entries(row)) {
        xmlData += `    <${key}>${escapeXML(value)}</${key}>\n`;
      }
      xmlData += `  </row>\n`;
    });

    xmlData += `</rows>`;
    console.log("Datos generados manualmente a XML:");
    console.log(columnaGlobal.value);

    const { data } = await $api(`/api/sami/v1/reportes/proyeccion-campana-zona/excel`, {
      method: "post",
      body: {
        general: general.value,
        columna: selectedColumna.value,
        variable: selectedVariable.value,
        cabecera: columnaGlobal,
        detalle: JSON.stringify(xmlData),
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

const onRegistrar = async () => {
  console.log("pruebas");
  const dataInfoGlob = refGridGlobal?.value?.getdatainformation?.();
  console.log(dataInfoGlob);

  const dataRowsGlob = dataInfoGlob?.rowscount || 0; // Validar si rowscount existe
  console.log(dataRowsGlob);

  if (dataRowsGlob === 0) {
    appStore.mensajeSnackbar("No tiene ninguna proyección por registrar.");
    appStore.color("error");
    appStore.snackbar(true);
    return; // Salir temprano
  } else if (selectedVariable.value !== 0) {
    appStore.mensajeSnackbar(
      'Para registrar la proyección debe de estar marcada la variable "Todos".'
    );
    appStore.color("error");
    appStore.snackbar(true);
    return; // Salir temprano
  }

  console.log("pruebas en el else");
  console.log(formulario.value.campana);
  console.log(formulario.value.zona);

  try {
    // Exportar datos manualmente a XML
    const rows = refGridGlobal?.value?.getrows?.(); // Obtener las filas de la cuadrícula
    if (!rows || rows.length === 0) {
      appStore.mensajeSnackbar("No hay datos en la cuadrícula para exportar.");
      appStore.color("error");
      appStore.snackbar(true);
      return;
    }

    let xmlData = `<?xml version="1.0" encoding="UTF-8"?>\n<rows>\n`;

    rows.forEach((row, index) => {
      xmlData += `  <row id="${index + 1}">\n`;
      for (const [key, value] of Object.entries(row)) {
        xmlData += `    <${key}>${escapeXML(value)}</${key}>\n`;
      }
      xmlData += `  </row>\n`;
    });

    xmlData += `</rows>`;
    console.log("Datos generados manualmente a XML:");
    console.log(xmlData);

    // appStore.mensaje("Generando proceso");
    // appStore.loading(true);

    const data = await $api(`/api/sami/v1/reportes/proyeccion-campana-zona`, {
      method: "post",
      body: {
        campana: formulario.value.campana || "",
        zona: formulario.value.zona || "",
        data: JSON.stringify(xmlData),
        data_ext: JSON.stringify(xmlData),
      },
    });

    console.log("Proceso completado con éxito:", data);
    // Mostrar mensaje de éxito si es necesario
    appStore.mensajeSnackbar(`${data.message}`)
    appStore.color("success")
    appStore.snackbar(true)
  } catch (error) {
    console.error("Error en onRegistrar:", error.message);
    console.error("Detalles:", error.stack);
    appStore.mensajeSnackbar("Ocurrió un error al registrar la proyección.");
    appStore.color("error");
    appStore.snackbar(true);
  } finally {
    appStore.loading(false);
  }
};

// Función para escapar caracteres especiales en XML
const escapeXML = (value) => {
  if (value === null || value === undefined) return "";
  return value
    .toString()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
};

const limpiarValidacion = () => {
  errorCampana.value = false
  errorMensajeCampana.value = ''
  errorZona.value = false
  errorMensajeZona.value = ''
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
            <VCard title="Buscar proyección">
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
                        OBJ. PROYECCIÓN
                      </th>
                      <th class="text-uppercase">
                        SEGUIMIENTO 
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                 
                    <tr>
                      <td>Incorporación</td>
                      <td>{{ general.objetivoIncorporacion }}</td>
                      <td>{{ general.proyeccionIncorporacion }}</td>
                      <td>{{ general.reproyeccionIncorporacion }}</td>
                    </tr>
                    <tr>
                      <td>Pedidos Totales</td>
                      <td>{{ general.objetivoActividad }}</td>
                      <td>{{ general.proyeccionActividad }}</td>
                      <td>{{ general.reproyeccionActividad }}</td>
                    </tr>
                  </tbody>
                </VTable>
              </VCardText>
            </VCard>
          </VCol>

          <!-- <VCol cols="12">
            <VCard title="Variables">
              <VCardText>
                <VRadioGroup
                  v-model="selectedVariable"
                  inline
                >
                  <div>
                    <VRadio
                      v-for="variable in variables"
                      :key="variable.value"
                      :label="variable.title"
                      :value="variable.value"
                      color="secondary"
                    />
                  </div>
                </VRadioGroup>
              </VCardText>
            </VCard>
          </VCol>

          <VCol cols="12">
            <VCard title="Columnas">
              <VCardText>
                <VRadioGroup
                  v-model="selectedColumna"
                  inline
                >
                  <div>
                    <VRadio
                      v-for="columna in columnas"
                      :key="columna.value"
                      :label="columna.title"
                      :value="columna.value"
                      color="secondary"
                    />
                  </div>
                </VRadioGroup>
              </VCardText>
            </VCard>
          </VCol> -->

          <VCol cols="12">
            <VCard title="Lista de proyección">
              <VCardText>
                <JqxGrid
                  ref="refGridGlobal"
                  theme="material"
                  width="100%"
                  :localization="localization"
                  :height="450"
                  :columns="columnaGlobal"
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
