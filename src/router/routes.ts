import type { RouteRecordRaw } from 'vue-router'
import { brandRoutes } from './modules/brands'
import { pageRoutes } from './modules/pages'
import type { RouteDefinition } from './types'

const views = import.meta.glob('../views/*.vue')

const routeDefinitions: RouteDefinition[] = [...pageRoutes, ...brandRoutes]

export const routes: RouteRecordRaw[] = routeDefinitions.map(({ path, name, view, meta }) => {
  const loader = views[`../views/${view}.vue`]

  if (!loader) {
    throw new Error(`View component "${view}.vue" is missing in src/views`)
  }

  return {
    path,
    name,
    component: loader,
    meta,
  }
})
