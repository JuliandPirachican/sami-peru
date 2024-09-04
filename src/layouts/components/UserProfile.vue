<script setup>
import { EncryptStorage } from 'encrypt-storage';

const router = useRouter()
const ability = useAbility()

const encryptStorage = new EncryptStorage('AZZORTI-SAMI', {
  storageType: 'localStorage',
})

// TODO: Get type from backend
const userData = encryptStorage.getItem('userData')


const logout = async () => {

  // Remove "accessToken" from cookie
  encryptStorage.removeItem('accessToken')

  // Remove "userData" from cookie
  encryptStorage.removeItem('userData')
  localStorage.removeItem("session_iframe")

  // Redirect to login page
  await router.push('/login')

  // ℹ️ We had to remove abilities in then block because if we don't nav menu items mutation is visible while redirecting user to login page

  // Remove "userAbilities" from cookie
  encryptStorage.removeItem('userAbilityRules')

  // Reset ability to initial ability
  ability.update([])
}
</script>

<template>
  <div>
    <VAvatar
     @click="logout"
      class="cursor-pointer"
      :color="!(userData && userData.avatar) ? 'dark' : undefined"
      :variant="!(userData && userData.avatar) ? 'tonal' : undefined"
    >
      <VIcon icon="tabler-logout" />
    </VAvatar>

    <!-- componente comentareado por orden de Rayni -->
    <!-- <VBadge
      v-if="userData"
      dot
      bordered
      location="bottom right"
      offset-x="3"
      offset-y="3"
      color="error"
     
    >
    </VBadge> -->
  </div>
</template>
