<script setup>
import { useAppStore } from '@/stores/app'

const store = useAppStore()
</script>

<template>
  <h4 class="text-h4 text-capitalize">
    {{ store.tituloState }}
  </h4>
</template>
