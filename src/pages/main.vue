<script setup>
import { useAppStore } from '@/stores/app'

const variableData = ref([
  {
    icono: 'tabler-calendar',
    color: 'secondary',
    titulo: 'Campaña',
    valor: '000000',
    Subtitulo1: 'Fecha inicio',
    valor1: '00/00/0000',
    Subtitulo2: 'Fecha fin',
    valor2: '00/00/0000',
  },
  {
    icono: 'tabler-alert-triangle',
    color: 'warning',
    titulo: 'Cobranza 21 días',
    valor: '0.00%',
    Subtitulo1: 'Venta',
    valor1: 'S/ 0.00',
    Subtitulo2: 'Saldo',
    valor2: 'S/ 0.00',
  },
  {
    icono: 'tabler-users',
    color: 'error',
    titulo: 'Actividad',
    valor: '0.00%',
    Subtitulo1: '',
    valor1: '',
    Subtitulo2: '',
    valor2: '',
  },
  {
    icono: 'tabler-user-plus',
    color: 'info',
    titulo: 'Capitalización',
    valor: '0',
    Subtitulo1: '',
    valor1: '',
    Subtitulo2: '',
    valor2: '',
  },
])

const cierreData = ref([
  {
    titulo: 'Mi cierre - Incorporación',
    objetivo: '0',
    facturado: '0',
    pendiente: '0',
    valor1: '0.00',
    valor2: '0.00',
    color1: 'error',
    color2: 'secondary',
  },
  {
    titulo: 'Mi cierre - Retención',
    objetivo: '0',
    facturado: '0',
    pendiente: '0',
    valor1: '0.00',
    valor2: '0.00',
    color1: 'success',
    color2: 'secondary',
  },
  {
    titulo: 'Mi cierre - Pedidos Totales',
    objetivo: '0',
    facturado: '0',
    pendiente: '0',
    valor1: '0.00',
    valor2: '0.00',
    color1: 'primary',
    color2: 'secondary',
  },
])

definePage({
  meta: {
    action: 'peru/index',
    subject: 'peru/index',
  },
})

const appStore = useAppStore()
const userData = JSON.parse(localStorage.getItem('userData'))
const loginData = JSON.parse(localStorage.getItem('login'))

const formulario = ref({
  campana: null,
})

const campanaOptions = ref([])
const errorCampana = ref(false)
const errorMensajeCampana = ref('')

onMounted(async () => {
  appStore.titulo(`Dashboard / Ventas`)
  await obtenerCampana()
  await onGenerar()
})

const obtenerCampana = async () => {
  try {
    appStore.mensaje('Obteniendo campañas')
    appStore.loading(true)

    const { data } = await $api(`/api/comun/v1/campanas`, {
      method: "get",
    })
    
    const itemCampana = data.data_glob
    
    itemCampana.forEach(element => 
      campanaOptions.value.push({
        id: element.codi_camp,
        text: element.codi_camp,
      }),
    )
    formulario.value.campana = itemCampana[0].codi_camp
  } catch (e) {
    if(e.response !== undefined) {
      console.log(e.response._data)
    }
  }
  finally {
    appStore.loading(false)
  }
}

const onLimpiar = () => {
  variableData.value = [
    {
      icono: 'tabler-calendar',
      color: 'secondary',
      titulo: 'Campaña',
      valor: '000000',
      Subtitulo1: 'Fecha inicio',
      valor1: '00/00/0000',
      Subtitulo2: 'Fecha fin',
      valor2: '00/00/0000',
    },
    {
      icono: 'tabler-alert-triangle',
      color: 'warning',
      titulo: 'Cobranza 21 días',
      valor: '0.00%',
      Subtitulo1: 'Venta',
      valor1: 'S/ 0.00',
      Subtitulo2: 'Saldo',
      valor2: 'S/ 0.00',
    },
    {
      icono: 'tabler-users',
      color: 'error',
      titulo: 'Actividad',
      valor: '0.00%',
      Subtitulo1: '',
      valor1: '',
      Subtitulo2: '',
      valor2: '',
    },
    {
      icono: 'tabler-user-plus',
      color: 'info',
      titulo: 'Capitalización',
      valor: '0',
      Subtitulo1: '',
      valor1: '',
      Subtitulo2: '',
      valor2: '',
    },
  ]

  cierreData.value = [
    {
      titulo: 'Mi cierre - Incorporación',
      objetivo: '0',
      facturado: '0',
      pendiente: '0',
      valor1: '0.00',
      valor2: '0.00',
      color1: 'error',
      color2: 'secondary',
    },
    {
      titulo: 'Mi cierre - Retención',
      objetivo: '0',
      facturado: '0',
      pendiente: '0',
      valor1: '0.00',
      valor2: '0.00',
      color1: 'success',
      color2: 'secondary',
    },
    {
      titulo: 'Mi cierre - Pedidos Totales',
      objetivo: '0',
      facturado: '0',
      pendiente: '0',
      valor1: '0.00',
      valor2: '0.00',
      color1: 'primary',
      color2: 'secondary',
    },
  ]
}

const onGenerar = async () => {
  try {
    appStore.mensaje('Obteniendo información')
    appStore.loading(true)
    onLimpiar()
    
    const { data } = await $api(`/api/sami/v1/dashboard`, {
      method: "get",
      query: {
        campana: formulario.value.campana,
      },
    })
    
    variableData.value = data.variable
    cierreData.value = data.cierre
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
</script>

<template>
  <div>
    <VRow>
      <VCol cols="12">
        <VCard title="Buscar Dashboard">
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
                  @update:model-value="onGenerar"
                />
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
    <VRow>
      <VCol
        v-for="(data, index) in variableData"
        :key="index"
        cols="12"
        md="3"
        sm="6"
      >
        <div>
          <VCard 
            class="logistics-card-statistics"
            :style="{ 'border-block-end': `2px solid rgba(var(--v-theme-${data.color}))` }"
          >
            <VCardText>
              <div class="d-flex align-center gap-x-4 mb-2">
                <VAvatar
                  variant="tonal"
                  :color="data.color"
                  rounded
                >
                  <VIcon
                    :icon="data.icono"
                    size="28"
                  />
                </VAvatar>
                <h5 class="text-h4 font-weight-medium">
                  {{ data.valor }}
                </h5>
              </div>
              <div class="text-h6 font-weight-medium mb-2">
                {{ data.titulo }}
              </div>
             
              <div
                v-if="data.Subtitulo1 != ''"
                class="d-flex gap-x-2"
              >
                <span class="font-weight-medium text-disabled"> 
                  {{ data.Subtitulo1 }}
                </span>
                <span class="text-disabled">{{ data.valor1 }}</span>
              </div>

              <div
                v-if="data.Subtitulo2 != ''"
                class="d-flex gap-x-2"
              >
                <span class="font-weight-medium text-disabled"> 
                  {{ data.Subtitulo2 }}
                </span>
                <span class="text-disabled">{{ data.valor2 }}</span>
              </div>
            </VCardText>
          </VCard>
        </div>
      </VCol>
    </VRow>
    <VRow>
      <VCol
        v-for="(data, index) in cierreData"
        :key="index"
        cols="12"
        md="4"
        sm="6"
      >
        <VCard :title="data.titulo">
          <VCardText class="mt-n6">
            <VRow>
              <VCol
                cols="12"
                class="d-flex justify-space-around my-4"
              >
                <VProgressCircular
                  v-model="data.valor1"
                  :size="100"
                  class="me-4"
                  :color="data.color1"
                >
                  <span class="text-body-1 text-high-emphasis font-weight-medium">
                    {{ data.valor1 }}%
                  </span>
                </VProgressCircular>
                <VProgressCircular
                  v-model="data.valor2"
                  :size="100"
                  class="me-4"
                  :color="data.color2"
                >
                  <span class="text-body-1 text-high-emphasis font-weight-medium">
                    {{ data.valor2 }}%
                  </span>
                </VProgressCircular>
              </VCol>
            </VRow>
            <VRow>
              <VCol cols="4">
                <div class="d-flex flex-column">
                  <span class="text-h5 font-weight-medium text-center">Objetivo</span>
                  <span class="text-sm text-center">
                    {{ data.objetivo }}
                  </span>
                </div>
              </VCol>
              <VDivider
                vertical
                inset
                length="95"
              />
              <VCol cols="4">
                <div class="d-flex flex-column">
                  <span class="text-h5 font-weight-medium text-center">Facturado</span>
                  <span class="text-sm text-center">
                    {{ data.facturado }}
                  </span>
                </div>
              </VCol>
              <VDivider
                vertical
                inset
                length="95"
              />
              <VCol cols="4">
                <div class="d-flex flex-column">
                  <span class="text-h5 font-weight-medium text-center">Pendiente</span>
                  <span class="text-sm text-center">
                    {{ data.pendiente }}
                  </span>
                </div>
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>
