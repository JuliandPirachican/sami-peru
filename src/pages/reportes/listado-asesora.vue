<!-- eslint-disable camelcase -->
<style >

 

</style>

<script setup>
import { useAppStore } from '@/stores/app';
import { $api, $base } from '@/utils/api';
import { EncryptStorage } from 'encrypt-storage';
import JqxGrid from 'jqwidgets-scripts/jqwidgets-vue3/vue_jqxgrid.vue';
import JqxListBox from 'jqwidgets-scripts/jqwidgets-vue3/vue_jqxlistbox.vue';


import { useDisplay } from 'vuetify';



definePage({
  meta: {
    action: 'colombia/repo_come_list_ases',
    subject: 'colombia/repo_come_list_ases',
  },
})

const { mobile } = useDisplay()

const encryptStorage = new EncryptStorage('AZZORTI-SAMI', {
  storageType: 'localStorage',
})

const userData = encryptStorage.getItem('userData')
const appStore = useAppStore();
const refGridGlobal=ref();
const refGridDetalle=ref()

const rowsPerPage = ref(100)
const currentPage = ref(1)

const formulario = ref({
  campana: null,
  zona: null,
})

/**
 * Variables Globales de suma de porcentajes
 */
/** Rete pe 21, 42 y 63 **/
const sum_posi_eg21_ante=ref({});
const sum_rete_pe21=ref({});
const sum_posi_eg42_ante=ref({});
const sum_rete_pe42=ref({});
const sum_posi_eg63_ante=ref({});
const sum_rete_pe63=ref({});

/**porc_acti **/
const sum_tota_acti=ref({});
const sum_tota_pedi=ref({});
const sum_tota_ingr=ref({});
const sum_tota_rein=ref({});

/**ppp rece **/
const sum_tota_rece=ref({});

/** ppp fact **/
const sum_tota_fact=ref({});

/** ppp line **/
const sum_tota_line=ref({});

/** Upp **/
const sum_tota_unid=ref({});



const headersGlobal = computed(() => {
  return [
    {
      text: 'Region',
      dataField: 'codi_area',
      width: '150',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist',
      pinned: true
    },
    {
      text: 'Zona',
      dataField: 'codi_zona',
      width: '150',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist',
      pinned: true
    },
    {
      text: 'Codigo Lider',
      dataField: 'codi_sect',
      width: '150',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist',
      pinned: true
    },
    {
      text: 'Nombre Lider',
      dataField: 'nomb_lide',
      width: '150',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist',
      pinned: true
    },
    {
      text: 'Act. Inic.',
      dataField: 'acti_inic',
      width: '150',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist',
      aggregates: ['sum'],
      aggregatesrenderer: function (aggregates) {
          return  (aggregates['sum']!=undefined) ?  "<div >"+'T:'+aggregates['sum']+"</div>":"<div >"+'T:' +"0"+"</div>";
      }
    },
    {
      text: 'Incorp.',
      dataField: 'tota_ingr',
      width: '170',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist', 
      aggregates: ['sum'],
      aggregatesrenderer: function (aggregates) {
          return  (aggregates['sum']!=undefined) ?  "<div >"+'T:'+aggregates['sum']+"</div>":"<div >"+'T:' +"0"+"</div>";
      }
    },
    {
      text: 'Reing.',
      dataField: 'tota_rein',
      width: '250',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist',
      aggregates: ['sum'],
      aggregatesrenderer: function (aggregates) {
          return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
      }
    },
    {
      text: 'Reco.',
      dataField: 'tota_reco',
      width: '180',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist',
      aggregates: ['sum'],
      // hidden: true,
      aggregatesrenderer: function (aggregates) {
          return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
      }
    },
    {
      text: 'Egre.',
      dataField: 'tota_egre',
      width: '150',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist',
      aggregates: ['sum'],
      aggregatesrenderer: function (aggregates) {
          return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
      }
    },
    {
      text: 'Capi.',
      dataField: 'tota_capi',
      width: '150',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist',
      aggregates: ['sum'],
      aggregatesrenderer: function (aggregates) {
          return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
      }
    },
    {
      text: 'Act. Fin.',
      dataField: 'acti_fina',
      width: '150',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist',
      aggregates: ['sum'],
      aggregatesrenderer: function (aggregates) {
          return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
      }
    },
    {
      text: 'Posi. Rein',
      dataField: 'posi_rein',
      width: '150',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist',
      aggregates: ['sum'],
      aggregatesrenderer: function (aggregates) {
          return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
      }
    },
    {
      text: 'Rete. PEG21',
      dataField: 'rete_pe21',
      width: '150',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist',
      aggregates: ['sum'],
      aggregatesrenderer: function (aggregates) {
          return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
      }
    },
    {
      text: '% Rete PEG21',
      dataField: 'porc_re21',
      width: '150',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist',
      aggregates: ['avg'],
      aggregatesrenderer: function (aggregates) {
          let tota_porc_re21=(sum_posi_eg21_ante.value>0 &&  sum_rete_pe21.value>0) ? sum_rete_pe21.value/sum_posi_eg21_ante.value:0;
          return  (tota_porc_re21>0) ?  'T:'+(tota_porc_re21*100).toFixed(2)+'%':'T:' +0;
      }
    },
    {
      text: 'Rete. PEG42',
      dataField: 'rete_pe42',
      width: '150',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist',
      aggregates: ['sum'],
      aggregatesrenderer: function (aggregates) {
          return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
      }
    },
    {
      text: '% Rete PEG42',
      dataField: 'porc_re42',
      width: '150',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist',
      aggregates: ['avg'],

      aggregatesrenderer: function (aggregates) {
          let tota_porc_re42=(sum_posi_eg42_ante.value>0 &&  sum_rete_pe42.value>0) ? sum_rete_pe42.value/sum_posi_eg42_ante.value:0;
          return  (tota_porc_re42>0) ?  'T:'+(tota_porc_re42*100).toFixed(2)+'%':'T:' +0;
      }
    },
    {
      text: 'Rete. PEG63',
      dataField: 'rete_pe63',
      width: '150',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist',
      aggregates: ['sum'],
      aggregatesrenderer: function (aggregates) {
          return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
      }
    },
    {
      text: '% Rete PEG63',
      dataField: 'porc_re63',
      width: '150',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist',
      aggregates: ['avg'],

      aggregatesrenderer: function (aggregates) {
          let tota_porc_re63=(sum_posi_eg63_ante.value>0 &&  sum_rete_pe63.value>0) ? sum_rete_pe63.value/sum_posi_eg63_ante.value:0;
          return  (tota_porc_re63>0) ?  'T:'+(tota_porc_re63*100).toFixed(2)+'%':'T:' +0;
      }
    },
    {
      text: '% Acti.',
      dataField: 'porc_acti',
      width: '150',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist',
      aggregates: ['avg'],
      aggregatesrenderer: function (aggregates) {
          let tota_porc_acti=(sum_tota_acti.value>0 &&  sum_tota_ingr.value>0 &&  sum_tota_rein.value>0 &&  sum_tota_pedi.value>0) ? (sum_tota_pedi.value- sum_tota_ingr.value-sum_tota_rein.value)/sum_tota_acti.value:0;
          return  (tota_porc_acti>0) ?  'T:'+(tota_porc_acti*100).toFixed(2)+'%':'T:' +0;
      }
    },
    {
      text: 'Pedi. Reten.',
      dataField: 'pedi_rete',
      width: '150',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist',
      aggregates: ['sum'],
      hidden:true,
      aggregatesrenderer: function (aggregates) {
          return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
      }
    },
    {
      text: 'Pedi. Total',
      dataField: 'nume_pedi',
      width: '150',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist',
      aggregates: ['sum'],
      aggregatesrenderer: function (aggregates) {
          return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
      }
    },
    // {
    //   text: 'Vta. Publ',
    //   dataField: 'vent_publ',
    //   width: '150',
    //   align: 'center',
    //   cellsalign: 'center',
    //   filtertype: 'checkedlist'
    // },
    // {
    //   text: 'Ppp Publ.',
    //   dataField: 'pppp_publ',
    //   width: '150',
    //   align: 'center',
    //   cellsalign: 'center',
    //   filtertype: 'checkedlist'
    // },
    {
      text: 'Vta. Rece.',
      dataField: 'vent_rece',
      width: '150',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist',
      columngroup:"vent_recep",
      aggregates: ['sum'],
      aggregatesrenderer: function (aggregates) {
          return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
      }
    },
    {
      text: 'Ppp Rece.',
      dataField: 'pppp_rece',
      width: '150',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist',
      columngroup:"vent_recep",
      aggregates: ['sum'],
      aggregatesrenderer: function (aggregates) {
        // sum_tota_pedi.value sum_tota_rece
        let tota_ppp_rece= (sum_tota_pedi.value>0 && sum_tota_rece.value>0) ? (sum_tota_rece.value/sum_tota_pedi.value):0;
        return  (tota_ppp_rece>0) ?  'T:'+tota_ppp_rece.toFixed(2):'T:' +0;
      }
    },
    {
      text: 'Vta. Linea',
      dataField: 'tota_line',
      width: '150',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist',
      columngroup: 'vent_line',
      aggregates: ['sum'],
      aggregatesrenderer: function (aggregates) {
          return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
      }
    },
    {
      text: 'Ppp Linea',
      dataField: 'tota_pedi',
      width: '150',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist',
      columngroup: 'vent_line',
      aggregates: ['sum'],
      aggregatesrenderer: function (aggregates) {
        // sum_tota_pedi.value sum_tota_rece
        let tota_ppp_line= (sum_tota_pedi.value>0 && sum_tota_line.value>0) ? (sum_tota_line.value/sum_tota_pedi.value):0;
        return  (tota_ppp_line>0) ?  'T:'+tota_ppp_line.toFixed(2):'T:' +0;
      }
    },
    {
      text: 'Vta. Fact',
      dataField: 'tota_fact',
      width: '150',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist',
      columngroup:"vent_fact",
      aggregates: ['sum'],
      aggregatesrenderer: function (aggregates) {
          return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
      }
    },
    {
      text: 'Ppp Fact',
      dataField: 'pppp_fact',
      width: '150',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist',
      columngroup:"vent_fact",
      aggregates: ['sum'],
      aggregatesrenderer: function (aggregates) {
        // sum_tota_pedi.value sum_tota_rece
        let tota_ppp_fact= (sum_tota_fact.value>0 && sum_tota_rece.value>0) ? (sum_tota_fact.value/sum_tota_pedi.value):0;
        return  (tota_ppp_fact>0) ?  'T:'+tota_ppp_fact.toFixed(2):'T:' +0;
      }
    },
    {
      text: 'Faltante',
      dataField: 'tota_falt',
      width: '150',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist',
      columngroup:"falt",
      aggregates: ['sum'],
      aggregatesrenderer: function (aggregates) {
          return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
      }
    },
    {
      text: '% Faltante',
      dataField: 'porc_falt',
      width: '150',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist',
      columngroup:"falt",
      aggregates: ['avg'],
      aggregatesrenderer: function (aggregates) {
          return  (aggregates['avg']!=undefined) ?  'T:'+aggregates['avg'].toFixed(2)+'%':'T:' +0;
      }
    },

    {
      text: 'Unid.',
      dataField: 'tota_unid',
      width: '150',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist',
      columngroup:"unid",
      aggregates: ['sum'],
      aggregatesrenderer: function (aggregates) {
          return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
      }
    },
    {
      text: 'UPP',
      dataField: 'tota_uppp',
      width: '150',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist',
      columngroup:"unid",
      aggregates: ['sum'],
      aggregatesrenderer: function (aggregates) {
          let tota_porc_re42=(sum_tota_unid.value>0 &&  sum_tota_pedi.value>0) ? sum_tota_unid.value/sum_tota_pedi.value:0;
          return  (tota_porc_re42>0) ?  'T:'+(tota_porc_re42).toFixed(2):'T:' +0;
      }
    },
    {
      text: 'COP. Unid',
      dataField: 'mont_unid',
      width: '150',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist',
      columngroup:"unid",
      aggregates: ['sum'],
      aggregatesrenderer: function (aggregates) {
        // sum_tota_pedi.value sum_tota_rece
        let tota_cop_unid= (sum_tota_unid.value>0 && sum_tota_line.value>0) ? (sum_tota_line.value/sum_tota_unid.value):0;
        return  (tota_cop_unid>0) ?  'T:'+tota_cop_unid.toFixed(2):'T:' +0;
      }
    },
    {
      text: 'PEG21',
      dataField: 'posi_eg21',
      width: '150',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist',
      aggregates: ['sum'],
      aggregatesrenderer: function (aggregates) {
          return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
      }
    },
    {
      text: 'PEG42',
      dataField: 'posi_eg42',
      width: '150',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist',
      aggregates: ['sum'],
      aggregatesrenderer: function (aggregates) {
          return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
      }
    },
    {
      text: 'PEG63',
      dataField: 'posi_egre',
      width: '150',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist',
      aggregates: ['sum'],
      aggregatesrenderer: function (aggregates) {
          return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
      }
    },

    
  ]
});

const columnGroups= [
    { text: 'Venta Linea', align: 'center', name: 'vent_line' }
  , { text: 'Venta Recepcionada', align: 'center', name: 'vent_recep'}
  , { text: 'Venta Facturada', align: 'center', name: 'vent_fact'}
  , { text: 'Faltante', align: 'center', name: 'falt'}
  , { text: 'Unidades', align: 'center', name: 'unid'}
];

const sourceGlobal = ref({
  localdata: [],
  datafields: [{name: "codi_area",type:"string"},
  {name: "codi_zona",type:"string"},
  {name: "codi_sect",type:"string"},
  {name: "acti_inic",type:"string"},
  {name: "tota_ingr",type:"string"},
  {name: "tota_rein",type:"string"},
  {name: "tota_reco",type:"string"},
  {name: "tota_egre",type:"string"},
  {name: "acti_fina",type:"string"},
  {name: "posi_rein",type:"string"},
  {name: "tota_capi",type:"string"},
  {name: "pedi_rete",type:"string"},
  {name: "porc_acti",type:"string"},
  {name: "nume_pedi",type:"string"},
  {name: "vent_publ",type:"string"},
  {name: "pppp_publ",type:"string"},
  {name: "tota_fact",type:"string"},
  {name: "pppp_fact",type:"string"},
  {name: "tota_falt",type:"string"},
  {name: "porc_falt",type:"string"},
  {name: "tota_line",type:"string"},
  {name: "tota_pedi",type:"string"},
  {name: "vent_rece",type:"string"},
  {name: "pppp_rece",type:"string"},
  {name: "tota_unid",type:"string"},
  {name: "tota_uppp",type:"string"},
  {name: "mont_unid",type:"string"},
  {name: "posi_eg21",type:"string"},
  {name: "posi_eg42",type:"string"},
  {name: "posi_egre",type:"string"},
  {name: "rete_pe21",type:"string"},
  {name: "porc_re21",type:"string"},
  {name: "rete_pe42",type:"string"},
  {name: "porc_re42",type:"string"},
  {name: "rete_pe63",type:"string"},
  {name: "porc_re63",type:"string"},
  {name: "nomb_lide",type:"string"},
],
  datatype: 'json',
});


const sourceLista = ref([
  {
    label: 'Puntos Sueños Azzorti',
    value: 'punt_suen_ases',
    checked: true,
  },
  {
    label: 'Cumpleaños',
    value: 'fech_naci',
    checked: true,
  },
  {
    label: 'Barrio',
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
    label: 'Saldo',
    value: 'sald_docu',
    checked: true,
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
    label: 'Fact. ult. camp1',
    value: 'tota_fact_1',
    checked: true,
  },
  {
    label: 'Devo. ult. camp1',
    value: 'tota_devo_1',
    checked: true,
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
    label: 'Fact. ult. camp2',
    value: 'tota_fact_2',
    checked: true,
  },
  {
    label: 'Devo. ult. camp2',
    value: 'tota_devo_2',
    checked: true,
  },
  {
    label: 'Ult. camp3',
    value: 'codi_camp_3',
    checked: true,
  },
  {
    label: 'Ptos azzo. ult. camp3',
    value: 'tota_publ_3',
    checked: true,
  },
  {
    label: 'Fact. ult. camp3',
    value: 'tota_fact_3',
    checked: true,
  },
  {
    label: 'Devo. ult. camp3',
    value: 'tota_devo_3',
    checked: true,
  },
  {
    label: 'Ult. camp4',
    value: 'codi_camp_4',
    checked: true,
  },
  {
    label: 'Ptos azzo. ult. camp4',
    value: 'tota_publ_4',
    checked: true,
  },
  {
    label: 'Fact. ult. camp4',
    value: 'tota_fact_4',
    checked: true,
  },
  {
    label: 'Devo. ult. camp4',
    value: 'tota_devo_4',
    checked: true,
  },
  // {
  //   label: 'Status',
  //   value: 'tipo_clie',
  //   checked: true,
  // },

  {
    label: 'Estado pedido',
    value: 'esta_pedi',
    checked: true,
  },
])

const adaptadorGlobal = new jqx.dataAdapter(sourceGlobal.value)
const localizationGlobal =  {
    filterselectstring: ' ',
};

const headersDetalleTotal = computed(() => {
  return [
    {
      text: 'Zona',
      dataField: 'codi_zona',
      width: '100',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist',
      hidden: true, // esta oculta la columna

    },
    {
      text: 'Codigo Lider',
      dataField: 'codi_sect',
      width: '100',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist',
      hidden: true, // esta oculta la columna
    },
    {
      text: 'Nro ident.',
      dataField: 'nume_iden',
      width: '110',
      align: 'center',
      cellsalign: 'center',
      hidden: false,// esta columna no esta oculta 
      // filtertype: 'checkedlist'
    },
    {
      text: 'Nombre(s) y apellido(s)',
      dataField: 'nomb_clie',
      width: '270',
      align: 'center',
      cellsalign: 'center',
      hidden: false,// esta columna no esta oculta 
      // filtertype: 'checkedlist'
    },
    {
      text: 'Cumpleaños',
      dataField: 'fech_naci',
      width: '140',
      align: 'center',
      cellsalign: 'center',
      hidden: false,// esta columna no esta oculta 
      // filtertype: 'checkedlist'     
       // , aggregates: ['count']
    },
    {
      text: 'Barrio',
      dataField: 'nomb_barr',
      width: '150',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist',
      hidden: false,// esta columna no esta oculta 
    },
    {
      text: 'Dirección',
      dataField: 'dire_terc',
      width: '180',
      align: 'center',
      cellsalign: 'center',
      hidden: false,// esta columna no esta oculta
      // filtertype: 'checkedlist'
    },
    {
      text: 'Telefono 1 ',
      dataField: 'tele_ter1',
      width: '100',
      align: 'center',
      cellsalign: 'center',
      hidden: false,// esta columna no esta oculta
      // filtertype: 'checkedlist'
    },
    {
      text: 'Telefono 2',
      dataField: 'tele_ter2',
      width: '100',
      align: 'center',
      cellsalign: 'center',
      hidden: false,// esta columna no esta oculta
      // filtertype: 'checkedlist'
    },
    {
      text: 'Status',
      dataField: 'tipo_clie',
      width: '180',
      align: 'center',
      cellsalign: 'center',
      hidden: false,// esta columna no esta oculta
      filtertype: 'checkedlist'
    },
		{
      text: 'Puntos Sueños Azzorti',
      dataField: 'punt_suen_ases',
      width: '100',
      align: 'center',
      cellsalign: 'center',
      hidden: false, // esta columna no esta oculta
    },
    {
      text: 'Cupo',
      dataField: 'cupo_cred',
      width: '100',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist',
      hidden: true, // esta oculta la columna
    },
    {
      text: 'Saldo',
      dataField: 'sald_docu',
      width: '100',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist',
      hidden: true, // esta oculta la columna
    },
    {
      text: 'Camp. Ingr.',
      dataField: 'camp_ingr',
      width: '100',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist',
      hidden: true, // esta oculta la columna
      cellclassname: ' bg-primary-light',
    },
    {
      text: 'Ult. Camp1',
      dataField: 'codi_camp_1',
      width: '100',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist',
      hidden: false, // esta columna no esta oculta
      cellclassname: ' bg-primary-light',
    },

    {
      text: 'Ptos. Azzo. Ult. Camp1',
      dataField: 'tota_publ_1',
      width: '100',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist',
      hidden: false, // esta columna no esta oculta
      cellclassname: ' bg-primary-light',
    },
    {
      text: 'Fact Ult. Camp1',
      dataField: 'tota_fact_1',
      width: '100',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist',
      hidden: false, // esta columna no esta oculta
      cellclassname: ' bg-primary-light',
    },
    {
      text: 'Devo Ult. Camp1',
      dataField: 'tota_devo_1',
      width: '100',
      align: 'center',
      cellsalign: 'center',
      hidden: false, // esta columna no esta oculta
      cellclassname: ' bg-primary-light',
      filtertype: 'checkedlist'
    },
    {
      text: 'Ult. Camp2',
      dataField: 'codi_camp_2',
      width: '100',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist',
      hidden: false, // esta columna no esta oculta
      cellclassname: 'bg-success-light',
    },
    {
      text: 'Ptos. Azzo. Ult. Camp2',
      dataField: 'tota_publ_2',
      width: '100',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist',
      hidden: false, // esta columna no esta oculta
      cellclassname: 'text-white bg-success-light',
    },
    {
      text: 'Fact Ult. Camp2',
      dataField: 'tota_fact_2',
      width: '100',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist',
      hidden: false, // esta columna no esta oculta
      cellclassname: 'text-white bg-success-light',
    },
    {
      text: 'Devo Ult. Camp2',
      dataField: 'tota_devo_2',
      width: '100',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist',
      hidden: false, // esta columna no esta oculta
      cellclassname: 'text-white bg-success-light',
    },
    {
      text: 'Ult. Camp3',
      dataField: 'codi_camp_3',
      width: '100',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist',
      hidden: false, // esta columna no esta oculta
    },
    {
      text: 'Ptos. Azzo. Ult. Camp3',
      dataField: 'tota_publ_3',
      width: '100',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist',
      hidden: false, // esta columna no esta oculta
    },
    {
      text: 'Fact Ult. Camp3',
      dataField: 'tota_fact_3',
      width: '100',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist',
      hidden: false, // esta columna no esta oculta
    },
    {
      text: 'Devo Ult. Camp3',
      dataField: 'tota_devo_3',
      width: '100',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist',
      hidden: false, // esta columna no esta oculta
    },
    {
      text: 'Ult. Camp4',
      dataField: 'codi_camp_4',
      width: '100',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist',
      hidden: false, // esta columna no esta oculta
    },
    {
      text: 'Ptos. Azzo. Ult. Camp4',
      dataField: 'tota_publ_4',
      width: '100',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist',
      hidden: false, // esta columna no esta oculta
    },
    {
      text: 'Fact Ult. Camp4',
      dataField: 'tota_fact_4',
      width: '100',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist',
      hidden: false, // esta columna no esta oculta
    },
    {
      text: 'Devo Ult. Camp4',
      dataField: 'tota_devo_4',
      width: '100',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist',
      hidden: false, // esta columna no esta oculta
    },
    {
      text: 'Estado Pedido',
      dataField: 'esta_pedi',
      width: '150',
      align: 'center',
      cellsalign: 'center',
      filtertype: 'checkedlist',
      hidden: false, // esta columna no esta oculta
    },
    
  ]
});

const sourceDetalle = ref({
  localdata: [],
  datafields: [  {name: "codi_zona",type:"string"},
  {name: "codi_sect",type:"string"},
  {name: "nume_iden",type:"string"},
  {name: "nomb_clie",type:"string"},
  {name: "fech_naci",type:"string"},
  {name: "nomb_barr",type:"string"},
  {name: "dire_terc",type:"string"},
  {name: "tele_ter1",type:"string"},
  {name: "tele_ter2",type:"string"},
  {name: "tipo_clie",type:"string"},
  {name: "cupo_cred",type:"string"},
  {name: "sald_docu",type:"string"},
  {name: "camp_ingr",type:"string"},
  {name: "codi_camp_1",type:"string"},
  {name: "tota_publ_1",type:"string"},
  {name: "tota_fact_1",type:"string"},
  {name: "tota_devo_1",type:"string"},
  {name: "codi_camp_2",type:"string"},
  {name: "tota_publ_2",type:"string"},
  {name: "tota_fact_2",type:"string"},
  {name: "tota_devo_2",type:"string"},
  {name: "codi_camp_3",type:"string"},
  {name: "tota_publ_3",type:"string"},
  {name: "tota_fact_3",type:"string"},
  {name: "tota_devo_3",type:"string"},
  {name: "codi_camp_4",type:"string"},
  {name: "tota_publ_4",type:"string"},
  {name: "tota_fact_4",type:"string"},
  {name: "tota_devo_4",type:"string"},
	{name: "punt_suen_ases",type:"string"},
  {name: "esta_pedi",type:"string"}],
  datatype: 'json',
});

const adaptadorDetalle = new jqx.dataAdapter(sourceDetalle.value)
const localizationDetalle =  {
    filterselectstring: ' ',
};

const selectedColumna = ref([
  'codi_sect',
  'nume_iden',
  'nomb_clie',
  'nomb_barr',
  'dire_terc',
  'tele_ter1',
  'tele_ter2',
  'tipo_clie',
  'sald_docu',
  'codi_camp_1',
  'tota_publ_1',
  'codi_camp_2',
  'tota_publ_2',
  'codi_camp_3',
  'tota_publ_3',
  'codi_camp_4',
  'tota_publ_4',
  'clie_gemm',
  'nive_gemm',
  'desc_segm',
])

// const headersDetalle = computed(() => {
//   if(selectedColumna.value.length > 0) {
//     return headersDetalleTotal.filter(header => selectedColumna.value.includes(header.key))
//   } else {
//     return []
//   }
// })

// const headersColumna = [
//   {
//     title: 'Columna',
//     key: 'nomb_colu',
//   },
// ]

// const itemsColumna = [
//   {
//     nomb_colu: 'Zona',
//     codi_colu: 'codi_zona',
//   },
//   {
//     nomb_colu: 'Sector',
//     codi_colu: 'codi_sect',
//   },
//   {
//     nomb_colu: 'Cumpleaños',
//     codi_colu: 'fech_naci',
//   },
//   {
//     nomb_colu: 'Distrito',
//     codi_colu: 'nomb_barr',
//   },
//   {
//     nomb_colu: 'Dirección',
//     codi_colu: 'dire_terc',
//   },
//   {
//     nomb_colu: 'Teléfono 1',
//     codi_colu: 'tele_ter1',
//   },
//   {
//     nomb_colu: 'Teléfono 2',
//     codi_colu: 'tele_ter2',
//   },
//   {
//     nomb_colu: 'Cupo',
//     codi_colu: 'cupo_cred',
//   },
//   {
//     nomb_colu: 'Saldo',
//     codi_colu: 'sald_docu',
//   },
//   {
//     nomb_colu: 'Camp. ingr.',
//     codi_colu: 'camp_ingr',
//   },
//   {
//     nomb_colu: 'Ult. camp1',
//     codi_colu: 'codi_camp_1',
//   },
//   {
//     nomb_colu: 'Ptos azzo. ult. camp1',
//     codi_colu: 'tota_publ_1',
//   },
//   {
//     nomb_colu: 'Fact. ult. camp1',
//     codi_colu: 'tota_fact_1',
//   },
//   {
//     nomb_colu: 'Devo. ult. camp1',
//     codi_colu: 'tota_devo_1',
//   },
//   {
//     nomb_colu: 'Ult. camp2',
//     codi_colu: 'codi_camp_2',
//   },
//   {
//     nomb_colu: 'Ptos azzo. ult. camp2',
//     codi_colu: 'tota_publ_2',
//   },
//   {
//     nomb_colu: 'Fact. ult. camp2',
//     codi_colu: 'tota_fact_2',
//   },
//   {
//     nomb_colu: 'Devo. ult. camp2',
//     codi_colu: 'tota_devo_2',
//   },
//   {
//     nomb_colu: 'Ult. camp3',
//     codi_colu: 'codi_camp_3',
//   },
//   {
//     nomb_colu: 'Ptos azzo. ult. camp3',
//     codi_colu: 'tota_publ_3',
//   },
//   {
//     nomb_colu: 'Fact. ult. camp3',
//     codi_colu: 'tota_fact_3',
//   },
//   {
//     nomb_colu: 'Devo. ult. camp3',
//     codi_colu: 'tota_devo_3',
//   },
//   {
//     nomb_colu: 'Ult. camp4',
//     codi_colu: 'codi_camp_4',
//   },
//   {
//     nomb_colu: 'Ptos azzo. ult. camp4',
//     codi_colu: 'tota_publ_4',
//   },
//   {
//     nomb_colu: 'Fact. ult. camp4',
//     codi_colu: 'tota_fact_4',
//   },
//   {
//     nomb_colu: 'Devo. ult. camp4',
//     codi_colu: 'tota_devo_4',
//   },
//   {
//     nomb_colu: 'Estado pedido',
//     codi_colu: 'esta_pedi',
//   },
//   {
//     nomb_colu: 'Gemma',
//     codi_colu: 'clie_gemm',
//   },
//   {
//     nomb_colu: 'Nivel',
//     codi_colu: 'nive_gemm',
//   },
//   {
//     nomb_colu: 'Creciendo con azzorti',
//     codi_colu: 'desc_segm',
//   },
// ]

const isOpen = ref(false)
const itemsGlobal = ref([])
const itemsDetalle = ref([])

const campanaOptions = ref([])
const errorCampana = ref(false)
const errorMensajeCampana = ref('')

const zonaOptions = ref([])
const errorZona = ref(false)
const errorMensajeZona = ref('')

onMounted(async () => {
  appStore.titulo(`Reportes / Listado asesora`)
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

    itemsGlobal.value = []
    itemsDetalle.value = []

    const { data } = await $api(`/api/sami/v1/reportes/listado-asesora`, {
      method: "GET",
      query: {
        campana: (formulario.value.campana === null) ? '' : formulario.value.campana,
        zona: (formulario.value.zona === null) ? '' : formulario.value.zona,
      },
    })

    itemsGlobal.value = data.data_glob
    console.log(data.data_glob)
    /** Asignacion valores suma retePe 21,42 y 63 **/
    sum_posi_eg21_ante.value = itemsGlobal.value.reduce((a, b) => a + Number(b.posi_eg21_ante), 0);
    sum_rete_pe21.value = itemsGlobal.value.reduce((a, b) => a + Number(b.rete_pe21), 0);
    sum_posi_eg42_ante.value = itemsGlobal.value.reduce((a, b) => a + Number(b.posi_eg42_ante), 0);
    sum_rete_pe42.value = itemsGlobal.value.reduce((a, b) => a + Number(b.rete_pe42), 0)
    sum_posi_eg63_ante.value = itemsGlobal.value.reduce((a, b) => a + Number(b.posi_egre_ante), 0);
    sum_rete_pe63.value = itemsGlobal.value.reduce((a, b) => a + Number(b.rete_pe63), 0);

    /** Asignacion valores suma para porcentaje de actividad **/
    sum_tota_acti.value = itemsGlobal.value.reduce((a, b) => a + Number(b.acti_inic), 0);
    sum_tota_ingr.value = itemsGlobal.value.reduce((a, b) => a + Number(b.tota_ingr), 0);
    sum_tota_rein.value = itemsGlobal.value.reduce((a, b) => a + Number(b.tota_rein), 0);
    sum_tota_pedi.value = itemsGlobal.value.reduce((a, b) => a + Number(b.nume_pedi), 0);

    /** Asignacion valores suma para ppp rece **/
    sum_tota_rece.value = itemsGlobal.value.reduce((a, b) => a + Number(b.vent_rece), 0);

    /** Asignacion valores suma para ppp fact **/
    sum_tota_fact.value =itemsGlobal.value.reduce((a, b) => a + Number(b.tota_fact), 0);

    /** Asignacion valores suma para ppp line **/
    sum_tota_line.value = itemsGlobal.value.reduce((a, b) => a + Number(b.tota_line),0);

    /**Asignacion valores suma para upp */
    sum_tota_unid.value = itemsGlobal.value.reduce((a, b) => a + Number(b.tota_unid),0);


    itemsDetalle.value = data.data_deta
    sourceGlobal.value.localdata = data.data_glob
    refGridGlobal.value.updatebounddata('cells')
    refGridGlobal.value.refreshfilterrow()
    sourceDetalle.value.localdata = data.data_deta
    refGridDetalle.value.updatebounddata('cells')
    refGridDetalle.value.refreshfilterrow()
    
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
  itemsGlobal.value = []
  itemsDetalle.value = []
  refGridGlobal.value.updatebounddata('cells')
}

const onExcel = async tipo => {
  try {

    appStore.mensaje('Generando archivo')
    appStore.loading(true)
    console.log(tipo)

     // Exportar datos manualmente a XML
     const rows = refGridDetalle?.value?.getrows?.(); // Obtener las filas de la cuadrícula
     //obtener columnas de la cuadrícula
     const columns = refGridDetalle.value.columns;
     let visi_colu=[]
     columns.forEach((column, index) => {
				if (!column.hidden || column.datafield == 'codi_sect') {
					visi_colu.push(column.datafield)
				}
    	});

    if (!rows || rows.length === 0) {
      appStore.mensajeSnackbar("No hay datos en la cuadrícula para exportar.");
      appStore.color("error");
      appStore.snackbar(true);
      return;
    }

    let xmlDataGlob = `<?xml version="1.0" encoding="UTF-8"?>\n<rows>\n`;

    itemsGlobal.value.forEach((row, index) => {
      xmlDataGlob += `  <row id="${index + 1}">\n`;
      for (const [key, value] of Object.entries(row)) {
        xmlDataGlob += `    <${key}>${escapeXML(value)}</${key}>\n`;
      }
      xmlDataGlob += `  </row>\n`;
    });

    xmlDataGlob += `</rows>`;
    
    let xmlDataDeta = `<?xml version="1.0" encoding="UTF-8"?>\n<rows>\n`;

    itemsDetalle.value.forEach((row, index) => {
      xmlDataDeta += `  <row id="${index + 1}">\n`;
      for (const [key, value] of Object.entries(row)) {
        if (visi_colu.includes(key)) {
          xmlDataDeta += `    <${key}>${escapeXML(value)}</${key}>\n`;
        } 
      }
      xmlDataDeta += `  </row>\n`;
    });

    xmlDataDeta += `</rows>`;
    let colum_info=[]
    columns.forEach((column, index) => {
      if (!column.hidden || column.datafield == 'codi_sect') {
        colum_info.push({"dataField":column.datafield,"text":column.text})
      }
    });

    const { data } = await $api(`/api/sami/v1/reportes/listado-asesora/excel`, {
      method: "POST",
      body: {
        columnas:colum_info,
        tipo: tipo,
        data_glob: xmlDataGlob,
        data_deta: xmlDataDeta,
      },
    })
    console.log(data)
    window.open(`${$base}/temporales/${data}`, '_blank')
  } catch (e) {
    console.log(e)
  }
  finally {
    appStore.loading(false)
  }
}

const onPdf = async tipo => {
  try {
		appStore.mensaje('Generando archivo')
		// Exportar datos manualmente a XML
		const rows = refGridDetalle?.value?.getrows?.(); // Obtener las filas de la cuadrícula
		const columns = refGridDetalle.value.columns;
    let visi_colu=[]
    columns.forEach((column, index) => {
			if (!column.hidden || column.datafield == 'codi_sect') {
				visi_colu.push(column.datafield)
			}
		});

		if (!rows || rows.length === 0) {
			appStore.mensajeSnackbar("No hay datos en la cuadrícula para exportar.");
			appStore.color("error");
			appStore.snackbar(true);
			return;
		}

		let xmlDataGlob = `<?xml version="1.0" encoding="UTF-8"?>\n<rows>\n`;

		itemsGlobal.value.forEach((row, index) => {
			xmlDataGlob += `  <row id="${index + 1}">\n`;
			for (const [key, value] of Object.entries(row)) {
				xmlDataGlob += `    <${key}>${escapeXML(value)}</${key}>\n`;
			}
			xmlDataGlob += `  </row>\n`;
		});

		xmlDataGlob += `</rows>`;

		let xmlDataDeta = `<?xml version="1.0" encoding="UTF-8"?>\n<rows>\n`;

		itemsDetalle.value.forEach((row, index) => {
			xmlDataDeta += `  <row id="${index + 1}">\n`;
			for (const [key, value] of Object.entries(row)) {
				if (visi_colu.includes(key)) {
          xmlDataDeta += `    <${key}>${escapeXML(value)}</${key}>\n`;
        }
			}
			xmlDataDeta += `  </row>\n`;
		});

		xmlDataDeta += `</rows>`;

		let colum_info=[]
    columns.forEach((column, index) => {
      if (!column.hidden || column.datafield == 'codi_sect') {
        colum_info.push({"dataField":column.datafield,"text":column.text})
      }
    });

		const { data } = await $api(`/api/sami/v1/reportes/listado-asesora/pdf`, {
			method: "POST",
			body: {
				columnas:colum_info,
				tipo: tipo,
				data_glob: xmlDataGlob,
				data_deta: xmlDataDeta,
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

const itemsDetalleVisible = computed(() => {
  // Calcula las filas visibles según la página actual y el número de filas por página
  const start = (currentPage.value - 1) * rowsPerPage.value
  const end = start + rowsPerPage.value
  
  return itemsDetalle.value.slice(start, end)
})

// Función para manejar la selección de columnas es decir ocultar o mostrar esto aplica para la 2da tabla 
const onSeleccionar = event => {
  refGridDetalle.value.beginupdate()
  if (event.args.checked) {
    sourceLista.value[event.args.item.index].checked = true
    refGridDetalle.value.showcolumn(event.args.item.value)
  } else {
    sourceLista.value[event.args.item.index].checked = false
    refGridDetalle.value.hidecolumn(event.args.item.value)
  }
  refGridDetalle.value.endupdate()
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
                <ol class="mx-6 my-2 text-white">
                  <li>Incorporación</li>
                  <li>Reincorporación</li>
                  <li>Consecutiva</li>
                  <li>Consecutiva 2do pedido</li>
                  <li>Ret. Peg21</li>
                  <li>Ret. Peg42</li>
                  <li>Ret. Peg63</li>
                  <li>Reingreso</li>
                  <li>Peg21</li>
                  <li>Peg42</li>
                  <li>Peg63</li>
                  <li>Posible Reingreso</li>
                </ol>
              </VTooltip>
              <VListItemTitle>PDF 1</VListItemTitle>
            </VListItem>
            <!-- <VListItem @click="onPdf('2')">
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
                <ol class="mx-6 my-2 text-white">
                  <li>Consecutiva</li>
                  <li>Ret. Peg21</li>
                  <li>Ret. Peg42</li>
                  <li>Ret. Peg63</li>
                  <li>Reingreso</li>
                  <li>Incorporación</li>
                  <li>Reincorporación</li>
                  <li>Consecutiva 2do pedido</li>
                  <li>Peg21</li>
                  <li>Peg42</li>
                  <li>Peg63</li>
                  <li>Posible Reingreso</li>
                </ol>
              </VTooltip>
              <VListItemTitle>PDF 2</VListItemTitle>
            </VListItem> -->
            <!-- <VListItem @click="onPdf('3')">
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
                <ol class="mx-6 my-2 text-white">
                  <li>Consecutiva</li>
                  <li>Ret. Peg21</li>
                  <li>Ret. Peg42</li>
                  <li>Ret. Peg63</li>
                  <li>Reingreso</li>
                  <li>Incorporación</li>
                  <li>Reincorporación</li>
                  <li>Peg21</li>
                  <li>Peg42</li>
                  <li>Peg63</li>
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
                <ol class="mx-6 my-2 text-white">
                  <li>Consecutiva</li>
                  <li>Ret. Peg21</li>
                  <li>Ret. Peg42</li>
                  <li>Ret. Peg63</li>
                  <li>Reingreso</li>
                  <li>Incorporación</li>
                  <li>Reincorporación</li>
                  <li>Peg21</li>
                  <li>Peg42</li>
                  <li>Peg63</li>
                </ol>
              </VTooltip>
              <VListItemTitle>PDF 4</VListItemTitle>
            </VListItem> -->
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
                  ref="refGridGlobal"
                  theme="material"
                  width="100%"
                  :height="325"
                  :columns="headersGlobal"
                  :source="adaptadorGlobal"
                  :localization="localizationGlobal"
                  :columngroups="columnGroups"
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
                  showstatusbar
                  showaggregates
                  :columnsmenu="false"
                  :editable="false"
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
                  ref="refGridDetalle"
                  theme="material"
                  width="100%"
                  :height="450"
                  :columns="headersDetalleTotal"
                  :source="adaptadorDetalle"
                  :localization="localizationDetalle"
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



