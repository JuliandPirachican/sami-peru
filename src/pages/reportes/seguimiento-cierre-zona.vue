<!-- eslint-disable camelcase -->
<script setup>
import { useAppStore } from '@/stores/app';
import { EncryptStorage } from 'encrypt-storage';
import JqxGrid from 'jqwidgets-scripts/jqwidgets-vue3/vue_jqxgrid.vue';


definePage({
  meta: {
    action: 'colombia/repo_come_segu_cier_camp',
    subject: 'colombia/repo_come_segu_cier_camp',
  },
})

const appStore = useAppStore()
const encryptStorage = new EncryptStorage('AZZORTI-SAMI', {
  storageType: 'localStorage',
})

const userData = encryptStorage.getItem('userData')
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
});

const variables = ref([
  { title: 'Todos', value: 0 },
  { title: 'Capitalización', value: 1 },
  { title: 'Consecutividad', value: 2 },
  { title: 'Pedidos totales', value: 3 },
]);

const selectedVariable = ref(0);

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
    //todos
    return [ { key: 'codi_sect', title: 'Codigo Lider' },
  { key: 'nomb_lide', title: 'Lider' },
  { key: 'acti_fina_ante', title: 'Act. inic.' },
  { key: 'obje_inco', title: 'Objetivo' },
  { key: 'fact_inco', title: 'Facturado' },
  { key: 'cump_fact_inco', title: 'Cump. fact.' },
  { key: 'pend_fact_inco', title: 'Pend. fact.' },
  { key: 'tota_inco', title: 'Total' },
  { key: 'cump_inco', title: '% Cump.' },
  { key: 'obje_rete_cons', title: 'Objetivo' },
  { key: 'fact_rete_cons', title: 'Facturado' },
  { key: 'cump_fact_rete_cons', title: 'Cump. fact.' },
  { key: 'pend_fact_rete_cons', title: 'Pend. fact.' },
  { key: 'tota_rete_cons', title: 'Total' },
  { key: 'cump_rete_cons', title: '% Cump.' },
  { key: 'obje_rete_cons_segu', title: '1 Camp. ante.' },
  { key: 'fact_rete_cons_segu', title: 'Facturado' },
  { key: 'cump_fact_rete_cons_segu', title: 'Cump. fact.' },
  { key: 'pend_fact_rete_cons_segu', title: 'Pend. fact.' },
  { key: 'tota_rete_cons_segu', title: 'Total' },
  { key: 'cump_rete_cons_segu', title: '% Cump.' },
  { key: 'obje_rete_cons_terc', title: '2 Camp. ante.' },
  { key: 'fact_rete_cons_terc', title: 'Facturado' },
  { key: 'cump_fact_rete_cons_terc', title: 'Cump. fact.' },
  { key: 'pend_fact_rete_cons_terc', title: 'Pend. fact.' },
  { key: 'tota_rete_cons_terc', title: 'Total' },
  { key: 'cump_rete_cons_terc', title: '% Cump.' },
  { key: 'obje_rete_cons_cuar', title: '3 Camp. ante.' },
  { key: 'fact_rete_cons_cuar', title: 'Facturado' },
  { key: 'cump_fact_rete_cons_cuar', title: 'Cump. fact.' },
  { key: 'pend_fact_rete_cons_cuar', title: 'Pend. fact.' },
  { key: 'tota_rete_cons_cuar', title: 'Total' },
  { key: 'cump_rete_cons_cuar', title: '% Cump.' },
  { key: 'fact_pe21_ante', title: 'Peg21' },
  { key: 'obje_pe21', title: 'Objetivo' },
  { key: 'fact_pe21', title: 'Ret. peg21' },
  { key: 'porc_pe21', title: '% Ret. pend.' },
  { key: 'pend_fact_pe21', title: 'Pend. fact.' },
  { key: 'tota_pe21', title: 'Total' },
  { key: 'cump_pe21', title: '% Ret. pend.' },
  { key: 'fact_pe42_ante', title: 'Peg42' },
  { key: 'obje_pe42', title: 'Objetivo' },
  { key: 'fact_pe42', title: 'Ret. peg42' },
  { key: 'porc_pe42', title: '% Ret. pend.' },
  { key: 'pend_fact_pe42', title: 'Pend. fact.' },
  { key: 'tota_pe42', title: 'Total' },
  { key: 'cump_pe42', title: '% Ret. pend.' },
  { key: 'fact_pe63_ante', title: 'Peg63' },
  { key: 'obje_pe63', title: 'Objetivo' },
  { key: 'fact_pe63', title: 'Ret. peg63' },
  { key: 'porc_pe63', title: '% Ret. pend.' },
  { key: 'pend_fact_pe63', title: 'Pend. fact.' },
  { key: 'tota_pe63', title: 'Total' },
  { key: 'cump_pe63', title: '% Ret. pend.' },
  { key: 'fact_pegs_ante', title: 'Pegs' },
  { key: 'obje_pegs', title: 'Objetivo' },
  { key: 'fact_pegs', title: 'Ret. pegs' },
  { key: 'porc_pegs', title: 'Cump. fact.' },
  { key: 'pend_fact_pegs', title: 'Pend. fact.' },
  { key: 'tota_pegs', title: 'Total' },
  { key: 'cump_pegs', title: '% Cump' },
  { key: 'fact_rein_ante', title: 'Pos. reing.' },
  { key: 'obje_rein', title: 'Objetivo' },
  { key: 'fact_rein', title: 'Facturado' },
  { key: 'porc_rein', title: 'Cump. fact.' },
  { key: 'pend_fact_rein', title: 'Pend. fact.' },
  { key: 'tota_fact_rein', title: 'Total' },
  { key: 'cump_rein', title: '% Cump' },
  { key: 'obje_capi', title: 'Objetivo' },
  { key: 'fact_capi', title: 'Facturado' },
  { key: 'pend_capi', title: 'Capi. pend.' },
  { key: 'obje_tota', title: 'Objetivo' },
  { key: 'fact_tota', title: 'Facturado' },
  { key: 'cump_fact_tota', title: 'Cump. fact.' },
  { key: 'pend_fact_tota', title: 'Pend. fact.' },
  { key: 'tota_tota', title: 'Total' },
  { key: 'obje_vent', title: 'Objetivo Ventas' },
  { key: 'fact_vent', title: 'Venta' }
    ];
  } else if(selectedVariable.value === 1) {
    //capitalizacion
    return [
    { title: 'Codigo Lider', key: 'codi_sect' },
    { title: 'Lider', key: 'nomb_lide' },
    { title: 'Act. inic.', key: 'acti_fina_ante' },
    // Grupo 'inco'
    { title: 'Objetivo', key: 'obje_inco' },
    { title: 'Facturado', key: 'fact_inco' },
    { title: 'Cump. fact.', key: 'cump_fact_inco' },
    { title: 'Pend. fact.', key: 'pend_fact_inco' },
    { title: 'Total', key: 'tota_inco' },
    { title: '% Cump.', key: 'cump_inco' },

    // Grupo 'rein'
    { title: 'Pos. reing.', key: 'fact_rein_ante' },
    { title: 'Objetivo', key: 'obje_rein' },
    { title: 'Facturado', key: 'fact_rein' },
    { title: 'Cump. fact.', key: 'porc_rein' },
    { title: 'Pend. fact.', key: 'pend_fact_rein' },
    { title: 'Total', key: 'tota_fact_rein' },
    { title: '% Cump', key: 'cump_rein' },

    // Grupo 'pe63'
    { title: 'Peg63', key: 'fact_pe63_ante' },
    { title: 'Objetivo', key: 'obje_pe63' },
    { title: 'Ret. peg63', key: 'fact_pe63' },
    { title: '% Ret. pend.', key: 'porc_pe63' },
    { title: 'Pend. fact.', key: 'pend_fact_pe63' },
    { title: 'Total', key: 'tota_pe63' },
    { title: '% Ret. pend.', key: 'cump_pe63' },

    // Grupo 'capi'
    { title: 'Objetivo', key: 'obje_capi' },
    { title: 'Facturado', key: 'fact_capi' },
    { title: 'Capi. pend.', key: 'pend_capi' }
]
  } else if (selectedVariable.value === 2) {
    //consecutividad
    return [
    { title: 'Codigo Lider', key: 'codi_sect' },
    { title: 'Lider', key: 'nomb_lide' },
    { title: 'Act. inic.', key: 'acti_fina_ante' },
    
    // Grupo 'cons'
    { title: 'Rete. camp. ant.', key: 'fact_rete_cons_ante' },
    { title: 'Objetivo', key: 'obje_rete_cons' },
    { title: 'Facturado', key: 'fact_rete_cons' },
    { title: 'Cump. fact.', key: 'cump_fact_rete_cons' },
    { title: 'Pend. fact.', key: 'pend_fact_rete_cons' },
    { title: 'Total', key: 'tota_rete_cons' },
    { title: '% Cump.', key: 'cump_rete_cons' },

    // Grupo 'cons_segu'
    { title: '1 Camp. ante.', key: 'obje_rete_cons_segu' },
    { title: 'Facturado', key: 'fact_rete_cons_segu' },
    { title: 'Cump. fact.', key: 'cump_fact_rete_cons_segu' },
    { title: 'Pend. fact.', key: 'pend_fact_rete_cons_segu' },
    { title: 'Total', key: 'tota_rete_cons_segu' },
    { title: '% Cump.', key: 'cump_rete_cons_segu' },

    // Grupo 'cons_terc'
    { title: '2 Camp. ante.', key: 'obje_rete_cons_terc' },
    { title: 'Facturado', key: 'fact_rete_cons_terc' },
    { title: 'Cump. fact.', key: 'cump_fact_rete_cons_terc' },
    { title: 'Pend. fact.', key: 'pend_fact_rete_cons_terc' },
    { title: 'Total', key: 'tota_rete_cons_terc' },
    { title: '% Cump.', key: 'cump_rete_cons_terc' },

    // Grupo 'cons_cuar'
    { title: '3 Camp. ante.', key: 'obje_rete_cons_cuar' },
    { title: 'Facturado', key: 'fact_rete_cons_cuar' },
    { title: 'Cump. fact.', key: 'cump_fact_rete_cons_cuar' },
    { title: 'Pend. fact.', key: 'pend_fact_rete_cons_cuar' },
    { title: 'Total', key: 'tota_rete_cons_cuar' },
    { title: '% Cump.', key: 'cump_rete_cons_cuar' }

    ]
  } else if (selectedVariable.value === 3) {
    //pedidos totales 
    return [
      { title: 'Codigo Lider', key: 'codi_sect' },
      { title: 'Lider', key: 'nomb_lide' },
      { title: 'Act. inic.', key: 'acti_fina_ante' },
      // Grupo 'inco'
      { title: 'Objetivo', key: 'obje_inco' },
      { title: 'Facturado', key: 'fact_inco' },
      { title: 'Cump. fact.', key: 'cump_fact_inco' },
      { title: 'Pend. fact.', key: 'pend_fact_inco' },
      { title: 'Total', key: 'tota_inco' },
      { title: '% Cump.', key: 'cump_inco' },

      // Grupo 'cons'
      { title: 'Rete. camp. ant.', key: 'fact_rete_cons_ante' },
      { title: 'Objetivo', key: 'obje_rete_cons' },
      { title: 'Facturado', key: 'fact_rete_cons' },
      { title: 'Cump. fact.', key: 'cump_fact_rete_cons' },
      { title: 'Pend. fact.', key: 'pend_fact_rete_cons' },
      { title: 'Total', key: 'tota_rete_cons' },
      { title: '% Cump.', key: 'cump_rete_cons' },



      // Grupo 'pe21'
      { title: 'Peg21', key: 'fact_pe21_ante' },
      { title: 'Objetivo', key: 'obje_pe21' },
      { title: 'Ret. peg21', key: 'fact_pe21' },
      { title: '% Ret. pend.', key: 'porc_pe21' },
      { title: 'Pend. fact.', key: 'pend_fact_pe21' },
      { title: 'Total', key: 'tota_pe21' },
      { title: '% Ret. pend.', key: 'cump_pe21' },

      // Grupo 'pe42'
      { title: 'Peg42', key: 'fact_pe42_ante' },
      { title: 'Objetivo', key: 'obje_pe42' },
      { title: 'Ret. peg42', key: 'fact_pe42' },
      { title: '% Ret. pend.', key: 'porc_pe42' },
      { title: 'Pend. fact.', key: 'pend_fact_pe42' },
      { title: 'Total', key: 'tota_pe42' },
      { title: '% Ret. pend.', key: 'cump_pe42' },

      // Grupo 'pe63'
      { title: 'Peg63', key: 'fact_pe63_ante' },
      { title: 'Objetivo', key: 'obje_pe63' },
      { title: 'Ret. peg63', key: 'fact_pe63' },
      { title: '% Ret. pend.', key: 'porc_pe63' },
      { title: 'Pend. fact.', key: 'pend_fact_pe63' },
      { title: 'Total', key: 'tota_pe63' },
      { title: '% Ret. pend.', key: 'cump_pe63' },

      // Grupo 'rein'
      { title: 'Pos. reing.', key: 'fact_rein_ante' },
      { title: 'Objetivo', key: 'obje_rein' },
      { title: 'Facturado', key: 'fact_rein' },
      { title: 'Cump. fact.', key: 'porc_rein' },
      { title: 'Pend. fact.', key: 'pend_fact_rein' },
      { title: 'Total', key: 'tota_fact_rein' },
      { title: '% Cump', key: 'cump_rein' }
    ]
  } 
 
  
})

let sumaFact = 0
let sumaObje = 0
let sumaActiInic = 0
let sumaNumePedi = 0
let sumaTotaIngr = 0
let sumaTotaRein = 0
//headers de la tabla     
const columnas = [
  {
    text: 'Codigo Lider',
    datafield: 'codi_sect',
    width: '120',
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
    width: '100',
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
    text: 'Rete. camp. ant.',
    datafield: 'fact_rete_cons_ante',
    width: '100',
    align: 'center',
    cellsalign: 'center',
    hidden: true,
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
    hidden: true,
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
    hidden: true,
    // Cambié el nombre de la propiedad a "hidden" para ocultar la columna
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
    hidden: true,
    // Cambié el nombre de la propiedad a "hidden" para ocultar la columna
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
  },{
    text: 'Objetivo Ventas',
    datafield: 'obje_vent',
    width: '200',
    align: 'center',
    cellsalign: 'center',
    cellsformat: 'N',
    editable: false,
    aggregates: [
      {
        
        'T': function(aggregatedValue, currentValue) {
          
          aggregatedValue += currentValue
          
          return aggregatedValue
        },
      },
    ],
    columngroup: 'vent',
  },
  {
    text: 'Venta',
    datafield: 'fact_vent',
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
    columngroup: 'vent',
  },
  
]

//cabeceras de la tabla grupo
const columnasGrupo = [
  {
    text: 'Incorporación',
    align: 'center',
    name: 'inco',
  },

  {
    text: 'Consecutividad ',
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
    text: 'Peg21 50%',
    align: 'center',
    name: 'pe21',
  },
  {
    text: 'Peg42 35%',
    align: 'center',
    name: 'pe42',
  },
  {
    text: 'Peg63 25%',
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
    text: 'Pedidos totales',
    align: 'center',
    name: 'tota',
  },
  {
    text: 'Ventas',
    align: 'center',
    name: 'vent',
  },
]

const sourceGlobal = ref({
  localdata: [],
  datafields: [
    { name: 'codi_sect', type: 'string' }, // Nota: Corregí "codi_sect" (original tenía 'codi_sect', no 'codi_sect')
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
    { name: 'obje_capi', type: 'number' },
    { name: 'fact_capi', type: 'number' },
    { name: 'pend_capi', type: 'number' },
    { name: 'pend_capi_obje', type: 'number' },
    { name: 'obje_vent', type: 'number' },
    { name: 'fact_vent', type: 'number' }
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
      query: {
        codigo: userData.codi_perf,
      }
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
  'obje_vent',
  'fact_vent',
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
  'obje_vent',
  'fact_vent',
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
  'fact_rete_cons_ante',
  'obje_rete_cons',
  'fact_rete_cons',
  'cump_fact_rete_cons',
  'pend_fact_rete_cons',
  'tota_rete_cons',
  'cump_rete_cons',
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
  1: columnsMostrarCapitalizacion,
  2: columnsMostrarConsecutividad,
  3: columnsMostrarPedidosTotales
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
