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

/**
 * Define index routes.
 * This contain child routes. Please refer other modules.
 */
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

/**
 * Pre process to start routing. You can set redirect without opening page.
 * [about args]
 * to: requested URL.
 * from: previous router.(only when requested from Vue)
 * next: callback function.
 */
router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // arr.reduce((accumulater, currentValue) => {...}, initialValue );
    // [args] "accumulater" is accumulated value. "currenValue" is arr[index] .
    // Ex: [1,2,3].reduce( (acc, elem) => acc+elem ) is 1+2+3 -> result is 6.
    let reducer = (acc, cur) => {
      // Check cur.meta.guard is existing. 
      if (Object.prototype.hasOwnProperty.call(cur.meta, 'guard')) {
        // If there is cur.meta.guard( = to.matched[i].meta.guard ) , append it to acc.
        return [...acc, cur.meta.guard];
      } else {
        return acc;
      }
    };
    // collect to.matched[i].meta.guard to simple array.
    let guards = to.matched.reduce(reducer, []);
    // Check current guards in availableGuards and get loginRoute.
    let loginRoute = guards[0] === '' ? availableGuards.default.loginRoute : availableGuards[guards[0]].loginRoute;

    // Check auth.
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
