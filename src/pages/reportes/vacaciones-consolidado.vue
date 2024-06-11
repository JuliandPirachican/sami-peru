<script setup>
import { useAppStore } from '@/stores/app';
import { VDataTable } from 'vuetify/labs/VDataTable';

definePage({
  meta: {
    action: 'colombia/repo_come_soli_vaca',
    subject: 'colombia/repo_come_soli_vaca',
  },
})

const appStore = useAppStore()

const formulario = ref({
  anio: null,
})

const headers = computed(() => {
  return [
    {
      title: 'Código',
      key: 'cons_vaca',
      sortable: true,
    },
    {
      title: 'Zona',
      key: 'codi_zona',
      sortable: true,
    },
    {
      title: 'Gerente Zonal',
      key: 'nomb_vend',
      sortable: true,
    },
    {
      title: 'Aprobador',
      key: 'usua_apro',
      sortable: true,
    },
    {
      title: 'Fecha inicial',
      key: 'fech_inic',
      sortable: true,
    },
    {
      title: 'Fecha final',
      key: 'fech_fina',
      sortable: true,
    },
    {
      title: 'Dia(s)',
      key: 'nume_diaa',
      sortable: true,
    },
    {
      title: 'Campaña',
      key: 'codi_camp',
      sortable: true,
    },
    {
      title: 'Estado',
      key: 'acti_esta',
      sortable: true,
    },
    {
      title: 'Reemplazo',
      key: 'zona_reem',
      sortable: true,
    },
    {
      title: 'Observación',
      key: 'obse_modi',
      sortable: true,
    },
  ]
})

const items = ref([])

const errorAnio = ref(false)
const errorMensajeAnio = ref('')

onMounted(async () => {
  appStore.titulo(`Reportes / Vacaciones / Consolidado`)
  await onAnio()
})

const onAnio = async () => {
  try {
    appStore.mensaje('Obteniendo año')
    appStore.loading(true)

    const data  = await $api(`/api/sami/v1/reportes/vacaciones-consolidado/anio`, {
      method: "get",
    })

    formulario.value.anio = data.data.data_glob.anio

  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error.message)
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

    const { data } = await $api(`/api/sami/v1/reportes/vacaciones-consolidado`, {
      method: "get",
      query: {
        anio: (formulario.value.anio === null) ? '' : formulario.value.anio,
      },
    })

    items.value = data.data_glob
    
  } catch (error) {
    const { data } = error.response._data

    if (typeof data != "undefined") {
      for (var key in data)
      {
        if (key == 'anio') {
          errorAnio.value = true
          errorMensajeAnio.value = data[key]
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
    anio: null,
  }
  items.value = []
  await onAnio()
}

const onExcel = async () => {
  try {
    appStore.mensaje('Generando archivo')
    appStore.loading(true)

    const { data } = await $api(`/api/sami/v1/reportes/vacaciones-consolidado/excel`, {
      method: "post",
      body: {
        cabecera: headers.value,
        detalle: items.value,
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
  errorAnio.value = false
  errorMensajeAnio.value = ''
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
            <VCard title="Buscar vacaciones">
              <VCardText>
                <VRow justify="space-between">
                  <VCol
                    cols="12"
                    md="4"
                  >
                    <AppTextField
                      v-model="formulario.anio"
                      label="Año"
                      type="text"
                      placeholder="0"
                      autocomplete="off"
                      :error="errorAnio"
                      :error-messages="errorMensajeAnio"
                    />
                  </VCol>
                </VRow>
              </VCardText>
            </VCard>
          </VCol>
          

          <VCol cols="12">
            <VCard title="Lista vacaciones">
              <VCardText>
                <VDataTable
                  :headers="headers"
                  :items="items"
                  :items-per-page="-1"
                  class="text-no-wrap"
                  fixed-header
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
