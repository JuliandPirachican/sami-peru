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

const rowsPerPage = ref(100)
const currentPage = ref(1)
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

const itemsDetalleVisible = computed(() => {
  // Calcula las filas visibles según la página actual y el número de filas por página
  const start = (currentPage.value - 1) * rowsPerPage.value
  const end = start + rowsPerPage.value
  
  return items.value.slice(start, end)
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
            <VCard title="Lista de lideres">
              <VCardText>
                <VDataTable
                  v-model:items-per-page="rowsPerPage"
                  :headers="headers"
                  :items="(items.length > 100) ? itemsDetalleVisible: items"
                  fixed-header
                  height="400"
                  class="text-no-wrap"
                >
                  <template #bottom>
                    <VDivider v-if="items.length>100" />

                    <div class="d-flex align-center justify-sm-end justify-center flex-wrap gap-3 py-5 pt-3">
                      <VPagination
                        v-if="items.length>0"
                        v-model="currentPage"
                        :length="Math.ceil(items.length / rowsPerPage)"
                        :total-visible="$vuetify.display.xs ? 1 : Math.min(Math.ceil(items.length / rowsPerPage), 5)"
                      >
                        <template #prev="slotProps">
                          <VBtn
                            variant="tonal"
                            color="default"
                            v-bind="slotProps"
                            :icon="false"
                          >
                            <VIcon
                              icon="tabler-arrow-bar-left"
                              size="22"
                            />
                          </VBtn>
                        </template>

                        <template #next="slotProps">
                          <VBtn
                            variant="tonal"
                            color="default"
                            v-bind="slotProps"
                            :icon="false"
                          >
                            <VIcon
                              icon="tabler-arrow-bar-right"
                              size="22"
                            />
                          </VBtn>
                        </template>
                      </VPagination>
                    </div>
                  </template>
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
