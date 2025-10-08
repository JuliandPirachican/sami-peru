<!-- eslint-disable camelcase -->
<script setup>
import { useAppStore } from '@/stores/app'
import { EncryptStorage } from 'encrypt-storage'
import JqxGrid from "jqwidgets-scripts/jqwidgets-vue3/vue_jqxgrid.vue"

definePage({
  meta: {
    action: 'colombia/repo_come_proy_camp_regi',
    subject: 'colombia/repo_come_proy_camp_regi',
  },
})

const encryptStorage = new EncryptStorage('AZZORTI-SAMI', {
  storageType: 'localStorage',
})

const userData = encryptStorage.getItem('userData')
const appStore = useAppStore()

const formulario = ref({
  campana: null,
  area: null,
})

/*const general = ref({
  objetivoIncorporacion: '0',
  proyeccionIncorporacion: '0',
  proyeccionPorcentajeIncorporacion: '0.00',
  reproyeccionIncorporacion: '0',
  reproyeccionPorcentajeIncorporacion: '0.00',
  objetivoRetencion: '0',
  proyeccionRetencion: '0',
  proyeccionPorcentajeRetencion: '0.00',
  reproyeccionRetencion: '0',
  reproyeccionPorcentajeRetencion: '0', 
  objetivoActividad: '0.00',
  proyeccionActividad: '0.00',
  proyeccionPorcentajeActividad: '0.00',
  reproyeccionActividad: '0.00',
  reproyeccionPorcentajeActividad: '0.00',
})*/

const general = ref({
  objetivoIncorporacion: '0',
  proyeccionIncorporacion: '0',
  proyeccionPorcentajeIncorporacion: 0,
  reproyeccionIncorporacion: '0', 
  objetivoRetencion: '0',
  proyeccionRetencion: '0',
  reproyeccionRetencion: '0',
  objetivoActividad: '0',
  proyeccionActividad: '0',
  proyeccionPorcentajeActividad: 0,
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

const selectedVariable = ref(0)

const itemsCorte = ref([])
const itemsZona = ref([])

const cabecera = computed(() => {
  return [
    {
      title: 'Corte',
      key: 'codi_cort',
      columna: 'A',
    },
    {
      title: 'Región',
      key: 'codi_area',
      columna: 'B',
    },
    {
      title: 'Nro zonas',
      key: 'tota_zona',
      columna: 'C',
    },
    {
      text: 'Act. inic.',
      dataField: 'acti_inic',
      width: '100',
      align: 'center',
      cellsalign: 'center',
      editable: false,
      pinned: true,
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
      text: 'Objetivo Ventas',
      dataField: 'obje_vent',
      width: '150',
      align: 'center',
      cellsalign: 'center',
      editable: false,
      pinned: true,
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
      text: 'Proyección',
      dataField: 'pedi_inco_obje',   
      width: '140',
      align: 'center',
      cellsalign: 'center',
      editable: true,
      columngroup: 'tota',
      cellsformat: 'N',
      filtertype: 'number',
      cellclassname: ' bg-primary-light',
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
      text: 'Seguimiento',
      dataField: 'segui_inco',
      width: '140',
      align: 'center',
      cellsalign: 'center',
      editable: true,
      columngroup: 'tota',
      cellsformat: 'N',
      filtertype: 'number',
      cellclassname: ' bg-primary-light',
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
      text: 'Ped. Camp. Ante',
      datafield: 'pedi_tota_obje',
      width: '140',
      align: 'center',
      cellsalign: 'center',
      editable: false,
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
      text: 'Proyeccion',
      dataField: 'pedi_tota_prim',
      width: '140',
      align: 'center',
      cellsalign: 'center',
      editable: true,
      columngroup: 'inco',
      cellsformat: 'N',
      filtertype: 'number',
      cellclassname: ' bg-primary-light',
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
      text: 'Seguimiento',
      dataField: 'segui_conse',
      width: '140',
      align: 'center',
      cellsalign: 'center',
      editable: true,
      columngroup: 'inco',
      cellsformat: 'N',
      filtertype: 'number',
      cellclassname: ' bg-primary-light',
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
      text: '1. Camp. Ante',
      datafield: 'cons_rete_camp_ante',
      width: '140',
      align: 'center',
      cellsalign: 'center',
      editable: false,
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
    },
  
    {
      text: 'Proyeccion',
      datafield: 'cons_rete_prim',
      width: '140',
      align: 'center',
      cellsalign: 'center',
      editable: true,
      columngroup: 'rete',
      cellsformat: 'N',
      cellclassname: ' bg-primary-light',
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
      cellclassname: ' bg-primary-light',
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
      text: '2. Camp. Ante.',
      datafield: 'cons_segu_camp_ante',
      hidden: false,
      width: '120',
      align: 'center',
      cellsalign: 'center',
      editable: false,
      columngroup: 'acti',
      cellsformat: 'N',
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
    
    },
    {
      text: 'Proyección',
      datafield: 'cons_segu_obje',
      width: '120',
      align: 'center',
      cellsalign: 'center',
      editable: true,
      columngroup: 'acti',
      cellsformat: 'N',
      filtertype: 'number',
      cellclassname: ' bg-primary-light',
      columna: 'O',
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
      cellclassname: ' bg-primary-light',
      columna: 'P',
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
      datafield: 'cons_terc_camp_ante',
      hidden: false,
      width: '120',
      align: 'center',
      cellsalign: 'center',
      editable: false,
      columngroup: 'cons4_ped',
      cellsformat: 'N',
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
    
    },
    {
      text: 'Proyección',
      datafield: 'cons_terc_obje',
      width: '120',
      align: 'center',
      cellsalign: 'center',
      editable: true,
      columngroup: 'cons4_ped',
      cellsformat: 'N',
      filtertype: 'number',
      cellclassname: ' bg-primary-light',
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
      text: 'Seguimiento',
      datafield: 'cons_terc_segi',
      width: '140',
      align: 'center',
      cellsalign: 'center',
      editable: true,
      columngroup: 'cons4_ped',
      cellsformat: 'P2',
      filtertype: 'number',
      cellclassname: ' bg-primary-light',
      columna: 'S',
      aggregates: [
        {
          T: function (aggregatedValue, currentValue) {
            aggregatedValue += currentValue
          
            return aggregatedValue!==undefined && !isNaN(aggregatedValue)?aggregatedValue:0
          },
        },
      ],
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
      columna: 'T',
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
      cellclassname: ' bg-primary-light',
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
      cellclassname: ' bg-primary-light',
      columna: 'V',
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
      columna: 'W',
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
      cellclassname: ' bg-primary-light',
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
      text: 'Seguimiento',
      datafield: 'pe42_prim',
      hidden: false,
      width: '130',
      align: 'center',
      cellsalign: 'center',
      editable: true,
      columngroup: 'pe42',
      cellsformat: 'N',
      cellclassname: ' bg-primary-light',
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
      validation(cell, value) {
        if (value === '0') {
          return true
        }
      
        return !(value === '')
      },
    
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
      columna: 'Z',
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
      cellclassname: ' bg-primary-light',
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
      text: 'Seguimiento',
      datafield: 'pe63_prim',
      hidden: false, 
      width: '130',
      align: 'center',
      cellsalign: 'center',
      editable: true,
      columngroup: 'pe63',
      cellsformat: 'N',
      cellclassname: ' bg-primary-light',
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
      validation(cell, value) {
        if (value === '0') {
          return true
        }
      
        return !(value === '')
      },
    
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
      columna: 'AC',
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
      text: 'Pos rein',
      datafield: 'rein',
      width: '120',
      align: 'center',
      cellsalign: 'center',
      editable: false,
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
      cellclassname: ' bg-primary-light',
      columna: 'AG',
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
      cellclassname: ' bg-primary-light',
      columna: 'AH',
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
    
    },
    {
      text: 'Proyección ',
      datafield: 'capi_obje',
      width: '130',
      align: 'center',
      cellsalign: 'center',
      editable: true,
      columngroup: 'capi',
      cellsformat: 'N',
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
      columna: 'AJ',
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
      text: 'Proyeccion',
      datafield: 'cobr',
      width: '160',
      align: 'center',
      cellsalign: 'center',
      editable: true,
      columngroup: 'pedi_tota',
      cellsformat: 'D2',
      filtertype: 'number',
      columna: 'AL',
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
      columna: 'AM',
      aggregates: [
        {
          T: function (aggregatedValue, currentValue) {
            aggregatedValue += currentValue
          
            return aggregatedValue!==undefined && !isNaN(aggregatedValue)?aggregatedValue:0
          },
        },
      ],
    },
  ]

})

const cabeceraCorte = computed(() => {
  return [
    {
      title: 'Corte',
      key: 'codi_cort',
      columna: 'A',
    },
    {
      title: 'Región',
      key: 'codi_area',
      columna: 'B',
    },
    {
      title: 'Nro zonas',
      key: 'tota_zona',
      columna: 'C',
    },
    {
      title: 'Act. inic.',
      key: 'acti_inic',
      columna: 'D',
    },
    {
      title: 'Proyección',
      key: 'pedi_inco_prim',   
      columna: 'E',
      
    },
    {
      title: 'Seguimiento',
      key: 'pedi_inco_segu',   
      columna: 'F',
      
    },
    {
      title: 'Ped. Camp. Ante',
      key: 'cons_rete_camp_ante',   
      columna: 'G',
      
    },
    {
      title: 'Proyeccion',
      key: 'cons_rete_obje',   
      columna: 'H',
      
    },
    {
      title: 'Seguimiento',
      key: 'cons_rete_prim',   
      columna: 'I',
      
    },
    {
      title: '1 camp. ante.',
      key: 'cons_segu_camp_ante',   
      columna: 'J',
      
    },
    {
      title: 'Proyeccion',
      key: 'cons_segu_obje',   
      columna: 'K',
      
    },
    {
      title: 'Seguimiento',
      key: 'cons_segu_segi',   
      columna: 'L',
      
    },
    {
      title: '2 camp ante.',
      key: 'cons_terc_camp_ante',   
      columna: 'M',
      
    },
    {
      title: 'Proyeccion',
      key: 'cons_terc_obje',   
      columna: 'N',
      
    },
    {
      title: 'Seguimiento',
      key: 'cons_terc_segi',   
      columna: 'O',
      
    },
    {
      title: '3 camp ante.',
      key: 'cons_cuar_camp_ante',   
      columna: 'P',
      
    },
    {
      title: 'Proyeccion',
      key: 'cons_cuar_obje',   
      columna: 'Q',
      
    },
    {
      title: 'Seguimiento',
      key: 'cons_cuar_segi',   
      columna: 'R',
      
    },
    {
      title: 'Peg21',
      key: 'pe21',   
      columna: 'S',
      
    },
    {
      title: 'Proyección',
      key: 'pe21_prim',   
      columna: 'T',
      
    },
    {
      title: 'Seguimiento',
      key: 'pe21_segu',   
      columna: 'U',
      
    },
    {
      title: 'Peg42',
      key: 'pe42',   
      columna: 'V',
      
    },
    {
      title: 'Proyección',
      key: 'pe42_prim',   
      columna: 'W',
      
    },
    {
      title: 'Seguimiento',
      key: 'pe42_segu',   
      columna: 'X',
      
    },
    {
      title: 'pe63',
      key: 'pe42',   
      columna: 'Y',
      
    },
    {
      title: 'Proyección',
      key: 'pe63_prim',   
      columna: 'Z',
      
    },
    {
      title: 'Seguimiento',
      key: 'pe63_segu',   
      columna: 'AA',
      
    },
    {
      title: 'Pegs',
      key: 'pegs',   
      columna: 'AB',
      
    },
    {
      title: 'Proyección',
      key: 'pegs_prim',   
      columna: 'AC',
      
    },
    {
      title: 'Seguimiento',
      key: 'pegs_segu',   
      columna: 'AD',
      
    },
    {
      title: 'Pos. Rein',
      key: 'rein',   
      columna: 'AE',
      
    },
    {
      title: 'Proyección',
      key: 'rein_prim',   
      columna: 'AF',
      
    },
    {
      title: 'Seguimiento',
      key: 'rein_segu',   
      columna: 'AG',
      
    },
    {
      title: 'Proyección',
      key: 'capi_obje',   
      columna: 'AH',
      
    },
    {
      title: 'Seguimiento',
      key: 'capi_repr',   
      columna: 'AI',
      
    },
    {
      title: 'Objetivos',
      key: 'tota_pedi_proy',   
      columna: 'AJ',
      
    },
    {
      title: 'Seguimiento',
      key: 'tota_pedi_segi',   
      columna: 'AK',
      
    },
    {
      title: 'Objetivo',
      key: 'vent_obje',   
      columna: 'AL',
      
    },
    {
      title: 'Venta',
      key: 'vent_segi',   
      columna: 'AM',
      
    },
  ]
})

const cabeceraZona = computed(() => {
  return [
    {
      title: 'Corte',
      key: 'codi_cort',
      columna: 'A',
    },
    {
      title: 'Zona',
      key: 'codi_zona',
      columna: 'B',
    },
    {
      title: 'Gerente',
      key: 'nomb_vend',
      columna: 'C',
    },
    {
      title: 'Act. inic.',
      key: 'acti_inic',
      columna: 'D',
    },
    {
      title: 'Proyección',
      key: 'pedi_inco_prim',   
      columna: 'E',
      
    },
    {
      title: 'Seguimiento',
      key: 'pedi_inco_segu',   
      columna: 'F',
      
    },
    {
      title: 'Ped. Camp. Ante',
      key: 'cons_rete_camp_ante',   
      columna: 'G',
      
    },
    {
      title: 'Proyeccion',
      key: 'cons_rete_prim',   
      columna: 'H',
      
    },
    {
      title: 'Seguimiento',
      key: 'cons_rete_segu',    
      columna: 'I',
      
    },
    {
      title: '1 camp. ante.',
      key: 'cons_segu_camp_ante',   
      columna: 'J',
      
    },
    {
      title: 'Proyeccion',
      key: 'cons_segu_obje',   
      columna: 'K',
      
    },
    {
      title: 'Seguimiento',
      key: 'cons_segu_segi',   
      columna: 'L',
      
    },
    {
      title: '2 camp ante.',
      key: 'cons_terc_camp_ante',   
      columna: 'M',
      
    },
    {
      title: 'Proyeccion',
      key: 'cons_terc_proy',   
      columna: 'N',
      
    },
    {
      title: 'Seguimiento',
      key: 'cons_terc_segi',   
      columna: 'O',
      
    },
    {
      title: '3 camp ante.',
      key: 'cons_cuar_camp_ante',   
      columna: 'P',
      
    },
    {
      title: 'Proyeccion',
      key: 'cons_cuar_proy',   
      columna: 'Q',
      
    },
    {
      title: 'Seguimiento',
      key: 'cons_cuar_segi',   
      columna: 'R',
      
    },
    {
      title: 'Peg21',
      key: 'pe21',   
      columna: 'S',
      
    },
    {
      title: 'Proyección',
      key: 'pe21_prim',   
      columna: 'T',
      
    },
    {
      title: 'Seguimiento',
      key: 'pe21_segu',   
      columna: 'U',
      
    },
    {
      title: 'Peg42',
      key: 'pe42',   
      columna: 'V',
      
    },
    {
      title: 'Proyección',
      key: 'pe42_prim',   
      columna: 'W',
      
    },
    {
      title: 'Seguimiento',
      key: 'pe42_segu',   
      columna: 'X',
      
    },
    {
      title: 'pe63',
      key: 'pe42',   
      columna: 'Y',
      
    },
    {
      title: 'Proyección',
      key: 'pe63_prim',   
      columna: 'Z',
      
    },
    {
      title: 'Seguimiento',
      key: 'pe63_segu',   
      columna: 'AA',
      
    },
    {
      title: 'Pegs',
      key: 'pegs',   
      columna: 'AB',
      
    },
    {
      title: 'Proyección',
      key: 'pegs_prim',   
      columna: 'AC',
      
    },
    {
      title: 'Seguimiento',
      key: 'pegs_segu',   
      columna: 'AD',
      
    },
    {
      title: 'Pos. Rein',
      key: 'rein',   
      columna: 'AE',
      
    },
    {
      title: 'Proyección',
      key: 'rein_prim',   
      columna: 'AF',
      
    },
    {
      title: 'Seguimiento',
      key: 'rein_segu',   
      columna: 'AG',
      
    },
    {
      title: 'Proyección',
      key: 'capi_obje',   
      columna: 'AH',
      
    },
    {
      title: 'Seguimiento',
      key: 'capi_repr',   
      columna: 'AI',
      
    },
    {
      title: 'Objetivos',
      key: 'tota_pedi_proy',   
      columna: 'AJ',
      
    },
    {
      title: 'Seguimiento',
      key: 'tota_pedi_segi',   
      columna: 'AK',
      
    },
    {
      title: 'Objetivo',
      key: 'vent_obje',   
      columna: 'AL',
      
    },
    {
      title: 'Venta',
      key: 'vent_segi',   
      columna: 'AM',
      
    },
  ]

})

const clasePedidoTotalZona = (row, columnfield, value) => {
  const dataRecord = refGridGlobalZona.value.getrowdata(row)
  
  const dataObje = parseInt(dataRecord.pedi_inco_obje)
  let dataProy = 0
  if (columnfield === 'pedi_tota_prim') {
    
    dataProy = parseInt(dataRecord.pedi_tota_prim)
  } else {
    
    dataProy = parseInt(dataRecord.pedi_tota_segu)
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
    return `text-warning`
  }
  
  return `text-error`
}
  
const claseIncorporacionZona = (row, columnfield, value) => {
  const dataRecord = refGridGlobalZona.value.getrowdata(row)
  
  const dataObje = parseInt(dataRecord.pedi_inco_obje)
  let dataProy = 0
  if (columnfield === 'pedi_inco_prim') {
    
    dataProy = parseInt(dataRecord.pedi_inco_prim)
  } else {
    
    dataProy = parseInt(dataRecord.pedi_inco_segu)
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
    return `text-warning`
  }
  
  return `text-error`
}

const claseRetencionZona = (row, columnfield, value) => {
  const dataRecord = refGridGlobalZona.value.getrowdata(row)
  
  const dataObje = parseInt(dataRecord.pedi_rete_obje)
  let dataProy = 0
  if (columnfield === 'pedi_rete_prim') {
    
    dataProy = parseInt(dataRecord.pedi_rete_prim)
  } else {
    
    dataProy = parseInt(dataRecord.pedi_rete_segu)
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
    return `text-warning`
  }
  
  return `text-error`
}

const claseActividadZona = (row, columnfield, value) => {
  const dataRecord = refGridGlobalZona.value.getrowdata(row)
  
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

const claseConsecutividadRetencionZona = (row, columnfield, value) => {
  const dataRecord = refGridGlobalZona.value.getrowdata(row)
  
  const dataObje = parseInt(dataRecord.cons_rete_obje)
  let dataProy = 0
  if (columnfield === 'cons_rete_prim') {
    
    dataProy = parseInt(dataRecord.cons_rete_prim)
  } else {
    
    dataProy = parseInt(dataRecord.cons_rete_segu)
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
    return `text-warning`
  }
  
  return `text-error`
}

const clasePeg21Zona  = (row, columnfield, value) => {
  const dataRecord = refGridGlobalZona.value.getrowdata(row)
  
  const dataObje = parseInt(dataRecord.pe21_obje)
  let dataProy = 0
  if (columnfield === 'pe21_prim') {
    
    dataProy = parseInt(dataRecord.pe21_prim)
  } else {
    
    dataProy = parseInt(dataRecord.pe21_segu)
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
    return `text-warning`
  }
  
  return `text-error`
}

const clasePeg42Zona  = (row, columnfield, value) => {
  const dataRecord = refGridGlobalZona.value.getrowdata(row)
  
  const dataObje = parseInt(dataRecord.pe42_obje)
  let dataProy = 0
  if (columnfield === 'pe42_prim') {
    
    dataProy = parseInt(dataRecord.pe42_prim)
  } else {
    
    dataProy = parseInt(dataRecord.pe42_segu)
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
    return `text-warning`
  }
  
  return `text-error`
}

const clasePeg63Zona = (row, columnfield, value) => {
  const dataRecord = refGridGlobalZona.value.getrowdata(row)
  
  const dataObje = parseInt(dataRecord.pe63_obje)
  let dataProy = 0
  if (columnfield === 'pe63_prim') {
    
    dataProy = parseInt(dataRecord.pe63_prim)
  } else {
    
    dataProy = parseInt(dataRecord.pe63_segu)
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
    return `text-warning`
  }
  
  return `text-error`
}

const clasePegsZona = (row, columnfield, value) => {
  const dataRecord = refGridGlobalZona.value.getrowdata(row)
  
  const dataObje = parseInt(dataRecord.pegs_obje)
  let dataProy = 0
  if (columnfield === 'pegs_prim') {
    
    dataProy = parseInt(dataRecord.pegs_prim)
  } else {
    
    dataProy = parseInt(dataRecord.pegs_segu)
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
    return `text-warning`
  }
  
  return `text-error`
}

const claseReingresoZona = (row, columnfield, value) => {
  const dataRecord = refGridGlobalZona.value.getrowdata(row)
  
  const dataObje = parseInt(dataRecord.rein_obje)
  let dataProy = 0
  if (columnfield === 'rein_prim') {
    
    dataProy = parseInt(dataRecord.rein_prim)
  } else {
    
    dataProy = parseInt(dataRecord.rein_segu)
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
    return `text-warning`
  }
  
  return `text-error`
}

const claseCapitalizacionZona = (row, columnfield, value) => {
  if (value <= 0) {
    return `text-error`
  }
  
  return ``
}

const clasePedidoTotalConsolidado = (row, columnfield, value) => {
  const dataRecord = refGridGlobal.value.getrowdata(row)
  const dataObje = parseInt(dataRecord.pedi_inco_obje)
  let dataProy = 0
  if (columnfield === 'pedi_tota_prim') {
    dataProy = parseInt(dataRecord.pedi_tota_prim)
  } else {
    
    dataProy = parseInt(dataRecord.pedi_tota_segu)
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
    return `text-warning`
  }
  
  return `text-error`
}

const claseIncorporacionConsolidado = (row, columnfield, value) => {
  const dataRecord = refGridGlobal.value.getrowdata(row)
  
  const dataObje = parseInt(dataRecord.pedi_inco_obje)
  let dataProy = 0
  if (columnfield === 'pedi_inco_prim') {
    
    dataProy = parseInt(dataRecord.pedi_inco_prim)
  } else {
    
    dataProy = parseInt(dataRecord.pedi_inco_segu)
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
    return `text-warning`
  }
  
  return `text-error`
}

const claseRetencionConsolidado = (row, columnfield, value) => {
  const dataRecord = refGridGlobal.value.getrowdata(row)
  
  const dataObje = parseInt(dataRecord.pedi_rete_obje)
  let dataProy = 0
  if (columnfield === 'pedi_rete_prim') {
    
    dataProy = parseInt(dataRecord.pedi_rete_prim)
  } else {
    
    dataProy = parseInt(dataRecord.pedi_rete_segu)
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
    return `text-warning`
  }
  
  return `text-error`
}

const claseActividadConsolidado   = (row, columnfield, value) => {
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

const claseConsecutividadRetencionConsolidado = (row, columnfield, value) => {
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
    return ``
  }
  if (dataProy === 0) {
    return ``
  }
  if (porcProy >= 100) {
    return `text-success`
  }
  if (porcProy >= 80 && porcProy < 100) {
    return `text-warning`
  }
  
  return `text-error`
}

const clasePeg21Consolidado = (row, columnfield, value) => {
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
    return ``
  }
  if (dataProy === 0) {
    return ``
  }
  if (porcProy >= 100) {
    return `text-success`
  }
  if (porcProy >= 80 && porcProy < 100) {
    return `text-warning`
  }
  
  return `text-error`
}

const clasePeg42Consolidado = (row, columnfield, value) => {
  const dataRecord = refGridGlobal.value.getrowdata(row)
  
  const dataObje = parseInt(dataRecord.pe42_obje)
  let dataProy = 0
  if (columnfield === 'pe42_prim') {
    
    dataProy = parseInt(dataRecord.pe42_prim)
  } else {
    
    dataProy = parseInt(dataRecord.pe42_segu)
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
    return `text-warning`
  }
  
  return `text-error`
}

const clasePeg63Consolidado = (row, columnfield, value) => {
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
    return ``
  }
  if (dataProy === 0) {
    return ``
  }
  if (porcProy >= 100) {
    return `text-success`
  }
  if (porcProy >= 80 && porcProy < 100) {
    return `text-warning`
  }
  
  return `text-error`
}

const clasePegsConsolidado = (row, columnfield, value) => {
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
    return ``
  }
  if (dataProy === 0) {
    return ``
  }
  if (porcProy >= 100) {
    return `text-success`
  }
  if (porcProy >= 80 && porcProy < 100) {
    return `text-warning`
  }
  
  return `text-error`
}

const claseReingresoConsolidado = (row, columnfield, value) => {
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
    return ``
  }
  if (dataProy === 0) {
    return ``
  }
  if (porcProy >= 100) {
    return `text-success`
  }
  if (porcProy >= 80 && porcProy < 100) {
    return `text-warning`
  }
  
  return `text-error`
}

// eslint-disable-next-line sonarjs/no-identical-functions
const claseCapitalizacionConsolidado = (row, columnfield, value) => {
  if (value <= 0) {
    return `text-error`
  }
  
  return ``
}

let data = 0
let obje = 0
let sumaNumePedi = 0
let sumaTotaIngr = 0
let sumaTotaRein = 0
let sumaActiInic = 0
let sumaNumeActi = 0
let sumaActiObje = 0
let sumaActiPrim = 0
let sumaActiSegu = 0

const columnas = [
  {
    text: 'Corte',
    datafield: 'codi_cort',
    width: '60',
    align: 'center',
    cellsalign: 'center',
    pinned: true,
    filtertype: 'checkedlist',
  },
  {
    text: 'Región',
    datafield: 'codi_area',
    width: '60',
    align: 'center',
    cellsalign: 'center',
    pinned: true,
    filtertype: 'checkedlist',
  },
  {
    text: 'Nro zonas',
    datafield: 'tota_zona',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    pinned: true,
    filtertype: 'checkedlist',
  },
  {
    text: 'Act. inic.',
    datafield: 'acti_inic',
    width: '80',
    align: 'center',
    cellsalign: 'center',
    pinned: true,
    cellsformat: 'N',
    aggregates: [
      {
        T: function (aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },

  /*{
    text: 'Obj. camp.',
    datafield: 'pedi_inco_cant',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'inco',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },*/
  {
    text: 'Proyección',
    datafield: 'pedi_inco_prim',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'inco',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: claseIncorporacionConsolidado,
  },

  /*{
    text: 'Proyección',
    datafield: 'pedi_inco_prim_porc',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'inco',
    cellsformat: 'p2',
    aggregates: [
      {
        T(aggregatedValue, currentValue, column, record) {
          
          if (record.visibleindex === 0) {
            data = 0
            obje = 0
          }
          data += record.pedi_inco_prim
          obje += record.pedi_inco_cant
          let total = 0.0
          
          if (parseInt(data) != 0 && parseInt(obje) != 0) {
            
            total = 100 * (parseInt(data) / parseInt(obje))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
  },*/
  {
    text: 'Seguimiento',
    datafield: 'pedi_inco_segu',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'inco',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: claseIncorporacionConsolidado,
  },

  /*{
    text: 'Reproyección (%)',
    datafield: 'pedi_inco_segu_porc',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'inco',
    cellsformat: 'p2',
    aggregates: [
      {
        T(aggregatedValue, currentValue, column, record) {
          
          if (record.visibleindex === 0) {
            data = 0
            obje = 0
          }
          data += record.pedi_inco_segu
          obje += record.pedi_inco_cant
          let total = 0.0
          
          if (parseInt(data) != 0 && parseInt(obje) != 0) {
            
            total = 100 * (parseInt(data) / parseInt(obje))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
  },*/
  /*{
    text: 'Obj. camp.',
    datafield: 'pedi_rete_cant',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'rete',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Obj. proyección',
    datafield: 'pedi_rete_prim',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'rete',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: claseRetencionConsolidado,
  },

  {
    text: 'Proyección (%)',
    datafield: 'pedi_rete_prim_porc',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'rete',
    cellsformat: 'p2',
    aggregates: [
      {
        T(aggregatedValue, currentValue, column, record) {
          
          if (record.visibleindex === 0) {
            data = 0
            obje = 0
          }
          data += record.pedi_rete_prim
          obje += record.pedi_rete_cant
          let total = 0.0
          
          if (parseInt(data) != 0 && parseInt(obje) != 0) {
            
            total = 100 * (parseInt(data) / parseInt(obje))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
  },
  {
    text: 'Reproyección',
    datafield: 'pedi_rete_segu',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'rete',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: claseRetencionConsolidado,
  },
  {
    text: 'Reproyección (%)',
    datafield: 'pedi_rete_segu_porc',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'rete',
    cellsformat: 'p2',
    aggregates: [
      {
        T(aggregatedValue, currentValue, column, record) {
          
          if (record.visibleindex === 0) {
            data = 0
            obje = 0
          }
          data += record.pedi_rete_segu
          obje += record.pedi_rete_cant
          let total = 0.0
          
          if (parseInt(data) != 0 && parseInt(obje) != 0) {
            
            total = 100 * (parseInt(data) / parseInt(obje))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
  },*/
  {
    text: 'nume acti ante',
    datafield: 'nume_acti_ante',
    hidden: true,
  },
  {
    text: 'tota ingr ante',
    datafield: 'tota_ingr_ante',
    hidden: true,
  },
  {
    text: 'tota rein ante',
    datafield: 'tota_rein_ante',
    hidden: true,
  },
  {
    text: 'acti inic ante',
    datafield: 'acti_inic_ante',
    hidden: true,
  },
  {
    text: 'tota pedi ante',
    datafield: 'tota_pedi_ante',
    hidden: true,
  },
  {
    text: 'nume acti',
    datafield: 'nume_acti',
    hidden: true,
  },
  {
    text: 'acti nume prim',
    datafield: 'acti_nume_prim',
    hidden: true,
  },
  {
    text: 'acti nume segu',
    datafield: 'acti_nume_segu',
    hidden: true,
  },

  /*{
    text: 'Camp. ante.',
    datafield: 'acti_camp_ante',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    columngroup: 'acti',
    cellsformat: 'p2',
    aggregates: [
      {
        T(aggregatedValue, currentValue, column, record) {
          
          if (record.visibleindex === 0) {
            sumaNumePedi = 0
            sumaTotaIngr = 0
            sumaTotaRein = 0
            sumaActiInic = 0
          }
          sumaNumePedi += record.tota_pedi_ante
          sumaTotaIngr += record.tota_ingr_ante
          sumaTotaRein += record.tota_rein_ante
          sumaActiInic += record.acti_inic_ante 

          let total = 0.0
          
          if (
          
            parseInt(sumaNumePedi) -
                    
                    parseInt(sumaTotaIngr) -
                    
                    parseInt(sumaTotaRein) >
                    0
                  
                  && parseInt(sumaActiInic) > 0
          ) {
            
            total =
                    100
                    
                    * ((parseInt(sumaNumePedi) -
                      
                      parseInt(sumaTotaIngr) -
                      
                      parseInt(sumaTotaRein)) /
                      
                      parseInt(sumaActiInic))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
  },*/
  /* {
    text: 'Obj. % acti. camp.',
    datafield: 'acti_obje',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'acti',
    cellsformat: 'P2',
    aggregates: [
      {
        T(aggregatedValue, currentValue, column, record) {
          
          if (record.visibleindex === 0) {
            sumaNumeActi = 0
            sumaActiObje = 0
          }
          sumaNumeActi += record.acti_inic
          sumaActiObje += record.acti_obje_pedi
          let total = 0
          
          if (parseInt(sumaNumeActi) > 0 && parseInt(sumaActiObje) > 0) {
            
            total =
                    100 * (parseFloat(sumaActiObje) / parseFloat(sumaNumeActi))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
  },*/
  /*{
    text: 'Obj. pedi. act.',
    datafield: 'acti_obje_pedi',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'acti',
    cellsformat: 'N',
    aggregates: [
      {
        T: function (aggregatedValue, currentValue) {   
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Proyección (%)',
    datafield: 'acti_porc_prim',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'acti',
    cellsformat: 'p2',
    aggregates: [
      {
        T(aggregatedValue, currentValue, column, record) {
         
          if (record.visibleindex === 0) {
            sumaActiPrim = 0
            sumaActiInic = 0
          }
          sumaActiPrim += record.acti_prim
          sumaActiInic += record.acti_inic
          let total = 0
          
          if (
          
            parseInt(sumaActiPrim) > 0 &&
                  
                  parseFloat(sumaActiInic) > 0
          ) {
            
            total =
                    
                    100 * (parseInt(sumaActiPrim) / parseInt(sumaActiInic))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
  },
  {
    text: 'Obj. proyección',
    datafield: 'acti_prim',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'acti',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: claseActividadConsolidado,
  },
  {
    text: 'Reproyección (%)',
    datafield: 'acti_porc_segu',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'acti',
    cellsformat: 'p2',
    aggregates: [
      {
        T(aggregatedValue, currentValue, column, record) {
         
          if (record.visibleindex === 0) {
            sumaActiSegu = 0
            sumaActiInic = 0
          }
          sumaActiSegu += record.acti_segu
          sumaActiInic += record.acti_inic
          let total = 0
          
          if (
          
            parseInt(sumaActiSegu) > 0 &&
                  
                  parseFloat(sumaActiInic) > 0
          ) {
            
            total =
                    
                    100 * (parseInt(sumaActiSegu) / parseInt(sumaActiInic))
          }
          
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
  },
  {
    text: 'Reproyección',
    datafield: 'acti_segu',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'acti',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: claseActividadConsolidado,
  },*/
  {
    text: 'Ped. Camp. Ante',
    datafield: 'cons_rete_camp_ante',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'cons_prim',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Proyección',
    datafield: 'cons_rete_obje',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'cons_prim',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Seguimiento',
    datafield: 'cons_rete_prim',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'cons_prim',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: claseConsecutividadRetencionConsolidado,
  },

  /* {
    text: 'Reproyección',
    datafield: 'cons_rete_segu',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'cons_rete',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: claseConsecutividadRetencionConsolidado,
  },*/
  {
    text: '1 camp. ante.',
    datafield: 'cons_segu_camp_ante',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'cons_segu',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Proyeccion',
    datafield: 'cons_segu_obje',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'cons_segu',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Seguimiento',
    datafield: 'cons_segu_segi',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'cons_segu',
    cellsformat: 'N',
    aggregates: [
      {
         
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: '2 camp. ante.',
    datafield: 'cons_terc_camp_ante',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'cons_terc',
    cellsformat: 'N',
    aggregates: [
      {        
        T: function (aggregatedValue, currentValue) {   
          aggregatedValue += currentValue

          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Proyeccion',
    datafield: 'cons_terc_obje',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'cons_terc',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Seguimiento',
    datafield: 'cons_terc_segi',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'cons_terc',
    cellsformat: 'N',
    aggregates: [
      {
         
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        }, 
      },
    ],
  },
  {
    text: '3 camp. ante.',
    datafield: 'cons_cuar_camp_ante',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'cons_cuar',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Proyeccion',
    datafield: 'cons_cuar_obje',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'cons_cuar',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Seguimiento',
    datafield: 'cons_cuar_segi',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'cons_cuar',
    cellsformat: 'N',
    aggregates: [
      {
         
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        }, 
      },
    ],
  },
  {
    text: 'Peg21',
    datafield: 'pe21',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'pe21',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Obj. form. éxito',
    datafield: 'pe21_obje',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    hidden: true,
    columngroup: 'pe21',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Proyección',
    datafield: 'pe21_prim',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'pe21',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: clasePeg21Consolidado,
  },
  {
    text: 'Seguimiento',
    datafield: 'pe21_segu',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'pe21',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: clasePeg21Consolidado,
  },
  {
    text: 'Peg42',
    datafield: 'pe42',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'pe42',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Obj. form. éxito',
    datafield: 'pe42_obje',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    hidden: true,
    columngroup: 'pe42',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Proyeccion',
    datafield: 'pe42_prim',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'pe42',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: clasePeg42Consolidado,
  },
  {
    text: 'Seguimiento',
    datafield: 'pe42_segu',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'pe42',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: clasePeg42Consolidado,
  },
  {
    text: 'Peg63',
    datafield: 'pe63',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'pe63',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Obj. form. éxito',
    datafield: 'pe63_obje',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    hidden: true,
    columngroup: 'pe63',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Proyección',
    datafield: 'pe63_prim',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'pe63',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: clasePeg63Consolidado,
  },
  {
    text: 'Seguimiento',
    datafield: 'pe63_segu',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'pe63',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: clasePeg63Consolidado,
  },
  {
    text: 'Pegs',
    datafield: 'pegs',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'pegs',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Obj. form. éxito',
    datafield: 'pegs_obje',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    hidden: true,
    columngroup: 'pegs',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Proyección',
    datafield: 'pegs_prim',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'pegs',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: clasePegsConsolidado,
  },
  {
    text: 'Seguimiento',
    datafield: 'pegs_segu',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'pegs',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: clasePegsConsolidado,
  },
  {
    text: 'Pos. rein.',
    datafield: 'rein',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'rein',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Obj. form. éxito',
    datafield: 'rein_obje',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    hidden: true,
    columngroup: 'rein',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Proyección',
    datafield: 'rein_prim',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'rein',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: claseReingresoConsolidado,
  },
  {
    text: 'Seguimiento',
    datafield: 'rein_segu',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'rein',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: claseReingresoConsolidado,
  },
  {
    text: 'Proyección',
    datafield: 'capi_obje',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'capi',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: claseCapitalizacionConsolidado,
  },
  {
    text: 'Seguimiento',
    datafield: 'capi_repr',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'capi',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: claseCapitalizacionConsolidado,
  },
  {
    text: 'Proyeccion ',
    datafield: 'tota_pedi_proy',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'tota',
    cellsformat: 'N',
    aggregates: [
      {
        T: function (aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Seguimiento',
    datafield: 'tota_pedi_segi',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'tota',
    cellsformat: 'N',
    aggregates: [
      {
        T: function (aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: clasePedidoTotalConsolidado,
  },
  {
    text: 'Objetivo',
    datafield: 'vent_obje',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    cellsformat: 'D2',
    columngroup: 'vent',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Seguimiento',
    datafield: 'vent_segi',
    width: '120',
    align: 'center', 
    cellsalign: 'center',
    editable: false,
    pinned: false, 
    cellsformat: 'D2',
    columngroup: 'vent',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Cobranza 88%(por cobrar)',
    datafield: 'cobr',
    width: '160',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    hidden: true, 
    cellsformat: 'D2',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Cobranza 88%(te puedes quedar)',
    datafield: 'cobr_colc',
    width: '180',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    hidden: true, 
    cellsformat: 'd2',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Cobranza 92%(por cobrar)',
    datafield: 'co92',
    width: '160',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    hidden: true, 
    cellsformat: 'D2',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Cobranza 92%(te puedes quedar)',
    datafield: 'co92_colc',
    width: '180',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    cellsformat: 'D2',
    hidden: true,  
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
]

const columnasZona = 
[
  {
    text: 'Corte',
    datafield: 'codi_cort',
    width: '60',
    align: 'center',
    cellsalign: 'center',
    pinned: true,
    filtertype: 'checkedlist',
  },
  {
    text: 'Zona',
    datafield: 'codi_zona',
    width: '60',
    align: 'center',
    cellsalign: 'center',
    pinned: true,
    filtertype: 'checkedlist',
  },
  {
    text: 'Gerente',
    datafield: 'nomb_vend',
    width: '250',
    align: 'center',
    cellsalign: 'left',
    pinned: true,
  },
  {
    text: 'Act. inic.',
    datafield: 'acti_inic',
    width: '80',
    align: 'center',
    cellsalign: 'center',
    pinned: true,
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Obj. camp.',
    datafield: 'pedi_tota_cant',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'tota',
    cellsformat: 'N',
    hidden: true,
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Obj. proyección',
    datafield: 'pedi_tota_prim',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'tota',
    cellsformat: 'N',
    hidden: true,
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: clasePedidoTotalZona,
  },
  {
    text: 'Proyección (%)',
    datafield: 'pedi_tota_prim_porc',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'tota',
    cellsformat: 'P2',
    hidden: true,
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue, column, record) {
          
          if (record.visibleindex === 0) {
            data = 0
            obje = 0
          }
          data += record.pedi_tota_prim
          obje += record.pedi_tota_cant
          let total = 0
          
          if (parseInt(data) != 0 && parseInt(obje) != 0) {
            
            total = 100 * (parseInt(data) / parseInt(obje))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
  },
  {
    text: 'Reproyección',
    datafield: 'pedi_tota_segu',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'tota',
    cellsformat: 'N',
    hidden: true,
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: clasePedidoTotalZona,
  },
  {
    text: 'Reproyección (%)',
    datafield: 'pedi_tota_segu_porc',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'tota',
    cellsformat: 'P2',
    hidden: true,
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue, column, record) {
          
          if (record.visibleindex === 0) {
            data = 0
            obje = 0
          }
          data += record.pedi_tota_segu
          obje += record.pedi_tota_cant
          let total = 0
          
          if (parseInt(data) != 0 && parseInt(obje) != 0) {
            
            total = 100 * (parseInt(data) / parseInt(obje))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
  },
  {
    text: 'Obj. camp.',
    datafield: 'pedi_inco_cant',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'inco',
    cellsformat: 'N',
    hidden: true,
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Proyección',
    datafield: 'pedi_inco_prim',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'inco',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: claseIncorporacionZona,
  },
  {
    text: 'Proyección (%)',
    datafield: 'pedi_inco_prim_porc',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'inco',
    cellsformat: 'p2',
    hidden: true,
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue, column, record) {
          
          if (record.visibleindex === 0) {
            data = 0
            obje = 0
          }
          data += record.pedi_inco_prim
          obje += record.pedi_inco_cant
          let total = 0.0
          
          if (parseInt(data) != 0 && parseInt(obje) != 0) {
            
            total = 100 * (parseInt(data) / parseInt(obje))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
  },
  {
    text: 'Seguimiento',
    datafield: 'pedi_inco_segu',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'inco',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: claseIncorporacionZona,
  },
  {
    text: 'Reproyección (%)',
    datafield: 'pedi_inco_segu_porc',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'inco',
    cellsformat: 'p2',
    hidden: true,
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue, column, record) {
          
          if (record.visibleindex === 0) {
            data = 0
            obje = 0
          }
          data += record.pedi_inco_segu
          obje += record.pedi_inco_cant
          let total = 0.0
          
          if (parseInt(data) != 0 && parseInt(obje) != 0) {
            
            total = 100 * (parseInt(data) / parseInt(obje))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
  },
  {
    text: 'Obj. camp.',
    datafield: 'pedi_rete_cant',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'rete',
    cellsformat: 'N',
    hidden: true,
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Obj. proyección',
    datafield: 'pedi_rete_prim',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'rete',
    cellsformat: 'N',
    hidden: true,
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: claseRetencionZona,
  },
  {
    text: 'Proyección (%)',
    datafield: 'pedi_rete_prim_porc',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'rete',
    cellsformat: 'p2',
    hidden: true,
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue, column, record) {
          
          if (record.visibleindex === 0) {
            data = 0
            obje = 0
          }
          data += record.pedi_rete_prim
          obje += record.pedi_rete_cant
          let total = 0.0
          
          if (parseInt(data) != 0 && parseInt(obje) != 0) {
            
            total = 100 * (parseInt(data) / parseInt(obje))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
  },
  {
    text: 'Reproyección',
    datafield: 'pedi_rete_segu',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'rete',
    cellsformat: 'N',
    hidden: true,
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: claseRetencionZona,
  },
  {
    text: 'Reproyección (%)',
    datafield: 'pedi_rete_segu_porc',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'rete',
    cellsformat: 'p2',
    hidden: true,
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue, column, record) {
          
          if (record.visibleindex === 0) {
            data = 0
            obje = 0
          }
          data += record.pedi_rete_segu
          obje += record.pedi_rete_cant
          let total = 0.0
          
          if (parseInt(data) != 0 && parseInt(obje) != 0) {
            
            total = 100 * (parseInt(data) / parseInt(obje))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
  },
  {
    text: 'nume acti ante',
    datafield: 'nume_acti_ante',
    hidden: true,
    cellsformat: 'N',
    columngroup: 'acti',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'tota ingr ante',
    datafield: 'tota_ingr_ante',
    hidden: true,
    cellsformat: 'N',
    columngroup: 'acti',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'tota rein ante',
    datafield: 'tota_rein_ante',
    hidden: true,
    cellsformat: 'N',
    columngroup: 'acti',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'acti inic ante',
    datafield: 'acti_inic_ante',
    hidden: true,
    cellsformat: 'N',
    columngroup: 'acti',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'tota pedi ante',
    datafield: 'tota_pedi_ante',
    hidden: true,
    cellsformat: 'N',
    columngroup: 'acti',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Camp. ante.',
    datafield: 'acti_camp_ante',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'acti',
    cellsformat: 'p2',
    hidden: true,
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue, column, record) {
          
          if (record.visibleindex === 0) {
            sumaNumePedi = 0
            sumaTotaIngr = 0
            sumaTotaRein = 0
            sumaActiInic = 0
          }
          sumaNumePedi += record.tota_pedi_ante
          sumaTotaIngr += record.tota_ingr_ante
          sumaTotaRein += record.tota_rein_ante
          sumaActiInic += record.acti_inic_ante

          let total = 0.0
          
          if (
          
            parseInt(sumaNumePedi) -
                    
                    parseInt(sumaTotaIngr) -
                    
                    parseInt(sumaTotaRein) >
                    0
                  
                  && parseInt(sumaActiInic) > 0
          ) {
            
            total =
                    100
                    
                    * ((parseInt(sumaNumePedi) -
                      
                      parseInt(sumaTotaIngr) -
                      
                      parseInt(sumaTotaRein)) /
                      
                      parseInt(sumaActiInic))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
  },
  {
    text: 'nume acti',
    datafield: 'nume_acti',
    hidden: true,
    cellsformat: 'N',
    columngroup: 'acti',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'acti nume prim',
    datafield: 'acti_nume_prim',
    hidden: true,
    cellsformat: 'N',
    columngroup: 'acti',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'acti nume segu',
    datafield: 'acti_nume_segu',
    hidden: true,
    cellsformat: 'N',
    columngroup: 'acti',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Obj.% acti. camp.',
    datafield: 'acti_obje',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'acti',
    cellsformat: 'P2',
    hidden: true,
    aggregates: [
      {
        T(aggregatedValue, currentValue, column, record) {
          
          if (record.visibleindex === 0) {
            sumaNumeActi = 0
            sumaActiObje = 0
          }
          sumaNumeActi += record.acti_inic
          sumaActiObje += record.acti_obje_pedi
          let total = 0
          
          if (parseInt(sumaNumeActi) > 0 && parseInt(sumaActiObje) > 0) {
            
            total =
                    100 * (parseFloat(sumaActiObje) / parseFloat(sumaNumeActi))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
  },
  {
    text: 'Obj. pedi. act.',
    datafield: 'acti_obje_pedi',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'acti',
    cellsformat: 'N',
    hidden: true,
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Proyección (%)',
    datafield: 'acti_porc_prim',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'acti',
    cellsformat: 'p2',
    hidden: true,
    aggregates: [
      {
        T(aggregatedValue, currentValue, column, record) {
         
          if (record.visibleindex === 0) {
            sumaActiPrim = 0
            sumaActiInic = 0
          }
          sumaActiPrim += record.acti_prim
          sumaActiInic += record.acti_inic
          let total = 0
          
          if (
          
            parseInt(sumaActiPrim) > 0 &&
                  
                  parseFloat(sumaActiInic) > 0
          ) {
            
            total =
                    
                    100 * (parseInt(sumaActiPrim) / parseInt(sumaActiInic))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
  },
  {
    text: 'Obj. proyección',
    datafield: 'acti_prim',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'acti',
    cellsformat: 'N',
    hidden: true,
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: claseActividadZona,
  },
  {
    text: 'Reproyección (%)',
    datafield: 'acti_porc_segu',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'acti',
    cellsformat: 'p2',
    hidden: true,
    aggregates: [
      {
        T(aggregatedValue, currentValue, column, record) {
         
          if (record.visibleindex === 0) {
            sumaActiSegu = 0
            sumaActiInic = 0
          }
          sumaActiSegu += record.acti_segu
          sumaActiInic += record.acti_inic
          let total = 0
          
          if (
          
            parseInt(sumaActiSegu) > 0 &&
                  
                  parseFloat(sumaActiInic) > 0
          ) {
            
            total =
                    
                    100 * (parseInt(sumaActiSegu) / parseInt(sumaActiInic))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
  },
  {
    text: 'Reproyección',
    datafield: 'acti_segu',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'acti',
    cellsformat: 'N',
    hidden: true,
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: claseActividadZona,
  },
  {
    text: 'Ped. camp. ante.',
    datafield: 'cons_rete_camp_ante',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'cons_prim',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Obj. form. éxito',
    datafield: 'cons_rete_obje',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    hidden: true,
    columngroup: 'cons_prim',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Proyección',
    datafield: 'cons_rete_prim',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'cons_prim',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: claseConsecutividadRetencionZona,
  },
  {
    text: 'Seguimiento',
    datafield: 'cons_rete_segu',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'cons_prim',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: claseConsecutividadRetencionZona,
  },
  {
    text: '1 Camp. ante.',
    datafield: 'cons_segu_camp_ante',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'cons_segu',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Proyección',
    datafield: 'cons_segu_obje',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'cons_segu',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Seguimiento',
    datafield: 'cons_segu_segi',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'cons_segu',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: '2 Camp. ante.',
    datafield: 'cons_terc_camp_ante',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'cons_terc',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Proyección',
    datafield: 'cons_terc_proy',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'cons_terc',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Seguimiento',
    datafield: 'cons_terc_segi',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'cons_terc',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Obj. form. éxito',
    datafield: 'cons_terc_obje',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false, 
    hidden: true,
    columngroup: 'cons_terc',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue 
        },
      },
    ],
  },
  {
    text: '3 Camp. ante.',
    datafield: 'cons_cuar_camp_ante',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'cons_cuar',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Proyección',
    datafield: 'cons_cuar_proy',  
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'cons_cuar',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Seguimiento',
    datafield: 'cons_cuar_segi',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'cons_cuar',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Obj. form. éxito',
    datafield: 'cons_cuar_obje',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    hidden: true,
    columngroup: 'cons_cuar',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Peg21',
    datafield: 'pe21',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'pe21',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Obj. form. éxito',
    datafield: 'pe21_obje',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    hidden: true,
    columngroup: 'pe21',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Proyección',
    datafield: 'pe21_prim',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'pe21',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: clasePeg21Zona,
  },
  {
    text: 'Seguimiento',
    datafield: 'pe21_segu',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'pe21',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: clasePeg21Zona,
  },
  {
    text: 'Peg42',
    datafield: 'pe42',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'pe42',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Obj. form. éxito',
    datafield: 'pe42_obje',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    hidden: true,
    columngroup: 'pe42',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Proyección',
    datafield: 'pe42_prim',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'pe42',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: clasePeg42Zona,
  },
  {
    text: 'Seguimiento',
    datafield: 'pe42_segu',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'pe42',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: clasePeg42Zona,
  },
  {
    text: 'Peg63',
    datafield: 'pe63',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'pe63',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Obj. form. éxito',
    datafield: 'pe63_obje',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    hidden: true,
    columngroup: 'pe63',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Proyección',
    datafield: 'pe63_prim',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'pe63',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: clasePeg63Zona,
  },
  {
    text: 'Seguimiento',
    datafield: 'pe63_segu',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'pe63',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: clasePeg63Zona,
  },
  {
    text: 'Pegs',
    datafield: 'pegs',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'pegs',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Obj. form. éxito',
    datafield: 'pegs_obje',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    hidden: true,
    columngroup: 'pegs',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Proyección',
    datafield: 'pegs_prim',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'pegs',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: clasePegsZona,
  },
  {
    text: 'Seguimiento',
    datafield: 'pegs_segu',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'pegs',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: clasePegsZona,
  },
  {
    text: 'Pos. Rein.',
    datafield: 'rein',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'rein',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Obj. form. éxito',
    datafield: 'rein_obje',
    width: '140',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    hidden: true,
    columngroup: 'rein',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Proyección',
    datafield: 'rein_prim',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'rein',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: claseReingresoZona,
  },
  {
    text: 'Seguimiento',
    datafield: 'rein_segu',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'rein',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: claseReingresoZona,
  },
  {
    text: 'Proyección',
    datafield: 'capi_obje',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'capi',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: claseCapitalizacionZona,
  },
  {
    text: 'Seguimiento',
    datafield: 'capi_repr',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'capi',
    cellsformat: 'N',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    cellclassname: claseCapitalizacionZona,
  },
  {
    text: 'Objetivos', 
    datafield: 'tota_pedi_proy',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'totas',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        }, 
      },
    ],
  },
  {
    text: 'Seguimiento',
    datafield: 'tota_pedi_segi',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'totas',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Objetivo',
    datafield: 'vent_obje',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    columngroup: 'vent',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Venta',
    datafield: 'vent_segi',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false, 
    columngroup: 'vent',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },

  /*{
    text: 'Cobranza 88%(por cobrar)',
    datafield: 'cobr',
    width: '160',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    cellsformat: 'D2',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  }, 
  {
    text: 'Cobranza 88%(te puedes quedar)',
    datafield: 'cobr_colc',
    width: '180',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    cellsformat: 'd2',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Cobranza 92%(por cobrar)',
    datafield: 'co92',
    width: '160',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    cellsformat: 'D2',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Cobranza 92%(te puedes quedar)',
    datafield: 'co92_colc',
    width: '180',
    align: 'center',
    cellsalign: 'center',
    editable: false,
    pinned: false,
    cellsformat: 'D2',
    aggregates: [
      {
        
        T: function (aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },*/
]

const columnasGrupo = [
  /*{
    text: 'Pedidos Totales',
    align: 'center',
    name: 'tota',
  },*/
  {
    text: 'Incorporación',
    align: 'center',
    name: 'inco',
  },

  /*{
    text: 'Pedidos de retención',
    align: 'center',
    name: 'rete',
  },
  {
    text: '% Actividad',
    align: 'center',
    name: 'acti',
  },*/
  {
    text: 'Consecutividad',
    align: 'center',
    name: 'cons_prim',
  },
  {
    text: 'Consecutividad 2do pedido',
    align: 'center',
    name: 'cons_segu',
  },
  {
    text: 'Consecutividad 3er pedido',
    align: 'center',
    name: 'cons_terc',
  },
  {
    text: 'Consecutividad 4to pedido',
    align: 'center',
    name: 'cons_cuar',
  },
  {
    text: 'Peg21 minimo 50%',
    align: 'center',
    name: 'pe21',
  },
  {
    text: 'Peg42 minimo 35%',
    align: 'center',
    name: 'pe42',
  },
  {
    text: 'Peg63 minimo 25%',
    align: 'center',
    name: 'pe63',
  },
  {
    text: 'Retencion Total',
    align: 'center',
    name: 'pegs',
  },
  {
    text: 'Reingresos',
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
    name: 'tota',
  },
  {
    text: 'Venta',
    align: 'center',
    name: 'vent',
  },
]

const columnasGrupoZona = [
  {
    text: 'Incorporación',
    align: 'center',
    name: 'inco',
  },

  /*{
    text: 'Pedidos de retención',
    align: 'center',
    name: 'rete',
  },
  {
    text: '% Actividad',
    align: 'center',
    name: 'acti',
  },*/
  {
    text: 'Consecutividad',
    align: 'center',
    name: 'cons_prim',
  },
  {
    text: 'Consecutividad 2do pedido',
    align: 'center',
    name: 'cons_segu',
  },
  {
    text: 'Consecutividad 3er pedido',
    align: 'center',
    name: 'cons_terc',
  },
  {
    text: 'Consecutividad 4to pedido',
    align: 'center',
    name: 'cons_cuar',
  },
  {
    text: 'Peg21 minimo 50%',
    align: 'center',
    name: 'pe21',
  },
  {
    text: 'Peg42 minimo 35%',
    align: 'center',
    name: 'pe42',
  },
  {
    text: 'Peg63 minimo 25%',
    align: 'center',
    name: 'pe63',
  },
  {
    text: 'Retencion Total',
    align: 'center',
    name: 'pegs',
  },
  {
    text: 'Reingresos',
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
    name: 'totas',
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
    { name: 'codi_cort', type: 'number' },
    { name: 'codi_area', type: 'string' },
    { name: 'tota_zona', type: 'number' },
    { name: 'acti_inic', type: 'number' },
    { name: 'pedi_tota_cant', type: 'number' },
    { name: 'pedi_tota_prim', type: 'number' },
    { name: 'pedi_tota_prim_porc', type: 'number' },
    { name: 'pedi_tota_segu', type: 'number' },
    { name: 'pedi_tota_segu_porc', type: 'number' },
    { name: 'pedi_inco_cant', type: 'number' },
    { name: 'pedi_inco_prim', type: 'number' },
    { name: 'pedi_inco_prim_porc', type: 'number' },
    { name: 'pedi_inco_segu', type: 'number' },
    { name: 'pedi_inco_segu_porc', type: 'number' },
    { name: 'pedi_rete_cant', type: 'number' },
    { name: 'pedi_rete_prim', type: 'number' },
    { name: 'pedi_rete_prim_porc', type: 'number' },
    { name: 'pedi_rete_segu', type: 'number' },
    { name: 'pedi_rete_segu_porc', type: 'number' },
    { name: 'acti_camp_ante', type: 'number' },
    { name: 'acti_obje', type: 'number' },
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
    { name: 'cons_segu_proy', type: 'number' },
    { name: 'cons_segu_segi', type: 'number' },
    { name: 'cons_terc_obje', type: 'number' },
    { name: 'cons_terc_proy', type: 'number' },
    { name: 'cons_terc_camp_ante', type: 'number' },
    { name: 'cons_terc_proy', type: 'number' },
    { name: 'cons_terc_segi', type: 'number' },
    { name: 'cons_cuar_camp_ante', type: 'number' },
    { name: 'cons_cuar_obje', type: 'number' },
    { name: 'cons_cuar_proy', type: 'number' },
    { name: 'cons_cuar_segi', type: 'number' },
    { name: 'pe21', type: 'number' },
    { name: 'pe21_obje', type: 'number' },
    { name: 'pe21_prim', type: 'number' },
    { name: 'pe21_segu', type: 'number' },
    { name: 'pe42', type: 'number' },
    { name: 'pe42_obje', type: 'number' },
    { name: 'pe42_prim', type: 'number' },
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
    { name: 'tota_pedi_proy', type: 'number' },
    { name: 'tota_pedi_segi', type: 'number' },
    { name: 'co92_colc', type: 'number' },
    { name: 'vent_obje', type: 'number' },
    { name: 'vent_segi', type: 'number' },
  ],
  datatype: 'json',
})

const sourceGlobalZona = ref({
  localdata: [],
  datafields: [
    { name: 'codi_cort', type: 'number' },
    { name: 'codi_zona', type: 'string' },
    { name: 'nomb_vend', type: 'string' },
    { name: 'acti_inic', type: 'number' },
    { name: 'pedi_tota_cant', type: 'number' },
    { name: 'pedi_tota_prim', type: 'number' },
    { name: 'pedi_tota_prim_porc', type: 'number' },
    { name: 'pedi_tota_segu', type: 'number' },
    { name: 'pedi_tota_segu_porc', type: 'number' },
    { name: 'pedi_inco_cant', type: 'number' },
    { name: 'pedi_inco_prim', type: 'number' },
    { name: 'pedi_inco_prim_porc', type: 'number' },
    { name: 'pedi_inco_segu', type: 'number' },
    { name: 'pedi_inco_segu_porc', type: 'number' },
    { name: 'pedi_rete_cant', type: 'number' },
    { name: 'pedi_rete_prim', type: 'number' },
    { name: 'pedi_rete_prim_porc', type: 'number' },
    { name: 'pedi_rete_segu', type: 'number' },
    { name: 'pedi_rete_segu_porc', type: 'number' },
    { name: 'acti_camp_ante', type: 'number' },
    { name: 'acti_obje', type: 'number' },
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
    { name: 'cons_segu_proy', type: 'number' },
    { name: 'cons_segu_segi', type: 'number' },
    { name: 'cons_terc_camp_ante', type: 'number' },
    { name: 'cons_terc_obje', type: 'number' },
    { name: 'cons_terc_proy', type: 'number' },
    { name: 'cons_terc_segi', type: 'number' },
    { name: 'cons_cuar_camp_ante', type: 'number' },
    { name: 'cons_cuar_obje', type: 'number' },
    { name: 'cons_cuar_proy', type: 'number' }, 
    { name: 'cons_cuar_segi', type: 'number' },
    { name: 'pe21', type: 'number' },
    { name: 'pe21_obje', type: 'number' },
    { name: 'pe21_prim', type: 'number' },
    { name: 'pe21_segu', type: 'number' },
    { name: 'pe42', type: 'number' },
    { name: 'pe42_obje', type: 'number' },
    { name: 'pe42_prim', type: 'number' },
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
    { name: 'tota_pedi_proy', type: 'number' },
    { name: 'tota_pedi_segi', type: 'number' },
    { name: 'co92_colc', type: 'number' },
    { name: 'vent_obje', type: 'number' },
    { name: 'vent_segi', type: 'number' },
  ],
  datatype: 'json',
})

const adaptadorGlobal = new jqx.dataAdapter(sourceGlobal.value)
const adaptadorGlobalZona = new jqx.dataAdapter(sourceGlobalZona.value)

const refGridGlobal = ref()
const refGridGlobalZona = ref()

const localization = appStore.localization

const campanaOptions = ref([])
const errorCampana = ref(false)
const errorMensajeCampana = ref('')

const areaOptions = ref([])
const errorArea = ref(false)
const errorMensajeArea = ref('')

onMounted(async () => {
  appStore.titulo(`Reportes / Proyección región`)
  await obtenerCampana()
  await obtenerArea()
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

const obtenerArea = async () => {
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
    general.value = {
      objetivoIncorporacion: '0',
      proyeccionIncorporacion: '0',
      proyeccionPorcentajeIncorporacion: '0.00',
      reproyeccionIncorporacion: '0',
      reproyeccionPorcentajeIncorporacion: '0.00',
      objetivoRetencion: '0',
      proyeccionRetencion: '0',
      proyeccionPorcentajeRetencion: '0.00',
      reproyeccionRetencion: '0',
      reproyeccionPorcentajeRetencion: '0',
      objetivoActividad: '0.00',
      proyeccionActividad: '0.00',
      proyeccionPorcentajeActividad: '0.00',
      reproyeccionActividad: '0.00',
      reproyeccionPorcentajeActividad: '0.00',
    }

    const { data } = await $api(`/api/sami/v1/reportes/proyeccion-campana-region`, {
      method: "get",
      query: {
        campana: (formulario.value.campana === null) ? '' : formulario.value.campana,
        area: (formulario.value.area === null) ? '' : formulario.value.area,
      },
    })

    sourceGlobal.value.localdata =  data.data_cons
    refGridGlobal.value.updatebounddata('cells')
    refGridGlobal.value.refreshfilterrow()

    sourceGlobalZona.value.localdata =  data.data_glob
    refGridGlobalZona.value.updatebounddata('cells')
    refGridGlobalZona.value.refreshfilterrow()

    general.value = {
      objetivoIncorporacion: data.obje_inco,
      proyeccionIncorporacion: data.obje_inco_proy,
      proyeccionPorcentajeIncorporacion: data.obje_inco_proy_porc,
      objetivoRetencion: data.obje_rete,
      proyeccionRetencion: data.obje_rete_proy,
      proyeccionPorcentajeRetencion: data.obje_rete_proy_porc,
      reproyeccionRetencion: data.obje_rete_repr,
      reproyeccionPorcentajeRetencion: data.obje_rete_repr_porc,
      objetivoActividad: data.obje_acti,
      proyeccionActividad: data.obje_acti_proy,
      proyeccionPorcentajeActividad: data.obje_acti_proy_porc,
      reproyeccionActividad: data.obje_acti_repr,
      reproyeccionPorcentajeActividad: data.obje_acti_repr_porc,
    }
    
  } catch (error) {
    console.log(error)
    if (typeof error.response != "undefined") {
      const { data } = error.response._data    
      if (typeof data != "undefined") {
        for (var key in data)
        {
          if (key == 'campana') {
            errorCampana.value = true
            errorMensajeCampana.value = data[key]
          }
          if (key == 'area') {
            errorArea.value = true
            errorMensajeArea.value = data[key]
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
    area: null,
  }
  general.value = {
    objetivoIncorporacion: '0',
    proyeccionIncorporacion: '0',
    proyeccionPorcentajeIncorporacion: '0.00',
    reproyeccionIncorporacion: '0',
    reproyeccionPorcentajeIncorporacion: '0.00',
    objetivoRetencion: '0',
    proyeccionRetencion: '0',
    proyeccionPorcentajeRetencion: '0.00',
    reproyeccionRetencion: '0',
    reproyeccionPorcentajeRetencion: '0',
    objetivoActividad: '0.00',
    proyeccionActividad: '0.00',
    proyeccionPorcentajeActividad: '0.00',
    reproyeccionActividad: '0.00',
    reproyeccionPorcentajeActividad: '0.00',
  }
  sourceGlobal.value.localdata = []
  refGridGlobal.value.updatebounddata('cells')
  refGridGlobal.value.refreshfilterrow()

  sourceGlobalZona.value.localdata = []
  refGridGlobalZona.value.updatebounddata('cells')
  refGridGlobalZona.value.refreshfilterrow()
}

const onExcel = async () => {
  try {
    appStore.mensaje('Generando archivo')
    appStore.loading(true)

    // console.log("general.value")
    // console.log(general.value)
    // console.log("selectedVariable.value")
    console.log(cabecera.value)  
 
    // console.log("cabeceraZona.value")
    // console.log(cabeceraZona.value)

    const { data } = await $api(`/api/sami/v1/reportes/proyeccion-campana-region/excel`, {
      
      method: "post",
      body: {
        general: general.value,
        variable: selectedVariable.value,
        cabecera_corte: cabeceraCorte.value,
        detalle: JSON.stringify(refGridGlobal.value.exportdata('xml')),
        cabecera_zona: cabeceraZona.value,
        detalle_zona: JSON.stringify(refGridGlobalZona.value.exportdata('xml')),
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

const columnsOcultarTodo = [
  'codi_cort',
  'codi_area',
  'tota_zona',
  'acti_inic',
  'pedi_tota_cant',
  'pedi_tota_prim',
  'pedi_tota_prim_porc',
  'pedi_tota_segu',
  'pedi_tota_segu_porc',
  'pedi_inco_cant',
  'pedi_inco_prim',
  'pedi_inco_prim_porc',
  'pedi_inco_segu',
  'pedi_inco_segu_porc',
  'pedi_rete_cant',
  'pedi_rete_prim',
  'pedi_rete_prim_porc',
  'pedi_rete_segu',
  'pedi_rete_segu_porc',
  'acti_camp_ante',
  'acti_obje',
  'acti_obje_pedi',
  'acti_porc_prim',
  'acti_prim',
  'acti_porc_segu',
  'acti_segu',
  'cons_rete_camp_ante',
  'cons_rete_obje',
  'cons_rete_prim',
  'cons_rete_segu',
  'cons_segu_camp_ante',
  'cons_segu_obje',
  'cons_segu_segi',
  'cons_terc_camp_ante',
  'cons_terc_obje',
  'cons_terc_proy',
  'cons_cuar_camp_ante',       
  'cons_cuar_obje',
  'pe21',
  'pe21_obje',
  'pe21_prim',
  'pe21_segu',
  'pe42',
  'pe42_obje',
  'pe42_prim',
  'pe42_segu',
  'pe63',
  'pe63_obje',
  'pe63_prim',
  'pe63_segu',
  'pegs',
  'pegs_obje',
  'pegs_prim',
  'pegs_segu',
  'rein',
  'rein_obje',
  'rein_prim',
  'rein_segu',
  'capi_obje',
  'capi_repr',
  'tota_vent',
  'cobr',
  'cobr_colc',
  'co92',
  'co92_colc',
  'tota_pedi_proy',
  'tota_pedi_segi',
]

const columnsMostrarTodo = [
  'codi_cort',
  'codi_area',
  'tota_zona',
  'acti_inic',
  'pedi_tota_cant',
  'pedi_tota_prim',
  'pedi_tota_prim_porc',
  'pedi_tota_segu',
  'pedi_tota_segu_porc',
  'pedi_inco_cant',
  'pedi_inco_prim',
  'pedi_inco_prim_porc',
  'pedi_inco_segu',
  'pedi_inco_segu_porc',
  'pedi_rete_cant',
  'pedi_rete_prim',
  'pedi_rete_prim_porc',
  'pedi_rete_segu',
  'pedi_rete_segu_porc',
  'acti_camp_ante',
  'acti_obje',
  'acti_obje_pedi',
  'acti_porc_prim',
  'acti_prim',
  'acti_porc_segu',
  'acti_segu',
  'cons_rete_camp_ante',
  'cons_rete_obje',
  'cons_rete_prim',
  'cons_rete_segu',
  'cons_segu_camp_ante',
  'cons_segu_obje',
  'cons_segu_segi',
  'cons_terc_camp_ante',
  'cons_terc_obje',
  'cons_cuar_camp_ante',       
  'cons_cuar_obje',
  'pe21',
  'pe21_obje',
  'pe21_prim',
  'pe21_segu',
  'pe42',
  'pe42_obje',
  'pe42_prim',
  'pe42_segu',
  'pe63',
  'pe63_obje',
  'pe63_prim',
  'pe63_segu',
  'pegs',
  'pegs_obje',
  'pegs_prim',
  'pegs_segu',
  'rein',
  'rein_obje',
  'rein_prim',
  'rein_segu',
  'capi_obje',
  'capi_repr',
  'tota_vent',
  'cobr',
  'cobr_colc',
  'co92',
  'co92_colc',
  'tota_pedi_proy',
  'tota_pedi_segi',
]

const columnsMostrarPedidosTotales = [
  'codi_cort',
  'codi_area',
  'tota_zona',
  'acti_inic',
  'pedi_tota_cant',
  'pedi_tota_prim',
  'pedi_tota_prim_porc',
  'pedi_tota_segu',
  'pedi_tota_segu_porc',
  'pedi_inco_cant',
  'pedi_inco_prim',
  'pedi_inco_prim_porc',
  'pedi_inco_segu',
  'pedi_inco_segu_porc',
  'pedi_rete_cant',
  'pedi_rete_prim',
  'pedi_rete_prim_porc',
  'pedi_rete_segu',
  'pedi_rete_segu_porc',
]

const columnsMostrarPedidosActividad = [
  'codi_cort',
  'codi_area',
  'tota_zona',
  'acti_inic',
  'acti_camp_ante',
  'acti_obje',
  'acti_obje_pedi',
  'acti_porc_prim',
  'acti_prim',
  'acti_porc_segu',
  'acti_segu',
  'cons_rete_camp_ante',
  'cons_rete_obje',
  'cons_rete_prim',
  'cons_rete_segu',
  'cons_segu_camp_ante',
  'cons_segu_obje',
  'pe21',
  'pe21_obje',
  'pe21_prim',
  'pe21_segu',
  'pe42',
  'pe42_obje',
  'pe42_prim',
  'pe42_segu',
  'pe63',
  'pe63_obje',
  'pe63_prim',
  'pe63_segu',
  'pegs',
  'pegs_obje',
  'pegs_prim',
  'pegs_segu',
]

const columnsMostrarPedidosRetencion = [
  'codi_cort',
  'codi_area',
  'tota_zona',
  'acti_inic',
  'pedi_rete_cant',
  'pedi_rete_prim',
  'pedi_rete_prim_porc',
  'pedi_rete_segu',
  'pedi_rete_segu_porc',
  'cons_rete_camp_ante',
  'cons_rete_obje',
  'cons_rete_prim',
  'cons_rete_segu',
  'cons_segu_camp_ante',
  'cons_segu_obje',
  'pe21',
  'pe21_obje',
  'pe21_prim',
  'pe21_segu',
  'pe42',
  'pe42_obje',
  'pe42_prim',
  'pe42_segu',
  'pe63',
  'pe63_obje',
  'pe63_prim',
  'pe63_segu',
  'pegs',
  'pegs_obje',
  'pegs_prim',
  'pegs_segu',
  'rein',
  'rein_obje',
  'rein_prim',
  'rein_segu',
]

const columnsMostrarCapitalizacion = [
  'codi_cort',
  'codi_area',
  'tota_zona',
  'acti_inic',
  'pedi_inco_cant',
  'pedi_inco_prim',
  'pedi_inco_prim_porc',
  'pedi_inco_segu',
  'pedi_inco_segu_porc',
  'pe63',
  'pe63_obje',
  'pe63_prim',
  'pe63_segu',
  'rein',
  'rein_obje',
  'rein_prim',
  'rein_segu',
  'capi_obje',
  'capi_repr',
]

const columnsMostrarCobranza = [
  'codi_cort',
  'codi_area',
  'tota_zona',
  'acti_inic',
  'tota_vent',
  'cobr',
  'cobr_colc',
  'co92',
  'co92_colc',
]

const columnsMostrarConsecutividad = [
  'codi_cort',
  'codi_area',
  'tota_zona',
  'acti_inic',
  'cons_rete_camp_ante',
  'cons_rete_obje',
  'cons_rete_prim',
  'cons_rete_segu',
  'cons_segu_camp_ante',
  'cons_segu_obje',
  'cons_terc_camp_ante',
  'cons_terc_obje',
  'cons_cuar_camp_ante',
  'cons_cuar_obje',
]


const columnsOcultarTodoZona = [
  'codi_cort',
  'codi_zona',
  'nomb_vend',
  'acti_inic',
  'pedi_tota_cant',
  'pedi_tota_prim',
  'pedi_tota_prim_porc',
  'pedi_tota_segu',
  'pedi_tota_segu_porc',
  'pedi_inco_cant',
  'pedi_inco_prim',
  'pedi_inco_prim_porc',
  'pedi_inco_segu',
  'pedi_inco_segu_porc',
  'pedi_rete_cant',
  'pedi_rete_prim',
  'pedi_rete_prim_porc',
  'pedi_rete_segu',
  'pedi_rete_segu_porc',
  'acti_camp_ante',
  'acti_obje',
  'acti_obje_pedi',
  'acti_porc_prim',
  'acti_prim',
  'acti_porc_segu',
  'acti_segu',
  'cons_rete_camp_ante',
  'cons_rete_obje',
  'cons_rete_prim',
  'cons_rete_segu',
  'cons_segu_camp_ante',
  'cons_segu_obje',
  'cons_terc_camp_ante',
  'cons_terc_obje',
  'cons_cuar_camp_ante',       
  'cons_cuar_obje',
  'pe21',
  'pe21_obje',
  'pe21_prim',
  'pe21_segu',
  'pe42',
  'pe42_obje',
  'pe42_prim',
  'pe42_segu',
  'pe63',
  'pe63_obje',
  'pe63_prim',
  'pe63_segu',
  'pegs',
  'pegs_obje',
  'pegs_prim',
  'pegs_segu',
  'rein',
  'rein_obje',
  'rein_prim',
  'rein_segu',
  'capi_obje',
  'capi_repr',
  'tota_vent',
  'cobr',
  'cobr_colc',
  'co92',
  'co92_colc',
  'tota_pedi_proy',
  'tota_pedi_segi',
]

const columnsMostrarTodoZona = [
  'codi_cort',
  'codi_zona',
  'nomb_vend',
  'acti_inic',
  'pedi_tota_cant',
  'pedi_tota_prim',
  'pedi_tota_prim_porc',
  'pedi_tota_segu',
  'pedi_tota_segu_porc',
  'pedi_inco_cant',
  'pedi_inco_prim',
  'pedi_inco_prim_porc',
  'pedi_inco_segu',
  'pedi_inco_segu_porc',
  'pedi_rete_cant',
  'pedi_rete_prim',
  'pedi_rete_prim_porc',
  'pedi_rete_segu',
  'pedi_rete_segu_porc',
  'acti_camp_ante',
  'acti_obje',
  'acti_obje_pedi',
  'acti_porc_prim',
  'acti_prim',
  'acti_porc_segu',
  'acti_segu',
  'cons_rete_camp_ante',
  'cons_rete_obje',
  'cons_rete_prim',
  'cons_rete_segu',
  'cons_segu_camp_ante',
  'cons_segu_obje',
  'cons_terc_camp_ante',
  'cons_terc_obje',
  'cons_cuar_camp_ante',       
  'cons_cuar_obje',
  'pe21',
  'pe21_obje',
  'pe21_prim',
  'pe21_segu',
  'pe42',
  'pe42_obje',
  'pe42_prim',
  'pe42_segu',
  'pe63',
  'pe63_obje',
  'pe63_prim',
  'pe63_segu',
  'pegs',
  'pegs_obje',
  'pegs_prim',
  'pegs_segu',
  'rein',
  'rein_obje',
  'rein_prim',
  'rein_segu',
  'capi_obje',
  'capi_repr',
  'tota_vent',
  'cobr',
  'cobr_colc',
  'co92',
  'co92_colc',
  'tota_pedi_proy',
  'tota_pedi_segi',
]

const columnsMostrarPedidosTotalesZona = [
  'codi_cort',
  'codi_zona',
  'nomb_vend',
  'acti_inic',
  'pedi_tota_cant',
  'pedi_tota_prim',
  'pedi_tota_prim_porc',
  'pedi_tota_segu',
  'pedi_tota_segu_porc',
  'pedi_inco_cant',
  'pedi_inco_prim',
  'pedi_inco_prim_porc',
  'pedi_inco_segu',
  'pedi_inco_segu_porc',
  'pedi_rete_cant',
  'pedi_rete_prim',
  'pedi_rete_prim_porc',
  'pedi_rete_segu',
  'pedi_rete_segu_porc',
]

const columnsMostrarPedidosActividadZona = [
  'codi_cort',
  'codi_zona',
  'nomb_vend',
  'acti_inic',
  'acti_camp_ante',
  'acti_obje',
  'acti_obje_pedi',
  'acti_porc_prim',
  'acti_prim',
  'acti_porc_segu',
  'acti_segu',
  'cons_rete_camp_ante',
  'cons_rete_obje',
  'cons_rete_prim',
  'cons_rete_segu',
  'cons_segu_camp_ante',
  'cons_segu_obje',
  'pe21',
  'pe21_obje',
  'pe21_prim',
  'pe21_segu',
  'pe42',
  'pe42_obje',
  'pe42_prim',
  'pe42_segu',
  'pe63',
  'pe63_obje',
  'pe63_prim',
  'pe63_segu',
  'pegs',
  'pegs_obje',
  'pegs_prim',
  'pegs_segu',
]

const columnsMostrarPedidosRetencionZona = [
  'codi_cort',
  'codi_zona',
  'nomb_vend',
  'acti_inic',
  'pedi_rete_cant',
  'pedi_rete_prim',
  'pedi_rete_prim_porc',
  'pedi_rete_segu',
  'pedi_rete_segu_porc',
  'cons_rete_camp_ante',
  'cons_rete_obje',
  'cons_rete_prim',
  'cons_rete_segu',
  'cons_segu_camp_ante',
  'cons_segu_obje',
  'pe21',
  'pe21_obje',
  'pe21_prim',
  'pe21_segu',
  'pe42',
  'pe42_obje',
  'pe42_prim',
  'pe42_segu',
  'pe63',
  'pe63_obje',
  'pe63_prim',
  'pe63_segu',
  'pegs',
  'pegs_obje',
  'pegs_prim',
  'pegs_segu',
  'rein',
  'rein_obje',
  'rein_prim',
  'rein_segu',
]

const columnsMostrarCapitalizacionZona = [
  'codi_cort',
  'codi_zona',
  'nomb_vend',
  'acti_inic',
  'pedi_inco_cant',
  'pedi_inco_prim',
  'pedi_inco_prim_porc',
  'pedi_inco_segu',
  'pedi_inco_segu_porc',
  'pe63',
  'pe63_obje',
  'pe63_prim',
  'pe63_segu',
  'rein',
  'rein_obje',
  'rein_prim',
  'rein_segu',
  'capi_obje',
  'capi_repr',
]

const columnsMostrarCobranzaZona = [
  'codi_cort',
  'codi_zona',
  'nomb_vend',
  'acti_inic',
  'tota_vent',
  'cobr',
  'cobr_colc',
  'co92',
  'co92_colc',
]

const columnsMostrarConsecutividadZona = [
  'codi_cort',
  'codi_zona',
  'nomb_vend',
  'acti_inic',
  'cons_rete_camp_ante',
  'cons_rete_obje',
  'cons_rete_prim',
  'cons_rete_segu',
  'cons_segu_camp_ante',
  'cons_segu_obje',
  'cons_terc_camp_ante',
  'cons_terc_obje',
  'cons_cuar_camp_ante',
  'cons_cuar_obje',
]

watch(selectedVariable, async (nuevaVariable, antiguaVariable) => {
  refGridGlobal.value.beginupdate()
  refGridGlobalZona.value.beginupdate()

  columnsOcultarTodo.forEach(column => {
    refGridGlobal.value.hidecolumn(column)
  })
  columnsOcultarTodoZona.forEach(column => {
    refGridGlobalZona.value.hidecolumn(column)
  })
  
  if (nuevaVariable === 0) {
    columnsMostrarTodo.forEach(column => {
      refGridGlobal.value.showcolumn(column)
    })
    columnsMostrarTodoZona.forEach(column => {
      refGridGlobalZona.value.showcolumn(column)
    })
  } else if (nuevaVariable === 1) {
    columnsMostrarPedidosTotales.forEach(column => {
      refGridGlobal.value.showcolumn(column)
    })
    columnsMostrarPedidosTotalesZona.forEach(column => {
      refGridGlobalZona.value.showcolumn(column)
    })
  } else if (nuevaVariable === 2) {
    columnsMostrarPedidosActividad.forEach(column => {
      refGridGlobal.value.showcolumn(column)
    })
    columnsMostrarPedidosActividadZona.forEach(column => {
      refGridGlobalZona.value.showcolumn(column)
    })
  } else if (nuevaVariable === 3) {
    columnsMostrarPedidosRetencion.forEach(column => {
      refGridGlobal.value.showcolumn(column)
    })
    columnsMostrarPedidosRetencionZona.forEach(column => {
      refGridGlobalZona.value.showcolumn(column)
    })
  } else if (nuevaVariable === 4) {
    columnsMostrarCapitalizacion.forEach(column => {
      refGridGlobal.value.showcolumn(column)
    })
    columnsMostrarCapitalizacionZona.forEach(column => {
      refGridGlobalZona.value.showcolumn(column)
    })
  } else if (nuevaVariable === 5) {
    columnsMostrarCobranza.forEach(column => {
      refGridGlobal.value.showcolumn(column)
    })
    columnsMostrarCobranzaZona.forEach(column => {
      refGridGlobalZona.value.showcolumn(column)
    })
  } else if (nuevaVariable === 6) {
    columnsMostrarConsecutividad.forEach(column => {
      refGridGlobal.value.showcolumn(column)
    })
    columnsMostrarConsecutividadZona.forEach(column => {
      refGridGlobalZona.value.showcolumn(column)
    })
  }
  refGridGlobal.value.endupdate()
  refGridGlobalZona.value.endupdate()
})
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
                      v-model="formulario.area"
                      :items="areaOptions"
                      label="Región"
                      placeholder="Seleccionar region"
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
                        OBJ. REGION
                      </th>
                      <th class="text-uppercase">
                        OBJ. PROYECCION
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
                      <td>{{ general.proyeccionPorcentajeIncorporacion }}</td>
                    </tr>
                    <!--
                      <tr>
                      <td>Retención</td>
                      <td>{{ general.objetivoRetencion }}</td>
                      <td>{{ general.proyeccionRetencion }}</td>
                      <td>{{ general.proyeccionPorcentajeRetencion }}</td>
                      <td>{{ general.reproyeccionRetencion }}</td>
                      <td>{{ general.reproyeccionPorcentajeRetencion }}</td>
                      </tr> 
                    -->
                    <tr>
                      <td>Pedidos Totales</td>
                      <td>{{ general.objetivoActividad }}</td>
                      <td>{{ general.proyeccionActividad }}</td>
                      <td>{{ general.proyeccionPorcentajeActividad }}</td>
                    </tr>
                  </tbody>
                </VTable>
              </VCardText>
            </VCard>
          </VCol>

          <VCol cols="12">
            <!--
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
            -->
          </VCol>
      
          <VCol cols="12">
            <VCard title="Consolidado por corte">
              <VCardText>
                <JqxGrid
                  ref="refGridGlobal"
                  theme="material"
                  width="100%"
                  :localization="localization"
                  :height="450"
                  :columns="columnas"
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
                />
              </VCardText>
            </VCard>
          </VCol>

          <VCol cols="12">
            <VCard title="Detalle por zona">
              <VCardText>
                <JqxGrid
                  ref="refGridGlobalZona"
                  theme="material"
                  width="100%"
                  :localization="localization"
                  :height="450"
                  :columns="columnasZona"
                  :source="adaptadorGlobalZona"
                  :columngroups="columnasGrupoZona"
                  columnsresize
                  columnsautoresize
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
                />
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </template>
    </AppPlantilla>
  </div>
</template>
 
                   

