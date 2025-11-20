import { computed, type Ref, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

type UseDebugInfoOptions = {
  error?: Ref<unknown>
}

// Shared helper for collecting debug information (platform, UA, route history, error)
export function useDebugInfo(options?: UseDebugInfoOptions) {
  const route = useRoute()
  const routeHistory = ref<string[]>([route.fullPath])
  const errorRoute = ref<string | null>(null)

  watch(
    () => route.fullPath,
    (fullPath) => {
      routeHistory.value.push(fullPath)
      if (routeHistory.value.length > 10) {
        routeHistory.value.shift()
      }
    },
  )

  const platform = computed(() => navigator?.platform || 'unknown-platform')
  const userAgent = computed(() => navigator?.userAgent || 'unknown-user-agent')
  const browserBrand = computed(() => {
    const brands = (
      navigator as { userAgentData?: { brands?: { brand: string; version: string }[] } }
    )?.userAgentData?.brands
    return brands?.map((b) => `${b.brand} ${b.version}`).join(', ') || 'unknown-browser'
  })

  const debugInfo = computed(
    () => `OS: ${platform.value}
Browser: ${browserBrand.value}
User Agent: ${userAgent.value}
Error Route: ${errorRoute.value ?? route.fullPath}
History: ${routeHistory.value.join(' -> ')}
Error: ${String(options?.error?.value ?? 'n/a')}`,
  )

  const copyDebugInfo = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(debugInfo.value)
      }
    } catch {
      // ignore clipboard errors
    }
  }

  const setErrorRoute = (path?: string) => {
    errorRoute.value = path ?? route.fullPath
  }

  return {
    debugInfo,
    copyDebugInfo,
    setErrorRoute,
  }
}
