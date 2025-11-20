import type { RouteDefinition } from '../types'

const makeBrandDescription = (brand: string) =>
  `Generate ${brand} style logos online with instant preview and PNG/SVG export.`

export const brandRoutes: RouteDefinition[] = [
  {
    path: '/vertical-ph',
    name: 'vertical-ph',
    view: 'VerticalPh',
    meta: { title: 'Vertical PH', description: makeBrandDescription('Vertical Pornhub') },
  },
  {
    path: '/onlyfans',
    name: 'onlyfans',
    view: 'OnlyFans',
    meta: { title: 'OnlyFans', description: makeBrandDescription('OnlyFans') },
  },
  { path: '/fedex', name: 'fedex', view: 'FedEx', meta: { title: 'FedEx' } },
  {
    path: '/mastercard',
    name: 'mastercard',
    view: 'Mastercard',
    meta: { title: 'Mastercard', description: makeBrandDescription('Mastercard') },
  },
  { path: '/bluesnap', name: 'bluesnap', view: 'Bluesnap', meta: { title: 'Bluesnap' } },
  { path: '/simpletext', name: 'simpletext', view: 'SimpleText', meta: { title: 'Simple Text' } },
  { path: '/sega', name: 'sega', view: 'SEGA', meta: { title: 'SEGA' } },
  { path: '/nintendo', name: 'nintendo', view: 'Nintendo', meta: { title: 'Nintendo' } },
  { path: '/lego', name: 'lego', view: 'Lego', meta: { title: 'LEGO' } },
  { path: '/marvel', name: 'marvel', view: 'Marvel', meta: { title: 'Marvel' } },
  { path: '/bravo', name: 'bravo', view: 'Bravo', meta: { title: 'Bravo' } },
  { path: '/amc', name: 'amc', view: 'AMC', meta: { title: 'AMC' } },
]
