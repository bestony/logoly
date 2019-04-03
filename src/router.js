import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path:'/',
      name:'Index',
      component: () => import(/* webpackChunkName: "index" */ './views/page/Index.vue'),
      meta: {
        analytics: {
          pageviewTemplate(route) {
            return {
              title: 'Logoly - The Simple Logo Generator',
              page: route.path,
            }
          },
        },
      },
    },
    {
      path:'/faq',
      name:'Faq',
      component: () => import(/* webpackChunkName: "faq" */ './views/page/Faq.vue'),
      meta: {
        analytics: {
          pageviewTemplate(route) {
            return {
              title: 'FAQ | Logoly - The Simple Logo Generator',
              page: route.path,
            }
          },
        },
      },
    },
    {
      path:'/about',
      name:'About',
      component: () => import(/* webpackChunkName: "about" */ './views/page/About.vue'),
      meta: {
        analytics: {
          pageviewTemplate(route) {
            return {
              title: 'About | Logoly - The Simple Logo Generator',
              page: route.path,
            }
          },
        },
      },
    }
  ],
})
