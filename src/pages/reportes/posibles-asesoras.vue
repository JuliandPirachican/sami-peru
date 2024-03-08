<script setup>
import { useAppStore } from '@/stores/app'
import { VDataTable } from 'vuetify/labs/VDataTable'

definePage({
  meta: {
    action: 'peru/repo_come_posi_ases',
    subject: 'peru/repo_come_posi_ases',
  },
})

const userData = JSON.parse(localStorage.getItem('userData'))
const appStore = useAppStore()

const formulario = ref({
  campana: null,
})

const headers = computed(() => {
  return [
    {
      title: 'Zona',
      key: 'codi_zona',
      sortable: true,
    },
    {
      title: 'Sector',
      key: 'codi_sect',
      sortable: true,
    },
    {
      title: 'Nro ident. referente',
      key: 'nume_iden_refe',
      sortable: true,
    },
    {
      title: 'Nombre(s) y apellido(s) referente',
      key: 'nomb_terc_refe',
      sortable: true,
    },
    {
      title: 'Telefono referente',
      key: 'tele_terc',
      sortable: true,
    },
    {
      title: 'Nro ident. referido',
      key: 'nume_iden',
      sortable: true,
    },
    {
      title: 'Nombre(s) y apellido(s) referido',
      key: 'nomb_terc',
      sortable: true,
    },
    {
      title: 'Departamento',
      key: 'nomb_dpto',
      sortable: true,
    },
    {
      title: 'Provincia',
      key: 'nomb_ciud',
      sortable: true,
    },
    {
      title: 'Distrito',
      key: 'nomb_barr',
      sortable: true,
    },
    {
      title: 'Dirección',
      key: 'dire_terc',
      sortable: true,
    },
    {
      title: 'Estado',
      key: 'acti_esta',
      sortable: true,
    },
    {
      title: 'Usuario proceso',
      key: 'usua_modi',
      sortable: true,
    },
    {
      title: 'Fecha proceso',
      key: 'fech_modi',
      sortable: true,
    },
    {
      title: 'Usuario zona',
      key: 'usua_zona',
      sortable: true,
    },
    {
      title: 'Fecha zona',
      key: 'fech_zona',
      sortable: true,
    },
    {
      title: 'Medio contacto',
      key: 'nomb_medi',
      sortable: true,
    },
    {
      title: 'Teléfono',
      key: 'tele_ases',
      sortable: true,
    },
    {
      title: 'Correo electrónico',
      key: 'corr_ases',
      sortable: true,
    },
    {
      title: 'Campaña ingreso',
      key: 'camp_ingr',
      sortable: true,
    },
    {
      title: 'Observación',
      key: 'obse_zona',
      sortable: true,
    },
  ]
})

const items = ref([])

const campanaOptions = ref([])
const errorCampana = ref(false)
const errorMensajeCampana = ref('')

const loginData = JSON.parse(localStorage.getItem('login'))

onMounted(async () => {
  appStore.titulo(`Reportes / Posible asesora`)
  await obtenerCampana()
})

const obtenerCampana = async () => {
  try {
    appStore.mensaje('Obteniendo campaña')
    appStore.loading(true)


    const { data } = await $api(`/api/comun/v1/campanas/futuras`, {
      method: "get",
    })
    
    const itemCampana = data.data_glob.slice(0, 40)
    
    itemCampana.forEach(element => 
      campanaOptions.value.push({
        id: element.codi_camp,
        text: element.codi_camp,
      }),
    )
  } catch (e) {
    if(e.response !== undefined) {
      console.log(e.response.data)
    }
  }
  finally {
    appStore.loading(false)
  }
}


const onGenerar = async () => {
  try {
    appStore.mensaje('Obteniendo información')
    appStore.loading(true)
    limpiarValidacion()

    items.value = []

    const { data } = await $api(`/api/sami/v1/reportes/posible-asesora`, {
      method: "get",
      query: {
        campana: (formulario.value.campana === null) ? '' : formulario.value.campana,
      },
    })

    items.value = data.data_glob
    
  } catch (error) {
    const { data } = error.response._data    
    if (typeof data != "undefined") {
      for (var key in data)
      {
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

const onLimpiar= async () => {
  formulario.value = {
    campana: null,
  }
  items.value = []
}

const onExcel = async () => {
  try {
    appStore.mensaje('Generando archivo')
    appStore.loading(true)

    const { data } = await $api(`/api/sami/v1/reportes/posible-asesora/excel`, {
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

const limpiarValidacion = () => {
  errorCampana.value = false
  errorMensajeCampana.value = ''
}
</script>

<template>
  <div>
    <AppPlantilla>
      <template #botones>
        <GenerarBoton @procesar="onGenerar" />
        <ExcelBoton @procesar="onExcel" />
        <LimpiarBoton @procesar="onLimpiar" />
      </template>
      <template #contenido>
        <VRow>
          <VCol cols="12">
            <VCard title="Buscar posible asesora">
              <VCardText>
                <VRow justify="space-between">
                  <VCol
                    cols="12"
                    md="4"
                  >
                    <AppSelect
                      v-model="formulario.campana"
                      :items="campanaOptions"
                      label="Campaña"
                      placeholder="Seleccionar campaña"
                      item-title="text"
                      item-value="id"
                      :error="errorCampana"
                      :error-messages="errorMensajeCampana"
                    />
                  </VCol>
                </VRow>
              </VCardText>
            </VCard>
          </VCol>

          <VCol cols="12">
            <VCard title="Lista posible asesora">
              <VCardText>
                <VDataTable
                  :headers="headers"
                  :items="items"
                  :items-per-page="-1"
                  class="text-no-wrap"
                  no-data-text=""
                  fixed-header="true"
                  height="400"
                >
                  <template #item.acti_esta="{ item }">
                    <div v-if="item.acti_esta != ''">
                      <VChip
                        v-if="item.acti_esta.toLowerCase() === 'incorporada(o)'"
                        color="success"
                      >
                        {{ item.acti_esta }}
                      </VChip>
                      <VChip
                        v-else-if="item.usua_zona === ''"
                        color="error"
                      >
                        {{ item.acti_esta }}
                      </VChip>
                      <div v-else>
                        {{ item.acti_esta }}
                      </div>
                    </div>
                    <div v-else />
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
