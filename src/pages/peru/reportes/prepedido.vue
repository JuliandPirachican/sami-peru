<!-- eslint-disable camelcase -->
<script setup>
import { useAppStore } from '@/stores/app'
import { VDataTable } from 'vuetify/labs/VDataTable'

definePage({
  meta: {
    action: 'peru/repo_come_prep_pedi',
    subject: 'peru/repo_come_prep_pedi',
  },
})

const userData = JSON.parse(localStorage.getItem('userData'))
const appStore = useAppStore()

const formulario = ref({
  campana: null,
  zona: null,
})

const filtro = ref('')
const itemsGlobal = ref([])
const itemsDetalleTotal = ref([])

const itemsDetalle = computed(() => {
  if (filtro.value != '') {
    return itemsDetalleTotal.value.filter(item => {
      return (item['nume_iden'] || "").toString().toUpperCase().includes(filtro.value.toString().toUpperCase())

    })
  } else {
    return itemsDetalleTotal.value
  }
})

const headersGlobal = [
  { title: '', key: 'acciones', sortable: false, width: '10px' },
  {
    title: 'Corte',
    key: 'codi_cort',
  },
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
    title: 'Nombre(s) y apellido(s)',
    key: 'nomb_terc',
  },
  {
    title: 'Prepedido',
    key: 'cant_prep',
  },
  {
    title: 'Pedido',
    key: 'cant_pedi',
  },
  {
    title: '% Cumplimiento',
    key: 'porc_prep',
  },
]

const headersDetalle = [
  {
    title: 'Corte',
    key: 'codi_cort',
  },
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
    title: 'Nombre(s) y Apellido(s)',
    key: 'nomb_terc',
  },
  {
    title: 'Código',
    key: 'codi_prod',
  },
  {
    title: 'Descripción',
    key: 'nomb_prod',
  },
  {
    title: 'Cantidad',
    key: 'cant_prod',
  },
  {
    title: 'Página',
    key: 'nume_pagi',
  },
  {
    title: 'Estado',
    key: 'esta_prep',
  },
]
      
const campanaOptions = ref([])
const errorCampana = ref(false)
const errorMensajeCampana = ref('')

const zonaOptions = ref([])
const errorZona = ref(false)
const errorMensajeZona = ref('')

const loginData = JSON.parse(localStorage.getItem('login'))

onMounted(async () => {
  appStore.titulo(`${loginData.pais} / Reportes / Prepedido`)
  await obtenerCampana()
  await obtenerZona()
})

const obtenerCampana = async () => {
  try {
    appStore.mensaje('Obteniendo campañas')
    appStore.loading(true)

    const { data } = await $api(`/api/sami/v1/reportes/prepedido/campanas`, {
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

    filtro.value = ''
    itemsGlobal.value = []
    itemsDetalleTotal.value = []

    const { data } = await $api(`/api/sami/v1/reportes/prepedido`, {
      method: "get",
      query: {
        campana: (formulario.value.campana === null) ? '' : formulario.value.campana,
        zona: (formulario.value.zona === null) ? '' : formulario.value.zona,
      },
    })

    itemsGlobal.value = data.data_glob
    itemsDetalleTotal.value = data.data_deta
    
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
  filtro.value = ''
  itemsGlobal.value = []
  itemsDetalleTotal.value = []
}

const onExcel = async () => {
  try {
    appStore.mensaje('Generando archivo')
    appStore.loading(true)

    const { data } = await $api( `/api/sami/v1/reportes/prepedido/excel`, {
      method: "post",
      body: {
        data_glob: itemsGlobal.value,
        data_deta: itemsDetalle.value,
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

const onSeleccionar = item => {
  filtro.value = item.nume_iden
}

const limpiarFiltro = hideOverlay => {
  filtro.value = ''
  setTimeout(hideOverlay, 1500)
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
            <VCard title="Buscar prepedidos">
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
            <VCard title="Lista general prepedido">
              <VCardText>
                <VDataTable
                  :headers="headersGlobal"
                  :items="itemsGlobal"
                  :items-per-page="-1"
                  class="text-no-wrap"
                  no-data-text=""
                  fixed-header="true"
                  height="350"
                >
                  <template #item.acciones="{ item }">
                    <IconBtn @click="onSeleccionar(item)">
                      <VIcon icon="tabler-search" />
                    </IconBtn>
                  </template>
                  <template #bottom />
                </VDataTable>
              </VCardText>
            </VCard>
          </VCol>
          <VCol cols="12">
            <AppCardActions
              title="Lista detalle prepedido"
              action-refresh
              @refresh="limpiarFiltro"
            >
              <VCardText>
                <VDataTable
                  :headers="headersDetalle"
                  :items="itemsDetalle"
                  :items-per-page="-1"
                  class="text-no-wrap"
                  no-data-text=""
                  fixed-header="true"
                  height="400"
                >              
                  <template #bottom />
                </VDataTable>
              </VCardText>
            </AppCardActions>
          </VCol>
        </VRow>
      </template>
    </AppPlantilla>
  </div>
</template>
