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
    color="primary"
    @click="$emit('procesar')"
  >
    <VIcon
      start
      icon="tabler-search"
    />
    CONSULTAR
  </VBtn>
</template>
