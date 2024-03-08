import { useAppStore } from '@/stores/app'
import { ofetch } from 'ofetch'

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
    const accessToken = localStorage.getItem('accessToken')
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

    const app = useAppStore()

    app.loading(false)
    app.mensajeSnackbar(mensaje)
    app.color("error")
    app.snackbar(true)
  },
})

export const $base = baseURL
