<script setup>
const router = useRouter()
const ability = useAbility()

// TODO: Get type from backend
const userData = JSON.parse(localStorage.getItem('userData'))

const logout = async () => {

  // Remove "accessToken" from cookie
  localStorage.removeItem('accessToken')

  // Remove "userData" from cookie
  localStorage.removeItem('userData')

  // Redirect to login page
  await router.push('/login')

  // ℹ️ We had to remove abilities in then block because if we don't nav menu items mutation is visible while redirecting user to login page

  // Remove "userAbilities" from cookie
  localStorage.removeItem('userAbilityRules')

  // Reset ability to initial ability
  ability.update([])
}
</script>

<template>
  <div>
    <VBadge
      v-if="userData"
      dot
      bordered
      location="bottom right"
      offset-x="3"
      offset-y="3"
      color="success"
      @click="logout"
    >
      <VAvatar
        class="cursor-pointer"
        :color="!(userData && userData.avatar) ? 'primary' : undefined"
        :variant="!(userData && userData.avatar) ? 'tonal' : undefined"
      >
        <VIcon icon="tabler-user" />
      </VAvatar>
    </VBadge>
  </div>
</template>
