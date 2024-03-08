// 👉 Redirects
export const redirects = [
  // ℹ️ We are redirecting to different pages based on role.
  // NOTE: Role is just for UI purposes. ACL is based on abilities.
  {
    path: '/',
    name: 'index',
    redirect: to => {
      const login = !!(localStorage.getItem('login'))

      if(login) {
        return { name: 'main' } 
      }
        
      return { name: 'login', query: to.query }
    },
  },
]
