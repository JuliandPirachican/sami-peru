<script setup>
import navItems from '@/navigation/vertical'
import { useDisplay } from 'vuetify'

// Components
import Footer from '@/layouts/components/Footer.vue'
import NavbarTitulo from '@/layouts/components/NavbarTitulo.vue'
import UserProfile from '@/layouts/components/UserProfile.vue'

// @layouts plugin
import { VerticalNavLayout } from '@layouts'

const { mobile } = useDisplay()

// SECTION: Loading Indicator
const isFallbackStateActive = ref(false)
const refLoadingIndicator = ref(null)
const userData = JSON.parse(localStorage.getItem('userData'))
const clase = "mr-4 text-right"
const loginData = JSON.parse(localStorage.getItem('login'))

watch([
  isFallbackStateActive,
  refLoadingIndicator,
], () => {
  if (isFallbackStateActive.value && refLoadingIndicator.value)
    refLoadingIndicator.value.fallbackHandle()
  if (!isFallbackStateActive.value && refLoadingIndicator.value)
    refLoadingIndicator.value.resolveHandle()
}, { immediate: true })
// !SECTION
</script>

<template>
  <VerticalNavLayout :nav-items="navItems">
    <!-- 👉 navbar -->
    <template #navbar="{ toggleVerticalOverlayNavActive }">
      <div class="d-flex h-100 align-center">
        <IconBtn
          id="vertical-nav-toggle-btn"
          class="ms-n3 d-lg-none"
          @click="toggleVerticalOverlayNavActive(true)"
        >
          <VIcon
            size="26"
            icon="tabler-menu-2"
          />
        </IconBtn>
        <NavbarTitulo v-if="!mobile" />
        <VSpacer />
        <div class="d-flex flex-column justify-end">
          <div
            :class="clase"
            class="font-weight-light"
          >
            {{ userData.perf_usua }} 
          </div>
          <div
            :class="clase"
            class="text-capitalize font-weight-medium"
          >
            {{ userData.nomb_empl }} {{ userData.apel_empl }}
          </div>
        </div>
        <UserProfile />
      </div>
    </template>

    <AppLoadingIndicator ref="refLoadingIndicator" />

    <!-- 👉 Pages -->
    <RouterView v-slot="{ Component }">
      <Suspense
        :timeout="0"
        @fallback="isFallbackStateActive = true"
        @resolve="isFallbackStateActive = false"
      >
        <Component :is="Component" />
      </Suspense>
    </RouterView>

    <!-- 👉 Footer -->
    <template #footer>
      <Footer />
    </template>
  </VerticalNavLayout>
</template>
