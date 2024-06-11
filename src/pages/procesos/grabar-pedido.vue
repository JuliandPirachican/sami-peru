<!-- eslint-disable camelcase -->
<script setup>
import { useAppStore } from '@/stores/app';
import { EncryptStorage } from 'encrypt-storage';
import Swal from 'sweetalert2';
import { VDataTable } from 'vuetify/labs/VDataTable';

definePage({
  meta: {
    action: 'colombia/proc_come_grab_pedi',
    subject: 'colombia/proc_come_grab_pedi',
  },
})

const encryptStorage = new EncryptStorage('AZZORTI-SAMI', {
  storageType: 'localStorage',
})

const userData = encryptStorage.getItem('userData')
const appStore = useAppStore()

const itemsGlobal = ref([])
const itemsProductos = ref([])
const arrayDatos = ref([])

const formulario = ref({
  zona: null,
  nroDocumento: '',
  asesora: '',
  campana: '',
  saldo: '',
  producto: '',
  autocomplete: null,
  isNroDocumento: true,
  isZona: false,
  isAutocomplete: true,
})

const zonaOptions = ref([])
const errorZona = ref(false)
const errorMensajeZona = ref('')

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

onMounted(async () => {
  appStore.titulo(`Procesos / Grabar pedido`)
  await obtenerZona()
})

const obtenerZona = async () => {
  try {
    appStore.mensaje('Obteniendo zonas')
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
      // eslint-disable-next-line no-console
      console.log(e.response._data)
    }
  }
  finally {
    appStore.loading(false)
  }
}

const onLimpiar= async () => {
  itemsGlobal.value = []
  itemsProductos.value = []
  arrayDatos.value = []
  formulario.value = {
    zona: null,
    nroDocumento: '',
    asesora: '',
    campana: '',
    saldo: '',
    autocomplete: null,
    isNroDocumento: true,
    isZona: false,
    isAutocomplete: true,
  }
}

const limpiarValidacion= async () => {
  errorZona.value = false
  errorMensajeZona.value = ''

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
  try {
    limpiarValidacion()
    appStore.mensaje('Generando proceso')
    appStore.loading(true)

    const data = await $api(`/api/sami/v1/procesos/grabar-pedido/liquida-pedigz`, {
      method: "post",
      body: {
        nroDocumento: (formulario.value.nroDocumento === null) ? '' : formulario.value.nroDocumento,
        productos: itemsGlobal.value,
      },
    })

    if (data.data.pasa_pedi) {
      let minimo = 0
      let moneda = ''
      minimo = 190
      moneda = 'S/'
      let minimoHtml = ''

      if (parseInt(data.data.tota_pedi, 10) < minimo) {
        minimoHtml = `<div class='row mt-1'>
                                  <div class='col text-center text-danger'>
                                    Pedido por debajo monto minimo ${moneda} ${minimo}
                                  </div>
                                </div>`
      }

      if (data.data.mensajes.length === 0) {
        const htmlMensaje = `<div class='row'>
                                        <div class='col text-left'>
                                          No tiene ninguna observación, ya puede grabar su pedido
                                        </div>
                                      </div>
                                      <div class='row mt-1'>
                                        <div class='col text-left'>
                                          <strong>Total :</strong> ${data.data.tota_pedi}
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
            proc_come_grab_pedi_conf()
          }
        })
      } else {
        let htmlMensaje = ''
        for (let m = 0; m < data.data.mensajes.length; m += 1) {
          htmlMensaje = `${htmlMensaje} <div class='row'>
                                        <div class='col text-left'>
                                          ${data.data.mensajes[m].desc_cond}
                                        </div>
                                      </div>`
        }
        htmlMensaje = `${htmlMensaje} <div class='row mt-1'>
                                        <div class='col text-left'>
                                          <strong>Total :</strong> ${data.data.tota_pedi}
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
            proc_come_grab_pedi_conf()
          }
        })
      }
    } else {
      let htmlMensaje = ''
      for (let m = 0; m < data.data.mensajes.length; m += 1) {
        htmlMensaje = `${htmlMensaje} <div class='row'>
                                        <div class='col text-left'>
                                          ${data.data.mensajes[m].desc_cond}
                                        </div>
                                      </div>`
      }
      htmlMensaje = `${htmlMensaje} <div class='row mt-1'>
                                        <div class='col text-left'>
                                          <strong>Total :</strong> ${data.data.tota_pedi}
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

const obtenerProductos = async() => {
  try {
    appStore.mensaje('Obteniendo productos')
    appStore.loading(true)

    limpiarValidacion()

    const response = await $api(`/api/sami/v1/procesos/grabar-pedido/productos`, {
      method: "get",
      query: {
        zona: (formulario.value.zona === null) ? '' : formulario.value.zona,
      },
    })

    itemsGlobal.value = []
    itemsProductos.value = []
    arrayDatos.value = []
    formulario.value.autocomplete = null
    formulario.value.isZona = true
    formulario.value.isNroDocumento = false
    
    itemsProductos.value = response.data.map(item => ({
      codigo: item.codi_vent,
      producto: item.nomb_prod,
      pagina: item.nume_pagi,
      precio: item.prec_vent,
      faltante: item.indi_falt,
    }))

    arrayDatos.value = itemsProductos.value.map(item => `${item.codigo} - ${item.producto}`)

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

const obtenerEstadoPedidogz = async() => {
  try {
    appStore.mensaje('Obteniendo datos')
    appStore.loading(true)
    limpiarValidacion()

    const { data } = await $api(`/api/sami/v1/procesos/grabar-pedido/estado-pedigz`, {
      method: "get",
      query: {
        nroDocumento: (formulario.value.nroDocumento === null) ? '' : formulario.value.nroDocumento,
        zona: (formulario.value.zona === null) ? '' : formulario.value.zona,
      },
    })

    formulario.value.asesora = data.dato_ases[0].nomb_ases
    formulario.value.campana = data.dato_ases[0].codi_camp
    formulario.value.saldo = data.dato_ases[0].sald_ases
    formulario.value.isNroDocumento = true
    formulario.value.isAutocomplete = false

    itemsGlobal.value = data.codi_pedi

  } catch (error) {
    const { data } = error.response._data

    if (typeof data != "undefined") {
      for (var key in data)
      {
        if (key == 'nroDocumento') {
          errorNroDocumento.value = true
          errorMensajeNroDocumento.value = data[key]
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

const proc_come_grab_pedi_bind_nume = async () => {
  const regex = new RegExp('^[0-9]+$')

  const key = String.fromCharCode(
    !event.charCode ? event.which : event.charCode,
  )

  if (!regex.test(key)) {
    event.preventDefault()

    return false
  }
  
  return true
}

const selectHandler = async suggestion => {
  if(suggestion != null){
    const datos = suggestion.split(" ")
    const selectedProduct = itemsProductos.value.find(item => item.codigo === datos[0])

    const codigo = selectedProduct.codigo
    const producto = selectedProduct.producto
    const faltante = selectedProduct.faltante
    const precio = selectedProduct.precio
    const pagina = selectedProduct.pagina

    if (faltante === 1) {
      appStore.mensajeSnackbar(`${codigo} ${producto} es un faltante anunciado.`)
      appStore.color("error")
      appStore.snackbar(true)

      formulario.value.autocomplete = null
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
          const detalle = {
            codi_vent: codigo,
            nomb_prod: producto,
            prec_vent: precio,
            nume_pagi: pagina,
            cant_pedi: 1,
          }

          itemsGlobal.value.push(detalle)
        }
      } else {

        const detalle = {
          codi_vent: codigo,
          nomb_prod: producto,
          prec_vent: precio,
          nume_pagi: pagina,
          cant_pedi: 1,
        }

        itemsGlobal.value.push(detalle)
      }

      formulario.value.autocomplete = null

      const autocomplete = document.getElementById("formulario-autocomplete")
      
      setTimeout(() => {
        autocomplete.blur()
      }, 50)

      setTimeout(() => {
        autocomplete.focus()
      }, 100)

    }
  }
  
}

const proc_come_grab_pedi_conf = async () => {
  try {
    appStore.mensaje('Generando proceso.')
    appStore.loading(true)

    const data = await $api(`/api/sami/v1/procesos/grabar-pedido/guarda_pedigz`, {
      method: "post",
      body: {
        nroDocumento: (formulario.value.nroDocumento === null) ? '' : formulario.value.nroDocumento,
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
              <VCardText>
                <VRow>
                  <VCol
                    cols="12"
                    md="2"
                  >
                    <AppSelect
                      v-model="formulario.zona"
                      :items="zonaOptions"
                      label="Zona"
                      placeholder="Zona"
                      :disabled="formulario.isZona"
                      item-title="text"
                      item-value="id"
                      :error="errorZona"
                      :error-messages="errorMensajeZona"
                      @update:model-value="obtenerProductos"
                    />
                  </VCol>
                </VRow>

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
                      :disabled="formulario.isNroDocumento"
                      :error="errorNroDocumento"
                      :error-messages="errorMensajeNroDocumento"
                      @keypress="proc_come_grab_pedi_bind_nume"
                      @keydown.enter="obtenerEstadoPedidogz"
                      @keydown.tab="obtenerEstadoPedidogz"
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="5"
                  >
                    <AppTextField
                      v-model="formulario.asesora"
                      label="Asesora(or)"
                      type="text"
                      placeholder=""
                      autocomplete="off"
                      disabled="true"
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
                      disabled="true"
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
                      disabled="true"
                    />
                  </VCol>
                </VRow>

                <VRow>
                  <VCol>
                    <AppAutocomplete
                      id="formulario-autocomplete"
                      ref="refAutocomplete"
                      v-model="formulario.autocomplete"
                      label="Ingresar producto"
                      :items="arrayDatos"
                      placeholder="Ingresar producto"
                      :disabled="formulario.isAutocomplete"
                      item-text="producto"
                      item-value="codigo"
                      @update:model-value="selectHandler"
                    />
                  </VCol>
                </VRow>
              </VCardText>

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
                      v-model="row.item.cant_pedi"
                      type="number"
                      @keypress="proc_come_grab_pedi_bind_nume"
                    />
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
