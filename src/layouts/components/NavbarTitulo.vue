<script setup>
import { useAppStore } from '@/stores/app'

const store = useAppStore()
</script>

<template>
  <VToolbarTitle class="text-capitalize">
    {{ store.tituloState }}
  </VToolbarTitle>
</template>
