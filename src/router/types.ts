import type { RouteMeta } from '../types/composables'

export type RouteDefinition = {
  path: string
  name: string
  view: string
  meta?: RouteMeta
}
