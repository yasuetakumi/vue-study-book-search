import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import Home from "../views/layouts/Home";
import Login from "../views/layouts/Login";
import ErrorNotFound from "../views/layouts/ErrorNotFound";
import ErrorUnexpected from "../views/layouts/ErrorUnexpected";
import About from "../views/About.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: "/dashboard",
        name: "dashboard"
      },
      {
        path: "/about",
        name: "about",
        component: About
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    beforeEnter: async (to, from, next) => {
      await store.dispatch("auth/checkAuth");
      const isAuthenticated = store.state.auth.isAuthenticated;
      if (isAuthenticated) {
        next({ name: "home" });
      } else {
        next();
      }
    }
  },
  {
    path: "/404",
    name: "errorNotFound",
    component: ErrorNotFound
  },
  {
    path: "/500",
    name: "errorUnexpected",
    component: ErrorUnexpected
  },
  {
    name: "catchAll",
    path: "*",
    redirect: { name: "home" }
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    await store.dispatch("auth/checkAuth");
    const isAuthenticated = store.state.auth.isAuthenticated;
    if (!isAuthenticated) {
      next({
        name: "login",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
