<script setup>
import { useAppStore } from '@/stores/app'

definePage({
  meta: {
    action: 'peru/cons_come_logg_pedi',
    subject: 'peru/cons_come_logg_pedi',
  },
})

const appStore = useAppStore()
const userData = JSON.parse(localStorage.getItem('userData'))
const archivo = ref('')

const formulario = ref({
  campana: null,
  documento: '',
})

const campanaOptions = ref([])
const errorCampana = ref(false)
const errorMensajeCampana = ref('')
const errorDocumento = ref(false)
const errorMensajeDocumento = ref('')

const loginData = JSON.parse(localStorage.getItem('login'))

onMounted(async () => {
  appStore.titulo(`${loginData.pais} / Consultas / Log pedido`)
  await obtenerCampana()
})

const obtenerCampana = async () => {
  try {
    appStore.mensaje('Obteniendo información')
    appStore.loading(true)

    const { data } = await $api(`/api/comun/v1/campanas`, {
      method: "get",
    })
    
    const itemCampana = data.data_glob.slice(0, 17)
    
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

const limpiarValidacion = () => {
  errorDocumento.value = false
  errorMensajeDocumento.value = ''
  errorCampana.value = false
  errorMensajeCampana.value = ''
}

const onLimpiar= async () => {
  limpiarValidacion()
  formulario.value = {
    campana: null,
    documento: '',
  }
  archivo.value = ''
}

const onGenerar = async () => {
  limpiarValidacion()
  if (formulario.value.documento == '') {
    errorDocumento.value = true
    errorMensajeDocumento.value = 'Campo documento obligatorio.'
  } 
  if (formulario.value.campana == null) {
    errorCampana.value = true
    errorMensajeCampana.value = 'Campo campaña obligatorio.'
  } 
  
  if ((!errorDocumento.value) && (!errorCampana.value)) {
    try {
      appStore.mensaje('Obteniendo información')
      appStore.loading(true)

      const { data } = await $api(`/api/sami/v1/consulta/log-pedido`, {
        method: "get",
        query: {
          documento: formulario.value.documento,
          campana: formulario.value.campana,
        },
      })
      
      archivo.value = data
    
    } catch (e) {
    }
    finally {
      appStore.loading(false)
    }
  }
}
</script>

<template>
  <div>
    <AppPlantilla>
      <template #botones>
        <GenerarBoton @procesar="onGenerar" />
        <LimpiarBoton @procesar="onLimpiar" />
      </template>
      <template #contenido>
        <VRow>
          <VCol cols="12">
            <VCard title="Buscar log pedido">
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
                    <AppTextField
                      v-model="formulario.documento"
                      label="Documento identidad"
                      type="text"
                      placeholder="Ingresar documento"
                      autocomplete="off"
                      :error="errorDocumento"
                      :error-messages="errorMensajeDocumento"
                    />
                  </VCol>
                </VRow>
              </VCardText>
            </VCard>
          </VCol>
          <VCol
            v-if="archivo != ''"
            cols="12"
          >
            <VCard title="Detalle pedido">
              <VCardText>
                <VRow>
                  <VCol cols="12">
                    <AppTextarea
                      v-model="archivo"
                      readonly
                      no-resize
                      rows="20"
                      variant="plain"
                    />
                  </VCol>
                </VRow>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </template>
    </AppPlantilla>
  </div>
</template>
