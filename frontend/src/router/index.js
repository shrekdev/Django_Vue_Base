import Vue from 'vue';
import Router from 'vue-router';
import store from '../store';

import Layout from '@/components/layout/Layout.vue';
import DashboardLayout from '@/components/layout/DashboardLayout.vue';
import AuthLayout from '@/components/auth/AuthLayout.vue';
import Logout from '@/components/auth/Logout.vue';
import AccountActivate from '@/components/auth/AccountActivate.vue';
import PasswordResetConfirmRedirect from '@/components/auth/PasswordResetConfirmRedirect.vue';


Vue.use(Router);


const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/');
};

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/login');
};

const router = new Router({
  routes: [
    {
      path: '/',
      component: DashboardLayout,
      beforeEnter: ifAuthenticated,
      children: [
        {
          path: '',
          name: 'Dashboard',
          component: () => import('@/components/dashboard/Dashboard.vue'),
          beforeEnter: ifAuthenticated,
        },
      ],
    },
    {
      path: '/',
      component: Layout,
      beforeEnter: ifAuthenticated,
      children: [
        {
          path: 'task-list',
          name: 'TaskList',
          component: () => import('@/components/tasks/TaskList.vue'),
          beforeEnter: ifAuthenticated,
        },
      ],
    },
    {
      path: '/',
      component: DashboardLayout,
      beforeEnter: ifAuthenticated,
      children: [
        {
          path: 'settings',
          name: 'Settings',
          component: () => import('@/components/settings/Settings.vue'),
          beforeEnter: ifAuthenticated,
        },
      ],
    },
    {
      path: '/login',
      component: AuthLayout,
      beforeEnter: ifNotAuthenticated,
      children: [
        {
          path: '',
          name: 'News',
          component: () => import('@/components/info/News.vue'),
          beforeEnter: ifNotAuthenticated,
        },
        {
          path: '/about',
          name: 'AboutSite',
          component: () => import('@/components/info/AboutSite.vue'),
          beforeEnter: ifNotAuthenticated,
        },
      ],
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
    {
      path: '/logout',
      name: 'Logout',
      component: Logout,
      beforeEnter: ifAuthenticated,
    },
  ],
});

export default router;
