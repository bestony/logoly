import './assets/iconfont/iconfont.css'
import 'floating-vue/dist/style.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import FloatingVue from 'floating-vue'
import VueGtag from "vue-gtag";

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
app.use(VueGtag, {
  appName: 'Logoly',
  pageTrackerScreenviewEnabled: true,
  config: { 
    id: "G-YX7X8HWGB1" 
  }
},router)
app.use(router)

app.mount('#app')
