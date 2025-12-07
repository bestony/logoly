const isProd = import.meta.env.PROD
const GA_SRC_PREFIX = 'https://www.googletagmanager.com/gtag/js?id='

/**
 * 触发 GA4 事件，非生产环境或未初始化 gtag 时自动跳过。
 */
export const trackEvent = (eventName: string, params?: Record<string, unknown>) => {
  if (!isProd) {
    return
  }
  if (typeof window.gtag !== 'function') {
    return
  }
  window.gtag('event', eventName, params ?? {})
}

export const initAnalytics = (measurementId?: string, prod = isProd) => {
  if (!prod || !measurementId) {
    return
  }

  const existingScript = document.querySelector(
    `script[src="${GA_SRC_PREFIX}${measurementId}"]`,
  ) as HTMLScriptElement | null
  if (existingScript) {
    return
  }

  const script = document.createElement('script')
  script.async = true
  script.src = `${GA_SRC_PREFIX}${measurementId}`
  document.head.append(script)

  window.dataLayer = window.dataLayer || []
  function gtag(...args: unknown[]) {
    window.dataLayer?.push(args)
  }
  window.gtag = gtag

  gtag('js', new Date())
  gtag('config', measurementId)
}
