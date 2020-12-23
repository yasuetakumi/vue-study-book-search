import Login from "@views/auth/Login";
import store from "@/store";

const auth = [
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
  }
];

export default auth;
