import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import Login from "../views/auth/Login";
import Home from "../views/main/Home";
import Dashboard from "../views/main/Dashboard";
import Users from "../views/main/Users";
import ErrorNotFound from "../views/error/ErrorNotFound";
import ErrorUnexpected from "../views/error/ErrorUnexpected";

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
        path: "dashboard",
        name: "dashboard",
        component: Dashboard
      },
      {
        path: "users",
        name: "users",
        component: Users
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
