<script setup>
import { useAppStore } from '@/stores/app';

definePage({
  meta: {
    action: 'colombia/admi_perm_zona',
    subject: 'colombia/admi_perm_zona',
  },
})

// *Declaracion de variables
const appStore = useAppStore()

const headers = [
  {
    title: 'Codigo',
    key: 'codi_prog',
  },
  {
    title: 'Programa',
    key: 'nomb_prog',
  },
  {
    title: 'Ruta',
    key: 'ruta_prog',
  },
]

const selected = ref([])
const items = ref([])

// *Metodos
// ^Metodo generar lista de modulos y auto selecciona modulos ya asignados al perfil gerente de zona
const onGenerar = async () => {
  try {
    onLimpiar()
    appStore.mensaje('Obteniendo información')
    appStore.loading(true)

    const response = await $api(`/api/sami/v1/administracion/permisos`, {
      method: "get",
    })

    items.value = response.data.data_glob

    const programas = response.data.data_usua

    nextTick(() => {
      for (let a = 0; a < programas.length; a += 1) {
        for (let b = 0; b < items.value.length; b += 1) {
          if (programas[a].codi_prog === items.value[b].codi_prog) {
            selected.value.push(items.value[b].codi_prog)
          }
        }
      }
    })
  } catch (e) {
    if(e.response !== undefined) {
      console.log(e.response.data)
    }
  }
  finally {
    appStore.loading(false)
  }
}

// ^Metodo registrar modulos al perfil gerente de zona
const onRegistrar = async () => {
  if(selected.value.length == 0) {
    appStore.mensajeSnackbar('No a seleccionado ningun programa.')
    appStore.color("error")
    appStore.snackbar(true)
  } else {
    try {
      appStore.mensaje('Generando proceso')
      appStore.loading(true)
 
      const response = await $api(`/api/sami/v1/administracion/permisos`, {
        method: "POST",
        body: {
          programas: JSON.stringify(selected.value),
        },
      })

      let mensaje = response.message
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

// ^Metodo limpia modulos seleccionados y lista de modulos 
const onLimpiar = () => {
  items.value = []
  selected.value = []
}

onMounted(() => {
  appStore.titulo(`Administración / Permiso zonal`)
  onGenerar()
})
var x=getElementByClass("x-panel-header");
console.log(x)
</script>
<style lang="scss">

</style>

<template>
  <div>
    <AppPlantilla>
      <template #botones>
        <GenerarBoton @procesar="onGenerar" />
        <RegistrarBoton @procesar="onRegistrar" />
        <LimpiarBoton @procesar="onLimpiar" />
      </template>
      <template #contenido>
        <VRow>
          <VCol cols="12">
            <VCard title="Lista de programas">
              <VCardText>
                <!-- <VDataTable
                  v-model="selected"
                  :headers="headers"
                  :items="items"
                  fixed-header
                  height="400"
                  :items-per-page="-1"
                  show-select
                  item-value="codi_prog"
                >
                  <template #bottom />
                </VDataTable> -->
                <v-card>
                  <iframe src="https://intranet2col.azzorti.co/desarrollo/cgis/actu_clav_usua.php" frameborder="0"></iframe>

                </v-card>
                <v-dialog eager v-model="editBoardDialog">
                  <v-card>
                    <!-- HERE -->
                    <iframe src="https://intranet2col.azzorti.co/desarrollo/cgis/actu_clav_usua.php" frameborder="0"></iframe>
                  </v-card>
                </v-dialog>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </template>
    </AppPlantilla>
  </div>
</template>
