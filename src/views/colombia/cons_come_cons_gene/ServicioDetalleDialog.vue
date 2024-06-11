<script setup>
import { useDisplay } from 'vuetify'

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
])

const { mobile } = useDisplay()

const items = computed({
  get: () => props.data,
})

const onCancelar = () => {
  emit("update:isOpen", false)
}
</script>

<template>
  <VDialog
    :fullscreen="(mobile) ? true : false"
    :max-width="(mobile) ? undefined : 660"
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
          Producto salida
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
      <VCardText>
        <VRow>
          <VCol
            cols="4"
            md="2"
          >
            Código
          </VCol>
          <VCol
            cols="8"
            md="10"
          >
            {{ items[0].codi_prod }}
          </VCol>
          <VCol
            cols="4"
            md="2"
          >
            Producto
          </VCol>
          <VCol
            cols="8"
            md="10"
          >
            {{ items[0].nomb_prod }}
          </VCol>
          <VCol
            cols="4"
            md="2"
          >
            Unidad
          </VCol>
          <VCol
            cols="8"
            md="10"
          >
            {{ items[0].codi_unid }}
          </VCol>
        </VRow>
      </VCardText>
    </VCard>
  </VDialog>
</template>
