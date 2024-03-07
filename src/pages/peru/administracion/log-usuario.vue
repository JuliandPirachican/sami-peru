<script setup>
import { useAppStore } from '@/stores/app'

definePage({
  meta: {
    action: 'peru/admi_logg_usua',
    subject: 'peru/admi_logg_usua',
  },
})

const appStore = useAppStore()
const loginData = JSON.parse(localStorage.getItem('login'))

const formulario = ref({
  usuario: '',
})

const archivo = ref('')
const errorUsuario = ref(false)
const errorMensajeUsuario= ref('')

onMounted(async () => {
  appStore.titulo(`${loginData.pais} / Administración / Log usuario`)
})

const limpiarValidacion = () => {
  errorUsuario.value = false
  errorMensajeUsuario.value = ''
}

const onGenerar = async () => {
  limpiarValidacion()
  archivo.value = ''
  try {
    appStore.mensaje('Obteniendo información')
    appStore.loading(true)

    const response = await $api(`/api/sami/v1/administracion/log`, {
      method: "GET",
      query: {
        usuario: formulario.value.usuario,
      },
    })

    archivo.value = response.data
  } catch (e) {
    const { data } = e.response._data
    if (typeof data != "undefined") {
      for (var key in data)
      {
        if (key == 'usuario') {
          errorUsuario.value = true
          errorMensajeUsuario.value = data[key]
        }
      }
    }
  }
  finally {
    appStore.loading(false)
  }
}

const onLimpiar = () => {
  limpiarValidacion()
  archivo.value = ''
  formulario.value.usuario = ''
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
            <VCard title="Buscar usuario">
              <VCardText>
                <VRow>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formulario.usuario"
                      label="Usuario"
                      type="text"
                      placeholder="Ingresar usuario"
                      autocomplete="off"
                      :error="errorUsuario"
                      :error-messages="errorMensajeUsuario"
                      @keyup.enter="onGenerar"
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
            <VCard title="Detalle usuario">
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
