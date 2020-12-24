import store from "../index";
import i18n, { availableLangs } from "@/localization";

const state = () => ({
  locale: "ja",
  languages: availableLangs,
  loadingPage: false,
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
      icon: "mdi-home-city",
      hasChildren: false
    },
    {
      id: "users",
      label: "general.nav.users",
      icon: "mdi-account-group-outline",
      hasChildren: true,
      children: [
        {
          id: "users.datatable",
          label: "general.crud.list",
          route: { name: "users" },
          hasChildren: false
        },
        {
          id: "users.form",
          label: "general.crud.createNew",
          route: { name: "users.create" },
          hasChildren: false
        }
      ]
    }
  ],
  drawerOpen: true
});

const getters = {};

const actions = {
  setLocale({ commit }, locale) {
    i18n.locale = locale;
    commit("setLocale", locale);
  }
};

const mutations = {
  toggleDrawer(state, drawerOpen) {
    state.drawerOpen = drawerOpen;
  },
  setLocale(state, locale) {
    state.locale = locale;
  },
  setLoadingPage(state, isLoading) {
    state.loadingPage = isLoading;
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
