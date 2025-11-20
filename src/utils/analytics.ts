const isProd = import.meta.env.PROD

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
