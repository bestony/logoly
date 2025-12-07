import { computed } from 'vue'
import { useRouter } from 'vue-router'
import type { RouteMeta } from '@/types/composables'

export type NavGroup = 'primary' | 'other' | 'trailing'

export type NavItem = {
  labelKey: string
  path: string
  routeName: string
  badgeKey?: string
  order: number
}

const sortByOrder = (items: NavItem[]) => items.sort((a, b) => a.order - b.order)

export const useNavigationItems = () => {
  const router = useRouter()

  const navGroups = computed<Record<NavGroup, NavItem[]>>(() => {
    const groups: Record<NavGroup, NavItem[]> = { primary: [], other: [], trailing: [] }

    router.getRoutes().forEach((r) => {
      if (!r.name) return
      const nav = (r.meta as RouteMeta | undefined)?.nav
      if (!nav) return

      const group = nav.group as NavGroup
      if (!groups[group]) return

      groups[group].push({
        labelKey: nav.labelKey,
        badgeKey: nav.badgeKey,
        path: r.path,
        routeName: r.name.toString(),
        order: nav.order ?? 99,
      })
    })

    ;(['primary', 'other', 'trailing'] as NavGroup[]).forEach((key) => {
      sortByOrder(groups[key])
    })

    return groups
  })

  return {
    navGroups,
    primaryItems: computed(() => navGroups.value.primary),
    otherItems: computed(() => navGroups.value.other),
    trailingItems: computed(() => navGroups.value.trailing),
  }
}
