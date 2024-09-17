<script setup>
import { useAppStore } from '@/stores/app'
import authV1BottomShape from '@images/svg/auth-v1-bottom-shape.svg?raw'
import authV1TopShape from '@images/svg/auth-v1-top-shape.svg?raw'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
import { EncryptStorage } from 'encrypt-storage'
import { VForm } from 'vuetify/components/VForm'
 
definePage({
  meta: {
    layout: 'blank',
    unauthenticatedOnly: true,
  },
})
 
const encryptStorage = new EncryptStorage('AZZORTI-SAMI', {
  storageType: 'localStorage',
})
 
const route = useRoute()
const router = useRouter()
const ability = useAbility()
const appStore = useAppStore()
 
const refVForm = ref()
 
const tipoOptions = ref([])
 
const form = ref({
  tipo: '',
  documento: '',
  codigo: '',
})
 
 
const registrar = async () => {
  try {
    appStore.mensaje('Validando credenciales')
    appStore.loading(true)
 
    const data  = await $api('/api/sami/v1/procesos/asistencia', {
      method: 'POST',
      body: {
        tipo: form.value.tipo,
        documento: form.value.documento,
        codigo: form.value.codigo,
      },
    })
 
    let mensaje = data.message
    mensaje = mensaje.toLowerCase()
    mensaje = mensaje.charAt(0).toUpperCase() + mensaje.slice(1)
    appStore.mensajeSnackbar(mensaje)
    appStore.color("success")
    appStore.snackbar(true)
  
  } catch (e) {
    console.log(e)
  } finally {
    appStore.loading(false)
  }
}
 
const onSubmit = () => {
  refVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid)
      registrar()
  })
}
 
onMounted(async () => {
  await obtenerTipoAsistencia()
  
})
 
const obtenerTipoAsistencia = async () => {
  try {
    appStore.mensaje('Obteniendo tipo asistencia')
    appStore.loading(true)
 
 
    const { data } = await $api(`/api/sami/v1/procesos/abrir-asistencia/tipo-asistencia`, {
      method: "get",
    })
    
    form.value.tipo = data.data_glob[0]['tipo']
 
    data.data_glob.forEach(element =>
      tipoOptions.value.push({
        id: element.tipo,
        text: element.tipo,
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
</script>
 
<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <div class="position-relative my-sm-16">
      <VNodeRenderer
        :nodes="h('div', { innerHTML: authV1TopShape })"
        class="text-primary auth-v1-top-shape d-none d-sm-block"
      />
 
      <VNodeRenderer
        :nodes="h('div', { innerHTML: authV1BottomShape })"
        class="text-primary auth-v1-bottom-shape d-none d-sm-block"
      />
 
      <VCard
        class="auth-card pa-4"
        max-width="448"
      >
        <VCardText>
          <AppLogo width="250" />
        </VCardText>
 
        <VCardText>
          <h4 class="text-h4 mb-1">
            Bienvenido a <span class="text-capitalize">{{ themeConfig.app.title }}</span>! 👋🏻
          </h4>
          <p class="mb-0">
            Ingresar su número de identidad y código para su registro
          </p>
        </VCardText>
 
        <VCardText>
          <VForm
            ref="refVForm"
            @submit.prevent="onSubmit"
          >
            <VRow>
              <VCol>
                <AppSelect
                  v-model="form.tipo"
                  :items="tipoOptions"
                  label="Tipo reunión"
                  placeholder="Seleccionar tipo"
                  item-title="text"
                  item-value="id"
                />
              </VCol>
              <VCol cols="12">
                <AppTextField
                  v-model="form.documento"
                  label="Número de identidad"
                  type="text"
                  placeholder="Ingresar numero"
                  :rules="[requiredValidator(form.documento, 'numero documento')]"
                  autocomplete="off"
                />
              </VCol>
              <VCol cols="12">
                <AppTextField
                  v-model="form.codigo"
                  label="Código"
                  type="text"
                  placeholder="Ingresar código"
                  :rules="[requiredValidator(form.codigo, 'código')]"
                  autocomplete="off"
                />
              </VCol>
              <VCol cols="12">
                <VBtn
                  block
                  type="submit"
                >
                  ENVIAR ASISTENCIA
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </div>
  </div>
</template>
 
<style lang="scss">
@use "@core/scss/template/pages/page-auth";
</style>
