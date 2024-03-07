<script setup>
import logo from '@images/logos/logo-azzorti.png'

const props = defineProps({

  width: {
    type: String,
    required: false,
  },
})
</script>

<template>
  <VImg
    :width="props.width"
    :src="logo"
    class="mx-auto"
  />
</template>
