import Vue from 'vue';
import VueRouter from 'vue-router';
import auth from './auth';

Vue.use(VueRouter);

/**
 * Define index routes.
 * This contain child routes. Please refer other modules.
 */
const routes = [
  ...auth,
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
