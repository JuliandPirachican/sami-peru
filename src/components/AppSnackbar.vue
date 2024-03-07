<script setup>
import { useAppStore } from "@/stores/app"

const store = useAppStore()
</script>

<template>
  <VSnackbar
    v-model="store.snackbarState"
    transition="scale-transition"
    location="top center"
    multi-line
    variant="flat"
    :color="store.colorState"
  >
    {{ store.mensajeSnackbarState }}
    <template #actions>
      <VBtn
        color="indigo"
        variant="text"
        @click="store.snackbar(false)"
      >
        Cerrar
      </VBtn>
    </template>
  </VSnackbar>
</template>
