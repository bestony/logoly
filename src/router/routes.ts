import type { RouteRecordRaw } from 'vue-router'
import { brandRoutes } from './modules/brands'
import { pageRoutes } from './modules/pages'
import type { RouteDefinition } from './types'

const views = import.meta.glob('../views/*.vue')

const notFoundRoute: RouteDefinition = {
  path: '/:pathMatch(.*)*',
  name: 'not-found',
  view: 'NotFound',
  meta: {
    title: 'Not Found',
    description: 'Page not found. Tell us what feature or template you want next.',
  },
}

const routeDefinitions: RouteDefinition[] = [...pageRoutes, ...brandRoutes, notFoundRoute]

export const routes: RouteRecordRaw[] = routeDefinitions.map(({ path, name, view, meta }) => {
  const loader = views[`../views/${view}.vue`]

  if (!loader) {
    const message = `[router] View component "${view}.vue" is missing in src/views (path: ${path}, name: ${name})`
    if (import.meta.env.DEV) {
      console.error(message)
    }
    throw new Error(message)
  }

  return {
    path,
    name,
    component: loader,
    meta,
  }
})
