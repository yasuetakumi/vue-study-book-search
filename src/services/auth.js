import Vue from "vue";

const cookieAuth = {
  async login(credentials) {
    try {
      const csrfCookie = await Vue.axios.get("sanctum/csrf-cookie");
      if (csrfCookie) {
        const login = await Vue.axios.post("/user/login", credentials);
        if (login.data.status) {
          return {
            status: true,
            username: login.data.username
          };
        } else {
          throw new Error("Failed to login");
        }
      }
    } catch (err) {
      return {
        status: false,
        messages: err.message
      };
    }
  },

  async logout() {
    try {
      const res = await Vue.axios.get("/user/logout");
      if (res.status) {
        console.log(res);
        return {
          status: true
        };
      } else {
        return {
          status: false,
          message: "Error logging out"
        };
      }
    } catch (err) {
      return {
        status: false,
        message: err.message
      };
    }
  },

  checkAuth() {
    return Vue.axios.get("/auth-check");
  }
};

export default cookieAuth;

// @TODO: implement different auth mechanism
