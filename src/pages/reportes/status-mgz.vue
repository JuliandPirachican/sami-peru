<!-- eslint-disable camelcase -->
<script setup>
import { useAppStore } from '@/stores/app';
import JqxGrid from 'jqwidgets-scripts/jqwidgets-vue3/vue_jqxgrid.vue';
import JqxListBox from 'jqwidgets-scripts/jqwidgets-vue3/vue_jqxlistbox.vue';
import { useDisplay } from 'vuetify';

const { mobile } = useDisplay()
const appStore = useAppStore()

const formulario = ref({
  campana: null,
  zona: null,
})

const campanaOptions = ref([])
const errorCampana = ref(false)
const errorMensajeCampana = ref('')

const zonaOptions = ref([])
const errorZona = ref(false)
const errorMensajeZona = ref('')

const isOpen = ref(false)

const headersConsolidado = computed(() => {
  return [
    { title: 'Región', key: 'codi_area' },
    { title: 'Zona', key: 'codi_zona' },
    { title: 'Sector', key: 'codi_sect' },
    { title: 'Act. inic.', key: 'acti_inic' },
    { title: 'Incorp.', key: 'tota_ingr' },
    { title: 'Reing.', key: 'tota_rein' },
    { title: 'Reco.', key: 'tota_reco' },
    { title: 'Egre.', key: 'tota_egre' },
    { title: 'Capi.', key: 'tota_capi' },
    { title: 'Act. fin.', key: 'acti_fina' },
    { title: 'Posi. rein.', key: 'posi_rein' },
    { title: 'Ret. peg21', key: 'rete_pe21' },
    { title: '% Ret. peg21', key: 'porc_re21' },
    { title: 'Ret. peg42', key: 'rete_pe42' },
    { title: '% Ret. peg42', key: 'porc_re42' },
    { title: 'Ret. peg63', key: 'rete_pe63' },
    { title: '% Ret. peg63', key: 'porc_re63' },
    { title: '% Acti.', key: 'porc_acti' },
    { title: 'Pedi. reten.', key: 'pedi_rete' },
    { title: 'Pedi. total', key: 'nume_pedi' },
    { title: 'Puntos', key: 'tota_punt' },
    { title: 'Vta. Catálogo', key: 'tota_cata_rece' },
    { title: 'PPP Catálogo', key: 'pppp_cata_rece' },
    { title: 'Vta. Rece.', key: 'vent_rece' },
    { title: 'PPP Rece.', key: 'pppp_rece' },
    { title: 'Vta. Linea', key: 'tota_line' },
    { title: 'PPP Linea', key: 'tota_pedi' },
    { title: 'Vta. Fact.', key: 'tota_fact' },
    { title: 'PPP Fact.', key: 'pppp_fact' },
    { title: 'Faltante', key: 'tota_falt' },
    { title: '% Faltante', key: 'porc_falt' },
    { title: 'Unid', key: 'tota_unid' },
    { title: 'UPP', key: 'tota_uppp' },
    { title: 'S/. Unid.', key: 'mont_unid' },
    { title: 'Peg21', key: 'posi_eg21' },
    { title: 'Peg42', key: 'posi_eg42' },
    { title: 'Peg63', key: 'posi_egre' },
  ]
})

const columnsGroupConsolidado = [
  {
    text: 'Venta facturada',
    align: 'center',
    name: 'vent_fact',
  },
  {
    text: 'Faltante',
    align: 'center',
    name: 'falt',
  },
  {
    text: 'Venta linea',
    align: 'center',
    name: 'vent_line',
  },
  {
    text: 'Venta recepcionada',
    align: 'center',
    name: 'vent_rece',
  },
  {
    text: 'Unidades',
    align: 'center',
    name: 'unid',
  },
  {
    text: 'Venta Catálogo',
    align: 'center',
    name: 'vent_cata',
  },
]

let numero = 0
let total = 0
let sumaGlobal = 0
let sumaNumePediGlobal = 0
let sumaTotaIngrGlobal = 0
let sumaTotaReinGlobal = 0
let sumaActiInicGlobal = 0

const columnasConsolidado = computed(() => {
  return [
    {
      text: 'Región',
      dataField: 'codi_area',
      width: '80',
      align: 'center',
      cellsalign: 'center',
      pinned: (mobile.value) ? false: true,
      filtertype: 'checkedlist',
    },
    {
      text: 'Zona',
      dataField: 'codi_zona',
      width: '80',
      align: 'center',
      cellsalign: 'center',
      pinned: (mobile.value) ? false : true,
      filtertype: 'checkedlist',
    },
    {
      text: 'Sector',
      dataField: 'codi_sect',
      width: '80',
      align: 'center',
      cellsalign: 'center',
      pinned: (mobile.value) ? false : true,
      filtertype: 'checkedlist',
    },
    {
      text: 'Act. inic.',
      dataField: 'acti_inic',
      width: '120',
      align: 'center',
      cellsalign: 'center',
      cellsformat: 'N',
      filtertype: 'number',
      aggregates: [
        {
          
          'T': function (aggregatedValue, currentValue) {
            
            aggregatedValue = aggregatedValue + currentValue
            
            return aggregatedValue
          },
        },
      ],
    },
    {
      text: 'Incorp.',
      dataField: 'tota_ingr',
      width: '120',
      align: 'center',
      cellsalign: 'center',
      cellsformat: 'N',
      filtertype: 'number',
      aggregates: [
        {
          
          'T': function (aggregatedValue, currentValue) {
            
            aggregatedValue = aggregatedValue + currentValue
            
            return aggregatedValue
          },
        },
      ],
    },
    {
      text: 'Reing.',
      dataField: 'tota_rein',
      width: '120',
      align: 'center',
      cellsalign: 'center',
      cellsformat: 'N',
      filtertype: 'number',
      aggregates: [
        {
          
          'T': function (aggregatedValue, currentValue) {
            
            aggregatedValue = aggregatedValue + currentValue
            
            return aggregatedValue
          },
        },
      ],
    },
    {
      text: 'Reco.',
      dataField: 'tota_reco',
      width: '120',
      align: 'center',
      cellsalign: 'center',
      cellsformat: 'N',
      filtertype: 'number',
      aggregates: [
        {
          
          'T': function (aggregatedValue, currentValue) {
            
            aggregatedValue = aggregatedValue + currentValue
            
            return aggregatedValue
          },
        },
      ],
    },
    {
      text: 'Egre.',
      dataField: 'tota_egre',
      width: '120',
      align: 'center',
      cellsalign: 'center',
      cellsformat: 'N',
      filtertype: 'number',
      aggregates: [
        {
          
          'T': function (aggregatedValue, currentValue) {
            
            aggregatedValue = aggregatedValue + currentValue
            
            return aggregatedValue
          },
        },
      ],
    },
    {
      text: 'Capi.',
      dataField: 'tota_capi',
      width: '120',
      align: 'center',
      cellsalign: 'center',
      cellsformat: 'N',
      filtertype: 'number',
      aggregates: [
        {
          
          'T': function (aggregatedValue, currentValue) {
            
            aggregatedValue = aggregatedValue + currentValue
            
            return aggregatedValue
          },
        },
      ],
    },
    {
      text: 'Act. fin.',
      dataField: 'acti_fina',
      width: '120',
      align: 'center',
      cellsalign: 'center',
      cellsformat: 'N',
      filtertype: 'number',
      aggregates: [
        {
          
          'T': function (aggregatedValue, currentValue) {
            
            aggregatedValue = aggregatedValue + currentValue
            
            return aggregatedValue
          },
        },
      ],
    },
    {
      text: 'Posi. rein.',
      dataField: 'posi_rein',
      width: '120',
      align: 'center',
      cellsalign: 'center',
      cellsformat: 'N',
      filtertype: 'number',
      aggregates: [
        {
          
          'T': function (aggregatedValue, currentValue) {
            
            aggregatedValue = aggregatedValue + currentValue
            
            return aggregatedValue
          },
        },
      ],
    },
    
    {
      text: 'Ret. peg21',
      dataField: 'rete_pe21',
      width: '120',
      align: 'center',
      cellsalign: 'center',
      cellsformat: 'N',
      filtertype: 'number',
      aggregates: [
        {
          
          'T': function (aggregatedValue, currentValue) {
            
            aggregatedValue = aggregatedValue + currentValue
            
            return aggregatedValue
          },
        },
      ],
    },
    {
      text: '% Ret. peg21',
      dataField: 'porc_re21',
      width: '120',
      align: 'center',
      cellsalign: 'center',
      cellsformat: 'D2',
      filtertype: 'number',
      aggregates: [
        {
          
          'T': function (aggregatedValue, currentValue, column, record) {
            
            if (record.visibleindex === 0) {
              numero = 0
              total = 0
            }
            numero += record.rete_pe21
            total += record.posi_eg21_ante
            sumaGlobal = 0
            
            if (parseInt(numero) > 0 && parseInt(total) > 0) {
              
              sumaGlobal = 100 * (parseInt(numero) / parseInt(total))
            }
            sumaGlobal = parseFloat(sumaGlobal).toFixed(2)
            
            return sumaGlobal
          },
        },
      ],
    },
    {
      text: 'Ret. peg42',
      dataField: 'rete_pe42',
      width: '120',
      align: 'center',
      cellsalign: 'center',
      cellsformat: 'N',
      filtertype: 'number',
      aggregates: [
        {
          
          'T': function (aggregatedValue, currentValue) {
            
            aggregatedValue = aggregatedValue + currentValue
            
            return aggregatedValue
          },
        },
      ],
    },
    {
      text: '% Ret. peg42',
      dataField: 'porc_re42',
      width: '120',
      align: 'center',
      cellsalign: 'center',
      cellsformat: 'D2',
      filtertype: 'number',
      aggregates: [
        {
          
          'T': function (aggregatedValue, currentValue, column, record) {
            
            if (record.visibleindex === 0) {
              numero = 0
              total = 0
            }
            numero += record.rete_pe42
            total += record.posi_eg42_ante
            sumaGlobal = 0
            
            if (parseInt(numero) > 0 && parseInt(total) > 0) {
              
              sumaGlobal = 100 * (parseInt(numero) / parseInt(total))
            }
            sumaGlobal = parseFloat(sumaGlobal).toFixed(2)
            
            return sumaGlobal
          },
        },
      ],
    },
    {
      text: 'Ret. peg63',
      dataField: 'rete_pe63',
      width: '120',
      align: 'center',
      cellsalign: 'center',
      cellsformat: 'N',
      filtertype: 'number',
      aggregates: [
        {
          'T': function (aggregatedValue, currentValue) {
            aggregatedValue = aggregatedValue + currentValue
            
            return aggregatedValue
          },
        },
      ],
    },
    {
      text: '% Ret. peg63',
      dataField: 'porc_re63',
      width: '120',
      align: 'center',
      cellsalign: 'center',
      cellsformat: 'D2',
      filtertype: 'number',
      aggregates: [
        {
          
          'T': function (aggregatedValue, currentValue, column, record) {
            
            if (record['uid'] === 0) {
              numero = 0
              total = 0
            }
            numero += record.rete_pe63
            total += record.posi_egre_ante
            sumaGlobal = 0
            
            if (parseInt(numero) > 0 && parseInt(total) > 0) {
              
              sumaGlobal = 100 * (parseInt(numero) / parseInt(total))
            }
            sumaGlobal = parseFloat(sumaGlobal).toFixed(2)
            
            return sumaGlobal
          },
        },
      ],
    },
    {
      text: '% Acti.',
      dataField: 'porc_acti',
      width: '120',
      align: 'center',
      cellsalign: 'center',
      cellsformat: 'D2',
      filtertype: 'number',
      aggregates: [
        {
          
          'T': function (aggregatedValue, currentValue, column, record) {
            
            if (record.visibleindex === 0) {
              sumaNumePediGlobal = 0
              sumaTotaIngrGlobal = 0
              sumaTotaReinGlobal = 0
              sumaActiInicGlobal = 0
            }
            sumaNumePediGlobal += record.nume_pedi
            sumaTotaIngrGlobal += record.tota_ingr
            sumaTotaReinGlobal += record.tota_rein
            sumaActiInicGlobal += record.acti_inic
            sumaGlobal = 0
            if (parseInt(sumaNumePediGlobal) - parseInt(sumaTotaIngrGlobal) - parseInt(sumaTotaReinGlobal) > 0 && parseInt(sumaActiInicGlobal) > 0) {
              
              sumaGlobal = 100 * ((parseInt(sumaNumePediGlobal) - parseInt(sumaTotaIngrGlobal) - parseInt(sumaTotaReinGlobal)) / parseInt(sumaActiInicGlobal))
            }
            sumaGlobal = parseFloat(sumaGlobal).toFixed(2)
            
            return sumaGlobal
          },
        },
      ],
    },
    {
      text: 'Pedi. reten.',
      dataField: 'pedi_rete',
      width: '120',
      align: 'center',
      cellsalign: 'center',
      cellsformat: 'N',
      filtertype: 'number',
      aggregates: [
        {
          
          'T': function (aggregatedValue, currentValue) {
            
            aggregatedValue = aggregatedValue + currentValue
            
            return aggregatedValue
          },
        },
      ],
    },
    
    {
      text: 'Pedi. total',
      dataField: 'nume_pedi',
      width: '120',
      align: 'center',
      cellsalign: 'center',
      cellsformat: 'N',
      filtertype: 'number',
      aggregates: [
        {
          
          'T': function (aggregatedValue, currentValue) {
            
            aggregatedValue = aggregatedValue + currentValue
            
            return aggregatedValue
          },
        },
      ],
    },
    {
      text: 'Puntos',
      dataField: 'tota_punt',
      width: '120',
      align: 'center',
      cellsalign: 'center',
      cellsformat: 'N',
      filtertype: 'number',
      aggregates: [
        {
          
          'T': function (aggregatedValue, currentValue) {
            
            aggregatedValue = aggregatedValue + currentValue
            
            return aggregatedValue
          },
        },
      ],
    },
    {
      text: 'Vta. Cata.',
      dataField: 'tota_cata_rece',
      width: '120',
      align: 'center',
      cellsalign: 'center',
      cellsformat: 'D2',
      filtertype: 'number',
      columngroup: 'vent_cata',
      aggregates: [
        {
          
          'T': function (aggregatedValue, currentValue) {
            
            aggregatedValue = aggregatedValue + currentValue
            
            return aggregatedValue
          },
        },
      ],
    },
    {
      text: 'PPP Cata.',
      dataField: 'pppp_cata_rece',
      width: '120',
      align: 'center',
      cellsalign: 'center',
      cellsformat: 'D2',
      filtertype: 'number',
      columngroup: 'vent_cata',
      aggregates: [
        {
          
          'T': function (aggregatedValue, currentValue, column, record) {
            
            if (record.visibleindex === 0) {
              numero = 0
              total = 0
            }
            numero += record.nume_pedi
            total += record.tota_cata_rece
            sumaGlobal = 0
            
            if (parseInt(numero) > 0 && parseInt(total) > 0) {
              
              sumaGlobal = parseFloat(total) / parseInt(numero)
            }
            sumaGlobal = parseFloat(sumaGlobal).toFixed(2)
            
            return sumaGlobal
          },
        },
      ],
    },
    {
      text: 'Vta. Rece.',
      dataField: 'vent_rece',
      width: '120',
      align: 'center',
      cellsalign: 'center',
      cellsformat: 'D2',
      filtertype: 'number',
      columngroup: 'vent_rece',
      aggregates: [
        {
          
          'T': function (aggregatedValue, currentValue) {
            
            aggregatedValue = aggregatedValue + currentValue
            
            return aggregatedValue
          },
        },
      ],
    },
    {
      text: 'PPP Rece.',
      dataField: 'pppp_rece',
      width: '120',
      align: 'center',
      cellsalign: 'center',
      cellsformat: 'D2',
      filtertype: 'number',
      columngroup: 'vent_rece',
      aggregates: [
        {
          
          'T': function (aggregatedValue, currentValue, column, record) {
            
            if (record.visibleindex === 0) {
              numero = 0
              total = 0
            }
            numero += record.nume_pedi
            total += record.vent_rece
            sumaGlobal = 0
            
            if (parseInt(numero) > 0 && parseInt(total) > 0) {
              
              sumaGlobal = parseFloat(total) / parseInt(numero)
            }
            sumaGlobal = parseFloat(sumaGlobal).toFixed(2)
            
            return sumaGlobal
          },
        },
      ],
    },
    {
      text: 'Vta. Linea',
      dataField: 'tota_line',
      width: '120',
      align: 'center',
      cellsalign: 'center',
      cellsformat: 'D2',
      filtertype: 'number',
      columngroup: 'vent_line',
      aggregates: [
        {
          
          'T': function (aggregatedValue, currentValue) {
            
            aggregatedValue = aggregatedValue + currentValue
            
            return aggregatedValue
          },
        },
      ],
    },
    {
      text: 'PPP Linea',
      dataField: 'tota_pedi',
      width: '120',
      align: 'center',
      cellsalign: 'center',
      cellsformat: 'D2',
      filtertype: 'number',
      columngroup: 'vent_line',
      aggregates: [
        {
          
          'T': function (aggregatedValue, currentValue, column, record) {
            
            if (record.visibleindex === 0) {
              numero = 0
              total = 0
            }
            numero += record.nume_pedi
            total += record.tota_line
            sumaGlobal = 0
            
            if (parseInt(numero) > 0 && parseInt(total) > 0) {
              
              sumaGlobal = parseFloat(total) / parseInt(numero)
            }
            sumaGlobal = parseFloat(sumaGlobal).toFixed(2)
            
            return sumaGlobal
          },
        },
      ],
    },

    {
      text: 'Vta. Fact.',
      dataField: 'tota_fact',
      width: '120',
      align: 'center',
      cellsalign: 'center',
      cellsformat: 'D2',
      columngroup: 'vent_fact',
      filtertype: 'number',
      aggregates: [
        {
          
          'T': function (aggregatedValue, currentValue) {
            
            aggregatedValue = aggregatedValue + currentValue
            
            return aggregatedValue
          },
        },
      ],
    },
    {
      text: 'PPP Fact.',
      dataField: 'pppp_fact',
      width: '120',
      align: 'center',
      cellsalign: 'center',
      cellsformat: 'D2',
      columngroup: 'vent_fact',
      filtertype: 'number',
      aggregates: [
        {
          
          'T': function (aggregatedValue, currentValue, column, record) {
            
            if (record.visibleindex === 0) {
              numero = 0
              total = 0
            }
            numero += record.nume_pedi
            total += record.tota_fact
            sumaGlobal = 0
            
            if (parseInt(numero) > 0 && parseInt(total) > 0) {
              
              sumaGlobal = parseFloat(total) / parseInt(numero)
            }
            sumaGlobal = parseFloat(sumaGlobal).toFixed(2)
            
            return sumaGlobal
          },
        },
      ],
    },
    {
      text: 'Faltante',
      dataField: 'tota_falt',
      width: '120',
      align: 'center',
      cellsalign: 'center',
      cellsformat: 'D2',
      columngroup: 'falt',
      filtertype: 'number',
      aggregates: [
        {
          
          'T': function (aggregatedValue, currentValue) {
            
            aggregatedValue = aggregatedValue + currentValue
            
            return aggregatedValue
          },
        },
      ],
    },
    {
      text: '% Faltante',
      dataField: 'porc_falt',
      width: '120',
      align: 'center',
      cellsalign: 'center',
      cellsformat: 'D2',
      columngroup: 'falt',
      filtertype: 'number',
      aggregates: [
        {
          
          'T': function (aggregatedValue, currentValue, column, record) {
            
            if (record.visibleindex === 0) {
              total = 0
              numero = 0
            }
            total += record.tota_falt
            numero += record.vent_rece
            sumaGlobal = 0
            
            if (parseInt(total) > 0 && parseInt(numero) > 0) {
              
              sumaGlobal = 100 * (parseFloat(total) / parseFloat(numero))
            }
            sumaGlobal = parseFloat(sumaGlobal).toFixed(2)
            
            return sumaGlobal
          },
        },
      ],
    },
    {
      text: 'Unid',
      dataField: 'tota_unid',
      width: '120',
      align: 'center',
      cellsalign: 'center',
      cellsformat: 'N',
      filtertype: 'number',
      columngroup: 'unid',
      aggregates: [
        {
          
          'T': function (aggregatedValue, currentValue) {
            
            aggregatedValue = aggregatedValue + currentValue
            
            return aggregatedValue
          },
        },
      ],
    },
    {
      text: 'UPP',
      dataField: 'tota_uppp',
      width: '120',
      align: 'center',
      cellsalign: 'center',
      cellsformat: 'D2',
      filtertype: 'number',
      columngroup: 'unid',
      aggregates: [
        {
          
          T: function (aggregatedValue, currentValue, column, record) {
            
            if (record.visibleindex === 0) {
              numero = 0
              total = 0
            }
            numero += record.nume_pedi
            total += record.tota_unid
            sumaGlobal = 0
            
            if (parseInt(numero) > 0 && parseInt(total) > 0) {
              
              sumaGlobal = parseInt(total) / parseInt(numero)
            }
            sumaGlobal = parseFloat(sumaGlobal).toFixed(2)
            
            return sumaGlobal
          },
        },
      ],
    },
    {
      text: `S/. Unid.`,
      dataField: 'mont_unid',
      width: '120',
      align: 'center',
      cellsalign: 'center',
      cellsformat: 'N',
      filtertype: 'number',
      columngroup: 'unid',
      aggregates: [
        {
          
          T: function (aggregatedValue, currentValue, column, record) {
            
            if (record.visibleindex === 0) {
              numero = 0
              total = 0
            }
            numero += record.tota_line
            total += record.tota_unid
            sumaGlobal = 0
            
            if (parseInt(numero) > 0 && parseInt(total) > 0) {
              
              sumaGlobal = parseFloat(numero) / parseInt(total)
            }
            
            sumaGlobal = Math.round(sumaGlobal)
            
            return sumaGlobal
          },
        },
      ],
    },
    {
      text: 'Peg21',
      dataField: 'posi_eg21',
      width: '120',
      align: 'center',
      cellsalign: 'center',
      cellsformat: 'N',
      filtertype: 'number',
      aggregates: [
        {
          
          'T': function (aggregatedValue, currentValue) {
            
            aggregatedValue = aggregatedValue + currentValue
            
            return aggregatedValue
          },
        },
      ],
    },
    {
      text: 'Peg42',
      dataField: 'posi_eg42',
      width: '120',
      align: 'center',
      cellsalign: 'center',
      cellsformat: 'N',
      filtertype: 'number',
      aggregates: [
        {
          
          'T': function (aggregatedValue, currentValue) {
            
            aggregatedValue = aggregatedValue + currentValue
            
            return aggregatedValue
          },
        },
      ],
    },
    {
      text: 'Peg63',
      dataField: 'posi_egre',
      width: '120',
      align: 'center',
      cellsalign: 'center',
      cellsformat: 'N',
      filtertype: 'number',
      aggregates: [
        {
          
          'T': function (aggregatedValue, currentValue) {
            
            aggregatedValue = aggregatedValue + currentValue
            
            return aggregatedValue
          },
        },
      ],
    },
  ]
})

const sourceConsolidado = ref({
  localdata: [],
  datafields: [
    { name: 'codi_area', type: 'string' },
    { name: 'codi_zona', type: 'string' },
    { name: 'codi_sect', type: 'string' },
    { name: 'acti_inic', type: 'number' },
    { name: 'acti_fina', type: 'number' },
    { name: 'tota_ingr', type: 'number' },
    { name: 'tota_rein', type: 'number' },
    { name: 'tota_egre', type: 'number' },
    { name: 'posi_egre', type: 'number' },
    { name: 'nume_pedi', type: 'number' },
    { name: 'tota_punt', type: 'number' },
    { name: 'pedi_rete', type: 'number' },
    { name: 'tota_line', type: 'number' },
    { name: 'tota_fact', type: 'number' },
    { name: 'tota_falt', type: 'number' },
    { name: 'tota_pedi', type: 'number' },
    { name: 'posi_rein', type: 'number' },
    { name: 'tota_capi', type: 'number' },
    { name: 'posi_eg21', type: 'number' },
    { name: 'posi_eg42', type: 'number' },
    { name: 'porc_acti', type: 'number' },
    { name: 'tota_reco', type: 'number' },
    { name: 'rete_pe21', type: 'number' },
    { name: 'rete_pe42', type: 'number' },
    { name: 'rete_pe63', type: 'number' },
    { name: 'porc_re21', type: 'number' },
    { name: 'porc_re42', type: 'number' },
    { name: 'porc_re63', type: 'number' },
    { name: 'posi_eg21_ante', type: 'number' },
    { name: 'posi_eg42_ante', type: 'number' },
    { name: 'posi_egre_ante', type: 'number' },
    { name: 'vent_rece', type: 'number' },
    { name: 'porc_falt', type: 'number' },
    { name: 'tota_unid', type: 'number' },
    { name: 'tota_uppp', type: 'number' },
    { name: 'mont_unid', type: 'number' },
    { name: 'pppp_fact', type: 'number' },
    { name: 'vent_publ', type: 'number' },
    { name: 'pppp_publ', type: 'number' },
    { name: 'pppp_rece', type: 'number' },
    { name: 'nomb_lide', type: 'string' },
    { name: 'tota_cata_rece', type: 'number' },
    { name: 'pppp_cata_rece', type: 'number' },
  ],
  datatype: 'json',
})

const adaptadorConsolidado = new jqx.dataAdapter(sourceConsolidado.value)
const refGridConsolidado = ref()

const columnas = computed(() => {
  return [
    {
      text: 'Zona',
      dataField: 'codi_zona',
      width: '65',
      align: 'center',
      cellsalign: 'center',
      pinned: (mobile.value)? false : true,
      filtertype: 'checkedlist',
      hidden: true,
    },
    {
      text: 'Sector',
      dataField: 'codi_sect',
      width: '65',
      align: 'center',
      cellsalign: 'center',
      pinned: (mobile.value)? false : true,
      filtertype: 'checkedlist',
    },
    {
      text: 'Nro ident.',
      dataField: 'nume_iden',
      width: '100',
      align: 'center',
      cellsalign: 'center',
      pinned: (mobile.value)? false : true,
    },
    {
      text: 'Nombre(s) y apellido(s)',
      dataField: 'nomb_clie',
      width: '320',
      align: 'center',
      cellsalign: 'left',
      pinned: (mobile.value)? false : true,
    },
    {
      text: 'Cumpleaños',
      dataField: 'fech_naci',
      width: '110',
      align: 'center',
      cellsalign: 'center',
      hidden: true,
    },
    {
      text: 'Distrito',
      dataField: 'nomb_barr',
      width: '150',
      align: 'center',
      cellsalign: 'left',
      filtertype: 'checkedlist',
    },
    {
      text: 'Dirección',
      dataField: 'dire_terc',
      width: '400',
      align: 'center',
      cellsalign: 'left',
    },
    {
      text: 'Teléfono 1',
      dataField: 'tele_ter1',
      width: '90',
      align: 'center',
      cellsalign: 'left',
    },
    {
      text: 'Teléfono 2',
      dataField: 'tele_ter2',
      width: '90',
      align: 'center',
      cellsalign: 'left',
    },
    {
      text: 'Status',
      dataField: 'tipo_clie',
      width: '130',
      align: 'center',
      cellsalign: 'left',
      filtertype: 'checkedlist',
    },
    {
      text: 'Cupo',
      dataField: 'cupo_cred',
      width: '90',
      align: 'center',
      cellsalign: 'center',
      cellsformat: 'D2',
      filtertype: 'number',
      hidden: true,
    },
    {
      text: 'Saldo',
      dataField: 'sald_docu',
      width: '90',
      align: 'center',
      cellsalign: 'center',
      cellsformat: 'D2',
      filtertype: 'number',
    },
    {
      text: 'Camp. ingr.',
      dataField: 'camp_ingr',
      width: '90',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'number',
      hidden: true,
    },
    {
      text: 'Ult. camp1',
      dataField: 'codi_camp_1',
      width: '90',
      align: 'center',
      cellsalign: 'center',
      cellclassname: 'bg-primary-light',
      filtertype: 'number',
    },
    {
      text: 'Ptos azzo. ult. camp1',
      dataField: 'tota_publ_1',
      width: '150',
      align: 'center',
      cellsalign: 'center',
      cellclassname: 'bg-primary-light',
      filtertype: 'number',
    },
    {
      text: 'Vta recep. ult. camp1',
      dataField: 'vent_line_1',
      width: '150',
      align: 'center',
      cellsalign: 'center',
      cellclassname: 'bg-primary-light',
      filtertype: 'number',
    },
    {
      text: 'Vta cata. ult. camp1',
      dataField: 'vent_cata_1',
      width: '150',
      align: 'center',
      cellsalign: 'center',
      cellclassname: 'bg-primary-light',
      filtertype: 'number',
    },
    {
      text: 'Fact. ult. camp1',
      dataField: 'tota_fact_1',
      width: '120',
      align: 'center',
      cellsalign: 'center',
      cellsformat: 'D2',
      cellclassname: 'bg-primary-light',
      filtertype: 'number',
      hidden: true,
    },
    {
      text: 'Devo. ult. camp1',
      dataField: 'tota_devo_1',
      width: '120',
      align: 'center',
      cellsalign: 'center',
      cellsformat: 'N',
      cellclassname: 'bg-primary-light',
      filtertype: 'number',
      hidden: true,
    },
    {
      text: 'Ult. camp2',
      dataField: 'codi_camp_2',
      width: '90',
      align: 'center',
      cellsalign: 'center',
      cellclassname: 'text-white bg-success-light',
      filtertype: 'number',
    },
    {
      text: 'Ptos azzo. ult. camp2',
      dataField: 'tota_publ_2',
      width: '150',
      align: 'center',
      cellsalign: 'center',
      cellclassname: 'text-white bg-success-light',
      filtertype: 'number',
    },
    {
      text: 'Vta recep. ult. camp2',
      dataField: 'vent_line_2',
      width: '150',
      align: 'center',
      cellsalign: 'center',
      cellclassname: 'bg-success-light text-white',
      filtertype: 'number',
    },
    {
      text: 'Vta cata. ult. camp2',
      dataField: 'vent_cata_2',
      width: '150',
      align: 'center',
      cellsalign: 'center',
      cellclassname: 'bg-success-light text-white',
      filtertype: 'number',
    },
    {
      text: 'Fact. ult. camp2',
      dataField: 'tota_fact_2',
      width: '120',
      align: 'center',
      cellsalign: 'center',
      cellsformat: 'D2',
      cellclassname: 'text-white bg-success-light',
      filtertype: 'number',
      hidden: true,
    },
    {
      text: 'Devo. ult. camp2',
      dataField: 'tota_devo_2',
      width: '120',
      align: 'center',
      cellsalign: 'center',
      cellsformat: 'N',
      cellclassname: 'text-white bg-success-light',
      filtertype: 'number',
      hidden: true,
    },
    {
      text: 'Ult. camp3',
      dataField: 'codi_camp_3',
      width: '90',
      align: 'center',
      cellsalign: 'center',
      cellclassname: 'text-secondary bg-info-light',
      filtertype: 'number',
      hidden: true,
    },
    {
      text: 'Ptos azzo. ult. camp3',
      dataField: 'tota_publ_3',
      width: '159',
      align: 'center',
      cellsalign: 'center',
      cellclassname: 'text-secondary bg-info-light',
      filtertype: 'number',
      hidden: true,
    },
    {
      text: 'Vta recep. ult. camp3',
      dataField: 'vent_line_3',
      width: '159',
      align: 'center',
      cellsalign: 'center',
      cellclassname: 'text-secondary bg-info-light',
      filtertype: 'number',
      hidden: true,
    },
    {
      text: 'Vta cata. ult. camp3',
      dataField: 'vent_cata_3',
      width: '159',
      align: 'center',
      cellsalign: 'center',
      cellclassname: 'text-secondary bg-info-light',
      filtertype: 'number',
      hidden: true,
    },
    
    {
      text: 'Fact. ult. camp3',
      dataField: 'tota_fact_3',
      width: '120',
      align: 'center',
      cellsalign: 'center',
      cellsformat: 'D2',
      cellclassname: 'text-secondary bg-info-light',
      filtertype: 'number',
      hidden: true,
    },
    {
      text: 'Devo. ult. camp3',
      dataField: 'tota_devo_3',
      width: '120',
      align: 'center',
      cellsalign: 'center',
      cellsformat: 'N',
      cellclassname: 'text-secondary bg-info-light',
      filtertype: 'number',
      hidden: true,
    },
    {
      text: 'Ult. camp4',
      dataField: 'codi_camp_4',
      width: '90',
      align: 'center',
      cellsalign: 'center',
      cellclassname: 'text-white bg-error-light',
      filtertype: 'number',
      hidden: true,
    },
    {
      text: 'Ptos azzo. ult. camp4',
      dataField: 'tota_publ_4',
      width: '150',
      align: 'center',
      cellsalign: 'center',
      cellclassname: 'text-white bg-error-light',
      filtertype: 'number',
      hidden: true,
    },
    {
      text: 'Vta. linea rece. ult. camp4',
      dataField: 'vent_line_4',
      width: '150',
      align: 'center',
      cellsalign: 'center',
      cellclassname: 'text-white bg-error-light',
      filtertype: 'number',
      hidden: true,
    },
    {
      text: 'Vta. cata. rece. ult. camp4',
      dataField: 'vent_cata_4',
      width: '150',
      align: 'center',
      cellsalign: 'center',
      cellclassname: 'text-white bg-error-light',
      filtertype: 'number',
      hidden: true,
    },
    {
      text: 'Fact. ult. camp4',
      dataField: 'tota_fact_4',
      width: '120',
      align: 'center',
      cellsalign: 'center',
      cellsformat: 'D2',
      cellclassname: 'text-white bg-error-light',
      filtertype: 'number',
      hidden: true,
    },
    {
      text: 'Devo. ult. camp4',
      dataField: 'tota_devo_4',
      width: '120',
      align: 'center',
      cellsalign: 'center',
      cellsformat: 'N',
      cellclassname: 'text-white bg-error-light',
      filtertype: 'number',
      hidden: true,
    },
    {
      text: 'Estado pedido',
      dataField: 'esta_pedi',
      width: '150',
      align: 'center',
      cellsalign: 'left',
      filtertype: 'checkedlist',
      hidden: true,
    },
    {
      text: 'Nivel Gemma',
      dataField: 'nive_gemm',
      width: '80',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist',
    },
    {
      text: 'Saldo Gemma',
      dataField: 'sald_gemm',
      width: '80',
      align: 'center',
      cellsalign: 'center',
    },
    {
      text: 'Creciendo con azzorti',
      dataField: 'desc_segm',
      width: '150',
      align: 'center',
      cellsalign: 'left',
      filtertype: 'checkedlist',
    },
  ]
})

const sourceGlobal = ref({
  localdata: [],
  datafields: [
    { name: 'esta_dire', type: 'string' },
    { name: 'codi_area', type: 'string' },
    { name: 'codi_zona', type: 'string' },
    { name: 'codi_sect', type: 'string' },
    { name: 'acti_inic', type: 'number' },
    { name: 'acti_fina', type: 'number' },
    { name: 'tota_ingr', type: 'number' },
    { name: 'tota_rein', type: 'number' },
    { name: 'tota_egre', type: 'number' },
    { name: 'codi_terc', type: 'string' },
    { name: 'nume_iden', type: 'string' },
    { name: 'nomb_clie', type: 'string' },
    { name: 'codi_camp_1', type: 'number' },
    { name: 'tota_publ_1', type: 'number' },
    { name: 'tota_devo_1', type: 'number' },
    { name: 'tota_orde_1', type: 'number' },
    { name: 'tota_fact_1', type: 'number' },
    { name: 'vent_line_1', type: 'number' },
    { name: 'vent_cata_1', type: 'number' },
    { name: 'codi_camp_2', type: 'number' },
    { name: 'tota_publ_2', type: 'number' },
    { name: 'vent_line_2', type: 'number' }, 
    { name: 'vent_cata_2', type: 'number' },
    { name: 'tota_devo_2', type: 'number' },
    { name: 'tota_orde_2', type: 'number' },
    { name: 'tota_fact_2', type: 'number' },
    { name: 'codi_camp_3', type: 'number' },
    { name: 'tota_publ_3', type: 'number' },
    { name: 'vent_line_3', type: 'number' },
    { name: 'vent_cata_3', type: 'number' },
    { name: 'tota_devo_3', type: 'number' },
    { name: 'tota_orde_3', type: 'number' },
    { name: 'tota_fact_3', type: 'number' },
    { name: 'codi_camp_4', type: 'number' },
    { name: 'tota_publ_4', type: 'number' },
    { name: 'vent_line_4', type: 'number' },
    { name: 'vent_cata_4', type: 'number' },
    { name: 'tota_devo_4', type: 'number' },
    { name: 'tota_orde_4', type: 'number' },
    { name: 'tota_fact_4', type: 'number' },
    { name: 'nomb_barr', type: 'string' },
    { name: 'dire_terc', type: 'string' },
    { name: 'tele_ter1', type: 'string' },
    { name: 'tele_ter2', type: 'string' },
    { name: 'sald_docu', type: 'number' },
    { name: 'tipo_clie', type: 'string' },
    { name: 'fech_naci', type: 'string' },
    { name: 'camp_ingr', type: 'number' },
    { name: 'nomb_ciud', type: 'string' },
    { name: 'nomb_dpto', type: 'string' },
    { name: 'cupo_cred', type: 'number' },
    { name: 'esta_pedi', type: 'string' },
    { name: 'sald_gemm', type: 'number' },
    { name: 'nive_gemm', type: 'string' },
    { name: 'desc_segm', type: 'string' },
  ],
  datatype: 'json',
})

const adaptadorGlobal = new jqx.dataAdapter(sourceGlobal.value)
const refGridGlobal = ref()

const localization = appStore.localization

const sourceLista = ref([
  {
    label: 'Cumpleaños',
    value: 'fech_naci',
    checked: false,
  },
  {
    label: 'Distrito',
    value: 'nomb_barr',
    checked: true,
  },
  {
    label: 'Dirección',
    value: 'dire_terc',
    checked: true,
  },
  {
    label: 'Teléfono 1',
    value: 'tele_ter1',
    checked: true,
  },
  {
    label: 'Teléfono 2',
    value: 'tele_ter2',
    checked: true,
  },
  {
    label: 'Cupo',
    value: 'cupo_cred',
    checked: false,
  },
  {
    label: 'Saldo',
    value: 'sald_docu',
    checked: true,
  },
  {
    label: 'Camp. ingr.',
    value: 'camp_ingr',
    checked: false,
  },
  {
    label: 'Ult. camp1',
    value: 'codi_camp_1',
    checked: true,
  },
  {
    label: 'Ptos azzo. ult. camp1',
    value: 'tota_publ_1',
    checked: true,
  },
  {
    label: 'Vta recep. ult. camp1',
    value: 'vent_line_1',
    checked: true,
  },
  {
    label: 'Vta cata. ult. camp1',
    value: 'vent_cata_1',
    checked: true,
  },
  {
    label: 'Fact. ult. camp1',
    value: 'tota_fact_1',
    checked: false,
  },
  {
    label: 'Devo. ult. camp1',
    value: 'tota_devo_1',
    checked: false,
  },
  {
    label: 'Ult. camp2',
    value: 'codi_camp_2',
    checked: true,
  },
  {
    label: 'Ptos azzo. ult. camp2',
    value: 'tota_publ_2',
    checked: true,
  },
  {
    label: 'Vta recep. ult. camp2',
    value: 'vent_line_2',
    checked: true,
  },
  {
    label: 'Vta cata. ult. camp2',
    value: 'vent_cata_2',
    checked: true,
  },
  {
    label: 'Fact. ult. camp2',
    value: 'tota_fact_2',
    checked: false,
  },
  {
    label: 'Devo. ult. camp2',
    value: 'tota_devo_2',
    checked: false,
  },
  {
    label: 'Ult. camp3',
    value: 'codi_camp_3',
    checked: false,
  },
  {
    label: 'Ptos azzo. ult. camp3',
    value: 'tota_publ_3',
    checked: false,
  },
  {
    label: 'Vta recep. ult. camp3',
    value: 'vent_line_3',
    checked: false,
  },
  {
    label: 'Vta cata. ult. camp3',
    value: 'vent_cata_3',
    checked: false,
  },
  {
    label: 'Fact. ult. camp3',
    value: 'tota_fact_3',
    checked: false,
  },
  {
    label: 'Devo. ult. camp3',
    value: 'tota_devo_3',
    checked: false,
  },
  {
    label: 'Ult. camp4',
    value: 'codi_camp_4',
    checked: false,
  },
  {
    label: 'Ptos azzo. ult. camp4',
    value: 'tota_publ_4',
    checked: false,
  },
  {
    label: 'Vta. linea rece. ult. camp4',
    value: 'vent_line_4',
    checked: false,
  },
  {
    label: 'Vta. cata. rece. ult. camp4',
    value: 'vent_cata_4',
    checked: false,
  },
  {
    label: 'Fact. ult. camp4',
    value: 'tota_fact_4',
    checked: false,
  },
  {
    label: 'Devo. ult. camp4',
    value: 'tota_devo_4',
    checked: false,
  },
  {
    label: 'Estado pedido',
    value: 'esta_pedi',
    checked: false,
  },
  {
    label: 'Nivel Gemma',
    value: 'nive_gemm',
    checked: true,
  },
  {
    label: 'Saldo Gemma',
    value: 'sald_gemm',
    checked: true,
  },
  {
    label: 'Creciendo con azzorti',
    value: 'desc_segm',
    checked: true,
  },
])

const refListGlobal = ref()

onMounted(async () => {
  await obtenerCampana()
  await obtenerZona()
})


const obtenerCampana = async () => {
  try {
    appStore.mensaje('Obteniendo campaña')
    appStore.loading(true)


    const { data } = await $api(`/api/comun/v1/campanas`, {
      method: "GET",
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
      method: "GET",
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

    sourceConsolidado.value.localdata = []
    refGridConsolidado.value.updatebounddata('cells')

    sourceGlobal.value.localdata =  []
    refGridGlobal.value.updatebounddata('cells')

    const { data } = await $api(`/api/sami/v1/reportes/listado-asesora`, {
      method: "GET",
      query: {
        campana: (formulario.value.campana === null) ? '' : formulario.value.campana,
        zona: (formulario.value.zona === null) ? '' : formulario.value.zona,
      },
    })

    sourceConsolidado.value.localdata =  data.data_glob
    refGridConsolidado.value.updatebounddata('cells')
    refGridConsolidado.value.refreshfilterrow()

    sourceGlobal.value.localdata =  data.data_deta
    refGridGlobal.value.updatebounddata('cells')
    refGridGlobal.value.refreshfilterrow()
    
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

  sourceConsolidado.value.localdata = []
  refGridConsolidado.value.updatebounddata('cells')
  refGridConsolidado.value.refreshfilterrow()

  sourceGlobal.value.localdata = []
  refGridGlobal.value.updatebounddata('cells')
  refGridGlobal.value.refreshfilterrow()
}

const onExcel = async tipo => {
  const dataInfoGlob = refGridGlobal.value.getdatainformation()
  const dataRowsGlob = dataInfoGlob.rowscount

  if(dataRowsGlob == 0 ) {
    appStore.mensajeSnackbar('No tiene información listado de asesoras por exportar.')
    appStore.color("error")
    appStore.snackbar(true)
  } else {
    try {
      appStore.mensaje('Generando archivo')
      appStore.loading(true)

      const { data } = await $api(`/api/sami/v1/reportes/listado-asesora/excel`, {
        method: "POST",
        body: {
          columnas: sourceLista.value.filter(item => item.checked),
          tipo: tipo,
          columnasConsolidado: headersConsolidado.value,
          data_cons: JSON.stringify(refGridConsolidado.value.exportdata('xml')),
          data_deta: JSON.stringify(refGridGlobal.value.exportdata('xml')),
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

const onPdf = async tipo => {
  const dataInfoGlob = refGridGlobal.value.getdatainformation()
  const dataRowsGlob = dataInfoGlob.rowscount

  if(dataRowsGlob == 0 ) {
    appStore.mensajeSnackbar('No tiene información listado de asesoras por exportar.')
    appStore.color("error")
    appStore.snackbar(true)
  } else {
    try {
      appStore.mensaje('Generando archivo')
      appStore.loading(true)

      const { data } = await $api(`/api/sami/v1/reportes/listado-asesora/pdf`, {
        method: "post",
        body: {
          columnas: sourceLista.value.filter(item => item.checked),
          tipo: tipo,
          data_cons: JSON.stringify(refGridConsolidado.value.exportdata('xml', null, false, null, true)),
          data_deta: JSON.stringify(refGridGlobal.value.exportdata('xml', null, false, null, true)),
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

const onSeleccionar = event => {
  refGridGlobal.value.beginupdate()
  if (event.args.checked) {
    sourceLista.value[event.args.item.index].checked = true
    refGridGlobal.value.showcolumn(event.args.value)
  } else {
    sourceLista.value[event.args.item.index].checked = false
    refGridGlobal.value.hidecolumn(event.args.value)
  }
  refGridGlobal.value.endupdate()
}
</script>

<template>
  <div>
    <AppPlantilla>
      <template #botones>
        <GenerarBoton @procesar="onGenerar" />
        <VMenu>
          <template #activator="{ props }">
            <VBtn
              :block="mobile"
              color="primary"
              v-bind="props"
            >
              <VIcon
                start
                icon="tabler-file-arrow-right"
              />
              PDF
            </VBtn>
          </template>

          <VList>
            <VListItem @click="onPdf('1')">
              <template #prepend>
                <VIcon
                  class="me-2"
                  icon="tabler-file"
                  size="22"
                />
              </template>
              <VTooltip
                activator="parent"
                location="start"
              >
                <ol class="mx-6 my-2">
                  <li>Incorporación</li>
                  <li>Reincorporación</li>
                  <li>Consecutiva</li>
                  <li>Consecutiva 2do pedido</li>
                  <li>Consecutiva 3er pedido</li>
                  <li>Consecutiva 4to pedido</li>

                  <li>Ret. Peg21</li>
                  <li>Ret. Peg42</li>
                  <li>Ret. Peg63</li>
                  <li>Reingreso</li>
                 
                  <li>Peg21</li>
                  <li>Peg42</li>
                  <li>Peg63</li>
                  <li>
                    Posible Reingreso
                  </li>
                  <li>
                    Posible Reincorporación 
                  </li>
                </ol>
              </VTooltip>
              <VListItemTitle>PDF 1</VListItemTitle>
            </VListItem>
            <VListItem @click="onPdf('2')">
              <template #prepend>
                <VIcon
                  class="me-2"
                  icon="tabler-file"
                  size="22"
                />
              </template>

              <VTooltip
                activator="parent"
                location="start"
              >
                <ol class="mx-6 my-2">
                  <li>Incorporación</li>
                  <li>Reincorporación</li>
                  <li>Consecutiva</li>
                  <li>Consecutiva 2do pedido</li>
                  <li>Consecutiva 3er pedido</li>
                  <li>Consecutiva 4to pedido</li>
                  <li>Ret. Peg21</li>
                  <li>Ret. Peg42</li>
                  <li>Ret. Peg63</li>                  
                  <li>Reingreso</li>
                  <li>Peg21</li>
                  <li>Peg42</li>
                  <li>Peg63</li>
                  <li>Posible Reingreso</li>
                  <li>Posible Reincorporación &lt;= S/. 25.00</li>
                </ol>
              </VTooltip>
              <VListItemTitle>PDF 2</VListItemTitle>
            </VListItem>
            <VListItem @click="onPdf('3')">
              <template #prepend>
                <VIcon
                  class="me-2"
                  icon="tabler-file"
                  size="22"
                />
              </template>

              <VTooltip
                activator="parent"
                location="start"
              >
                <ol class="mx-6 my-2">
                  <li>Incorporación</li>
                  <li>Reincorporación</li>
                  <li>Consecutiva</li>
                  <li>Consecutiva 2do pedido</li>
                  <li>Consecutiva 3er pedido</li>
                  <li>Consecutiva 4to pedido</li>
                  <li>Ret. Peg21</li>
                  <li>Ret. Peg42</li>
                  <li>Ret. Peg63</li>
                  <li>Reingreso</li>                 
                  <li>Peg21</li>
                  <li>Peg42</li>
                  <li>Peg63</li>
                  <li>Posible Reingreso &lt;= S/. 25.00</li>
                  <li>Posible Reincorporación &lt;= S/. 25.00</li>
                </ol>
              </VTooltip>
              <VListItemTitle>PDF 3</VListItemTitle>
            </VListItem>
            <VListItem @click="onPdf('4')">
              <template #prepend>
                <VIcon
                  class="me-2"
                  icon="tabler-file"
                  size="22"
                />
              </template>

              <VTooltip
                activator="parent"
                location="start"
              >
                <ol class="mx-6 my-2">
                  <li>Consecutiva</li>
                  <li>Ret. Peg21</li>
                  <li>Ret. Peg42</li>
                  <li>Ret. Peg63</li>
                  <li>Reingreso</li>
                  <li>Incorporación</li>
                  <li>Reincorporación</li>
                  <li>Consecutiva 2do pedido</li>
                  <li>Consecutiva 3er pedido</li>
                  <li>Consecutiva 4to pedido</li>
                  <li>Peg21</li>
                  <li>Peg42</li>
                  <li>Peg63</li>
                  <li>Posible Reingreso</li>
                  <li>Posible Reincorporación &lt;= S/. 25.00</li>
                </ol>
              </VTooltip>
              <VListItemTitle>PDF 4</VListItemTitle>
            </VListItem>
          </VList>
        </VMenu>
        <VMenu>
          <template #activator="{ props }">
            <VBtn
              :block="mobile"
              color="primary"
              v-bind="props"
            >
              <VIcon
                start
                icon="tabler-file-arrow-right"
              />
              EXCEL
            </VBtn>
          </template>

          <VList>
            <VListItem @click="onExcel('consolidado')">
              <template #prepend>
                <VIcon
                  class="me-2"
                  icon="tabler-file"
                  size="22"
                />
              </template>

              <VListItemTitle>CONSOLIDADO</VListItemTitle>
            </VListItem>
            <VListItem @click="onExcel('total')">
              <template #prepend>
                <VIcon
                  class="me-2"
                  icon="tabler-file"
                  size="22"
                />
              </template>
              <VListItemTitle>TOTAL</VListItemTitle>
            </VListItem>
          </VList>
        </VMenu>
        <LimpiarBoton @procesar="onLimpiar" />
      </template>
      <template #contenido>
        <VRow>
          <VCol cols="12">
            <VCard title="Buscar asesoras">
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
            <VCard title="Lista consolidado">
              <VCardText>
                <JqxGrid
                  ref="refGridConsolidado"
                  theme="material"
                  width="100%"
                  :localization="localization"
                  :height="350"
                  :columns="columnasConsolidado"
                  :source="adaptadorConsolidado"
                  :columngroups="columnsGroupConsolidado"
                  columnsresize
                  columnsautoresize
                  enableanimations
                  sortable
                  sortmode="many"
                  filterable
                  :altrows="false"
                  :showemptyrow="false"
                  columnsreorder
                  selectionmode="singlecell"
                  scrollmode="logical"
                  showfilterrow
                  :columnsmenu="false"
                  :editable="false"
                  showstatusbar
                  showaggregates
                />
              </VCardText>
            </VCard>
          </VCol>
          <VCol cols="12">
            <VCard title="Lista de asesoras">
              <template #append>
                <IconBtn @click="isOpen=true">
                  <VIcon icon="tabler-menu" />
                </IconBtn>
              </template>
              <VCardText>
                <JqxGrid
                  ref="refGridGlobal"
                  theme="material"
                  width="100%"
                  :localization="localization"
                  :height="450"
                  :columns="columnas"
                  :source="adaptadorGlobal"
                  columnsresize
                  columnsautoresize
                  enableanimations
                  sortable
                  sortmode="many"
                  filterable
                  :altrows="false"
                  :showemptyrow="false"
                  columnsreorder
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
    <VDialog
      :fullscreen="(mobile) ? true : false"
      :max-width="(mobile) ? undefined : 450"
      persistent
      :model-value="isOpen"
    >
      <VCard color="background">
        <VToolbar color="primary">
          <VBtn
            v-if="mobile"
            icon
            color="default"
            :rounded="false"
            @click="isOpen=false"
          >
            <VIcon icon="tabler-x" />
          </VBtn>
          <VToolbarTitle>
            Lista de columnas
          </VToolbarTitle>
          <VSpacer />
          <VToolbarItems>
            <VBtn
              v-if="!mobile"
              icon
              @click="isOpen=false"
            >
              <VIcon icon="tabler-x" />
            </VBtn>
          </VToolbarItems>
        </VToolbar>
        <JqxListBox
          ref="refListGlobal"
          checkboxes
          theme="material"
          :source="sourceLista"
          width="100%"
          :height="400"
          columnsresize
          columnsautoresize
          @check-change="onSeleccionar($event)"
        />
      </VCard>
    </VDialog>
  </div>
</template>
