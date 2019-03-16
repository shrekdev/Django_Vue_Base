import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

import UserAuth from '@/components/auth/UserAuth.vue'
import DashboardMain from '@/components/dashboard/DashboardMain.vue'


Vue.use(Router)
Vue.use(Buefy)


const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/auth')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/dashboard')
}

const router = new Router({
  routes: [
//    {
//      path: '/',
//      name: 'Home',
//      component: Home,
//    },
    {
      path: '/',
      name: 'UserAuth',
      component: UserAuth,
      beforeEnter: ifNotAuthenticated,
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: DashboardMain,
      beforeEnter: ifAuthenticated,
    },
  ]
})

export default router
