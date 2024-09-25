<!-- eslint-disable camelcase -->

<script setup>
import { useAppStore } from '@/stores/app';
import { EncryptStorage } from 'encrypt-storage';
import { useDisplay } from 'vuetify';
import { VDataTable } from 'vuetify/labs/VDataTable';

definePage({
  meta: {
    action: 'colombia/repo_come_comp_canj_devo',
    subject: 'colombia/repo_come_comp_canj_devo',
  },
})

const encryptStorage = new EncryptStorage('AZZORTI-SAMI', {
  storageType: 'localStorage',
})

const { mobile } = useDisplay()
const userData = encryptStorage.getItem('userData')
const appStore = useAppStore()
const isOpen = ref(false)   
const titulo = ref('')
const cantidad = ref('')

const formulario = ref({
  campana: null,
  zona: null,
})

const itemsDetalle = ref([])

const itemsSubDetalle = ref([])

const headersGlobal = computed(() => {
  return [
    { title: '', key: 'acciones', sortable: false, width: '10px' },
    { key: 'nomb_conc', title: 'Concepto',   align: 'left' },
    { key: 'cant_conc', title: 'Monto COP',   align: 'center' },
    { key: 'porc_conc', title: 'Porcentaje', align: 'center' },
  ]
})

const headersResumen = computed(() => {
  return [
    { key: 'nume_pedi', title: 'Pedidos totales',        align: 'center' },
    { key: 'nume_canj', title: 'Asesoras C&D',           align: 'center' },
    { key: 'porc_canj', title: '% Asesoras sin reclamo', align: 'center' },
  ]
})

const headersDetalle = [
  { key: 'codi_cort', title: 'Corte', sortable: false },
  { key: 'codi_area', title: 'Región', sortable: false },
  { key: 'codi_zona', title: 'Zona', sortable: false },
  { key: 'codi_sect', title: 'Sector', sortable: false },
  { key: 'nomb_vend', title: 'Lider', sortable: false },
  { key: 'vent_neta', title: 'Venta neta', sortable: false },
  { key: 'canj_devo', title: 'C&D Final', sortable: false },
  { key: 'porc_canj_devo', title: '% C&D Final', sortable: false },
]

const headersSubDetalle = computed(() => {
  return [
    { key: 'codi_terc', title: 'Código', sortable: true },
    { key: 'nume_iden', title: 'Nro ident.', sortable: true },
    { key: 'codi_sect', title: 'Sector', sortable: true },
    { key: 'nomb_terc', title: 'Nombre(s) y Apellido(s)', sortable: true },
    { key: 'nomb_line', title: 'Línea', sortable: true },
    { key: 'codi_prod', title: 'Cod. producto', sortable: true },
    { key: 'nomb_prod', title: 'Producto', sortable: true },
    { key: 'cant_prod', title: 'Cantidad', sortable: true },
    { key: 'prec_neto', title: 'Precio', sortable: true },
  ]
})

const totalVentaTotal = computed(() => {
  let total =  itemsDetalle.value.reduce((sum, value) => ( sum + parseFloat(value.vent_neta) ), 0)

  return parseFloat(total).toFixed(2)
})

const totalCanjeTotal = computed(() => {
  let total =  itemsDetalle.value.reduce((sum, value) => ( sum + parseFloat(value.canj_devo) ), 0)

  return parseFloat(total).toFixed(2)
})

const totalPorcentajeCanjeTotal = computed(() => {
  let total = 0
  let contador = 0
  itemsDetalle.value.forEach(function(e) {
    let porcentaje = parseFloat(e.porc_canj_devo)
    if (porcentaje > 0) {
      contador ++
      total = total + porcentaje
    }
  })

  if (total > 0 && contador > 0) {
    total = total / contador
  }
  
  return parseFloat(total).toFixed(2)
})

const itemsGlobal = ref([
  { nomb_conc: 'Venta neta', cant_conc: '0.00', porc_conc: '' },
  { nomb_conc: 'Devoluciones no incluidas en plan de carrera', cant_conc: '0.00', porc_conc: '', align: 'center' },
  { nomb_conc: 'Devoluciones incluidas en plan de carrera', cant_conc: '0.00', porc_conc: '0.00' },
  { nomb_conc: 'Cambios no refacturados por asesora que no pasa pedido', cant_conc: '0.00', porc_conc: '' },
  { nomb_conc: 'Cambios no refacturados por falta de stock', cant_conc: '0.00', porc_conc: '' },
  { nomb_conc: 'Cambios refacturados', cant_conc: '0.00', porc_conc: '' },
  { nomb_conc: 'Cambios solicitados', cant_conc: '0.00', porc_conc: '0.00' },
  { nomb_conc: 'Cambios + Devoluciones', cant_conc: '0.00', porc_conc: '0.00' },
  { nomb_conc: 'Cambios & Devoluciones finales', cant_conc: '0.00', porc_conc: '0.00' },
])

const itemsResumen = ref([
  { nume_pedi: '0', nume_canj: '0', porc_canj: '0.0' },
])

const campanaOptions = ref([])
const errorCampana = ref(false)
const errorMensajeCampana = ref('')

const zonaOptions = ref([])
const errorZona = ref(false)
const errorMensajeZona = ref('')

onMounted(async () => {
  appStore.titulo(`Reportes / Comportamiento C&D`)
  await obtenerCampana()
  await obtenerZona()
})

const obtenerCampana = async () => {
  try {
    appStore.mensaje('Obteniendo información')
    appStore.loading(true)

    const { data } = await $api(`/api/comun/v1/campanas`, {
      method: "get",
    })
    
    const itemCampana = data.data_glob.slice(0, 80)
    
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
    onLimpiar()
    limpiarValidacion()

    const { data } = await $api(`/api/sami/v1/reportes/comportamiento-cyd`, {
      method: "get",
      query: {
        campana: (formulario.value.campana === null) ? '' : formulario.value.campana,
        zona: (formulario.value.zona === null) ? '' : formulario.value.zona,
      },
    })
    
    data.data_glob ? itemsGlobal.value = data.data_glob : ''
    data.data_resu ? itemsResumen.value = data.data_resu : ''
    data.data_deta ? itemsDetalle.value = data.data_deta : ''

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
  itemsGlobal.value = [
    { nomb_conc: 'Venta neta', cant_conc: '0.00', porc_conc: '' },
    { nomb_conc: 'Devoluciones no incluidas en plan de carrera', cant_conc: '0.00', porc_conc: '', align: 'center' },
    { nomb_conc: 'Devoluciones incluidas en plan de carrera', cant_conc: '0.00', porc_conc: '0.00' },
    { nomb_conc: 'Cambios no refacturados por asesora que no pasa pedido', cant_conc: '0.00', porc_conc: '' },
    { nomb_conc: 'Cambios no refacturados por falta de stock', cant_conc: '0.00', porc_conc: '' },
    { nomb_conc: 'Cambios refacturados', cant_conc: '0.00', porc_conc: '' },
    { nomb_conc: 'Cambios solicitados', cant_conc: '0.00', porc_conc: '0.00' },
    { nomb_conc: 'Cambios + Devoluciones', cant_conc: '0.00', porc_conc: '0.00' },
    { nomb_conc: 'Cambios & Devoluciones finales', cant_conc: '0.00', porc_conc: '0.00' },
  ]

  itemsResumen.value = [
    { nume_pedi: '0', nume_canj: '0', porc_canj: '0.0' },
  ]
  itemsDetalle.value = []
  itemsSubDetalle.value = []
}

const onExcel = async () => {
  try {
    appStore.mensaje('Generando archivo')
    appStore.loading(true)

    const { data } = await $api( `/api/sami/v1/reportes/comportamiento-cyd/excel`, {
      method: "post",
      body: {
        data_glob: itemsGlobal.value,
        data_resu: itemsResumen.value,
        data: itemsDetalle.value,
      },
    })
    
    window.open(`${$base}/temporales/${data}`, '_blank')
  } catch (e) {
  }
  finally {
    appStore.loading(false)
  }
}

const onExcelDetalle = async () => {
  try {
    appStore.mensaje('Generando archivo')
    appStore.loading(true)

    const { data } = await $api(`/api/sami/v1/reportes/comportamiento-cyd/excelDetalle`, {
      method: "post",
      body: {
        data: itemsSubDetalle.value,
        titulo: titulo.value,
      },
    })

    window.open(`${$base}/temporales/${data}`, '_blank')
  } catch (e) {
  }
  finally {
    appStore.loading(false)
  }
} 

const onSeleccionar = async data => {
  titulo.value = data.nomb_conc
  cantidad.value = data.cant_conc

  try {
    appStore.mensaje('Generando archivo')
    appStore.loading(true)
    itemsSubDetalle.value = []
    
    const data = await $api(`/api/sami/v1/reportes/comportamiento-cyd/detalle`, {
      method: "get",
      query: {
        titulo: titulo.value,
        cantidad: cantidad.value,
      },
    })

    itemsSubDetalle.value = data.data.data_deta
    isOpen.value = true
  } catch (e) {
  }
  finally { 
    appStore.loading(false)
  }
}

const isAllowedAction = nombConc => {
  return (
    nombConc === 'Devoluciones no incluidas en plan de carrera' ||
      nombConc === 'Devoluciones incluidas en plan de carrera' ||
      nombConc === 'Cambios no refacturados por asesora que no pasa pedido' ||
      nombConc === 'Cambios refacturados' ||
      nombConc === 'Cambios + Devoluciones'
  )
}

const onClose = () => {
  isOpen.value = false
  itemsSubDetalle.value = []
}

const limpiarValidacion = () => {
  errorCampana.value = false
  errorMensajeCampana.value = ''
  errorZona.value = false
  errorMensajeZona.value = ''
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
            <VCard title="Buscar comportamiento">
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
            <VCard>
              <VCardText>
                <VDataTable
                  :headers="headersGlobal"
                  :items="itemsGlobal"
                  :items-per-page="-1"
                  class="text-no-wrap"
                  fixed-header
                  height="300"
                >
                  <template #top />

                  <template #item.acciones="{ item }">
                    <IconBtn 
                      v-if="isAllowedAction(item.nomb_conc)"
                      @click="onSeleccionar(item)"
                    >
                      <VIcon icon="tabler-search" />
                    </IconBtn>
                  </template>

                  <template #item.porc_conc="{ item }">
                    <div v-if="item.porc_conc != ''">
                      <div v-if="item.porc_conc!= '0.00'">
                        <VChip
                          v-if="parseFloat(item.porc_conc) >= 0 && parseFloat(item.porc_conc) <= 2"
                          color="success"
                        >
                          {{ item.porc_conc }}
                        </VChip>
                        <VChip
                          v-else-if="parseFloat(item.porc_conc) > 2 && parseFloat(item.porc_conc) <= 2.8"
                          color="warning"
                        >
                          {{ item.porc_conc }}
                        </VChip>
                        <VChip
                          v-else
                          color="error"
                        >
                          {{ item.porc_conc }}
                        </VChip>
                      </div>
                    </div>
                  </template>
                  <template #bottom />
                </VDataTable>
              </VCardText>
            </VCard>
          </VCol>

          <VCol cols="12">
            <VCard>
              <VCardText>
                <VDataTable
                  :headers="headersResumen"
                  :items="itemsResumen"
                  :items-per-page="-1"
                  class="text-no-wrap"
                  fixed-header
                  height="110"
                >
                  <template #bottom />
                </VDataTable>
              </VCardText>
            </VCard>
          </VCol>

          <VCol cols="12">
            <VCard>
              <VCardText>
                <VTable
                  height="400"
                  fixed-header
                  class="text-no-wrap"
                >
                  <thead>
                    <tr>
                      <th
                        v-for="head in headersDetalle"
                        :key="head.key" 
                        class="text-uppercase"
                      >
                        {{ head.title }}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="item in itemsDetalle"
                      :key="item.dessert"
                    >
                      <td>
                        {{ item.codi_cort }}
                      </td>
                      <td>
                        {{ item.codi_area }}
                      </td>
                      <td>
                        {{ item.codi_zona }}
                      </td>
                      <td>
                        {{ item.codi_sect }}
                      </td>
                      <td>
                        {{ item.nomb_vend }}
                      </td>
                      <td>
                        COP. {{ item.vent_neta }}
                      </td>
                      <td>
                        COP. {{ item.canj_devo }}
                      </td>
                      <td>
                        <div v-if="item.porc_canj_devo != ''">
                          <div v-if="item.porc_canj_devo!= '0.00'">
                            <VChip
                              v-if="parseFloat(item.porc_canj_devo) >= 0 && parseFloat(item.porc_canj_devo) <= 2"
                              color="success"
                            >
                              % {{ item.porc_canj_devo }}
                            </VChip>
                            <VChip
                              v-else-if="parseFloat(item.porc_canj_devo) > 2 && parseFloat(item.porc_canj_devo) <= 2.8"
                              color="warning"
                            >
                              % {{ item.porc_canj_devo }}
                            </VChip>
                            <VChip
                              v-else
                              color="error"
                            >
                              % {{ item.porc_canj_devo }}
                            </VChip>
                          </div>
                          <div v-else>
                            % {{ item.porc_canj_devo }}
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot v-if="itemsDetalle.length > 0">
                    <tr style="background-color: rgba(var(--v-theme-primary), var(--v-activated-opacity));">
                      <td colspan="5" />
                      <td><span class="text-body-1">{{ totalVentaTotal }}</span></td>
                      <td><span class="text-body-1">{{ totalCanjeTotal }}</span></td>
                      <td><span class="text-body-1">{{ totalPorcentajeCanjeTotal }}</span></td>
                    </tr>
                  </tfoot>
                </VTable>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </template>
    </AppPlantilla>
    
    <VDialog
      :fullscreen="(mobile) ? true : false"
      :max-width="(mobile) ? undefined : 1100"
      persistent
      :model-value="isOpen"
    >
      <VCard color="background">
        <VToolbar color="secondary">
          <VBtn
            v-if="mobile"
            icon
            color="default"
            :rounded="false"
            @click="onClose"
          >
            <VIcon icon="tabler-x" />
          </VBtn>
          <VToolbarTitle>
            {{ titulo }}
          </VToolbarTitle>
          <VSpacer />
          <VToolbarItems>
            <VMenu transition="slide-y-transition">
              <template #activator="{ props }">
                <VBtn
                  color="default"
                  v-bind="props"
                  :icon="mobile"
                >
                  <VIcon
                    v-if="mobile"
                    size="x-large"
                    icon="tabler-dots-vertical"
                  />
                  <span v-if="!mobile">ACCIONES</span>
                </VBtn>
              </template>
              <VList>
                <VListItem
                  link
                  @click="onExcelDetalle"
                >
                  <template #prepend>
                    <VIcon
                      size="20"
                      icon="tabler-file-export"
                      class="enter-icon text-disabled"
                    />
                  </template>
                  <VListItemTitle>
                    Exportar
                  </VListItemTitle>
                </VListItem>
              </VList>
            </VMenu>
            <VBtn
              v-if="!mobile"
              icon
              @click="onClose"
            >
              <VIcon icon="tabler-x" />
            </VBtn>
          </VToolbarItems>
        </VToolbar>
        <VDataTable
          :headers="headersSubDetalle"
          :items="itemsSubDetalle"
          :items-per-page="-1"
          class="text-no-wrap"
          fixed-header
          :height="(!mobile)? (itemsSubDetalle.length > 15) ? 400 : null: null"
        >
          <template #bottom />
        </VDataTable>
      </VCard>
    </VDialog>
  </div>
</template>
