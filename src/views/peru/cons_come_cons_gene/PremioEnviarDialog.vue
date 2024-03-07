<script setup>
import { useDisplay } from 'vuetify'
import { VDataTable } from 'vuetify/labs/VDataTable'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  titulo: {
    required: true,
    type: Array,
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

const titulo = computed({
  get: () => props.titulo,
})

const items = computed({
  get: () => props.data,
})

const headersGlobal = [
  {
    title: 'Campaña',
    key: 'codi_camp',
  },
  {
    title: 'Código',
    key: 'codi_prod',
  },
  {
    title: 'Descripción',
    key: 'nomb_prod',
  },
  {
    title: 'Cantidad',
    key: 'cant_prem',
  },
  {
    title: 'Concepto',
    key: 'codi_conc',
  },
  {
    title: 'Tipo',
    key: 'tipo_conc',
  },
  {
    title: 'Marca',
    key: 'marc_proc',
  },
]

const headersDetalle = [
  {
    title: 'Campaña',
    key: 'codi_camp',
  },
  {
    title: 'Código.',
    key: 'codi_prod',
  },
  {
    title: 'Descripción',
    key: 'nomb_prod',
  },
  {
    title: 'Cantidad',
    key: 'cant_pend',
  },
  {
    title: 'Fech. pendiente',
    key: 'acti_hora',
  },
  {
    title: 'Fech. envio',
    key: 'fech_envi',
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
          Premios pendientes por enviar o facturar
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

      <VCardTitle>
        {{ titulo[0] }}
      </VCardTitle>
      <VDataTable
        :headers="headersGlobal"
        :items="items.data_gana"
        no-data-text=""
        fixed-header="true"
        :height="(!mobile)? (items.data_gana.length > 15) ? 400 : null: null"
        class="text-no-wrap"
        :items-per-page="-1"
      >
        <template #bottom />
      </VDataTable>
      <VCardTitle>
        {{ titulo[1] }}
      </VCardTitle>
      <VDataTable
        :headers="headersDetalle"
        :items="items.data_pend"
        no-data-text=""
        fixed-header="true"
        :height="(!mobile)? (items.data_pend.length > 15) ? 400 : null: null"
        class="text-no-wrap"
        :items-per-page="-1"
      >
        <template #bottom />
      </VDataTable>
    </VCard>
  </VDialog>
</template>
