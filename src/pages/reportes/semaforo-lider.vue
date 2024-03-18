<!-- eslint-disable camelcase -->
<script setup>
import { useAppStore } from '@/stores/app'
import { EncryptStorage } from 'encrypt-storage'
import { VDataTable } from 'vuetify/labs/VDataTable'

definePage({
  meta: {
    action: 'peru/repo_come_sema_lide',
    subject: 'peru/repo_come_sema_lide',
  },
})

const encryptStorage = new EncryptStorage('AZZORTI-SAMI', {
  storageType: 'localStorage',
})

const userData = encryptStorage.getItem('userData')
const appStore = useAppStore()

const formulario = ref({
  campana: null,
  zona: null,
  sector: null,
})

const codi_camp_1 = ref('0')
const codi_camp_2 = ref('0')
const codi_camp_3 = ref('0')
const codi_camp_4 = ref('0')
const codi_camp_5 = ref('0')
const codi_camp_6 = ref('0')

const headers = computed(() => {
  return [
    {
      title: 'Concepto',
      key: 'nomb_conc',
      sortable: false,
    },
    {
      title: codi_camp_1.value,
      key: 'codi_camp_1',
      sortable: false,
    },
    {
      title: codi_camp_2.value,
      key: 'codi_camp_2',
      sortable: false,
    },
    {
      title: codi_camp_3.value,
      key: 'codi_camp_3',
      sortable: false,
    },
    {
      title: codi_camp_4.value,
      key: 'codi_camp_4',
      sortable: false,
    },
    {
      title: codi_camp_5.value,
      key: 'codi_camp_5',
      sortable: false,
    },
    {
      title: codi_camp_6.value,
      key: 'codi_camp_6',
      sortable: false,
    },
    {
      title: 'Total',
      key: 'tota_camp',
      sortable: false,
    },
  ]
})

const itemsTotal = ref([])
const itemsIncorporacion = ref([])
const itemsRetencion = ref([])
const itemsActividad = ref([])
const itemsConsecutiva = ref([])
const itemsConsecutivaSegundo = ref([])
const itemsConsecutivaTercer = ref([])
const itemsConsecutivaCuarto = ref([])
const itemsPegs = ref([])
const itemsCapitalizacion = ref([])
const itemsCanje = ref([])
const itemsCobranza = ref([])
const itemsNivel = ref([])

const campanaOptions = ref([])
const errorCampana = ref(false)
const errorMensajeCampana = ref('')

const zonaOptions = ref([])
const errorZona = ref(false)
const errorMensajeZona = ref('')

const sectorOptions = ref([])
const errorSector = ref(false)
const errorMensajeSector = ref('')

onMounted(async () => {
  appStore.titulo(`Reportes / Semaforo zona`)
  await obtenerCampana()
  await obtenerZona()
  inicioVariables()
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
    appStore.mensaje('Obteniendo zonas')
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

const obtenerSector = async () => {
  try {
    appStore.mensaje('Obteniendo sectores')
    appStore.loading(true)

    const { data } = await $api(`/api/comun/v1/sectores`, {
      method: "get",
      paqueryrams: {
        codigo: userData.codi_perf,
        zona: formulario.value.zona,
      },
    })
    
    const itemSector = data.data_glob
    
    itemSector.forEach(element => 
      sectorOptions.value.push({
        id: element.codi_sect,
        text: element.codi_sect,
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

    inicioVariables()

    const { data } = await $api(`/api/sami/v1/reportes/semaforo-lider`, {
      method: "get",
      query: {
        campana: (formulario.value.campana === null) ? '' : formulario.value.campana,
        zona: (formulario.value.zona === null) ? '' : formulario.value.zona,
        sector: (formulario.value.sector === null) ? '' : formulario.value.sector,
      },
    })

    codi_camp_1.value = data.codi_camp_1
    codi_camp_2.value = data.codi_camp_2
    codi_camp_3.value = data.codi_camp_3
    codi_camp_4.value = data.codi_camp_4
    codi_camp_5.value = data.codi_camp_5
    codi_camp_6.value = data.codi_camp_6

    itemsTotal.value = data.data_pedi_tota
    itemsIncorporacion.value = data.data_pedi_inco
    itemsRetencion.value = data.data_pedi_rete
    itemsActividad.value = data.data_acti

    itemsConsecutiva.value = data.data_cons_pedi_rete
    itemsConsecutivaSegundo.value = data.data_cons_segu
    itemsConsecutivaTercer.value = data.data_cons_terc
    itemsConsecutivaCuarto.value = data.data_cons_cuar
    itemsPegs.value = data.data_suma_pegs
    itemsCapitalizacion.value = data.data_capi
    itemsCanje.value = data.data_canj
    itemsCobranza.value = data.data_cobr
    itemsNivel.value = data.data_nive

    
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
        if (key == 'sector') {
          errorSector.value = true
          errorMensajeSector.value = data[key]
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
    sector: null,
  }
  inicioVariables()
}

const onExcel = async () => {
  try {
    appStore.mensaje('Generando archivo')
    appStore.loading(true)

    const { data } = await $api(`/api/sami/v1/reportes/semaforo-lider/excel`, {
      method: "post",
      body: {
        total: itemsTotal.value,
        incorporacion: itemsIncorporacion.value,
        retencion: itemsRetencion.value,
        actividad: itemsActividad.value,
        consecutiva: itemsConsecutiva.value,
        consecutiva_segundo: itemsConsecutivaSegundo.value,
        consecutiva_tercero: itemsConsecutivaTercer.value,
        consecutiva_cuarto: itemsConsecutivaCuarto.value,
        pegs: itemsPegs.value,
        capitalizacion: itemsCapitalizacion.value,
        cobranza: itemsCobranza.value,
        canjes: itemsCanje.value,
        nivel: itemsNivel.value,
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

const inicioVariables = () => {
  itemsTotal.value = [
    {
      nomb_conc: 'Facturado',
      codi_camp_1: '0',
      codi_camp_2: '0',
      codi_camp_3: '0',
      codi_camp_4: '0',
      codi_camp_5: '0',
      codi_camp_6: '0',
      tota_camp: '0',
    }, {
      nomb_conc: 'Objetivo',
      codi_camp_1: '0',
      codi_camp_2: '0',
      codi_camp_3: '0',
      codi_camp_4: '0',
      codi_camp_5: '0',
      codi_camp_6: '0',
      tota_camp: '0',
    }, {
      nomb_conc: '% Cumplimiento',
      codi_camp_1: '0.00',
      codi_camp_2: '0.00',
      codi_camp_3: '0.00',
      codi_camp_4: '0.00',
      codi_camp_5: '0.00',
      codi_camp_6: '0.00',
      tota_camp: '0.00',
    },
  ]
  itemsIncorporacion.value = [
    {
      nomb_conc: 'Facturado',
      codi_camp_1: '0',
      codi_camp_2: '0',
      codi_camp_3: '0',
      codi_camp_4: '0',
      codi_camp_5: '0',
      codi_camp_6: '0',
      tota_camp: '0',
    }, {
      nomb_conc: 'Objetivo',
      codi_camp_1: '0',
      codi_camp_2: '0',
      codi_camp_3: '0',
      codi_camp_4: '0',
      codi_camp_5: '0',
      codi_camp_6: '0',
      tota_camp: '0',
    }, {
      nomb_conc: '% Cumplimiento',
      codi_camp_1: '0.00',
      codi_camp_2: '0.00',
      codi_camp_3: '0.00',
      codi_camp_4: '0.00',
      codi_camp_5: '0.00',
      codi_camp_6: '0.00',
      tota_camp: '0.00',
    },
  ]
  itemsRetencion.value = [
    {
      nomb_conc: 'Facturado',
      codi_camp_1: '0',
      codi_camp_2: '0',
      codi_camp_3: '0',
      codi_camp_4: '0',
      codi_camp_5: '0',
      codi_camp_6: '0',
      tota_camp: '0',
    }, {
      nomb_conc: 'Objetivo',
      codi_camp_1: '0',
      codi_camp_2: '0',
      codi_camp_3: '0',
      codi_camp_4: '0',
      codi_camp_5: '0',
      codi_camp_6: '0',
      tota_camp: '0',
    }, {
      nomb_conc: '% Cumplimiento',
      codi_camp_1: '0.00',
      codi_camp_2: '0.00',
      codi_camp_3: '0.00',
      codi_camp_4: '0.00',
      codi_camp_5: '0.00',
      codi_camp_6: '0.00',
      tota_camp: '0.00',
    },
  ]
  itemsActividad.value = [
    {
      nomb_conc: 'Facturado',
      codi_camp_1: '0.00',
      codi_camp_2: '0.00',
      codi_camp_3: '0.00',
      codi_camp_4: '0.00',
      codi_camp_5: '0.00',
      codi_camp_6: '0.00',
      tota_camp: '0.00',
    }, {
      nomb_conc: 'Objetivo',
      codi_camp_1: '0.00',
      codi_camp_2: '0.00',
      codi_camp_3: '0.00',
      codi_camp_4: '0.00',
      codi_camp_5: '0.00',
      codi_camp_6: '0.00',
      tota_camp: '0.00',
    },
  ]
  itemsNivel.value = [
    {
      nomb_conc: 'Facturado',
      codi_camp_1: '0',
      codi_camp_2: '0',
      codi_camp_3: '0',
      codi_camp_4: '0',
      codi_camp_5: '0',
      codi_camp_6: '0',
      tota_camp: '0',
    },
  ]
  itemsCanje.value = [
    {
      nomb_conc: 'Venta Neta',
      codi_camp_1: '0.00',
      codi_camp_2: '0.00',
      codi_camp_3: '0.00',
      codi_camp_4: '0.00',
      codi_camp_5: '0.00',
      codi_camp_6: '0.00',
      tota_camp: '0.00',
    }, {
      nomb_conc: '% Cumplimiento',
      codi_camp_1: '0.00',
      codi_camp_2: '0.00',
      codi_camp_3: '0.00',
      codi_camp_4: '0.00',
      codi_camp_5: '0.00',
      codi_camp_6: '0.00',
      tota_camp: '0.00',
    },
  ]
  itemsCobranza.value = [
    {
      nomb_conc: 'Facturado',
      codi_camp_1: '0.00',
      codi_camp_2: '0.00',
      codi_camp_3: '0.00',
      codi_camp_4: '0.00',
      codi_camp_5: '0.00',
      codi_camp_6: '0.00',
      tota_camp: '0.00',
    }, {
      nomb_conc: '% Cumplimiento',
      codi_camp_1: '0.00',
      codi_camp_2: '0.00',
      codi_camp_3: '0.00',
      codi_camp_4: '0.00',
      codi_camp_5: '0.00',
      codi_camp_6: '0.00',
      tota_camp: '0.00',
    },
  ]
  itemsCapitalizacion.value = [
    {
      nomb_conc: 'Facturado',
      codi_camp_1: '0',
      codi_camp_2: '0',
      codi_camp_3: '0',
      codi_camp_4: '0',
      codi_camp_5: '0',
      codi_camp_6: '0',
      tota_camp: '0',
    }, {
      nomb_conc: 'Objetivo',
      codi_camp_1: '0',
      codi_camp_2: '0',
      codi_camp_3: '0',
      codi_camp_4: '0',
      codi_camp_5: '0',
      codi_camp_6: '0',
      tota_camp: '0',
    },
  ]
  itemsPegs.value =  [
    {
      nomb_conc: 'Facturado',
      codi_camp_1: '0',
      codi_camp_2: '0',
      codi_camp_3: '0',
      codi_camp_4: '0',
      codi_camp_5: '0',
      codi_camp_6: '0',
      tota_camp: '0',
    }, {
      nomb_conc: 'Objetivo',
      codi_camp_1: '0',
      codi_camp_2: '0',
      codi_camp_3: '0',
      codi_camp_4: '0',
      codi_camp_5: '0',
      codi_camp_6: '0',
      tota_camp: '0',
    }, {
      nomb_conc: '% Cumplimiento',
      codi_camp_1: '0.00',
      codi_camp_2: '0.00',
      codi_camp_3: '0.00',
      codi_camp_4: '0.00',
      codi_camp_5: '0.00',
      codi_camp_6: '0.00',
      tota_camp: '0.00',
    },
  ]
  itemsConsecutivaCuarto.value = [
    {
      nomb_conc: 'Facturado',
      codi_camp_1: '0',
      codi_camp_2: '0',
      codi_camp_3: '0',
      codi_camp_4: '0',
      codi_camp_5: '0',
      codi_camp_6: '0',
      tota_camp: '0',
    }, {
      nomb_conc: 'Objetivo',
      codi_camp_1: '0',
      codi_camp_2: '0',
      codi_camp_3: '0',
      codi_camp_4: '0',
      codi_camp_5: '0',
      codi_camp_6: '0',
      tota_camp: '0',
    }, {
      nomb_conc: '% Cumplimiento',
      codi_camp_1: '0.00',
      codi_camp_2: '0.00',
      codi_camp_3: '0.00',
      codi_camp_4: '0.00',
      codi_camp_5: '0.00',
      codi_camp_6: '0.00',
      tota_camp: '0.00',
    },
  ]
  itemsConsecutivaTercer.value =  [
    {
      nomb_conc: 'Facturado',
      codi_camp_1: '0',
      codi_camp_2: '0',
      codi_camp_3: '0',
      codi_camp_4: '0',
      codi_camp_5: '0',
      codi_camp_6: '0',
      tota_camp: '0',
    }, {
      nomb_conc: 'Objetivo',
      codi_camp_1: '0',
      codi_camp_2: '0',
      codi_camp_3: '0',
      codi_camp_4: '0',
      codi_camp_5: '0',
      codi_camp_6: '0',
      tota_camp: '0',
    }, {
      nomb_conc: '% Cumplimiento',
      codi_camp_1: '0.00',
      codi_camp_2: '0.00',
      codi_camp_3: '0.00',
      codi_camp_4: '0.00',
      codi_camp_5: '0.00',
      codi_camp_6: '0.00',
      tota_camp: '0.00',
    },
  ]
  itemsConsecutivaSegundo.value = [
    {
      nomb_conc: 'Facturado',
      codi_camp_1: '0',
      codi_camp_2: '0',
      codi_camp_3: '0',
      codi_camp_4: '0',
      codi_camp_5: '0',
      codi_camp_6: '0',
      tota_camp: '0',
    }, {
      nomb_conc: 'Objetivo',
      codi_camp_1: '0',
      codi_camp_2: '0',
      codi_camp_3: '0',
      codi_camp_4: '0',
      codi_camp_5: '0',
      codi_camp_6: '0',
      tota_camp: '0',
    }, {
      nomb_conc: '% Cumplimiento',
      codi_camp_1: '0.00',
      codi_camp_2: '0.00',
      codi_camp_3: '0.00',
      codi_camp_4: '0.00',
      codi_camp_5: '0.00',
      codi_camp_6: '0.00',
      tota_camp: '0.00',
    },
  ]
  itemsConsecutiva.value = [
    {
      nomb_conc: 'Facturado',
      codi_camp_1: '0',
      codi_camp_2: '0',
      codi_camp_3: '0',
      codi_camp_4: '0',
      codi_camp_5: '0',
      codi_camp_6: '0',
      tota_camp: '0',
    }, {
      nomb_conc: 'Objetivo',
      codi_camp_1: '0',
      codi_camp_2: '0',
      codi_camp_3: '0',
      codi_camp_4: '0',
      codi_camp_5: '0',
      codi_camp_6: '0',
      tota_camp: '0',
    }, {
      nomb_conc: '% Cumplimiento',
      codi_camp_1: '0.00',
      codi_camp_2: '0.00',
      codi_camp_3: '0.00',
      codi_camp_4: '0.00',
      codi_camp_5: '0.00',
      codi_camp_6: '0.00',
      tota_camp: '0.00',
    },
  ]
}

const limpiarValidacion = () => {
  errorCampana.value = false
  errorMensajeCampana.value = ''
  errorZona.value = false
  errorMensajeZona.value = ''
  errorSector.value = false
  errorMensajeSector.value = ''
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
            <VCard title="Buscar semáforo">
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
                      @update:model-value="obtenerSector"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="4"
                  >
                    <AppSelect
                      v-model="formulario.sector"
                      :items="sectorOptions"
                      label="Sector"
                      placeholder="Seleccionar sector"
                      item-title="text"
                      item-value="id"
                      :error="errorSector"
                      :error-messages="errorMensajeSector"
                    />
                  </VCol>
                </VRow>
              </VCardText>
            </VCard>
          </VCol>

          <VCol cols="12">
            <VCard title="Pedidos totales">
              <VCardText>
                <VDataTable
                  :headers="headers"
                  :items="itemsTotal"
                  :items-per-page="-1"
                  class="text-no-wrap"
                  
                  fixed-header
                >
                  <template #bottom />
                </VDataTable>
              </VCardText>
            </VCard>
          </VCol>

          <VCol cols="12">
            <VCard title="Incorporación">
              <VCardText>
                <VDataTable
                  :headers="headers"
                  :items="itemsIncorporacion"
                  :items-per-page="-1"
                  class="text-no-wrap"
                  
                  fixed-header
                >
                  <template #bottom />
                </VDataTable>
              </VCardText>
            </VCard>
          </VCol>

          <VCol cols="12">
            <VCard title="Pedido de retención">
              <VCardText>
                <VDataTable
                  :headers="headers"
                  :items="itemsRetencion"
                  :items-per-page="-1"
                  class="text-no-wrap"
                  
                  fixed-header
                >
                  <template #bottom />
                </VDataTable>
              </VCardText>
            </VCard>
          </VCol>

          <VCol cols="12">
            <VCard title="% Actividad">
              <VCardText>
                <VDataTable
                  :headers="headers"
                  :items="itemsActividad"
                  :items-per-page="-1"
                  class="text-no-wrap"
                  
                  fixed-header
                >
                  <template #bottom />
                </VDataTable>
              </VCardText>
            </VCard>
          </VCol>

          <VCol cols="12">
            <VCard title="Consecutividad pedidos de retención">
              <VCardText>
                <VDataTable
                  :headers="headers"
                  :items="itemsConsecutiva"
                  :items-per-page="-1"
                  class="text-no-wrap"
                  
                  fixed-header
                >
                  <template #bottom />
                </VDataTable>
              </VCardText>
            </VCard>
          </VCol>

          <VCol cols="12">
            <VCard title="Consecutividad 2do pedido">
              <VCardText>
                <VDataTable
                  :headers="headers"
                  :items="itemsConsecutivaSegundo"
                  :items-per-page="-1"
                  class="text-no-wrap"
                  
                  fixed-header
                >
                  <template #bottom />
                </VDataTable>
              </VCardText>
            </VCard>
          </VCol>

          <VCol cols="12">
            <VCard title="Consecutividad 3er pedido">
              <VCardText>
                <VDataTable
                  :headers="headers"
                  :items="itemsConsecutivaTercer"
                  :items-per-page="-1"
                  class="text-no-wrap"
                  
                  fixed-header
                >
                  <template #bottom />
                </VDataTable>
              </VCardText>
            </VCard>
          </VCol>

          <VCol cols="12">
            <VCard title="Consecutividad 4to pedido">
              <VCardText>
                <VDataTable
                  :headers="headers"
                  :items="itemsConsecutivaCuarto"
                  :items-per-page="-1"
                  class="text-no-wrap"
                  
                  fixed-header
                >
                  <template #bottom />
                </VDataTable>
              </VCardText>
            </VCard>
          </VCol>

          <VCol cols="12">
            <VCard title="Suma ret. pegs">
              <VCardText>
                <VDataTable
                  :headers="headers"
                  :items="itemsPegs"
                  :items-per-page="-1"
                  class="text-no-wrap"
                  
                  fixed-header
                >
                  <template #bottom />
                </VDataTable>
              </VCardText>
            </VCard>
          </VCol>

          <VCol cols="12">
            <VCard title="Capitalización">
              <VCardText>
                <VDataTable
                  :headers="headers"
                  :items="itemsCapitalizacion"
                  :items-per-page="-1"
                  class="text-no-wrap"
                  
                  fixed-header
                >
                  <template #bottom />
                </VDataTable>
              </VCardText>
            </VCard>
          </VCol>

          <VCol cols="12">
            <VCard title="Cobranza 21 días">
              <VCardText>
                <VDataTable
                  :headers="headers"
                  :items="itemsCobranza"
                  :items-per-page="-1"
                  class="text-no-wrap"
                  
                  fixed-header
                >
                  <template #bottom />
                </VDataTable>
              </VCardText>
            </VCard>
          </VCol>

          <VCol cols="12">
            <VCard title="Cambios y devoluciones">
              <VCardText>
                <VDataTable
                  :headers="headers"
                  :items="itemsCanje"
                  :items-per-page="-1"
                  class="text-no-wrap"
                  
                  fixed-header
                >
                  <template #bottom />
                </VDataTable>
              </VCardText>
            </VCard>
          </VCol>

          <VCol cols="12">
            <VCard title="Nivel lider">
              <VCardText>
                <VDataTable
                  :headers="headers"
                  :items="itemsNivel"
                  :items-per-page="-1"
                  class="text-no-wrap"
                  
                  fixed-header
                >
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
 