<script setup>
import { useAppStore } from '@/stores/app'
import { VDataTable } from 'vuetify/labs/VDataTable'

definePage({
  meta: {
    action: 'peru/repo_come_lide_pago',
    subject: 'peru/repo_come_lide_pago',
  },
})

const appStore = useAppStore()
const userData = JSON.parse(localStorage.getItem('userData'))

const items = ref([])

const headers = [
  {
    key: 'codi_area',
    title: 'Región',
  },
  {
    key: 'codi_zona',
    title: 'Zona',
  },
  {
    key: 'codi_sect',
    title: 'Sector',
  },
  {
    key: 'nume_iden',
    title: 'Nro ident.',
  },
  {
    key: 'nomb_terc',
    title: 'Nombre(s) y Apellido(s)',
  },
  {
    key: 'codi_camp',
    title: 'Campaña',
  },
  {
    key: 'tota_comi',
    title: 'Comisión',
  },
]

const loginData = JSON.parse(localStorage.getItem('login'))

onMounted(async () => {
  appStore.titulo(`Reportes / Lider pago`)
  await onGenerar()
})

const onGenerar = async () => {
  try {
    appStore.mensaje('Obteniendo información')
    appStore.loading(true)
    onLimpiar()

    const { data } = await $api(`/api/sami/v1/reportes/lider-pago`, {
      method: "get",
    })

    items.value = data.data_glob
  } catch (e) {
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

    const { data } = await $api(`/api/sami/v1/reportes/lider-pago/excel`, {
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
            <VCard title="Lista de lideres">
              <VCardText>
                <VDataTable
                  :headers="headers"
                  :items="items"
                  
                  fixed-header
                  height="400"
                  class="text-no-wrap"
                  :items-per-page="-1"
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

<style lang="scss">
.flat-picker-custom-style {
  inset-block: auto 8px;
}
</style>
