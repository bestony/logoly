import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'pornhub',
      component: () => import(/* webpackChunkName: "pornhub" */ './generator/Pornhub.vue'),
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
    {
      path: '/vertical-ph',
      name: 'vertical-pornhub',
      component: () =>
        import(/* webpackChunkName: "vertical-pornhub" */ './generator/VerticalPornHub.vue'),
      meta: {
        analytics: {
          pageviewTemplate(route) {
            return {
              title: 'VerticalPornHub Generator',
              page: route.path,
            }
          },
        },
      },
    },
    {
      path: '/t66y',
      name: '草榴',
      component: () => import(/* webpackChunkName: "t66y" */ './generator/T66y.vue'),
      meta: {
        analytics: {
          pageviewTemplate(route) {
            return {
              title: 't66y Generator',
              page: route.path,
            }
          },
        },
      },
    },
    {
      path: '/91porn',
      name: '91Porn',
      component: () => import(/* webpackChunkName: "91porn" */ './generator/91Porn.vue'),
      meta: {
        analytics: {
          pageviewTemplate(route) {
            return {
              title: '91Porn Generator',
              page: route.path,
            }
          },
        },
      },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
      meta: {
        analytics: {
          pageviewTemplate(route) {
            return {
              title: 'About',
              page: route.path,
            }
          },
        },
      },
    },
  ],
})
