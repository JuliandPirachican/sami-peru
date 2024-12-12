<script setup>
import { useConfigStore } from '@core/stores/config';
import is from '@sindresorhus/is';
import { EncryptStorage } from 'encrypt-storage';
import Shepherd from 'shepherd.js';

const encryptStorage = new EncryptStorage('AZZORTI-SAMI', {
  storageType: 'localStorage',
})

defineOptions({
  // 👉 Is App Search Bar Visible
  inheritAttrs: false,
})

const menu = encryptStorage.getItem('menu')
const configStore = useConfigStore()
const isAppSearchBarVisible = ref(false)

// 👉 Default suggestions
const suggestionGroups = menu

// 👉 No Data suggestion
const noDataSuggestions = [
  {
    title: 'Analytics Dashboard',
    icon: 'tabler-shopping-cart',
    url: { name: 'dashboards-analytics' },
  },
  {
    title: 'Account Settings',
    icon: 'tabler-user',
    url: {
      name: 'pages-account-settings-tab',
      params: { tab: 'account' },
    },
  },
  {
    title: 'Pricing Page',
    icon: 'tabler-cash',
    url: { name: 'pages-pricing' },
  },
]

const searchQuery = ref('')
const router = useRouter()
const searchResult = ref([])

const fetchResults = async () => {

  const q = is.string(searchQuery.value) ? searchQuery.value : undefined
  const queryLowered = (q ?? '').toString().toLowerCase()
  const filteredSearchData = []

  menu.forEach(item => { 
    if (item.children) {
      const matchingChildren = item.children.filter(child => child.title.toLowerCase().includes(queryLowered))
      if (matchingChildren.length > 0) {
        const parentCopy = { ...item }
        if (matchingChildren.length > 5)
          parentCopy.children = matchingChildren.slice(0, 5)
        else
          parentCopy.children = matchingChildren
        filteredSearchData.push(parentCopy)
      }
    }  
  })
  searchResult.value = filteredSearchData
  
}

watch(searchQuery, fetchResults)

const redirectToSuggestedOrSearchedPage = selected => {
  router.push(selected.to)
  isAppSearchBarVisible.value = false
  searchQuery.value = ''
}

const LazyAppBarSearch = defineAsyncComponent(() => import('@core/components/AppBarSearch.vue'))
</script>

<template>
  <div
    class="d-flex align-center cursor-pointer"
    v-bind="$attrs"
    style="user-select: none;"
    @click="isAppSearchBarVisible = !isAppSearchBarVisible"
  >
    <!-- 👉 Search Trigger button -->
    <!-- close active tour while opening search bar using icon -->
    <IconBtn
      class="me-1"
      @click="Shepherd.activeTour?.cancel()"
    >
      <VIcon
        size="26"
        icon="tabler-search"
      />
    </IconBtn>

    <span
      v-if="configStore.appContentLayoutNav === 'vertical'"
      class="d-none d-md-flex align-center text-disabled"
      @click="Shepherd.activeTour?.cancel()"
    >
      <span class="me-3">Buscar</span>
      <span class="meta-key">&#8984;K</span>
    </span>
  </div>

  <!-- 👉 App Bar Search -->
  <LazyAppBarSearch
    v-model:isDialogVisible="isAppSearchBarVisible"
    :search-results="searchResult"
    @search="searchQuery = $event"
  >
    <!-- suggestion -->
    <template #suggestions>
      <VCardText class="app-bar-search-suggestions h-100 pa-10">
        <VRow
          v-if="suggestionGroups"
          class="gap-y-4"
        >
          <VCol
            v-for="suggestion in suggestionGroups"
            :key="suggestion.title"
            cols="12"
            sm="6"
            class="ps-6"
          >
            <p class="text-xs text-disabled text-uppercase">
              {{ suggestion.title }}
            </p>
            <VList class="card-list">
              <VListItem
                v-for="item in suggestion.children"
                :key="item.title"
                link
                :title="item.title"
                class="app-bar-search-suggestion"
                @click="redirectToSuggestedOrSearchedPage(item)"
              >
                <template #prepend>
                  <VIcon
                    :icon="item.icon"
                    size="20"
                    class="me-2"
                  />
                </template>
              </VListItem>
            </VList>
          </VCol>
        </VRow>
      </VCardText>
    </template>
    <!-- search result -->
    <template #searchResult="{ item }">
      <VListSubheader class="text-disabled">
        {{ item.title }}
      </VListSubheader>
      <VListItem
        v-for="list in item.children"
        :key="list.title"
        link
        @click="redirectToSuggestedOrSearchedPage(list)"
      >
        <template #prepend>
          <VIcon
            size="20"
            :icon="list.icon"
            class="me-3"
          />
        </template>
        <template #append>
          <VIcon
            size="20"
            icon="tabler-corner-down-left"
            class="enter-icon text-disabled"
          />
        </template>
        <VListItemTitle>
          {{ list.title }}
        </VListItemTitle>
      </VListItem>
    </template>
  </LazyAppBarSearch>
</template>

<style lang="scss" scoped>
@use "@styles/variables/_vuetify.scss";

.meta-key {
  border: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
  border-radius: 6px;
  block-size: 1.5625rem;
  line-height: 1.3125rem;
  padding-block: 0.125rem;
  padding-inline: 0.25rem;
}
</style>
