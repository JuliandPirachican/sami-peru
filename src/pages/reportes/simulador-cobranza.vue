<!-- eslint-disable camelcase -->
<script setup>
import { useAppStore } from '@/stores/app';
import debounce from 'lodash.debounce';
import { VDataTable } from 'vuetify/labs/VDataTable';

definePage({
  meta: {
    action: 'colombia/repo_come_simu_cobr',
    subject: 'colombia/repo_come_simu_cobr',
  },
})

const appStore = useAppStore()

const formulario = ref({
  campana: null,
  zona: null,
  objetivo21: 88,
  objetivo31: 92,
})

const objetivo21Options = ref([])
const objetivo31Options = ref([])

const headersGlobal = computed(() => {
  return [
    {
      title: 'Sector',
      key: 'codi_sect',
    },
    {
      title: 'Valor',
      key: 'valo_docu',
    },
    {
      title: 'Obj. max. saldo 21d',
      key: 'obje_21di',
    },
    {
      title: 'Obj. max. saldo 31d',
      key: 'obje_31di',
    },
    {
      title: 'Saldo 21 días',
      key: 'sald_21di',
    },
    {
      title: '% 21 días',
      key: 'porc_21di',
    },
    {
      title: 'Saldo 31 días',
      key: 'sald_31di',
    },
    {
      title: '% 31 días',
      key: 'porc_31di',
    },
    {
      title: 'Saldo actual',
      key: 'sald_actu',
    },
    {
      title: '% Actual',
      key: 'porc_actu',
    },
    {
      title: 'Simulador',
      key: 'simu_21di',
    },
    {
      title: '% Simulador',
      key: 'porc_simu_21di',
    },
    {
      title: 'Falta cobrar 21d',
      key: 'falt_cobr_21di',
    },
    {
      title: 'Falta cobrar 31d',
      key: 'falt_cobr_31di',
    },
  ]
})

const headersDetalle = computed(() => {
  return [
    {
      title: 'Sector',
      key: 'codi_sect',
    
    },
    {
      title: 'Código',
      key: 'codi_terc',
    },
    {
      title: 'Nro ident.',
      key: 'nume_iden',
    },
    {
      title: 'Nombre(s) y apellido(s)',
      key: 'nomb_terc',
    },
    {
      title: 'Teléfono',
      key: 'tele_terc',
    },
    {
      title: 'Documento',
      key: 'nume_docu',
    },
    {
      title: 'Campaña',
      key: 'codi_camp',
    },
    {
      title: 'Valor',
      key: 'valo_docu',
    },
    {
      title: 'Valor facturado',
      key: 'valo_fact',
    },
    {
      title: 'Percepcion',
      key: 'impu_perc',
    },
    {
      title: 'Saldo 21di',
      key: 'sald_21di',
    },
    {
      title: 'Saldo 31di',
      key: 'sald_31di',
    },
    {
      title: 'Saldo actual',
      key: 'sald_actu',
    },
    {
      title: 'Simulador',
      key: 'simu_21di',
    },
  ]
})

const itemsGlobal = ref([])
const itemsDetalle = ref([])

const campanaOptions = ref([])
const errorCampana = ref(false)
const errorMensajeCampana = ref('')

const zonaOptions = ref([])
const errorZona = ref(false)
const errorMensajeZona = ref('')

onMounted(async () => {
  appStore.titulo(`Reportes / Simulador cobranza`)
  await obtenerObjetivo()
  await obtenerCampana()
  await obtenerZona()
})

const obtenerObjetivo = async () => {
  for (let index = 70; index <= 100; index++) { 
    objetivo21Options.value.push({
      id: index,
      text: index,
    })
    objetivo31Options.value.push({
      id: index,
      text: index,
    })
  }
}

const obtenerCampana = async () => {
  try {
    appStore.mensaje('Obteniendo campaña')
    appStore.loading(true)

    const { data } = await $api(`/api/comun/v1/campanas`, {
      method: "GET",
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
      console.log(e.response._data)
    }
  }
  finally {
    appStore.loading(false)
  }
}

const obtenerZona = async () => {
  try {
    appStore.mensaje('Obteniendo zona')
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
      console.log(e.response._data)
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

    itemsGlobal.value = []
    itemsDetalle.value = []

    const { data } = await $api(`/api/sami/v1/reportes/saldo-cartera`, {
      method: "GET",
      query: {
        campana: (formulario.value.campana === null) ? '' : formulario.value.campana,
        zona: (formulario.value.zona === null) ? '' : formulario.value.zona,
        objetivo21: formulario.value.objetivo21,
        objetivo31: formulario.value.objetivo31,
      },
    })

    itemsGlobal.value = data.global
    itemsDetalle.value = data.detalle
    
  } catch (error) {
    const { data } = error.response._data    
    if (typeof data != "undefined") {
      for (var key in data)
      {
        if (key == 'campana') {
          errorCampana.value = true
          errorMensajeCampana.value = data[key]
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

const onLimpiar= async () => {
  formulario.value = {
    campana: null,
    zona: null,
    objetivo21: 88,
    objetivo31: 92,
  }
  itemsGlobal.value = []
  itemsDetalle.value = []
}

const onExcel = async () => {
  try {
    appStore.mensaje('Generando archivo')
    appStore.loading(true)

    const { data } = await $api(`/api/sami/v1/reportes/saldo-cartera/excel`, {
      method: "POST",
      body: {
        cabeceraGlobal: headersGlobal.value,
        dataGlobal: itemsGlobal.value,
        cabeceraDetalle: headersDetalle.value,
        dataDetalle: itemsDetalle.value,
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
  errorZona.value = false
  errorMensajeZona.value = ''
}

const updateQueryBuscar = debounce(item => {
  actualizarItem(item)
}, 500)

const actualizarItem = item => {
  const indexItem = itemsDetalle.value.indexOf(item)
  const data = itemsDetalle.value[indexItem]

  if(item.simu_21di === '' || parseInt(item.simu_21di) < 0)
  {
    data.simu_21di = '0.00'
  }

  const newValue = parseFloat(data.simu_21di_copi - data.simu_21di).toFixed(2)
  const codiSect = item.codi_sect

  const posicion = itemsGlobal.value.findIndex(e => e.codi_sect === codiSect)
  
  if (posicion !== -1) {
    const dataGlobal = itemsGlobal.value[posicion]
    let simu21di = dataGlobal.simu_21di
    let valoDocu = dataGlobal.valo_docu
    let obje21di = dataGlobal.obje_21di
    simu21di = parseFloat(simu21di).toFixed(2)
    simu21di -= newValue
    valoDocu = parseFloat(valoDocu).toFixed(2)
    let porcSimu21di = '0.00'
    if (valoDocu !== 0) {
      porcSimu21di = 100 - 100 * (parseFloat(simu21di) / parseFloat(valoDocu))
      porcSimu21di = parseFloat(porcSimu21di).toFixed(2)
    }
    obje21di = parseFloat(obje21di).toFixed(2)
    let faltCobr21di = obje21di - simu21di
    faltCobr21di = parseFloat(faltCobr21di).toFixed(2)
    if (faltCobr21di >= 0) {
      faltCobr21di = '0.00'
    }
    dataGlobal.falt_cobr_21di = faltCobr21di
    dataGlobal.porc_simu_21di = porcSimu21di
    dataGlobal.simu_21di = simu21di

    data.simu_21di_copi = data.simu_21di
  }
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
            <VCard title="Buscar saldo cartera">
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
            <VCard title="Lista cartera">
              <VCardText>
                <VRow justify="space-between">
                  <VCol
                    cols="12"
                    md="4"
                  >
                    <AppSelect
                      v-model="formulario.objetivo21"
                      :items="objetivo21Options"
                      label="Objetivo 21 días"
                      placeholder="Seleccionar objetivo"
                      item-title="text"
                      item-value="id"
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="4"
                  >
                    <AppSelect
                      v-model="formulario.objetivo31"
                      :items="objetivo31Options"
                      label="Objetivo 31 días"
                      placeholder="Seleccionar objetivo"
                      item-title="text"
                      item-value="id"
                    />
                  </VCol>
                </VRow>
              </VCardText>
              <VCardText>
                <VDataTable
                  :headers="headersGlobal"
                  :items="itemsGlobal"
                  :items-per-page="-1"
                  class="text-no-wrap"
                  
                  fixed-header
                  height="250"
                >
                  <template #item.valo_docu="{ item }">
                    <VChip color="secondary">
                      S/.{{ item.valo_docu }}
                    </VChip>
                  </template>
                  <template #item.obje_21di="{ item }">
                    <VChip color="secondary">
                      S/.{{ item.obje_21di }}
                    </VChip>
                  </template>
                  <template #item.obje_31di="{ item }">
                    <VChip color="secondary">
                      S/.{{ item.obje_31di }}
                    </VChip>
                  </template>
                  <template #item.sald_21di="{ item }">
                    <VChip color="error">
                      S/.{{ item.sald_21di }}
                    </VChip>
                  </template>
                  <template #item.porc_21di="{ item }">
                    <VChip color="error">
                      {{ item.porc_21di }}%
                    </VChip>
                  </template>
                  <template #item.sald_31di="{ item }">
                    <VChip color="error">
                      S/.{{ item.sald_31di }}
                    </VChip>
                  </template>
                  <template #item.porc_31di="{ item }">
                    <VChip color="error">
                      {{ item.porc_31di }}%
                    </VChip>
                  </template>
                  <template #item.sald_actu="{ item }">
                    <VChip color="error">
                      S/.{{ item.sald_actu }}
                    </VChip>
                  </template>
                  <template #item.porc_actu="{ item }">
                    <VChip color="error">
                      {{ item.porc_actu }}%
                    </VChip>
                  </template>
                  <template #item.simu_21di="{ item }">
                    <VChip color="success">
                      {{ item.simu_21di }}%
                    </VChip>
                  </template>
                  <template #item.porc_simu_21di="{ item }">
                    <VChip color="success">
                      {{ item.porc_simu_21di }}%
                    </VChip>
                  </template>
                  <template #item.falt_cobr_21di="{ item }">
                    <VChip color="success">
                      S/.{{ item.falt_cobr_21di }}
                    </VChip>
                  </template>
                  <template #item.falt_cobr_31di="{ item }">
                    <VChip color="success">
                      S/.{{ item.falt_cobr_31di }}
                    </VChip>
                  </template>
                  <template #bottom />
                </VDataTable>
              </VCardText>
              
              <VCardText>
                <VDataTable
                  :headers="headersDetalle"
                  :items="itemsDetalle"
                  :items-per-page="-1"
                  class="text-no-wrap"
                  
                  fixed-header
                  height="250"
                >
                  <template #item.simu_21di="{ item }">
                    <AppTextField
                      v-model="item.simu_21di"
                      placeholder=""
                      flat
                      base-color="success"
                      @update:model-value="updateQueryBuscar(item)"
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
