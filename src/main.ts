import { createPinia } from 'pinia'
import { createApp } from 'vue'

import 'virtual:uno.css'
import App from './App.vue'
import { GA_MEASUREMENT_ID } from './constants/app'
import { i18n } from './i18n'
import router from './router'

const initAnalytics = () => {
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  document.head.append(script)

  window.dataLayer = window.dataLayer || []
  function gtag(...args: unknown[]) {
    window.dataLayer?.push(args)
  }
  window.gtag = gtag

  gtag('js', new Date())
  gtag('config', GA_MEASUREMENT_ID)
}

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

if (import.meta.env.PROD) {
  initAnalytics()
}

app.mount('#app')
