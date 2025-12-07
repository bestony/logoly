import type { RouteDefinition } from '../types'

const makeBrandDescription = (brand: string) =>
  `Generate ${brand} style logos online with instant preview and PNG/SVG export.`

const placeholderRoute = (path: string, name: string, brand: string): RouteDefinition => ({
  path,
  name,
  view: 'BrandPlaceholder',
  meta: {
    title: brand,
    description: makeBrandDescription(brand),
    placeholderKey: `page.${name}`,
    brandLabel: brand,
  },
})

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
    view: 'BrandPlaceholder',
    meta: {
      title: 'OnlyFans',
      description: makeBrandDescription('OnlyFans'),
      placeholderKey: 'page.onlyfans',
      brandLabel: 'OnlyFans',
    },
  },
  placeholderRoute('/fedex', 'fedex', 'FedEx'),
  placeholderRoute('/mastercard', 'mastercard', 'Mastercard'),
  placeholderRoute('/bluesnap', 'bluesnap', 'Bluesnap'),
  { path: '/simpletext', name: 'simpletext', view: 'SimpleText', meta: { title: 'Simple Text' } },
  placeholderRoute('/sega', 'sega', 'SEGA'),
  placeholderRoute('/nintendo', 'nintendo', 'Nintendo'),
  placeholderRoute('/lego', 'lego', 'LEGO'),
  placeholderRoute('/marvel', 'marvel', 'Marvel'),
  placeholderRoute('/bravo', 'bravo', 'Bravo'),
  placeholderRoute('/amc', 'amc', 'AMC'),
]
