import Vue from "vue";
import VueRouter from "vue-router";
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
    component: Login
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
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const api = process.env.VUE_APP_API_DOMAIN + "/api/auth-check";
    const isAuthenticated = await Vue.axios.get(api);
    console.log(isAuthenticated);
    if (!isAuthenticated.data.status) {
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
