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

const headers = [
  {
    title: 'Campaña',
    key: 'codi_camp',
  },
  {
    title: 'Conferencia',
    key: 'punt_conf',
  },
  {
    title: 'Azzorti crece',
    key: 'punt_cond',
  },
  {
    title: 'Consecutividad',
    key: 'punt_cons',
  },
  {
    title: 'Gemmas totales',
    key: 'punt_gema',
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
          Consulta gemma
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
        :headers="headers"
        :items="items"
        no-data-text=""
        fixed-header="true"
        :height="(!mobile)? (items.length > 15) ? 400 : null: null"
        class="text-no-wrap"
        :items-per-page="-1"
      >
        <template #bottom />
      </VDataTable>
    </VCard>
  </VDialog>
</template>
