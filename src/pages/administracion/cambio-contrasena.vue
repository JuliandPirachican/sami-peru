<script setup>
import { useAppStore } from '@/stores/app';
import { style_iframe } from '@/stores/style-iframe';

definePage({
  meta: {
    action: 'colombia/admi_camb_cont',
    subject: 'colombia/admi_camb_cont',
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

/**
 * funcion que permite loguear dentro del iframe 
 * usando localstorage
 */
const modi_frame= ()=>{
  //obtiene data de localstorage
  let session_iframe=localStorage.getItem("session_iframe");
  let decrypt_info=atob(session_iframe)
  let decode_info=JSON.parse(decrypt_info);
  //navega en el DOM buscando un iframe para poder acceder a los campos
  let iframe=document.querySelector("iframe");
  let iframedom=iframe.contentWindow.document;
  let input_usua=iframedom.getElementById("usua");//input usuario
  input_usua.value=decode_info.codi_usua;
  let input_pass=iframedom.getElementsByTagName("input")[1]; // input contraseña
  input_pass.value=decode_info.pass_inca;
  let button_submit=iframedom.getElementsByTagName("button")[0];//button submit form
  button_submit.click();//clic para iniciar sesion
};


// ^Metodo limpia modulos seleccionados y lista de modulos 
const onLimpiar = () => {
  items.value = []
  selected.value = []
}



onMounted(() => {
  appStore.titulo(`Administración / Permiso zonal`)
  onGenerar()
  style_iframe()
})
</script>

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
            <VCard title="Cambio de clave">
              <VCardText>
                <v-card>
                  <iframe id="iframe_option" ref="iframe_camb_clav" @load="modi_frame" src="https://intranet2col.azzorti.co/desarrollo/cgis/actu_clav_usua.php" frameborder="0"></iframe>

                </v-card>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </template>
    </AppPlantilla>
  </div>
</template>
<style>
#iframe_option{
  width: 100%;
}
</style>
