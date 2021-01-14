import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import AppBase from "@views/main/layouts/AppBase";
import Dashboard from "@views/main/Dashboard";
import users from "./users";
import dummyMeetings from "./dummy-meetings";
import errors from "./errors";
import auth from "./auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: AppBase,
    meta: {
      requiresAuth: true,
      main: true
    },
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard
      },
      ...users,
      ...dummyMeetings
    ]
  },
  ...auth,
  ...errors,
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
