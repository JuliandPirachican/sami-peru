<script setup>
import { useAppStore } from '@/stores/app'
import { VDataTable } from 'vuetify/labs/VDataTable'

definePage({
  meta: {
    action: 'peru/proc_come_desb_ases',
    subject: 'peru/proc_come_desb_ases',
  },
})

// *Declaracion de variables
const appStore = useAppStore()
const userData = JSON.parse(localStorage.getItem('userData'))

const headers = [
  {
    title: 'Nro docu.',
    key: 'nume_docu',
  },
  {
    title: 'Nombre(s)',
    key: 'nomb_terc',
  },
  {
    title: 'Apellido(s)',
    key: 'apel_terc',
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
    title: 'Telefono',
    key: 'tele_terc',
  },
  {
    title: 'Celular',
    key: 'celu_terc',
  },
]

const selected = ref([])
const items = ref([])

const loginData = JSON.parse(localStorage.getItem('login'))

onMounted(async () => {
  appStore.titulo(`Procesos / Desbloquear asesora`)
})

const onGenerar = async () => {
  try {
    onLimpiar()
    appStore.mensaje('Obteniendo información')
    appStore.loading(true)

    const { data } = await $api(`/api/sami/v1/procesos/desbloquear-asesora/asesoras`, {
      method: "get",
    })

    items.value = data.data_glob

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

// ^Metodo registrar modulos al perfil gerente de zona
const onRegistrar = async () => {
  if(selected.value.length == 0) {
    appStore.mensajeSnackbar('Debe seleccionar asesora para desbloquear.')
    appStore.color("error")
    appStore.snackbar(true)
  } else {
    try {
      appStore.mensaje('Generando proceso')
      appStore.loading(true)
 
      const data  = await $api(`/api/sami/v1/procesos/desbloquear-asesora`, {
        method: "post",
        body: {
          asesoras: JSON.stringify(selected.value),
        },
      })

      onLimpiar()

      let mensaje = data.message
      mensaje = mensaje.toLowerCase()
      mensaje = mensaje.charAt(0).toUpperCase() + mensaje.slice(1)
      appStore.mensajeSnackbar(mensaje)
      appStore.color("success")
      appStore.snackbar(true)
    } catch (e) {
    }
    finally {
      appStore.loading(false)
    }

  }
  
}

const onExcel = async () => {
  try {
    appStore.mensaje('Generando archivo')
    appStore.loading(true)

    const { data } = await $api(`/api/sami/v1/procesos/desbloquear-asesora/excel`, {
      method: "post",
      body: {
        data: items.value,
      },
    })
    
    window.open(`${$base}/temporales/${data}`, '_blank')
  } catch (e) {
  }
  finally {
    appStore.loading(false)
  }
}

// ^Metodo limpia modulos seleccionados y lista de modulos
const onLimpiar = () => {
  items.value = []
  selected.value = []
}
</script>

<template>
  <div>
    <AppPlantilla>
      <template #botones>
        <GenerarBoton @procesar="onGenerar" />
        <ExcelBoton @procesar="onExcel" />
        <RegistrarBoton @procesar="onRegistrar" />
        <LimpiarBoton @procesar="onLimpiar" />
      </template>
      <template #contenido>
        <VRow>
          <VCol cols="12">
            <VCard title="Lista de asesoras">
              <VCardText>
                <VDataTable
                  v-model="selected"
                  :headers="headers"
                  :items="items"
                  fixed-header
                  height="400"
                  :items-per-page="-1"
                  show-select
                  item-value="nume_docu"
                >
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

