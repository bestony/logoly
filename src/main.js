import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueAnalytics from 'vue-analytics'
import VueTour from 'vue-tour'

import './assets/iconfont/iconfont.css'
require('vue-tour/dist/vue-tour.css')


Vue.config.productionTip = false

Vue.use(VueAnalytics, {
  id: 'UA-47834775-20',
  autoTracking: {
    screenview: true
  }
})
Vue.use(VueTour)


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
