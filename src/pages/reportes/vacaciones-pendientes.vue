<script setup>
import { useAppStore } from '@/stores/app'
import { VDataTable } from 'vuetify/labs/VDataTable'

definePage({
  meta: {
    action: 'peru/repo_come_vaca_pend',
    subject: 'peru/repo_come_vaca_pend',
  },
})

const appStore = useAppStore()

const headers = computed(() => {
  return [
    {
      title: 'Area',
      key: 'codi_area',
      sortable: true,
    },
    {
      title: 'Zona',
      key: 'codi_zona',
      sortable: true,
    },
    {
      title: 'Nro ident.',
      key: 'nume_iden',
      sortable: true,
    },
    {
      title: 'Gerente zonal',
      key: 'nomb_vend',
      sortable: true,
    },
    {
      title: 'Fecha ingreso',
      key: 'fech_ingr',
      sortable: true,
    },
    {
      title: 'Pendiente',
      key: 'diaa_pend',
      sortable: true,
    },
    {
      title: 'Prioridad',
      key: 'nume_prio',
      sortable: true,
    },
  ]
})

const items = ref([])

onMounted(async () => {
  appStore.titulo(`Reportes / Vacaciones / Pendientes`)
})

const onGenerar = async () => {
  try {
    appStore.mensaje('Obteniendo información')
    appStore.loading(true)

    items.value = []

    const { data } = await $api(`/api/sami/v1/reportes/vacaciones-pendientes`, {
      method: "get",
    })

    items.value = data.data_glob
    
  } catch (error) {
    if(e.response !== undefined) {
      console.log(e.response._data)
    }
  }
  finally {
    appStore.loading(false)
  }
}

const onLimpiar= async () => {
  items.value = []
}

const onExcel = async () => {
  try {
    appStore.mensaje('Generando archivo')
    appStore.loading(true)

    const { data } = await $api(`/api/sami/v1/reportes/vacaciones-pendientes/excel`, {
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
