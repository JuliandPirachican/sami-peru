<!-- eslint-disable camelcase -->
<script setup>
import { useAppStore } from '@/stores/app'
import { EncryptStorage } from 'encrypt-storage'
import { VDataTable } from 'vuetify/labs/VDataTable'

definePage({
  meta: {
    action: 'peru/proc_come_prod_zona',
    subject: 'peru/proc_come_prod_zona',
  },
})

const encryptStorage = new EncryptStorage('AZZORTI-SAMI', {
  storageType: 'localStorage',
})

const appStore = useAppStore()

const items = ref([])

const formulario = ref({
  campana: null,
  zona: null,
})

const campanaOptions = ref([])
const errorCampana = ref(false)
const errorMensajeCampana = ref('')

const zonaOptions = ref([])
const errorZona = ref(false)
const errorMensajeZona = ref('')

const headers = computed(() => {
  return [
    { title: 'Fila',        key: 'cons_prod', hidden: true },
    { title: 'Campaña',     key: 'codi_camp' },
    { title: 'Zona',        key: 'codi_zona' },
    { title: 'Código',      key: 'codi_prod' },
    { title: 'Producto',    key: 'nomb_prod' },
    { title: 'Doc. ident.', key: 'nume_iden' },
    { title: 'Sector',      key: 'codi_sect' },
    { title: 'Asesora',     key: 'nomb_terc' },
  ]
})

const visibleHeaders = computed(() => headers.value.filter(header => !header.hidden))

onMounted(async () => {
  appStore.titulo(`Procesos / producto zona`)
  await obtenerCampana()
  await obtenerZona()
})

const obtenerCampana = async () => {
  try {
    appStore.mensaje('Obteniendo campañas')
    appStore.loading(true)

    const response  = await $api(`/api/comun/v1/campanas`, {
      method: "get",
    })
    
    const itemCampana = response.data.data_glob.slice(0, 40)
    
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

    const response  = await $api(`/api/comun/v1/zonas`, {
      method: "get",
    })

    const itemZona = response.data.data_glob
    
    itemZona.forEach(element => 
      zonaOptions.value.push({
        id: element.codi_zona,
        text: element.codi_zona,
      }),
    )
  } catch (e) {
    if(e.response !== undefined) {
      // eslint-disable-next-line no-console
      console.log(e.response.data)
    }
  }
  finally {
    appStore.loading(false)
  }
}

const onGenerar = async () => {
  try {
    limpiarValidacion()

    appStore.mensaje('Obteniendo información')
    appStore.loading(true)

    const { data } = await $api(`/api/sami/v1/procesos/producto-zona/productos`, {
      method: "get",
      query: {
        campana: (formulario.value.campana === null) ? '' : formulario.value.campana,
        zona: (formulario.value.zona === null) ? '' : formulario.value.zona,
      },
    })

    items.value = []
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
  items.value = []
  formulario.value = {
    campana: null,
    zona: null,
  }
}

const onExcel = async () => {
  try {
    appStore.mensaje('Generando archivo')
    appStore.loading(true)

    const { data } = await $api(`/api/sami/v1/procesos/producto-zona/excel`, {
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
            <VCard>
              <VCardText>
                <VRow> 
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
                  <VDataTable
                    :headers="visibleHeaders"
                    :items="items"
                    no-data-text=""
                    fixed-header
                    height="400"
                    class="text-no-wrap"
                    :items-per-page="-1"
                  >
                    <template #bottom />
                  </VDataTable>
                </VRow>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </template>
    </AppPlantilla>
  </div>
</template>
