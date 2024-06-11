<!-- eslint-disable camelcase -->
<script setup>
import { useAppStore } from '@/stores/app';
import { useDisplay } from 'vuetify';
import { VDataTable } from 'vuetify/labs/VDataTable';

definePage({
  meta: {
    action: 'colombia/repo_come_list_ases',
    subject: 'colombia/repo_come_list_ases',
  },
})

const { mobile } = useDisplay()
const appStore = useAppStore()

const rowsPerPage = ref(100)
const currentPage = ref(1)

const formulario = ref({
  campana: null,
  zona: null,
})

const headersGlobal = computed(() => {
  return [
    { title: 'Región', key: 'codi_area' },
    { title: 'Zona', key: 'codi_zona' },
    { title: 'Sector', key: 'codi_sect' },
    { title: 'Act. inic.', key: 'acti_inic' },
    { title: 'Ingr.', key: 'tota_ingr' },
    { title: 'Reing.', key: 'tota_rein' },
    { title: 'Reco.', key: 'tota_reco' },
    { title: 'Egre.', key: 'tota_egre' },
    { title: 'Act. fin.', key: 'acti_fina' },
    { title: 'Posi. rein.', key: 'posi_rein' },
    { title: 'Capi.', key: 'tota_capi' },
    { title: 'Pedi. reten.', key: 'pedi_rete' },
    { title: '% Acti.', key: 'porc_acti' },
    { title: 'Pedi. total', key: 'nume_pedi' },
    { title: 'Vta. publ.', key: 'vent_publ' },
    { title: 'PPP Publ.', key: 'pppp_publ' },
    { title: 'Vta. Fact.', key: 'tota_fact' },
    { title: 'PPP Fact.', key: 'pppp_fact' },
    { title: 'Faltante', key: 'tota_falt' },
    { title: '% Faltante', key: 'porc_falt' },
    { title: 'Vta. Linea', key: 'tota_line' },
    { title: 'PPP Linea', key: 'tota_pedi' },
    { title: 'Vta. Rece.', key: 'vent_rece' },
    { title: 'PPP Rece.', key: 'pppp_rece' },
    { title: 'Unid', key: 'tota_unid' },
    { title: 'UPP', key: 'tota_uppp' },
    { title: `S/. Unid.`, key: 'mont_unid' },
    { title: 'Peg21', key: 'posi_eg21' },
    { title: 'Peg42', key: 'posi_eg42' },
    { title: 'Peg63', key: 'posi_egre' },
    { title: 'Ret. peg21', key: 'rete_pe21' },
    { title: '% Ret. peg21', key: 'porc_re21' },
    { title: 'Ret. peg42', key: 'rete_pe42' },
    { title: '% Ret. peg42', key: 'porc_re42' },
    { title: 'Ret. peg63', key: 'rete_pe63' },
    { title: '% Ret. peg63', key: 'porc_re63' },
  ]
})

const headersDetalleTotal = [
  {
    title: 'Zona',
    key: 'codi_zona',
  },
  {
    title: 'Sector',
    key: 'codi_sect',
  },
  {
    title: 'Nro ident.',
    key: 'nume_iden',
  },
  {
    title: 'Nombre(s) y apellido(s)',
    key: 'nomb_clie',
  },
  {
    title: 'Cumpleaños',
    key: 'fech_naci',
  },
  {
    title: 'Distrito',
    key: 'nomb_barr',
  },
  {
    title: 'Dirección',
    key: 'dire_terc',
  },
  {
    title: 'Teléfono 1',
    key: 'tele_ter1',
  },
  {
    title: 'Teléfono 2',
    key: 'tele_ter2',
  },
  {
    title: 'Status',
    key: 'tipo_clie',
  },
  {
    title: 'Cupo',
    key: 'cupo_cred',
  },
  {
    title: 'Saldo',
    key: 'sald_docu',
  },
  {
    title: 'Camp. ingr.',
    key: 'camp_ingr',
  },
  {
    title: 'Ult. camp1',
    key: 'codi_camp_1',
  },
  {
    title: 'Ptos azzo. ult. camp1',
    key: 'tota_publ_1',
  },
  {
    title: 'Fact. ult. camp1',
    key: 'tota_fact_1',
  },
  {
    title: 'Devo. ult. camp1',
    key: 'tota_devo_1',
  },
  {
    title: 'Ult. camp2',
    key: 'codi_camp_2',
  },
  {
    title: 'Ptos azzo. ult. camp2',
    key: 'tota_publ_2',
  },
  {
    title: 'Fact. ult. camp2',
    key: 'tota_fact_2',
  },
  {
    title: 'Devo. ult. camp2',
    key: 'tota_devo_2',
  },
  {
    title: 'Ult. camp3',
    key: 'codi_camp_3',
  },
  {
    title: 'Ptos azzo. ult. camp3',
    key: 'tota_publ_3',
  },
  {
    title: 'Fact. ult. camp3',
    key: 'tota_fact_3',
  },
  {
    title: 'Devo. ult. camp3',
    key: 'tota_devo_3',
  },
  {
    title: 'Ult. camp4',
    key: 'codi_camp_4',
  },
  {
    title: 'Ptos azzo. ult. camp4',
    key: 'tota_publ_4',
  },
  {
    title: 'Fact. ult. camp4',
    key: 'tota_fact_4',
  },
  {
    title: 'Devo. ult. camp4',
    key: 'tota_devo_4',
  },
  {
    title: 'Estado pedido',
    key: 'esta_pedi',
  },
  {
    title: 'Gemma',
    key: 'clie_gemm',
  },
  {
    title: 'Nivel',
    key: 'nive_gemm',
  },
  {
    title: 'Creciendo con azzorti',
    key: 'desc_segm',
  },
]

const selectedColumna = ref([
  'codi_sect',
  'nume_iden',
  'nomb_clie',
  'nomb_barr',
  'dire_terc',
  'tele_ter1',
  'tele_ter2',
  'tipo_clie',
  'sald_docu',
  'codi_camp_1',
  'tota_publ_1',
  'codi_camp_2',
  'tota_publ_2',
  'codi_camp_3',
  'tota_publ_3',
  'codi_camp_4',
  'tota_publ_4',
  'clie_gemm',
  'nive_gemm',
  'desc_segm',
])

const headersDetalle = computed(() => {
  if(selectedColumna.value.length > 0) {
    return headersDetalleTotal.filter(header => selectedColumna.value.includes(header.key))
  } else {
    return []
  }
})

const headersColumna = [
  {
    title: 'Columna',
    key: 'nomb_colu',
  },
]

const itemsColumna = [
  {
    nomb_colu: 'Zona',
    codi_colu: 'codi_zona',
  },
  {
    nomb_colu: 'Sector',
    codi_colu: 'codi_sect',
  },
  {
    nomb_colu: 'Cumpleaños',
    codi_colu: 'fech_naci',
  },
  {
    nomb_colu: 'Distrito',
    codi_colu: 'nomb_barr',
  },
  {
    nomb_colu: 'Dirección',
    codi_colu: 'dire_terc',
  },
  {
    nomb_colu: 'Teléfono 1',
    codi_colu: 'tele_ter1',
  },
  {
    nomb_colu: 'Teléfono 2',
    codi_colu: 'tele_ter2',
  },
  {
    nomb_colu: 'Cupo',
    codi_colu: 'cupo_cred',
  },
  {
    nomb_colu: 'Saldo',
    codi_colu: 'sald_docu',
  },
  {
    nomb_colu: 'Camp. ingr.',
    codi_colu: 'camp_ingr',
  },
  {
    nomb_colu: 'Ult. camp1',
    codi_colu: 'codi_camp_1',
  },
  {
    nomb_colu: 'Ptos azzo. ult. camp1',
    codi_colu: 'tota_publ_1',
  },
  {
    nomb_colu: 'Fact. ult. camp1',
    codi_colu: 'tota_fact_1',
  },
  {
    nomb_colu: 'Devo. ult. camp1',
    codi_colu: 'tota_devo_1',
  },
  {
    nomb_colu: 'Ult. camp2',
    codi_colu: 'codi_camp_2',
  },
  {
    nomb_colu: 'Ptos azzo. ult. camp2',
    codi_colu: 'tota_publ_2',
  },
  {
    nomb_colu: 'Fact. ult. camp2',
    codi_colu: 'tota_fact_2',
  },
  {
    nomb_colu: 'Devo. ult. camp2',
    codi_colu: 'tota_devo_2',
  },
  {
    nomb_colu: 'Ult. camp3',
    codi_colu: 'codi_camp_3',
  },
  {
    nomb_colu: 'Ptos azzo. ult. camp3',
    codi_colu: 'tota_publ_3',
  },
  {
    nomb_colu: 'Fact. ult. camp3',
    codi_colu: 'tota_fact_3',
  },
  {
    nomb_colu: 'Devo. ult. camp3',
    codi_colu: 'tota_devo_3',
  },
  {
    nomb_colu: 'Ult. camp4',
    codi_colu: 'codi_camp_4',
  },
  {
    nomb_colu: 'Ptos azzo. ult. camp4',
    codi_colu: 'tota_publ_4',
  },
  {
    nomb_colu: 'Fact. ult. camp4',
    codi_colu: 'tota_fact_4',
  },
  {
    nomb_colu: 'Devo. ult. camp4',
    codi_colu: 'tota_devo_4',
  },
  {
    nomb_colu: 'Estado pedido',
    codi_colu: 'esta_pedi',
  },
  {
    nomb_colu: 'Gemma',
    codi_colu: 'clie_gemm',
  },
  {
    nomb_colu: 'Nivel',
    codi_colu: 'nive_gemm',
  },
  {
    nomb_colu: 'Creciendo con azzorti',
    codi_colu: 'desc_segm',
  },
]

const isOpen = ref(false)
const itemsGlobal = ref([])
const itemsDetalle = ref([])

const campanaOptions = ref([])
const errorCampana = ref(false)
const errorMensajeCampana = ref('')

const zonaOptions = ref([])
const errorZona = ref(false)
const errorMensajeZona = ref('')

onMounted(async () => {
  appStore.titulo(`Reportes / Listado asesora`)
  await obtenerCampana()
  await obtenerZona()
})

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
      method: "GET",
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

    const { data } = await $api(`/api/sami/v1/reportes/listado-asesora`, {
      method: "GET",
      query: {
        campana: (formulario.value.campana === null) ? '' : formulario.value.campana,
        zona: (formulario.value.zona === null) ? '' : formulario.value.zona,
      },
    })

    itemsGlobal.value = data.data_glob
    itemsDetalle.value = data.data_deta
    
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
  }
  itemsGlobal.value = []
  itemsDetalle.value = []
}

const onExcel = async tipo => {
  try {
    appStore.mensaje('Generando archivo')
    appStore.loading(true)

    const { data } = await $api(`/api/sami/v1/reportes/listado-asesora/excel`, {
      method: "POST",
      body: {
        columnas: headersDetalle.value,
        tipo: tipo,
        data_glob: itemsGlobal.value,
        data_deta: itemsDetalle.value,
      },
    })
    
    window.open(`${$base}/temporales/${data}`, '_blank')
  } catch (e) {
  }
  finally {
    appStore.loading(false)
  }
}

const onPdf = async tipo => {
  try {
    appStore.mensaje('Generando archivo')
    appStore.loading(true)

    const { data } = await $api(`/api/sami/v1/reportes/listado-asesora/pdf`, {
      method: "post",
      body: {
        columnas: headersDetalle.value,
        tipo: tipo,
        data_glob: itemsGlobal.value,
        data_deta: itemsDetalle.value,
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

const itemsDetalleVisible = computed(() => {
  // Calcula las filas visibles según la página actual y el número de filas por página
  const start = (currentPage.value - 1) * rowsPerPage.value
  const end = start + rowsPerPage.value
  
  return itemsDetalle.value.slice(start, end)
})
</script>

<template>
  <div>
    <AppPlantilla>
      <template #botones>
        <GenerarBoton @procesar="onGenerar" />
        <VMenu>
          <template #activator="{ props }">
            <VBtn
              :block="mobile"
              color="primary"
              v-bind="props"
            >
              <VIcon
                start
                icon="tabler-file-arrow-right"
              />
              PDF
            </VBtn>
          </template>

          <VList>
            <VListItem @click="onPdf('1')">
              <template #prepend>
                <VIcon
                  class="me-2"
                  icon="tabler-file"
                  size="22"
                />
              </template>
              <VTooltip
                activator="parent"
                location="start"
              >
                <ol class="mx-6 my-2 text-white">
                  <li>Consecutiva</li>
                  <li>Ret. Peg21</li>
                  <li>Ret. Peg42</li>
                  <li>Ret. Peg63</li>
                  <li>Reingreso</li>
                  <li>Incorporación</li>
                  <li>Reincorporación</li>
                  <li>Peg21</li>
                  <li>Peg42</li>
                  <li>Peg63</li>
                  <li>
                    Posible Reingreso &lt;= S/. 25.00
                  </li>
                </ol>
              </VTooltip>
              <VListItemTitle>PDF 1</VListItemTitle>
            </VListItem>
            <VListItem @click="onPdf('2')">
              <template #prepend>
                <VIcon
                  class="me-2"
                  icon="tabler-file"
                  size="22"
                />
              </template>

              <VTooltip
                activator="parent"
                location="start"
              >
                <ol class="mx-6 my-2 text-white">
                  <li>Consecutiva</li>
                  <li>Ret. Peg21</li>
                  <li>Ret. Peg42</li>
                  <li>Ret. Peg63</li>
                  <li>Incorporación</li>
                  <li>Reincorporación</li>
                  <li>Reingreso</li>
                  <li>Peg21</li>
                  <li>Peg42</li>
                  <li>Peg63</li>
                  <li>Posible Reingreso</li>
                </ol>
              </VTooltip>
              <VListItemTitle>PDF 2</VListItemTitle>
            </VListItem>
            <VListItem @click="onPdf('3')">
              <template #prepend>
                <VIcon
                  class="me-2"
                  icon="tabler-file"
                  size="22"
                />
              </template>

              <VTooltip
                activator="parent"
                location="start"
              >
                <ol class="mx-6 my-2 text-white">
                  <li>Consecutiva</li>
                  <li>Ret. Peg21</li>
                  <li>Ret. Peg42</li>
                  <li>Ret. Peg63</li>
                  <li>Reingreso</li>
                  <li>Incorporación</li>
                  <li>Reincorporación</li>
                  <li>Peg21</li>
                  <li>Peg42</li>
                  <li>Peg63</li>
                </ol>
              </VTooltip>
              <VListItemTitle>PDF 3</VListItemTitle>
            </VListItem>
            <VListItem @click="onPdf('4')">
              <template #prepend>
                <VIcon
                  class="me-2"
                  icon="tabler-file"
                  size="22"
                />
              </template>

              <VTooltip
                activator="parent"
                location="start"
              >
                <ol class="mx-6 my-2 text-white">
                  <li>Consecutiva</li>
                  <li>Ret. Peg21</li>
                  <li>Ret. Peg42</li>
                  <li>Ret. Peg63</li>
                  <li>Reingreso</li>
                  <li>Incorporación</li>
                  <li>Reincorporación</li>
                  <li>Peg21</li>
                  <li>Peg42</li>
                  <li>Peg63</li>
                  <li>Posible Reingreso</li>
                  <li>Posible Reincorporación &lt;= S/. 25.00</li>
                </ol>
              </VTooltip>
              <VListItemTitle>PDF 4</VListItemTitle>
            </VListItem>
          </VList>
        </VMenu>
        <VMenu>
          <template #activator="{ props }">
            <VBtn
              :block="mobile"
              color="primary"
              v-bind="props"
            >
              <VIcon
                start
                icon="tabler-file-arrow-right"
              />
              EXCEL
            </VBtn>
          </template>

          <VList>
            <VListItem @click="onExcel('consolidado')">
              <template #prepend>
                <VIcon
                  class="me-2"
                  icon="tabler-file"
                  size="22"
                />
              </template>

              <VListItemTitle>CONSOLIDADO</VListItemTitle>
            </VListItem>
            <VListItem @click="onExcel('total')">
              <template #prepend>
                <VIcon
                  class="me-2"
                  icon="tabler-file"
                  size="22"
                />
              </template>
              <VListItemTitle>TOTAL</VListItemTitle>
            </VListItem>
          </VList>
        </VMenu>
        <LimpiarBoton @procesar="onLimpiar" />
      </template>
      <template #contenido>
        <VRow>
          <VCol cols="12">
            <VCard title="Buscar asesoras">
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
            <VCard title="Lista consolidado">
              <VCardText>
                <VDataTable
                  :headers="headersGlobal"
                  :items="itemsGlobal"
                  :items-per-page="-1"
                  class="text-no-wrap"
                  
                  fixed-header
                  height="250"
                >
                  <template #bottom />
                </VDataTable>
              </VCardText>
            </VCard>
          </VCol>
          <VCol cols="12">
            <VCard title="Lista de asesoras">
              <template #append>
                <IconBtn @click="isOpen=true">
                  <VIcon icon="tabler-menu" />
                </IconBtn>
              </template>
              <VCardText>
                <VDataTable
                  v-model:items-per-page="rowsPerPage"
                  :headers="headersDetalle"
                  :items="itemsDetalleVisible"
                  class="text-no-wrap"
                  fixed-header
                  height="400"
                >
                  <!-- pagination -->
                  <template #bottom>
                    <VDivider v-if="itemsDetalle.length>0" />

                    <div class="d-flex align-center justify-sm-end justify-center flex-wrap gap-3 py-5 pt-3">
                      <VPagination
                        v-if="itemsDetalle.length>0"
                        v-model="currentPage"
                        :length="Math.ceil(itemsDetalle.length / rowsPerPage)"
                        :total-visible="$vuetify.display.xs ? 1 : Math.min(Math.ceil(itemsDetalle.length / rowsPerPage), 5)"
                      >
                        <template #prev="slotProps">
                          <VBtn
                            variant="tonal"
                            color="default"
                            v-bind="slotProps"
                            :icon="false"
                          >
                            <VIcon
                              icon="tabler-arrow-bar-left"
                              size="22"
                            />
                          </VBtn>
                        </template>

                        <template #next="slotProps">
                          <VBtn
                            variant="tonal"
                            color="default"
                            v-bind="slotProps"
                            :icon="false"
                          >
                            <VIcon
                              icon="tabler-arrow-bar-right"
                              size="22"
                            />
                          </VBtn>
                        </template>
                      </VPagination>
                    </div>
                  </template>
                </VDataTable>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </template>
    </AppPlantilla>
    <VDialog
      :fullscreen="(mobile) ? true : false"
      :max-width="(mobile) ? undefined : 450"
      persistent
      :model-value="isOpen"
    >
      <VCard color="background">
        <VToolbar color="primary">
          <VBtn
            v-if="mobile"
            icon
            color="default"
            :rounded="false"
            @click="isOpen=false"
          >
            <VIcon icon="tabler-x" />
          </VBtn>
          <VToolbarTitle>
            Lista de columnas
          </VToolbarTitle>
          <VSpacer />
          <VToolbarItems>
            <VBtn
              v-if="!mobile"
              icon
              @click="isOpen=false"
            >
              <VIcon icon="tabler-x" />
            </VBtn>
          </VToolbarItems>
        </VToolbar>
        <VDataTable
          v-model="selectedColumna"
          :headers="headersColumna"
          :items="itemsColumna"
          :items-per-page="-1"
          class="text-no-wrap"
          
          fixed-header
          :height="(!mobile)? (itemsColumna.length > 15) ? 400 : null: null"

          show-select
          item-value="codi_colu"
        >
          <template #bottom />
        </VDataTable>
      </VCard>
    </VDialog>
  </div>
</template>
