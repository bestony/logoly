import { createPinia } from 'pinia'
import { createApp } from 'vue'

import 'virtual:uno.css'
import '@unocss/reset/normalize.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
