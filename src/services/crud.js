import Vue from "vue";
import VueRouter from "vue-router";
import vuexStore from "@/store";
import vueRouter from "@/router";

const { isNavigationFailure } = VueRouter;

const ApiError = function(err) {
  this.isHandled = false;
  this.response = err.response;
};

ApiError.prototype.redirectIfUnauthenticated = function() {
  if (!this.isHandled && this.response.status == 401) {
    vueRouter
      .push({
        name: "login",
        query: { redirect: vueRouter.currentRoute.fullPath }
      })
      .catch(function(failure) {
        if (isNavigationFailure(failure)) {
          // --- Do nothing ---
          /* This sometimes happen when there is another navigation happening
          /  while the current one has not finished yet.
          */
        }
      });
    this.isHandled = true;
    return this;
  } else {
    return this;
  }
};

ApiError.prototype.pushErrorToNotif = function(isPushed) {
  if (!this.isHandled && isPushed && this.response.data.message) {
    pushNotif(this.response.data.message, "error");
    this.isHandled = true;
    return this;
  } else {
    return this;
  }
};

const handleApiError = function(err, isPushedToNotif = false) {
  let remainingErr = new ApiError(err)
    .redirectIfUnauthenticated()
    .pushErrorToNotif(isPushedToNotif);

  return remainingErr;
};

const pushNotif = function(msg, type) {
  let notif = {
    text: msg,
    isOpen: true,
    color: type,
    multiLine: true
  };
  vuexStore.commit("global/setNotification", notif);
};

export const getAll = async function(url, options) {
  try {
    const params = new URLSearchParams(options);
    const res = await Vue.axios.get(`${url}?${params.toString()}`);
    if (res.status) {
      return res.data.data;
    }
  } catch (err) {
    throw handleApiError(err);
  }
};

export const getForm = async function(url) {
  try {
    const res = await Vue.axios.get(url);
    if (res.status) {
      return res.data.data;
    }
  } catch (err) {
    throw handleApiError(err, true);
  }
};

export const show = async function(url) {
  try {
    const res = await Vue.axios.get(url);
    if (res.status) {
      return res.data.data;
    }
  } catch (err) {
    throw handleApiError(err);
  }
};

export const store = async function(url, payload) {
  try {
    const res = await Vue.axios.post(url, payload);
    if (res.status) {
      pushNotif(res.data.message, "success");
      return res.data.data;
    }
  } catch (err) {
    throw handleApiError(err, true);
  }
};

export const update = async function(url, payload) {
  try {
    const res = await Vue.axios.post(url, payload);
    if (res.status) {
      pushNotif(res.data.message, "success");
      return res.data.data;
    }
  } catch (err) {
    throw handleApiError(err, true);
  }
};

export const destroy = async function(url) {
  try {
    const res = await Vue.axios.delete(url);
    if (res.status) {
      pushNotif(res.data.message, "success");
      return true;
    }
  } catch (err) {
    throw handleApiError(err, true);
  }
};
