<!-- ❗Errors in the form are set on line 60 -->
<script setup>
import navItems from '@/navigation/opciones/'
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

const isPasswordVisible = ref(false)
const recordar = ref(true)
const route = useRoute()
const router = useRouter()
const ability = useAbility()
const appStore = useAppStore()

const refVForm = ref()

const form = ref({
  usuario: '',
  clave: '',
})

const login = async () => {
  try {
    appStore.mensaje('Validando credenciales')
    appStore.loading(true)

    const responseLogin = await $api('/api/comun/v1/login/ventas', {
      method: 'POST',
      body: {
        usuario: form.value.usuario,
        password: form.value.clave,
        aplicacion: 'sami',
      },
    })

    const dataLogin = responseLogin.data
    const dataSessionIncaIframe=btoa(JSON.stringify(dataLogin.session_iframe).trim()) ;

    const responseMenu = await $api(
      `/api/sami/v1/usuario/menu`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${dataLogin.accessToken}`,
        },
      })
    
    const userAbility = responseMenu.data.permisos
    // console.log(dataSessionIncaIframe)
    const filteredNavItems = navItems.filter(item => userAbility.some(dataItem => dataItem.subject === item.subject))
    const menu = []
    const headingMap = {}

    filteredNavItems.forEach(item => {
      if (item.heading) {
        const newHeading = { title: item.heading, children: [] }

        headingMap[item.action] = newHeading
        menu.push(newHeading)
      } else if (item.title) {
        const heading = Object.keys(headingMap).find(key => item.action == key)
        if (heading) {
          headingMap[heading].children.push(item)
        }
      }
    })

    ability.update(userAbility)
    encryptStorage.setItem('userAbilityRules', JSON.stringify(userAbility))
    encryptStorage.setItem('userData', JSON.stringify(dataLogin.data_glob))
    encryptStorage.setItem('accessToken', dataLogin.accessToken) 
    encryptStorage.setItem('menu', JSON.stringify(menu))
    localStorage.setItem('session_iframe', dataSessionIncaIframe)    
    encryptStorage.setItem('recordar', Boolean(recordar.value))
    if(recordar.value) {
      encryptStorage.setItem('login', JSON.stringify(form.value))
    } else {
      encryptStorage.setItem('login', JSON.stringify({
        usuario: '',
        clave: '',
      }))
    }

    await router.replace(route.query.to ? String(route.query.to) : `/`)
    appStore.loading(false)
  
  } catch (e) {
    console.log(e)
    appStore.loading(false)
  } finally {
    appStore.mensaje('')
  }
}

const onSubmit = () => {
  refVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid)
      login()
  })
}

onMounted(async () => {
  
  const login = encryptStorage.getItem('login')
  if(!login) {
    encryptStorage.setItem('login', JSON.stringify(form.value))
  } else {
    form.value = login
  }
  if(encryptStorage.getItem('recordar')) {
    recordar.value = Boolean(encryptStorage.getItem('recordar'))
  }
})
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
            Bienvenidos a <span class="text-capitalize">{{ themeConfig.app.title }}</span>! 👋🏻
          </h4>
          <p class="mb-0">
            Por favor ingresar su usuarios y contraseña 
          </p>
        </VCardText>

        <VCardText>
          <VForm 
            ref="refVForm"
            @submit.prevent="onSubmit"
          >
            <VRow>
              <VCol cols="12">
                <AppTextField
                  v-model="form.usuario"
                  label="Usuario"
                  type="text"
                  placeholder="Ingresar usuario"
                  :rules="[requiredValidator(form.usuario, 'usuario')]"
                  autocomplete="off"
                />
              </VCol>
              <VCol cols="12">
                <AppTextField
                  v-model="form.clave"
                  label="Contraseña"
                  placeholder="············"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  :rules="[requiredValidator(form.clave, 'contraseña')]"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />

                <div class="d-flex align-center justify-space-between flex-wrap mt-2 mb-4">
                  <VCheckbox
                    v-model="recordar"
                    label="Recordar usuario y contraseña"
                  />
                </div>

                <VBtn
                  block
                  type="submit"
                >
                  INGRESAR AL SISTEMA
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
@use "@core/scss/template/pages/page-auth.scss";
</style>

