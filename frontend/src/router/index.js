import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'


import Home from '@/components/layout/Home.vue'
import UserAuth from '@/components/auth/UserAuth.vue'
import Logout from '@/components/auth/Logout.vue'
import AccountActivate from '@/components/auth/AccountActivate.vue'
import PasswordResetConfirmRedirect from '@/components/auth/PasswordResetConfirmRedirect.vue'
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
  next('/login')
}

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      beforeEnter: ifAuthenticated,
      children: [
        {
          path: '/dashboard',
          name: 'Dashboard',
          component: DashboardMain,
          beforeEnter: ifAuthenticated,
        },
      ],
    },
    {
      path: '/login',
      name: 'UserAuth',
      component: UserAuth,
      beforeEnter: ifNotAuthenticated,
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/activate/:uid/:token',
      name: 'AccountActivate',
      component: AccountActivate,
      beforeEnter: ifNotAuthenticated,
    },
    {
      path: '/password-reset/:uid/:token',
      name: 'PasswordResetConfirmRedirect',
      component: PasswordResetConfirmRedirect,
      beforeEnter: ifNotAuthenticated,
    },
  ]
})

export default router
