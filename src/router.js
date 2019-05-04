import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router =  new Router({
  mode: 'history',
  routes: [
    {
      path: '/github',
      name: 'repos',
      beforeEnter() { location.href = 'https://github.com/bestony/logoly' }
    },
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "pornhub" */ './views/Home.vue'),
      meta: {
        title: 'Logoly - a minimal Logo Generator',
        analytics: {
          pageviewTemplate(route) {
            return {
              title: 'Logoly',
              page: route.path,
            }
          },
        },
      },
    },
    {
      path: '/generator',
      name: 'generator',
      component: () => import(/* webpackChunkName: "generator" */ './views/Generator.vue'),
      children:[
        {
          path:'p0rnhub',
          component:() => import(/* webpackChunkName: "p0rnhub" */ './generators/p0rnhub.vue')
        }
      ]
    }
    ,
    {
      path:'*',
      redirect:'/'
    }
  ],
})

router.beforeEach((to, from, next) => {
  let title = to.meta && to.meta.title;
  
  if (title) {
      document.title = title; // 设置页面 title
  }  
  next();
})
export default router