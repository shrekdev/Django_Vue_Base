import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'


import Home from '@/components/home/Home.vue'
import UserAuth from '@/components/auth/UserAuth.vue'
import AccountActivate from '@/components/auth/AccountActivate.vue'
import DashboardMain from '@/components/dashboard/DashboardMain.vue'


Vue.use(Router)


const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/')
}

const router = new Router({
  routes: [
//    {
//      path: '/home',
//      name: 'Home',
//      component: Home,
//      beforeEnter: ifAuthenticated,
//    },
    {
      path: '/',
      name: 'UserAuth',
      component: UserAuth,
      beforeEnter: ifNotAuthenticated,
    },
    {
      path: '/activate/:uid/:token',
      name: 'AccountActivate',
      component: AccountActivate,
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
