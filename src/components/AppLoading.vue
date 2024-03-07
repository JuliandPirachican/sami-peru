<script setup>
import { useAppStore } from '@/stores/app'

const store = useAppStore()
</script>

<template>
  <VDialog
    v-model="store.loadingState"
    persistent
    width="300"
  >
    <VCard color="primary">
      <VCardText class="pt-3 text-center">
        {{ store.mensajeState }}
      </VCardText>
      
      <VCardText class="pt-3">
        <VProgressLinear
          indeterminate
          color="white"
          class="mb-0"
        />
      </VCardText>
    </VCard>
  </VDialog>
</template>
