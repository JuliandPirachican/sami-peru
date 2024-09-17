<script setup>
import { useAppStore } from '@/stores/app';
import { VDataTable } from 'vuetify/labs/VDataTable';

definePage({
  meta: {
    action: 'colombia/repo_come_visi',
    subject: 'colombia/repo_come_visi',
  },
})


const appStore = useAppStore()

const formulario = ref({
  campana: null,
})

const headers = computed(() => {
  return [
    {
      key: 'nume_iden',
      title: 'Nro identificación',
      sortable: true,
    },
    {
      key: 'nomb_terc',
      title: 'Nombre',
      sortable: true,
    },
    {
      key: 'apel_terc',
      title: 'Apellido',
      sortable: true,
    },
    {
      key: 'codi_zona',
      title: 'Zona',
      sortable: true,
    },
    {
      key: 'codi_sect',
      title: 'Sector',
      sortable: true,
    },
    {
      key: 'tele_terc',
      title: 'Teléfono',
      sortable: true,
    },
    {
      key: 'celu_ter1',
      title: 'Celular',
      sortable: true,
    },
    {
      key: 'dire_terc',
      title: 'Dirección',
      sortable: true,
    },
    {
      key: 'fech_visi',
      title: 'Fecha',
      sortable: true,
    },
    {
      key: 'tipo_usua',
      title: 'Tipo',
      sortable: true,
    },
    {
      key: 'valo_perf',
      title: 'Perfil',
      sortable: true,
    },
    {
      key: 'esta_acti',
      title: 'Status',
      sortable: true,
    },
    {
      key: 'obse_visi',
      title: 'Observación',
      sortable: true,
    },
    {
      key: 'obse_deta',
      title: 'Detalle',
      sortable: true,
    },
    {
      key: 'dist_visi',
      title: 'Distancia',
      sortable: true,
    },
    {
      key: 'acti_esta',
      title: 'Efectividad',
      sortable: true,
    },
    {
      key: 'celu_terc',
      title: 'Celular 2',
      sortable: true,
    },
    {
      key: 'emai_terc',
      title: 'Correo electrónico',
      sortable: true,
    },
    {
      key: 'esta_pedi',
      title: 'Pasa pedido',
      sortable: true,
    },
  ]
})

const items = ref([])

const campanaOptions = ref([])
const errorCampana = ref(false)
const errorMensajeCampana = ref('')

const rowsPerPage = ref(100)
const currentPage = ref(1)

const itemsDetalleVisible = computed(() => {
  // Calcula las filas visibles según la página actual y el número de filas por página
  const start = (currentPage.value - 1) * rowsPerPage.value
  const end = start + rowsPerPage.value
  
  return items.value.slice(start, end)
})

onMounted(async () => {
  appStore.titulo(`Reportes / Azzorti Maps`)
  await obtenerCampana()
})

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

const onGenerar = async () => {
  try {
    appStore.mensaje('Obteniendo información')
    appStore.loading(true)
    limpiarValidacion()

    items.value = []

    const { data } = await $api(`/api/sami/v1/reportes/visita-zona`, {
      method: "get",
      query: {
        campana: (formulario.value.campana === null) ? '' : formulario.value.campana,
      },
    })

    items.value = data.data_glob
    
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

    const { data } = await $api(`/api/sami/v1/reportes/visita-zona/excel`, {
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
            <VCard title="Buscar en Azzorti Maps">
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
            <VCard title="Lista Azzorti Maps">
              <VCardText>
                <VDataTable
                  v-model:items-per-page="rowsPerPage"
                  :headers="headers"
                  :items="(items.length > 100) ? itemsDetalleVisible: items"
                  class="text-no-wrap"
                  fixed-header
                  height="400"
                >
                  <template #item.acti_esta="{ item }">
                    <div v-if="item.acti_esta != ''">
                      <VChip
                        v-if="item.acti_esta.toLowerCase() === 'si'"
                        color="success"
                      >
                        {{ item.acti_esta }}
                      </VChip>
                      <VChip
                        v-else
                        color="error"
                      >
                        {{ item.acti_esta }}
                      </VChip>
                    </div>
                    <div v-else />
                  </template>
                  <template #item.esta_pedi="{ item }">
                    <div v-if="item.esta_pedi != ''">
                      <VChip
                        v-if="item.esta_pedi.toLowerCase() === 'si'"
                        color="success"
                      >
                        {{ item.esta_pedi }}
                      </VChip>
                      <VChip
                        v-else
                        color="error"
                      >
                        {{ item.esta_pedi }}
                      </VChip>
                    </div>
                    <div v-else />
                  </template>
                  <template #bottom>
                    <VDivider v-if="items.length>rowsPerPage" />

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
