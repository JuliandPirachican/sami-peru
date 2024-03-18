import { useAppStore } from '@/stores/app'
import { EncryptStorage } from 'encrypt-storage'
import { ofetch } from 'ofetch'

const encryptStorage = new EncryptStorage('AZZORTI-SAMI', {
  storageType: 'localStorage',
})

const modo = import.meta.env.VITE_API_MODO

let baseURL = ''
if (modo == 'PRODUCCION') {
  baseURL = 'https://servicioweb.dupree.pe'
} else {
  baseURL = 'https://servicioweb2per.azzorti.co'
}

export const $api = ofetch.create({
  baseURL: baseURL,
  async onRequest({ options }) {
    const accessToken = encryptStorage.getItem('accessToken')
    if (accessToken) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      }
    }
  },
  async onResponseError({ request, options, response }) {
    let login = false
    let mensaje = "Error en el proceso"
    mensaje = mensaje.toLowerCase()
    mensaje = mensaje.charAt(0).toUpperCase() + mensaje.slice(1)  
    if (response.status === 500) {
      mensaje = error.response.statusText
    } else if (response.status === 404) {
      mensaje = response._data.message
    } else if (response.status === 401) {
      login = true
      mensaje = response._data.message
      if (mensaje == undefined) {
        mensaje = error.response.data
      }
    }
    mensaje = mensaje.toLowerCase()
    mensaje = mensaje.charAt(0).toUpperCase() + mensaje.slice(1)
    if(login) {
      const app = useAppStore()
      
      app.loading(false)
      encryptStorage.removeItem('accessToken')
      encryptStorage.removeItem('userData')
      encryptStorage.removeItem('userAbilityRules')
      alert(`Debe iniciar sesión ${mensaje}`)
      window.location.href = import.meta.env.BASE_URL + 'login'

      return false 
    } else {
      const app = useAppStore()

      app.loading(false)
      app.mensajeSnackbar(mensaje)
      app.color("error")
      app.snackbar(true)
    }
    
   
  },
})

export const $base = baseURL
