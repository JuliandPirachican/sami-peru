<script setup>
import { useAppStore } from '@/stores/app';
import { VDataTable } from 'vuetify/labs/VDataTable';

definePage({
  meta: {
    action: 'colombia/repo_come_sald_cart',
    subject: 'colombia/repo_come_sald_cart',
  },
})

const appStore = useAppStore()

const formulario = ref({
  campana: null,
  zona: null,
})

const headers = computed(() => {
  return [
    {
      title: 'Zona',
      key: 'codi_zona',
      sortable: true,
    },
    {
      title: 'Sector',
      key: 'codi_sect',
      sortable: true,
    },
    {
      title: 'Nro ident.',
      key: 'nume_iden',
      sortable: true,
    },
    {
      title: 'Asesora',
      key: 'nomb_ases',
      sortable: true,
    },
    {
      title: 'Teléfono',
      key: 'tele_ases',
      sortable: true,
    },
    {
      title: 'Campaña',
      key: 'codi_camp',
      sortable: true,
    },
    {
      title: 'Documento',
      key: 'nume_docu',
      sortable: true,
    },
    {
      title: 'Valor fact.',
      key: 'valo_docu',
      sortable: true,
    },
    {
      title: 'Cuota 1',
      key: 'sald_docu_01',
      sortable: true,
    },
    {
      title: 'Fecha venc.',
      key: 'fech_venc_01',
      sortable: true,
    },
    {
      title: 'Cuota 2',
      key: 'sald_docu_02',
      sortable: true,
    },
    {
      title: 'Fecha venc.',
      key: 'fech_venc_02',
      sortable: true,
    },
    {
      title: 'Cuota 3',
      key: 'sald_docu_03',
      sortable: true,
    },
    {
      title: 'Fecha venc.',
      key: 'fech_venc_03',
      sortable: true,
    },
    {
      title: 'Cuota 4',
      key: 'sald_docu_04',
      sortable: true,
    },
    {
      title: 'Fecha venc.',
      key: 'fech_venc_04',
      sortable: true,
    },
    {
      title: 'Saldo a pagar',
      key: 'sald_docu_pago',
      sortable: true,
    },
  ]
})

const items = ref([])

const campanaOptions = ref([])
const errorCampana = ref(false)
const errorMensajeCampana = ref('')

const zonaOptions = ref([])
const errorZona = ref(false)
const errorMensajeZona = ref('')

onMounted(async () => {
  appStore.titulo(`Reportes / Fraccionamiento`)
  await obtenerCampana()
  await obtenerZona()
})

const obtenerCampana = async () => {
  try {
    appStore.mensaje('Obteniendo campaña')
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

    items.value = []

    const { data } = await $api(`/api/sami/v1/reportes/fraccionamiento`, {
      method: "get",
      query: {
        campana: (formulario.value.campana === null) ? '' : formulario.value.campana,
        zona: (formulario.value.zona === null) ? '' : formulario.value.zona,
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
  items.value = []
}

const onExcel = async () => {
  try {
    appStore.mensaje('Generando archivo')
    appStore.loading(true)

    const { data } = await $api(`/api/sami/v1/reportes/fraccionamiento/excel`, {
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
  errorCampana.value = false
  errorMensajeCampana.value = ''
  errorZona.value = false
  errorMensajeZona.value = ''
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
            <VCard title="Buscar fraccionamiento">
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
            <VCard title="Lista fraccionamiento">
              <VCardText>
                <VDataTable
                  :headers="headers"
                  :items="items"
                  :items-per-page="-1"
                  class="text-no-wrap"
                  fixed-header
                  height="400"
                >
                  <template #item.sald_docu_01="{ item }">
                    <div v-if="item.fech_venc_01 != ''">
                      <div v-if="item.codi_camp != ''">
                        <VChip
                          v-if="item.sald_docu_01 === '0.00' || item.sald_docu_01 === '0'"
                          color="success"
                        >
                          {{ item.sald_docu_01 }}
                        </VChip>
                        <VChip
                          v-else
                          color="error"
                        >
                          {{ item.sald_docu_01 }}
                        </VChip>
                      </div>
                    </div>
                    <div v-else />
                  </template>
                  <template #item.sald_docu_02="{ item }">
                    <div v-if="item.fech_venc_02 != ''">
                      <div v-if="item.codi_camp != ''">
                        <VChip
                          v-if="item.sald_docu_02 === '0.00' || item.sald_docu_02 === '0'"
                          color="success"
                          size="small"
                        >
                          {{ item.sald_docu_02 }}
                        </VChip>
                        <VChip
                          v-else
                          color="error"
                          size="small"
                        >
                          {{ item.sald_docu_02 }}
                        </VChip>
                      </div>
                    </div>
                    <div v-else />
                  </template>
                  <template #item.sald_docu_03="{ item }">
                    <div v-if="item.fech_venc_03 != ''">
                      <div v-if="item.codi_camp != ''">
                        <VChip
                          v-if="item.sald_docu_03 === '0.00' || item.sald_docu_03 === '0'"
                          color="success"
                          size="small"
                        >
                          {{ item.sald_docu_03 }}
                        </VChip>
                        <VChip
                          v-else
                          color="error"
                          size="small"
                        >
                          {{ item.sald_docu_03 }}
                        </VChip>
                      </div>
                    </div>
                    <div v-else />
                  </template>
                  <template #item.sald_docu_04="{ item }">
                    <div v-if="item.fech_venc_04 != ''">
                      <div v-if="item.codi_camp != ''">
                        <VChip
                          v-if="item.sald_docu_04 === '0.00' || item.sald_docu_04 === '0'"
                          color="success"
                          size="small"
                        >
                          {{ item.sald_docu_04 }}
                        </VChip>
                        <VChip
                          v-else
                          color="error"
                          size="small"
                        >
                          {{ item.sald_docu_04 }}
                        </VChip>
                      </div>
                    </div>
                    <div v-else />
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
