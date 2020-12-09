import store from "../index";
import i18n, { availableLangs } from "../../localization";

const state = () => ({
  locale: "ja",
  languages: availableLangs,
  isLoadingPage: false,
  accountMenus: [
    {
      id: "logout",
      title: "general.auth.logout",
      icon: "mdi-logout",
      action: () => {
        store.dispatch("auth/logout");
      }
    }
  ],
  navLeftMenus: [
    {
      id: "dashboard",
      label: "general.nav.dashboard",
      route: "dashboard",
      icon: "mdi-home-city"
    },
    {
      id: "users",
      label: "general.nav.users",
      route: "users",
      icon: "mdi-account-group-outline"
    }
  ],
  activeNavMenu: "dashboard" // @TODO: correct this
});

const getters = {};

const actions = {
  setLocale({ commit }, locale) {
    i18n.locale = locale;
    commit("setLocale", locale);
  }
};

const mutations = {
  setLocale(state, locale) {
    state.locale = locale;
  },
  setLoadingPage(state, isLoading) {
    state.isLoadingPage = isLoading;
  },
  setActiveNavMenu(state, route) {
    state.activeNavMenu = route;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
