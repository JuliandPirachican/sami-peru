<!-- eslint-disable camelcase -->
<script setup>
import { useAppStore } from '@/stores/app'
import { VDataTable } from 'vuetify/labs/VDataTable'

definePage({
  meta: {
    action: 'peru/repo_come_cons_ases_nuev',
    subject: 'peru/repo_come_cons_ases_nuev',
  },
})

const userData = JSON.parse(localStorage.getItem('userData'))
const appStore = useAppStore()

const items = ref([])
const itemsInicialDetalle = ref([])

const itemsdeta = computed(() => {
  return itemsInicialDetalle.value
})

const formulario = ref({
  campana: null,
  zona: null,
})

const headers = ref([
  { key: 'codi_area',        title: 'Región' },
  { key: 'codi_cort',        title: 'Corte' },
  { key: 'codi_zona',        title: 'Zona' },
  { key: 'codi_sect',        title: 'Sector' },
  { key: 'codi_camp_1',      title: '0' },
  { key: 'porc_codi_camp_1', title: '% 0' },
  { key: 'codi_camp_2',      title: '0' },
  { key: 'porc_codi_camp_2', title: '% 0' },
  { key: 'codi_camp_3',      title: '0' },
  { key: 'porc_codi_camp_3', title: '% 0' },
  { key: 'codi_camp_4',      title: '0' },
  { key: 'porc_codi_camp_4', title: '% 0' },
])

const headersdeta = ref([
  { key: 'codi_area', title: 'Región' },
  { key: 'codi_cort', title: 'Corte' },
  { key: 'codi_zona', title: 'Zona' },
  { key: 'codi_sect', title: 'Sector' },
  { key: 'codi_terc', title: 'Código' },
  { key: 'nume_iden', title: 'Nro ident.' },
  { key: 'nomb_clie', title: 'Nombre(s) y Apellido(s)' },
  { key: 'camp_ingr', title: 'Camp. Ingr' },
  { key: 'tele_terc', title: 'Teléfono' },
  { key: 'sald_docu', title: 'Saldo' },
  { key: 'codi_camp_1', title: '0' },
  { key: 'codi_zona_1', title: '0 Zona' },
  { key: 'codi_sect_1', title: '0 Sect' },
  { key: 'tota_fact_1', title: '0 Fact' },
  { key: 'codi_camp_2', title: '0' },
  { key: 'codi_zona_2', title: '0 Zona' },
  { key: 'codi_sect_2', title: '0 Sect' },
  { key: 'tota_fact_2', title: '0 Fact' },
  { key: 'codi_camp_3', title: '0' },
  { key: 'codi_zona_3', title: '0 Zona' },
  { key: 'codi_sect_3', title: '0 Sect' },
  { key: 'tota_fact_3', title: '0 Fact' },
  { key: 'codi_camp_4', title: '0' },
  { key: 'codi_zona_4', title: '0 Zona' },
  { key: 'codi_sect_4', title: '0 Sect' },
  { key: 'tota_fact_4', title: '0 Fact' },
])

const campanaOptions = ref([])
const errorCampana = ref(false)
const errorMensajeCampana = ref('')

const zonaOptions = ref([])
const errorZona = ref(false)
const errorMensajeZona = ref('')

const loginData = JSON.parse(localStorage.getItem('login'))

onMounted(async () => {
  appStore.titulo(`Reportes / Consecutividad`)
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
      console.log(e.response.data)
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
    onLimpiar()
    limpiarValidacion()

    const { data } = await $api(`/api/sami/v1/reportes/consecutividad-asesora`, {
      method: "get",
      query: {
        campana: (formulario.value.campana === null) ? '' : formulario.value.campana,
        zona: (formulario.value.zona === null) ? '' : formulario.value.zona,
        codigo: userData.codi_perf,
        perfil: userData.valo_perf,
      },
    })

    items.value = data.data_glob
    itemsInicialDetalle.value = data.data_deta

    actualizarHeaders({ 
      camp_1: data.codi_camp_1, 
      camp_2: data.codi_camp_2, 
      camp_3: data.codi_camp_3, 
      camp_4: data.codi_camp_4,
    })
    actualizarHeadersDeta({ 
      camp_1: data.codi_camp_1, 
      camp_2: data.codi_camp_2, 
      camp_3: data.codi_camp_3, 
      camp_4: data.codi_camp_4,
    })

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

const actualizarHeaders = datos => {
  headers.value = [
    { key: 'codi_area',        title: 'Región' },
    { key: 'codi_cort',        title: 'Corte' },
    { key: 'codi_zona',        title: 'Zona' },
    { key: 'codi_sect',        title: 'Sector' },
    { key: 'codi_camp_1',      title: datos.camp_1 },
    { key: 'porc_codi_camp_1', title: `% ${datos.camp_1}` },
    { key: 'codi_camp_2',      title: datos.camp_2 },
    { key: 'porc_codi_camp_2', title: `% ${datos.camp_2 }` },
    { key: 'codi_camp_3',      title: datos.camp_3 },
    { key: 'porc_codi_camp_3', title: `% ${datos.camp_3 }` },
    { key: 'codi_camp_4',      title: datos.camp_4 },
    { key: 'porc_codi_camp_4', title: `% ${datos.camp_4 }` },
  ]
}

const actualizarHeadersDeta = datos => {
  headersdeta.value = [
    { key: 'codi_area',   title: 'Región' },
    { key: 'codi_cort',   title: 'Corte' },
    { key: 'codi_zona',   title: 'Zona' },
    { key: 'codi_sect',   title: 'Sector' },
    { key: 'codi_terc',   title: 'Código' },
    { key: 'nume_iden',   title: 'Nro ident.' },
    { key: 'nomb_clie',   title: 'Nombre(s) y Apellido(s)' },
    { key: 'camp_ingr',   title: 'Camp. Ingr' },
    { key: 'tele_terc',   title: 'Teléfono' },
    { key: 'sald_docu',   title: 'Saldo' },
    { key: 'codi_camp_1', title: datos.camp_1 },
    { key: 'codi_zona_1', title: `${datos.camp_1} Zona` },
    { key: 'codi_sect_1', title: `${datos.camp_1} Sect` },
    { key: 'tota_fact_1', title: `${datos.camp_1} Fact` },
    { key: 'codi_camp_2', title: datos.camp_2 },
    { key: 'codi_zona_2', title: `${datos.camp_2} Zona` },
    { key: 'codi_sect_2', title: `${datos.camp_2} Sect` },
    { key: 'tota_fact_2', title: `${datos.camp_2} Fact` },
    { key: 'codi_camp_3', title: datos.camp_3 },
    { key: 'codi_zona_3', title: `${datos.camp_3} Zona` },
    { key: 'codi_sect_3', title: `${datos.camp_3} Sect` },
    { key: 'tota_fact_3', title: `${datos.camp_3} Fact` },
    { key: 'codi_camp_4', title: datos.camp_4 },
    { key: 'codi_zona_4', title: `${datos.camp_4} Zona` },
    { key: 'codi_sect_4', title: `${datos.camp_4} Sect` },
    { key: 'tota_fact_4', title: `${datos.camp_4} Fact` },
  ]
}

const onExcel = async () => {
  try {
    appStore.mensaje('Generando archivo')
    appStore.loading(true)

    const { data } = await $api(`/api/sami/v1/reportes/consecutividad-asesora/excel`, {
      method: "post",
      data: {
        data: items.value,
        datadeta: itemsdeta.value,
      },
    })
    
    window.open(`${$base}/temporales/${data}`, '_blank')
  } catch (e) {
  }
  finally {
    appStore.loading(false)
  }
}

const onLimpiar= async () => {
  /*formulario.value = {
    campana: null,
    zona: null,
  }*/
  items.value = []
  itemsdeta.value = []
  itemsInicialDetalle.value = []
}

const limpiarValidacion = () => {
  errorCampana.value = false
  errorMensajeCampana.value = ''
  errorZona.value = false
  errorMensajeZona.value = ''
}

const onSeleccionar = (columna, item) => {

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
            <VCard title="Buscar consecutividad">
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
                  :headers="headers"
                  :items="items"
                  :items-per-page="-1"
                  class="text-no-wrap"
                  fixed-header
                  height="400"
                >
                  <template #item.codi_camp_1="{ item }">
                    {{ item.codi_camp_1 }}
                    <IconBtn 
                      v-if="item.codi_camp_1!='0'"
                      @click="onSeleccionar('codi_camp_1', item)"
                    >
                      <VIcon
                        icon="tabler-search"
                        size="20"
                      />
                    </IconBtn>
                  </template>
                  <template #item.codi_camp_2="{ item }">
                    {{ item.codi_camp_2 }}
                    <IconBtn 
                      v-if="item.codi_camp_2!='0'"
                      @click="onSeleccionar('codi_camp_2', item)"
                    >
                      <VIcon
                        icon="tabler-search"
                        size="20"
                      />
                    </IconBtn>
                  </template>
                  <template #item.codi_camp_3="{ item }">
                    {{ item.codi_camp_3 }}
                    <IconBtn 
                      v-if="item.codi_camp_3!='0'"
                      @click="onSeleccionar('codi_camp_3', item)"
                    >
                      <VIcon
                        icon="tabler-search"
                        size="20"
                      />
                    </IconBtn>
                  </template>
                  <template #item.codi_camp_4="{ item }">
                    {{ item.codi_camp_4 }}
                    <IconBtn 
                      v-if="item.codi_camp_4!='0'"
                      @click="onSeleccionar('codi_camp_4', item)"
                    >
                      <VIcon
                        icon="tabler-search"
                        size="20"
                      />
                    </IconBtn>
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
                  :headers="headersdeta"
                  :items="itemsdeta"
                  :items-per-page="-1"
                  class="text-no-wrap"
                  fixed-header
                  height="400"
                >
                  <template #top />
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
