<!-- eslint-disable camelcase -->
<script setup>
import { useAppStore } from '@/stores/app'
import { EncryptStorage } from 'encrypt-storage'
import Swal from 'sweetalert2'
import { useDisplay } from 'vuetify'
import { VDataTable } from 'vuetify/labs/VDataTable'

definePage({
  meta: {
    action: 'colombia/proc_come_grab_pedi',
    subject: 'colombia/proc_come_grab_pedi',
  },
})

const encryptStorage = new EncryptStorage('AZZORTI-SAMI', {
  storageType: 'localStorage',
})

const { mobile } = useDisplay()
const userData = encryptStorage.getItem('userData')
const appStore = useAppStore()

const itemsGlobal = ref([])
const itemsProductos = ref([])
const arrayDatos = ref([])
const detalleProducto = ref({})
const zonaProducto = ref('')

const arraySustituto = ref([])
 
const formulario = ref({
  nroDocumento: '',
  codigoCliente: '',
  asesora: '',
  direcccion: '',
  distrito: '',
  provincia: '',
  telefono: '',
  campana: '',
  zona: '',
  cupo: '',
  saldo: '',
  producto: '',
  punt_sue: '',
  autocomplete: '',
  isZona: false,
  isAutocomplete: true,
})

const errorNroDocumento = ref(false)
const errorMensajeNroDocumento = ref('')
const refAutocomplete = ref()

const headers = computed(() => {
  return [
    { title: 'Código', key: 'codi_vent' },
    { title: 'Descripción', key: 'nomb_prod' },
    { title: 'Página', key: 'nume_pagi' },
    { title: 'Precio', key: 'prec_vent' },
    { title: 'Cantidad', key: 'cant_pedi' },
    { title: 'Acciones', key: 'acciones', sortable: false, width: '10px' },
  ]
})

const mostrarSustituto = ref(false)

onMounted(async () => {
  appStore.titulo(`Procesos / Grabar pedido`)  
})

const onLimpiar= async () => {
  itemsGlobal.value = []
  itemsProductos.value = []
  formulario.value = {
    nroDocumento: '',
    codigoCliente: '',
    asesora: '',
    direcccion: '',
    distrito: '',
    provincia: '',
    telefono: '',
    campana: '',
    zona: '',
    cupo: '',
    saldo: '',
    producto: '',
    punt_sue: '',
    autocomplete: '',
    isZona: false,
    isAutocomplete: true,
  }
  arraySustituto.value = []
}

const limpiarValidacion= async () => {
  errorNroDocumento.value = false
  errorMensajeNroDocumento.value = ''
}

const onSeleccionar = data => {
  const index = itemsGlobal.value.indexOf(data)
  if (index !== -1) {
    itemsGlobal.value.splice(index, 1)
  }
}

const onRegistrar = async () => {
  if(arraySustituto.value.length > 0) {
    mostrarSustituto.value = true
  } else if (formulario.value.nroDocumento === '') {
    appStore.mensajeSnackbar(`Nro documento obligatorio.`)
    appStore.color("error")
    appStore.snackbar(true)
  } else if(itemsGlobal.value.length == 0) {
    appStore.mensajeSnackbar(`Debe agregar productos al pedido.`)
    appStore.color("error")
    appStore.snackbar(true)
  } else {
    liquidarPedido()
  }
}

const liquidarPedido = async () => {
  try {
    limpiarValidacion()
    appStore.mensaje(`Liquidando pedido ${formulario.value.nroDocumento}`)
    appStore.loading(true)

    const data = await $api(`/hmvc/ventas_v1/pedido/liquida_pedigz`, {
      method: "post",
      body: {
        'nume_iden': (formulario.value.nroDocumento === null) ? '' : formulario.value.nroDocumento,
        'codi_digi': itemsGlobal.value,
        'codi_perf': 'GZ',
      },
    })

    if (data.message.pasa_pedi) {
      let minimo = 0
      let moneda = ''
      minimo = 199
      moneda = 'COP'
      let minimoHtml = ''

      if (parseInt(data.message.tota_pedi, 10) < minimo) {
        minimoHtml = `<div class='row mt-1'>
                                  <div class='col text-center text-danger'>
                                    Pedido por debajo monto minimo ${moneda} ${minimo}
                                  </div>
                                </div>`
      }

      if (data.message.mensajes.length === 0) {
        const htmlMensaje = `<div class='row'>
                                        <div class='col text-left'>
                                          No tiene ninguna observación, ya puede grabar su pedido
                                        </div>
                                      </div>
                                      <div class='row mt-1'>
                                        <div class='col text-left'>
                                          <strong>Total :</strong> ${data.message.tota_pedi}
                                        </div>
                                      </div>
                                      ${minimoHtml}`

        Swal.fire({
          title: 'Liquidación pedido',
          html: htmlMensaje,
          icon: 'info',
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: 'Grabar pedido',
          cancelButtonText: 'Cancelar pedido',
          customClass: {
            confirmButton: 'v-btn bg-primary mr-1',
            cancelButton: 'v-btn bg-error ml-1',
          },
        }).then(result => {
          if (result.isConfirmed) {
            confirmarGrabarPedido()
          }
        })
      } else {
        let htmlMensaje = ''
        for (let m = 0; m < data.message.mensajes.length; m += 1) {
          htmlMensaje = `${htmlMensaje} <div class='row'>
                                        <div class='col text-left'>
                                          ${data.message.mensajes[m].desc_cond}
                                        </div>
                                      </div>`
        }
        htmlMensaje = `${htmlMensaje} <div class='row mt-1'>
                                        <div class='col text-left'>
                                          <strong>Total :</strong> ${data.message.tota_pedi}
                                        </div>
                                      </div>
                                      ${minimoHtml}`
        Swal.fire({
          title: 'Liquidación pedido',
          html: htmlMensaje,
          icon: 'info',
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: 'Grabar pedido',
          cancelButtonText: 'Cancelar pedido',
          customClass: {
            confirmButton: 'v-btn bg-primary mr-1',
            cancelButton: 'v-btn bg-error ml-1',
          },
        }).then(result => {
          if (result.isConfirmed) {
            confirmarGrabarPedido()
          }
        })
      }
    } else {
      let htmlMensaje = ''
      for (let m = 0; m < data.message.mensajes.length; m += 1) {
        htmlMensaje = `${htmlMensaje} <div class='row'>
                                        <div class='col text-left'>
                                          ${data.message.mensajes[m].desc_cond}
                                        </div>
                                      </div>`
      }
      htmlMensaje = `${htmlMensaje} <div class='row mt-1'>
                                        <div class='col text-left'>
                                          <strong>Total :</strong> ${data.message.tota_pedi}
                                        </div>
                                      </div>`
      Swal.fire({
        title: 'Liquidación pedido',
        html: htmlMensaje,
        icon: 'info',
        showConfirmButton: false,
        showCancelButton: true,
        confirmButtonText: 'Grabar pedido',
        cancelButtonText: 'Cancelar pedido',
        customClass: {
          confirmButton: 'v-btn bg-primary mr-1',
          cancelButton: 'v-btn bg-error ml-1',
        },
      })
    }

  } catch (error) {
    const { data } = error.response._data
    if (typeof data != "undefined") {
      for (var key in data)
      {
        if (key == 'nroDocumento') {
          errorNroDocumento.value = true
          errorMensajeNroDocumento.value = data[key]
        }

        if (key == 'productos') {
          appStore.mensajeSnackbar(data[key])
          appStore.color("error")
          appStore.snackbar(true)
        }
      }
    }
  }
  finally {
    appStore.loading(false)
  }
}

const obtenerProductos = async zona => {
  try {
    appStore.mensaje('Obteniendo productos')

    const data  = await $api(`/hmvc/ventas_v1/pedido/productos`, {
      method: "POST",
      body: {
        "codi_zona": zona,
        "codi_perf": "GZ",
      },
    })

    itemsProductos.value = data.map(item => ({
      codigo: item.codi_vent,
      producto: item.nomb_prod,
      pagina: item.nume_pagi,
      precio: item.prec_vent,
      faltante: item.indi_falt,
    }))

    arrayDatos.value = itemsProductos.value.map(item => `${item.codigo}`)

  } catch (e) {
    console.log(e)
  }
}

const obtenerEstadoPedidogz = async() => {
  try {
    appStore.mensaje('Obteniendo datos')
    appStore.loading(true)
    limpiarValidacion()

    itemsGlobal.value = []
    itemsProductos.value = []
    formulario.value.codigoCliente = ''
    formulario.value.asesora = ''
    formulario.value.direcccion = ''
    formulario.value.distrito = ''
    formulario.value.provincia = ''
    formulario.value.telefono = ''
    formulario.value.campana = ''
    formulario.value.zona = ''
    formulario.value.cupo = ''
    formulario.value.saldo = ''
    formulario.value.producto = ''
    formulario.value.punt_sue = ''
    formulario.value.autocomplete = ''
    formulario.value.isZona = false
    formulario.value.isAutocomplete = true 
    
    const { data } = await $api(`/api/sami/v1/procesos/grabar-pedido/estado-pedigz`, {
      method: "get",
      query: {
        nroDocumento: (formulario.value.nroDocumento === null) ? '' : formulario.value.nroDocumento,
      },
    })
    console.log("result data estado pedido sami gz")
    console.log(data)
    console.log("result data estado pedido sami gz")
    const zona = data.codi_zona
    const documento = data.nume_iden
    
    if(zonaProducto.value != zona) {
      zonaProducto.value = zona
      await obtenerProductos(zona)
    }
    
    const estadoPedido = await $api('/hmvc/ventas_v1/pedido/estado_pedigz', {
      method: 'POST',
      body: {
        "nume_iden": documento,
        "valo_perf": zona,
        "tipo_usua": "GZ",
      },
    });

    console.log("result data estadoPedido")
    console.log(estadoPedido)
    console.log("result data estadoPedido")
    
    formulario.value.codigoCliente = estadoPedido.dato_ases[0].codi_terc
    formulario.value.asesora = estadoPedido.dato_ases[0].nomb_ases
    formulario.value.direcccion = estadoPedido.dato_ases[0].dire_terc
    formulario.value.distrito = estadoPedido.dato_ases[0].nomb_barr
    formulario.value.provincia = estadoPedido.dato_ases[0].nomb_ciud
    formulario.value.telefono = estadoPedido.dato_ases[0].celu_ter1
    formulario.value.campana = estadoPedido.dato_ases[0].codi_camp
    formulario.value.zona = estadoPedido.dato_ases[0].codi_zona
    formulario.value.cupo = estadoPedido.dato_ases[0].cupo_cred
    formulario.value.saldo = estadoPedido.dato_ases[0].sald_ases
    formulario.value.punt_sue = estadoPedido.dato_ases[0].punt_suen
    formulario.value.isAutocomplete = false
    console.log("formulario")
    console.log(formulario)
    console.log("formulario")
    itemsGlobal.value = estadoPedido.codi_pedi.map(item => {
      return {
        ...item,
        tipo_prod: 'producto',
      }
    })

  } catch (error) {
    console.error("error")
    console.error(error)
    console.error("error")
    // const { data } = error.response._data

    // if (typeof data != "undefined") {
    //   for (var key in data)
    //   {
    //     if (key == 'nroDocumento') {
    //       errorNroDocumento.value = true
    //       errorMensajeNroDocumento.value = data[key]
    //     }
    //   }
    // }
  }
  finally {

    appStore.loading(false)
  }
}

const proc_come_grab_pedi_bind_nume = async () => {
  const regex = /^\d+$/

  const key = String.fromCharCode(
    !event.charCode ? event.which : event.charCode,
  )

  if (!regex.test(key)) {
    event.preventDefault()

    return false
  }
  
  return true
}

const agregarProducto = () => {
  if(formulario.value.producto == '') {
    appStore.mensajeSnackbar(`Código producto obligatorio.`)
    appStore.color("error")
    appStore.snackbar(true)
  } else {
    itemsGlobal.value.push(detalleProducto.value )
    
    formulario.value.producto = ''
    formulario.value.autocomplete = ''
    detalleProducto.value = {}
    setTimeout(() => {
      const autocompleteComponent = refAutocomplete.value
      const domElement = autocompleteComponent.$el // Accede al elemento DOM subyacente

      const inputElement = domElement.querySelector('input')
      if (inputElement) {
        document.getElementById(inputElement.id).value = null
      }
    }, 100)
  }
}

const agregarSustituto  = item => {
  itemsGlobal.value = itemsGlobal.value.filter(item => item.tipo_prod !== 'sustituto')

  item.cant_pedi = 1
  itemsGlobal.value.push(item)
  mostrarSustituto.value = false

  liquidarPedido()
}

const selectHandler = async suggestion => {
  if(suggestion != null) {
    formulario.value.producto = ''

    const selectedProduct = itemsProductos.value.find(item => item.codigo === suggestion)

    const codigo = selectedProduct.codigo
    const producto = selectedProduct.producto
    const faltante = selectedProduct.faltante
    const precio = selectedProduct.precio
    const pagina = selectedProduct.pagina

    if (faltante === 1) {
      appStore.mensajeSnackbar(`${codigo} ${producto} es un faltante anunciado.`)
      appStore.color("error")
      appStore.snackbar(true)

      formulario.value.autocomplete = ''
      
    } else {
      const productosJson = itemsGlobal.value

      let estado = 0
      if (productosJson.length > 0) {
        for (let i = 0; i < productosJson.length; i += 1) {
          if (productosJson[i].codi_vent === codigo) {
            estado = 1
          }
        }
        if (estado === 1) {
          appStore.mensajeSnackbar(`${codigo} ${producto} ya esta agregado.`)
          appStore.color("error")
          appStore.snackbar(true)
        } else {
          detalleProducto.value = {
            codi_vent: codigo,
            nomb_prod: producto,
            prec_vent: precio,
            nume_pagi: pagina,
            cant_pedi: 1,
            tipo_prod: 'producto',
          }
          formulario.value.producto = producto
        }
      } else {
        detalleProducto.value = {
          codi_vent: codigo,
          nomb_prod: producto,
          prec_vent: precio,
          nume_pagi: pagina,
          cant_pedi: 1,
          tipo_prod: 'producto',
        }
        formulario.value.producto = producto
      }
    }
  }
}

const confirmarGrabarPedido = async () => {
  try {
    appStore.mensaje('Grabando pedido.')
    appStore.loading(true)

    const data = await $api(`/hmvc/ventas_v1/pedido/guarda_pedigz`, {
      method: "post",
      body: {
        "nume_iden": (formulario.value.nroDocumento === null) ? '' : formulario.value.nroDocumento,
      },
    })

    const htmlMensaje = `<div class='row mt-1'>
                            <div class='col text-left'>
                              <strong>Documento :</strong> ${data.message.nume_iden}
                            </div>
                        </div>
                        <div class='row mt-1'>
                          <div class='col text-left'>
                            <strong>Asesora(or) :</strong> ${formulario.value.asesora}
                        </div>
                        </div>
                        <div class='row mt-1'>
                          <div class='col text-left'>
                            <strong>Grabación :</strong> ${data.message.nume_grab}
                          </div>
                      </div>`

    Swal.fire({
      title: 'Pedido grabado.',
      html: htmlMensaje,
      icon: 'success',
      showConfirmButton: true,
      showCancelButton: false,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar pedido',
      customClass: {
        confirmButton: 'v-btn bg-primary mr-1',
        cancelButton: 'v-btn bg-error ml-1',
      },
    })

    onLimpiar()

  } catch (error) {
    console.log(error)
    if (typeof error.response != "undefined") {
      const { data } = error.response._data
      if (typeof data != "undefined") {
        for (var key in data)
        {
          if (key == 'nroDocumento') {
            errorNroDocumento.value = true
            errorMensajeNroDocumento.value = data[key]
          }

          if (key == 'productos') {
            appStore.mensajeSnackbar(data[key])
            appStore.color("error")
            appStore.snackbar(true)
          }
        }
      }
    }
    
  }
  finally {
    appStore.loading(false)
  }
}
</script>

<template>
  <div>
    <AppPlantilla>
      <template #botones>
        <RegistrarBoton @procesar="onRegistrar" />
        <LimpiarBoton @procesar="onLimpiar" />
      </template>
      <template #contenido>
        <VRow>
          <VCol cols="12">
            <VCard>
              <VCardTitle class="mx-2 my-4">
                Datos asesora(or)
              </VCardTitle>
              <VCardText>
                <VRow>
                  <VCol
                    cols="12"
                    md="3"
                  >
                    <AppTextField
                      v-model="formulario.nroDocumento"
                      label="Nro documento"
                      type="text"
                      placeholder="Ingresar nro documento"
                      autocomplete="off"
                      :error="errorNroDocumento"
                      :error-messages="errorMensajeNroDocumento"
                      @keypress="proc_come_grab_pedi_bind_nume"
                      @keydown.enter="obtenerEstadoPedidogz"
                      @keydown.tab="obtenerEstadoPedidogz"
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="3"
                  >
                    <AppTextField
                      v-model="formulario.codigoCliente"
                      label="Código cliente"
                      type="text"
                      placeholder=""
                      autocomplete="off"
                      disabled
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formulario.asesora"
                      label="Asesora(or)"
                      type="text"
                      placeholder=""
                      autocomplete="off"
                      disabled
                    />
                  </VCol>
                </VRow>

                <VRow>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="formulario.direcccion"
                      label="Dirección"
                      type="text"
                      placeholder=""
                      autocomplete="off"
                      disabled
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="3"
                  >
                    <AppTextField
                      v-model="formulario.distrito"
                      label="Barrio"
                      type="text"
                      placeholder=""
                      autocomplete="off"
                      disabled
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="3"
                  >
                    <AppTextField
                      v-model="formulario.provincia"
                      label="Ciudad"
                      type="text"
                      placeholder=""
                      autocomplete="off"
                      disabled
                    />
                  </VCol>
                </VRow>


                <VRow>
                  <VCol
                    cols="12"
                    md="3"
                  >
                    <AppTextField
                      v-model="formulario.telefono"
                      label="Telefono"
                      type="text"
                      placeholder=""
                      autocomplete="off"
                      disabled
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="2"
                  >
                    <AppTextField
                      v-model="formulario.campana"
                      label="Campaña"
                      type="text"
                      placeholder=""
                      autocomplete="off"
                      disabled
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="2"
                  >
                    <AppTextField
                      v-model="formulario.zona"
                      label="Zona"
                      type="text"
                      placeholder=""
                      autocomplete="off"
                      disabled
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="2"
                  >
                    <AppTextField
                      v-model="formulario.cupo"
                      label="Cupo"
                      type="text"
                      placeholder=""
                      autocomplete="off"
                      disabled
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="2"
                  >
                    <AppTextField
                      v-model="formulario.saldo"
                      label="Saldo"
                      type="text"
                      placeholder=""
                      autocomplete="off"
                      disabled
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="2"
                  >
                    <AppTextField
                      v-model="formulario.punt_sue"
                      label="Puntos sueños Azzorti"
                      type="text"
                      placeholder=""
                      autocomplete="off"
                      disabled
                    />
                  </VCol>
                </VRow>

                <VRow>
                  <VCol
                    cols="12"
                    md="2"
                  >
                    <AppAutocomplete
                      id="idAutocomplete"
                      ref="refAutocomplete"
                      v-model="formulario.autocomplete"
                      label="Código producto"
                      :items="arrayDatos"
                      placeholder=""
                      :disabled="formulario.isAutocomplete"
                      item-text="codigo"
                      item-value="codigo"
                      clear-on-select
                      @keydown.enter="agregarProducto"
                      @update:model-value="selectHandler"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="10"
                  >
                    <AppTextField
                      v-model="formulario.producto"
                      label="Descripcion producto"
                      type="text"
                      placeholder=""
                      autocomplete="off"
                      disabled
                    />
                  </VCol>
                </VRow>
              </VCardText>

              <VCardTitle class="mx-2 my-4">
                Lista producto
              </VCardTitle>
              <VCardText>
                <VDataTable
                  :headers="headers"
                  :items="itemsGlobal"
                  no-data-text=""
                  fixed-header
                  height="400"
                  class="text-no-wrap"
                  :items-per-page="-1"
                >
                  <template #item.acciones="{ item }">
                    <VBtn
                      icon
                      size="x-small"
                      color="default"
                      variant="text"
                      @click="onSeleccionar(item)"
                    >
                      <VIcon
                        size="22"
                        icon="tabler-trash"
                      />
                    </VBtn>
                  </template>

                  <template #item.cant_pedi="row">
                    <VTextField
                      v-if="row.item.tipo_prod === 'producto'"
                      v-model="row.item.cant_pedi"
                      type="number"
                      @keypress="proc_come_grab_pedi_bind_nume"
                    />
                    <span v-else> {{ row.item.cant_pedi }} </span>
                  </template>
          
                  <template #bottom />
                </VDataTable>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </template>
    </AppPlantilla>
    <VDialog
      :fullscreen="(mobile) ? true : false"
      :max-width="(mobile) ? undefined : 1200"
      persistent
      scrollable
      :model-value="mostrarSustituto"
    >
      <VCard>
        <VToolbar color="primary">
          <VToolbarTitle>
            Productos sustitutos
          </VToolbarTitle>
        </VToolbar>
        <VCardSubtitle class="mt-4 text-wrap">
          Querida asesora por la gran acogida del premio del concurso de actividad te damos dos opciones para elegir: Escoger 1 sustituto y te llegara en C15/2024 o Escoger el producto original que te llegara junto con tu pedido en C01/2025 ( luego del 7 de diciembre del 2024).
        </VCardSubtitle>
        <VCardText>
          <VRow>
            <VCol
              v-for="(item, index) in arraySustituto"
              :key="index"
              cols="12"
              md="3"
            > 
              <VCard>
                <VImg :src="item.url_imag" />

                <VBtn
                  block
                  :color="(index==0) ? 'error' : 'primary'"
                  @click="agregarSustituto(item)"
                >
                  {{ item.nomb_prod }}
                </VBtn>
              </VCard>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VDialog>
  </div>
</template>
