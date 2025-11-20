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

declare module 'file-saver' {
  export function saveAs(data: Blob | File | string, filename?: string, options?: unknown): void
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<object, object, unknown>
  export default component
}
