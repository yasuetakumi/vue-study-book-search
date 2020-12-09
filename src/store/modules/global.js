import store from "../index";

const state = () => ({
  isLoadingPage: false,
  accountMenus: [
    {
      title: "Logout",
      icon: "mdi-logout",
      action: () => {
        store.dispatch("auth/logout");
      }
    }
  ]
});

const getters = {};

const actions = {};

const mutations = {
  setLoadingPage(state, isLoading) {
    state.isLoadingPage = isLoading;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
