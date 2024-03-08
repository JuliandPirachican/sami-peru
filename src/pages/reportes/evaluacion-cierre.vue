<!-- eslint-disable camelcase -->
<script setup>
import { useAppStore } from '@/stores/app'
import { useDisplay } from 'vuetify'
import { VDataTable } from 'vuetify/labs/VDataTable'

definePage({
  meta: {
    action: 'peru/repo_come_eval_cier',
    subject: 'peru/repo_come_eval_cier',
  },
})

const { mobile } = useDisplay()
const userData = JSON.parse(localStorage.getItem('userData'))
const appStore = useAppStore()

const formulario = ref({
  campana: null,
  zona: null,
})

const general = ref({
  lima: '0',
  objetivoIncorporacion: '0',
  facturadoIncorporacion: '0',
  cumplimientoIncorporacion: '0.00',
  objetivoRetencion: '0',
  facturadoRetencion: '0',
  cumplimientoRetencion: '0.00',
})

const itemsGlobal = ref([])
const itemsDetalle = ref([])

const headersDetalle = computed(() => {
  return [
    {
      title: 'Puesto',
      key: 'nume_fila',
    }, {
      title: 'Sector',
      key: 'codi_sect',
    }, {
      title: 'Lider',
      key: 'nomb_lide',
    }, {
      title: 'Pedi. total',
      key: 'porc_pedi',
    }, {
      title: 'obje inco',
      key: 'obje_inco',
      cellsformat: 'N',
      hidden: true,
    }, {
      title: 'Incorporación',
      key: 'porc_inco',
    },  {
      title: 'Pedi. rete.',
      key: 'porc_rete',
    }, {
      title: '% Acti.',
      key: 'porc_acti',
    }, {
      title: 'Cons. pedi. rete.',
      key: 'porc_rete_cons',
    },  {
      title: 'Cons. 2do pedi.',
      key: 'porc_rete_segu',
    }, {
      title: 'Cons. 3er pedi.',
      key: 'porc_rete_terc',
    }, {
      title: 'Cons. 4to pedi.',
      key: 'porc_rete_cuar',
    }, {
      title: 'Suma ret. pegs',
      key: 'porc_pegs',
    }, {
      title: 'Capi.',
      key: 'fact_capi',
    }, {
      title: 'Cobr. 21di.',
      key: 'porc_cobr',
    }, {
      title: 'Cambios & Devo.',
      key: 'porc_canj',
    }, {
      title: 'Nivel de lider',
      key: 'nume_nive',
    }, {
      title: 'Puntaje',
      key: 'peso_tota',
    },
  ]
})

const headersGlobal = computed(() => {
  return [
    {
      title: 'Zona',
      key: 'codi_zona',
    },
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
      key: 'acti_inic',
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
      title: 'Camp. ante.',
      key: 'porc_acti_ante',
    },
    {
      title: 'Objetivo',
      key: 'obje_acti',
    },
    {
      title: 'Facturado',
      key: 'porc_acti',
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
      title: '% Cump',
      key: 'porc_rein',
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
      title: 'Pend. 21di',
      key: 'pend_21di',
    },
    {
      title: '% Cobr. 21di.',
      key: 'porc_21di',
    },
    {
      title: 'Pend. 31di',
      key: 'pend_31di',
    },
    {
      title: '% Cobr. 31di.',
      key: 'porc_31di',
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
      title: 'Ingreso lider',
      key: 'camp_ingr',
    },
    {
      title: 'Nivel de lider',
      key: 'nive_lide',
    },
  ]
})
      
const campanaOptions = ref([])
const errorCampana = ref(false)
const errorMensajeCampana = ref('')

const zonaOptions = ref([])
const errorZona = ref(false)
const errorMensajeZona = ref('')
const isOpen = ref(false)   
const loginData = JSON.parse(localStorage.getItem('login'))

onMounted(async () => {
  appStore.titulo(`Reportes / Evaluación cierre`)
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
      facturadoIncorporacion: '0',
      cumplimientoIncorporacion: '0.00',
      objetivoRetencion: '0',
      facturadoRetencion: '0',
      cumplimientoRetencion: '0.00',
    }
    itemsGlobal.value = []

    const { data } = await $api(`/api/sami/v1/reportes/evaluacion-cierre-zona`, {
      method: "get",
      query: {
        campana: (formulario.value.campana === null) ? '' : formulario.value.campana,
        zona: (formulario.value.zona === null) ? '' : formulario.value.zona,
      },
    })

    itemsGlobal.value = data.data_glob

    general.value = {
      lima: data.lima_prov,
      objetivoIncorporacion: data.obje_inco,
      facturadoIncorporacion: data.fact_inco,
      cumplimientoIncorporacion: data.porc_inco,
      objetivoRetencion: data.obje_rete,
      facturadoRetencion: data.fact_rete,
      cumplimientoRetencion: data.porc_rete,
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

const onRanking = async () => {
  try {
    appStore.mensaje('Generando proceso')
    appStore.loading(true)
    limpiarValidacion()
    itemsDetalle.value = []

    const { data } = await $api(`/api/sami/v1/reportes/evaluacion-cierre-zona`, {
      method: "post",
      body: {
        campana: (formulario.value.campana === null) ? '' : formulario.value.campana,
        zona: (formulario.value.zona === null) ? '' : formulario.value.zona,
        data: itemsGlobal.value,
      },
    })

    itemsDetalle.value = data.data_glob
    isOpen.value = true
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
    facturadoIncorporacion: '0',
    cumplimientoIncorporacion: '0.00',
    objetivoRetencion: '0',
    facturadoRetencion: '0',
    cumplimientoRetencion: '0.00',
  }
  itemsGlobal.value = []
  itemsDetalle.value = []
}

const onExcel = async () => {
  try {
    appStore.mensaje('Generando archivo')
    appStore.loading(true)

    const { data } = await $api(`/api/sami/v1/reportes/evaluacion-cierre-zona/excel`, {
      method: "post",
      body: {
        general: general.value,
        data: itemsGlobal.value,
        cabecera: headersGlobal.value,
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

const onClose = () => {
  isOpen.value = false
  itemsDetalle.value = []
}
</script>

<template>
  <div>
    <AppPlantilla>
      <template #botones>
        <GenerarBoton @procesar="onGenerar" />
        <ExcelBoton @procesar="onExcel" />
        <RankingBoton @procesar="onRanking" />
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
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Incorporación</td>
                      <td>{{ general.objetivoIncorporacion }}</td>
                      <td>{{ general.facturadoIncorporacion }}</td>
                      <td>{{ general.cumplimientoIncorporacion }}</td>
                    </tr>
                    <tr>
                      <td>Retención</td>
                      <td>{{ general.objetivoRetencion }}</td>
                      <td>{{ general.facturadoRetencion }}</td>
                      <td>{{ general.cumplimientoRetencion }}</td>
                    </tr>
                  </tbody>
                </VTable>
              </VCardText>
            </VCard>
          </VCol>

          <VCol cols="12">
            <VCard>
              <VDataTable
                :headers="headersGlobal"
                :items="itemsGlobal"
                :items-per-page="-1"
                class="text-no-wrap"
                fixed-header
                height="400"
              > 
                <template #headers>
                  <tr>
                    <th rowspan="2">
                      ZONA
                    </th>
                    <th rowspan="2">
                      SECTOR
                    </th>
                    <th rowspan="2">
                      LIDER
                    </th>
                    <th rowspan="2">
                      ACT. INIC.
                    </th>
                    <th
                      class="text-center"
                      colspan="3"
                    >
                      PEDIDOS TOTALES
                    </th>
                    <th
                      class="text-center"
                      colspan="3"
                    >
                      INCORPORACIÓN
                    </th>
                    <th
                      class="text-center"
                      colspan="3"
                    >
                      PEDIDOS DE RETENCIÓN
                    </th>
                    <th
                      class="text-center"
                      colspan="3"
                    >
                      % ACTIVIDAD
                    </th>
                    <th
                      class="text-center"
                      colspan="4"
                    >
                      CONSECUTIVIDAD PEDIDOS DE RETENCIÓN 90%
                    </th>
                    <th
                      class="text-center"
                      colspan="3"
                    >
                      CONSECUTIVIDAD 2do pedido 100%
                    </th>
                    <th
                      class="text-center"
                      colspan="3"
                    >
                      CONSECUTIVIDAD 3er pedido 80%'
                    </th>
                    <th
                      class="text-center"
                      colspan="3"
                    >
                      CONSECUTIVIDAD 4to pedido 70%
                    </th>
                    <th
                      class="text-center"
                      colspan="4"
                    >
                      Peg21 40%
                    </th>
                    <th
                      class="text-center"
                      colspan="4"
                    >
                      Peg42 30%
                    </th>
                    <th
                      class="text-center"
                      colspan="4"
                    >
                      Peg63 25%
                    </th>
                    <th
                      class="text-center"
                      colspan="4"
                    >
                      Suma Pegs 35%
                    </th>
                    <th
                      class="text-center"
                      colspan="4"
                    >
                      Reingresos 10%
                    </th>
                    <th
                      class="text-center"
                      colspan="2"
                    >
                      Capitalización
                    </th>
                    <th rowspan="2">
                      PEND. 21DI
                    </th>
                    <th rowspan="2">
                      % COBR. 21DI
                    </th>
                    <th rowspan="2">
                      PEND. 31DI
                    </th>
                    <th rowspan="2">
                      % COBR. 31DI
                    </th>
                    <th rowspan="2">
                      FACTURADO
                    </th>
                    <th rowspan="2">
                      RECEPCIONADO
                    </th>
                    <th rowspan="2">
                      INGRESO LIDER
                    </th>
                    <th rowspan="2">
                      NIVEL
                    </th>
                  </tr>
                  <tr>
                    <th>
                      OBJETIVO
                    </th>
                    <th>
                      FACTURADO
                    </th>
                    <th>
                      CUMP. FACT.
                    </th>
              
                    <th>
                      OBJETIVO
                    </th>
                    <th>
                      FACTURADO
                    </th>
                    <th>
                      CUMP. FACT.
                    </th>
                          
                    <th>
                      OBJETIVO
                    </th>
                    <th>
                      FACTURADO
                    </th>
                    <th>
                      CUMP. FACT.
                    </th>

                    <th>
                      CAMP. ANTE.
                    </th>
                    <th>
                      OBJETIVO
                    </th>
                    <th>
                      FACTURADO
                    </th>
              
                    <th>
                      RETE. CAMP. ANT.
                    </th>
                    <th>
                      OBJETIVO
                    </th>
                    <th>
                      FACTURADO
                    </th>
                    <th>
                      CUMP. FACT.
                    </th>
               
                    <th>
                      1 CAMP. ANTE.
                    </th>
                    <th>
                      FACTURADO
                    </th>
                    <th>
                      CUMP. FACT.
                    </th>
                
                    <th>
                      2 CAMP. ANTE.
                    </th>
                    <th>
                      FACTURADO
                    </th>
                    <th>
                      CUMP. FACT.
                    </th>
                
                    <th>
                      3 CAMP. ANTE.
                    </th>
                    <th>
                      FACTURADO
                    </th>
                    <th>
                      CUMP. FACT.
                    </th>
               
                    <th>
                      PEG21
                    </th>
                    <th>
                      OBJETIVO
                    </th>
                    <th>
                      RET. PEG21
                    </th>
                    <th>
                      % RET. FACT.
                    </th>
               
                    <th>
                      PEG42
                    </th>
                    <th>
                      OBJETIVO
                    </th>
                    <th>
                      RET. PEG42
                    </th>
                    <th>
                      % RET. FACT.
                    </th>
               
                    <th>
                      PEG63
                    </th>
                    <th>
                      OBJETIVO
                    </th>
                    <th>
                      RET. PEG63
                    </th>
                    <th>
                      % RET. FACT.
                    </th>
                
                    <th>
                      PEGS
                    </th>
                    <th>
                      OBJETIVO
                    </th>
                    <th>
                      RET. PEGS
                    </th>
                    <th>
                      CUMP. FACT.
                    </th>
               
                    <th>
                      POS. REING.
                    </th>
                    <th>
                      OBJETIVO
                    </th>
                    <th>
                      FACTURADO
                    </th>
                    <th>
                      % CUMP
                    </th>

                    <th>
                      OBJETIVO
                    </th>
                    <th>
                      FACTURADO
                    </th>
                  </tr>
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
                <template #bottom />
              </VDataTable>
            </VCard>
          </VCol>
        </VRow>
      </template>
    </AppPlantilla>
    <VDialog
      :fullscreen="(mobile) ? true : false"
      :max-width="(mobile) ? undefined : 1100"
      persistent
      :model-value="isOpen"
    >
      <VCard color="background">
        <VToolbar color="secondary">
          <VBtn
            v-if="mobile"
            icon
            color="default"
            :rounded="false"
            @click="onClose"
          >
            <VIcon icon="tabler-x" />
          </VBtn>
          <VToolbarTitle>
            Evaluacion ranking
          </VToolbarTitle>
          <VSpacer />
          <VToolbarItems>
            <VBtn
              v-if="!mobile"
              icon
              @click="onClose"
            >
              <VIcon icon="tabler-x" />
            </VBtn>
          </VToolbarItems>
        </VToolbar>
        <VDataTable
          :headers="headersDetalle"
          :items="itemsDetalle"
          :items-per-page="-1"
          class="text-no-wrap"
          fixed-header
          :height="(!mobile)? (itemsDetalle.length > 15) ? 400 : null: null"
        >
          <template #bottom />
        </VDataTable>
      </VCard>
    </VDialog>
  </div>
</template>
