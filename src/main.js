import './assets/main.css'
import './assets/iconfont/iconfont.css'
import vToolTip from 'v-tooltip'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(vToolTip)
app.use(router)

app.mount('#app')
