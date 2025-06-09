<!-- eslint-disable camelcase -->
<script setup>
import { useAppStore } from '@/stores/app';
import { EncryptStorage } from 'encrypt-storage';
import JqxGrid from 'jqwidgets-scripts/jqwidgets-vue3/vue_jqxgrid.vue';

definePage({
  meta: {
    action: 'colombia/repo_come_sema_zona',
    subject: 'colombia/repo_come_sema_zona',
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

const codi_camp_1 = ref('0')
const codi_camp_2 = ref('0')
const codi_camp_3 = ref('0')
const codi_camp_4 = ref('0')
const codi_camp_5 = ref('0')
const codi_camp_6 = ref('0')

const headers = computed(() => {
  return [
    {
      title: 'Concepto',
      key: 'nomb_conc',
      sortable: false,
    },
    {
      title: codi_camp_1.value,
      key: 'codi_camp_1',
      sortable: false,
    },
    {
      title: codi_camp_2.value,
      key: 'codi_camp_2',
      sortable: false,
    },
    {
      title: codi_camp_3.value,
      key: 'codi_camp_3',
      sortable: false,
    },
    {
      title: codi_camp_4.value,
      key: 'codi_camp_4',
      sortable: false,
    },
    {
      title: codi_camp_5.value,
      key: 'codi_camp_5',
      sortable: false,
    },
    {
      title: codi_camp_6.value,
      key: 'codi_camp_6',
      sortable: false,
    },
    {
      title: 'Total',
      key: 'tota_camp',
      sortable: false,
    },
  ]
})

const sourcePedidosTotales = ref({
  localdata: [],
  datafields: [
    { name: 'nomb_conc', type: 'string' },
    { name: 'codi_camp_1', type: 'string' },
    { name: 'codi_camp_2', type: 'string' },
    { name: 'codi_camp_3', type: 'string' },
    { name: 'codi_camp_4', type: 'string' },
    { name: 'codi_camp_5', type: 'string' },
    { name: 'codi_camp_6', type: 'string' },
    { name: 'tota_camp', type: 'string' },
  ],
  datatype: 'json',
})

const clasePedidoTotal= (row, columnfield,  value) => {
  if (row === 2) {
    const dataRecord = refGridPedidosTotales.value.getrowdata(1)
    let objeTota = ''
    if (columnfield === 'codi_camp_1') {
      
      objeTota = parseInt(dataRecord.codi_camp_1)
    } else if (columnfield === 'codi_camp_2') {
      
      objeTota = parseInt(dataRecord.codi_camp_2)
    } else if (columnfield === 'codi_camp_3') {
      
      objeTota = parseInt(dataRecord.codi_camp_3)
    } else if (columnfield === 'codi_camp_4') {
      
      objeTota = parseInt(dataRecord.codi_camp_4)
    } else if (columnfield === 'codi_camp_5') {
      
      objeTota = parseInt(dataRecord.codi_camp_5)
    } else if (columnfield === 'codi_camp_6') {
      
      objeTota = parseInt(dataRecord.codi_camp_6)
    } else if (columnfield === 'tota_camp') {
      
      objeTota = parseInt(dataRecord.tota_camp)
    }
    const cumpTota = parseFloat(value).toFixed(2)
    if (objeTota === 0) {
      return ''
    }
    if (cumpTota >= 100) {
      return 'text-success'
    }
    if (cumpTota >= 94.99 && cumpTota < 100) {
      return 'text-warning'
    }
      
    return 'text-error'
  }
    
  return ''
}

const claseIncorporacion= (row, columnfield,  value) => {
  if (row === 2) {
    const dataRecord = refGridIncorporacion.value.getrowdata(1)
    let objeTota = ''
    if (columnfield === 'codi_camp_1') {      
      objeTota = parseInt(dataRecord.codi_camp_1)
    } else if (columnfield === 'codi_camp_2') {      
      objeTota = parseInt(dataRecord.codi_camp_2)
    } else if (columnfield === 'codi_camp_3') {      
      objeTota = parseInt(dataRecord.codi_camp_3)
    } else if (columnfield === 'codi_camp_4') {      
      objeTota = parseInt(dataRecord.codi_camp_4)
    } else if (columnfield === 'codi_camp_5') {      
      objeTota = parseInt(dataRecord.codi_camp_5)
    } else if (columnfield === 'codi_camp_6') {      
      objeTota = parseInt(dataRecord.codi_camp_6)
    } else if (columnfield === 'tota_camp') {      
      objeTota = parseInt(dataRecord.tota_camp)
    }
    const cumpTota = parseFloat(value).toFixed(2)
    if (objeTota === 0) {
      return ''
    }
    if (cumpTota >= 100) {
      return 'text-success'
    }
    if (cumpTota >= 94.99 && cumpTota < 100) {
      return 'text-warning'
    }
      
    return 'text-error'
  }
    
  return ''
}
 
const claseActividad= (row, columnfield,  value) => {
  if (row === 2) {
    const dataRecord = refGridActividad.value.getrowdata(1)
    let objeTota = ''
    if (columnfield === 'codi_camp_1') {
      objeTota = parseFloat(dataRecord.codi_camp_1).toFixed(2)
    } else if (columnfield === 'codi_camp_2') {
      objeTota = parseFloat(dataRecord.codi_camp_2).toFixed(2)
    } else if (columnfield === 'codi_camp_3') {
      objeTota = parseFloat(dataRecord.codi_camp_3).toFixed(2)
    } else if (columnfield === 'codi_camp_4') {
      objeTota = parseFloat(dataRecord.codi_camp_4).toFixed(2)
    } else if (columnfield === 'codi_camp_5') {
      objeTota = parseFloat(dataRecord.codi_camp_5).toFixed(2)
    } else if (columnfield === 'codi_camp_6') {
      objeTota = parseFloat(dataRecord.codi_camp_6).toFixed(2)
    } else if (columnfield === 'tota_camp') {
      objeTota = parseFloat(dataRecord.tota_camp).toFixed(2)
    }
    if (objeTota === '0.00') {
      return ''
    }
    if (parseFloat(value).toFixed(2) >= 0.0) {
      return 'text-success'
    }
      
    return 'text-error'
  }
    
  return ''
}

const claseCobranza= (row, columnfield,  value) => {
  if (row === 2) {
    const dataRecord = refGridCobranza.value.getrowdata(1)
    let objeTota = ''
    if (columnfield === 'codi_camp_1') {
      objeTota = parseFloat(dataRecord.codi_camp_1).toFixed(2)
    } else if (columnfield === 'codi_camp_2') {
      objeTota = parseFloat(dataRecord.codi_camp_2).toFixed(2)
    } else if (columnfield === 'codi_camp_3') {
      objeTota = parseFloat(dataRecord.codi_camp_3).toFixed(2)
    } else if (columnfield === 'codi_camp_4') {
      objeTota = parseFloat(dataRecord.codi_camp_4).toFixed(2)
    } else if (columnfield === 'codi_camp_5') {
      objeTota = parseFloat(dataRecord.codi_camp_5).toFixed(2)
    } else if (columnfield === 'codi_camp_6') {
      objeTota = parseFloat(dataRecord.codi_camp_6).toFixed(2)
    } else if (columnfield === 'tota_camp') {
      objeTota = parseFloat(dataRecord.tota_camp).toFixed(2)
    }
    const cumpTota = parseFloat(value).toFixed(2)
    if (objeTota === '0.00') {
      return ''
    }
    if (cumpTota >= '87.50') {
      return 'text-success'
    }
      
    return 'text-error'
  }
  if (row === 3) {
    const dataRecord = refGridCobranza.value.getrowdata(1)
    let objeTota = ''
    if (columnfield === 'codi_camp_1') {
      objeTota = parseFloat(dataRecord.codi_camp_1).toFixed(2)
    } else if (columnfield === 'codi_camp_2') {
      objeTota = parseFloat(dataRecord.codi_camp_2).toFixed(2)
    } else if (columnfield === 'codi_camp_3') {
      objeTota = parseFloat(dataRecord.codi_camp_3).toFixed(2)
    } else if (columnfield === 'codi_camp_4') {
      objeTota = parseFloat(dataRecord.codi_camp_4).toFixed(2)
    } else if (columnfield === 'codi_camp_5') {
      objeTota = parseFloat(dataRecord.codi_camp_5).toFixed(2)
    } else if (columnfield === 'codi_camp_6') {
      objeTota = parseFloat(dataRecord.codi_camp_6).toFixed(2)
    } else if (columnfield === 'tota_camp') {
      objeTota = parseFloat(dataRecord.tota_camp).toFixed(2)
    }
    const cumpTota = parseFloat(value).toFixed(2)
    if (objeTota === '0.00') {
      return ''
    }
    if (cumpTota >= '91.50') {
      return 'text-success'
    }
      
    return 'text-error'
  }
    
  return ''
}

const claseCapitalizacion = (row, columnfield,  value) => {
  if (formulario.value.zona !== '') {
    if (columnfield === 'codi_camp_1') {
      if (codi_camp_1.value === '0') {
        return ''
      }
      if (value >= 0) {
        return 'text-success'
      }
        
      return 'text-error'
    }
    if (columnfield === 'codi_camp_2') {
      if (codi_camp_2.value=== '0') {
        return ''
      }
      if (value >= 0) {
        return 'text-success'
      }
        
      return 'text-error'
    }
    if (columnfield === 'codi_camp_3') {
      if (codi_camp_3.value === '0') {
        return ''
      }
      if (value >= 0) {
        return 'text-success'
      }
        
      return 'text-error'
    }
    if (columnfield === 'codi_camp_4') {
      if (codi_camp_4.value === '0') {
        return ''
      }
      if (value >= 0) {
        return 'text-success'
      }
        
      return 'text-error'
    }
    if (columnfield === 'codi_camp_5') {
      if (codi_camp_5.value === '0') {
        return ''
      }
      if (value >= 0) {
        return 'text-success'
      }
        
      return 'text-error'
    }
    if (columnfield === 'codi_camp_6') {
      if (codi_camp_6.value === '0') {
        return ''
      }
      if (value >= 0) {
        return 'text-success'
      }
        
      return 'text-error'
    }
    if (columnfield === 'tota_camp') {
      if (value >= 0) {
        return 'text-success'
      }
        
      return 'text-error'
    }
  }
    
  return ''
}

const claseConsecutividadNuevas= (row, columnfield,  value) => {
  if (row === 0 && formulario.value.zona !== '') {
    const cumpTota = parseFloat(value).toFixed(2)
    if (columnfield === 'codi_camp_1') {
      if (codi_camp_1.value=== '0') {
        return ''
      }
      if (cumpTota >= 80) {
        return 'text-success'
      }
        
      return 'text-error'
    }
    if (columnfield === 'codi_camp_2') {
      if (codi_camp_2.value=== '0') {
        return ''
      }
      if (cumpTota >= 80) {
        return 'text-success'
      }
        
      return 'text-error'
    }
    if (columnfield === 'codi_camp_3') {
      if (codi_camp_3.value === '0') {
        return ''
      }
      if (cumpTota >= 80) {
        return 'text-success'
      }
        
      return 'text-error'
    }
    if (columnfield === 'codi_camp_4') {
      if (codi_camp_4.value === '0') {
        return ''
      }
      if (cumpTota >= 80) {
        return 'text-success'
      }
        
      return 'text-error'
    }
    if (columnfield === 'codi_camp_5') {
      if (codi_camp_5.value === '0') {
        return ''
      }
      if (cumpTota >= 80) {
        return 'text-success'
      }
        
      return 'text-error'
    }
    if (columnfield === 'codi_camp_6') {
      if (codi_camp_6.value === '0') {
        return ''
      }
      if (cumpTota >= 80) {
        return 'text-success'
      }
        
      return 'text-error'
    }
    if (columnfield === 'tota_camp') {
      if (cumpTota >= 80) {
        return 'text-success'
      }
        
      return 'text-error'
    }
  }
  if (row === 1 && formulario.value.zona !== '') {
    const cumpTota = parseFloat(value).toFixed(2)
    if (columnfield === 'codi_camp_1') {
      if (codi_camp_1.value=== '0') {
        return ''
      }
      if (cumpTota >= 70) {
        return 'text-success'
      }
        
      return 'text-error'
    }
    if (columnfield === 'codi_camp_2') {
      if (codi_camp_2.value=== '0') {
        return ''
      }
      if (cumpTota >= 70) {
        return 'text-success'
      }
        
      return 'text-error'
    }
    if (columnfield === 'codi_camp_3') {
      if (codi_camp_3.value === '0') {
        return ''
      }
      if (cumpTota >= 70) {
        return 'text-success'
      }
        
      return 'text-error'
    }
    if (columnfield === 'codi_camp_4') {
      if (codi_camp_4.value === '0') {
        return ''
      }
      if (cumpTota >= 70) {
        return 'text-success'
      }
        
      return 'text-error'
    }
    if (columnfield === 'codi_camp_5') {
      if (codi_camp_5.value === '0') {
        return ''
      }
      if (cumpTota >= 70) {
        return 'text-success'
      }
        
      return 'text-error'
    }
    if (columnfield === 'codi_camp_6') {
      if (codi_camp_6.value === '0') {
        return ''
      }
      if (cumpTota >= 70) {
        return 'text-success'
      }
        
      return 'text-error'
    }
    if (columnfield === 'tota_camp') {
      if (cumpTota >= 70) {
        return 'text-success'
      }
        
      return 'text-error'
    }
  }
  if (row === 2 && formulario.value.zona !== '') {
    const cumpTota = parseFloat(value).toFixed(2)
    if (columnfield === 'codi_camp_1') {
      if (codi_camp_1.value=== '0') {
        return ''
      }
      if (cumpTota >= 60) {
        return 'text-success'
      }
        
      return 'text-error'
    }
    if (columnfield === 'codi_camp_2') {
      if (codi_camp_2.value=== '0') {
        return ''
      }
      if (cumpTota >= 60) {
        return 'text-success'
      }
        
      return 'text-error'
    }
    if (columnfield === 'codi_camp_3') {
      if (codi_camp_3.value === '0') {
        return ''
      }
      if (cumpTota >= 60) {
        return 'text-success'
      }
        
      return 'text-error'
    }
    if (columnfield === 'codi_camp_4') {
      if (codi_camp_4.value === '0') {
        return ''
      }
      if (cumpTota >= 60) {
        return 'text-success'
      }
        
      return 'text-error'
    }
    if (columnfield === 'codi_camp_5') {
      if (codi_camp_5.value === '0') {
        return ''
      }
      if (cumpTota >= 60) {
        return 'text-success'
      }
        
      return 'text-error'
    }
    if (columnfield === 'codi_camp_6') {
      if (codi_camp_6.value === '0') {
        return ''
      }
      if (cumpTota >= 60) {
        return 'text-success'
      }
        
      return 'text-error'
    }
    if (columnfield === 'tota_camp') {
      if (cumpTota >= 60) {
        return 'text-success'
      }
        
      return 'text-error'
    }
  }
    
  return ''
}

const claseConsecutividadTotal= (row, columnfield,  value) => {
  if (row === 0 && formulario.value.zona !== '') {
    const cumpTota = parseFloat(value).toFixed(2)
    if (columnfield === 'codi_camp_1') {
      if (codi_camp_1.value=== '0') {
        return ''
      }
      if (cumpTota >= 80) {
        return 'text-success'
      }
        
      return 'text-error'
    }
    if (columnfield === 'codi_camp_2') {
      if (codi_camp_2.value=== '0') {
        return ''
      }
      if (cumpTota >= 80) {
        return 'text-success'
      }
        
      return 'text-error'
    }
    if (columnfield === 'codi_camp_3') {
      if (codi_camp_3.value === '0') {
        return ''
      }
      if (cumpTota >= 80) {
        return 'text-success'
      }
        
      return 'text-error'
    }
    if (columnfield === 'codi_camp_4') {
      if (codi_camp_4.value === '0') {
        return ''
      }
      if (cumpTota >= 80) {
        return 'text-success'
      }
        
      return 'text-error'
    }
    if (columnfield === 'codi_camp_5') {
      if (codi_camp_5.value === '0') {
        return ''
      }
      if (cumpTota >= 80) {
        return 'text-success'
      }
        
      return 'text-error'
    }
    if (columnfield === 'codi_camp_6') {
      if (codi_camp_6.value === '0') {
        return ''
      }
      if (cumpTota >= 80) {
        return 'text-success'
      }
        
      return 'text-error'
    }
    if (columnfield === 'tota_camp') {
      if (cumpTota >= 80) {
        return 'text-success'
      }
        
      return 'text-error'
    }
  }
  if (row === 1 && formulario.value.zona !== '') {
    const cumpTota = parseFloat(value).toFixed(2)
    if (columnfield === 'codi_camp_1') {
      if (codi_camp_1.value=== '0') {
        return ''
      }
      if (cumpTota >= 70) {
        return 'text-success'
      }
        
      return 'text-error'
    }
    if (columnfield === 'codi_camp_2') {
      if (codi_camp_2.value=== '0') {
        return ''
      }
      if (cumpTota >= 70) {
        return 'text-success'
      }
        
      return 'text-error'
    }
    if (columnfield === 'codi_camp_3') {
      if (codi_camp_3.value === '0') {
        return ''
      }
      if (cumpTota >= 70) {
        return 'text-success'
      }
        
      return 'text-error'
    }
    if (columnfield === 'codi_camp_4') {
      if (codi_camp_4.value === '0') {
        return ''
      }
      if (cumpTota >= 70) {
        return 'text-success'
      }
        
      return 'text-error'
    }
    if (columnfield === 'codi_camp_5') {
      if (codi_camp_5.value === '0') {
        return ''
      }
      if (cumpTota >= 70) {
        return 'text-success'
      }
        
      return 'text-error'
    }
    if (columnfield === 'codi_camp_6') {
      if (codi_camp_6.value === '0') {
        return ''
      }
      if (cumpTota >= 70) {
        return 'text-success'
      }
        
      return 'text-error'
    }
    if (columnfield === 'tota_camp') {
      if (cumpTota >= 70) {
        return 'text-success'
      }
        
      return 'text-error'
    }
  }
  if (row === 2 && formulario.value.zona !== '') {
    const cumpTota = parseFloat(value).toFixed(2)
    if (columnfield === 'codi_camp_1') {
      if (codi_camp_1.value=== '0') {
        return ''
      }
      if (cumpTota >= 60) {
        return 'text-success'
      }
        
      return 'text-error'
    }
    if (columnfield === 'codi_camp_2') {
      if (codi_camp_2.value=== '0') {
        return ''
      }
      if (cumpTota >= 60) {
        return 'text-success'
      }
        
      return 'text-error'
    }
    if (columnfield === 'codi_camp_3') {
      if (codi_camp_3.value === '0') {
        return ''
      }
      if (cumpTota >= 60) {
        return 'text-success'
      }
        
      return 'text-error'
    }
    if (columnfield === 'codi_camp_4') {
      if (codi_camp_4.value === '0') {
        return ''
      }
      if (cumpTota >= 60) {
        return 'text-success'
      }
        
      return 'text-error'
    }
    if (columnfield === 'codi_camp_5') {
      if (codi_camp_5.value === '0') {
        return ''
      }
      if (cumpTota >= 60) {
        return 'text-success'
      }
        
      return 'text-error'
    }
    if (columnfield === 'codi_camp_6') {
      if (codi_camp_6.value === '0') {
        return ''
      }
      if (cumpTota >= 60) {
        return 'text-success'
      }
        
      return 'text-error'
    }
    if (columnfield === 'tota_camp') {
      if (cumpTota >= 60) {
        return 'text-success'
      }
        
      return 'text-error'
    }
  }
    
  return ''
}

const adaptadorPedidosTotales = new jqx.dataAdapter(sourcePedidosTotales.value)
const refGridPedidosTotales = ref()

const sourceIncorporacion = ref({
  localdata: [],
  datafields: [
    { name: 'nomb_conc', type: 'string' },
    { name: 'codi_camp_1', type: 'string' },
    { name: 'codi_camp_2', type: 'string' },
    { name: 'codi_camp_3', type: 'string' },
    { name: 'codi_camp_4', type: 'string' },
    { name: 'codi_camp_5', type: 'string' },
    { name: 'codi_camp_6', type: 'string' },
    { name: 'tota_camp', type: 'string' },
  ],
  datatype: 'json',
})

const adaptadorIncorporacion = new jqx.dataAdapter(sourceIncorporacion.value)
const refGridIncorporacion = ref()

const sourceActividad = ref({
  localdata: [],
  datafields: [
    { name: 'nomb_conc', type: 'string' },
    { name: 'codi_camp_1', type: 'number' },
    { name: 'codi_camp_2', type: 'number' },
    { name: 'codi_camp_3', type: 'number' },
    { name: 'codi_camp_4', type: 'number' },
    { name: 'codi_camp_5', type: 'number' },
    { name: 'codi_camp_6', type: 'number' },
    { name: 'tota_camp', type: 'number' },
  ],
  datatype: 'json',
})

const adaptadorActividad = new jqx.dataAdapter(sourceActividad.value)
const refGridActividad = ref()

const sourceConsecutividadNuevas = ref({
  localdata: [],
  datafields: [
    { name: 'nomb_conc', type: 'string' },
    { name: 'codi_camp_1', type: 'number' },
    { name: 'codi_camp_2', type: 'number' },
    { name: 'codi_camp_3', type: 'number' },
    { name: 'codi_camp_4', type: 'number' },
    { name: 'codi_camp_5', type: 'number' },
    { name: 'codi_camp_6', type: 'number' },
    { name: 'tota_camp', type: 'number' },
  ],
  datatype: 'json',
})

const sourceConsecutividadTotal = ref({
  localdata: [],
  datafields: [
    { name: 'nomb_conc', type: 'string' },
    { name: 'codi_camp_1', type: 'number' },
    { name: 'codi_camp_2', type: 'number' },
    { name: 'codi_camp_3', type: 'number' },
    { name: 'codi_camp_4', type: 'number' },
    { name: 'codi_camp_5', type: 'number' },
    { name: 'codi_camp_6', type: 'number' },
    { name: 'tota_camp', type: 'number' },
  ],
  datatype: 'json',
})

const adaptadorConsecutividadNuevas = new jqx.dataAdapter(sourceConsecutividadNuevas.value)
const refGridConsecutividadNuevas = ref()

const adaptadorConsecutividadTotal = new jqx.dataAdapter(sourceConsecutividadTotal.value)
const refGridConsecutividadTotal = ref()

const sourceCapitalizacion = ref({
  localdata: [],
  datafields: [
    { name: 'nomb_conc', type: 'string' },
    { name: 'codi_camp_1', type: 'number' },
    { name: 'codi_camp_2', type: 'number' },
    { name: 'codi_camp_3', type: 'number' },
    { name: 'codi_camp_4', type: 'number' },
    { name: 'codi_camp_5', type: 'number' },
    { name: 'codi_camp_6', type: 'number' },
    { name: 'tota_camp', type: 'number' },
  ],
  datatype: 'json',
})

const adaptadorCapitalizacion = new jqx.dataAdapter(sourceCapitalizacion.value)
const refGridCapitalizacion = ref()

const sourceCobranza = ref({
  localdata: [],
  datafields: [
    { name: 'nomb_conc', type: 'string' },
    { name: 'codi_camp_1', type: 'number' },
    { name: 'codi_camp_2', type: 'number' },
    { name: 'codi_camp_3', type: 'number' },
    { name: 'codi_camp_4', type: 'number' },
    { name: 'codi_camp_5', type: 'number' },
    { name: 'codi_camp_6', type: 'number' },
    { name: 'tota_camp', type: 'number' },
  ],
  datatype: 'json',
})

const adaptadorCobranza = new jqx.dataAdapter(sourceCobranza.value)
const refGridCobranza = ref()

const sourceNumeroLideres = ref({
  localdata: [],
  datafields: [
    { name: 'nomb_conc', type: 'string' },
    { name: 'codi_camp_1', type: 'number' },
    { name: 'codi_camp_2', type: 'number' },
    { name: 'codi_camp_3', type: 'number' },
    { name: 'codi_camp_4', type: 'number' },
    { name: 'codi_camp_5', type: 'number' },
    { name: 'codi_camp_6', type: 'number' },
    { name: 'tota_camp', type: 'number' },
  ],
  datatype: 'json',
})

const adaptadorNumeroLideres = new jqx.dataAdapter(sourceNumeroLideres.value)
const refGridNumeroLideres = ref()

const sourcePppFacturado = ref({
  localdata: [],
  datafields: [
    { name: 'nomb_conc', type: 'string' },
    { name: 'codi_camp_1', type: 'number' },
    { name: 'codi_camp_2', type: 'number' },
    { name: 'codi_camp_3', type: 'number' },
    { name: 'codi_camp_4', type: 'number' },
    { name: 'codi_camp_5', type: 'number' },
    { name: 'codi_camp_6', type: 'number' },
    { name: 'tota_camp', type: 'number' },
  ],
  datatype: 'json',
})

const adaptadorPppFacturado = new jqx.dataAdapter(sourcePppFacturado.value)
const refGridPppFacturado = ref()

const sourcePppRecepcionado = ref({
  localdata: [],
  datafields: [
    { name: 'nomb_conc', type: 'string' },
    { name: 'codi_camp_1', type: 'number' },
    { name: 'codi_camp_2', type: 'number' },
    { name: 'codi_camp_3', type: 'number' },
    { name: 'codi_camp_4', type: 'number' },
    { name: 'codi_camp_5', type: 'number' },
    { name: 'codi_camp_6', type: 'number' },
    { name: 'tota_camp', type: 'number' },
  ],
  datatype: 'json',
})

const adaptadorPppRecepcionado = new jqx.dataAdapter(sourcePppRecepcionado.value)
const refGridPppRecepcionado = ref()

const sourceVentaLinea = ref({
  localdata: [],
  datafields: [
    { name: 'nomb_conc', type: 'string' },
    { name: 'codi_camp_1', type: 'number' },
    { name: 'codi_camp_2', type: 'number' },
    { name: 'codi_camp_3', type: 'number' },
    { name: 'codi_camp_4', type: 'number' },
    { name: 'codi_camp_5', type: 'number' },
    { name: 'codi_camp_6', type: 'number' },
    { name: 'tota_camp', type: 'number' },
  ],
  datatype: 'json',
})

const adaptadorVentaLinea = new jqx.dataAdapter(sourceVentaLinea.value)
const refGridVentaLinea = ref()

const sourceVentaRecepcionada = ref({
  localdata: [],
  datafields: [
    { name: 'nomb_conc', type: 'string' },
    { name: 'codi_camp_1', type: 'number' },
    { name: 'codi_camp_2', type: 'number' },
    { name: 'codi_camp_3', type: 'number' },
    { name: 'codi_camp_4', type: 'number' },
    { name: 'codi_camp_5', type: 'number' },
    { name: 'codi_camp_6', type: 'number' },
    { name: 'tota_camp', type: 'number' },
  ],
  datatype: 'json',
})

const adaptadorVentaRecepcionada = new jqx.dataAdapter(sourceVentaRecepcionada.value)
const refGridVentaRecepcionada = ref()

const sourceFaltante = ref({
  localdata: [],
  datafields: [
    { name: 'nomb_conc', type: 'string' },
    { name: 'codi_camp_1', type: 'number' },
    { name: 'codi_camp_2', type: 'number' },
    { name: 'codi_camp_3', type: 'number' },
    { name: 'codi_camp_4', type: 'number' },
    { name: 'codi_camp_5', type: 'number' },
    { name: 'codi_camp_6', type: 'number' },
    { name: 'tota_camp', type: 'number' },
  ],
  datatype: 'json',
})

const adaptadorFaltante = new jqx.dataAdapter(sourceFaltante.value)
const refGridFaltante = ref()

const sourceCanje = ref({
  localdata: [],
  datafields: [
    { name: 'nomb_conc', type: 'string' },
    { name: 'codi_camp_1', type: 'number' },
    { name: 'codi_camp_2', type: 'number' },
    { name: 'codi_camp_3', type: 'number' },
    { name: 'codi_camp_4', type: 'number' },
    { name: 'codi_camp_5', type: 'number' },
    { name: 'codi_camp_6', type: 'number' },
    { name: 'tota_camp', type: 'number' },
  ],
  datatype: 'json',
})

const adaptadorCanje = new jqx.dataAdapter(sourceCanje.value)
const refGridCanje = ref()

const sourceRetencionPegs = ref({
  localdata: [],
  datafields: [
    { name: 'nomb_conc', type: 'string' },
    { name: 'codi_camp_1', type: 'number' },
    { name: 'codi_camp_2', type: 'number' },
    { name: 'codi_camp_3', type: 'number' },
    { name: 'codi_camp_4', type: 'number' },
    { name: 'codi_camp_5', type: 'number' },
    { name: 'codi_camp_6', type: 'number' },
    { name: 'tota_camp', type: 'number' },
  ],
  datatype: 'json',
})

const adaptadorRetencionPegs = new jqx.dataAdapter(sourceRetencionPegs.value)
const refGridRetencionPegs = ref()

const sourceNivelLider = ref({
  localdata: [],
  datafields: [
    { name: 'nomb_conc', type: 'string' },
    { name: 'codi_camp_1', type: 'number' },
    { name: 'codi_camp_2', type: 'number' },
    { name: 'codi_camp_3', type: 'number' },
    { name: 'codi_camp_4', type: 'number' },
    { name: 'codi_camp_5', type: 'number' },
    { name: 'codi_camp_6', type: 'number' },
    { name: 'tota_camp', type: 'number' },
  ],
  datatype: 'json',
})

const adaptadorNivelLider = new jqx.dataAdapter(sourceNivelLider.value)
const refGridNivelLider = ref()

const columnsPedidosTotales =  [
  {
    text: 'Concepto',
    dataField: 'nomb_conc',
    width: '23%',
    cellsalign: 'left',
    align: 'center',
  },
  {
    text: '0',
    dataField: 'codi_camp_1',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellclassname: clasePedidoTotal,
  },
  {
    text: codi_camp_2.value,
    dataField: 'codi_camp_2',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellclassname: clasePedidoTotal,
  },
  {
    text: codi_camp_3.value,
    dataField: 'codi_camp_3',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellclassname: clasePedidoTotal,
  },
  {
    text: codi_camp_4.value,
    dataField: 'codi_camp_4',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellclassname: clasePedidoTotal,
  },
  {
    text: codi_camp_5.value,
    dataField: 'codi_camp_5',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellclassname: clasePedidoTotal,
  },
  {
    text: codi_camp_6.value,
    dataField: 'codi_camp_6',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellclassname: clasePedidoTotal,
  },
  {
    text: 'Total',
    dataField: 'tota_camp',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellclassname: clasePedidoTotal,
  },
]

const columnsIncorporacion = [
  {
    text: 'Concepto',
    dataField: 'nomb_conc',
    width: '23%',
    cellsalign: 'left',
    align: 'center',
  },
  {
    text: '0',
    dataField: 'codi_camp_1',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellclassname: claseIncorporacion,
  },
  {
    text: codi_camp_2.value,
    dataField: 'codi_camp_2',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellclassname: claseIncorporacion,
  },
  {
    text: codi_camp_3.value,
    dataField: 'codi_camp_3',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellclassname: claseIncorporacion,
  },
  {
    text: codi_camp_4.value,
    dataField: 'codi_camp_4',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellclassname: claseIncorporacion,
  },
  {
    text: codi_camp_5.value,
    dataField: 'codi_camp_5',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellclassname: claseIncorporacion,
  },
  {
    text: codi_camp_6.value,
    dataField: 'codi_camp_6',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellclassname: claseIncorporacion,
  },
  {
    text: 'Total',
    dataField: 'tota_camp',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellclassname: claseIncorporacion,
  },
]

const columnsActividad = [
  {
    text: 'Concepto',
    dataField: 'nomb_conc',
    width: '23%',
    cellsalign: 'left',
    align: 'center',
  },
  {
    text: '0',
    dataField: 'codi_camp_1',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellclassname: claseActividad,
    cellsformat: 'P2',
  },
  {
    text: codi_camp_2.value,
    dataField: 'codi_camp_2',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellclassname: claseActividad,
    cellsformat: 'P2',
  },
  {
    text: codi_camp_3.value,
    dataField: 'codi_camp_3',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellclassname: claseActividad,
    cellsformat: 'P2',
  },
  {
    text: codi_camp_4.value,
    dataField: 'codi_camp_4',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellclassname: claseActividad,
    cellsformat: 'P2',
  },
  {
    text: codi_camp_5.value,
    dataField: 'codi_camp_5',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellclassname: claseActividad,
    cellsformat: 'P2',
  },
  {
    text: codi_camp_6.value,
    dataField: 'codi_camp_6',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellclassname: claseActividad,
    cellsformat: 'P2',
  },
  {
    text: 'Total',
    dataField: 'tota_camp',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellclassname: claseActividad,
    cellsformat: 'P2',
  },
]

const columnsConsecutividadNuevas = [
  {
    text: 'Concepto',
    dataField: 'nomb_conc',
    width: '23%',
    cellsalign: 'left',
    align: 'center',
  },
  {
    text: '0',
    dataField: 'codi_camp_1',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'P2',
    cellclassname: claseConsecutividadNuevas,
  },
  {
    text: codi_camp_2.value,
    dataField: 'codi_camp_2',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'P2',
    cellclassname: claseConsecutividadNuevas,
  },
  {
    text: codi_camp_3.value,
    dataField: 'codi_camp_3',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'P2',
    cellclassname: claseConsecutividadNuevas,
  },
  {
    text: codi_camp_4.value,
    dataField: 'codi_camp_4',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'P2',
    cellclassname: claseConsecutividadNuevas,
  },
  {
    text: codi_camp_5.value,
    dataField: 'codi_camp_5',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'P2',
    cellclassname: claseConsecutividadNuevas,
  },
  {
    text: codi_camp_6.value,
    dataField: 'codi_camp_6',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'P2',
    cellclassname: claseConsecutividadNuevas,
  },
  {
    text: 'Total',
    dataField: 'tota_camp',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'P2',
    cellclassname: claseConsecutividadNuevas,
  },
]

const columnsConsecutividadTotal = [
  {
    text: 'Concepto',
    dataField: 'nomb_conc',
    width: '23%',
    cellsalign: 'left',
    align: 'center',
  },
  {
    text: '0',
    dataField: 'codi_camp_1',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'P2',
    cellclassname: claseConsecutividadTotal,
  },
  {
    text: codi_camp_2.value,
    dataField: 'codi_camp_2',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'P2',
    cellclassname: claseConsecutividadTotal,
  },
  {
    text: codi_camp_3.value,
    dataField: 'codi_camp_3',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'P2',
    cellclassname: claseConsecutividadTotal,
  },
  {
    text: codi_camp_4.value,
    dataField: 'codi_camp_4',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'P2',
    cellclassname: claseConsecutividadTotal,
  },
  {
    text: codi_camp_5.value,
    dataField: 'codi_camp_5',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'P2',
    cellclassname: claseConsecutividadTotal,
  },
  {
    text: codi_camp_6.value,
    dataField: 'codi_camp_6',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'P2',
    cellclassname: claseConsecutividadTotal,
  },
  {
    text: 'Total',
    dataField: 'tota_camp',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'P2',
    cellclassname: claseConsecutividadTotal,
  },
]


const columnsCapitalizacion = [
  {
    text: 'Concepto',
    dataField: 'nomb_conc',
    width: '23%',
    cellsalign: 'left',
    align: 'center',
  },
  {
    text: '0',
    dataField: 'codi_camp_1',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellclassname: claseCapitalizacion,
  },
  {
    text: codi_camp_2.value,
    dataField: 'codi_camp_2',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellclassname: claseCapitalizacion,
  },
  {
    text: codi_camp_3.value,
    dataField: 'codi_camp_3',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellclassname: claseCapitalizacion,
  },
  {
    text: codi_camp_4.value,
    dataField: 'codi_camp_4',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellclassname: claseCapitalizacion,
  },
  {
    text: codi_camp_5.value,
    dataField: 'codi_camp_5',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellclassname: claseCapitalizacion,
  },
  {
    text: codi_camp_6.value,
    dataField: 'codi_camp_6',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellclassname: claseCapitalizacion,
  },
  {
    text: 'Total',
    dataField: 'tota_camp',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellclassname: claseCapitalizacion,
  },
]

const columnsCobranza = [
  {
    text: 'Concepto',
    dataField: 'nomb_conc',
    width: '23%',
    cellsalign: 'left',
    align: 'center',
  },
  {
    text: '0',
    dataField: 'codi_camp_1',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellclassname: claseCobranza,
    cellsformat: 'N',
  },
  {
    text: codi_camp_2.value,
    dataField: 'codi_camp_2',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellclassname: claseCobranza,
    cellsformat: 'N',
  },
  {
    text: codi_camp_3.value,
    dataField: 'codi_camp_3',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellclassname: claseCobranza,
    cellsformat: 'N',
  },
  {
    text: codi_camp_4.value,
    dataField: 'codi_camp_4',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellclassname: claseCobranza,
    cellsformat: 'N',
  },
  {
    text: codi_camp_5.value,
    dataField: 'codi_camp_5',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellclassname: claseCobranza,
    cellsformat: 'N',
  },
  {
    text: codi_camp_6.value,
    dataField: 'codi_camp_6',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellclassname: claseCobranza,
    cellsformat: 'N',
  },
  {
    text: 'Total',
    dataField: 'tota_camp',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellclassname: claseCobranza,
    cellsformat: 'N',
  },
]

const columnsNumeroLideres = [
  {
    text: 'Concepto',
    dataField: 'nomb_conc',
    width: '23%',
    cellsalign: 'left',
    align: 'center',
  },
  {
    text: '0',
    dataField: 'codi_camp_1',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'N',
  },
  {
    text: codi_camp_2.value,
    dataField: 'codi_camp_2',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'N',
  },
  {
    text: codi_camp_3.value,
    dataField: 'codi_camp_3',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'N',
  },
  
  {
    text: codi_camp_4.value,
    dataField: 'codi_camp_4',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'N',
  },
  {
    text: codi_camp_5.value,
    dataField: 'codi_camp_5',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'N',
  },
  {
    text: codi_camp_6.value,
    dataField: 'codi_camp_6',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'N',
  },
  {
    text: 'Total',
    dataField: 'tota_camp',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'N',
  },
]

const columnsPppFacturado = [
  {
    text: 'Concepto',
    dataField: 'nomb_conc',
    width: '23%',
    cellsalign: 'left',
    align: 'center',
  },
  {
    text: '0',
    dataField: 'codi_camp_1',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'N',
  },
  {
    text: codi_camp_2.value,
    dataField: 'codi_camp_2',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'N',
  },
  {
    text: codi_camp_3.value,
    dataField: 'codi_camp_3',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'N',
  },
  {
    text: codi_camp_4.value,
    dataField: 'codi_camp_4',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'N',
  },
  {
    text: codi_camp_5.value,
    dataField: 'codi_camp_5',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'N',
  },
  {
    text: codi_camp_6.value,
    dataField: 'codi_camp_6',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'N',
  },
  {
    text: 'Total',
    dataField: 'tota_camp',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'N',
  },
]

const columnsPppRecepcionado = [
  {
    text: 'Concepto',
    dataField: 'nomb_conc',
    width: '23%',
    cellsalign: 'left',
    align: 'center',
  },
  {
    text: '0',
    dataField: 'codi_camp_1',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'N',
  },
  {
    text: codi_camp_2.value,
    dataField: 'codi_camp_2',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'N',
  },
  {
    text: codi_camp_3.value,
    dataField: 'codi_camp_3',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'N',
  },
  {
    text: codi_camp_4.value,
    dataField: 'codi_camp_4',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'N',
  },
  {
    text: codi_camp_5.value,
    dataField: 'codi_camp_5',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'N',
  },
  {
    text: codi_camp_6.value,
    dataField: 'codi_camp_6',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'N',
  },
  {
    text: 'Total',
    dataField: 'tota_camp',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'N',
  },
]


const columnsVentaLinea = [
  {
    text: 'Concepto',
    dataField: 'nomb_conc',
    width: '23%',
    cellsalign: 'left',
    align: 'center',
  },
  {
    text: '0',
    dataField: 'codi_camp_1',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'N',
  },
  {
    text: codi_camp_2.value,
    dataField: 'codi_camp_2',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'N',
  },
  {
    text: codi_camp_3.value,
    dataField: 'codi_camp_3',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'N',
  },
  {
    text: codi_camp_4.value,
    dataField: 'codi_camp_4',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'N',
  },
  {
    text: codi_camp_5.value,
    dataField: 'codi_camp_5',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'N',
  },
  {
    text: codi_camp_6.value,
    dataField: 'codi_camp_6',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'N',
  },
  {
    text: 'Total',
    dataField: 'tota_camp',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'N',
  },
]

const columnsVentaRecepcionada = [
  {
    text: 'Concepto',
    dataField: 'nomb_conc',
    width: '23%',
    cellsalign: 'left',
    align: 'center',
    cellsformat: 'N',
  },
  {
    text: '0',
    dataField: 'codi_camp_1',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'N',
  },
  {
    text: codi_camp_2.value,
    dataField: 'codi_camp_2',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'N',
  },
  {
    text: codi_camp_3.value,
    dataField: 'codi_camp_3',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'N',
  },
  {
    text: codi_camp_4.value,
    dataField: 'codi_camp_4',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'N',
  },
  {
    text: codi_camp_5.value,
    dataField: 'codi_camp_5',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'N',
  },
  {
    text: codi_camp_6.value,
    dataField: 'codi_camp_6',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'N',
  },
  {
    text: 'Total',
    dataField: 'tota_camp',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'N',
  },
]

const columnsFaltante = [
  {
    text: 'Concepto',
    dataField: 'nomb_conc',
    width: '23%',
    cellsalign: 'left',
    align: 'center',
  },
  {
    text: '0',
    dataField: 'codi_camp_1',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'P2',
  },
  {
    text: codi_camp_2.value,
    dataField: 'codi_camp_2',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'P2',
  },
  {
    text: codi_camp_3.value,
    dataField: 'codi_camp_3',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'P2',
  },
  {
    text: codi_camp_4.value,
    dataField: 'codi_camp_4',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'P2',
  },
  {
    text: codi_camp_5.value,
    dataField: 'codi_camp_5',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'P2',
  },
  {
    text: codi_camp_6.value,
    dataField: 'codi_camp_6',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'P2',
  },
  {
    text: 'Total',
    dataField: 'tota_camp',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'P2',
  },
]

const columnsCanje = [
  {
    text: 'Concepto',
    dataField: 'nomb_conc',
    width: '23%',
    cellsalign: 'left',
    align: 'center',
  },
  {
    text: '0',
    dataField: 'codi_camp_1',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'P2',
  },
  {
    text: codi_camp_2.value,
    dataField: 'codi_camp_2',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'P2',
  },
  {
    text: codi_camp_3.value,
    dataField: 'codi_camp_3',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'P2',
  },
  {
    text: codi_camp_4.value,
    dataField: 'codi_camp_4',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'P2',
  },
  {
    text: codi_camp_5.value,
    dataField: 'codi_camp_5',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'P2',
  },
  {
    text: codi_camp_6.value,
    dataField: 'codi_camp_6',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'P2',
  },
  {
    text: 'Total',
    dataField: 'tota_camp',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'P2',
  },
]

const columnsRetencionPegs = [
  {
    text: 'Concepto',
    dataField: 'nomb_conc',
    width: '23%',
    cellsalign: 'left',
    align: 'center',
  },
  {
    text: '0',
    dataField: 'codi_camp_1',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'P2',
  },
  {
    text: codi_camp_2.value,
    dataField: 'codi_camp_2',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'P2',
  },
  {
    text: codi_camp_3.value,
    dataField: 'codi_camp_3',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'P2',
  },
  {
    text: codi_camp_4.value,
    dataField: 'codi_camp_4',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'P2',
  },
  {
    text: codi_camp_5.value,
    dataField: 'codi_camp_5',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'P2',
  },
  {
    text: codi_camp_6.value,
    dataField: 'codi_camp_6',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'P2',
  },
  {
    text: 'Total',
    dataField: 'tota_camp',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'P2',
  },
]

const columnsNivelLider = [
  {
    text: 'Concepto',
    dataField: 'nomb_conc',
    width: '23%',
    cellsalign: 'left',
    align: 'center',
  },
  {
    text: '0',
    dataField: 'codi_camp_1',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
  },
  {
    text: codi_camp_2.value,
    dataField: 'codi_camp_2',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
  },
  {
    text: codi_camp_3.value,
    dataField: 'codi_camp_3',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
  },
  {
    text: codi_camp_4.value,
    dataField: 'codi_camp_4',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
  },
  {
    text: codi_camp_5.value,
    dataField: 'codi_camp_5',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
  },
  {
    text: codi_camp_6.value,
    dataField: 'codi_camp_6',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
  },
  {
    text: 'Total',
    dataField: 'tota_camp',
    width: '11%',
    cellsalign: 'center',
    align: 'center',
    cellsformat: 'D2',
  },
]

const campanaOptions = ref([])
const errorCampana = ref(false)
const errorMensajeCampana = ref('')

const zonaOptions = ref([])
const errorZona = ref(false)
const errorMensajeZona = ref('')
const localization = appStore.localization

onMounted(async () => {
  appStore.titulo(`Reportes / Semáforo zonal`)
  inicioVariables()
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
    appStore.mensaje('Obteniendo zonas')
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

    inicioVariables()

    const { data } = await $api(`/api/sami/v1/reportes/semaforo-zona`, {
      method: "get",
      query: {
        campana: (formulario.value.campana === null) ? '' : formulario.value.campana,
        zona: (formulario.value.zona === null) ? '' : formulario.value.zona,
      },
    })

    
    codi_camp_1.value = data.codi_camp_1
    codi_camp_2.value = data.codi_camp_2
    codi_camp_3.value = data.codi_camp_3
    codi_camp_4.value = data.codi_camp_4
    codi_camp_5.value = data.codi_camp_5
    codi_camp_6.value = data.codi_camp_6
    
       
    sourceIncorporacion.value.localdata = data.data_pedi_inco
    refGridIncorporacion.value.updatebounddata('cells')
  
    sourcePedidosTotales.value.localdata = data.data_pedi_tota
    refGridPedidosTotales.value.updatebounddata('cells')
    
    sourceActividad.value.localdata = data.data_acti
    refGridActividad.value.updatebounddata('cells')
    
    sourceConsecutividadNuevas.value.localdata = data.data_cons_nuev
    refGridConsecutividadNuevas.value.updatebounddata('cells')

    sourceConsecutividadTotal.value.localdata = data.data_cons_rete
    refGridConsecutividadTotal.value.updatebounddata('cells')
    
    sourceCapitalizacion.value.localdata = data.data_capi
    refGridCapitalizacion.value.updatebounddata('cells')
    
    sourceCobranza.value.localdata = data.data_cobr
    refGridCobranza.value.updatebounddata('cells')

    sourceNumeroLideres.value.localdata = data.data_nume_lide
    refGridNumeroLideres.value.updatebounddata('cells')

    sourcePppFacturado.value.localdata = data.data_pppp_fact
    refGridPppFacturado.value.updatebounddata('cells')

    sourcePppRecepcionado.value.localdata = data.data_pppp_rece
    refGridPppRecepcionado.value.updatebounddata('cells')

    sourceVentaLinea.value.localdata = data.data_vent_line
    refGridVentaLinea.value.updatebounddata('cells')

    sourceVentaRecepcionada.value.localdata = data.data_vent_rece
    refGridVentaRecepcionada.value.updatebounddata('cells')

    sourceFaltante.value.localdata = data.data_falt
    refGridFaltante.value.updatebounddata('cells')
    
    sourceCanje.value.localdata = data.data_canj
    refGridCanje.value.updatebounddata('cells')
    
    sourceRetencionPegs.value.localdata = data.data_rete_pegs
    refGridRetencionPegs.value.updatebounddata('cells')

    sourceNivelLider.value.localdata = data.data_nive_lide
    refGridNivelLider.value.updatebounddata('cells')

    refGridIncorporacion.value.setcolumnproperty('codi_camp_1', 'text', codi_camp_1.value)
    refGridIncorporacion.value.setcolumnproperty('codi_camp_2', 'text', codi_camp_2.value)
    refGridIncorporacion.value.setcolumnproperty('codi_camp_3', 'text', codi_camp_3.value)
    refGridIncorporacion.value.setcolumnproperty('codi_camp_4', 'text', codi_camp_4.value)
    refGridIncorporacion.value.setcolumnproperty('codi_camp_5', 'text', codi_camp_5.value)
    refGridIncorporacion.value.setcolumnproperty('codi_camp_6', 'text', codi_camp_6.value)
    
    refGridPedidosTotales.value.setcolumnproperty('codi_camp_1', 'text', codi_camp_1.value)
    refGridPedidosTotales.value.setcolumnproperty('codi_camp_2', 'text', codi_camp_2.value)
    refGridPedidosTotales.value.setcolumnproperty('codi_camp_3', 'text', codi_camp_3.value)
    refGridPedidosTotales.value.setcolumnproperty('codi_camp_4', 'text', codi_camp_4.value)
    refGridPedidosTotales.value.setcolumnproperty('codi_camp_5', 'text', codi_camp_5.value)
    refGridPedidosTotales.value.setcolumnproperty('codi_camp_6', 'text', codi_camp_6.value)

    refGridActividad.value.setcolumnproperty('codi_camp_1', 'text', codi_camp_1.value)
    refGridActividad.value.setcolumnproperty('codi_camp_2', 'text', codi_camp_2.value)
    refGridActividad.value.setcolumnproperty('codi_camp_3', 'text', codi_camp_3.value)
    refGridActividad.value.setcolumnproperty('codi_camp_4', 'text', codi_camp_4.value)
    refGridActividad.value.setcolumnproperty('codi_camp_5', 'text', codi_camp_5.value)
    refGridActividad.value.setcolumnproperty('codi_camp_6', 'text', codi_camp_6.value)
    refGridConsecutividadNuevas.value.setcolumnproperty('codi_camp_1', 'text', codi_camp_1.value)
    refGridConsecutividadNuevas.value.setcolumnproperty('codi_camp_2', 'text', codi_camp_2.value)
    refGridConsecutividadNuevas.value.setcolumnproperty('codi_camp_3', 'text', codi_camp_3.value)
    refGridConsecutividadNuevas.value.setcolumnproperty('codi_camp_4', 'text', codi_camp_4.value)
    refGridConsecutividadNuevas.value.setcolumnproperty('codi_camp_5', 'text', codi_camp_5.value)
    refGridConsecutividadNuevas.value.setcolumnproperty('codi_camp_6', 'text', codi_camp_6.value)
    refGridConsecutividadTotal.value.setcolumnproperty('codi_camp_1', 'text', codi_camp_1.value)
    refGridConsecutividadTotal.value.setcolumnproperty('codi_camp_2', 'text', codi_camp_2.value)
    refGridConsecutividadTotal.value.setcolumnproperty('codi_camp_3', 'text', codi_camp_3.value)
    refGridConsecutividadTotal.value.setcolumnproperty('codi_camp_4', 'text', codi_camp_4.value)
    refGridConsecutividadTotal.value.setcolumnproperty('codi_camp_5', 'text', codi_camp_5.value)
    refGridConsecutividadTotal.value.setcolumnproperty('codi_camp_6', 'text', codi_camp_6.value)
    refGridCapitalizacion.value.setcolumnproperty('codi_camp_1', 'text', codi_camp_1.value)
    refGridCapitalizacion.value.setcolumnproperty('codi_camp_2', 'text', codi_camp_2.value)
    refGridCapitalizacion.value.setcolumnproperty('codi_camp_3', 'text', codi_camp_3.value)
    refGridCapitalizacion.value.setcolumnproperty('codi_camp_4', 'text', codi_camp_4.value)
    refGridCapitalizacion.value.setcolumnproperty('codi_camp_5', 'text', codi_camp_5.value)
    refGridCapitalizacion.value.setcolumnproperty('codi_camp_6', 'text', codi_camp_6.value)

    refGridCobranza.value.setcolumnproperty('codi_camp_1', 'text', codi_camp_1.value)
    refGridCobranza.value.setcolumnproperty('codi_camp_2', 'text', codi_camp_2.value)
    refGridCobranza.value.setcolumnproperty('codi_camp_3', 'text', codi_camp_3.value)
    refGridCobranza.value.setcolumnproperty('codi_camp_4', 'text', codi_camp_4.value)
    refGridCobranza.value.setcolumnproperty('codi_camp_5', 'text', codi_camp_5.value)
    refGridCobranza.value.setcolumnproperty('codi_camp_6', 'text', codi_camp_6.value)

    refGridNumeroLideres.value.setcolumnproperty('codi_camp_1', 'text', codi_camp_1.value)
    refGridNumeroLideres.value.setcolumnproperty('codi_camp_2', 'text', codi_camp_2.value)
    refGridNumeroLideres.value.setcolumnproperty('codi_camp_3', 'text', codi_camp_3.value)
    refGridNumeroLideres.value.setcolumnproperty('codi_camp_4', 'text', codi_camp_4.value)
    refGridNumeroLideres.value.setcolumnproperty('codi_camp_5', 'text', codi_camp_5.value)
    refGridNumeroLideres.value.setcolumnproperty('codi_camp_6', 'text', codi_camp_6.value)
    refGridPppFacturado.value.setcolumnproperty('codi_camp_1', 'text', codi_camp_1.value)
    refGridPppFacturado.value.setcolumnproperty('codi_camp_2', 'text', codi_camp_2.value)
    refGridPppFacturado.value.setcolumnproperty('codi_camp_3', 'text', codi_camp_3.value)
    refGridPppFacturado.value.setcolumnproperty('codi_camp_4', 'text', codi_camp_4.value)
    refGridPppFacturado.value.setcolumnproperty('codi_camp_5', 'text', codi_camp_5.value)
    refGridPppFacturado.value.setcolumnproperty('codi_camp_6', 'text', codi_camp_6.value)
    refGridPppRecepcionado.value.setcolumnproperty('codi_camp_1', 'text', codi_camp_1.value)
    refGridPppRecepcionado.value.setcolumnproperty('codi_camp_2', 'text', codi_camp_2.value)
    refGridPppRecepcionado.value.setcolumnproperty('codi_camp_3', 'text', codi_camp_3.value)
    refGridPppRecepcionado.value.setcolumnproperty('codi_camp_4', 'text', codi_camp_4.value)
    refGridPppRecepcionado.value.setcolumnproperty('codi_camp_5', 'text', codi_camp_5.value)
    refGridPppRecepcionado.value.setcolumnproperty('codi_camp_6', 'text', codi_camp_6.value)
    refGridVentaLinea.value.setcolumnproperty('codi_camp_1', 'text', codi_camp_1.value)
    refGridVentaLinea.value.setcolumnproperty('codi_camp_2', 'text', codi_camp_2.value)
    refGridVentaLinea.value.setcolumnproperty('codi_camp_3', 'text', codi_camp_3.value)
    refGridVentaLinea.value.setcolumnproperty('codi_camp_4', 'text', codi_camp_4.value)
    refGridVentaLinea.value.setcolumnproperty('codi_camp_5', 'text', codi_camp_5.value)
    refGridVentaLinea.value.setcolumnproperty('codi_camp_6', 'text', codi_camp_6.value)
    refGridVentaRecepcionada.value.setcolumnproperty('codi_camp_1', 'text', codi_camp_1.value)
    refGridVentaRecepcionada.value.setcolumnproperty('codi_camp_2', 'text', codi_camp_2.value)
    refGridVentaRecepcionada.value.setcolumnproperty('codi_camp_3', 'text', codi_camp_3.value)
    refGridVentaRecepcionada.value.setcolumnproperty('codi_camp_4', 'text', codi_camp_4.value)
    refGridVentaRecepcionada.value.setcolumnproperty('codi_camp_5', 'text', codi_camp_5.value)
    refGridVentaRecepcionada.value.setcolumnproperty('codi_camp_6', 'text', codi_camp_6.value)
    refGridFaltante.value.setcolumnproperty('codi_camp_1', 'text', codi_camp_1.value)
    refGridFaltante.value.setcolumnproperty('codi_camp_2', 'text', codi_camp_2.value)
    refGridFaltante.value.setcolumnproperty('codi_camp_3', 'text', codi_camp_3.value)
    refGridFaltante.value.setcolumnproperty('codi_camp_4', 'text', codi_camp_4.value)
    refGridFaltante.value.setcolumnproperty('codi_camp_5', 'text', codi_camp_5.value)
    refGridFaltante.value.setcolumnproperty('codi_camp_6', 'text', codi_camp_6.value)
    refGridCanje.value.setcolumnproperty('codi_camp_1', 'text', codi_camp_1.value)
    refGridCanje.value.setcolumnproperty('codi_camp_2', 'text', codi_camp_2.value)
    refGridCanje.value.setcolumnproperty('codi_camp_3', 'text', codi_camp_3.value)
    refGridCanje.value.setcolumnproperty('codi_camp_4', 'text', codi_camp_4.value)
    refGridCanje.value.setcolumnproperty('codi_camp_5', 'text', codi_camp_5.value)
    refGridCanje.value.setcolumnproperty('codi_camp_6', 'text', codi_camp_6.value)
    refGridRetencionPegs.value.setcolumnproperty('codi_camp_1', 'text', codi_camp_1.value)
    refGridRetencionPegs.value.setcolumnproperty('codi_camp_2', 'text', codi_camp_2.value)
    refGridRetencionPegs.value.setcolumnproperty('codi_camp_3', 'text', codi_camp_3.value)
    refGridRetencionPegs.value.setcolumnproperty('codi_camp_4', 'text', codi_camp_4.value)
    refGridRetencionPegs.value.setcolumnproperty('codi_camp_5', 'text', codi_camp_5.value)
    refGridRetencionPegs.value.setcolumnproperty('codi_camp_6', 'text', codi_camp_6.value)
    refGridNivelLider.value.setcolumnproperty('codi_camp_1', 'text', codi_camp_1.value)
    refGridNivelLider.value.setcolumnproperty('codi_camp_2', 'text', codi_camp_2.value)
    refGridNivelLider.value.setcolumnproperty('codi_camp_3', 'text', codi_camp_3.value)
    refGridNivelLider.value.setcolumnproperty('codi_camp_4', 'text', codi_camp_4.value)
    refGridNivelLider.value.setcolumnproperty('codi_camp_5', 'text', codi_camp_5.value)
    refGridNivelLider.value.setcolumnproperty('codi_camp_6', 'text', codi_camp_6.value)

  } catch (error) {
    if (typeof error.response!= "undefined") {
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

const onLimpiar= async () => {
  formulario.value = {
    campana: null,
    zona: null,
  }
  codi_camp_1.value = '0'
  codi_camp_2.value = '0'
  codi_camp_3.value = '0'
  codi_camp_4.value = '0'
  codi_camp_5.value = '0'
  codi_camp_6.value = '0'

  refGridIncorporacion.value.setcolumnproperty('codi_camp_1', 'text', codi_camp_1.value)
  refGridIncorporacion.value.setcolumnproperty('codi_camp_2', 'text', codi_camp_2.value)
  refGridIncorporacion.value.setcolumnproperty('codi_camp_3', 'text', codi_camp_3.value)
  refGridIncorporacion.value.setcolumnproperty('codi_camp_4', 'text', codi_camp_4.value)
  refGridIncorporacion.value.setcolumnproperty('codi_camp_5', 'text', codi_camp_5.value)
  refGridIncorporacion.value.setcolumnproperty('codi_camp_6', 'text', codi_camp_6.value)
    
  refGridPedidosTotales.value.setcolumnproperty('codi_camp_1', 'text', codi_camp_1.value)
  refGridPedidosTotales.value.setcolumnproperty('codi_camp_2', 'text', codi_camp_2.value)
  refGridPedidosTotales.value.setcolumnproperty('codi_camp_3', 'text', codi_camp_3.value)
  refGridPedidosTotales.value.setcolumnproperty('codi_camp_4', 'text', codi_camp_4.value)
  refGridPedidosTotales.value.setcolumnproperty('codi_camp_5', 'text', codi_camp_5.value)
  refGridPedidosTotales.value.setcolumnproperty('codi_camp_6', 'text', codi_camp_6.value)

  refGridActividad.value.setcolumnproperty('codi_camp_1', 'text', codi_camp_1.value)
  refGridActividad.value.setcolumnproperty('codi_camp_2', 'text', codi_camp_2.value)
  refGridActividad.value.setcolumnproperty('codi_camp_3', 'text', codi_camp_3.value)
  refGridActividad.value.setcolumnproperty('codi_camp_4', 'text', codi_camp_4.value)
  refGridActividad.value.setcolumnproperty('codi_camp_5', 'text', codi_camp_5.value)
  refGridActividad.value.setcolumnproperty('codi_camp_6', 'text', codi_camp_6.value)
  refGridConsecutividadNuevas.value.setcolumnproperty('codi_camp_1', 'text', codi_camp_1.value)
  refGridConsecutividadNuevas.value.setcolumnproperty('codi_camp_2', 'text', codi_camp_2.value)
  refGridConsecutividadNuevas.value.setcolumnproperty('codi_camp_3', 'text', codi_camp_3.value)
  refGridConsecutividadNuevas.value.setcolumnproperty('codi_camp_4', 'text', codi_camp_4.value)
  refGridConsecutividadNuevas.value.setcolumnproperty('codi_camp_5', 'text', codi_camp_5.value)
  refGridConsecutividadNuevas.value.setcolumnproperty('codi_camp_6', 'text', codi_camp_6.value)
  
  refGridConsecutividadTotal.value.setcolumnproperty('codi_camp_1', 'text', codi_camp_1.value)
  refGridConsecutividadTotal.value.setcolumnproperty('codi_camp_2', 'text', codi_camp_2.value)
  refGridConsecutividadTotal.value.setcolumnproperty('codi_camp_3', 'text', codi_camp_3.value)
  refGridConsecutividadTotal.value.setcolumnproperty('codi_camp_4', 'text', codi_camp_4.value)
  refGridConsecutividadTotal.value.setcolumnproperty('codi_camp_5', 'text', codi_camp_5.value)
  refGridConsecutividadTotal.value.setcolumnproperty('codi_camp_6', 'text', codi_camp_6.value)

  refGridCapitalizacion.value.setcolumnproperty('codi_camp_1', 'text', codi_camp_1.value)
  refGridCapitalizacion.value.setcolumnproperty('codi_camp_2', 'text', codi_camp_2.value)
  refGridCapitalizacion.value.setcolumnproperty('codi_camp_3', 'text', codi_camp_3.value)
  refGridCapitalizacion.value.setcolumnproperty('codi_camp_4', 'text', codi_camp_4.value)
  refGridCapitalizacion.value.setcolumnproperty('codi_camp_5', 'text', codi_camp_5.value)
  refGridCapitalizacion.value.setcolumnproperty('codi_camp_6', 'text', codi_camp_6.value)

  refGridCobranza.value.setcolumnproperty('codi_camp_1', 'text', codi_camp_1.value)
  refGridCobranza.value.setcolumnproperty('codi_camp_2', 'text', codi_camp_2.value)
  refGridCobranza.value.setcolumnproperty('codi_camp_3', 'text', codi_camp_3.value)
  refGridCobranza.value.setcolumnproperty('codi_camp_4', 'text', codi_camp_4.value)
  refGridCobranza.value.setcolumnproperty('codi_camp_5', 'text', codi_camp_5.value)
  refGridCobranza.value.setcolumnproperty('codi_camp_6', 'text', codi_camp_6.value)

  refGridNumeroLideres.value.setcolumnproperty('codi_camp_1', 'text', codi_camp_1.value)
  refGridNumeroLideres.value.setcolumnproperty('codi_camp_2', 'text', codi_camp_2.value)
  refGridNumeroLideres.value.setcolumnproperty('codi_camp_3', 'text', codi_camp_3.value)
  refGridNumeroLideres.value.setcolumnproperty('codi_camp_4', 'text', codi_camp_4.value)
  refGridNumeroLideres.value.setcolumnproperty('codi_camp_5', 'text', codi_camp_5.value)
  refGridNumeroLideres.value.setcolumnproperty('codi_camp_6', 'text', codi_camp_6.value)
  refGridPppFacturado.value.setcolumnproperty('codi_camp_1', 'text', codi_camp_1.value)
  refGridPppFacturado.value.setcolumnproperty('codi_camp_2', 'text', codi_camp_2.value)
  refGridPppFacturado.value.setcolumnproperty('codi_camp_3', 'text', codi_camp_3.value)
  refGridPppFacturado.value.setcolumnproperty('codi_camp_4', 'text', codi_camp_4.value)
  refGridPppFacturado.value.setcolumnproperty('codi_camp_5', 'text', codi_camp_5.value)
  refGridPppFacturado.value.setcolumnproperty('codi_camp_6', 'text', codi_camp_6.value)
  refGridPppRecepcionado.value.setcolumnproperty('codi_camp_1', 'text', codi_camp_1.value)
  refGridPppRecepcionado.value.setcolumnproperty('codi_camp_2', 'text', codi_camp_2.value)
  refGridPppRecepcionado.value.setcolumnproperty('codi_camp_3', 'text', codi_camp_3.value)
  refGridPppRecepcionado.value.setcolumnproperty('codi_camp_4', 'text', codi_camp_4.value)
  refGridPppRecepcionado.value.setcolumnproperty('codi_camp_5', 'text', codi_camp_5.value)
  refGridPppRecepcionado.value.setcolumnproperty('codi_camp_6', 'text', codi_camp_6.value)
  refGridVentaLinea.value.setcolumnproperty('codi_camp_1', 'text', codi_camp_1.value)
  refGridVentaLinea.value.setcolumnproperty('codi_camp_2', 'text', codi_camp_2.value)
  refGridVentaLinea.value.setcolumnproperty('codi_camp_3', 'text', codi_camp_3.value)
  refGridVentaLinea.value.setcolumnproperty('codi_camp_4', 'text', codi_camp_4.value)
  refGridVentaLinea.value.setcolumnproperty('codi_camp_5', 'text', codi_camp_5.value)
  refGridVentaLinea.value.setcolumnproperty('codi_camp_6', 'text', codi_camp_6.value)
  refGridVentaRecepcionada.value.setcolumnproperty('codi_camp_1', 'text', codi_camp_1.value)
  refGridVentaRecepcionada.value.setcolumnproperty('codi_camp_2', 'text', codi_camp_2.value)
  refGridVentaRecepcionada.value.setcolumnproperty('codi_camp_3', 'text', codi_camp_3.value)
  refGridVentaRecepcionada.value.setcolumnproperty('codi_camp_4', 'text', codi_camp_4.value)
  refGridVentaRecepcionada.value.setcolumnproperty('codi_camp_5', 'text', codi_camp_5.value)
  refGridVentaRecepcionada.value.setcolumnproperty('codi_camp_6', 'text', codi_camp_6.value)
  refGridFaltante.value.setcolumnproperty('codi_camp_1', 'text', codi_camp_1.value)
  refGridFaltante.value.setcolumnproperty('codi_camp_2', 'text', codi_camp_2.value)
  refGridFaltante.value.setcolumnproperty('codi_camp_3', 'text', codi_camp_3.value)
  refGridFaltante.value.setcolumnproperty('codi_camp_4', 'text', codi_camp_4.value)
  refGridFaltante.value.setcolumnproperty('codi_camp_5', 'text', codi_camp_5.value)
  refGridFaltante.value.setcolumnproperty('codi_camp_6', 'text', codi_camp_6.value)
  refGridCanje.value.setcolumnproperty('codi_camp_1', 'text', codi_camp_1.value)
  refGridCanje.value.setcolumnproperty('codi_camp_2', 'text', codi_camp_2.value)
  refGridCanje.value.setcolumnproperty('codi_camp_3', 'text', codi_camp_3.value)
  refGridCanje.value.setcolumnproperty('codi_camp_4', 'text', codi_camp_4.value)
  refGridCanje.value.setcolumnproperty('codi_camp_5', 'text', codi_camp_5.value)
  refGridCanje.value.setcolumnproperty('codi_camp_6', 'text', codi_camp_6.value)
  refGridRetencionPegs.value.setcolumnproperty('codi_camp_1', 'text', codi_camp_1.value)
  refGridRetencionPegs.value.setcolumnproperty('codi_camp_2', 'text', codi_camp_2.value)
  refGridRetencionPegs.value.setcolumnproperty('codi_camp_3', 'text', codi_camp_3.value)
  refGridRetencionPegs.value.setcolumnproperty('codi_camp_4', 'text', codi_camp_4.value)
  refGridRetencionPegs.value.setcolumnproperty('codi_camp_5', 'text', codi_camp_5.value)
  refGridRetencionPegs.value.setcolumnproperty('codi_camp_6', 'text', codi_camp_6.value)
  refGridNivelLider.value.setcolumnproperty('codi_camp_1', 'text', codi_camp_1.value)
  refGridNivelLider.value.setcolumnproperty('codi_camp_2', 'text', codi_camp_2.value)
  refGridNivelLider.value.setcolumnproperty('codi_camp_3', 'text', codi_camp_3.value)
  refGridNivelLider.value.setcolumnproperty('codi_camp_4', 'text', codi_camp_4.value)
  refGridNivelLider.value.setcolumnproperty('codi_camp_5', 'text', codi_camp_5.value)
  refGridNivelLider.value.setcolumnproperty('codi_camp_6', 'text', codi_camp_6.value)

  inicioVariables()
}

const onExcel = async () => {
  try {
    appStore.mensaje('Generando archivo')
    appStore.loading(true)

    const { data } = await $api(`/api/sami/v1/reportes/semaforo-zona/excel`, {
      method: "post",
      body: {
        cabecera: headers.value,
        incorporacion: JSON.stringify(refGridIncorporacion.value.exportdata('xml')),
        consecutividadNuevas: JSON.stringify(refGridConsecutividadNuevas.value.exportdata('xml')),
        consecutividadTotal: JSON.stringify(refGridConsecutividadTotal.value.exportdata('xml')),
        pedidosTotales: JSON.stringify(refGridPedidosTotales.value.exportdata('xml')),

        actividad: JSON.stringify(refGridActividad.value.exportdata('xml')),
        cobranza: JSON.stringify(refGridCobranza.value.exportdata('xml')),
        capitalizacion: JSON.stringify(refGridCapitalizacion.value.exportdata('xml')),
        retencionPegs: JSON.stringify(refGridRetencionPegs.value.exportdata('xml')),
        numeroLideres: JSON.stringify(refGridNumeroLideres.value.exportdata('xml')),
        nivelLider: JSON.stringify(refGridNivelLider.value.exportdata('xml')),
  
        ventaLinea: JSON.stringify(refGridVentaLinea.value.exportdata('xml')),
        pppFacturado: JSON.stringify(refGridPppFacturado.value.exportdata('xml')),
        ventaRecepcionada: JSON.stringify(refGridVentaRecepcionada.value.exportdata('xml')),
        pppRecepcionado: JSON.stringify(refGridPppRecepcionado.value.exportdata('xml')),
        faltante: JSON.stringify(refGridFaltante.value.exportdata('xml')),
        canje: JSON.stringify(refGridCanje.value.exportdata('xml')),
      },
    })
    
    window.open(`${$base}/temporales/${data}`, '_blank')
  } catch (e) {
  }
  finally {
    appStore.loading(false)
  }
}

const inicioVariables = () => {
  sourcePedidosTotales.value.localdata = [
    {
      nomb_conc: 'Facturado',
      codi_camp_1: '0',
      codi_camp_2: '0',
      codi_camp_3: '0',
      codi_camp_4: '0',
      codi_camp_5: '0',
      codi_camp_6: '0',
      tota_camp: '0',
    },
    {
      nomb_conc: 'Objetivo',
      codi_camp_1: '0',
      codi_camp_2: '0',
      codi_camp_3: '0',
      codi_camp_4: '0',
      codi_camp_5: '0',
      codi_camp_6: '0',
      tota_camp: '0',
    },
    {
      nomb_conc: '% Cumplimiento',
      codi_camp_1: '0.00',
      codi_camp_2: '0.00',
      codi_camp_3: '0.00',
      codi_camp_4: '0.00',
      codi_camp_5: '0.00',
      codi_camp_6: '0.00',
      tota_camp: '0.00',
    },
  ]
  sourcePedidosTotales.value.datatype = 'json'
  refGridPedidosTotales.value.updatebounddata('cells')
  
  sourceIncorporacion.value.localdata = [
    {
      nomb_conc: 'Facturado',
      codi_camp_1: '0',
      codi_camp_2: '0',
      codi_camp_3: '0',
      codi_camp_4: '0',
      codi_camp_5: '0',
      codi_camp_6: '0',
      tota_camp: '0',
    },
    {
      nomb_conc: 'Objetivo',
      codi_camp_1: '0',
      codi_camp_2: '0',
      codi_camp_3: '0',
      codi_camp_4: '0',
      codi_camp_5: '0',
      codi_camp_6: '0',
      tota_camp: '0',
    },
    {
      nomb_conc: '% Cumplimiento',
      codi_camp_1: '0.00',
      codi_camp_2: '0.00',
      codi_camp_3: '0.00',
      codi_camp_4: '0.00',
      codi_camp_5: '0.00',
      codi_camp_6: '0.00',
      tota_camp: '0.00',
    },
  ]
  sourceIncorporacion.value.datatype = 'json'
  refGridIncorporacion.value.updatebounddata('cells')

  sourceActividad.value.localdata = [
    {
      nomb_conc: 'Facturado',
      codi_camp_1: '0.00',
      codi_camp_2: '0.00',
      codi_camp_3: '0.00',
      codi_camp_4: '0.00',
      codi_camp_5: '0.00',
      codi_camp_6: '0.00',
      tota_camp: '0.00',
    },
   
    
  ]
  sourceActividad.value.datatype = 'json'
  refGridActividad.value.updatebounddata('cells')
  
  sourceConsecutividadNuevas.value.localdata = [
    {
      nomb_conc: 'Facturado',
      codi_camp_1: '0.00',
      codi_camp_2: '0.00',
      codi_camp_3: '0.00',
      codi_camp_4: '0.00',
      codi_camp_5: '0.00',
      codi_camp_6: '0.00',
      tota_camp: '0.00',
    },
    {
      nomb_conc: 'Objetivo',
      codi_camp_1: '0.00',
      codi_camp_2: '0.00',
      codi_camp_3: '0.00',
      codi_camp_4: '0.00',
      codi_camp_5: '0.00',
      codi_camp_6: '0.00',
      tota_camp: '0.00',
    },
    {
      nomb_conc: 'Diferencia',
      codi_camp_1: '0.00',
      codi_camp_2: '0.00',
      codi_camp_3: '0.00',
      codi_camp_4: '0.00',
      codi_camp_5: '0.00',
      codi_camp_6: '0.00',
      tota_camp: '0.00',
    },
  ]

  sourceConsecutividadTotal.value.localdata = [
    {
      nomb_conc: 'Concepto',
      codi_camp_1: '0.00',
      codi_camp_2: '0.00',
      codi_camp_3: '0.00',
      codi_camp_4: '0.00',
      codi_camp_5: '0.00',
      codi_camp_6: '0.00',
      tota_camp: '0.00',
    },
    {
      nomb_conc: 'Facturado',
      codi_camp_1: '0.00',
      codi_camp_2: '0.00',
      codi_camp_3: '0.00',
      codi_camp_4: '0.00',
      codi_camp_5: '0.00',
      codi_camp_6: '0.00',
      tota_camp: '0.00',
    },
    {
      nomb_conc: '% Cumplimiento',
      codi_camp_1: '0.00',
      codi_camp_2: '0.00',
      codi_camp_3: '0.00',
      codi_camp_4: '0.00',
      codi_camp_5: '0.00',
      codi_camp_6: '0.00',
      tota_camp: '0.00',
    },
  ]
  sourceConsecutividadNuevas.value.datatype = 'json'
  refGridConsecutividadNuevas.value.updatebounddata('cells')

  sourceConsecutividadTotal.value.datatype = 'json'
  refGridConsecutividadTotal.value.updatebounddata('cells')
  
  sourceCapitalizacion.value.localdata = [
    {
      nomb_conc: 'Facturado',
      codi_camp_1: '0',
      codi_camp_2: '0',
      codi_camp_3: '0',
      codi_camp_4: '0',
      codi_camp_5: '0',
      codi_camp_6: '0',
      tota_camp: '0',
    },
  ]
  sourceCapitalizacion.value.datatype = 'json'
  refGridCapitalizacion.value.updatebounddata('cells')
  
  sourceCobranza.value.localdata = [
    {
      nomb_conc: 'Deuda 21 dias',
      codi_camp_1: '0.00',
      codi_camp_2: '0.00',
      codi_camp_3: '0.00',
      codi_camp_4: '0.00',
      codi_camp_5: '0.00',
      codi_camp_6: '0.00',
      tota_camp: '0.00',
    },
    {
      nomb_conc: 'Venta Facturada',
      codi_camp_1: '0.00',
      codi_camp_2: '0.00',
      codi_camp_3: '0.00',
      codi_camp_4: '0.00',
      codi_camp_5: '0.00',
      codi_camp_6: '0.00',
      tota_camp: '0.00',
    },
    {
      nomb_conc: '% 21 días',
      codi_camp_1: '0.00',
      codi_camp_2: '0.00',
      codi_camp_3: '0.00',
      codi_camp_4: '0.00',
      codi_camp_5: '0.00',
      codi_camp_6: '0.00',
      tota_camp: '0.00',
    },
    {
      nomb_conc: '% 31 días',
      codi_camp_1: '0.00',
      codi_camp_2: '0.00',
      codi_camp_3: '0.00',
      codi_camp_4: '0.00',
      codi_camp_5: '0.00',
      codi_camp_6: '0.00',
      tota_camp: '0.00',
    },
    {
      nomb_conc: 'Saldo Actual',
      codi_camp_1: '0.00',
      codi_camp_2: '0.00',
      codi_camp_3: '0.00',
      codi_camp_4: '0.00',
      codi_camp_5: '0.00',
      codi_camp_6: '0.00',
      tota_camp: '0.00',
    },
  ]
  sourceCobranza.value.datatype = 'json'
  refGridCobranza.value.updatebounddata('cells')
 
  sourceNumeroLideres.value.localdata = [
    {
      nomb_conc: 'Nro',
      codi_camp_1: '0',
      codi_camp_2: '0',
      codi_camp_3: '0',
      codi_camp_4: '0',
      codi_camp_5: '0',
      codi_camp_6: '0',
      tota_camp: '0.00',
    },
  ]
  sourceNumeroLideres.value.datatype = 'json'
  refGridNumeroLideres.value.updatebounddata('cells')
  
  sourcePppFacturado.value.localdata = [
    {
      nomb_conc: 'Facturado',
      codi_camp_1: '0.00',
      codi_camp_2: '0.00',
      codi_camp_3: '0.00',
      codi_camp_4: '0.00',
      codi_camp_5: '0.00',
      codi_camp_6: '0.00',
      tota_camp: '0.00',
    },
  ]
  sourcePppFacturado.value.datatype = 'json'
  refGridPppFacturado.value.updatebounddata('cells')
  
  sourcePppRecepcionado.value.localdata = [
    {
      nomb_conc: 'Facturado',
      codi_camp_1: '0.00',
      codi_camp_2: '0.00',
      codi_camp_3: '0.00',
      codi_camp_4: '0.00',
      codi_camp_5: '0.00',
      codi_camp_6: '0.00',
      tota_camp: '0.00',
    },
  ]
  sourcePppRecepcionado.value.datatype = 'json'
  refGridPppRecepcionado.value.updatebounddata('cells')
  
  sourceVentaLinea.value.localdata = [
    {
      nomb_conc: 'Facturado',
      codi_camp_1: '0.00',
      codi_camp_2: '0.00',
      codi_camp_3: '0.00',
      codi_camp_4: '0.00',
      codi_camp_5: '0.00',
      codi_camp_6: '0.00',
      tota_camp: '0.00',
    },
  ]
  sourceVentaLinea.value.datatype = 'json'
  refGridVentaLinea.value.updatebounddata('cells')
  
  sourceVentaRecepcionada.value.localdata = [
    {
      nomb_conc: 'Facturado',
      codi_camp_1: '0.00',
      codi_camp_2: '0.00',
      codi_camp_3: '0.00',
      codi_camp_4: '0.00',
      codi_camp_5: '0.00',
      codi_camp_6: '0.00',
      tota_camp: '0.00',
    },
  ]
  sourceVentaRecepcionada.value.datatype = 'json'
  refGridVentaRecepcionada.value.updatebounddata('cells')
  
  sourceFaltante.value.localdata = [
    {
      nomb_conc: 'Porcentaje',
      codi_camp_1: '0.00',
      codi_camp_2: '0.00',
      codi_camp_3: '0.00',
      codi_camp_4: '0.00',
      codi_camp_5: '0.00',
      codi_camp_6: '0.00',
      tota_camp: '0.00',
    },
  ]
  sourceFaltante.value.datatype = 'json'
  refGridFaltante.value.updatebounddata('cells')
  
  sourceCanje.value.localdata = [
    {
      nomb_conc: 'Venta Neta',
      codi_camp_1: '0.00',
      codi_camp_2: '0.00',
      codi_camp_3: '0.00',
      codi_camp_4: '0.00',
      codi_camp_5: '0.00',
      codi_camp_6: '0.00',
      tota_camp: '0.00',
    },
     {
      nomb_conc: '% de C&D',
      codi_camp_1: '0.00',
      codi_camp_2: '0.00',
      codi_camp_3: '0.00',
      codi_camp_4: '0.00',
      codi_camp_5: '0.00',
      codi_camp_6: '0.00',
      tota_camp: '0.00',
    },
  ]
  sourceCanje.value.datatype = 'json'
  refGridCanje.value.updatebounddata('cells')

  sourceRetencionPegs.value.localdata = [
    {
      nomb_conc: 'Ret. Peg 21',
      codi_camp_1: '0.00',
      codi_camp_2: '0.00',
      codi_camp_3: '0.00',
      codi_camp_4: '0.00',
      codi_camp_5: '0.00',
      codi_camp_6: '0.00',
      tota_camp: '0.00',
    },
    {
      nomb_conc: 'Ret. Peg 42',
      codi_camp_1: '0.00',
      codi_camp_2: '0.00',
      codi_camp_3: '0.00',
      codi_camp_4: '0.00',
      codi_camp_5: '0.00',
      codi_camp_6: '0.00',
      tota_camp: '0.00',
    },
    {
      nomb_conc: 'Ret. Peg 63',
      codi_camp_1: '0.00',
      codi_camp_2: '0.00',
      codi_camp_3: '0.00',
      codi_camp_4: '0.00',
      codi_camp_5: '0.00',
      codi_camp_6: '0.00',
      tota_camp: '0.00',
    },
  ]
  sourceRetencionPegs.value.datatype = 'json'
  refGridRetencionPegs.value.updatebounddata('cells')

  sourceNivelLider.value.localdata = [
    {
      nomb_conc: 'SIN RANGO',
      codi_camp_1: '0',
      codi_camp_2: '0',
      codi_camp_3: '0',
      codi_camp_4: '0',
      codi_camp_5: '0',
      codi_camp_6: '0',
      tota_camp: '0',
    },
    {
      nomb_conc: 'EXPLORADORA',
      codi_camp_1: '0',
      codi_camp_2: '0',
      codi_camp_3: '0',
      codi_camp_4: '0',
      codi_camp_5: '0',
      codi_camp_6: '0',
      tota_camp: '0',
    },
    {
      nomb_conc: 'SOL',
      codi_camp_1: '0',
      codi_camp_2: '0',
      codi_camp_3: '0',
      codi_camp_4: '0',
      codi_camp_5: '0',
      codi_camp_6: '0',
      tota_camp: '0',
    },
    {
      nomb_conc: 'FUEGO',
      codi_camp_1: '0',
      codi_camp_2: '0',
      codi_camp_3: '0',
      codi_camp_4: '0',
      codi_camp_5: '0',
      codi_camp_6: '0',
      tota_camp: '0',
    },
    {
      nomb_conc: 'TIERRA',
      codi_camp_1: '0',
      codi_camp_2: '0',
      codi_camp_3: '0',
      codi_camp_4: '0',
      codi_camp_5: '0',
      codi_camp_6: '0',
      tota_camp: '0',
    },
    {
      nomb_conc: 'PLANTA',
      codi_camp_1: '0',
      codi_camp_2: '0',
      codi_camp_3: '0',
      codi_camp_4: '0',
      codi_camp_5: '0',
      codi_camp_6: '0',
      tota_camp: '0',
    },
    {
      nomb_conc: 'FRUTO',
      codi_camp_1: '0',
      codi_camp_2: '0',
      codi_camp_3: '0',
      codi_camp_4: '0',
      codi_camp_5: '0',
      codi_camp_6: '0',
      tota_camp: '0',
    },
    {
      nomb_conc: 'LEGENDARIA',
      codi_camp_1: '0',
      codi_camp_2: '0',
      codi_camp_3: '0',
      codi_camp_4: '0',
      codi_camp_5: '0',
      codi_camp_6: '0',
      tota_camp: '0',
    },
  ]
  sourceNivelLider.value.datatype = 'json'
  refGridNivelLider.value.updatebounddata('cells')

}

const limpiarValidacion = () => {
  errorCampana.value = false
  errorMensajeCampana.value = ''
  errorZona.value = false
  errorMensajeZona.value = ''
}
</script>
<style>
/* Aplica solo dentro del módulo específico */
.cont_sema_zona .jqx-grid-cell,
.cont_sema_zona .jqx-grid-column-header {
  border-right: none !important;  /* Quitar línea vertical derecha */
  border-left: none !important;   /* Quitar línea vertical izquierda si existe */
  border-bottom: 1px solid #e0e0e0 !important; /* Línea horizontal */
}

/* Elimina bordes laterales del contenido */
.cont_sema_zona .jqx-grid-content {
  border-left: none !important;
  border-right: none !important;
}

/* También afecta la barra de estado si la hay */
.cont_sema_zona .jqx-grid-statusbar {
  border-left: none !important;
  border-right: none !important;
}

/* Elimina cualquier borde del grid completo */
.cont_sema_zona .jqx-widget {
  border: none !important;
}
</style>

<template >
  
  <div>
    <AppPlantilla>
      <template #botones>
        <GenerarBoton @procesar="onGenerar" />
        <ExcelBoton @procesar="onExcel" />
        <LimpiarBoton @procesar="onLimpiar" />
      </template>
      
      <template #contenido >
        <!-- <div > -->
          <VRow >
            
            <VCol cols="12">
              <VCard title="Buscar semáforo">
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
             <VCol cols="12" class="cont_sema_zona">
              <VCard title="Pedidos totales">
                <VCardText>
                  <div >
                    <JqxGrid
                      ref="refGridPedidosTotales"
                      theme="material"
                      width="100%"
                      autoheight
                      class="cont_sema_zona"
                      :enablehover="false"
                      :columns="columnsPedidosTotales"
                      :source="adaptadorPedidosTotales"
                      :localization="localization"
                      enableanimations
                      sortable
                      sortmode="many"
                      :filterable="false"
                      columnsresize
                      :altrows="false"
                      :showemptyrow="false"
                      columnsreorder
                      :showstatusbar="false"
                      :showaggregates="false"
                      selectionmode="singlecell"
                      scrollmode="logical"
                      :showfilterrow="false"
                      :columnsmenu="false"
                    />
                  </div>
                </VCardText>
              </VCard>
            </VCol>
  
            <VCol cols="12" class="cont_sema_zona">
              <VCard title="Incorporación">
                <VCardText>
                  <JqxGrid
                    ref="refGridIncorporacion"
                    theme="material"
                    width="100%"
                    class="cont_sema_zona"
                    autoheight
                    :enablehover="false"
                    :columns="columnsIncorporacion"
                    :source="adaptadorIncorporacion"
                    :localization="localization"
                    enableanimations
                    sortable
                    sortmode="many"
                    :autoshowloadelement="false"
                    :showdefaultloadelement="false"
                    :filterable="false"
                    columnsresize
                    :altrows="false"
                    :showemptyrow="false"
                    columnsreorder
                    :showstatusbar="false"
                    :showaggregates="false"
                    selectionmode="singlecell"
                    scrollmode="logical"
                    :showfilterrow="false"
                    :columnsmenu="false"
                  />
                </VCardText>
              </VCard>
            </VCol>
  
            <VCol cols="12" class="cont_sema_zona">
              <VCard title="% Actividad" >
                <VCardText>
                  <JqxGrid
                    ref="refGridActividad"
                    theme="material"
                    width="100%"
                    class="cont_sema_zona"
                    autoheight
                    :enablehover="false"
                    :columns="columnsActividad"
                    :source="adaptadorActividad"
                    :localization="localization"
                    enableanimations
                    sortable
                    sortmode="many"
                    :filterable="false"
                    columnsresize
                    :altrows="false"
                    :showemptyrow="false"
                    columnsreorder
                    :showstatusbar="false"
                    :showaggregates="false"
                    selectionmode="singlecell"
                    scrollmode="logical"
                    :showfilterrow="false"
                    :columnsmenu="false"
                  />
                </VCardText>
              </VCard>
            </VCol>
  
   <VCol cols="12" class="cont_sema_zona">
              <VCard title="Consecutividad Total">
                <VCardText>
                  <JqxGrid
                    ref="refGridConsecutividadTotal"
                    theme="material"
                    width="100%"
                    autoheight
                    flat
                    class="cont_sema_zona"
                    :enablehover="false"
                    :columns="columnsConsecutividadTotal"
                    :source="adaptadorConsecutividadTotal"
                    :localization="localization"
                    enableanimations
                    sortable
                    sortmode="many"
                    :filterable="false"
                    columnsresize
                    :altrows="false"
                    :showemptyrow="false"
                    columnsreorder
                    :showstatusbar="false"
                    :showaggregates="false"
                    selectionmode="singlecell"
                    scrollmode="logical"
                    :showfilterrow="false"
                    :columnsmenu="false"
                  />
                </VCardText>
              </VCard>
            </VCol>
  
            <VCol cols="12" class="cont_sema_zona">
              <VCard title="Consecutividad nuevas">
                <VCardText>
                  <JqxGrid
                    ref="refGridConsecutividadNuevas"
                    theme="material"
                    width="100%"
                    autoheight
                    flat
                    class="cont_sema_zona"
                    :enablehover="false"
                    :columns="columnsConsecutividadNuevas"
                    :source="adaptadorConsecutividadNuevas"
                    :localization="localization"
                    enableanimations
                    sortable
                    sortmode="many"
                    :filterable="false"
                    columnsresize
                    :altrows="false"
                    :showemptyrow="false"
                    columnsreorder
                    :showstatusbar="false"
                    :showaggregates="false"
                    selectionmode="singlecell"
                    scrollmode="logical"
                    :showfilterrow="false"
                    :columnsmenu="false"
                  />
                </VCardText>
              </VCard>
            </VCol>
  
                <VCol cols="12" class="cont_sema_zona">
              <VCard title="Retención pegs">
                <VCardText>
                  <JqxGrid
                    ref="refGridRetencionPegs"
                    theme="material"
                    width="100%"
                    autoheight
                     class="cont_sema_zona"
                    :enablehover="false"
                    :columns="columnsRetencionPegs"
                    :source="adaptadorRetencionPegs"
                    :localization="localization"
                    enableanimations
                    sortable
                    sortmode="many"
                    :filterable="false"
                    columnsresize
                    :altrows="false"
                    :showemptyrow="false"
                    columnsreorder
                    :showstatusbar="false"
                    :showaggregates="false"
                    selectionmode="singlecell"
                    scrollmode="logical"
                    :showfilterrow="false"
                    :columnsmenu="false"
                  />
                </VCardText>
              </VCard>
            </VCol>
  
               <VCol cols="12" class="cont_sema_zona">
              <VCard title="Capitalización">
                <VCardText>
                  <JqxGrid
                    ref="refGridCapitalizacion"
                    theme="material"
                    width="100%"
                    autoheight
                    class="cont_sema_zona"
                    :enablehover="false"
                    :columns="columnsCapitalizacion"
                    :source="adaptadorCapitalizacion"
                    :localization="localization"
                    enableanimations
                    sortable
                    sortmode="many"
                    :filterable="false"
                    columnsresize
                    :altrows="false"
                    :showemptyrow="false"
                    columnsreorder
                    :showstatusbar="false"
                    :showaggregates="false"
                    selectionmode="singlecell"
                    scrollmode="logical"
                    :showfilterrow="false"
                    :columnsmenu="false"
                  />
                </VCardText>
              </VCard>
            </VCol>
  
             <VCol cols="12">
              <VCard title="Cobranza" class="cont_sema_zona">
                <VCardText>
                  <JqxGrid
                    ref="refGridCobranza"
                    theme="material"
                    width="100%"
                    autoheight
                    class="cont_sema_zona"
                    :enablehover="false"
                    :columns="columnsCobranza"
                    :source="adaptadorCobranza"
                    :localization="localization"
                    enableanimations
                    sortable
                    sortmode="many"
                    :filterable="false"
                    columnsresize
                    :altrows="false"
                    :showemptyrow="false"
                    columnsreorder
                    :showstatusbar="false"
                    :showaggregates="false"
                    selectionmode="singlecell"
                    scrollmode="logical"
                    :showfilterrow="false"
                    :columnsmenu="false"
                  />
                </VCardText>
              </VCard>
            </VCol>
  
             <VCol cols="12" class="cont_sema_zona">
              <VCard title="Venta linea">
                <VCardText>
                  <JqxGrid
                    ref="refGridVentaLinea"
                    theme="material"
                    width="100%"
                    autoheight
                    class="cont_sema_zona"
                    :enablehover="false"
                    :columns="columnsVentaLinea"
                    :source="adaptadorVentaLinea"
                    :localization="localization"
                    enableanimations
                    sortable
                    sortmode="many"
                    :filterable="false"
                    columnsresize
                    :altrows="false"
                    :showemptyrow="false"
                    columnsreorder
                    :showstatusbar="false"
                    :showaggregates="false"
                    selectionmode="singlecell"
                    scrollmode="logical"
                    :showfilterrow="false"
                    :columnsmenu="false"
                  />
                </VCardText>
              </VCard>
            </VCol>
  
                <VCol cols="12" class="cont_sema_zona">
              <VCard title="PPP facturado">
                <VCardText>
                  <JqxGrid
                    ref="refGridPppFacturado"
                    theme="material"
                    width="100%"
                    autoheight
                    class="cont_sema_zona"
                    :enablehover="false"
                    :columns="columnsPppFacturado"
                    :source="adaptadorPppFacturado"
                    :localization="localization"
                    enableanimations
                    sortable
                    sortmode="many"
                    :filterable="false"
                    columnsresize
                    :altrows="false"
                    :showemptyrow="false"
                    columnsreorder
                    :showstatusbar="false"
                    :showaggregates="false"
                    selectionmode="singlecell"
                    scrollmode="logical"
                    :showfilterrow="false"
                    :columnsmenu="false"
                  />
                </VCardText>
              </VCard>
            </VCol>
  
            <VCol cols="12" class="cont_sema_zona">
              <VCard title="Venta recepcionada">
                <VCardText>
                  <JqxGrid
                    ref="refGridVentaRecepcionada"
                    theme="material"
                    width="100%"
                    autoheight
                    class="cont_sema_zona"
                    :enablehover="false"
                    :columns="columnsVentaRecepcionada"
                    :source="adaptadorVentaRecepcionada"
                    :localization="localization"
                    enableanimations
                    sortable
                    sortmode="many"
                    :filterable="false"
                    columnsresize
                    :altrows="false"
                    :showemptyrow="false"
                    columnsreorder
                    :showstatusbar="false"
                    :showaggregates="false"
                    selectionmode="singlecell"
                    scrollmode="logical"
                    :showfilterrow="false"
                    :columnsmenu="false"
                  />
                </VCardText>
              </VCard>
            </VCol>
  
            <VCol cols="12" class="cont_sema_zona">
              <VCard title="PPP recepcionado">
                <VCardText>
                  <JqxGrid
                    ref="refGridPppRecepcionado"
                    theme="material"
                    width="100%"
                    autoheight
                    class="cont_sema_zona"
                    :enablehover="false"
                    :columns="columnsPppRecepcionado"
                    :source="adaptadorPppRecepcionado"
                    :localization="localization"
                    enableanimations
                    sortable
                    sortmode="many"
                    :filterable="false"
                    columnsresize
                    :altrows="false"
                    :showemptyrow="false"
                    columnsreorder
                    :showstatusbar="false"
                    :showaggregates="false"
                    selectionmode="singlecell"
                    scrollmode="logical"
                    :showfilterrow="false"
                    :columnsmenu="false"
                  />
                </VCardText>
              </VCard>
            </VCol>
  
            <VCol cols="12" class="cont_sema_zona">
              <VCard title="Faltante">
                <VCardText>
                  <JqxGrid
                    ref="refGridFaltante"
                    theme="material"
                    width="100%"
                    autoheight
                    class="cont_sema_zona"
                    :enablehover="false"
                    :columns="columnsFaltante"
                    :source="adaptadorFaltante"
                    :localization="localization"
                    enableanimations
                    sortable
                    sortmode="many"
                    :filterable="false"
                    columnsresize
                    :altrows="false"
                    :showemptyrow="false"
                    columnsreorder
                    :showstatusbar="false"
                    :showaggregates="false"
                    selectionmode="singlecell"
                    scrollmode="logical"
                    :showfilterrow="false"
                    :columnsmenu="false"
                  />
                </VCardText>
              </VCard>
            </VCol>
  
             <VCol cols="12" class="cont_sema_zona">
              <VCard title="Cambios y devoluciones">
                <VCardText>
                  <JqxGrid
                    ref="refGridCanje"
                    theme="material"
                    width="100%"
                    autoheight
                    class="cont_sema_zona"
                    :enablehover="false"
                    :columns="columnsCanje"
                    :source="adaptadorCanje"
                    :localization="localization"
                    enableanimations
                    sortable
                    sortmode="many"
                    :filterable="false"
                    columnsresize
                    :altrows="false"
                    :showemptyrow="false"
                    columnsreorder
                    :showstatusbar="false"
                    :showaggregates="false"
                    selectionmode="singlecell"
                    scrollmode="logical"
                    :showfilterrow="false"
                    :columnsmenu="false"
                  />
                </VCardText>
              </VCard>
            </VCol>
  
            <VCol cols="12" class="cont_sema_zona">
              <VCard title="N° de Lideres">
                <VCardText>
                  <JqxGrid
                    ref="refGridNumeroLideres"
                    theme="material"
                    width="100%"
                    autoheight
                    class="cont_sema_zona"
                    :enablehover="false"
                    :columns="columnsNumeroLideres"
                    :source="adaptadorNumeroLideres"
                    :localization="localization"
                    enableanimations
                    sortable
                    sortmode="many"
                    :filterable="false"
                    columnsresize
                    :altrows="false"
                    :showemptyrow="false"
                    columnsreorder
                    :showstatusbar="false"
                    :showaggregates="false"
                    selectionmode="singlecell"
                    scrollmode="logical"
                    :showfilterrow="false"
                    :columnsmenu="false"
                  />
                </VCardText>
              </VCard>
            </VCol>
  
            <VCol cols="12" class="cont_sema_zona">
              <VCard title="Nivel de líderes">
                <VCardText>
                  <JqxGrid
                    ref="refGridNivelLider"
                    theme="material"
                    width="100%"
                    autoheight
                    class="cont_sema_zona"
                    :enablehover="false"
                    :columns="columnsNivelLider"
                    :source="adaptadorNivelLider"
                    :localization="localization"
                    enableanimations
                    sortable
                    sortmode="many"
                    :filterable="false"
                    columnsresize
                    :altrows="false"
                    :showemptyrow="false"
                    columnsreorder
                    :showstatusbar="false"
                    :showaggregates="false"
                    selectionmode="singlecell"
                    scrollmode="logical"
                    :showfilterrow="false"
                    :columnsmenu="false"
                  />
                </VCardText>
              </VCard>
            </VCol>
  
            <!-- <VCol cols="12">
              <VCard title="Líderes segun plan de carrera">
                <VCardText>
                  <JqxGrid
                    ref="refGridLiderPlanCarrera"
                    theme="material"
                    width="100%"
                    autoheight
                    :enablehover="false"
                    :columns="columnsLiderPlanCarrera"
                    :source="adaptadorLiderPlanCarrera"
                    :localization="localization"
                    enableanimations
                    sortable
                    sortmode="many"
                    :filterable="false"
                    columnsresize
                    :altrows="false"
                    :showemptyrow="false"
                    columnsreorder
                    :showstatusbar="false"
                    :showaggregates="false"
                    selectionmode="singlecell"
                    scrollmode="logical"
                    :showfilterrow="false"
                    :columnsmenu="false"
                  />
                </VCardText>
              </VCard>
            </VCol> -->
  
           
  
        
           
          </VRow>
        <!-- </div> -->
      </template>
    </AppPlantilla>
  </div>
</template>
 