import packageJson from '../../../package.json'

export const redirects = [
  // ℹ️ We are redirecting to different pages based on role.
  // NOTE: Role is just for UI purposes. ACL is based on abilities.
  {
    path: '/',
    name: 'index',
    redirect: to => {
      const version = !!(localStorage.getItem('version'))
      const login = !!(localStorage.getItem('login'))
      if(!version) {
        localStorage.setItem('version', packageJson.version)
        
        localStorage.removeItem('accessToken')
        localStorage.removeItem('userAbilityRules')
        localStorage.removeItem('userData')

        return { name: 'login', query: to.query }
      }

      if(login) {
        return { name: 'main' } 
      }
        
      return { name: 'login', query: to.query }
    },
  },
]
