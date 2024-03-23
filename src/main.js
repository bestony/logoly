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
  config: { 
    id: "UA-47834775-20" 
  }
})
app.use(router)

app.mount('#app')
