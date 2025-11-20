import { createRouter, createWebHistory } from 'vue-router'
import About from '../views/About.vue'
import FAQ from '../views/FAQ.vue'
import Home from '../views/Home.vue'
import OnlyFans from '../views/OnlyFans.vue'
import VerticalPh from '../views/VerticalPh.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/vertical-ph',
      name: 'vertical-ph',
      component: VerticalPh,
    },
    {
      path: '/onlyfans',
      name: 'onlyfans',
      component: OnlyFans,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/FAQ',
      name: 'faq',
      component: FAQ,
    },
  ],
})

export default router
