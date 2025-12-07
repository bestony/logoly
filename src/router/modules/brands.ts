import type { RouteDefinition } from '../types'

const makeBrandDescription = (brand: string) =>
  `Generate ${brand} style logos online with instant preview and PNG/SVG export.`

const placeholderRoute = (
  path: string,
  name: string,
  brand: string,
  order: number,
): RouteDefinition => ({
  path,
  name,
  view: 'BrandPlaceholder',
  meta: {
    title: brand,
    description: makeBrandDescription(brand),
    placeholderKey: `page.${name}`,
    brandLabel: brand,
    keywords: [`${brand} logo`, `${brand} wordmark`, 'logo generator', 'SVG', 'PNG'],
    nav: {
      labelKey: `component.menu.${name}`,
      group: 'other',
      order,
      badgeKey: 'component.menu.badge.building',
    },
  },
})

export const brandRoutes: RouteDefinition[] = [
  {
    path: '/vertical-ph',
    name: 'vertical-ph',
    view: 'VerticalPh',
    meta: {
      title: 'Vertical PH',
      description: makeBrandDescription('Vertical Pornhub'),
      keywords: ['pornhub vertical logo', 'pornhub style', 'logo maker', 'vertical ph svg'],
      nav: { labelKey: 'component.menu.verticalPh', group: 'primary', order: 2 },
    },
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
      keywords: ['OnlyFans logo', 'logo generator', 'OnlyFans wordmark', 'SVG', 'PNG'],
      nav: {
        labelKey: 'component.menu.onlyfans',
        group: 'other',
        order: 1,
        badgeKey: 'component.menu.badge.building',
      },
    },
  },
  placeholderRoute('/fedex', 'fedex', 'FedEx', 2),
  placeholderRoute('/mastercard', 'mastercard', 'Mastercard', 3),
  placeholderRoute('/bluesnap', 'bluesnap', 'Bluesnap', 4),
  {
    path: '/simpletext',
    name: 'simpletext',
    view: 'SimpleText',
    meta: {
      title: 'Simple Text',
      keywords: ['text logo', 'typography logo', 'simple text logo', 'SVG wordmark'],
      nav: { labelKey: 'component.menu.simpleText', group: 'primary', order: 3 },
    },
  },
  placeholderRoute('/sega', 'sega', 'SEGA', 5),
  placeholderRoute('/nintendo', 'nintendo', 'Nintendo', 6),
  placeholderRoute('/lego', 'lego', 'LEGO', 7),
  placeholderRoute('/marvel', 'marvel', 'Marvel', 8),
  placeholderRoute('/bravo', 'bravo', 'Bravo', 9),
  placeholderRoute('/amc', 'amc', 'AMC', 10),
]
