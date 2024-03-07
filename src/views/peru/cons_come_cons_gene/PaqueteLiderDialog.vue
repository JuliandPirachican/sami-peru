<script setup>
import { useDisplay } from 'vuetify'
import { VDataTable } from 'vuetify/labs/VDataTable'

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

const headers = [
  {
    title: 'Producto',
    key: 'codi_prod',
  },
  {
    title: 'Nombre',
    key: 'nomb_prod',
  },
  {
    title: 'Cantidad',
    key: 'cant_prod',
  },
]
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
          Paquete líder
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
            {{ items.data_glob[0].codi_terc }}
          </VCol>
          <VCol
            cols="4"
            md="2"
          >
            Nombre
          </VCol>
          <VCol
            cols="8"
            md="4"
          >
            {{ items.data_glob[0].nomb_terc }}
          </VCol>
          <VCol
            cols="4"
            md="2"
          >
            Apellido
          </VCol>
          <VCol
            cols="8"
            md="4"
          >
            {{ items.data_glob[0].apel_terc }}
          </VCol>
          <VCol
            cols="4"
            md="2"
          >
            Fecha ingreso
          </VCol>
          <VCol
            cols="8"
            md="4"
          >
            {{ items.data_glob[0].fech_ingr }}
          </VCol>
          <VCol
            cols="4"
            md="2"
          >
            Campaña ingreso
          </VCol>
          <VCol
            cols="8"
            md="4"
          >
            {{ items.data_glob[0].camp_ingr }}
          </VCol>
          <VCol
            cols="4"
            md="2"
          >
            Esta. cal.
          </VCol>
          <VCol
            cols="8"
            md="4"
          >
            {{ items.data_glob[0].acti_calc }}
          </VCol>
          <VCol
            cols="4"
            md="2"
          >
            Estado act.
          </VCol>
          <VCol
            cols="8"
            md="4"
          >
            {{ items.data_glob[0].acti_esta }}
          </VCol>
          <VCol
            cols="4"
            md="2"
          >
            Campaña retiro
          </VCol>
          <VCol
            cols="8"
            md="4"
          >
            {{ items.data_glob[0].camp_reti }}
          </VCol>
          <VCol
            cols="4"
            md="2"
          >
            Motivo retiro
          </VCol>
          <VCol
            cols="8"
            md="4"
          >
            {{ items.data_glob[0].moti_reti }}
          </VCol>
        </VRow>
      </VCardText>
      <VDataTable
        v-if="items.data_deta.length > 0"
        :headers="headers"
        :items="items.data_deta"
        no-data-text=""
        fixed-header="true"
        class="text-no-wrap"
        :items-per-page="-1"
      >
        <template #bottom />
      </VDataTable>
    </VCard>
  </VDialog>
</template>
