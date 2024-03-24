import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'pornhub',
      component: () =>
        import(/* webpackChunkName: "pornhub" */ '@/components/generator/Pornhub.vue'),
      meta: {
        analytics: {
          pageviewTemplate(route) {
            return {
              title: 'Pornhub Generator',
              page: route.path
            };
          }
        }
      }
    },
    {
      path: '/vertical-ph',
      name: 'vertical-pornhub',
      component: () =>
        import(
          /* webpackChunkName: "vertical-pornhub" */ '@/components/generator/VerticalPornHub.vue'
        ),
      meta: {
        analytics: {
          pageviewTemplate(route) {
            return {
              title: 'VerticalPornHub Generator',
              page: route.path
            };
          }
        }
      }
    },
    {
      path: '/onlyfans',
      name: 'onlyfans',
      component: () =>
        import(/* webpackChunkName: "onlyfans" */ '@/components/generator/Onlyfans.vue'),
      meta: {
        analytics: {
          pageviewTemplate(route) {
            return {
              title: 'OnlyFans Generator',
              page: route.path
            };
          }
        }
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ '@/views/AboutView.vue'),
      meta: {
        analytics: {
          pageviewTemplate(route) {
            return {
              title: 'About',
              page: route.path
            };
          }
        }
      }
    }
  ]
});

export default router;
