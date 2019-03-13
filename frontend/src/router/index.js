import Vue from 'vue'
import Router from 'vue-router'

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

import UserAuth from '@/components/UserAuth.vue'


Vue.use(Router)
Vue.use(Buefy)


const router = new Router({
  routes: [
    {
      path: '/auth',
      name: 'UserAuth',
      component: UserAuth
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (sessionStorage.getItem('authToken') !== null || to.path === '/auth') {
    next()
  } else {
    next('/auth')
  }
})

export default router
