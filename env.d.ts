/// <reference types="vite/client" />

export {}

declare global {
  const __GIT_SHA__: string
  const __APP_MODE__: string

  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
    clarity?: ((...args: unknown[]) => void) & { q?: unknown[] }
  }

  interface ImportMetaEnv {
    readonly VITE_CLARITY_PROJECT_ID?: string
  }
}
