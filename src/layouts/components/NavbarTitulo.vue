<script setup>
import { useAppStore } from '@/stores/app';
import bandera from '@images/flags/co.png';

const store = useAppStore()
</script>

<template>
  <div class="d-flex">
    <VAvatar
      size="24"
      :image="bandera"
    >
      <span v-if="notification.text">{{ avatarText(notification.text) }}</span>
    </VAvatar>
    <VToolbarTitle class="mx-3 text-capitalize">
      {{ store.tituloState }}
    </VToolbarTitle>
  </div>
</template>
