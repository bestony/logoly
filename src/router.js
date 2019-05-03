import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'pornhub',
      component: () => import(/* webpackChunkName: "pornhub" */ './views/Home.vue'),
      meta: {
        analytics: {
          pageviewTemplate(route) {
            return {
              title: 'Pornhub Generator',
              page: route.path,
            }
          },
        },
      },
    },
  ],
})
