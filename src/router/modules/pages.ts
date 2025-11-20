import type { RouteDefinition } from '../types'

export const pageRoutes: RouteDefinition[] = [
  { path: '/', name: 'home', view: 'Home', meta: { title: 'Home' } },
  { path: '/about', name: 'about', view: 'About', meta: { title: 'About' } },
  { path: '/faq', name: 'faq', view: 'FAQ', meta: { title: 'FAQ' } },
]
