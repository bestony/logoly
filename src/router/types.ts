export type RouteDefinition = {
  path: string
  name: string
  view: string
  meta?: Record<string, unknown>
}
