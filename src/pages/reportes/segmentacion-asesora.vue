<!-- eslint-disable camelcase -->
<script setup>
import { useAppStore } from '@/stores/app';
import JqxGrid from 'jqwidgets-scripts/jqwidgets-vue3/vue_jqxgrid.vue';

definePage({
  meta: {
    action: 'colombia/repo_come_segm_ases',
    subject: 'colombia/repo_come_segm_ases',
  },
})

const appStore = useAppStore()

const formulario = ref({
  ano: null,
  periodo: null,
  zona: null,
})

const anoOptions = ref([])
const errorAno = ref(false)
const errorMensajeAno = ref('')

const periodoOptions = ref([])
const errorPeriodo = ref(false)
const errorMensajePeriodo = ref('')

const zonaOptions = ref([])
const errorZona = ref(false)
const errorMensajeZona = ref('')

const cabecera = computed(() => {
  return [
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
      title: 'Sector',
      key: 'codi_sect',
    },
    {
      title: 'Doc ident.',
      key: 'nume_iden',
    },
    {
      title: 'Nombre(s) y apellido(s)',
      key: 'nomb_clie',
    },
    {
      title: 'Telefono',
      key: 'tele_clie',
    },
    {
      title: 'Campaña 1',
      key: 'camp_1',
    },
    {
      title: 'Ptos efect. 1',
      key: 'tota_punt_1',
    },
    {
      title: 'Ptos perd. 1',
      key: 'tota_perd_1',
    },
    {
      title: 'Ptos efect. fina. 1',
      key: 'sald_punt_1',
    },
    {
      title: 'Saldo 1',
      key: 'sald_docu_1',
    },
    {
      title: 'Cobranza 1',
      key: 'esta_cart_1',
    },
    {
      title: 'Campaña 2',
      key: 'camp_2',
    },
    {
      title: 'Ptos efect. 2',
      key: 'tota_punt_2',
    },
    {
      title: 'Ptos perd. 2',
      key: 'tota_perd_2',
    },
    {
      title: 'Ptos efect. fina. 2',
      key: 'sald_punt_2',
    },
    {
      title: 'Saldo 2',
      key: 'sald_docu_2',
    },
    {
      title: 'Cobranza 2',
      key: 'esta_cart_2',
    },
    {
      title: 'Campaña 3',
      key: 'camp_3',
    },
    {
      title: 'Ptos efect. 3',
      key: 'tota_punt_3',
    },
    {
      title: 'Ptos perd. 3',
      key: 'tota_perd_3',
    },
    {
      title: 'Ptos efect. fina. 3',
      key: 'sald_punt_3',
    },
    {
      title: 'Saldo 3',
      key: 'sald_docu_3',
    },
    {
      title: 'Cobranza 3',
      key: 'esta_cart_3',
    },
    {
      title: 'Campaña 4',
      key: 'camp_4',
    },
    {
      title: 'Ptos efect. 4',
      key: 'tota_punt_4',
    },
    {
      title: 'Ptos perd. 4',
      key: 'tota_perd_4',
    },
    {
      title: 'Ptos efect. fina. 4',
      key: 'sald_punt_4',
    },
    {
      title: 'Saldo 4',
      key: 'sald_docu_4',
    },
    {
      title: 'Cobranza 4',
      key: 'esta_cart_4',
    },
    {
      title: 'Campaña 5',
      key: 'camp_5',
    },
    {
      title: 'Ptos efect. 5',
      key: 'tota_punt_5',
    },
    {
      title: 'Ptos perd. 5',
      key: 'tota_perd_5',
    },
    {
      title: 'Ptos efect. fina. 5',
      key: 'sald_punt_5',
    },
    {
      title: 'Saldo 5',
      key: 'sald_docu_5',
    },
    {
      title: 'Cobranza 5',
      key: 'esta_cart_5',
    },
    {
      title: 'Campaña 6',
      key: 'camp_6',
    },
    {
      title: 'Ptos efect. 6',
      key: 'tota_punt_6',
    },
    {
      title: 'Ptos perd. 6',
      key: 'tota_perd_6',
    },
    {
      title: 'Ptos efect. fina. 6',
      key: 'sald_punt_6',
    },
    {
      title: 'Saldo 6',
      key: 'sald_docu_6',
    },
    {
      title: 'Cobranza 6',
      key: 'esta_cart_6',
    },
    {
      title: 'Campaña 7',
      key: 'camp_7',
    },
    {
      title: 'Ptos efect. 7',
      key: 'tota_punt_7',
    },
    {
      title: 'Ptos perd. 7',
      key: 'tota_perd_7',
    },
    {
      title: 'Ptos efect. fina. 7',
      key: 'sald_punt_7',
    },
    {
      title: 'Saldo 7',
      key: 'sald_docu_7',
    },
    {
      title: 'Cobranza 7',
      key: 'esta_cart_7',
    },
    {
      title: 'Campaña 8',
      key: 'camp_8',
    },
    {
      title: 'Ptos efect. 8',
      key: 'tota_punt_8',
    },
    {
      title: 'Ptos perd. 8',
      key: 'tota_perd_8',
    },
    {
      title: 'Ptos efect. fina. 8',
      key: 'sald_punt_8',
    },
    {
      title: 'Saldo 8',
      key: 'sald_docu_8',
    },
    {
      title: 'Cobranza 8',
      key: 'esta_cart_8',
    },
    {
      title: 'Campaña 9',
      key: 'camp_9',
    },
    {
      title: 'Ptos efect. 9',
      key: 'tota_punt_9',
    },
    {
      title: 'Ptos perd. 9',
      key: 'tota_perd_9',
    },
    {
      title: 'Ptos efect. fina. 9',
      key: 'sald_punt_9',
    },
    {
      title: 'Saldo 9',
      key: 'sald_docu_9',
    },
    {
      title: 'Cobranza 9',
      key: 'esta_cart_9',
    },
    {
      title: 'Ptos efect. acumulados',
      key: 'tota_punt',
    },
    {
      title: 'Ptos efect. perd. acumulados',
      key: 'tota_perd',
    },
    {
      title: 'Ptos efect. fina. acumulados',
      key: 'sald_punt',
    },
    {
      title: 'Vta prom. cat.',
      key: 'vent_cata',
    },
    {
      title: 'Creciendo con azzorti',
      key: 'desc_segm',
    },
    {
      title: 'Gemma',
      key: 'clie_gema',
    },
    {
      title: 'Nivel gemma',
      key: 'nive_gema',
    },
  ]
})

const columnas = [
  {
    text: 'Corte',
    dataField: 'codi_cort',
    width: 80,
    align: 'center',
    cellsalign: 'center',
    editable: false,
    filtertype: 'checkedlist',
  },
  {
    text: 'Región',
    dataField: 'codi_area',
    width: 80,
    align: 'center',
    cellsalign: 'center',
    editable: false,
    filtertype: 'checkedlist',
  },
  {
    text: 'Zona',
    dataField: 'codi_zona',
    width: 80,
    align: 'center',
    cellsalign: 'center',
    editable: false,
  },
  {
    text: 'Sector',
    dataField: 'codi_sect',
    width: 80,
    align: 'center',
    cellsalign: 'center',
    editable: false,
  },
  {
    text: 'Doc ident.',
    dataField: 'nume_iden',
    width: 120,
    align: 'center',
    cellsalign: 'center',
    editable: false,
  },
  {
    text: 'Nombre(s) y apellido(s)',
    dataField: 'nomb_clie',
    width: 200,
    align: 'center',
    cellsalign: 'left',
    editable: false,
  },
  {
    text: 'Telefono',
    dataField: 'tele_clie',
    width: 200,
    align: 'center',
    cellsalign: 'left',
    editable: false,
  },
  {
    text: 'Campaña 1',
    dataField: 'camp_1',
    width: 120,
    align: 'center',
    cellsalign: 'center',
    editable: false,
  },
  {
    text: 'Ptos efect. 1',
    dataField: 'tota_punt_1',
    width: 120,
    align: 'center',
    cellsalign: 'center',
    editable: false,
  },
  {
    text: 'Ptos perd. 1',
    dataField: 'tota_perd_1',
    width: 120,
    align: 'center',
    cellsalign: 'center',
    editable: false,
  },
  {
    text: 'Ptos efect. fina. 1',
    dataField: 'sald_punt_1',
    width: 120,
    align: 'center',
    cellsalign: 'center',
    editable: false,
  },
  {
    text: 'Saldo 1',
    dataField: 'sald_docu_1',
    width: 120,
    align: 'center',
    cellsalign: 'center',
    editable: false,
  },
  {
    text: 'Cobranza 1',
    dataField: 'esta_cart_1',
    width: 120,
    align: 'center',
    cellsalign: 'center',
    editable: false,
  },
  {
    text: 'Campaña 2',
    dataField: 'camp_2',
    width: 120,
    align: 'center',
    cellsalign: 'center',
    editable: false,
  },
  {
    text: 'Ptos efect. 2',
    dataField: 'tota_punt_2',
    width: 120,
    align: 'center',
    cellsalign: 'center',
    editable: false,
  },
  {
    text: 'Ptos perd. 2',
    dataField: 'tota_perd_2',
    width: 120,
    align: 'center',
    cellsalign: 'center',
    editable: false,
  },
  {
    text: 'Ptos efect. fina. 2',
    dataField: 'sald_punt_2',
    width: 120,
    align: 'center',
    cellsalign: 'center',
    editable: false,
  },
  {
    text: 'Saldo 2',
    dataField: 'sald_docu_2',
    width: 120,
    align: 'center',
    cellsalign: 'center',
    editable: false,
  },
  {
    text: 'Cobranza 2',
    dataField: 'esta_cart_2',
    width: 120,
    align: 'center',
    cellsalign: 'center',
    editable: false,
  },
  {
    text: 'Campaña 3',
    dataField: 'camp_3',
    width: 120,
    align: 'center',
    cellsalign: 'center',
    editable: false,
  },
  {
    text: 'Ptos efect. 3',
    dataField: 'tota_punt_3',
    width: 120,
    align: 'center',
    cellsalign: 'center',
    editable: false,
  },
  {
    text: 'Ptos perd. 3',
    dataField: 'tota_perd_3',
    width: 120,
    align: 'center',
    cellsalign: 'center',
    editable: false,
  },
  {
    text: 'Ptos efect. fina. 3',
    dataField: 'sald_punt_3',
    width: 120,
    align: 'center',
    cellsalign: 'center',
    editable: false,
  },
  {
    text: 'Saldo 3',
    dataField: 'sald_docu_3',
    width: 120,
    align: 'center',
    cellsalign: 'center',
    editable: false,
  },
  {
    text: 'Cobranza 3',
    dataField: 'esta_cart_3',
    width: 120,
    align: 'center',
    cellsalign: 'center',
    editable: false,
  },
  {
    text: 'Campaña 4',
    dataField: 'camp_4',
    width: 120,
    align: 'center',
    cellsalign: 'center',
    editable: false,
  },
  {
    text: 'Ptos efect. 4',
    dataField: 'tota_punt_4',
    width: 120,
    align: 'center',
    cellsalign: 'center',
    editable: false,
  },
  {
    text: 'Ptos perd. 4',
    dataField: 'tota_perd_4',
    width: 120,
    align: 'center',
    cellsalign: 'center',
    editable: false,
  },
  {
    text: 'Ptos efect. fina. 4',
    dataField: 'sald_punt_4',
    width: 120,
    align: 'center',
    cellsalign: 'center',
    editable: false,
  },
  {
    text: 'Saldo 4',
    dataField: 'sald_docu_4',
    width: 120,
    align: 'center',
    cellsalign: 'center',
    editable: false,
  },
  {
    text: 'Cobranza 4',
    dataField: 'esta_cart_4',
    width: 120,
    align: 'center',
    cellsalign: 'center',
    editable: false,
  },
  {
    text: 'Campaña 5',
    dataField: 'camp_5',
    width: 120,
    align: 'center',
    cellsalign: 'center',
    editable: false,
  },
  {
    text: 'Ptos efect. 5',
    dataField: 'tota_punt_5',
    width: 120,
    align: 'center',
    cellsalign: 'center',
    editable: false,
  },
  {
    text: 'Ptos perd. 5',
    dataField: 'tota_perd_5',
    width: 120,
    align: 'center',
    cellsalign: 'center',
    editable: false,
  },
  {
    text: 'Ptos efect. fina. 5',
    dataField: 'sald_punt_5',
    width: 120,
    align: 'center',
    cellsalign: 'center',
    editable: false,
  },
  {
    text: 'Saldo 5',
    dataField: 'sald_docu_5',
    width: 120,
    align: 'center',
    cellsalign: 'center',
    editable: false,
  },
  {
    text: 'Cobranza 5',
    dataField: 'esta_cart_5',
    width: 120,
    align: 'center',
    cellsalign: 'center',
    editable: false,
  },
  {
    text: 'Campaña 6',
    dataField: 'camp_6',
    width: 120,
    align: 'center',
    cellsalign: 'center',
    editable: false,
  },
  {
    text: 'Ptos efect. 6',
    dataField: 'tota_punt_6',
    width: 120,
    align: 'center',
    cellsalign: 'center',
    editable: false,
  },
  {
    text: 'Ptos perd. 6',
    dataField: 'tota_perd_6',
    width: 120,
    align: 'center',
    cellsalign: 'center',
    editable: false,
  },
  {
    text: 'Ptos efect. fina. 6',
    dataField: 'sald_punt_6',
    width: 120,
    align: 'center',
    cellsalign: 'center',
    editable: false,
  },
  {
    text: 'Saldo 6',
    dataField: 'sald_docu_6',
    width: 120,
    align: 'center',
    cellsalign: 'center',
    editable: false,
  },
  {
    text: 'Cobranza 6',
    dataField: 'esta_cart_6',
    width: 120,
    align: 'center',
    cellsalign: 'center',
    editable: false,
  },
  {
    text: 'Campaña 7',
    dataField: 'camp_7',
    width: 120,
    align: 'center',
    cellsalign: 'center',
    editable: false,
  },
  {
    text: 'Ptos efect. 7',
    dataField: 'tota_punt_7',
    width: 120,
    align: 'center',
    cellsalign: 'center',
    editable: false,
  },
  {
    text: 'Ptos perd. 7',
    dataField: 'tota_perd_7',
    width: 120,
    align: 'center',
    cellsalign: 'center',
    editable: false,
  },
  {
    text: 'Ptos efect. fina. 7',
    dataField: 'sald_punt_7',
    width: 120,
    align: 'center',
    cellsalign: 'center',
    editable: false,
  },
  {
    text: 'Saldo 7',
    dataField: 'sald_docu_7',
    width: 120,
    align: 'center',
    cellsalign: 'center',
    editable: false,
  },
  {
    text: 'Cobranza 7',
    dataField: 'esta_cart_7',
    width: 120,
    align: 'center',
    cellsalign: 'center',
    editable: false,
  },
  {
    text: 'Campaña 8',
    dataField: 'camp_8',
    width: 120,
    align: 'center',
    cellsalign: 'center',
    editable: false,
  },
  {
    text: 'Ptos efect. 8',
    dataField: 'tota_punt_8',
    width: 120,
    align: 'center',
    cellsalign: 'center',
    editable: false,
  },
  {
    text: 'Ptos perd. 8',
    dataField: 'tota_perd_8',
    width: 120,
    align: 'center',
    cellsalign: 'center',
    editable: false,
  },
  {
    text: 'Ptos efect. fina. 8',
    dataField: 'sald_punt_8',
    width: 120,
    align: 'center',
    cellsalign: 'center',
    editable: false,
  },
  {
    text: 'Saldo 8',
    dataField: 'sald_docu_8',
    width: 120,
    align: 'center',
    cellsalign: 'center',
    editable: false,
  },
  {
    text: 'Cobranza 8',
    dataField: 'esta_cart_8',
    width: 120,
    align: 'center',
    cellsalign: 'center',
    editable: false,
  },
  {
    text: 'Campaña 9',
    dataField: 'camp_9',
    width: 120,
    align: 'center',
    cellsalign: 'center',
    editable: false,
  },
  {
    text: 'Ptos efect. 9',
    dataField: 'tota_punt_9',
    width: 120,
    align: 'center',
    cellsalign: 'center',
    editable: false,
  },
  {
    text: 'Ptos perd. 9',
    dataField: 'tota_perd_9',
    width: 120,
    align: 'center',
    cellsalign: 'center',
    editable: false,
  },
  {
    text: 'Ptos efect. fina. 9',
    dataField: 'sald_punt_9',
    width: 120,
    align: 'center',
    cellsalign: 'center',
    editable: false,
  },
  {
    text: 'Saldo 9',
    dataField: 'sald_docu_9',
    width: 120,
    align: 'center',
    cellsalign: 'center',
    editable: false,
  },
  {
    text: 'Cobranza 9',
    dataField: 'esta_cart_9',
    width: 120,
    align: 'center',
    cellsalign: 'center',
    editable: false,
  },
  {
    text: 'Ptos efect. acumulados',
    dataField: 'tota_punt',
    width: 120,
    align: 'center',
    cellsalign: 'center',
    editable: false,
    cellsformat: 'N',
  },
  {
    text: 'Ptos efect. perd. acumulados',
    dataField: 'tota_perd',
    width: 120,
    align: 'center',
    cellsalign: 'center',
    editable: false,
    cellsformat: 'N',
  },
  {
    text: 'Ptos efect. fina. acumulados',
    dataField: 'sald_punt',
    width: 120,
    align: 'center',
    cellsalign: 'center',
    editable: false,
    cellsformat: 'N',
  },
  {
    text: 'Vta prom. cat.',
    dataField: 'vent_cata',
    width: 120,
    align: 'center',
    cellsalign: 'center',
    editable: false,
    cellsformat: 'N',
  },
  {
    text: 'Creciendo con azzorti',
    dataField: 'desc_segm',
    width: 120,
    align: 'center',
    cellsalign: 'left',
    editable: false,
  },
  {
    text: 'Gemma',
    dataField: 'clie_gema',
    width: 100,
    align: 'center',
    cellsalign: 'center',
    editable: false,
  },
  {
    text: 'Nivel gemma',
    dataField: 'nive_gema',
    width: 150,
    align: 'center',
    cellsalign: 'left',
    editable: false,
  },
]

const sourceGlobal = ref({
  localdata: [],
  datafields: [
    { name: 'codi_cort', type: 'string' },
    { name: 'codi_area', type: 'string' },
    { name: 'codi_zona', type: 'string' },
    { name: 'codi_sect', type: 'string' },
    { name: 'nume_iden', type: 'string' },
    { name: 'nomb_clie', type: 'string' },
    { name: 'tele_clie', type: 'string' },
    { name: 'camp_1', type: 'number' },
    { name: 'tota_publ_1', type: 'number' },
    { name: 'tota_punt_1', type: 'number' },
    { name: 'tota_perd_1', type: 'number' },
    { name: 'sald_punt_1', type: 'number' },
    { name: 'sald_docu_1', type: 'number' },
    { name: 'esta_cart_1', type: 'string' },
    { name: 'camp_2', type: 'number' },
    { name: 'tota_publ_2', type: 'number' },
    { name: 'tota_punt_2', type: 'number' },
    { name: 'tota_perd_2', type: 'number' },
    { name: 'sald_punt_2', type: 'number' },
    { name: 'sald_docu_2', type: 'number' },
    { name: 'esta_cart_2', type: 'string' },
    { name: 'camp_3', type: 'number' },
    { name: 'tota_publ_3', type: 'number' },
    { name: 'tota_punt_3', type: 'number' },
    { name: 'tota_perd_3', type: 'number' },
    { name: 'sald_punt_3', type: 'number' },
    { name: 'sald_docu_3', type: 'number' },
    { name: 'esta_cart_3', type: 'string' },
    { name: 'camp_4', type: 'number' },
    { name: 'tota_publ_4', type: 'number' },
    { name: 'tota_punt_4', type: 'number' },
    { name: 'tota_perd_4', type: 'number' },
    { name: 'sald_punt_4', type: 'number' },
    { name: 'sald_docu_4', type: 'number' },
    { name: 'esta_cart_4', type: 'string' },
    { name: 'camp_5', type: 'number' },
    { name: 'tota_publ_5', type: 'number' },
    { name: 'tota_punt_5', type: 'number' },
    { name: 'tota_perd_5', type: 'number' },
    { name: 'sald_punt_5', type: 'number' },
    { name: 'sald_docu_5', type: 'number' },
    { name: 'esta_cart_5', type: 'string' },
    { name: 'camp_6', type: 'number' },
    { name: 'tota_publ_6', type: 'number' },
    { name: 'tota_punt_6', type: 'number' },
    { name: 'tota_perd_6', type: 'number' },
    { name: 'sald_punt_6', type: 'number' },
    { name: 'sald_docu_6', type: 'number' },
    { name: 'esta_cart_6', type: 'string' },
    { name: 'camp_7', type: 'number' },
    { name: 'tota_publ_7', type: 'number' },
    { name: 'tota_punt_7', type: 'number' },
    { name: 'tota_perd_7', type: 'number' },
    { name: 'sald_punt_7', type: 'number' },
    { name: 'sald_docu_7', type: 'number' },
    { name: 'esta_cart_7', type: 'string' },
    { name: 'camp_8', type: 'number' },
    { name: 'tota_publ_8', type: 'number' },
    { name: 'tota_punt_8', type: 'number' },
    { name: 'tota_perd_8', type: 'number' },
    { name: 'sald_punt_8', type: 'number' },
    { name: 'sald_docu_8', type: 'number' },
    { name: 'esta_cart_8', type: 'string' },
    { name: 'camp_9', type: 'number' },
    { name: 'tota_publ_9', type: 'number' },
    { name: 'tota_punt_9', type: 'number' },
    { name: 'tota_perd_9', type: 'number' },
    { name: 'sald_punt_9', type: 'number' },
    { name: 'sald_docu_9', type: 'number' },
    { name: 'esta_cart_9', type: 'string' },
    { name: 'tota_punt', type: 'number' },
    { name: 'tota_perd', type: 'number' },
    { name: 'sald_punt', type: 'number' },
    { name: 'vent_cata', type: 'number' },
    { name: 'desc_segm', type: 'string' },
    { name: 'crec_azzo', type: 'string' },
    { name: 'clie_gema', type: 'string' },
    { name: 'nive_gema', type: 'string' },
  ],
  datatype: 'json',
})

const adaptadorGlobal = new jqx.dataAdapter(sourceGlobal.value)
const refGridGlobal = ref()
const localization = appStore.localization

onMounted(async () => {
  appStore.titulo(`Reportes / Segmentación asesora`)
  await obtenerAno()
  await obtenerPeriodo()
  await obtenerZona()
})

const obtenerAno = async () => {
  appStore.mensaje('Obteniendo años')
  appStore.loading(true)

  const fecha = new Date()
  const anno = fecha.getFullYear()

  anoOptions.value.push({
    id: anno,
    text: anno,
  })

  anoOptions.value.push({
    id: anno - 1,
    text: anno - 1,
  })

  anoOptions.value.push({
    id: anno - 2,
    text: anno - 2,
  })
  appStore.loading(false)
}

const obtenerPeriodo = async () => {
  
  appStore.mensaje('Obteniendo periodos')
  appStore.loading(true)

  periodoOptions.value.push({
    id: 'I',
    text: 'I',
  })

  periodoOptions.value.push({
    id: 'II',
    text: 'II',
  })
  appStore.loading(false)
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

    sourceGlobal.value.localdata = []
    refGridGlobal.value.updatebounddata('cells')
    refGridGlobal.value.refreshfilterrow()

    const { data } = await $api(`/api/sami/v1/reportes/segmentacion-asesora`, {
      method: "GET",
      query: {
        anio: (formulario.value.ano === null) ? '' : formulario.value.ano,
        periodo: (formulario.value.periodo === null) ? '' : formulario.value.periodo,
        zona: (formulario.value.zona === null) ? '' : formulario.value.zona,
      },
    })

    sourceGlobal.value.localdata =  data.data_glob
    refGridGlobal.value.updatebounddata('cells')
    refGridGlobal.value.refreshfilterrow()
    
  } catch (error) {
    if (typeof error.response != "undefined") {
      const { data } = error.response._data    
      if (typeof data != "undefined") {
        for (var key in data)
        {
          if (key == 'anio') {
            errorAno.value = true
            errorMensajeAno.value = data[key]
          }
          if (key == 'periodo') {
            errorPeriodo.value = true
            errorMensajePeriodo.value = data[key]
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
    ano: null,
    periodo: null,
    zona: null,
  }
  sourceGlobal.value.localdata = []
  refGridGlobal.value.updatebounddata('cells')
  refGridGlobal.value.refreshfilterrow()
}

const onExcel = async () => {
  try {
    appStore.mensaje('Generando archivo')
    appStore.loading(true)

    const { data } = await $api(`/api/sami/v1/reportes/segmentacion-asesora/excel`, {
      method: "POST",
      body: {
        cabecera: cabecera.value,
        detalle: JSON.stringify(refGridGlobal.value.exportdata('xml')),
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
  errorAno.value = false
  errorMensajeAno.value = ''
  errorPeriodo.value = false
  errorMensajePeriodo.value = ''
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
                      v-model="formulario.ano"
                      :items="anoOptions"
                      label="Año"
                      placeholder="Seleccionar año"
                      item-title="text"
                      item-value="id"
                      :error="errorAno"
                      :error-messages="errorMensajeAno"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="4"
                  >
                    <AppSelect
                      v-model="formulario.periodo"
                      :items="periodoOptions"
                      label="Periodo"
                      placeholder="Seleccionar periodo"
                      item-title="text"
                      item-value="id"
                      :error="errorPeriodo"
                      :error-messages="errorMensajePeriodo"
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
            <VCard title="Lista asesora">
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
  </div>
</template>
