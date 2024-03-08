<!-- eslint-disable camelcase -->
<script setup>
import { useAppStore } from '@/stores/app'
import { VDataTable } from 'vuetify/labs/VDataTable'

definePage({
  meta: {
    action: 'peru/repo_come_segu_cier_camp_regi',
    subject: 'peru/repo_come_segu_cier_camp_regi',
  },
})

const userData = JSON.parse(localStorage.getItem('userData'))
const appStore = useAppStore()

const formulario = ref({
  campana: null,
  area: null,
})

const general = ref({
  objetivoIncorporacion: '0',
  facturadoIncorporacion: '0',
  cumplimientoIncorporacion: '0.00',
  facturadoPendienteIncorporacion: '0',
  cumplimientoTotalIncorporacion: '0.00',
  objetivoRetencion: '0',
  facturadoRetencion: '0',
  cumplimientoRetencion: '0.00',
  facturadoPendienteRetencion: '0',
  cumplimientoTotalRetencion: '0.00',
  objetivoActividad: '0.00',
  facturadoActividad: '0.00',
  cumplimientoActividad: '0.00',
  facturadoPendienteActividad: '0.00',
  cumplimientoTotalActividad: '0.00',
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
const items = ref([])

const headers = computed(() => {
  if(selectedVariable.value === 0) {
    return [
      {
        title: 'Corte',
        key: 'codi_cort',
      },
      {
        title: 'Zona',
        key: 'codi_zona',
      },
      {
        title: 'Gerente zonal',
        key: 'nomb_vend',
      },
      {
        title: 'Act. inic.',
        key: 'acti_fina_ante',
      },
      {
        title: 'Objetivo',
        key: 'obje_tota',
      },
      {
        title: '% Proyección',
        key: 'obje_tota_prim',
      },
      {
        title: '% Reproyección',
        key: 'obje_tota_segu',
      },
      {
        title: 'Estimación',
        key: 'obje_tota_cier',
      },
      {
        title: '% Estimación',
        key: 'porc_tota_cier',
      },
      {
        title: 'Facturado',
        key: 'fact_tota',
      },
      {
        title: 'Cump. Fact.',
        key: 'cump_fact_tota',
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
        title: '% Cump.',
        key: 'cump_tota',
      },
      {
        title: 'Dife. tota.',
        key: 'dife_tota',
      },
      {
        title: 'Objetivo',
        key: 'obje_inco',
      },
      {
        title: '% Proyección',
        key: 'obje_inco_prim',
      },
      {
        title: '% Reproyección',
        key: 'obje_inco_segu',
      },
      {
        title: 'Estimación',
        key: 'obje_inco_cier',
      },
      {
        title: '% Estimación',
        key: 'porc_inco_cier',
      },
      {
        title: 'Facturado',
        key: 'fact_inco',
      },
      {
        title: 'Cump. Fact.',
        key: 'cump_fact_inco',
      },
      {
        title: 'Pend. fact.',
        key: 'pend_fact_inco',
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
        title: 'Objetivo',
        key: 'obje_rete',
      },
      {
        title: '% Proyección',
        key: 'obje_rete_prim',
      },
      {
        title: '% Reproyección',
        key: 'obje_rete_segu',
      },
      {
        title: 'Estimación',
        key: 'obje_rete_cier',
      },
      {
        title: '% Estimación',
        key: 'porc_rete_cier',
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
        title: 'Pend. fact.',
        key: 'pend_fact_rete',
      },
      {
        title: 'Total',
        key: 'tota_rete',
      },
      {
        title: '% Cump.',
        key: 'cump_rete',
      },
      {
        title: 'Dife. rete.',
        key: 'dife_rete',
      },
      {
        title: 'Objetivo',
        key: 'obje_acti',
      },
      {
        title: 'Estimación',
        key: 'obje_acti_cier',
      },
      {
        title: 'Obje. pedi.',
        key: 'nume_pedi_acti',
      },
      {
        title: '% Acti. fact.',
        key: 'porc_acti',
      },
      {
        title: '% Acti. pend.',
        key: 'porc_acti_pend',
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
        title: 'Cump. fact.',
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
        title: 'Pend. fact.',
        key: 'pend_fact_pe21',
      },
      {
        title: 'Total',
        key: 'tota_pe21',
      },
      {
        title: '% Ret. pend.',
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
        title: '% Ret. fact.',
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
        title: '% Ret. pend.',
        key: 'cump_pe42',
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
        title: '% Cump',
        key: 'cump_rein',
      },
      {
        title: 'Objetivo',
        key: 'obje_capi',
      },
      {
        title: 'Estimación',
        key: 'obje_capi_cier',
      },
      {
        title: 'Facturado',
        key: 'fact_capi',
      },
      {
        title: 'Capi. pend.',
        key: 'pend_capi',
      },
      {
        title: 'Pedi. falt. obje.',
        key: 'pend_capi_obje',
      },
      {
        title: 'Venta',
        key: 'valo_docu',
      },
      {
        title: 'Objetivo 88%',
        key: 'obje_docu',
      },
      {
        title: 'Saldo 21di.',
        key: 'sald_21di',
      },
      {
        title: 'Pend por Cobr 88%',
        key: 'pend_cobr',
      },
      {
        title: '% Cobr. 21di.',
        key: 'porc_21di',
      },
      {
        title: 'Saldo actu.',
        key: 'sald_docu',
      },
      {
        title: '% Cobr. actu.',
        key: 'porc_docu',
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
        title: 'Observación',
        key: 'obse_zona',
      },
    ]
  } else if(selectedVariable.value === 1) {
    return [
      {
        title: 'Corte',
        key: 'codi_cort',
      },
      {
        title: 'Zona',
        key: 'codi_zona',
      },
      {
        title: 'Gerente zonal',
        key: 'nomb_vend',
      },
      {
        title: 'Act. inic.',
        key: 'acti_fina_ante',
      },
      {
        title: 'Objetivo',
        key: 'obje_tota',
      },
      {
        title: '% Proyección',
        key: 'obje_tota_prim',
      },
      {
        title: '% Reproyección',
        key: 'obje_tota_segu',
      },
      {
        title: 'Estimación',
        key: 'obje_tota_cier',
      },
      {
        title: '% Estimación',
        key: 'porc_tota_cier',
      },
      {
        title: 'Facturado',
        key: 'fact_tota',
      },
      {
        title: 'Cump. Fact.',
        key: 'cump_fact_tota',
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
        title: '% Cump.',
        key: 'cump_tota',
      },
      {
        title: 'Dife. tota.',
        key: 'dife_tota',
      },
      {
        title: 'Objetivo',
        key: 'obje_inco',
      },
      {
        title: '% Proyección',
        key: 'obje_inco_prim',
      },
      {
        title: '% Reproyección',
        key: 'obje_inco_segu',
      },
      {
        title: 'Estimación',
        key: 'obje_inco_cier',
      },
      {
        title: '% Estimación',
        key: 'porc_inco_cier',
      },
      {
        title: 'Facturado',
        key: 'fact_inco',
      },
      {
        title: 'Cump. Fact.',
        key: 'cump_fact_inco',
      },
      {
        title: 'Pend. fact.',
        key: 'pend_fact_inco',
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
        title: 'Objetivo',
        key: 'obje_rete',
      },
      {
        title: '% Proyección',
        key: 'obje_rete_prim',
      },
      {
        title: '% Reproyección',
        key: 'obje_rete_segu',
      },
      {
        title: 'Estimación',
        key: 'obje_rete_cier',
      },
      {
        title: '% Estimación',
        key: 'porc_rete_cier',
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
        title: 'Pend. fact.',
        key: 'pend_fact_rete',
      },
      {
        title: 'Total',
        key: 'tota_rete',
      },
      {
        title: '% Cump.',
        key: 'cump_rete',
      },
      {
        title: 'Dife. rete.',
        key: 'dife_rete',
      },
      {
        title: 'Observación',
        key: 'obse_zona',
      },
    ]
  } else if (selectedVariable.value === 2) {
    return [
      {
        title: 'Corte',
        key: 'codi_cort',
      },
      {
        title: 'Zona',
        key: 'codi_zona',
      },
      {
        title: 'Gerente zonal',
        key: 'nomb_vend',
      },
      {
        title: 'Act. inic.',
        key: 'acti_fina_ante',
      },
      {
        title: 'Objetivo',
        key: 'obje_acti',
      },
      {
        title: 'Estimación',
        key: 'obje_acti_cier',
      },
      {
        title: 'Obje. pedi.',
        key: 'nume_pedi_acti',
      },
      {
        title: '% Acti. fact.',
        key: 'porc_acti',
      },
      {
        title: '% Acti. pend.',
        key: 'porc_acti_pend',
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
        title: 'Pend. fact.',
        key: 'pend_fact_pe21',
      },
      {
        title: 'Total',
        key: 'tota_pe21',
      },
      {
        title: '% Ret. pend.',
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
        title: '% Ret. fact.',
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
        title: '% Ret. pend.',
        key: 'cump_pe42',
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
        title: 'Observación',
        key: 'obse_zona',
      },
    ]
  } else if (selectedVariable.value === 3) {
    return [
      {
        title: 'Corte',
        key: 'codi_cort',
      },
      {
        title: 'Zona',
        key: 'codi_zona',
      },
      {
        title: 'Gerente zonal',
        key: 'nomb_vend',
      },
      {
        title: 'Act. inic.',
        key: 'acti_fina_ante',
      },
      {
        title: 'Objetivo',
        key: 'obje_rete',
      },
      {
        title: '% Proyección',
        key: 'obje_rete_prim',
      },
      {
        title: '% Reproyección',
        key: 'obje_rete_segu',
      },
      {
        title: 'Estimación',
        key: 'obje_rete_cier',
      },
      {
        title: '% Estimación',
        key: 'porc_rete_cier',
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
        title: 'Pend. fact.',
        key: 'pend_fact_rete',
      },
      {
        title: 'Total',
        key: 'tota_rete',
      },
      {
        title: '% Cump.',
        key: 'cump_rete',
      },
      {
        title: 'Dife. rete.',
        key: 'dife_rete',
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
        title: 'Pend. fact.',
        key: 'pend_fact_pe21',
      },
      {
        title: 'Total',
        key: 'tota_pe21',
      },
      {
        title: '% Ret. pend.',
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
        title: '% Ret. fact.',
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
        title: '% Ret. pend.',
        key: 'cump_pe42',
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
        title: '% Cump',
        key: 'cump_rein',
      },
      {
        title: 'Observación',
        key: 'obse_zona',
      },
    ]
  } else if (selectedVariable.value === 4) {
    return [
      {
        title: 'Corte',
        key: 'codi_cort',
      },
      {
        title: 'Zona',
        key: 'codi_zona',
      },
      {
        title: 'Gerente zonal',
        key: 'nomb_vend',
      },
      {
        title: 'Act. inic.',
        key: 'acti_fina_ante',
      },
      {
        title: 'Objetivo',
        key: 'obje_inco',
      },
      {
        title: '% Proyección',
        key: 'obje_inco_prim',
      },
      {
        title: '% Reproyección',
        key: 'obje_inco_segu',
      },
      {
        title: 'Estimación',
        key: 'obje_inco_cier',
      },
      {
        title: '% Estimación',
        key: 'porc_inco_cier',
      },
      {
        title: 'Facturado',
        key: 'fact_inco',
      },
      {
        title: 'Cump. Fact.',
        key: 'cump_fact_inco',
      },
      {
        title: 'Pend. fact.',
        key: 'pend_fact_inco',
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
        title: '% Cump',
        key: 'cump_rein',
      },
      {
        title: 'Objetivo',
        key: 'obje_capi',
      },
      {
        title: 'Estimación',
        key: 'obje_capi_cier',
      },
      {
        title: 'Facturado',
        key: 'fact_capi',
      },
      {
        title: 'Capi. pend.',
        key: 'pend_capi',
      },
      {
        title: 'Pedi. falt. obje.',
        key: 'pend_capi_obje',
      },
      {
        title: 'Observación',
        key: 'obse_zona',
      },
    ]
  } else if (selectedVariable.value === 5) {
    return [
      {
        title: 'Corte',
        key: 'codi_cort',
      },
      {
        title: 'Zona',
        key: 'codi_zona',
      },
      {
        title: 'Gerente zonal',
        key: 'nomb_vend',
      },
      {
        title: 'Act. inic.',
        key: 'acti_fina_ante',
      },
      {
        title: 'Venta',
        key: 'valo_docu',
      },
      {
        title: 'Objetivo 88%',
        key: 'obje_docu',
      },
      {
        title: 'Saldo 21di.',
        key: 'sald_21di',
      },
      {
        title: 'Pend por Cobr 88%',
        key: 'pend_cobr',
      },
      {
        title: '% Cobr. 21di.',
        key: 'porc_21di',
      },
      {
        title: 'Saldo actu.',
        key: 'sald_docu',
      },
      {
        title: '% Cobr. actu.',
        key: 'porc_docu',
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
        title: 'Observación',
        key: 'obse_zona',
      },
    ]
  } else if (selectedVariable.value === 6) {
    return [
      {
        title: 'Corte',
        key: 'codi_cort',
      },
      {
        title: 'Zona',
        key: 'codi_zona',
      },
      {
        title: 'Gerente zonal',
        key: 'nomb_vend',
      },
      {
        title: 'Act. inic.',
        key: 'acti_fina_ante',
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
        title: 'Cump. fact.',
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
        title: 'Observación',
        key: 'obse_zona',
      },
    ]
  }
})
      
const campanaOptions = ref([])
const errorCampana = ref(false)
const errorMensajeCampana = ref('')

const areaOptions = ref([])
const errorArea = ref(false)
const errorMensajeArea = ref('')

const loginData = JSON.parse(localStorage.getItem('login'))

onMounted(async () => {
  appStore.titulo(`Reportes / Seguimiento cierre región`)
  await obtenerCampana()
  await obtenerArea()
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

const obtenerArea = async () => {
  try {
    appStore.mensaje('Obteniendo area')
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
      facturadoIncorporacion: '0',
      cumplimientoIncorporacion: '0.00',
      facturadoPendienteIncorporacion: '0',
      cumplimientoTotalIncorporacion: '0.00',
      objetivoRetencion: '0',
      facturadoRetencion: '0',
      cumplimientoRetencion: '0.00',
      facturadoPendienteRetencion: '0',
      cumplimientoTotalRetencion: '0.00',
      objetivoActividad: '0.00',
      facturadoActividad: '0.00',
      cumplimientoActividad: '0.00',
      facturadoPendienteActividad: '0.00',
      cumplimientoTotalActividad: '0.00',
    }
    items.value = []

    const { data } = await $api(`/api/sami/v1/reportes/seguimiento-cierre-region`, {
      method: "get",
      query: {
        campana: (formulario.value.campana === null) ? '' : formulario.value.campana,
        area: (formulario.value.area === null) ? '' : formulario.value.area,
      },
    })

    items.value = data.data_glob

    general.value = {
      objetivoIncorporacion: data.obje_inco,
      facturadoIncorporacion: data.fact_inco,
      cumplimientoIncorporacion: data.cump_fact_inco,
      facturadoPendienteIncorporacion: data.pend_fact_inco,
      cumplimientoTotalIncorporacion: data.cump_pend_fact_inco,
      objetivoRetencion: data.obje_rete,
      facturadoRetencion: data.fact_rete,
      cumplimientoRetencion: data.cump_fact_rete,
      facturadoPendienteRetencion: data.pend_fact_rete,
      cumplimientoTotalRetencion: data.cump_pend_fact_rete,
      objetivoActividad: data.obje_acti,
      facturadoActividad: data.fact_acti,
      cumplimientoActividad: data.cump_fact_acti,
      facturadoPendienteActividad: data.pend_fact_acti,
      cumplimientoTotalActividad: data.cump_pend_fact_acti,
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
        if (key == 'area') {
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
  general.value = {
    objetivoIncorporacion: '0',
    facturadoIncorporacion: '0',
    cumplimientoIncorporacion: '0.00',
    facturadoPendienteIncorporacion: '0',
    cumplimientoTotalIncorporacion: '0.00',
    objetivoRetencion: '0',
    facturadoRetencion: '0',
    cumplimientoRetencion: '0.00',
    facturadoPendienteRetencion: '0',
    cumplimientoTotalRetencion: '0.00',
    objetivoActividad: '0.00',
    facturadoActividad: '0.00',
    cumplimientoActividad: '0.00',
    facturadoPendienteActividad: '0.00',
    cumplimientoTotalActividad: '0.00',
  }
  items.value = []
}

const onExcel = async () => {
  try {
    appStore.mensaje('Generando archivo')
    appStore.loading(true)

    const { data } = await $api(`/api/sami/v1/reportes/seguimiento-cierre-region/excel`, {
      method: "post",
      body: {
        general: general.value,
        variable: selectedVariable.value,
        data: items.value,
        cabecera: headers.value,
      },
    })
    
    window.open(`${$base}/temporales/${data}`, '_blank')
  } catch (e) {
  }
  finally {
    appStore.loading(false)
  }
}

const onRegistrar = async () => {
  if(items.value.length == 0 ) {
    appStore.mensajeSnackbar('No tiene ningun seguimiento de cierre por egistrar.')
    appStore.color("error")
    appStore.snackbar(true)
  } else if (selectedVariable.value !== 0) {
    appStore.mensajeSnackbar('Para registrar la proyección debe de estar marcada la variable "Todos".')
    appStore.color("error")
    appStore.snackbar(true)
  } else {
    try {
      appStore.mensaje('Generando proceso')
      appStore.loading(true)

      const { data } = await $api(`/api/sami/v1/reportes/seguimiento-cierre-region`, {
        method: "post",
        body: {
          campana: (formulario.value.campana === null) ? '' : formulario.value.campana,
          data: items.value,
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
  errorArea.value = false
  errorMensajeArea.value = ''
}

const actualizarItem = (item, columna) => {
  const indexItem = items.value.indexOf(item)
  const data = items.value[indexItem]
  if(columna === 'obje_inco_cier') {
    let objeReteCier = data.obje_rete_cier
    let objeTota = data.obje_tota
    let objeInco = data.obje_inco
    const objeIncoCier = parseInt(data.obje_inco_cier)
    if (!Number.isNaN(objeIncoCier)) {
      objeReteCier = parseInt(objeReteCier)
      objeTota = parseInt(objeTota)
      objeInco = parseInt(objeInco)
      let objeTotaCier = parseInt(objeReteCier) + parseInt(objeIncoCier)
      let porcIncoCier = (parseInt(objeIncoCier) / parseInt(objeInco)) * 100
      porcIncoCier = parseFloat(porcIncoCier).toFixed(2)
      let porcTotaCier = (parseInt(objeTotaCier) / parseInt(objeTota)) * 100
      porcTotaCier = parseFloat(porcTotaCier).toFixed(2)

      data.porc_inco_cier = porcIncoCier
      data.obje_tota_cier = objeTotaCier
      data.porc_tota_cier = porcTotaCier
    }
  } else if (columna === 'obje_rete_cier') {
    let objeIncoCier = data.obje_inco_cier
    let objeTota = data.obje_tota
        
    let objeRete = data.obje_rete
    const objeReteCier = parseInt(data.obje_rete_cier)
    if (!Number.isNaN(objeReteCier)) {
      objeIncoCier = parseInt(objeIncoCier)
      objeTota = parseInt(objeTota)
      objeRete = parseInt(objeRete)

      const objeTotaCier = parseInt(objeReteCier) + parseInt(objeIncoCier)
      let porcReteCier = (parseInt(objeReteCier) / parseInt(objeRete)) * 100
      porcReteCier = parseFloat(porcReteCier).toFixed(2)
      let porcTotaCier = (parseInt(objeTotaCier) / parseInt(objeTota)) * 100
      porcTotaCier = parseFloat(porcTotaCier).toFixed(2)

      data.porc_rete_cier = porcReteCier
      data.obje_tota_cier = objeTotaCier
      data.porc_tota_cier = porcTotaCier
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
                  <VCol
                    cols="12"
                    md="4"
                  >
                    <AppSelect
                      v-model="formulario.area"
                      :items="areaOptions"
                      label="Area"
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
                      <th class="text-uppercase">
                        FACT. + PEND.
                      </th>
                      <th class="text-uppercase">
                        % CUMP. TOTAL
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Incorporación</td>
                      <td>{{ general.objetivoIncorporacion }}</td>
                      <td>{{ general.facturadoIncorporacion }}</td>
                      <td>{{ general.cumplimientoIncorporacion }}</td>
                      <td>{{ general.facturadoPendienteIncorporacion }}</td>
                      <td>{{ general.cumplimientoTotalIncorporacion }}</td>
                    </tr>
                    <tr>
                      <td>Retención</td>
                      <td>{{ general.objetivoRetencion }}</td>
                      <td>{{ general.facturadoRetencion }}</td>
                      <td>{{ general.cumplimientoRetencion }}</td>
                      <td>{{ general.facturadoPendienteRetencion }}</td>
                      <td>{{ general.cumplimientoTotalRetencion }}</td>
                    </tr>
                    <tr>
                      <td>% Actividad</td>
                      <td>{{ general.objetivoActividad }}</td>
                      <td>{{ general.facturadoActividad }}</td>
                      <td>{{ general.cumplimientoActividad }}</td>
                      <td>{{ general.facturadoPendienteActividad }}</td>
                      <td>{{ general.cumplimientoTotalActividad }}</td>
                    </tr>
                  </tbody>
                </VTable>
              </VCardText>
            </VCard>
          </VCol>

          <VCol cols="12">
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
            <VCard>
              <VDataTable
                :headers="headers"
                :items="items"
                :items-per-page="-1"
                class="text-no-wrap"
                
                fixed-header
                height="400"
              > 
                <template #headers>
                  <tr>
                    <th rowspan="2">
                      CORTE
                    </th>
                    <th rowspan="2">
                      ZONA
                    </th>
                    <th rowspan="2">
                      GERENTE
                    </th>
                    <th rowspan="2">
                      ACT. INIC.
                    </th>
                    <th
                      v-if="selectedVariable === 0 || selectedVariable === 1"
                      class="text-center"
                      colspan="11"
                    >
                      PEDIDOS TOTALES
                    </th>
                    <th
                      v-if="selectedVariable === 0 || selectedVariable === 1 || selectedVariable === 4"
                      class="text-center"
                      colspan="10"
                    >
                      INCORPORACIÓN
                    </th>
                    <th
                      v-if="selectedVariable === 0 || selectedVariable === 1 || selectedVariable === 3"
                      class="text-center"
                      colspan="11"
                    >
                      PEDIDOS DE RETENCIÓN
                    </th>
                    <th
                      v-if="selectedVariable === 0 || selectedVariable === 2"
                      class="text-center"
                      colspan="5"
                    >
                      % ACTIVIDAD
                    </th>
                    <th
                      v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3 || selectedVariable === 6"
                      class="text-center"
                      colspan="7"
                    >
                      CONSECUTIVIDAD PEDIDOS DE RETENCIÓN 90%
                    </th>
                    <th
                      v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3 || selectedVariable === 6"
                      class="text-center"
                      colspan="6"
                    >
                      CONSECUTIVIDAD 2do pedido 100%
                    </th>
                    <th
                      v-if="selectedVariable === 0 || selectedVariable === 6"
                      class="text-center"
                      colspan="6"
                    >
                      CONSECUTIVIDAD 3er pedido 80%'
                    </th>
                    <th
                      v-if="selectedVariable === 0 || selectedVariable === 6"
                      class="text-center"
                      colspan="6"
                    >
                      CONSECUTIVIDAD 4to pedido 70%
                    </th>
                    <th
                      v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3"
                      class="text-center"
                      colspan="7"
                    >
                      Peg21 40%
                    </th>
                    <th
                      v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3"
                      class="text-center"
                      colspan="7"
                    >
                      Peg42 30%
                    </th>
                    <th
                      v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3 || selectedVariable === 4"
                      class="text-center"
                      colspan="7"
                    >
                      Peg63 25%
                    </th>
                    <th
                      v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3"
                      class="text-center"
                      colspan="7"
                    >
                      Suma Pegs 35%
                    </th>
                    <th
                      v-if="selectedVariable === 0 || selectedVariable === 3 || selectedVariable === 4"
                      class="text-center"
                      colspan="7"
                    >
                      Reingresos 10%
                    </th>
                    <th
                      v-if="selectedVariable === 0 || selectedVariable === 4"
                      class="text-center"
                      colspan="5"
                    >
                      Capitalización
                    </th>
                    <th
                      v-if="selectedVariable === 0 || selectedVariable === 5"
                      rowspan="2"
                    >
                      VENTA
                    </th>
                    <th
                      v-if="selectedVariable === 0 || selectedVariable === 5"
                      rowspan="2"
                    >
                      OBJETIVO 88%
                    </th>
                    <th
                      v-if="selectedVariable === 0 || selectedVariable === 5"
                      rowspan="2"
                    >
                      SALDO 21DI
                    </th>
                    <th
                      v-if="selectedVariable === 0 || selectedVariable === 5"
                      rowspan="2"
                    >
                      PEND POR COBR 88%
                    </th>
                    <th
                      v-if="selectedVariable === 0 || selectedVariable === 5"
                      rowspan="2"
                    >
                      % COBR. 21DI.
                    </th>
                    <th
                      v-if="selectedVariable === 0 || selectedVariable === 5"
                      rowspan="2"
                    >
                      SALDO ACTU.
                    </th>
                    <th
                      v-if="selectedVariable === 0 || selectedVariable === 5"
                      rowspan="2"
                    >
                      % COBR. ACTU.
                    </th>
                    <th
                      v-if="selectedVariable === 0 || selectedVariable === 5"
                      rowspan="2"
                    >
                      FACTURADO
                    </th>
                    <th
                      v-if="selectedVariable === 0 || selectedVariable === 5"
                      rowspan="2"
                    >
                      RECEPCIONADO
                    </th>
                    <th rowspan="2">
                      OBSERVACIÓN &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </th>
                  </tr>
                  <tr>
                    <th v-if="selectedVariable === 0 || selectedVariable === 1">
                      OBJETIVO
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 1">
                      % PROYECCIÓN
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 1">
                      % REPROYECCIÓN
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 1">
                      ESTIMACIÓN
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 1">
                      % ESTIMACIÓN
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 1">
                      FACTURADO
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 1">
                      CUMP. FACT.
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 1">
                      PEND. FACT.
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 1">
                      TOTAL
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 1">
                      % CUMP.
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 1">
                      DIFE. TOTA.
                    </th>
                
                    <th v-if="selectedVariable === 0 || selectedVariable === 1 || selectedVariable === 4">
                      OBJETIVO
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 1 || selectedVariable === 4">
                      % PROYECCIÓN
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 1 || selectedVariable === 4">
                      % REPROYECCIÓN
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 1 || selectedVariable === 4">
                      ESTIMACIÓN
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 1 || selectedVariable === 4">
                      % ESTIMACIÓN
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 1 || selectedVariable === 4">
                      FACTURADO
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 1 || selectedVariable === 4">
                      CUMP. FACT.
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 1 || selectedVariable === 4">
                      PEND. FACT.
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 1 || selectedVariable === 4">
                      TOTAL
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 1 || selectedVariable === 4">
                      % CUMP.
                    </th>

                    <th v-if="selectedVariable === 0 || selectedVariable === 1 || selectedVariable === 3">
                      OBJETIVO
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 1 || selectedVariable === 3">
                      % PROYECCIÓN
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 1 || selectedVariable === 3">
                      % REPROYECCIÓN
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 1 || selectedVariable === 3">
                      ESTIMACIÓN
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 1 || selectedVariable === 3">
                      % ESTIMACIÓN
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 1 || selectedVariable === 3">
                      FACTURADO
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 1 || selectedVariable === 3">
                      CUMP. FACT.
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 1 || selectedVariable === 3">
                      PEND. FACT.
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 1 || selectedVariable === 3">
                      TOTAL
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 1 || selectedVariable === 3">
                      % CUMP.
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 1 || selectedVariable === 3">
                      DIFE. RETE.
                    </th>

                    <th v-if="selectedVariable === 0 || selectedVariable === 2">
                      OBJETIVO
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 2">
                      ESTIMACIÓN
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 2">
                      OBJE. PEDI.
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 2">
                      % ACTI. FACT.
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 2">
                      % ACTI. PEND.
                    </th>

                    <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3 || selectedVariable === 6">
                      RETE. CAMP. ANT.
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3 || selectedVariable === 6">
                      OBJETIVO
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3 || selectedVariable === 6">
                      FACTURADO
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3 || selectedVariable === 6">
                      CUMP. FACT.
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3 || selectedVariable === 6">
                      PEND. FACT.
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3 || selectedVariable === 6">
                      TOTAL
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3 || selectedVariable === 6">
                      % CUMP.
                    </th>
                
                    <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3 || selectedVariable === 6">
                      1 CAMP. ANTE.
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3 || selectedVariable === 6">
                      FACTURADO
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3 || selectedVariable === 6">
                      CUMP. FACT.
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3 || selectedVariable === 6">
                      PEND. FACT.
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3 || selectedVariable === 6">
                      TOTAL
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3 || selectedVariable === 6">
                      % CUMP.
                    </th>

                    <th v-if="selectedVariable === 0 || selectedVariable === 6">
                      2 CAMP. ANTE.
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 6">
                      FACTURADO
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 6">
                      CUMP. FACT.
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 6">
                      PEND. FACT.
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 6">
                      TOTAL
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 6">
                      % CUMP.
                    </th>

                    <th v-if="selectedVariable === 0 || selectedVariable === 6">
                      3 CAMP. ANTE.
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 6">
                      FACTURADO
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 6">
                      CUMP. FACT.
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 6">
                      PEND. FACT.
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 6">
                      TOTAL
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 6">
                      % CUMP.
                    </th>

                    <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3">
                      PEG21
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3">
                      OBJETIVO
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3">
                      RET. PEG21
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3">
                      % RET. FACT.
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3">
                      PEND. FACT.
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3">
                      TOTAL
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3">
                      % RET. PEND.
                    </th>

                    <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3">
                      PEG42
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3">
                      OBJETIVO
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3">
                      RET. PEG42
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3">
                      % RET. FACT.
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3">
                      PEND. FACT.
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3">
                      TOTAL
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3">
                      % RET. PEND.
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3 || selectedVariable === 4">
                      PEG63
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3 || selectedVariable === 4">
                      OBJETIVO
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3 || selectedVariable === 4">
                      RET. PEG63
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3 || selectedVariable === 4">
                      % RET. FACT.
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3 || selectedVariable === 4">
                      PEND. FACT.
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3 || selectedVariable === 4">
                      TOTAL
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3 || selectedVariable === 4">
                      % RET. PEND.
                    </th>

                    <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3">
                      PEGS
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3">
                      OBJETIVO
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3">
                      RET. PEGS
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3">
                      CUMP. FACT.
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3">
                      PEND. FACT.
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3">
                      TOTAL
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 2 || selectedVariable === 3">
                      % CUMP
                    </th>
                
                    <th v-if="selectedVariable === 0 || selectedVariable === 3 || selectedVariable === 4">
                      POS. REING.
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 3 || selectedVariable === 4">
                      OBJETIVO
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 3 || selectedVariable === 4">
                      FACTURADO
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 3 || selectedVariable === 4">
                      CUMP. FACT.
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 3 || selectedVariable === 4">
                      PEND. FACT.
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 3 || selectedVariable === 4">
                      TOTAL
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 3 || selectedVariable === 4">
                      % CUMP
                    </th>
                
                    <th v-if="selectedVariable === 0 || selectedVariable === 4">
                      OBJETIVO
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 4">
                      ESTIMACIÓN
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 4">
                      FACTURADO
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 4">
                      CAPI. PEND.
                    </th>
                    <th v-if="selectedVariable === 0 || selectedVariable === 4">
                      PEDI. FALT. OBJE.
                    </th>
                  </tr>
                </template>
                <template #item.porc_tota_cier="{ item }">
                  <VChip
                    v-if="parseFloat(item.porc_tota_cier).toFixed(2) >= 100"
                    color="success"
                  >
                    {{ item.porc_tota_cier }}
                  </VChip>
                  <VChip
                    v-else-if="parseFloat(item.porc_tota_cier).toFixed(2) >= 90"
                    color="secondary"
                  >
                    {{ item.porc_tota_cier }}
                  </VChip>
                  <VChip
                    v-else
                    color="error"
                  >
                    {{ item.porc_tota_cier }}
                  </VChip>
                </template>
                <template #item.cump_fact_tota="{ item }">
                  <div v-if="parseInt(item.obje_tota) === 0">
                    {{ item.cump_fact_tota }}
                  </div>
                  <VChip
                    v-else-if="parseFloat(item.cump_fact_tota).toFixed(2) >= 100"
                    color="success"
                  >
                    {{ item.cump_fact_tota }}
                  </VChip>
                  <VChip
                    v-else-if="parseFloat(item.cump_fact_tota).toFixed(2) >= 80"
                    color="secondary"
                  >
                    {{ item.cump_fact_tota }}
                  </VChip>
                  <VChip
                    v-else
                    color="error"
                  >
                    {{ item.cump_fact_tota }}
                  </VChip>
                </template>
                <template #item.dife_tota="{ item }">
                  <div
                    v-if="parseInt(item.dife_tota).toFixed(2) >= 0"
                    color="success"
                  >
                    {{ item.dife_tota }}
                  </div>
                  <VChip
                    v-else
                    color="error"
                  >
                    {{ item.dife_tota }}
                  </VChip>
                </template>
                <template #item.porc_inco_cier="{ item }">
                  <VChip
                    v-if="parseFloat(item.porc_inco_cier).toFixed(2) >= 100"
                    color="success"
                  >
                    {{ item.porc_inco_cier }}
                  </VChip>
                  <VChip
                    v-else-if="parseFloat(item.porc_inco_cier).toFixed(2) >= 90"
                    color="secondary"
                  >
                    {{ item.porc_inco_cier }}
                  </VChip>
                  <VChip
                    v-else
                    color="error"
                  >
                    {{ item.porc_inco_cier }}
                  </VChip>
                </template>
                <template #item.cump_fact_inco="{ item }">
                  <div v-if="parseInt(item.obje_inco) === 0">
                    {{ item.cump_fact_inco }}
                  </div>
                  <VChip
                    v-else-if="parseFloat(item.cump_fact_inco).toFixed(2) >= 100"
                    color="success"
                  >
                    {{ item.cump_fact_inco }}
                  </VChip>
                  <VChip
                    v-else-if="parseFloat(item.cump_fact_inco).toFixed(2) >= 80"
                    color="secondary"
                  >
                    {{ item.cump_fact_inco }}
                  </VChip>
                  <VChip
                    v-else
                    color="error"
                  >
                    {{ item.cump_fact_inco }}
                  </VChip>
                </template>
                <template #item.porc_rete_cier="{ item }">
                  <VChip
                    v-if="parseFloat(item.porc_rete_cier).toFixed(2) >= 100"
                    color="success"
                  >
                    {{ item.porc_rete_cier }}
                  </VChip>
                  <VChip
                    v-else-if="parseFloat(item.porc_rete_cier).toFixed(2) >= 90"
                    color="secondary"
                  >
                    {{ item.porc_rete_cier }}
                  </VChip>
                  <VChip
                    v-else
                    color="error"
                  >
                    {{ item.porc_rete_cier }}
                  </VChip>
                </template>
                <template #item.cump_fact_rete="{ item }">
                  <div v-if="parseInt(item.obje_rete) === 0">
                    {{ item.cump_fact_rete }}
                  </div>
                  <VChip
                    v-else-if="parseFloat(item.cump_fact_rete).toFixed(2) >= 100"
                    color="success"
                  >
                    {{ item.cump_fact_rete }}
                  </VChip>
                  <VChip
                    v-else-if="parseFloat(item.cump_fact_rete).toFixed(2) >= 80"
                    color="secondary"
                  >
                    {{ item.cump_fact_rete }}
                  </VChip>
                  <VChip
                    v-else
                    color="error"
                  >
                    {{ item.cump_fact_rete }}
                  </VChip>
                </template>
                <template #item.porc_acti="{ item }">
                  <div v-if="parseFloat(item.obje_acti).toFixed(2) === '0.00'">
                    {{ item.porc_acti }}
                  </div>
                  <VChip
                    v-else-if="parseFloat(item.porc_acti).toFixed(2) >= parseFloat(item.obje_acti).toFixed(2)"
                    color="success"
                  >
                    {{ item.porc_acti }}
                  </VChip>
                  <VChip
                    v-else
                    color="error"
                  >
                    {{ item.porc_acti }}
                  </VChip>
                </template>
                <template #item.obje_rete_cons="{ item }">
                  <div v-if="parseInt(item.obje_rete_cons_sist) === 0">
                    {{ item.obje_rete_cons }}
                  </div>
                  <VChip
                    v-else-if="parseFloat(100 * (parseInt(item.obje_rete_cons) / parseInt(item.obje_rete_cons_sist))).toFixed(2) >= 100"
                    color="success"
                  >
                    {{ item.obje_rete_cons }}
                  </VChip>
                  <VChip
                    v-else-if="parseFloat(100 * (parseInt(item.obje_rete_cons) / parseInt(item.obje_rete_cons_sist))).toFixed(2) >= 80"
                    color="secondary"
                  >
                    {{ item.obje_rete_cons }}
                  </VChip>
                  <VChip
                    v-else
                    color="error"
                  >
                    {{ item.obje_rete_cons }}
                  </VChip>
                </template>
                <template #item.cump_fact_rete_cons="{ item }">
                  <div v-if="parseInt(item.obje_rete_cons) === 0">
                    {{ item.cump_fact_rete_cons }}
                  </div>
                  <VChip
                    v-else-if="parseFloat(item.cump_fact_rete_cons).toFixed(2) >= 100"
                    color="success"
                  >
                    {{ item.cump_fact_rete_cons }}
                  </VChip>
                  <VChip
                    v-else-if="parseFloat(item.cump_fact_rete_cons).toFixed(2) >= 90"
                    color="secondary"
                  >
                    {{ item.cump_fact_rete_cons }}
                  </VChip>
                  <VChip
                    v-else
                    color="error"
                  >
                    {{ item.cump_fact_rete_cons }}
                  </VChip>
                </template>
                <template #item.cump_fact_rete_cons_segu="{ item }">
                  <div v-if="parseInt(item.obje_rete_cons_segu) === 0">
                    {{ item.cump_fact_rete_cons_segu }}
                  </div>
                  <VChip
                    v-else-if="parseFloat(item.cump_fact_rete_cons_segu).toFixed(2) >= 100"
                    color="success"
                  >
                    {{ item.cump_fact_rete_cons_segu }}
                  </VChip>
                  <VChip
                    v-else-if="parseFloat(item.cump_fact_rete_cons_segu).toFixed(2) >= 80"
                    color="secondary"
                  >
                    {{ item.cump_fact_rete_cons_segu }}
                  </VChip>
                  <VChip
                    v-else
                    color="error"
                  >
                    {{ item.cump_fact_rete_cons_segu }}
                  </VChip>
                </template>
                <template #item.cump_fact_rete_cons_terc="{ item }">
                  <div v-if="parseInt(item.obje_rete_cons_terc) === 0">
                    {{ item.cump_fact_rete_cons_terc }}
                  </div>
                  <VChip
                    v-else-if="parseFloat(item.cump_fact_rete_cons_terc).toFixed(2) >= 100"
                    color="success"
                  >
                    {{ item.cump_fact_rete_cons_terc }}
                  </VChip>
                  <VChip
                    v-else-if="parseFloat(item.cump_fact_rete_cons_terc).toFixed(2) >= 80"
                    color="secondary"
                  >
                    {{ item.cump_fact_rete_cons_terc }}
                  </VChip>
                  <VChip
                    v-else
                    color="error"
                  >
                    {{ item.cump_fact_rete_cons_terc }}
                  </VChip>
                </template>
                <template #item.cump_fact_rete_cons_cuar="{ item }">
                  <div v-if="parseInt(item.obje_rete_cons_cuar) === 0">
                    {{ item.cump_fact_rete_cons_cuar }}
                  </div>
                  <VChip
                    v-else-if="parseFloat(item.cump_fact_rete_cons_cuar).toFixed(2) >= 100"
                    color="success"
                  >
                    {{ item.cump_fact_rete_cons_cuar }}
                  </VChip>
                  <VChip
                    v-else-if="parseFloat(item.cump_fact_rete_cons_cuar).toFixed(2) >= 80"
                    color="secondary"
                  >
                    {{ item.cump_fact_rete_cons_cuar }}
                  </VChip>
                  <VChip
                    v-else
                    color="error"
                  >
                    {{ item.cump_fact_rete_cons_cuar }}
                  </VChip>
                </template>
                <template #item.obje_pe21="{ item }">
                  <div v-if="parseInt(item.obje_pe21) === 0">
                    {{ item.obje_pe21 }}
                  </div>
                  <VChip
                    v-else-if="parseFloat(100 * (parseInt(item.obje_pe21) / parseInt(item.obje_pe21_sist))).toFixed(2) >= 100"
                    color="success"
                  >
                    {{ item.obje_pe21 }}
                  </VChip>
                  <VChip
                    v-else-if="parseFloat(100 * (parseInt(item.obje_pe21) / parseInt(item.obje_pe21_sist))).toFixed(2) >= 80"
                    color="secondary"
                  >
                    {{ item.obje_pe21 }}
                  </VChip>
                  <VChip
                    v-else
                    color="error"
                  >
                    {{ item.obje_pe21 }}
                  </VChip>
                </template>
                <template #item.porc_pe21="{ item }">
                  <div v-if="parseInt(item.obje_pe21) === 0">
                    {{ item.porc_pe21 }}
                  </div>
                  <VChip
                    v-else-if="parseFloat(item.porc_pe21).toFixed(2) >= 100"
                    color="success"
                  >
                    {{ item.porc_pe21 }}
                  </VChip>
                  <VChip
                    v-else-if="parseFloat(item.porc_pe21).toFixed(2) >= 90"
                    color="secondary"
                  >
                    {{ item.porc_pe21 }}
                  </VChip>
                  <VChip
                    v-else
                    color="error"
                  >
                    {{ item.porc_pe21 }}
                  </VChip>
                </template>
                <template #item.obje_pe42="{ item }">
                  <div v-if="parseInt(item.obje_pe42) === 0">
                    {{ item.obje_pe42 }}
                  </div>
                  <VChip
                    v-else-if="parseFloat(100 * (parseInt(item.obje_pe42) / parseInt(item.obje_pe42_sist))).toFixed(2) >= 100"
                    color="success"
                  >
                    {{ item.obje_pe42 }}
                  </VChip>
                  <VChip
                    v-else-if="parseFloat(100 * (parseInt(item.obje_p42) / parseInt(item.obje_pe42_sist))).toFixed(2) >= 80"
                    color="secondary"
                  >
                    {{ item.obje_pe42 }}
                  </VChip>
                  <VChip
                    v-else
                    color="error"
                  >
                    {{ item.obje_pe42 }}
                  </VChip>
                </template>
                <template #item.porc_pe42="{ item }">
                  <div v-if="parseInt(item.obje_pe42) === 0">
                    {{ item.porc_pe42 }}
                  </div>
                  <VChip
                    v-else-if="parseFloat(item.porc_pe42).toFixed(2) >= 100"
                    color="success"
                  >
                    {{ item.porc_pe42 }}
                  </VChip>
                  <VChip
                    v-else-if="parseFloat(item.porc_pe42).toFixed(2) >= 90"
                    color="secondary"
                  >
                    {{ item.porc_pe42 }}
                  </VChip>
                  <VChip
                    v-else
                    color="error"
                  >
                    {{ item.porc_pe42 }}
                  </VChip>
                </template>
                <template #item.obje_pe63="{ item }">
                  <div v-if="parseInt(item.obje_pe63) === 0">
                    {{ item.obje_pe63 }}
                  </div>
                  <VChip
                    v-else-if="parseFloat(100 * (parseInt(item.obje_pe63) / parseInt(item.obje_pe63_sist))).toFixed(2) >= 100"
                    color="success"
                  >
                    {{ item.obje_pe63 }}
                  </VChip>
                  <VChip
                    v-else-if="parseFloat(100 * (parseInt(item.obje_p63) / parseInt(item.obje_pe63_sist))).toFixed(2) >= 80"
                    color="secondary"
                  >
                    {{ item.obje_pe63 }}
                  </VChip>
                  <VChip
                    v-else
                    color="error"
                  >
                    {{ item.obje_pe63 }}
                  </VChip>
                </template>
                <template #item.porc_pe63="{ item }">
                  <div v-if="parseInt(item.obje_pe63) === 0">
                    {{ item.porc_pe63 }}
                  </div>
                  <VChip
                    v-else-if="parseFloat(item.porc_pe63).toFixed(2) >= 100"
                    color="success"
                  >
                    {{ item.porc_pe63 }}
                  </VChip>
                  <VChip
                    v-else-if="parseFloat(item.porc_pe63).toFixed(2) >= 90"
                    color="secondary"
                  >
                    {{ item.porc_pe63 }}
                  </VChip>
                  <VChip
                    v-else
                    color="error"
                  >
                    {{ item.porc_pe63 }}
                  </VChip>
                </template>
                <template #item.obje_pegs="{ item }">
                  <div v-if="parseInt(item.obje_pegs) === 0">
                    {{ item.obje_pegs }}
                  </div>
                  <VChip
                    v-else-if="parseFloat(100 * (parseInt(item.obje_pegs) / parseInt(item.obje_pegs_sist))).toFixed(2) >= 100"
                    color="success"
                  >
                    {{ item.obje_pegs }}
                  </VChip>
                  <VChip
                    v-else-if="parseFloat(100 * (parseInt(item.obje_pegs) / parseInt(item.obje_pegs_sist))).toFixed(2) >= 80"
                    color="secondary"
                  >
                    {{ item.obje_pegs }}
                  </VChip>
                  <VChip
                    v-else
                    color="error"
                  >
                    {{ item.obje_pegs }}
                  </VChip>
                </template>
                <template #item.porc_pegs="{ item }">
                  <div v-if="parseInt(item.obje_pegs) === 0">
                    {{ item.porc_pegs }}
                  </div>
                  <VChip
                    v-else-if="parseFloat(item.porc_pegs).toFixed(2) >= 100"
                    color="success"
                  >
                    {{ item.porc_pegs }}
                  </VChip>
                  <VChip
                    v-else-if="parseFloat(item.porc_pegs).toFixed(2) >= 90"
                    color="secondary"
                  >
                    {{ item.porc_pegs }}
                  </VChip>
                  <VChip
                    v-else
                    color="error"
                  >
                    {{ item.porc_pe63 }}
                  </VChip>
                </template>            
                <template #item.obje_rein="{ item }">
                  <div v-if="parseInt(item.obje_rein) === 0">
                    {{ item.obje_rein }}
                  </div>
                  <VChip
                    v-else-if="parseFloat(100 * (parseInt(item.obje_rein) / parseInt(item.obje_rein_sist))).toFixed(2) >= 100"
                    color="success"
                  >
                    {{ item.obje_rein }}
                  </VChip>
                  <VChip
                    v-else-if="parseFloat(100 * (parseInt(item.obje_rein) / parseInt(item.obje_rein_sist))).toFixed(2) >= 80"
                    color="secondary"
                  >
                    {{ item.obje_rein }}
                  </VChip>
                  <VChip
                    v-else
                    color="error"
                  >
                    {{ item.obje_rein }}
                  </VChip>
                </template>
                <template #item.porc_rein="{ item }">
                  <div v-if="parseInt(item.obje_rein) === 0">
                    {{ item.porc_rein }}
                  </div>
                  <VChip
                    v-else-if="parseFloat(item.porc_rein).toFixed(2) >= 100"
                    color="success"
                  >
                    {{ item.porc_rein }}
                  </VChip>
                  <VChip
                    v-else-if="parseFloat(item.porc_rein).toFixed(2) >= 90"
                    color="secondary"
                  >
                    {{ item.porc_rein }}
                  </VChip>
                  <VChip
                    v-else
                    color="error"
                  >
                    {{ item.porc_rein }}
                  </VChip>
                </template>
                <template #item.fact_capi="{ item }">
                  <div v-if="parseInt(item.obje_capi) === 0">
                    {{ item.fact_capi }}
                  </div>
                  <VChip
                    v-else-if="parseInt(item.fact_capi) >= parseInt(item.obje_capi)"
                    color="success"
                  >
                    {{ item.fact_capi }}
                  </VChip>
                  <VChip
                    v-else-if="parseInt(item.fact_capi) >= 1 && (parseInt(item.fact_capi) < parseInt(item.obje_capi))"
                    color="secondary"
                  >
                    {{ item.fact_capi }}
                  </VChip>
                  <VChip
                    v-else
                    color="error"
                  >
                    {{ item.fact_capi }}
                  </VChip>
                </template>
                <template #item.pend_capi_obje="{ item }">
                  <div v-if="parseInt(item.pend_capi_obje) >= 0">
                    {{ item.pend_capi_obje }}
                  </div>
                  <VChip
                    v-else
                    color="error"
                  >
                    {{ item.pend_capi_obje }}
                  </VChip>
                </template>
                <template #item.porc_21di="{ item }">
                  <div v-if="parseFloat(item.porc_21di).toFixed(2) === '0.00'">
                    {{ item.porc_21di }}
                  </div>
                  <VChip
                    v-else-if="parseFloat(item.porc_21di).toFixed(2) >= 88"
                    color="success"
                  >
                    {{ item.porc_21di }}
                  </VChip>
                  <VChip
                    v-else
                    color="error"
                  >
                    {{ item.porc_21di }}
                  </VChip>
                </template>
                <template #item.obje_inco_cier="{ item }">
                  <AppTextField
                    v-model="item.obje_inco_cier"
                    placeholder=""
                    flat
                    @update:model-value="actualizarItem(item, 'obje_inco_cier')"
                  />
                </template>
                <template #item.obje_rete_cier="{ item }">
                  <AppTextField
                    v-model="item.obje_rete_cier"
                    placeholder=""
                    flat
                    @update:model-value="actualizarItem(item, 'obje_rete_cier')"
                  />
                </template>
                <template #item.obje_acti_cier="{ item }">
                  <AppTextField
                    v-model="item.obje_acti_cier"
                    placeholder=""
                    flat
                  />
                </template>
                <template #item.obje_capi_cier="{ item }">
                  <AppTextField
                    v-model="item.obje_capi_cier"
                    placeholder=""
                    flat
                  />
                </template>
                <template #item.obse_zona="{ item }">
                  <AppTextField
                    v-model="item.obse_zona"
                    placeholder=""
                    flat
                  />
                </template>
            
                <template #bottom />
              </VDataTable>
            </VCard>
          </VCol>
        </VRow>
      </template>
    </AppPlantilla>
  </div>
</template>
