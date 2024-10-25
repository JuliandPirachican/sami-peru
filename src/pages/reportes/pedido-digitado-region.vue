<!-- eslint-disable camelcase -->
<script setup>
import { useAppStore } from '@/stores/app';
import { EncryptStorage } from 'encrypt-storage';
import JqxGrid from 'jqwidgets-scripts/jqwidgets-vue3/vue_jqxgrid.vue';
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
const refGridCorte=ref();
const refGridZona=ref();

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



const headersCorte = computed(() => {
  return [
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "Corte",
    dataField: "codi_cort",
    pinned:true
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "Región",
    dataField: "codi_area",
    pinned:true
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "N° Zonas",
    dataField: "codi_zona",
    pinned:true
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "Objetivo",
    dataField: "obje_inco",
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "Facturado",
    dataField: "fact_inco",
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "Cump. Fact.",
    dataField: "cump_fact_inco",
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "Pend. Fact.",
    dataField: "pend_fact_inco",
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "Total",
    dataField: "tota_inco",
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }

  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "% Cump.",
    dataField: "cump_inco",
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "Objetivo",
    dataField: "obje_rete",
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "Facturado",
    dataField: "fact_rete",
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "Cump. Fact.",
    dataField: "cump_fact_rete",
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "Pend. Fact.",
    dataField: "pend_fact_rete",
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "Total",
    dataField: "tota_rete",
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "% Cump.",
    dataField: "cump_rete",
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "% Acti.",
    dataField: "acti_rete",
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "Objetivo",
    dataField: "obje_tota",
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "Facturado",
    dataField: "fact_tota",
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "Cump. Fact.",
    dataField: "cump_fact_tota",
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "Pend. Fact.",
    dataField: "pend_fact_tota",
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "Total",
    dataField: "tota_tota",
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "% Cump.",
    dataField: "cump_tota",
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "Capi.",
    dataField: "fact_capi",
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "Facturación",
    dataField: "valo_docu",
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "Saldo 21di",
    dataField: "sald_21di",
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "% Cobr. 21di",
    dataField: "porc_21di",
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "Saldo Actu.",
    dataField: "sald_docu",
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "% Actu.",
    dataField: "porc_docu",
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  }
]
});

const sourceCorte = ref({
  localdata: [],
  datafields: [
  { type: "string", name: "codi_cort" },
  { type: "string", name: "codi_area" },
  { type: "string", name: "codi_zona" },
  { type: "string", name: "obje_inco" },
  { type: "string", name: "fact_inco" },
  { type: "string", name: "cump_fact_inco" },
  { type: "string", name: "pend_fact_inco" },
  { type: "string", name: "tota_inco" },
  { type: "string", name: "cump_inco" },
  { type: "string", name: "obje_rete" },
  { type: "string", name: "fact_rete" },
  { type: "string", name: "cump_fact_rete" },
  { type: "string", name: "pend_fact_rete" },
  { type: "string", name: "tota_rete" },
  { type: "string", name: "cump_rete" },
  { type: "string", name: "acti_rete" },
  { type: "string", name: "obje_tota" },
  { type: "string", name: "fact_tota" },
  { type: "string", name: "cump_fact_tota" },
  { type: "string", name: "pend_fact_tota" },
  { type: "string", name: "tota_tota" },
  { type: "string", name: "cump_tota" },
  { type: "string", name: "fact_capi" },
  { type: "string", name: "valo_docu" },
  { type: "string", name: "sald_21di" },
  { type: "string", name: "porc_21di" },
  { type: "string", name: "sald_docu" },
  { type: "string", name: "porc_docu" },
],
  datatype: 'json',
})
const adaptadorCorte = new jqx.dataAdapter(sourceCorte.value)
const localization =  {
    filterselectstring: ' ',
};

const itemsCorte = ref([])

const headersZona = computed(() => {
  return [
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "Corte",
    dataField: "codi_cort",
    pinned:true
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "Región",
    dataField: "codi_area",
    pinned:true
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "Zona",
    dataField: "codi_zona",
    pinned:true
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "Gerente Zonal",
    dataField: "nomb_vend",
    pinned:true
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "Objetivo",
    dataField: "obje_inco",
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "Facturado",
    dataField: "fact_inco",
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "Cump. Fact.",
    dataField: "cump_fact_inco",
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "Pend. Fact.",
    dataField: "pend_fact_inco",
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "Total",
    dataField: "tota_inco",
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "% Cump.",
    dataField: "cump_inco",
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "Objetivo",
    dataField: "obje_rete",
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "Facturado",
    dataField: "fact_rete",
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "Cump. Fact.",
    dataField: "cump_fact_rete",
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "Pend. Fact.",
    dataField: "pend_fact_rete",
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "Total",
    dataField: "tota_rete",
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "% Cump.",
    dataField: "cump_rete",
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "% Obje. Acti.",
    dataField: "obje_acti",
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "% Acti.",
    dataField: "acti_rete",
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "Objetivo",
    dataField: "obje_tota",
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "Facturado",
    dataField: "fact_tota",
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "Cump. Fact.",
    dataField: "cump_fact_tota",
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "Pend. Fact.",
    dataField: "pend_fact_tota",
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "Total",
    dataField: "tota_tota",
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "% Cump.",
    dataField: "cump_tota",
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "Capi.",
    dataField: "fact_capi",
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "Vta. Linea",
    dataField: "vent_line",
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "Faltante",
    dataField: "vent_falt",
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "Vta. Rece.",
    dataField: "vent_rece",
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "% Falt.",
    dataField: "porc_falt",
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "Facturación",
    dataField: "valo_docu",
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "Saldo 21di",
    dataField: "sald_21di",
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "% Cobr. 21di",
    dataField: "porc_21di",
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "Saldo Actu.",
    dataField: "sald_docu",
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "% Actu.",
    dataField: "porc_docu",
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "Reingresos",
    dataField: "tota_rein",
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "Egresos",
    dataField: "tota_egre",
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "Act. Final",
    dataField: "acti_fina",
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  },


  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "P Rreingreso",
    dataField: "posi_rein",
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "Peg21",
    dataField: "posi_eg21",
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "Peg42",
    dataField: "posi_eg42",
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "Peg63",
    dataField: "posi_eg63",
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "Ret. Peg21",
    dataField: "rete_eg21",
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "Ret. Peg42",
    dataField: "rete_eg42",
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  },
  {
    width: 150,
    align: "center",
    cellsAlign: "center",
    filterType: "checkedlist",
    text: "Ret. Peg63",
    dataField: "rete_eg63",
    aggregates: ['sum'],
    aggregatesrenderer: function (aggregates) {
        return  (aggregates['sum']!=undefined) ?  'T:'+aggregates['sum']:'T:' +0;
    }
  }
  ]
});

const sourceZona = ref({
  localdata: [],
  datafields: [
  {
    type: 'string',
    name: 'codi_cort',
  },
  {
    type: 'string',
    name: 'codi_area',
  },
  {
    type: 'string',
    name: 'codi_zona',
  },
  {
    type: 'string',
    name: 'nomb_vend',
  },
  {
    type: 'string',
    name: 'obje_inco',
  },
  {
    type: 'string',
    name: 'fact_inco',
  },
  {
    type: 'string',
    name: 'cump_fact_inco',
  },
  {
    type: 'string',
    name: 'pend_fact_inco',
  },
  {
    type: 'string',
    name: 'tota_inco',
  },
  {
    type: 'string',
    name: 'cump_inco',
  },
  {
    type: 'string',
    name: 'obje_rete',
  },
  {
    type: 'string',
    name: 'fact_rete',
  },
  {
    type: 'string',
    name: 'cump_fact_rete',
  },
  {
    type: 'string',
    name: 'pend_fact_rete',
  },
  {
    type: 'string',
    name: 'tota_rete',
  },
  {
    type: 'string',
    name: 'cump_rete',
  },
  {
    type: 'string',
    name: 'obje_acti',
  },
  {
    type: 'string',
    name: 'acti_rete',
  },
  {
    type: 'string',
    name: 'obje_tota',
  },
  {
    type: 'string',
    name: 'fact_tota',
  },
  {
    type: 'string',
    name: 'cump_fact_tota',
  },
  {
    type: 'string',
    name: 'pend_fact_tota',
  },
  {
    type: 'string',
    name: 'tota_tota',
  },
  {
    type: 'string',
    name: 'cump_tota',
  },
  {
    type: 'string',
    name: 'fact_capi',
  },
  {
    type: 'string',
    name: 'vent_line',
  },
  {
    type: 'string',
    name: 'vent_falt',
  },
  {
    type: 'string',
    name: 'vent_rece',
  },
  {
    type: 'string',
    name: 'porc_falt',
  },
  {
    type: 'string',
    name: 'pppp_fact',
  },
  {
    type: 'string',
    name: 'pppp_rece',
  },
  {
    type: 'string',
    name: 'valo_docu',
  },
  {
    type: 'string',
    name: 'sald_21di',
  },
  {
    type: 'string',
    name: 'porc_21di',
  },
  {
    type: 'string',
    name: 'sald_docu',
  },
  {
    type: 'string',
    name: 'porc_docu',
  },
  {
    type: 'string',
    name: 'tota_rein',
  },
  {
    type: 'string',
    name: 'tota_egre',
  },
  {
    type: 'string',
    name: 'acti_fina',
  },
  {
    type: 'string',
    name: 'posi_rein',
  },
  {
    type: 'string',
    name: 'posi_eg21',
  },
  {
    type: 'string',
    name: 'posi_eg42',
  },
  {
    type: 'string',
    name: 'posi_eg63',
  },
  {
    type: 'string',
    name: 'rete_eg21',
  },
  {
    type: 'string',
    name: 'rete_eg42',
  },
  {
    type: 'string',
    name: 'rete_eg63',
  }
],
  datatype: 'json',
})
const adaptadorZona = new jqx.dataAdapter(sourceZona.value)
const localizationZone =  {
    filterselectstring: ' ',
};

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
    // {
    //   nomb_conc: 'Retención',
    //   line_desc: '',
    //   obje_conc: '0',
    //   falt_desc: '',
    //   fact_conc: '0',
    //   rece_desc: '',
    //   porc_conc: '0.00 %',
    // },
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
      nomb_conc: 'Pedidos pendientes de retención ciclo de nuevas 2do pedido',
      cant_conc: '0',
      porc_conc: '',
    },
    {
      cons_fila: '0',
      nomb_conc: 'Pedidos pendientes de retención ciclo de nuevas 3er pedido',
      cant_conc: '0',
      porc_conc: '',
    },
    {
      cons_fila: '0',
      nomb_conc: 'Pedidos pendientes de retención ciclo de nuevas 4to pedido',
      cant_conc: '0',
      porc_conc: '',
    },
    {
      cons_fila: '0',
      nomb_conc: 'Pedidos pendientes de retención ciclo de nuevas 5to pedido',
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
      nomb_conc: 'Pedidos pendientes de retención',
      cant_conc: '0',
      porc_conc: '',
    },
    {
      cons_fila: '1',
      nomb_conc: 'Pedidos pendientes de activas',
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
      nomb_conc: 'Retenidos de activas',
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
    sourceCorte.value.localdata = data.data_cort
    refGridCorte.value.updatebounddata('cells')
    refGridCorte.value.refreshfilterrow()

    itemsZona.value = data.data_zona
    sourceZona.value.localdata = data.data_zona
    refGridZona.value.updatebounddata('cells')
    refGridZona.value.refreshfilterrow()
    
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
    console.log(headersCorte.value)
    console.log(headersZona.value)
    console.log(itemsDetalle.value)
    console.log(itemsCorte.value)
    console.log(itemsZona.value)

    const { data } = await $api(`/api/sami/v1/reportes/pedidos-digitados-region/excel`, {
      method: "post",
      body: {
        CabeceraCorte:headersCorte.value,
        CabeceraZona:headersZona.value,
        data_glob: itemsGlobal.value,
        data_deta: itemsDetalle.value,
        data_cort: itemsCorte.value,
        data_zona: itemsZona.value,
      },
    })
    
    window.open(`${$base}/temporales/${data}`, '_blank')
  } catch (e) {
    console.error(e)
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
                   <JqxGrid
                  ref="refGridCorte"
                  theme="material"
                  width="100%"
                  :height="450"
                  :columns="headersCorte"
                  :source="adaptadorCorte"
                  :localization="localization"
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
            <VCard title="Detalle zona">
              <VCardText>
                <JqxGrid
                  ref="refGridZona"
                  theme="material"
                  width="100%"
                  :height="450"
                  :columns="headersZona"
                  :source="adaptadorZona"
                  :localization="localizationZone"
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
