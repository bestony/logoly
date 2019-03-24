import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueAnalytics from 'vue-analytics'
import VTooltip from 'v-tooltip'

import './assets/iconfont/iconfont.css'


Vue.config.productionTip = false

Vue.use(VueAnalytics, {
  id: 'UA-47834775-20',
  router,
  autoTracking: {
    pageviewOnLoad: false
  }
})
Vue.use(VTooltip)


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
