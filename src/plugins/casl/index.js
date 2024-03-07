import { createMongoAbility } from '@casl/ability'
import { abilitiesPlugin } from '@casl/vue'

export default function (app) {
  const userAbilityRules = localStorage.getItem('userAbilityRules')
  const initialAbility = createMongoAbility(JSON.parse(userAbilityRules) ?? [])

  app.use(abilitiesPlugin, initialAbility, {
    useGlobalProperties: true,
  })
}
