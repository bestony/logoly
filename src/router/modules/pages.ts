import type { RouteDefinition } from '../types'

const baseDescription =
  'Create branded style logos online in seconds. Supports PNG and SVG downloads with zero backend processing.'

export const pageRoutes: RouteDefinition[] = [
  { path: '/', name: 'home', view: 'Home', meta: { title: 'Home', description: baseDescription } },
  {
    path: '/about',
    name: 'about',
    view: 'About',
    meta: {
      title: 'About',
      description: 'Learn about the Logoly project, contributors, and how to get involved.',
      keywords: ['about', 'logoly', 'open source'],
    },
  },
  {
    path: '/faq',
    name: 'faq',
    view: 'FAQ',
    meta: {
      title: 'FAQ',
      description: 'Frequently asked questions about generating and downloading logos.',
      keywords: ['faq', 'help', 'logo generator tips'],
    },
  },
]
