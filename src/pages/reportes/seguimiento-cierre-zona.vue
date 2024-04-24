<!-- eslint-disable camelcase -->
<script setup>
import { useAppStore } from '@/stores/app'
import JqxGrid from 'jqwidgets-scripts/jqwidgets-vue3/vue_jqxgrid.vue'

definePage({
  meta: {
    action: 'peru/repo_come_segu_cier_camp',
    subject: 'peru/repo_come_segu_cier_camp',
  },
})

const appStore = useAppStore()

const formulario = ref({
  campana: null,
  zona: null,
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


const claseCumplimientoTotal = (row, columnfield, value) => {
  const dataRecord = refGridGlobal.value.getrowdata(
    row,
  )
  
  const objeTota = parseInt(dataRecord.obje_tota)
  const cumpTota = parseFloat(value).toFixed(2)
  if (objeTota === 0) {
    return ''
  } else if (cumpTota >= 100) {
    return 'text-success'
  } else if (cumpTota >= 80 && cumpTota < 100) {
    return 'text-warning'
  }
  
  return 'text-error'
}

const claseDiferenciaTotal = (row, columnfield, value) => {
  
  const difeRete = parseInt(value)

  if (difeRete >= 0) {
    return (
      ``
    )
  }
  
  return (
    `text-error`
  )
}

const claseCumplimientoIncorporacion = (row, columnfield, value) => {
  const dataRecord = refGridGlobal.value.getrowdata(
    row,
  )
  
  const objeInco = parseInt(dataRecord.obje_inco)
  const cumpInco = parseFloat(value).toFixed(2)

  if (objeInco === 0) {
    return ''
  } else if (cumpInco >= 100) {
    return 'text-success'
  } else if (cumpInco >= 80 && cumpInco < 100) {
    return 'text-warning'
  }
  
  return 'text-error'
}

const claseCumplimientoRetencion = (row, columnfield, value) => {
  const dataRecord = refGridGlobal.value.getrowdata(
    row,
  )
  
  const objeRete = parseInt(dataRecord.obje_rete)
  const cumpRete = parseFloat(value).toFixed(2)

  if (objeRete === 0) {
    return ''
  } else if (cumpRete >= 100) {
    return 'text-success'
  } else if (cumpRete >= 95 && cumpRete < 100) {
    return 'text-warning'
  }
  
  return 'text-error'
}
    
// eslint-disable-next-line sonarjs/no-identical-functions
const claseDiferenciaRetencion = (row, columnfield, value) => {
  
  const difeRete = parseInt(value)

  if (difeRete >= 0) {
    return (
      ``
    )
  }
  
  return (
    `text-error`
  )
}
    
const clasePorcentajeActividad =(row, columnfield, value) => {
  const dataRecord = refGridGlobal.value.getrowdata(
    row,
  )

  const objeActi = parseFloat(dataRecord.obje_acti).toFixed(2)
  const porcActi = parseFloat(value).toFixed(2)
  if (objeActi === '0.00') {
    return ''
  } else if (porcActi >= objeActi) {
    return 'text-success'
  }
  
  return 'text-error'
}
    
const claseObtetivoConsecutiva = (row, columnfield, value) => {
  const dataRecord = refGridGlobal.value.getrowdata(
    row,
  )
  
  const objeReteSist = parseInt(dataRecord.obje_rete_cons_sist)
  
  const objeRete = parseInt(value)
  let porcReteCons = 100 * (objeRete / objeReteSist)
  porcReteCons = parseFloat(porcReteCons).toFixed(2)

  if (objeReteSist === 0) {
    return (
      ``
    )
  } else if (porcReteCons >= 100) {
    return (
      `text-success`
    )
  } else if (porcReteCons >= 80 && porcReteCons < 100) {
    return (
      `text-warning`
    )
  }
  
  return (
    `text-error`
  )
}

const claseCumplimientoConsecutiva = (row, columnfield, value) => {
  const dataRecord = refGridGlobal.value.getrowdata(
    row,
  )
  
  const objeReteCons = parseInt(dataRecord.obje_rete_cons)
  const porcReteCons = parseFloat(value).toFixed(2)

  if (objeReteCons === 0) {
    return ''
  } else if (porcReteCons >= 100) {
    return 'text-success'
  } else if (porcReteCons >= 90 && porcReteCons < 100) {
    return 'text-warning'
  }
  
  return 'text-error'
}

const claseCumplimientoConsecutividadSegundoRetencion = (row, columnfield, value) => {
  const dataRecord = refGridGlobal.value.getrowdata(row)
  
  const objeData = parseInt(dataRecord.obje_rete_cons_segu)
  const valoData = parseFloat(value).toFixed(2)

  if (objeData === 0) {
    return ''
  } else if (valoData >= 100) {
    return 'text-success'
  } else if (valoData >= 80 && valoData < 100) {
    return 'text-warning'
  }
  
  return 'text-error'
}

const claseCumplimientoConsecutividadTercerRetencion = (
  row,
  columnfield,
  value,
) => {
  const dataRecord = refGridGlobal.value.getrowdata(
    row,
  )
  
  const objeData = parseInt(dataRecord.obje_rete_cons_terc)
  const valoData = parseFloat(value).toFixed(2)

  if (objeData === 0) {
    return ''
  } else if (valoData >= 80) {
    return 'text-success'
  } else if (valoData >= 70 && valoData < 80) {
    return 'text-warning'
  }
  
  return 'text-error'
}

const claseCumplimientoConsecutividadCuartoRetencion = (
  row,
  columnfield,
  value,
) => {
  const dataRecord = refGridGlobal.value.getrowdata(
    row,
  )
  
  const objeData = parseInt(dataRecord.obje_rete_cons_cuar)
  const valoData = parseFloat(value).toFixed(2)

  if (objeData === 0) {
    return ''
  } else if (valoData >= 70) {
    return 'text-success'
  } else if (valoData >= 60 && valoData < 70) {
    return 'text-warning'
  }
  
  return 'text-error'
}

const claseObjetivoPeg21 = (row, columnfield, value) => {
  const dataRecord = refGridGlobal.value.getrowdata(
    row,
  )
  
  const objePe21 = parseInt(dataRecord.obje_pe21_sist)
  
  const factPe21 = parseInt(value)

  let porcPe21 = 100 * (factPe21 / objePe21)
  porcPe21 = parseFloat(porcPe21).toFixed(2)

  if (factPe21 === 0) {
    return (
      ``
    )
  } else if (porcPe21 >= 100) {
    return (
      `text-success`
    )
  } else if (porcPe21 >= 80 && porcPe21 < 100) {
    return (
      `text-warning`
    )
  }
  
  return (
    `text-error`
  )
}

const clasePorcentajePeg21 = (row, columnfield, value) => {
  const dataRecord = refGridGlobal.value.getrowdata(
    row,
  )
  
  const objePe21 = parseInt(dataRecord.obje_pe21)
  const porcPe21 = parseFloat(value).toFixed(2)

  if (objePe21 === 0) {
    return ''
  } else if (porcPe21 >= 100) {
    return 'text-success'
  } else if (porcPe21 >= 90 && porcPe21 < 100) {
    return 'text-warning'
  }
  
  return 'text-error'
}

const claseObjetivoPeg42 = (row, columnfield, value) => {
  const dataRecord = refGridGlobal.value.getrowdata(
    row,
  )
  
  const objePe42 = parseInt(dataRecord.obje_pe42_sist)
  
  const factPe42 = parseInt(value)

  let porcPe42 = 100 * (factPe42 / objePe42)
  porcPe42 = parseFloat(porcPe42).toFixed(2)

  if (factPe42 === 0) {
    return (
      ``
    )
  } else if (porcPe42 >= 100) {
    return (
      `text-success`
    )
  } else if (porcPe42 >= 80 && porcPe42 < 100) {
    return (
      `text-warning`
    )
  }
  
  return (
    `text-error`
  )
}

const clasePorcentajePeg42 =(row, columnfield, value) => {
  const dataRecord = refGridGlobal.value.getrowdata(
    row,
  )

  const objePe42 = parseInt(dataRecord.obje_pe42)
  const porcPe42 = parseFloat(value).toFixed(2)

  if (objePe42 === 0) {
    return ''
  } else if (porcPe42 >= 100) {
    return 'text-success'
  } else if (porcPe42 >= 90 && porcPe42 < 100) {
    return 'text-warning'
  }
  
  return 'text-error'
}

const claseObjetivoPeg63 = (row, columnfield, value) => {
  const dataRecord = refGridGlobal.value.getrowdata(
    row,
  )

  const objePe63 = parseInt(dataRecord.obje_pe63_sist)
  const factPe63 = parseInt(value)

  let porcPe63 = 100 * (factPe63 / objePe63)
  porcPe63 = parseFloat(porcPe63).toFixed(2)

  if (factPe63 === 0) {
    return (
      ``
    )
  } else if (porcPe63 >= 100) {
    return (
      `text-success`
    )
  } else if (porcPe63 >= 80 && porcPe63 < 100) {
    return (
      `text-warning`
    )
  }
  
  return (
    `text-error`
  )
}

const clasePorcentajePeg63 = (row, columnfield, value) => {
  const dataRecord = refGridGlobal.value.getrowdata(
    row,
  )
  
  const objePe63 = parseInt(dataRecord.obje_pe63)
  const porcPe63 = parseFloat(value).toFixed(2)

  if (objePe63 === 0) {
    return ''
  } else if (porcPe63 >= 100) {
    return 'text-success'
  } else if (porcPe63 >= 90 && porcPe63 < 100) {
    return 'text-warning'
  }
  
  return 'text-error'
}

const claseObjetivoPegs = (row, columnfield, value) => {
  const dataRecord = refGridGlobal.value.getrowdata(
    row,
  )
  
  const objePegs = parseInt(dataRecord.obje_pegs_sist)
  
  const factPegs = parseInt(value)

  let porcPegs = 100 * (factPegs / objePegs)
  porcPegs = parseFloat(porcPegs).toFixed(2)

  if (factPegs === 0) {
    return (
      ``
    )
  } else if (porcPegs >= 100) {
    return (
      `text-success`
    )
  } else if (porcPegs >= 80 && porcPegs < 100) {
    return (
      `text-warning`
    )
  }
  
  return (
    `text-error`
  )
}

const clasePorcentajePegs = (row, columnfield, value) => {
  const dataRecord = refGridGlobal.value.getrowdata(
    row,
  )
  
  const objePegs = parseInt(dataRecord.obje_pegs)
  const porcPegs = parseFloat(value).toFixed(2)

  if (objePegs === 0) {
    return ''
  } else if (porcPegs >= 100) {
    return 'text-success'
  } else if (porcPegs >= 90 && porcPegs < 100) {
    return 'text-warning'
  }
  
  return 'text-error'
}

const claseObjetivoReingreso = (row, columnfield, value) => {
  const dataRecord = refGridGlobal.value.getrowdata(
    row,
  )
  
  const objeRein = parseInt(dataRecord.obje_rein_sist)
  
  const factRein = parseInt(value)

  let porcRein = 100 * (factRein / objeRein)
  porcRein = parseFloat(porcRein).toFixed(2)

  if (factRein === 0) {
    return (
      ``
    )
  } else if (porcRein >= 100) {
    return (
      `text-success`
    )
  } else if (porcRein >= 80 && porcRein < 100) {
    return (
      `text-warning`
    )
  }
  
  return (
    `text-error`
  )
}

const clasePorcentajeReingreso = (row, columnfield, value) => {
  const dataRecord = refGridGlobal.value.getrowdata(
    row,
  )

  const objeRein = parseInt(dataRecord.obje_rein)
  const factRein = parseFloat(value).toFixed(2)

  if (objeRein === 0) {
    return ''
  } else if (factRein >= 100) {
    return 'text-success'
  } else if (factRein >= 90 && factRein < 100) {
    return 'text-warning'
  }
  
  return 'text-error'
}

const claseCumplimientoCapitalizacion = (row, columnfield, value) => {
  const dataRecord = refGridGlobal.value.getrowdata(
    row,
  )
  
  const objeCapi = parseInt(dataRecord.obje_capi)
  
  const factCapi = parseInt(value)

  if (objeCapi === 0) {
    return ''
  } else if (factCapi >= objeCapi) {
    return 'text-success'
  } else if (factCapi >= 1 && factCapi < objeCapi) {
    return 'text-warning'
  }
  
  return 'text-error'
}

// eslint-disable-next-line sonarjs/no-identical-functions
const claseObjetivoCapitalizacion = (row, columnfield, value) => {
  const difeRete = parseInt(value)

  if (difeRete >= 0) {
    return (
      ``
    )
  }
  
  return (
    `text-error`
  )
}

const clasePorcentaje21dias = (row, columnfield, value) => {
  const valoData = parseFloat(value).toFixed(2)
  const data = 88
  if (valoData === '0.00') {
    return ''
  } else if (valoData >= data) {
    return 'text-success'
  }
  
  return 'text-error'
}

const cabecera = computed(() => {
  if(selectedVariable.value === 0) {
    return [
      {
        title: 'Sector',
        key: 'codi_sect',
      },
      {
        title: 'Lider',
        key: 'nomb_lide',
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
        title: 'Facturado',
        key: 'fact_tota',
      },
      {
        title: 'Cump. fact.',
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
        title: 'Facturado',
        key: 'fact_inco',
      },
      {
        title: 'Cump. fact.',
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
        title: '% Ret. pend.',
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
        title: '% Ret. pend.',
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
        title: 'Valor',
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
        title: 'Pend por cobr 88%',
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
        title: 'Nivel',
        key: 'nive_lide',
      },
      {
        title: 'Nivel proyectado',
        key: 'nive_lide_proy',
      },
    ]
  } else if(selectedVariable.value === 1) {
    return [
      {
        title: 'Sector',
        key: 'codi_sect',
      },
      {
        title: 'Lider',
        key: 'nomb_lide',
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
        title: 'Facturado',
        key: 'fact_tota',
      },
      {
        title: 'Cump. fact.',
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
        title: 'Facturado',
        key: 'fact_inco',
      },
      {
        title: 'Cump. fact.',
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
    ]
  } else if (selectedVariable.value === 2) {
    return [
      {
        title: 'Sector',
        key: 'codi_sect',
      },
      {
        title: 'Lider',
        key: 'nomb_lide',
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
        title: '% Ret. pend.',
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
        title: '% Ret. pend.',
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
    ]
  } else if (selectedVariable.value === 3) {
    return [
      {
        title: 'Sector',
        key: 'codi_sect',
      },
      {
        title: 'Lider',
        key: 'nomb_lide',
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
        title: '% Ret. pend.',
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
        title: '% Ret. pend.',
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
        title: 'Nivel',
        key: 'nive_lide',
      },
      {
        title: 'Nivel proyectado',
        key: 'nive_lide_proy',
      },
    ]
  } else if (selectedVariable.value === 4) {
    return [
      {
        title: 'Sector',
        key: 'codi_sect',
      },
      {
        title: 'Lider',
        key: 'nomb_lide',
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
        title: 'Facturado',
        key: 'fact_inco',
      },
      {
        title: 'Cump. fact.',
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
    ]
  } else if (selectedVariable.value === 5) {
    return [
      {
        title: 'Sector',
        key: 'codi_sect',
      },
      {
        title: 'Lider',
        key: 'nomb_lide',
      },
      {
        title: 'Act. inic.',
        key: 'acti_fina_ante',
      },
      {
        title: 'Valor',
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
        title: 'Pend por cobr 88%',
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
    ]
  } else if (selectedVariable.value === 6) {
    return [
      {
        title: 'Sector',
        key: 'codi_sect',
      },
      {
        title: 'Lider',
        key: 'nomb_lide',
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
    ]
  }
  
})

let sumaFact = 0
let sumaObje = 0
let sumaActiInic = 0
let sumaNumePedi = 0
let sumaTotaIngr = 0
let sumaTotaRein = 0
      
const columnas = [
  {
    text: 'Sector',
    datafield: 'codi_sect',
    width: '60',
    align: 'center',
    cellsalign: 'center',
    pinned: true,
    filtertype: 'checkedlist',
  },
  {
    text: 'Lider',
    datafield: 'nomb_lide',
    width: '250',
    align: 'center',
    cellsalign: 'left',
    pinned: true,
  },
  {
    text: 'Act. inic.',
    datafield: 'acti_fina_ante',
    width: '80',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    pinned: true,
    aggregates: [
      {
        'T': function(aggregatedValue, currentValue) {   
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
  },
  {
    text: 'Objetivo',
    datafield: 'obje_tota',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    aggregates: [
      {
        'T': function(aggregatedValue, currentValue) {   
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
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'tota',
  },
  {
    text: 'Cump. fact.',
    datafield: 'cump_fact_tota',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P2',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue, column, record) {
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.fact_tota
          sumaObje += record.obje_tota
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
    cellclassname: claseCumplimientoTotal,
  },
  {
    text: 'Pend. fact.',
    datafield: 'pend_fact_tota',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue) {
          
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
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'tota',
  },
  {
    text: '% Cump.',
    datafield: 'cump_tota',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P2',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue, column, record) {
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.tota_tota
          sumaObje += record.obje_tota
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
    text: 'Dife. tota.',
    datafield: 'dife_tota',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'tota',
    cellclassname: claseDiferenciaTotal,
  },
  {
    text: 'Objetivo',
    datafield: 'obje_inco',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue) {
          
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
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'inco',
  },
  {
    text: 'Cump. fact.',
    datafield: 'cump_fact_inco',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P2',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue, column, record) {
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.fact_inco
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
    text: 'Pend. fact.',
    datafield: 'pend_fact_inco',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue) {
          
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
    width: '100',
    align: 'center',
    cellsalign: 'center',

    cellsformat: 'N',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'inco',
  },
  {
    text: '% Cump.',
    datafield: 'cump_inco',
    width: '100',
    align: 'center',
    cellsalign: 'center',

    cellsformat: 'P2',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue, column, record) {
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.tota_inco
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
  },
  {
    text: 'Objetivo',
    datafield: 'obje_rete',
    width: '120',
    align: 'center',
    cellsalign: 'center',

    cellsformat: 'N',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'rete',
  },
  {
    text: 'Facturado',
    datafield: 'fact_rete',
    width: '100',
    align: 'center',
    cellsalign: 'center',

    cellsformat: 'N',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'rete',
  },
  {
    text: 'Cump. fact.',
    datafield: 'cump_fact_rete',
    width: '100',
    align: 'center',
    cellsalign: 'center',

    cellsformat: 'P2',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue, column, record) {
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.fact_rete
          sumaObje += record.obje_rete
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
    cellclassname: claseCumplimientoRetencion,
  },
  {
    text: 'Pend. fact.',
    datafield: 'pend_fact_rete',
    width: '100',
    align: 'center',
    cellsalign: 'center',

    cellsformat: 'N',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'rete',
  },
  {
    text: 'Total',
    datafield: 'tota_rete',
    width: '100',
    align: 'center',
    cellsalign: 'center',

    cellsformat: 'N',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'rete',
  },
  {
    text: '% Cump.',
    datafield: 'cump_rete',
    width: '100',
    align: 'center',
    cellsalign: 'center',

    cellsformat: 'P2',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue, column, record) {
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.tota_rete
          sumaObje += record.obje_rete
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
    text: 'Dife. rete.',
    datafield: 'dife_rete',
    width: '100',
    align: 'center',
    cellsalign: 'center',

    cellsformat: 'N',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'rete',
    cellclassname: claseDiferenciaRetencion,
  },
  {
    text: 'nume acti',
    datafield: 'nume_acti',
    hidden: true,
  },
  {
    text: 'Objetivo',
    datafield: 'obje_acti',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P2',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue, column, record) {
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.acti_fina_ante
          sumaObje += record.nume_pedi_acti
          let total = 0
          
          if (parseInt(sumaObje) > 0 && parseInt(sumaFact) > 0) {
            
            total = 100 * (parseFloat(sumaObje) / parseInt(sumaFact))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
    columngroup: 'acti',
  },
  {
    text: 'Obje. pedi.',
    datafield: 'nume_pedi_acti',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'acti',
  },
  {
    text: '% Acti. fact.',
    datafield: 'porc_acti',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P2',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue, column, record) {
          if (record.visibleindex === 0) {
            sumaActiInic = 0
            sumaNumePedi = 0
            sumaTotaIngr = 0
            sumaTotaRein = 0
          }
          sumaActiInic += record.acti_fina_ante
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
    cellclassname: clasePorcentajeActividad,
  },
  {
    text: '% Acti. pend.',
    datafield: 'porc_acti_pend',
    width: '100',
    align: 'center',
    cellsalign: 'center',

    cellsformat: 'P2',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue, column, record) {
          if (record.visibleindex === 0) {
            sumaActiInic = 0
            sumaNumePedi = 0
            sumaTotaIngr = 0
            sumaTotaRein = 0
          }
          sumaActiInic += record.acti_fina_ante
          sumaNumePedi += record.nume_pedi_pend
          sumaTotaIngr += record.tota_ingr_pend
          sumaTotaRein += record.tota_rein_pend
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
    text: 'Rete. camp. ant.',
    datafield: 'fact_rete_cons_ante',
    width: '100',
    align: 'center',
    cellsalign: 'center',

    cellsformat: 'N',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'cons',
  },
  {
    text: 'Objetivo',
    datafield: 'obje_rete_cons',
    width: '120',
    align: 'center',
    cellsalign: 'center',

    cellsformat: 'N',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'cons',
    cellclassname: claseObtetivoConsecutiva,
  },
  {
    text: 'Facturado',
    datafield: 'fact_rete_cons',
    width: '100',
    align: 'center',
    cellsalign: 'center',

    cellsformat: 'N',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'cons',
  },
  {
    text: 'Cump. fact.',
    datafield: 'cump_fact_rete_cons',
    width: '100',
    align: 'center',
    cellsalign: 'center',

    cellsformat: 'P2',
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
    columngroup: 'cons',
    cellclassname: claseCumplimientoConsecutiva,
  },
  {
    text: 'Pend. fact.',
    datafield: 'pend_fact_rete_cons',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    aggregates: [
      {
        'T': function(aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'cons',
  },
  {
    text: 'Total',
    datafield: 'tota_rete_cons',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    aggregates: [
      {
        'T': function(aggregatedValue, currentValue) {   
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'cons',
  },
  {
    text: '% Cump.',
    datafield: 'cump_rete_cons',
    width: '100',
    align: 'center',
    cellsalign: 'center',

    cellsformat: 'P2',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue, column, record) {
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.tota_rete_cons
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
    columngroup: 'cons',
  },
  {
    text: '1 Camp. ante.',
    datafield: 'obje_rete_cons_segu',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    aggregates: [
      {
        'T': function(aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'cons_segu',
  },
  {
    text: 'Facturado',
    datafield: 'fact_rete_cons_segu',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    aggregates: [
      {
        'T': function(aggregatedValue, currentValue) {   
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'cons_segu',
  },
  {
    text: 'Cump. fact.',
    datafield: 'cump_fact_rete_cons_segu',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P2',
    aggregates: [
      {
        'T': function(aggregatedValue, currentValue, column, record) {  
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.fact_rete_cons_segu
          sumaObje += record.obje_rete_cons_segu
          let total = 0
          
          if (parseInt(sumaObje) > 0 && parseInt(sumaFact) > 0) {
            
            total = 100 * (parseInt(sumaFact) / parseInt(sumaObje))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
    columngroup: 'cons_segu',
    cellclassname: claseCumplimientoConsecutividadSegundoRetencion,
  },
  {
    text: 'Pend. fact.',
    datafield: 'pend_fact_rete_cons_segu',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    aggregates: [
      {
        'T': function(aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'cons_segu',
  },
  {
    text: 'Total',
    datafield: 'tota_rete_cons_segu',
    width: '100',
    align: 'center',
    cellsalign: 'center',

    cellsformat: 'N',
    aggregates: [
      {
        'T': function(aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'cons_segu',
  },
  {
    text: '% Cump.',
    datafield: 'cump_rete_cons_segu',
    width: '100',
    align: 'center',
    cellsalign: 'center',

    cellsformat: 'P2',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue, column, record) {
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.tota_rete_cons_segu
          sumaObje += record.obje_rete_cons_segu
          let total = 0
          
          if (parseInt(sumaObje) > 0 && parseInt(sumaFact) > 0) {
            
            total = 100 * (parseInt(sumaFact) / parseInt(sumaObje))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
    columngroup: 'cons_segu',
  },
  {
    text: '2 Camp. ante.',
    datafield: 'obje_rete_cons_terc',
    width: '100',
    align: 'center',
    cellsalign: 'center',

    cellsformat: 'N',
    aggregates: [
      {
        'T': function(aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'cons_terc',
  },
  {
    text: 'Facturado',
    datafield: 'fact_rete_cons_terc',
    width: '100',
    align: 'center',
    cellsalign: 'center',

    cellsformat: 'N',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'cons_terc',
  },
  {
    text: 'Cump. fact.',
    datafield: 'cump_fact_rete_cons_terc',
    width: '100',
    align: 'center',
    cellsalign: 'center',

    cellsformat: 'P2',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue, column, record) {
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.fact_rete_cons_terc
          sumaObje += record.obje_rete_cons_terc
          let total = 0
          
          if (parseInt(sumaObje) > 0 && parseInt(sumaFact) > 0) {
            
            total = 100 * (parseInt(sumaFact) / parseInt(sumaObje))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
    columngroup: 'cons_terc',
    cellclassname: claseCumplimientoConsecutividadTercerRetencion,
  },
  {
    text: 'Pend. fact.',
    datafield: 'pend_fact_rete_cons_terc',
    width: '100',
    align: 'center',
    cellsalign: 'center',

    cellsformat: 'N',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'cons_terc',
  },
  {
    text: 'Total',
    datafield: 'tota_rete_cons_terc',
    width: '100',
    align: 'center',
    cellsalign: 'center',

    cellsformat: 'N',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'cons_terc',
  },
  {
    text: '% Cump.',
    datafield: 'cump_rete_cons_terc',
    width: '100',
    align: 'center',
    cellsalign: 'center',

    cellsformat: 'P2',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue, column, record) {
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.tota_rete_cons_terc
          sumaObje += record.obje_rete_cons_terc
          let total = 0
          
          if (parseInt(sumaObje) > 0 && parseInt(sumaFact) > 0) {
            
            total = 100 * (parseInt(sumaFact) / parseInt(sumaObje))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
    columngroup: 'cons_terc',
  },
  {
    text: '3 Camp. ante.',
    datafield: 'obje_rete_cons_cuar',
    width: '100',
    align: 'center',
    cellsalign: 'center',

    cellsformat: 'N',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'cons_cuar',
  },
  {
    text: 'Facturado',
    datafield: 'fact_rete_cons_cuar',
    width: '100',
    align: 'center',
    cellsalign: 'center',

    cellsformat: 'N',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'cons_cuar',
  },
  {
    text: 'Cump. fact.',
    datafield: 'cump_fact_rete_cons_cuar',
    width: '100',
    align: 'center',
    cellsalign: 'center',

    cellsformat: 'P2',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue, column, record) {
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.fact_rete_cons_cuar
          sumaObje += record.obje_rete_cons_cuar
          let total = 0
          
          if (parseInt(sumaObje) > 0 && parseInt(sumaFact) > 0) {
            
            total = 100 * (parseInt(sumaFact) / parseInt(sumaObje))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
    columngroup: 'cons_cuar',
    cellclassname: claseCumplimientoConsecutividadCuartoRetencion,
  },
  {
    text: 'Pend. fact.',
    datafield: 'pend_fact_rete_cons_cuar',
    width: '100',
    align: 'center',
    cellsalign: 'center',

    cellsformat: 'N',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'cons_cuar',
  },
  {
    text: 'Total',
    datafield: 'tota_rete_cons_cuar',
    width: '100',
    align: 'center',
    cellsalign: 'center',

    cellsformat: 'N',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'cons_cuar',
  },
  {
    text: '% Cump.',
    datafield: 'cump_rete_cons_cuar',
    width: '100',
    align: 'center',
    cellsalign: 'center',

    cellsformat: 'P2',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue, column, record) {
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.tota_rete_cons_cuar
          sumaObje += record.obje_rete_cons_cuar
          let total = 0
          
          if (parseInt(sumaObje) > 0 && parseInt(sumaFact) > 0) {
            
            total = 100 * (parseInt(sumaFact) / parseInt(sumaObje))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
    columngroup: 'cons_cuar',
  },
  {
    text: 'Peg21',
    datafield: 'fact_pe21_ante',
    width: '100',
    align: 'center',
    cellsalign: 'center',

    cellsformat: 'N',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'pe21',
  },
  {
    text: 'Objetivo',
    datafield: 'obje_pe21',
    width: '120',
    align: 'center',
    cellsalign: 'center',

    cellsformat: 'N',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'pe21',
    cellclassname: claseObjetivoPeg21,
  },
  {
    text: 'Ret. peg21',
    datafield: 'fact_pe21',
    width: '100',
    align: 'center',
    cellsalign: 'center',

    cellsformat: 'N',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'pe21',
  },
  {
    text: '% Ret. pend.',
    datafield: 'porc_pe21',
    width: '100',
    align: 'center',
    cellsalign: 'center',

    cellsformat: 'P2',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue, column, record) {
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.fact_pe21
          sumaObje += record.obje_pe21
          let total = 0
          
          if (parseInt(sumaObje) > 0 && parseInt(sumaFact) > 0) {
            
            total = 100 * (parseInt(sumaFact) / parseInt(sumaObje))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
    columngroup: 'pe21',
    cellclassname: clasePorcentajePeg21,
  },
  {
    text: 'Pend. fact.',
    datafield: 'pend_fact_pe21',
    width: '100',
    align: 'center',
    cellsalign: 'center',

    cellsformat: 'N',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'pe21',
  },
  {
    text: 'Total',
    datafield: 'tota_pe21',
    width: '100',
    align: 'center',
    cellsalign: 'center',

    cellsformat: 'N',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'pe21',
  },
  {
    text: '% Ret. pend.',
    datafield: 'cump_pe21',
    width: '100',
    align: 'center',
    cellsalign: 'center',

    cellsformat: 'P2',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue, column, record) {
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.tota_pe21
          sumaObje += record.obje_pe21
          let total = 0
          
          if (parseInt(sumaObje) > 0 && parseInt(sumaFact) > 0) {
            
            total = 100 * (parseInt(sumaFact) / parseInt(sumaObje))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
    columngroup: 'pe21',
  },
  {
    text: 'Peg42',
    datafield: 'fact_pe42_ante',
    width: '100',
    align: 'center',
    cellsalign: 'center',

    cellsformat: 'N',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'pe42',
  },
  {
    text: 'Objetivo',
    datafield: 'obje_pe42',
    width: '120',
    align: 'center',
    cellsalign: 'center',

    cellsformat: 'N',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'pe42',
    cellclassname: claseObjetivoPeg42,
  },
  {
    text: 'Ret. peg42',
    datafield: 'fact_pe42',
    width: '100',
    align: 'center',
    cellsalign: 'center',

    cellsformat: 'N',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'pe42',
  },
  {
    text: '% Ret. pend.',
    datafield: 'porc_pe42',
    width: '100',
    align: 'center',
    cellsalign: 'center',

    cellsformat: 'P2',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue, column, record) {
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.fact_pe42
          sumaObje += record.obje_pe42
          let total = 0
          
          if (parseInt(sumaObje) > 0 && parseInt(sumaFact) > 0) {
            
            total = 100 * (parseInt(sumaFact) / parseInt(sumaObje))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
    columngroup: 'pe42',
    cellclassname: clasePorcentajePeg42,
  },
  {
    text: 'Pend. fact.',
    datafield: 'pend_fact_pe42',
    width: '100',
    align: 'center',
    cellsalign: 'center',

    cellsformat: 'N',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'pe42',
  },
  {
    text: 'Total',
    datafield: 'tota_pe42',
    width: '100',
    align: 'center',
    cellsalign: 'center',

    cellsformat: 'N',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'pe42',
  },
  {
    text: '% Ret. pend.',
    datafield: 'cump_pe42',
    width: '100',
    align: 'center',
    cellsalign: 'center',

    cellsformat: 'P2',
    aggregates: [
      {      
        'T': function(aggregatedValue, currentValue, column, record) {
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.tota_pe42
          sumaObje += record.obje_pe42
          let total = 0
          
          if (parseInt(sumaObje) > 0 && parseInt(sumaFact) > 0) {
            
            total = 100 * (parseInt(sumaFact) / parseInt(sumaObje))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
    columngroup: 'pe42',
  },
  {
    text: 'Peg63',
    datafield: 'fact_pe63_ante',
    width: '100',
    align: 'center',
    cellsalign: 'center',

    cellsformat: 'N',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'pe63',
  },
  {
    text: 'Objetivo',
    datafield: 'obje_pe63',
    width: '120',
    align: 'center',
    cellsalign: 'center',

    cellsformat: 'N',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'pe63',
    cellclassname: claseObjetivoPeg63,
  },
  {
    text: 'Ret. peg63',
    datafield: 'fact_pe63',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'pe63',
  },
  {
    text: '% Ret. pend.',
    datafield: 'porc_pe63',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P2',
    aggregates: [
      {       
        'T': function(aggregatedValue, currentValue, column, record) {
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.fact_pe63
          sumaObje += record.obje_pe63
          let total = 0
          
          if (parseInt(sumaObje) > 0 && parseInt(sumaFact) > 0) {
            
            total = 100 * (parseInt(sumaFact) / parseInt(sumaObje))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
    columngroup: 'pe63',
    cellclassname: clasePorcentajePeg63,
  },
  {
    text: 'Pend. fact.',
    datafield: 'pend_fact_pe63',
    width: '100',
    align: 'center',
    cellsalign: 'center',

    cellsformat: 'N',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'pe63',
  },
  {
    text: 'Total',
    datafield: 'tota_pe63',
    width: '100',
    align: 'center',
    cellsalign: 'center',

    cellsformat: 'N',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'pe63',
  },
  {
    text: '% Ret. pend.',
    datafield: 'cump_pe63',
    width: '100',
    align: 'center',
    cellsalign: 'center',

    cellsformat: 'P2',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue, column, record) {
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.tota_pe63
          sumaObje += record.obje_pe63
          let total = 0
          
          if (parseInt(sumaObje) > 0 && parseInt(sumaFact) > 0) {
            
            total = 100 * (parseInt(sumaFact) / parseInt(sumaObje))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
    columngroup: 'pe63',
  },
  {
    text: 'Pegs',
    datafield: 'fact_pegs_ante',
    width: '100',
    align: 'center',
    cellsalign: 'center',

    cellsformat: 'N',
    aggregates: [
      {      
        'T': function(aggregatedValue, currentValue) {
          aggregatedValue += currentValue
  
          return aggregatedValue
        },
      },
    ],
    columngroup: 'pegs',
  },
  {
    text: 'Objetivo',
    datafield: 'obje_pegs',
    width: '120',
    align: 'center',
    cellsalign: 'center',

    cellsformat: 'N',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'pegs',
    cellclassname: claseObjetivoPegs,
  },
  {
    text: 'Ret. pegs',
    datafield: 'fact_pegs',
    width: '100',
    align: 'center',
    cellsalign: 'center',

    cellsformat: 'N',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'pegs',
  },
  {
    text: 'Cump. fact.',
    datafield: 'porc_pegs',
    width: '100',
    align: 'center',
    cellsalign: 'center',

    cellsformat: 'P2',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue, column, record) {
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.fact_pegs
          sumaObje += record.obje_pegs
          let total = 0
          
          if (parseInt(sumaObje) > 0 && parseInt(sumaFact) > 0) {
            
            total = 100 * (parseInt(sumaFact) / parseInt(sumaObje))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
    columngroup: 'pegs',
    cellclassname: clasePorcentajePegs,
  },
  {
    text: 'Pend. fact.',
    datafield: 'pend_fact_pegs',
    width: '100',
    align: 'center',
    cellsalign: 'center',

    cellsformat: 'N',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'pegs',
  },
  {
    text: 'Total',
    datafield: 'tota_pegs',
    width: '100',
    align: 'center',
    cellsalign: 'center',

    cellsformat: 'N',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'pegs',
  },
  {
    text: '% Cump',
    datafield: 'cump_pegs',
    width: '100',
    align: 'center',
    cellsalign: 'center',

    cellsformat: 'P2',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue, column, record) {
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.tota_pegs
          sumaObje += record.obje_pegs
          let total = 0
          
          if (parseInt(sumaObje) > 0 && parseInt(sumaFact) > 0) {
            
            total = 100 * (parseInt(sumaFact) / parseInt(sumaObje))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
    columngroup: 'pegs',
  },
  {
    text: 'Pos. reing.',
    datafield: 'fact_rein_ante',
    width: '100',
    align: 'center',
    cellsalign: 'center',

    cellsformat: 'N',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue) {
          
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
    width: '120',
    align: 'center',
    cellsalign: 'center',

    cellsformat: 'N',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue

          return aggregatedValue
        },
      },
    ],
    columngroup: 'rein',
    cellclassname: claseObjetivoReingreso,
  },
  {
    text: 'Facturado',
    datafield: 'fact_rein',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue) {
          
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
    cellsformat: 'P2',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue, column, record) {
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.fact_rein
          sumaObje += record.obje_rein
          let total = 0
          
          if (parseInt(sumaObje) > 0 && parseInt(sumaFact) > 0) {
            
            total = 100 * (parseInt(sumaFact) / parseInt(sumaObje))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
    columngroup: 'rein',
    cellclassname: clasePorcentajeReingreso,
  },
  {
    text: 'Pend. fact.',
    datafield: 'pend_fact_rein',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue) {
          
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
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'rein',
  },
  {
    text: '% Cump',
    datafield: 'cump_rein',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P2',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue, column, record) {
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.tota_fact_rein
          sumaObje += record.obje_rein
          let total = 0
          
          if (parseInt(sumaObje) > 0 && parseInt(sumaFact) > 0) {
            
            total = 100 * (parseInt(sumaFact) / parseInt(sumaObje))
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
    columngroup: 'rein',
  },
  {
    text: 'Objetivo',
    datafield: 'obje_capi',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'capi',
  },
  {
    text: 'Facturado',
    datafield: 'fact_capi',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'capi',
    cellclassname: claseCumplimientoCapitalizacion,
  },
  {
    text: 'Capi. pend.',
    datafield: 'pend_capi',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'capi',
  },
  {
    text: 'Pedi. falt. obje.',
    datafield: 'pend_capi_obje',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    aggregates: [
      {
        'T': function(aggregatedValue, currentValue) {
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'capi',
    cellclassname: claseObjetivoCapitalizacion,
  },
  {
    text: 'Valor',
    datafield: 'valo_docu',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'c2',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'cobr',
  },
  {
    text: 'Objetivo 88%',
    datafield: 'obje_docu',
    width: '120',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'c2',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'cobr',
  },
  {
    text: 'Saldo 21di.',
    datafield: 'sald_21di',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'c2',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'cobr',
  },
  {
    text: 'Pend por cobr 88%',
    datafield: 'pend_cobr',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'c2',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'cobr',
  },
  {
    text: '% Cobr. 21di.',
    datafield: 'porc_21di',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P2',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue, column, record) {
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.valo_docu
          sumaObje += record.sald_21di
          let total = 0
          
          if (parseInt(sumaFact) > 0) {
            total = 100 * (1 - sumaObje / sumaFact)
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
    columngroup: 'cobr',
    cellclassname: clasePorcentaje21dias,
  },
  {
    text: 'Saldo actu.',
    datafield: 'sald_docu',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'c2',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'cobr',
  },
  {
    text: '% Cobr. actu.',
    datafield: 'porc_docu',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'P2',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue, column, record) {
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.valo_docu
          sumaObje += record.sald_docu
          let total = 0
          
          if (parseInt(sumaObje) > 0 && parseInt(sumaFact) > 0) {
            total = 100 * (1 - sumaObje / sumaFact)
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
    columngroup: 'cobr',
  },
  {
    text: 'Facturado',
    datafield: 'pppp_fact',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'c2',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue, column, record) {
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.tota_line
          sumaObje += record.nume_pedi
          let total = 0
          
          if (parseInt(sumaObje) > 0 && parseInt(sumaFact) > 0) {
            total = parseFloat(
              parseFloat(sumaFact) / parseFloat(sumaObje),
            )
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
    columngroup: 'pppp',
  },
  {
    text: 'Recepcionado',
    datafield: 'pppp_rece',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'c2',
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue, column, record) {
          if (record.visibleindex === 0) {
            sumaFact = 0
            sumaObje = 0
          }
          sumaFact += record.tota_rece
          sumaObje += record.nume_pedi
          let total = 0
          
          if (parseInt(sumaObje) > 0 && parseInt(sumaFact) > 0) {
            total = parseFloat(
              parseFloat(sumaFact) / parseFloat(sumaObje),
            )
          }
          total = parseFloat(total).toFixed(2)
          
          return total
        },
      },
    ],
    columngroup: 'pppp',
  },
  {
    text: 'Nivel',
    datafield: 'nive_lide',
    width: '200',
    align: 'center',
    cellsalign: 'center',
    columngroup: 'lide',
  },
  {
    text: 'Nivel proyectado',
    datafield: 'nive_lide_proy',
    width: '200',
    align: 'center',
    cellsalign: 'center',

    columngroup: 'lide',
  },
  {
    text: 'obje rete cons sist',
    datafield: 'obje_rete_cons_sist',
    hidden: true,
    cellsformat: 'N',
  },
  {
    text: 'obje pe21 sist',
    datafield: 'obje_pe21_sist',
    hidden: true,
    cellsformat: 'N',
  },
  {
    text: 'obje pe42 sist',
    datafield: 'obje_pe42_sist',
    hidden: true,
    cellsformat: 'N',
  },
  {
    text: 'obje pe63 sist',
    datafield: 'obje_pe63_sist',
    hidden: true,
    cellsformat: 'N',
  },
  {
    text: 'obje pegs sist',
    datafield: 'obje_pegs_sist',
    hidden: true,
    cellsformat: 'N',
  },
  {
    text: 'obje rein sist',
    datafield: 'obje_rein_sist',
    hidden: true,
    cellsformat: 'N',
  },
  {
    text: 'nume pedi pend',
    datafield: 'nume_pedi_pend',
    hidden: true,
    cellsformat: 'N',
  },
  {
    text: 'nume pedi',
    datafield: 'nume_pedi',
    hidden: true,
    cellsformat: 'N',
  },
  {
    text: 'tota line',
    datafield: 'tota_line',
    hidden: true,
    cellsformat: 'N',
  },
  {
    text: 'tota rece',
    datafield: 'tota_rece',
    hidden: true,
    cellsformat: 'N',
  },
  {
    text: 'tota ingr',
    datafield: 'tota_ingr',
    hidden: true,
    cellsformat: 'N',
  },
  {
    text: 'tota rein',
    datafield: 'tota_rein',
    hidden: true,
    cellsformat: 'N',
  },
  {
    text: 'acti_inic',
    datafield: 'acti_inic',
    hidden: true,
    cellsformat: 'N',
  },
  {
    text: 'tota ingr pend',
    datafield: 'tota_ingr_pend',
    hidden: true,
    cellsformat: 'N',
  },
  {
    text: 'tota rein pend',
    datafield: 'tota_rein_pend',
    hidden: true,
    cellsformat: 'N',
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
    text: '% Actividad',
    align: 'center',
    name: 'acti',
  },
  {
    text: 'Consecutividad pedidos de retención 90%',
    align: 'center',
    name: 'cons',
  },
  {
    text: 'Consecutividad 2do pedido 100%',
    align: 'center',
    name: 'cons_segu',
  },
  {
    text: 'Consecutividad 3er pedido 80%',
    align: 'center',
    name: 'cons_terc',
  },
  {
    text: 'Consecutividad 4to pedido 70%',
    align: 'center',
    name: 'cons_cuar',
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
    text: 'Suma Pegs 35%',
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
]

const sourceGlobal = ref({
  localdata: [],
  datafields: [
    { name: 'codi_sect', type: 'string' },
    { name: 'nomb_lide', type: 'string' },
    { name: 'acti_fina_ante', type: 'number' },
    { name: 'obje_tota', type: 'number' },
    { name: 'fact_tota', type: 'number' },
    { name: 'cump_fact_tota', type: 'number' },
    { name: 'pend_fact_tota', type: 'number' },
    { name: 'tota_tota', type: 'number' },
    { name: 'cump_tota', type: 'number' },
    { name: 'dife_tota', type: 'number' },
    { name: 'obje_inco', type: 'number' },
    { name: 'fact_inco', type: 'number' },
    { name: 'cump_fact_inco', type: 'number' },
    { name: 'pend_fact_inco', type: 'number' },
    { name: 'tota_inco', type: 'number' },
    { name: 'cump_inco', type: 'number' },
    { name: 'obje_rete', type: 'number' },
    { name: 'fact_rete', type: 'number' },
    { name: 'cump_fact_rete', type: 'number' },
    { name: 'pend_fact_rete', type: 'number' },
    { name: 'tota_rete', type: 'number' },
    { name: 'cump_rete', type: 'number' },
    { name: 'dife_rete', type: 'number' },
    { name: 'fact_rete_cons_ante', type: 'number' },
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
    { name: 'nume_pedi_pend', type: 'number' },
    { name: 'nume_pedi', type: 'number' },
    { name: 'tota_ingr', type: 'number' },
    { name: 'tota_rein', type: 'number' },
    { name: 'acti_inic', type: 'number' },
    { name: 'tota_ingr_pend', type: 'number' },
    { name: 'tota_rein_pend', type: 'number' },
    { name: 'nume_acti', type: 'number' },
    { name: 'obje_acti', type: 'number' },
    { name: 'porc_acti', type: 'number' },
    { name: 'nume_pedi_acti', type: 'number' },
    { name: 'porc_acti_pend', type: 'number' },
    { name: 'fact_pe21_ante', type: 'number' },
    { name: 'obje_pe21', type: 'number' },
    { name: 'fact_pe21', type: 'number' },
    { name: 'porc_pe21', type: 'number' },
    { name: 'pend_fact_pe21', type: 'number' },
    { name: 'tota_pe21', type: 'number' },
    { name: 'cump_pe21', type: 'number' },
    { name: 'fact_pe42_ante', type: 'number' },
    { name: 'obje_pe42', type: 'number' },
    { name: 'fact_pe42', type: 'number' },
    { name: 'porc_pe42', type: 'number' },
    { name: 'pend_fact_pe42', type: 'number' },
    { name: 'tota_pe42', type: 'number' },
    { name: 'cump_pe42', type: 'number' },
    { name: 'fact_pe63_ante', type: 'number' },
    { name: 'obje_pe63', type: 'number' },
    { name: 'fact_pe63', type: 'number' },
    { name: 'porc_pe63', type: 'number' },
    { name: 'pend_fact_pe63', type: 'number' },
    { name: 'tota_pe63', type: 'number' },
    { name: 'cump_pe63', type: 'number' },
    { name: 'fact_pegs_ante', type: 'number' },
    { name: 'obje_pegs', type: 'number' },
    { name: 'fact_pegs', type: 'number' },
    { name: 'porc_pegs', type: 'number' },
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
    { name: 'fact_capi', type: 'number' },
    { name: 'obje_capi', type: 'number' },
    { name: 'pend_capi', type: 'number' },
    { name: 'pend_capi_obje', type: 'number' },
    { name: 'porc_tota_capi', type: 'number' },
    { name: 'valo_docu', type: 'number' },
    { name: 'obje_docu', type: 'number' },
    { name: 'porc_21di', type: 'number' },
    { name: 'sald_21di', type: 'number' },
    { name: 'sald_docu', type: 'number' },
    { name: 'porc_docu', type: 'number' },
    { name: 'pend_cobr', type: 'number' },
    { name: 'tota_line', type: 'number' },
    { name: 'tota_rece', type: 'number' },
    { name: 'pppp_fact', type: 'number' },
    { name: 'pppp_rece', type: 'number' },
    { name: 'camp_ingr', type: 'number' },
    { name: 'nive_lide', type: 'string' },
    { name: 'nive_lide_proy', type: 'string' },

    { name: 'obje_rete_cons_sist', type: 'number' },
    { name: 'obje_pe21_sist', type: 'number' },
    { name: 'obje_pe42_sist', type: 'number' },
    { name: 'obje_pe63_sist', type: 'number' },
    { name: 'obje_pegs_sist', type: 'number' },
    { name: 'obje_rein_sist', type: 'number' },
  ],
  datatype: 'json',
})

const adaptadorGlobal = new jqx.dataAdapter(sourceGlobal.value)
const refGridGlobal = ref()
const campanaOptions = ref([])
const errorCampana = ref(false)
const errorMensajeCampana = ref('')
const zonaOptions = ref([])
const errorZona = ref(false)
const errorMensajeZona = ref('')
const localization = appStore.localization

onMounted(async () => {
  appStore.titulo(`Reportes / Seguimiento cierre zona`)
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

    const { data } = await $api(`/api/sami/v1/reportes/seguimiento-cierre-zona`, {
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
    if(typeof error.response !== "undefined") {
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
  sourceGlobal.value.localdata = []
  refGridGlobal.value.updatebounddata('cells')
  refGridGlobal.value.refreshfilterrow()
}

const onExcel = async () => {
  try {
    appStore.mensaje('Generando archivo')
    appStore.loading(true)

    const { data } = await $api(`/api/sami/v1/reportes/seguimiento-cierre-zona/excel`, {
      method: "post",
      body: {
        general: general.value,
        variable: selectedVariable.value,
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
  errorCampana.value = false
  errorMensajeCampana.value = ''
  errorZona.value = false
  errorMensajeZona.value = ''
}


const columnsOcultarTodo = [
  'obje_tota',
  'fact_tota',
  'cump_fact_tota',
  'pend_fact_tota',
  'tota_tota',
  'cump_tota',
  'dife_tota',
  'obje_inco',
  'fact_inco',
  'cump_fact_inco',
  'pend_fact_inco',
  'tota_inco',
  'cump_inco',
  'obje_rete',
  'fact_rete',
  'cump_fact_rete',
  'pend_fact_rete',
  'tota_rete',
  'cump_rete',
  'dife_rete',
  'fact_rete_cons_ante',
  'obje_rete_cons',
  'fact_rete_cons',
  'cump_fact_rete_cons',
  'pend_fact_rete_cons',
  'tota_rete_cons',
  'cump_rete_cons',
  'obje_rete_cons_segu',
  'fact_rete_cons_segu',
  'cump_fact_rete_cons_segu',
  'pend_fact_rete_cons_segu',
  'tota_rete_cons_segu',
  'cump_rete_cons_segu',
  'obje_rete_cons_terc',
  'fact_rete_cons_terc',
  'cump_fact_rete_cons_terc',
  'pend_fact_rete_cons_terc',
  'tota_rete_cons_terc',
  'cump_rete_cons_terc',
  'obje_rete_cons_cuar',
  'fact_rete_cons_cuar',
  'cump_fact_rete_cons_cuar',
  'pend_fact_rete_cons_cuar',
  'tota_rete_cons_cuar',
  'cump_rete_cons_cuar',
  'obje_acti',
  'porc_acti',
  'nume_pedi_acti',
  'porc_acti_pend',
  'fact_pe21_ante',
  'obje_pe21',
  'fact_pe21',
  'porc_pe21',
  'pend_fact_pe21',
  'tota_pe21',
  'cump_pe21',
  'fact_pe42_ante',
  'obje_pe42',
  'fact_pe42',
  'porc_pe42',
  'pend_fact_pe42',
  'tota_pe42',
  'cump_pe42',
  'fact_pe63_ante',
  'obje_pe63',
  'fact_pe63',
  'porc_pe63',
  'pend_fact_pe63',
  'tota_pe63',
  'cump_pe63',
  'fact_pegs_ante',
  'obje_pegs',
  'fact_pegs',
  'porc_pegs',
  'pend_fact_pegs',
  'tota_pegs',
  'cump_pegs',
  'fact_rein_ante',
  'obje_rein',
  'fact_rein',
  'porc_rein',
  'pend_fact_rein',
  'tota_fact_rein',
  'cump_rein',
  'fact_capi',
  'obje_capi',
  'pend_capi',
  'pend_capi_obje',
  'valo_docu',
  'obje_docu',
  'pend_cobr',
  'porc_21di',
  'sald_21di',
  'sald_docu',
  'porc_docu',
  'pppp_fact',
  'pppp_rece',
  'nive_lide',
  'nive_lide_proy',
]

const columnsMostrarTodo = [
  'obje_tota',
  'fact_tota',
  'cump_fact_tota',
  'pend_fact_tota',
  'tota_tota',
  'cump_tota',
  'dife_tota',
  'obje_inco',
  'fact_inco',
  'cump_fact_inco',
  'pend_fact_inco',
  'tota_inco',
  'cump_inco',
  'obje_rete',
  'fact_rete',
  'cump_fact_rete',
  'pend_fact_rete',
  'tota_rete',
  'cump_rete',
  'dife_rete',
  'fact_rete_cons_ante',
  'obje_rete_cons',
  'fact_rete_cons',
  'cump_fact_rete_cons',
  'pend_fact_rete_cons',
  'tota_rete_cons',
  'cump_rete_cons',
  'obje_rete_cons_segu',
  'fact_rete_cons_segu',
  'cump_fact_rete_cons_segu',
  'pend_fact_rete_cons_segu',
  'tota_rete_cons_segu',
  'cump_rete_cons_segu',
  'obje_rete_cons_terc',
  'fact_rete_cons_terc',
  'cump_fact_rete_cons_terc',
  'pend_fact_rete_cons_terc',
  'tota_rete_cons_terc',
  'cump_rete_cons_terc',
  'obje_rete_cons_cuar',
  'fact_rete_cons_cuar',
  'cump_fact_rete_cons_cuar',
  'pend_fact_rete_cons_cuar',
  'tota_rete_cons_cuar',
  'cump_rete_cons_cuar',
  'obje_acti',
  'porc_acti',
  'nume_pedi_acti',
  'porc_acti_pend',
  'fact_pe21_ante',
  'obje_pe21',
  'fact_pe21',
  'porc_pe21',
  'pend_fact_pe21',
  'tota_pe21',
  'cump_pe21',
  'fact_pe42_ante',
  'obje_pe42',
  'fact_pe42',
  'porc_pe42',
  'pend_fact_pe42',
  'tota_pe42',
  'cump_pe42',
  'fact_pe63_ante',
  'obje_pe63',
  'fact_pe63',
  'porc_pe63',
  'pend_fact_pe63',
  'tota_pe63',
  'cump_pe63',
  'fact_pegs_ante',
  'obje_pegs',
  'fact_pegs',
  'porc_pegs',
  'pend_fact_pegs',
  'tota_pegs',
  'cump_pegs',
  'fact_rein_ante',
  'obje_rein',
  'fact_rein',
  'porc_rein',
  'pend_fact_rein',
  'tota_fact_rein',
  'cump_rein',
  'fact_capi',
  'obje_capi',
  'pend_capi',
  'pend_capi_obje',
  'valo_docu',
  'obje_docu',
  'pend_cobr',
  'porc_21di',
  'sald_21di',
  'sald_docu',
  'porc_docu',
  'pppp_fact',
  'pppp_rece',
  'nive_lide',
  'nive_lide_proy',
]

const columnsMostrarPedidosTotales = [
  'obje_tota',
  'fact_tota',
  'cump_fact_tota',
  'pend_fact_tota',
  'tota_tota',
  'cump_tota',
  'dife_tota',
  'obje_inco',
  'fact_inco',
  'cump_fact_inco',
  'pend_fact_inco',
  'tota_inco',
  'cump_inco',
  'obje_rete',
  'fact_rete',
  'cump_fact_rete',
  'pend_fact_rete',
  'tota_rete',
  'cump_rete',
  'dife_rete',
]

const columnsMostrarPedidosActividad = [
  'obje_acti',
  'porc_acti',
  'nume_pedi_acti',
  'porc_acti_pend',
  'fact_rete_cons_ante',
  'obje_rete_cons',
  'fact_rete_cons',
  'cump_fact_rete_cons',
  'pend_fact_rete_cons',
  'tota_rete_cons',
  'cump_rete_cons',
  'obje_rete_cons_segu',
  'fact_rete_cons_segu',
  'cump_fact_rete_cons_segu',
  'pend_fact_rete_cons_segu',
  'tota_rete_cons_segu',
  'cump_rete_cons_segu',
  'fact_pe21_ante',
  'obje_pe21',
  'fact_pe21',
  'porc_pe21',
  'pend_fact_pe21',
  'tota_pe21',
  'cump_pe21',
  'fact_pe42_ante',
  'obje_pe42',
  'fact_pe42',
  'porc_pe42',
  'pend_fact_pe42',
  'tota_pe42',
  'cump_pe42',
  'fact_pe63_ante',
  'obje_pe63',
  'fact_pe63',
  'porc_pe63',
  'pend_fact_pe63',
  'tota_pe63',
  'cump_pe63',
  'fact_pegs_ante',
  'obje_pegs',
  'fact_pegs',
  'porc_pegs',
  'pend_fact_pegs',
  'tota_pegs',
  'cump_pegs',
]


const columnsMostrarPedidosRetencion = [
  'obje_rete',
  'fact_rete',
  'cump_fact_rete',
  'pend_fact_rete',
  'tota_rete',
  'cump_rete',
  'dife_rete',
  'fact_rete_cons_ante',
  'obje_rete_cons',
  'fact_rete_cons',
  'cump_fact_rete_cons',
  'pend_fact_rete_cons',
  'tota_rete_cons',
  'cump_rete_cons',
  'obje_rete_cons_segu',
  'fact_rete_cons_segu',
  'cump_fact_rete_cons_segu',
  'pend_fact_rete_cons_segu',
  'tota_rete_cons_segu',
  'cump_rete_cons_segu',
  'fact_pe21_ante',
  'obje_pe21',
  'fact_pe21',
  'porc_pe21',
  'pend_fact_pe21',
  'tota_pe21',
  'cump_pe21',
  'fact_pe42_ante',
  'obje_pe42',
  'fact_pe42',
  'porc_pe42',
  'pend_fact_pe42',
  'tota_pe42',
  'cump_pe42',
  'fact_pe63_ante',
  'obje_pe63',
  'fact_pe63',
  'porc_pe63',
  'pend_fact_pe63',
  'tota_pe63',
  'cump_pe63',
  'fact_pegs_ante',
  'obje_pegs',
  'fact_pegs',
  'porc_pegs',
  'pend_fact_pegs',
  'tota_pegs',
  'cump_pegs',
  'fact_rein_ante',
  'obje_rein',
  'fact_rein',
  'porc_rein',
  'pend_fact_rein',
  'tota_fact_rein',
  'cump_rein',
  'nive_lide',
  'nive_lide_proy',
]

const columnsMostrarCapitalizacion = [
  'obje_inco',
  'fact_inco',  
  'cump_fact_inco',
  'pend_fact_inco',
  'tota_inco',
  'cump_inco',
  'fact_rein_ante',
  'obje_rein',
  'fact_rein',
  'porc_rein',
  'pend_fact_rein',
  'tota_fact_rein',
  'cump_rein',
  'fact_pe63_ante',
  'obje_pe63',
  'fact_pe63',
  'porc_pe63',
  'pend_fact_pe63',
  'tota_pe63',
  'cump_pe63',
  'fact_capi',
  'obje_capi',
  'pend_capi',
  'pend_capi_obje',
]

const columnsMostrarCobranza = [
  'valo_docu',
  'obje_docu',
  'pend_cobr',
  'porc_21di',
  'sald_21di',
  'sald_docu',
  'porc_docu',
  'pppp_fact',
  'pppp_rece',
]

const columnsMostrarConsecutividad = [
  'fact_rete_cons_ante',
  'obje_rete_cons',
  'fact_rete_cons',
  'cump_fact_rete_cons',
  'pend_fact_rete_cons',
  'tota_rete_cons',
  'cump_rete_cons',
  'obje_rete_cons_segu',
  'fact_rete_cons_segu',
  'cump_fact_rete_cons_segu',
  'pend_fact_rete_cons_segu',
  'tota_rete_cons_segu',
  'cump_rete_cons_segu',
  'obje_rete_cons_terc',
  'fact_rete_cons_terc',
  'cump_fact_rete_cons_terc',
  'pend_fact_rete_cons_terc',
  'tota_rete_cons_terc',
  'cump_rete_cons_terc',
  'obje_rete_cons_cuar',
  'fact_rete_cons_cuar',
  'cump_fact_rete_cons_cuar',
  'pend_fact_rete_cons_cuar',
  'tota_rete_cons_cuar',
  'cump_rete_cons_cuar',
]

const columnMapping = {
  0: columnsMostrarTodo,
  1: columnsMostrarPedidosTotales,
  2: columnsMostrarPedidosActividad,
  3: columnsMostrarPedidosRetencion,
  4: columnsMostrarCapitalizacion,
  5: columnsMostrarCobranza,
  6: columnsMostrarConsecutividad,
}

watch(selectedVariable, async (nuevaVariable, antiguaVariable) => {
  refGridGlobal.value.beginupdate()
  columnsOcultarTodo.forEach(column => {
    refGridGlobal.value.hidecolumn(column)
  })

  const columnsToShow = columnMapping[nuevaVariable]
  if (columnsToShow) {
    columnsToShow.forEach(column => {
      refGridGlobal.value.showcolumn(column)
    })
  }

  refGridGlobal.value.endupdate()
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
