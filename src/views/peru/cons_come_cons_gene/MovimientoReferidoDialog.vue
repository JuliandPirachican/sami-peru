<script setup>
import { useDisplay } from 'vuetify'
import { VDataTable } from 'vuetify/labs/VDataTable'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  data: {
    required: true,
    type: Array,
  },
})

const emit = defineEmits([
  "update:isOpen",
  "procesar",
])

const { mobile } = useDisplay()

const items = computed({
  get: () => props.data,
})

const headersGlobal = [
  {
    title: 'Pedido',
    key: 'cons_pedi',
  },
  {
    title: 'Código',
    key: 'codi_terc',
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
    title: 'Campaña',
    key: 'codi_camp',
  },
  {
    title: 'Nro factura',
    key: 'nume_fact',
  },
  {
    title: 'Valor factura',
    key: 'valo_docu',
  },
  {
    title: 'Campaña ingr.',
    key: 'camp_ingr',
  },
  {
    title: 'Porc. %',
    key: 'porc_comi',
  },
  {
    title: 'Valor',
    key: 'valo_comi',
  },
  {
    title: 'Nro nota',
    key: 'nume_nota',
  },
]

const headersDetalle = [
  {
    title: 'Campaña',
    key: 'codi_camp',
  },
  {
    title: 'Porcentaje',
    key: 'porc_comi',
  },
  {
    title: 'Base',
    key: 'valo_ingr',
  },
  {
    title: 'Valor',
    key: 'valo_comi',
  },
]

const onCancelar = () => {
  emit("update:isOpen", false)
}
</script>

<template>
  <VDialog
    :fullscreen="(mobile) ? true : false"
    :max-width="(mobile) ? undefined : 1100"
    persistent
    :model-value="props.isOpen"
  >
    <VCard color="background">
      <VToolbar color="secondary">
        <VBtn
          v-if="mobile"
          icon
          color="default"
          :rounded="false"
          @click="onCancelar"
        >
          <VIcon icon="tabler-x" />
        </VBtn>
        <VToolbarTitle class="ms-md-4 ms-n2">
          Movimiento referidos
        </VToolbarTitle>

        <VSpacer />

        <VToolbarItems>
          <VBtn
            v-if="!mobile"
            icon
            @click="onCancelar"
          >
            <VIcon icon="tabler-x" />
          </VBtn>
        </VToolbarItems>
      </VToolbar>
      <VDataTable
        :headers="headersGlobal"
        :items="items.data_glob"
        no-data-text=""
        fixed-header="true"
        :height="(!mobile)? (items.data_glob.length > 15) ? 400 : null: null"
        class="text-no-wrap"
        :items-per-page="-1"
      >
        <template #bottom />
      </VDataTable>
      <VCardTitle>
        {{ titulo[0] }}
      </VCardTitle>
      <VDataTable
        :headers="headersDetalle"
        :items="items.data_deta"
        no-data-text=""
        fixed-header="true"
        :height="(!mobile)? (items.data_glob.length > 15) ? 400 : null: null"
        class="text-no-wrap"
        :items-per-page="-1"
      >
        <template #bottom />
      </VDataTable>
    </VCard>
  </VDialog>
</template>
