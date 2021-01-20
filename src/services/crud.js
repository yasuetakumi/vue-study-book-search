import Vue from "vue";
import vuexStore from "@/store";

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
    console.log(err);
    throw new Error(err);
  }
};
export const getForm = async function(url) {
  try {
    const res = await Vue.axios.get(url);
    if (res.status) {
      return res.data.data;
    }
  } catch (err) {
    throw new Error(err);
  }
};

export const show = async function(url) {
  try {
    const res = await Vue.axios.get(url);
    if (res.status) {
      return res.data.data;
    }
  } catch (err) {
    console.log(err);
    throw new Error(err);
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
    if (err.response.data) {
      pushNotif(err.response.data.message, "error");
    } else {
      throw new Error(err);
    }
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
    if (err.response.data) {
      pushNotif(err.response.data.message, "error");
    } else {
      throw new Error(err);
    }
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
    if (err.response.data) {
      pushNotif(err.response.data.message, "error");
    } else {
      throw new Error(err);
    }
  }
};
