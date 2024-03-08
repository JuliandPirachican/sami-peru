<script setup>
import { useDisplay } from 'vuetify'
import { VDataTable } from 'vuetify/labs/VDataTable'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  headers: {
    required: true,
    type: Array,
  },
  items: {
    required: true,
    type: Array,
  },
  titleGlobal: {
    required: false,
    type: String,
  },
  titleDetalle: {
    required: false,
    type: String,
  },
  headersDetalle: {
    required: false,
    type: Array,
  },
  itemsDetalle: {
    required: false,
    type: Array,
  },
})

const emit = defineEmits([
  "update:isOpen",
  "procesar",
])

const { mobile } = useDisplay()

const headers = computed({
  get: () => props.headers,
})

const items = computed({
  get: () => props.items,
})

const headersDetalle = computed({
  get: () => props.headersDetalle ?? [],
})

const itemsDetalle = computed({
  get: () => props.itemsDetalle?? [],
})

const titleGlobal = computed({
  get: () => props.titleGlobal ?? '',
})

const titleDetalle = computed({
  get: () => props.titleDetalle ?? '',
})

const onCancelar = () => {
  emit("update:isOpen", false)
}

const onSeleccionar = data => {
  emit("procesar", data)
}
</script>

<template>
  <VDialog
    :fullscreen="(mobile) ? true : false"
    :max-width="(mobile) ? undefined : 1100"
    persistent
    :model-value="props.isOpen"
  >
    <VCard color="background">
      <VToolbar color="primary">
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
          {{ props.title }}
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
      <VRow>
        <VCol cols="12">
          <VCard :title="(titleGlobal!= '') ? titleGlobal : null">
            <VCardText>
              <VDataTable
                :headers="headers"
                :items="items"
                fixed-header
                :height="(!mobile)? (items.length > 10) ? 400 : null: null"
                class="text-no-wrap"
                :items-per-page="-1"
              >
                <template #item.acciones="{ item }">
                  <IconBtn @click="onSeleccionar(item)">
                    <VIcon icon="tabler-search" />
                  </IconBtn>
                </template>
                <template #bottom />
              </VDataTable>
            </VCardText>
          </VCard>
        </VCol>
        <VCol
          v-if="itemsDetalle.length>0"
          cols="12"
        >
          <VCard :title="(titleDetalle!= '') ? titleDetalle : null">
            <VCardText>
              <VDataTable
                :headers="headersDetalle"
                :items="itemsDetalle"
                fixed-header
                :height="(!mobile)? (itemsDetalle.length > 10) ? 400 : null: null"
                class="text-no-wrap"
                :items-per-page="-1"
              >
                <template #item.acciones="{ item }">
                  <IconBtn @click="onSeleccionar(item)">
                    <VIcon icon="tabler-search" />
                  </IconBtn>
                </template>
                <template #bottom />
              </VDataTable>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
    </VCard>
  </VDialog>
</template>
