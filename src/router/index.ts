import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

type RouteDefinition = {
  path: string
  name: string
  view: string
  meta?: Record<string, unknown>
}

const views = import.meta.glob('../views/*.vue')

const routeDefinitions: RouteDefinition[] = [
  { path: '/', name: 'home', view: 'Home', meta: { title: 'Home' } },
  { path: '/vertical-ph', name: 'vertical-ph', view: 'VerticalPh', meta: { title: 'Vertical PH' } },
  { path: '/onlyfans', name: 'onlyfans', view: 'OnlyFans', meta: { title: 'OnlyFans' } },
  { path: '/about', name: 'about', view: 'About', meta: { title: 'About' } },
  { path: '/FAQ', name: 'faq', view: 'FAQ', meta: { title: 'FAQ' } },
  { path: '/fedex', name: 'fedex', view: 'FedEx', meta: { title: 'FedEx' } },
  { path: '/mastercard', name: 'mastercard', view: 'Mastercard', meta: { title: 'Mastercard' } },
  { path: '/bluesnap', name: 'bluesnap', view: 'Bluesnap', meta: { title: 'Bluesnap' } },
  { path: '/simpletext', name: 'simpletext', view: 'Simpletext', meta: { title: 'Simple Text' } },
  { path: '/sega', name: 'sega', view: 'SEGA', meta: { title: 'SEGA' } },
  { path: '/nintendo', name: 'nintendo', view: 'Nintendo', meta: { title: 'Nintendo' } },
  { path: '/lego', name: 'lego', view: 'Lego', meta: { title: 'LEGO' } },
  { path: '/marvel', name: 'marvel', view: 'Marvel', meta: { title: 'Marvel' } },
  { path: '/bravo', name: 'bravo', view: 'Bravo', meta: { title: 'Bravo' } },
  { path: '/amc', name: 'amc', view: 'AMC', meta: { title: 'AMC' } },
]

const routes: RouteRecordRaw[] = routeDefinitions.map(({ path, name, view, meta }) => {
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

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
