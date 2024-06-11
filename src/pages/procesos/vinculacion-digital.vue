<!-- eslint-disable camelcase -->
<script setup>
import { useAppStore } from '@/stores/app'
import { EncryptStorage } from 'encrypt-storage'
import JqxGrid from "jqwidgets-scripts/jqwidgets-vue3/vue_jqxgrid.vue"
import Swal from 'sweetalert2'
import { useDisplay } from 'vuetify'

definePage({
  meta: {
    action: 'colombia/proc_come_vinc_digi',
    subject: 'colombia/proc_come_vinc_digi',
  },
})

const encryptStorage = new EncryptStorage('AZZORTI-SAMI', {
  storageType: 'localStorage',
})

const { mobile } = useDisplay()
const appStore = useAppStore()
const userData = encryptStorage.getItem('userData')

const formulario = ref({
  zona: null,
})

const zonaOptions = ref([])
const errorZona = ref(false)
const errorMensajeZona = ref('')

const cabecera = computed(() => {
  return [
    {
      title: 'Fecha envio',
      key: 'fech_envi',
    },
    {
      title: 'Campaña',
      key: 'codi_camp',
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
      title: 'Documento identidad',
      key: 'nume_iden',
    },
    {
      title: 'Primer nombre',
      key: 'prim_nomb',
    },
    {
      title: 'Segundo nombre',
      key: 'segu_nomb',
    },
    {
      title: 'Primer apellido',
      key: 'prim_apel',
    },
    {
      title: 'Segundo apellido',
      key: 'segu_apel',
    },
    {
      title: 'Celular',
      key: 'celu_ases',
    },
    {
      title: 'Departamento',
      key: 'nomb_dpto',
    },
    {
      title: 'Provincia',
      key: 'nomb_ciud',
    },
    {
      title: 'Dirección',
      key: 'dire_ases',
    },
    {
      title: 'Fecha nacimiento',
      key: 'fech_naci',
    },
    {
      title: 'Sexo',
      key: 'codi_sexo',
    },
  ]
})

const columnasGlobal = [
  {
    text: 'Fecha envio',
    dataField: 'fech_envi',
    width: (mobile) ? '25%':'10%',
    cellsalign: 'center',
    align: 'center',
  },
  {
    text: 'Campaña',
    dataField: 'codi_camp',
    width: (mobile) ? '25%':'10%',
    cellsalign: 'center',
    align: 'center',
  },
  {
    text: 'Zona',
    dataField: 'codi_zona',
    width: (mobile) ? '25%':'10%',
    cellsalign: 'center',
    align: 'center',
  },
  {
    text: 'Sector',
    dataField: 'codi_sect',
    width: (mobile) ? '25%':'10%',
    cellsalign: 'center',
    align: 'center',
  },
  {
    text: 'Documento identidad',
    dataField: 'nume_iden',
    width: (mobile) ? '25%':'10%',
    cellsalign: 'left',
    align: 'center',
  },
  {
    text: 'Primer nombre',
    dataField: 'prim_nomb',
    width: (mobile) ? '35%':'10%',
    cellsalign: 'left',
    align: 'center',
  },
  {
    text: 'Segundo nombre',
    dataField: 'segu_nomb',
    width: (mobile) ? '35%':'10%',
    cellsalign: 'left',
    align: 'center',
  },
  {
    text: 'Primer apellido',
    dataField: 'prim_apel',
    width: (mobile) ? '35%':'10%',
    cellsalign: 'left',
    align: 'center',
  },
  {
    text: 'Segundo apellido',
    dataField: 'segu_apel',
    width: (mobile) ? '35%':'10%',
    cellsalign: 'left',
    align: 'center',
  },
  {
    text: 'Celular',
    dataField: 'celu_ases',
    width: (mobile) ? '30%':'10%',
    cellsalign: 'left',
    align: 'center',
  },
  {
    text: 'Departamento',
    dataField: 'nomb_dpto',
    width: (mobile) ? '30%':'10%',
    cellsalign: 'left',
    align: 'center',
  },
  {
    text: 'Provincia',
    dataField: 'nomb_ciud',
    width: (mobile) ? '30%':'10%',
    cellsalign: 'left',
    align: 'center',
  },
  {
    text: 'Dirección',
    dataField: 'dire_ases',
    width: (mobile) ? '40%':'10%',
    cellsalign: 'left',
    align: 'center',
  },
  {
    text: 'Fecha nacimiento',
    dataField: 'fech_naci',
    width: (mobile) ? '30%':'10%',
    cellsalign: 'left',
    align: 'center',
  },
  {
    text: 'Sexo',
    dataField: 'codi_sexo',
    width: (mobile) ? '25%':'10%',
    cellsalign: 'left',
    align: 'center',
  },

]

const sourceGlobal = ref({
  localdata: [],
  datafields: [
    { name: 'pdf', type: 'string' },
    { name: 'docu_lide', type: 'string' },
    { name: 'nomb_lide', type: 'string' },
    { name: 'codi_zona', type: 'string' },
    { name: 'codi_sect', type: 'string' },
    { name: 'codi_camp', type: 'string' },
    { name: 'fech_envi', type: 'string' },
    { name: 'cons_docu', type: 'string' },
    { name: 'nume_iden', type: 'string' },
    { name: 'prim_nomb', type: 'string' },
    { name: 'segu_nomb', type: 'string' },
    { name: 'prim_apel', type: 'string' },
    { name: 'segu_apel', type: 'string' },
    { name: 'corr_ases', type: 'string' },
    { name: 'fech_naci', type: 'string' },
    { name: 'codi_sexo', type: 'string' },
    { name: 'nomb_dpto', type: 'string' },
    { name: 'nomb_ciud', type: 'string' },
    { name: 'celu_ases', type: 'string' },
    { name: 'nume_refe', type: 'string' },
    { name: 'nomb_refe', type: 'string' },
    { name: 'dire_ases', type: 'string' },
    { name: 'nomb_barr', type: 'string' },
    { name: 'dire_entr', type: 'string' },
    { name: 'cuen_regr', type: 'string' },
    { name: 'zona_geo', type: 'string' },
    { name: 'vali_geo', type: 'string' },
    { name: 'cart_cast', type: 'string' },
    { name: 'pedi_prep', type: 'string' },
    { name: 'cons_barr', type: 'string' },
  ],
  datatype: 'json',
})

const adaptadorGlobal = new jqx.dataAdapter(sourceGlobal.value)
const refGridGlobal = ref()
const localization = appStore.localization

onMounted(async () => {
  appStore.titulo(`Procesos / Vinculación digital`)
  await obtenerZona()
})

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
      // eslint-disable-next-line no-console
      console.log( e.response._data)
    }
  }
  finally {
    appStore.loading(false)
  }
}

const onGenerar = async () => {
  try {
    limpiarValidacion()

    refGridGlobal.value.refreshfilterrow()
    refGridGlobal.value.clearselection()
    refGridGlobal.value.clear()

    appStore.mensaje('Obteniendo información')
    appStore.loading(true)

    const { data } = await $api(`/api/sami/v1/procesos/vinculacion-digital`, {
      method: "get",
      query: {
        zona: formulario.value.zona,
      },
    })

    sourceGlobal.value.localdata = data.data_glob
    refGridGlobal.value.updatebounddata('cells')
    refGridGlobal.value.refreshfilterrow()
    
  } catch (error) {
    const { data } = error.response._data    
    if (typeof data != "undefined") {
      for (var key in data)
      {
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

const onExcel = async () => {
  try {
    appStore.mensaje('Generando archivo')
    appStore.loading(true)

    const { data }  = await $api(`/api/sami/v1/procesos/vinculacion-digital/excel`, {
      method: "post", 
      body: {
        cabecera: cabecera.value,
        detalle: JSON.stringify(refGridGlobal.value.exportdata('xml')),
      },
    })
    
    window.open(`${$base}/temporales/${data}`, '_blank')
  } catch (e) {
  }
  finally { 
    appStore.loading(false)
  }
}


const onAprobar = async () => {
  const rowindexes = refGridGlobal.value.getselectedrowindex()
  if (rowindexes === -1) {
    appStore.mensajeSnackbar('No tiene vinculacion seleccionada.')
    appStore.color("error")
    appStore.snackbar(true)
  } else {
    try {
      appStore.mensaje('Generando proceso.')
      appStore.loading(true)

      const dataRecord = refGridGlobal.value.getrowdata(rowindexes)

      const codiCamp = dataRecord.codi_camp
      const numeIden = dataRecord.nume_iden
      const codiZona = dataRecord.codi_zona
      const codiSect = dataRecord.codi_sect
      const ceduLide = dataRecord.docu_lide

      const rsVinculacion = await $api(`/api/sami/v1/procesos/vinculacion-digital/aprobar`, {
        method: "post",
        body: {
          codi_camp: codiCamp,
          nume_iden: numeIden,
          codi_zona: codiZona,
          codi_sect: codiSect,
          cedu_lide: ceduLide,
        },
      })

      if (rsVinculacion.status) {
        let nombAses = `${dataRecord.prim_apel} ${dataRecord.segu_apel} ${dataRecord.prim_nomb} ${dataRecord.segu_nomb}`
        nombAses = nombAses.toLowerCase()
        nombAses = nombAses.charAt(0).toUpperCase() + nombAses.slice(1)

        Swal.fire({
          title: 'Confirmación',
          text: `Desea aprobar la solicitud del cliente ${nombAses}`,
          icon: 'info',
          showCancelButton: true,
          confirmButtonText: 'Si',
          cancelButtonText: 'No',
          customClass: {
            confirmButton: 'v-btn bg-primary mr-1',
            cancelButton: 'v-btn bg-error ml-1',
          },
          showClass: {
            popup: 'animate__animated animate__bounceIn',
          },
        }).then(result => {
          if (result.isConfirmed) {
            onConfirmar()
          } else {
            onCancelar()
          }
        })
      }
      // eslint-disable-next-line no-empty
    } catch (error) {

    } finally {
      appStore.loading(false)
      appStore.mensaje('')
    }
  }
}

const onCancelar = async () => {
  const rowindexes = refGridGlobal.value.getselectedrowindex()
  if (rowindexes === -1) {
    appStore.mensajeSnackbar('No tiene vinculacion seleccionada.')
    appStore.color("error")
    appStore.snackbar(true)
  } else {
    try {
      appStore.mensaje('Generando proceso.')
      appStore.loading(true)

      await $api(`/api/sami/v1/procesos/vinculacion-digital/cancelar`, {
        method: "post",
      })
      // eslint-disable-next-line no-empty
    } catch (error) {

    } finally {
      appStore.loading(false)
    }
  }
}

const onConfirmar = async () => {
  const rowindexes = refGridGlobal.value.getselectedrowindex()
  if (rowindexes === -1) {
    appStore.mensajeSnackbar('No tiene vinculacion seleccionada.')
    appStore.color("error")
    appStore.snackbar(true)
  } else {
    try {
      appStore.mensaje('Generando proceso.')
      appStore.loading(true)

      const rsVinculacion = await $api(`/api/sami/v1/procesos/vinculacion-digital/confirmar`, {
        method: "post",
      })

      if (rsVinculacion.status) {
        appStore.color("success")
      } else {
        appStore.color("error")
      }
      appStore.mensajeSnackbar(rsVinculacion.message)
      appStore.snackbar(true)
      
      refGridGlobal.value.deleterow(rowindexes)
      refGridGlobal.value.clearselection()
      // eslint-disable-next-line no-empty
    } catch (error) {

    } finally {
      appStore.loading(false)
    }
  }
}

const onReenviar = async () => {
  const rowindexes = refGridGlobal.value.getselectedrowindex()
  if (rowindexes === -1) {
    appStore.mensajeSnackbar('No tiene vinculacion seleccionada.')
    appStore.color("error")
    appStore.snackbar(true)
  } else {
    try {
      appStore.mensaje('Generando proceso.')
      appStore.loading(true)

      const dataRecord = refGridGlobal.value.getrowdata(rowindexes)
      const codiCamp = dataRecord.codi_camp
      const nombAses = `${dataRecord.prim_apel} ${dataRecord.segu_apel} ${dataRecord.prim_nomb} ${dataRecord.segu_nomb}`
      const numeIden = dataRecord.nume_iden

      const rsVinculacion = await $api(`/api/sami/v1/procesos/vinculacion-digital/reenviar`, {
        method: "post",
        body: {
          codi_camp: codiCamp,
          nume_iden: numeIden,
          nomb_ases: nombAses.trim(),
        },
      })

      appStore.color("success")
      appStore.mensajeSnackbar(rsVinculacion.message)
      appStore.snackbar(true)
      // eslint-disable-next-line no-empty
    } catch (error) {

    } finally {
      appStore.loading(false)
    }
  }
}

const onVerPDF =async () => {
  appStore.mensaje('Generando archivo')
  appStore.loading(true)

  const rowindexes = refGridGlobal.value.getselectedrowindex()

  if (rowindexes === -1) {
    appStore.mensajeSnackbar('No tiene vinculacion seleccionada.')
    appStore.color("error")
    appStore.snackbar(true)
  } else {
    const dataRecord = refGridGlobal.value.getrowdata(rowindexes)
    const { pdf } = dataRecord
    if (pdf === '') {
      appStore.mensajeSnackbar('No tiene pdf generado.')
      appStore.color("error")
      appStore.snackbar(true)
    } else {
      const rutaPdf = 'https://intranet.dupree.pe/archivos/clientes/vinculacion/'
      const archivo = rutaPdf + pdf

      window.open(archivo, `Solicitud asesora${archivo}`, 'popup')
    }
  }
  appStore.loading(false)
}

const onLimpiar= async () => {
  formulario.value = {
    zona: null,
  }

  sourceGlobal.value.localdata = []
  refGridGlobal.value.updatebounddata('cells')
  refGridGlobal.value.refreshfilterrow()
  refGridGlobal.value.clearselection()
}



const onRegistrar = async () => { 
  try {
    limpiarValidacion()
    appStore.mensaje('Actualizando datos')
    appStore.loading(true)

    const data  = await $api(`/api/sami/v1/procesos/confirmar-preinscripcion-movil`, {
      method: "put",
      body: {
        tipoDocumento: (preinscripcion.value.tipoDocumento === null) ? '' : preinscripcion.value.tipoDocumento,
        nroDocumentoAntiguo: (preinscripcion.value.nroDocumentoAntiguo === null) ? '' : preinscripcion.value.nroDocumentoAntiguo,
        nrodocumento: (preinscripcion.value.nrodocumento === null) ? '' : preinscripcion.value.nrodocumento,
        nombres: (preinscripcion.value.nombres === null) ? '' : preinscripcion.value.nombres,
        apellidos: (preinscripcion.value.apellidos === null) ? '' : preinscripcion.value.apellidos,
        departamento: (preinscripcion.value.departamento === null) ? '' : preinscripcion.value.departamento,
        provincia: (preinscripcion.value.provincia === null) ? '' : preinscripcion.value.provincia,
        distrito: (preinscripcion.value.distrito === null) ? '' : preinscripcion.value.distrito,
        direccion: (preinscripcion.value.direccion === null) ? '' : preinscripcion.value.direccion,
        zona: (preinscripcion.value.zona === null) ? '' : preinscripcion.value.zona,
        sector: (preinscripcion.value.sector === null) ? '' : preinscripcion.value.sector,
        identificacionReferido: (preinscripcion.value.identificacionReferido === null) ? '' : preinscripcion.value.identificacionReferido,
        fechaNacimiento: (preinscripcion.value.fechaNacimiento === null) ? '' : preinscripcion.value.fechaNacimiento,
        telefono: (preinscripcion.value.telefono === null) ? '' : preinscripcion.value.telefono,
        celular: (preinscripcion.value.celular === null) ? '' : preinscripcion.value.celular,
        correo: (preinscripcion.value.correo === null) ? '' : preinscripcion.value.correo,
        tipoVia: (preinscripcion.value.tipoVia === null) ? '' : preinscripcion.value.tipoVia,
        parentesco: (preinscripcion.value.parentesco === null) ? '' : preinscripcion.value.parentesco,
        nombreParentesco: (preinscripcion.value.nombreParentesco === null) ? '' : preinscripcion.value.nombreParentesco,
        apellidoParentesco: (preinscripcion.value.apellidoParentesco === null) ? '' : preinscripcion.value.apellidoParentesco,
        telefonoParentesco: (preinscripcion.value.telefonoParentesco === null) ? '' : preinscripcion.value.telefonoParentesco,
        celularParentesco: (preinscripcion.value.celularParentesco === null) ? '' : preinscripcion.value.celularParentesco,
        campana: (preinscripcion.value.campana === null) ? '' : preinscripcion.value.campana,
      },
    })
        
    onCloseEditar()
    let mensaje = data.message
    mensaje = mensaje.toLowerCase()
    mensaje = mensaje.charAt(0).toUpperCase() + mensaje.slice(1)
    appStore.mensajeSnackbar(mensaje)
    appStore.color("success")
    appStore.snackbar(true)
    nextTick(() => {
      onGenerar()
    })
  } catch (error) {
    const { data } = error.response._data
    if (typeof data != "undefined") {
      for (var key in data)
      {
        if (key == 'nrodocumento') {
          errorNroDocumento.value = true
          errorMensajeNroDocumento.value = data[key]
        }
        if (key == 'nombres') {
          errorNombres.value = true
          errorMensajeNombres.value = data[key]
        }
        if (key == 'apellidos') {
          errorApellidos.value = true
          errorMensajeApellidos.value = data[key]
        }
        if (key == 'departamento') {
          errorDepartamento.value = true
          errorMensajeDepartamento.value = data[key]
        }
        if (key == 'provincia') {
          errorProvincia.value = true
          errorMensajeProvincia.value = data[key]
        }
        if (key == 'distrito') {
          errorDistrito.value = true
          errorMensajeDistrito.value = data[key]
        }
        if (key == 'tipoVia') {
          errorTipoVia.value = true
          errorMensajeTipoVia.value = data[key]
        }
        if (key == 'tipoDocumento') {
          errorTipoDocumento.value = true
          errorMensajeTipoDocumento.value = data[key]
        }
        if (key == 'direccion') {
          errorDireccion.value = true
          errorMensajeDireccion.value = data[key]
        }
        if (key == 'zona') {
          errorZona.value = true
          errorMensajeZona.value = data[key]
        }
        if (key == 'celular') {
          errorCelular.value = true
          errorMensajeCelular.value = data[key]
        }
        if (key == 'correo') {
          errorCorreo.value = true
          errorMensajeCorreo.value = data[key]
        }
        if (key == 'campana') {
          errorCampana.value = true
          errorMensajeCampana.value = data[key]
        }
      }
    }
  }
  finally {
    appStore.loading(false)
  }
}

const limpiarValidacion = () => {
  errorZona.value = false
  errorMensajeZona.value = ''
}
</script>

<template>
  <div>
    <AppPlantilla>
      <template #botones>
        <GenerarBoton @procesar="onGenerar" />
        <AprobarBoton @procesar="onAprobar" />
        <ReenviarBoton @procesar="onReenviar" />
        <PdfBoton @procesar="onVerPDF" />
        <ExcelBoton @procesar="onExcel" />
        <LimpiarBoton @procesar="onLimpiar" />
      </template>
      <template #contenido>
        <VRow>
          <VCol cols="12">
            <VCard title="Buscar inscripción">
              <VCardText>
                <VRow justify="space-between">
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
            <VCard title="Lista inscripción">
              <VCardText>
                <JqxGrid
                  ref="refGridGlobal"
                  theme="material"
                  width="100%"
                  :localization="localization"
                  :height="450"
                  :columns="columnasGlobal"
                  :source="adaptadorGlobal"
                  columnsresize
                  :columnsautoresize="false"
                  enableanimations
                  sortable
                  sortmode="many"
                  filterable
                  :altrows="false"
                  :showemptyrow="false"
                  columnsreorder
                  selectionmode="singlerow"
                  scrollmode="logical"
                  showfilterrow
                  :columnsmenu="false"
                />
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </template>
    </AppPlantilla>
  </div>
</template>

