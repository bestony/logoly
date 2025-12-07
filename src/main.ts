import { createPinia } from 'pinia'
import { createApp } from 'vue'

import 'virtual:uno.css'
import './styles/theme.css'
import App from './App.vue'
import { CLARITY_PROJECT_ID, GA_MEASUREMENT_ID } from './constants/app'
import { i18n } from './i18n'
import router from './router'
import { initAnalytics } from './utils/analytics'
import { initClarity } from './utils/clarity'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

if (import.meta.env.PROD) {
  initAnalytics(GA_MEASUREMENT_ID)
  if (CLARITY_PROJECT_ID) {
    initClarity(CLARITY_PROJECT_ID)
  }
}

app.mount('#app')
