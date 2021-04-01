import auth from '@services/auth';
import router from '@router';

const defaultAuthInfo = function() {
  return {
    status: false,
    guard: '',
    username: '',
    role: '',
  };
};

export const guards = {
  default: {
    loginRoute: 'login',
    homeRoute: 'home',
  },
  admin: {
    loginRoute: 'adminLogin',
    homeRoute: 'admin_home',
  },
};

const state = () => ({
  isLoading: false,
  info: defaultAuthInfo(),
  errorLoginMessage: '',
});

const getters = {};

const actions = {
  async login({ commit }, { credentials, guard = '' }) {
    let homeRoute = guard === '' ? guards.default.homeRoute : guards[guard].homeRoute;
    try {
      commit('setLoading', true);
      const authInfo = await auth.login(credentials, guard);
      if (authInfo.status) {
        commit('login', authInfo);
        let redirect = router.currentRoute.query.redirect;
        if (typeof redirect !== 'undefined') {
          router.push(redirect);
        } else {
          router.push({ name: homeRoute });
        }
      } else {
        commit('setErrorLoginMessage', authInfo.messages);
      }
    } catch (err) {
      console.log(err);
    } finally {
      commit('setLoading', false);
    }
  },

  async logout({ commit, state }) {
    let guard = state.info.guard;
    let loginRoute = guard === '' ? guards.default.loginRoute : guards[guard].loginRoute;
    try {
      const res = await auth.logout(guard);
      if (res.status) {
        commit('logout');
        router.push({ name: loginRoute });
      } else {
        // show error
      }
    } catch (err) {
      throw new Error(err);
    }
  },

  async checkAuth({ state, commit }) {
    if (!state.info.status) {
      commit('global/setLoadingPage', true, { root: true });
      try {
        const authInfo = await auth.checkAuth();
        console.log(authInfo);
        if (authInfo.status) {
          commit('login', authInfo);
        }
      } catch (err) {
        console.log(err);
      } finally {
        commit('global/setLoadingPage', false, { root: true });
      }
    }
  },
};

const mutations = {
  login(state, { status, guard, username, role }) {
    state.info.status = status;
    state.info.username = username;
    state.info.guard = guard;
    state.info.role = role;
  },

  logout(state) {
    let guard = state.info.guard;
    state.info = defaultAuthInfo();
    state.info.guard = guard;
  },

  setLoading(state, isLoading) {
    state.isLoading = isLoading;
  },

  setErrorLoginMessage(state, message) {
    state.errorLoginMessage = message;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
