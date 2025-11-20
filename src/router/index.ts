import { createRouter, createWebHistory } from 'vue-router'
import About from '../views/About.vue'
import AMC from '../views/AMC.vue'
import Bluesnap from '../views/Bluesnap.vue'
import Bravo from '../views/Bravo.vue'
import FAQ from '../views/FAQ.vue'
import FedEx from '../views/FedEx.vue'
import Home from '../views/Home.vue'
import Lego from '../views/Lego.vue'
import Marvel from '../views/Marvel.vue'
import Mastercard from '../views/Mastercard.vue'
import Nintendo from '../views/Nintendo.vue'
import OnlyFans from '../views/OnlyFans.vue'
import SEGA from '../views/SEGA.vue'
import Simpletext from '../views/Simpletext.vue'
import VerticalPh from '../views/VerticalPh.vue'

export const routes = [
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
  {
    path: '/fedex',
    name: 'fedex',
    component: FedEx,
  },
  {
    path: '/mastercard',
    name: 'mastercard',
    component: Mastercard,
  },
  {
    path: '/bluesnap',
    name: 'bluesnap',
    component: Bluesnap,
  },
  {
    path: '/simpletext',
    name: 'simpletext',
    component: Simpletext,
  },
  {
    path: '/sega',
    name: 'sega',
    component: SEGA,
  },
  {
    path: '/nintendo',
    name: 'nintendo',
    component: Nintendo,
  },
  {
    path: '/lego',
    name: 'lego',
    component: Lego,
  },
  {
    path: '/marvel',
    name: 'marvel',
    component: Marvel,
  },
  {
    path: '/bravo',
    name: 'bravo',
    component: Bravo,
  },
  {
    path: '/amc',
    name: 'amc',
    component: AMC,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
