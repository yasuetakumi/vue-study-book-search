import Vue from 'vue';

/*
 * A cookie based auth using native laravel session
 */
const cookieAuth = {
  async login(credentials, guard) {
    let loginEndpoint = guard !== '' ? `${guard}/login` : 'login';
    try {
      const csrfCookie = await Vue.axios.get('sanctum/csrf-cookie');
      if (csrfCookie) {
        const login = await Vue.axios.post(loginEndpoint, credentials);
        if (login.data.status) {
          return login.data;
        } else {
          throw new Error('Failed to login');
        }
      }
    } catch (err) {
      return {
        status: false,
        messages: err.message,
      };
    }
  },

  async logout(guard) {
    let logoutEndpoint = guard !== '' ? `${guard}/logout` : 'logout';
    try {
      const res = await Vue.axios.get(logoutEndpoint);
      if (res.status) {
        console.log(res);
        return {
          status: true,
        };
      } else {
        return {
          status: false,
          message: 'Error logging out',
        };
      }
    } catch (err) {
      return {
        status: false,
        message: err.message,
      };
    }
  },

  async checkAuth() {
    try {
      const res = await Vue.axios.get('/auth-check');
      return res.data;
    } catch (err) {
      return {
        status: false,
        message: err.message,
      };
    }
  },
};

export default cookieAuth;

// @TODO: implement different auth mechanism
