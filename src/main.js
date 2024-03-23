import './assets/main.css'
import './assets/iconfont/iconfont.css'
import 'floating-vue/dist/style.css'
import FloatingVue from 'floating-vue'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(FloatingVue, {
  themes: {
    'ownTooltip': {
      $extend: 'tooltip'
    }
  }
})
app.use(router)

app.mount('#app')
