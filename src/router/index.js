import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import AppBase from '@views/main/_layouts/AppBase';
import Dashboard from '@views/main/Dashboard';
import usersRoutes from './modules/user';
import dummyMeetingsRoutes from './modules/dummy-meeting';
import errors from './errors';
import auth from './auth';

import AdminAppBase from '@views/admin/_layouts/AppBase';
import AdminDashboard from '@views/admin/Dashboard';

import { guards as availableGuards } from '@/store/modules/auth';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: AppBase,
    meta: {
      requiresAuth: true,
      guard: '',
      main: true,
    },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: Dashboard,
      },
      ...usersRoutes,
      ...dummyMeetingsRoutes,
    ],
  },
  {
    path: '/admin',
    name: 'admin_home',
    component: AdminAppBase,
    meta: {
      requiresAuth: true,
      guard: 'admin',
      main: true,
    },
    children: [
      {
        path: 'dashboard',
        name: 'admin.dashboard',
        component: AdminDashboard,
      },
    ],
  },
  ...auth,
  ...errors,
  {
    name: 'catch_all',
    path: '*',
    redirect: { name: 'home' },
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    let reducer = (acc, cur) => {
      if (Object.prototype.hasOwnProperty.call(cur.meta, 'guard')) {
        return [...acc, cur.meta.guard];
      } else {
        return acc;
      }
    };
    let guards = to.matched.reduce(reducer, []);
    let loginRoute = guards[0] === '' ? availableGuards.default.loginRoute : availableGuards[guards[0]].loginRoute;
    await store.dispatch('auth/checkAuth');
    const authInfo = store.state.auth.info;
    if (!authInfo.status) {
      // if not authenticated, redirect to correct login page
      next({ name: loginRoute });
    } else {
      // if isAuthenticated and route.guard matched with authInfo.guard
      if (guards.some(guard => guard === authInfo.guard)) {
        next();
      } else {
        next({ name: 'errorNotFound' });
      }
    }
  } else {
    // for route that does not require auth
    next();
  }
});

export default router;
