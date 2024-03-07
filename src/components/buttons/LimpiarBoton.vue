<script setup>
import { useDisplay } from 'vuetify'

const emit = defineEmits([
  'procesar',
])

const { mobile } = useDisplay()
</script>

<template>
  <VBtn
    :block="mobile"
    variant="tonal"
    color="error"
    @click="$emit('procesar')"
  >
    <VIcon
      start
      icon="tabler-file"
    />
    LIMPIAR
  </VBtn>
</template>
