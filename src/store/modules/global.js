import i18n, { availableLangs } from "@/localization";

const state = () => ({
  locale: i18n.locale,
  languages: availableLangs,
  loadingPage: false,
  notification: {
    text: "",
    isOpen: false,
    color: "success",
    multiLine: false
  }
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
    state.loadingPage = isLoading;
  },
  setNotification(state, notif) {
    state.notification = notif;
  },
  closeNotification(state) {
    state.notification.isOpen = false;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
