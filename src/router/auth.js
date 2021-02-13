import Login from "@views/auth/Login";
import AdminLogin from "@views/auth/AdminLogin";
import store from "@/store";
import { guards } from "@/store/modules/auth";

const auth = [
  {
    /*
     * Default login
     */
    path: "/login",
    name: "login",
    component: Login,
    beforeEnter: async (to, from, next) => {
      await store.dispatch("auth/checkAuth");
      const authInfo = store.state.auth.info;
      let homeRoute =
        authInfo.guard === ""
          ? guards.default.homeRoute
          : guards[authInfo.guard].homeRoute;
      if (authInfo.status) {
        next({ name: homeRoute });
      } else {
        next();
      }
    }
  },

  {
    /*
     * Custom login. Use this only if the specification requires login using different
     * user providers. Otherwise, use Role-based authentication
     */
    path: "/admin/login",
    name: "adminLogin",
    component: AdminLogin,
    beforeEnter: async (to, from, next) => {
      await store.dispatch("auth/checkAuth");
      const authInfo = store.state.auth.info;
      let homeRoute =
        authInfo.guard === ""
          ? guards.default.homeRoute
          : guards[authInfo.guard].homeRoute;
      if (authInfo.status) {
        next({ name: homeRoute });
      } else {
        next();
      }
    }
  }
];

export default auth;
