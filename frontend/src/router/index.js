import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'


import Layout from '@/components/layout/Layout.vue'
import UserAuth from '@/components/auth/UserAuth.vue'
import Logout from '@/components/auth/Logout.vue'
import AccountActivate from '@/components/auth/AccountActivate.vue'
import PasswordResetConfirmRedirect from '@/components/auth/PasswordResetConfirmRedirect.vue'
import Dashboard from '@/components/dashboard/Dashboard.vue'
import AboutSite from '@/components/info/AboutSite.vue'
import News from '@/components/info/News.vue'


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
      component: Layout,
      beforeEnter: ifAuthenticated,
      children: [
        {
          path: '/dashboard',
          name: 'Dashboard',
          component: Dashboard,
          beforeEnter: ifAuthenticated,
        },
      ],
    },
    {
      path: '/login',
      component: UserAuth,
      beforeEnter: ifNotAuthenticated,
      children: [
        {
          path: '/',
          name: 'News',
          component: News,
          beforeEnter: ifNotAuthenticated,
        },
        {
          path: '/about',
          name: 'AboutSite',
          component: AboutSite,
          beforeEnter: ifNotAuthenticated,
        },
      ],
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
