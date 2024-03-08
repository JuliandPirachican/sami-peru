<script setup>
import { useAppStore } from '@/stores/app'
import { VDataTable } from 'vuetify/labs/VDataTable'

definePage({
  meta: {
    action: 'peru/repo_come_gemm_acum',
    subject: 'peru/repo_come_gemm_acum',
  },
})

const userData = JSON.parse(localStorage.getItem('userData'))
const appStore = useAppStore()

const formulario = ref({
  anno: null,
  zona: null,
})

const headers = [
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
    title: 'Nro ident.',
    key: 'nume_iden',
  },
  {
    title: 'Nombre(s)',
    key: 'nomb_terc',
  },
  {
    title: 'Apellido(s)',
    key: 'apel_terc',
  },
  {
    title: 'Teléfono',
    key: 'tele_terc',
  },
  {
    title: 'Perfil',
    key: 'perf_terc',
  },
  {
    title: 'Consec. C01',
    key: 'cons_1',
  },
  {
    title: 'Antiguedad C01',
    key: 'anti_1',
  },
  {
    title: 'Puntaje acum. C01',
    key: 'punt_1',
  },
  {
    title: 'Celebraciones C01',
    key: 'cele_1',
  },
  {
    title: 'Gemmas usadas C01',
    key: 'usad_1',
  },
  {
    title: 'Consec. C02',
    key: 'cons_2',
  },
  {
    title: 'Antiguedad C02',
    key: 'anti_2',
  },
  {
    title: 'Puntaje acum. C02',
    key: 'punt_2',
  },
  {
    title: 'Celebraciones C02',
    key: 'cele_2',
  },
  {
    title: 'Gemmas usadas C02',
    key: 'usad_2',
  },
  {
    title: 'Consec. C03',
    key: 'cons_3',
  },
  {
    title: 'Antiguedad C03',
    key: 'anti_3',
  },
  {
    title: 'Puntaje acum. C03',
    key: 'punt_3',
  },
  {
    title: 'Celebraciones C03',
    key: 'cele_3',
  },
  {
    title: 'Gemmas usadas C03',
    key: 'usad_3',
  },
  {
    title: 'Consec. C04',
    key: 'cons_4',
  },
  {
    title: 'Antiguedad C04',
    key: 'anti_4',
  },
  {
    title: 'Puntaje acum. C04',
    key: 'punt_4',
  },
  {
    title: 'Celebraciones C04',
    key: 'cele_4',
  },
  {
    title: 'Gemmas usadas C04',
    key: 'usad_4',
  },
  {
    title: 'Consec. C05',
    key: 'cons_5',
  },
  {
    title: 'Antiguedad C05',
    key: 'anti_5',
  },
  {
    title: 'Puntaje acum. C05',
    key: 'punt_5',
  },
  {
    title: 'Celebraciones C05',
    key: 'cele_5',
  },
  {
    title: 'Gemmas usadas C05',
    key: 'usad_5',
  },
  {
    title: 'Consec. C06',
    key: 'cons_6',
  },
  {
    title: 'Antiguedad C06',
    key: 'anti_6',
  },
  {
    title: 'Puntaje acum. C06',
    key: 'punt_6',
  },
  {
    title: 'Celebraciones C06',
    key: 'cele_6',
  },
  {
    title: 'Gemmas usadas C06',
    key: 'usad_6',
  },
  {
    title: 'Consec. C07',
    key: 'cons_7',
  },
  {
    title: 'Antiguedad C07',
    key: 'anti_7',
  },
  {
    title: 'Puntaje acum. C07',
    key: 'punt_7',
  },
  {
    title: 'Celebraciones C07',
    key: 'cele_7',
  },
  {
    title: 'Gemmas usadas C07',
    key: 'usad_7',
  },
  {
    title: 'Consec. C08',
    key: 'cons_8',
  },
  {
    title: 'Antiguedad C08',
    key: 'anti_8',
  },
  {
    title: 'Puntaje acum. C08',
    key: 'punt_8',
  },
  {
    title: 'Celebraciones C08',
    key: 'cele_8',
  },
  {
    title: 'Gemmas usadas C08',
    key: 'usad_8',
  },
  {
    title: 'Consec. C09',
    key: 'cons_9',
  },
  {
    title: 'Antiguedad C09',
    key: 'anti_9',
  },
  {
    title: 'Puntaje acum. C09',
    key: 'punt_9',
  },
  {
    title: 'Celebraciones C09',
    key: 'cele_9',
  },
  {
    title: 'Gemmas usadas C09',
    key: 'usad_9',
  },
  {
    title: 'Consec. C10',
    key: 'cons_10',
  },
  {
    title: 'Antiguedad C10',
    key: 'anti_10',
  },
  {
    title: 'Puntaje acum. C10',
    key: 'punt_10',
  },
  {
    title: 'Celebraciones C10',
    key: 'cele_10',
  },
  {
    title: 'Gemmas usadas C10',
    key: 'usad_10',
  },
  {
    title: 'Consec. C11',
    key: 'cons_11',
  },
  {
    title: 'Antiguedad C11',
    key: 'anti_11',
  },
  {
    title: 'Puntaje acum. C11',
    key: 'punt_11',
  },
  {
    title: 'Celebraciones C11',
    key: 'cele_11',
  },
  {
    title: 'Gemmas usadas C11',
    key: 'usad_11',
  },
  {
    title: 'Consec. C12',
    key: 'cons_12',
  },
  {
    title: 'Antiguedad C12',
    key: 'anti_12',
  },
  {
    title: 'Puntaje acum. C12',
    key: 'punt_12',
  },
  {
    title: 'Celebraciones C12',
    key: 'cele_12',
  },
  {
    title: 'Gemmas usadas C12',
    key: 'usad_12',
  },
  {
    title: 'Consec. C13',
    key: 'cons_13',
  },
  {
    title: 'Antiguedad C13',
    key: 'anti_13',
  },
  {
    title: 'Puntaje acum. C13',
    key: 'punt_13',
  },
  {
    title: 'Celebraciones C13',
    key: 'cele_13',
  },
  {
    title: 'Gemmas usadas C13',
    key: 'usad_13',
  },
  {
    title: 'Consec. C14',
    key: 'cons_14',
  },
  {
    title: 'Antiguedad C14',
    key: 'anti_14',
  },
  {
    title: 'Puntaje acum. C14',
    key: 'punt_14',
  },
  {
    title: 'Celebraciones C14',
    key: 'cele_14',
  },
  {
    title: 'Gemmas usadas C14',
    key: 'usad_14',
  },
  {
    title: 'Consec. C15',
    key: 'cons_15',
  },
  {
    title: 'Antiguedad C15',
    key: 'anti_15',
  },
  {
    title: 'Puntaje acum. C15',
    key: 'punt_15',
  },
  {
    title: 'Celebraciones C15',
    key: 'cele_15',
  },
  {
    title: 'Gemmas usadas C15',
    key: 'usad_15',
  },
  {
    title: 'Consec. C16',
    key: 'cons_16',
  },
  {
    title: 'Antiguedad C16',
    key: 'anti_16',
  },
  {
    title: 'Puntaje acum. C16',
    key: 'punt_16',
  },
  {
    title: 'Celebraciones C16',
    key: 'cele_16',
  },
  {
    title: 'Gemmas usadas C16',
    key: 'usad_16',
  },
  {
    title: 'Consec. C17',
    key: 'cons_17',
  },
  {
    title: 'Antiguedad C17',
    key: 'anti_17',
  },
  {
    title: 'Puntaje acum. C17',
    key: 'punt_17',
  },
  {
    title: 'Celebraciones C17',
    key: 'cele_17',
  },
  {
    title: 'Gemmas usadas C17',
    key: 'usad_17',
  },
  {
    title: 'Consec. C18',
    key: 'cons_18',
  },
  {
    title: 'Antiguedad C18',
    key: 'anti_18',
  },
  {
    title: 'Puntaje acum. C18',
    key: 'punt_18',
  },
  {
    title: 'Celebraciones C18',
    key: 'cele_18',
  },
  {
    title: 'Gemmas usadas C18',
    key: 'usad_18',
  },
  {
    title: 'Gemmas acumuladas',
    key: 'tota_acum',
          
  },
  {
    title: 'Bonificación',
    key: 'tota_boni',
          
  },
  {
    title: 'Total gemmas',
    key: 'tota_gemm',
          
  },
  {
    title: 'Opcion sorteo',
    key: 'opci_sort',
          
  },
  {
    title: 'Puntos concurso',
    key: 'opci_punt',
  },
  {
    title: 'Flete gratis',
    key: 'opci_flet',
  },
  {
    title: 'Gemmas usadas',
    key: 'gemm_usad',
  },
  {
    title: 'Saldo bonificación',
    key: 'sald_boni',
  },
  {
    title: 'Saldo gemmas',
    key: 'sald_gemm',
  },
]

const items = ref([])

const annoOptions = ref([])
const errorAnno = ref(false)
const errorMensajeAnno = ref('')

const zonaOptions = ref([])
const errorZona = ref(false)
const errorMensajeZona = ref('')

const loginData = JSON.parse(localStorage.getItem('login'))

onMounted(async () => {
  appStore.titulo(`Reportes / Gemmas acumuladas`)
  await obtenerAnno()
  await obtenerZona()
})

const obtenerAnno = async () => {
  try {
    appStore.mensaje('Obteniendo año')
    appStore.loading(true)

    const { data } = await $api(`/api/sami/v1/reportes/gemmas-acumuladas/anio`, {
      method: "get",
    })
    
    const itemAnno = data.data_glob
    
    itemAnno.forEach(element => 
      annoOptions.value.push({
        id: element.anio,
        text: element.anio,
      }),
    )
  } catch (e) {
    if(e.response !== undefined) {
      console.log(e.response.data)
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
      console.log(e.response.data)
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

    items.value = []

    const { data } = await $api(`/api/sami/v1/reportes/gemmas-acumuladas`, {
      method: "get",
      query: {
        anio: (formulario.value.anno === null) ? '' : formulario.value.anno,
        zona: (formulario.value.zona === null) ? '' : formulario.value.zona,
      },
    })

    items.value = data.data_glob
    
  } catch (error) {
    const { data } = error.response._data    
    if (typeof data != "undefined") {
      for (var key in data)
      {
        if (key == 'anio') {
          errorAnno.value = true
          errorMensajeAnno.value = data[key]
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
  }
  items.value = []
}

const onExcel = async () => {
  try {
    appStore.mensaje('Generando archivo')
    appStore.loading(true)

    const { data } = await $api(`/api/sami/v1/reportes/gemmas-acumuladas/excel`, {
      method: "post",
      body: {
        data: items.value,
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
  errorAnno.value = false
  errorMensajeAnno.value = ''
  errorZona.value = false
  errorMensajeZona.value = ''
}
</script>

<template>
  <div>
    <AppPlantilla>
      <template #botones />
      <template #contenido>
        <VRow>
          <VCol cols="12">
            <VCard title="Buscar gemmas">
              <VCardText>
                <VRow justify="space-between">
                  <VCol
                    cols="12"
                    md="4"
                  >
                    <AppSelect
                      v-model="formulario.anno"
                      :items="annoOptions"
                      label="Año"
                      placeholder="Seleccionar año"
                      item-title="text"
                      item-value="id"
                      :error="errorAnno"
                      :error-messages="errorMensajeAnno"
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
            <VCard title="Lista gemmas">
              <VCardText>
                <VDataTable
                  :headers="headers"
                  :items="items"
                  :items-per-page="-1"
                  class="text-no-wrap"
                  no-data-text=""
                  fixed-header="true"
                  height="400"
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
