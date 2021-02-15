import auth from "@services/auth";
import router from "@router";

const state = () => ({
  isLoading: false,
  isAuthenticated: false,
  username: "",
  errorLoginMessage: ""
});

const getters = {};

const actions = {
  async login({ commit }, credentials) {
    try {
      commit("setLoading", true);
      const res = await auth.login(credentials);
      if (res.status) {
        let user = {
          username: res.username
        };
        commit("login", user);
        let redirect = router.currentRoute.query.redirect;
        if (typeof redirect !== "undefined") {
          router.push(redirect);
        } else {
          router.push({ name: "home" });
        }
      } else {
        commit("setErrorLoginMessage", res.messages);
      }
    } catch (err) {
      console.log(err);
    } finally {
      commit("setLoading", false);
    }
  },

  async logout({ commit }) {
    try {
      const res = await auth.logout();
      if (res.status) {
        commit("logout");
        router.push({ name: "login" });
      } else {
        // show error
      }
    } catch (err) {
      throw new Error(err);
    }
  },

  async checkAuth({ state, commit }) {
    if (!state.isAuthenticated) {
      commit("global/setLoadingPage", true, { root: true });
      try {
        const res = await auth.checkAuth();
        if (res.data.status) {
          let user = {
            username: res.data.username
          };
          commit("login", user);
        }
      } catch (err) {
        console.log(err);
      } finally {
        commit("global/setLoadingPage", false, { root: true });
      }
    }
  }
};

const mutations = {
  login(state, { username }) {
    state.isAuthenticated = true;
    state.username = username;
  },

  logout(state) {
    state.isAuthenticated = false;
    state.username = "";
  },

  setLoading(state, isLoading) {
    state.isLoading = isLoading;
  },

  setErrorLoginMessage(state, message) {
    state.errorLoginMessage = message;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
