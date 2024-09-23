<!-- eslint-disable camelcase -->
<script setup>
import { useAppStore } from '@/stores/app';
import { VDataTable } from 'vuetify/labs/VDataTable';

definePage({
  meta: {
    action: 'colombia/repo_come_pedi_digi_pais',
    subject: 'colombia/repo_come_pedi_digi_pais',
  },
})

const appStore = useAppStore()

const formulario = ref({
  campana: null,
  corte: null,
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

const headersCorte = [
  {
    title: 'Corte',
    key: 'codi_cort',
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
    title: '% Cump.',
    key: 'cump_rete',
  },
  {
    title: '% Acti.',
    key: 'acti_rete',
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
    title: '% Cump.',
    key: 'cump_tota',
  },
  {
    title: 'Capi.',
    key: 'fact_capi',
  },
  {
    title: 'P.P. Fact.',
    key: 'vent_ppfa',
  },
  {
    title: 'P.P. Rece.',
    key: 'vent_ppre',
  },
  {
    title: '% Cobr.',
    key: 'vent_cobr',
  },
]

const headersConsolidado = [
  {
    title: 'Corte',
    key: 'codi_cort',
  },
  {
    title: 'Nro zonas',
    key: 'codi_zona',
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
    title: 'Cump. Fact.',
    key: 'cump_fact_inco',
  },
  {
    title: 'Pend. Fact.',
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
    title: 'Cump. Fact.',
    key: 'cump_fact_rete',
  },
  {
    title: 'Pend. Fact.',
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
    title: '% Acti.',
    key: 'acti_rete',
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
    title: 'Cump. Fact.',
    key: 'cump_fact_tota',
  },
  {
    title: 'Pend. Fact.',
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
    title: 'Capi.',
    key: 'capi_tota',
  },
]

const headersRegion = [
  {
    title: 'Corte',
    key: 'codi_cort',
  },
  {
    title: 'Región',
    key: 'codi_area',
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
    title: 'Cump. Fact.',
    key: 'cump_fact_inco',
  },
  {
    title: 'Pend. Fact.',
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
    title: 'Cump. Fact.',
    key: 'cump_fact_rete',
  },
  {
    title: 'Pend. Fact.',
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
    title: '% Acti.',
    key: 'acti_rete',
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
    title: 'Cump. Fact.',
    key: 'cump_fact_tota',
  },
  {
    title: 'Pend. Fact.',
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
    title: 'Capi.',
    key: 'capi_tota',
  },
]

const itemsGlobal = ref([])
const itemsCorte = ref([])
const itemsConsolidado = ref([])
const itemsRegion = ref([])
const campanaOptions = ref([])
const corteOptions = ref([])
const errorCampana = ref(false)
const errorMensajeCampana = ref('')

onMounted(async () => {
  appStore.titulo(`Reportes / Pedido digitado pais`)
  initConfiguracion()
  await obtenerCampana()
  await obtenerCorte()
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
    {
      nomb_conc: 'Retención',
      line_desc: '',
      obje_conc: '0',
      falt_desc: '',
      fact_conc: '0',
      rece_desc: '',
      porc_conc: '0.00 %',
    },
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
      obje_conc: `COP/. 0.00`,
      falt_desc: 'Faltante',
      fact_conc: `COP/. 0.00`,
      rece_desc: 'Recepcionado',
      porc_conc: `COP/. 0.00`,
    },
    {
      nomb_conc: 'P.P. Facturado',
      line_desc: '',
      obje_conc: `COP/. 0.00`,
      falt_desc: '',
      fact_conc: 'P.P. Recepcionado',
      rece_desc: '',
      porc_conc: `COP/. 0.00`,
    },
    {
      nomb_conc: 'Cobranza 21 días',
      line_desc: '',
      obje_conc: `COP/. 0.00`,
      falt_desc: '',
      fact_conc: `COP/. 0.00`,
      rece_desc: '',
      porc_conc: '0.00 %',
    },
    {
      nomb_conc: 'Cobranza saldo actual',
      line_desc: '',
      obje_conc: `COP/. 0.00`,
      falt_desc: '',
      fact_conc: `COP/. 0.00`,
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
  itemsCorte.value = []
  itemsConsolidado.value = []
  itemsRegion.value = []
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

const obtenerCorte = async () => {
  try {
    appStore.mensaje('Obteniendo cortes')
    appStore.loading(true)

    const { data } = await $api(`/api/comun/v1/cortes`, {
      method: "get",
    })
    
    const itemCorte = data.data_glob
    
    itemCorte.forEach(element => 
      corteOptions.value.push({
        id: element.codi_cort,
        text: element.codi_cort,
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

    const { data } = await $api(`/api/sami/v1/reportes/pedidos-digitados-pais`, {
      method: "get",
      query: {
        campana: (formulario.value.campana === null) ? '' : formulario.value.campana,
      },
    })

    itemsGlobal.value = data.data_glob
    itemsCorte.value = []
    itemsConsolidado.value = data.data_cort
    itemsRegion.value = data.data_area
    
  } catch (error) {
    const { data } = error.response._data    
    if (typeof data != "undefined") {
      for (var key in data)
      {
        if (key == 'campana') {
          errorCampana.value = true
          errorMensajeCampana.value = data[key]
        }
      }
    }
  }
  finally {
    appStore.loading(false)
  }
}

const onGenerarCumplimiento = async () => {
  if(itemsConsolidado.value.length == 0 ) {
    formulario.value.corte = null
    appStore.mensajeSnackbar('No a generado el reporte pedidos digitados pais.')
    appStore.color("error")
    appStore.snackbar(true)
  } else {
    try {
      appStore.mensaje('Obteniendo información')
      appStore.loading(true)
      itemsCorte.value = []

      const { data } = await $api( `/api/sami/v1/reportes/pedidos-digitados-pais/cumplimiento`, {
        method: "get",
        query: {
          corte: (formulario.value.corte === null) ? '' : formulario.value.corte,
        },
      })

      itemsCorte.value = data.data_cump
    
    } catch (error) {
      console.log(error)
    }
    finally {
      appStore.loading(false)
    }
  }
  
}

const onLimpiar= async () => {
  formulario.value = {
    campana: null,
    corte: null,
  }
  initConfiguracion()
}

const onExcel = async () => {
  if(itemsCorte.value.length == 0 ) {
    formulario.value.corte = null
    appStore.mensajeSnackbar('No a generado el cumplimiento al corte.')
    appStore.color("error")
    appStore.snackbar(true)
  } else {
    try {
      appStore.mensaje('Generando archivo')
      appStore.loading(true)

      const { data } = await $api(`/api/sami/v1/reportes/pedidos-digitados-pais/excel`, {
        method: "post",
        body: {
          data_glob: itemsGlobal.value,
          data_cump: itemsCorte.value,
          data_cort: itemsConsolidado.value,
          data_area: itemsRegion.value,
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
            <VCard title="Cumplimiento al corte">
              <VCardText>
                <VRow justify="space-between">
                  <VCol
                    cols="12"
                    md="4"
                  >
                    <AppSelect
                      v-model="formulario.corte"
                      :items="corteOptions"
                      label="Corte"
                      placeholder="Seleccionar corte"
                      item-title="text"
                      item-value="id"
                      @update:model-value="onGenerarCumplimiento"
                    />
                  </VCol>
                </VRow>
              </VCardText>
              <VCardText>
                <VDataTable
                  :headers="headersCorte"
                  :items="itemsCorte"
                  :items-per-page="-1"
                  class="text-no-wrap"
                  
                  fixed-header
                  density="compact"
                >
                  <template #headers>
                    <tr>
                      <th rowspan="2">
                        CORTE
                      </th>
                      <th
                        colspan="3"
                        class="text-center"
                      >
                        INCORPORACIÓN
                      </th>
                      <th
                        colspan="4"
                        class="text-center"
                      >
                        RETENCIÓN
                      </th>
                      <th
                        colspan="4"
                        class="text-center"
                      >
                        PEDIDOS TOTALES 
                      </th>

                      <th rowspan="2">
                        P.P. FACT.
                      </th>
                      <th rowspan="2">
                        P.P. RECE.
                      </th>
                      <th rowspan="2">
                        % COBR.
                      </th>
                    </tr>
                    <tr>
                      <th>OBJETIVO</th>
                      <th>FACTURADO</th>
                      <th>% CUMP.</th>
                      <th>OBJETIVO</th>
                      <th>FACTURADO</th>
                      <th>% CUMP.</th>
                      <th>% ACTI.</th>
                      <th>OBJETIVO</th>
                      <th>FACTURADO</th>
                      <th>% CUMP.</th>
                      <th>CAPI</th>
                    </tr>
                  </template>
                  <template #bottom />
                </VDataTable>
              </VCardText>
            </VCard>
          </VCol>

          <VCol cols="12">
            <VCard title="Consolidado corte">
              <VCardText>
                <VDataTable
                  :headers="headersConsolidado"
                  :items="itemsConsolidado"
                  :items-per-page="-1"
                  class="text-no-wrap"
                  
                  fixed-header
                  density="compact"
                  height="400"
                >
                  <template #headers>
                    <tr>
                      <th rowspan="2">
                        CORTE
                      </th>
                      <th rowspan="2">
                        NRO ZONA
                      </th>
                      <th
                        colspan="6"
                        class="text-center"
                      >
                        INCORPORACIÓN
                      </th>
                      <th 
                        colspan="7" 
                        class="text-center"
                      >
                        RETENCIÓN
                      </th>
                      <th
                        colspan="7"
                        class="text-center"
                      >
                        PEDIDOS TOTALES
                      </th>
                    </tr>
                    <tr>
                      <th>OBJETIVO</th>
                      <th>FACTURADO</th>
                      <th>CUMP. FACT.</th>
                      <th>PEND. FACT.</th>
                      <th>TOTAL</th>
                      <th>% CUMP.</th>

                      <th>OBJETIVO</th>
                      <th>FACTURADO</th>
                      <th>CUMP. FACT.</th>
                      <th>PEND. FACT.</th>
                      <th>TOTAL</th>
                      <th>% CUMP.</th>
                      <th>% ACTI.</th>

                      <th>OBJETIVO</th>
                      <th>FACTURADO</th>
                      <th>CUMP. FACT.</th>
                      <th>PEND. FACT.</th>
                      <th>'TOTAL</th>
                      <th>% CUMP.</th>
                      <th>CAPI.</th>
                    </tr>
                  </template>
                  <template #item.obje_inco="{ item }">
                    <VChip color="warning">
                      {{ item.obje_inco }}
                    </VChip>
                  </template>
                  <template #item.fact_inco="{ item }">
                    <VChip color="warning">
                      {{ item.fact_inco }}
                    </VChip>
                  </template>
                  <template #item.cump_fact_inco="{ item }">
                    <VChip color="warning">
                      {{ item.cump_fact_inco }}
                    </VChip>
                  </template>
                  <template #item.pend_fact_inco="{ item }">
                    <VChip color="warning">
                      {{ item.pend_fact_inco }}
                    </VChip>
                  </template>
                  <template #item.tota_inco="{ item }">
                    <VChip color="warning">
                      {{ item.tota_inco }}
                    </VChip>
                  </template>
                  <template #item.cump_inco="{ item }">
                    <VChip color="warning">
                      {{ item.cump_inco }}
                    </VChip>
                  </template>

                  <template #item.obje_rete="{ item }">
                    <VChip color="success">
                      {{ item.obje_rete }}
                    </VChip>
                  </template>
                  <template #item.fact_rete="{ item }">
                    <VChip color="success">
                      {{ item.fact_rete }}
                    </VChip>
                  </template>
                  <template #item.cump_fact_rete="{ item }">
                    <VChip color="success">
                      {{ item.cump_fact_rete }}
                    </VChip>
                  </template>
                  <template #item.pend_fact_rete="{ item }">
                    <VChip color="success">
                      {{ item.pend_fact_rete }}
                    </VChip>
                  </template>
                  <template #item.tota_rete="{ item }">
                    <VChip color="success">
                      {{ item.tota_rete }}
                    </VChip>
                  </template>
                  <template #item.cump_rete="{ item }">
                    <VChip color="success">
                      {{ item.cump_rete }}
                    </VChip>
                  </template>
                  <template #item.acti_rete="{ item }">
                    <VChip color="success">
                      {{ item.acti_rete }}
                    </VChip>
                  </template>

                  <template #item.obje_tota="{ item }">
                    <VChip color="error">
                      {{ item.obje_tota }}
                    </VChip>
                  </template>
                  <template #item.fact_tota="{ item }">
                    <VChip color="error">
                      {{ item.fact_tota }}
                    </VChip>
                  </template>
                  <template #item.cump_fact_tota="{ item }">
                    <VChip color="error">
                      {{ item.cump_fact_tota }}
                    </VChip>
                  </template>
                  <template #item.pend_fact_tota="{ item }">
                    <VChip color="error">
                      {{ item.pend_fact_tota }}
                    </VChip>
                  </template>
                  <template #item.tota_tota="{ item }">
                    <VChip color="error">
                      {{ item.tota_tota }}
                    </VChip>
                  </template>
                  <template #item.cump_tota="{ item }">
                    <VChip color="error">
                      {{ item.cump_tota }}
                    </VChip>
                  </template>
                  <template #item.capi_tota="{ item }">
                    <VChip color="error">
                      {{ item.capi_tota }}
                    </VChip>
                  </template>              
                  <template #bottom />
                </VDataTable>
              </VCardText>
            </VCard>
          </VCol>

          <VCol cols="12">
            <VCard title="Detalle pedido región">
              <VCardText>
                <VDataTable
                  :headers="headersRegion"
                  :items="itemsRegion"
                  :items-per-page="-1"
                  class="text-no-wrap"
                  
                  fixed-header
                  density="compact"
                  height="400"
                >
                  <template #headers>
                    <tr>
                      <th rowspan="2">
                        CORTE
                      </th>
                      <th rowspan="2">
                        REGIÓN
                      </th>
                      <th
                        colspan="6"
                        class="text-center"
                      >
                        INCORPORACION
                      </th>
                      <th 
                        colspan="8" 
                        class="text-center"
                      >
                        RETENCION
                      </th>
                      <th
                        colspan="7"
                        class="text-center"
                      >
                        PEDIDOS TOTALES
                      </th>
                    </tr>
                    <tr>
                      <th>OBJETIVO</th>
                      <th>FACTURADO</th>
                      <th>CUMP. FACT.</th>
                      <th>PEND. FACT.</th>
                      <th>TOTAL</th>
                      <th>% CUMP.</th>
                      <th>OBJETIVO</th>
                      <th>FACTURADO</th>
                      <th>CUMP. FACT.</th>
                      <th>PEND. FACT.</th>
                      <th>TOTAL</th>
                      <th>% CUMP.</th>
                      <th>% ACTI.</th>
                      <th>OBJETIVO</th>
                      <th>FACTURADO</th>
                      <th>CUMP. FACT.</th>
                      <th>PEND. FACT.</th>
                      <th>TOTAL</th>
                      <th>% CUMP.</th>
                      <th>CAPI.</th>
                    </tr>
                  </template>
                  <template #bottom />
                </VDataTable>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </template>
    </AppPlantilla>
  </div>
</template>
