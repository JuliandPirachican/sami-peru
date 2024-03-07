<script setup>
import { useAppStore } from '@/stores/app'
import { useDisplay } from 'vuetify'

const props = defineProps({
  botones: {
    type: Boolean,
    required: false,
    default: true,
  },
  contenido: {
    type: Boolean,
    required: false,
    default: true,
  },
})

const botones = computed({
  get: () => props.botones,
})

const contenido = computed({
  get: () => props.contenido,
})

const store = useAppStore()
const { mobile } = useDisplay()
</script>

<template>
  <div>
    <VRow>
      <VCol 
        v-if="mobile"
        cols="12"
      >
        <AppTitulo />
      </VCol>
      <VCol
        v-if="botones"
        cols="12"
        class="d-flex justify-end flex-wrap gap-x-4 gap-y-4"
      >
        <slot name="botones" />
      </VCol>
      <VCol
        v-if="contenido"
        cols="12"
      >
        <slot name="contenido" />
      </VCol>
    </VRow>
  </div>
</template>
