import Vue from "vue";

export const getAllUsers = async function(options) {
  try {
    const params = new URLSearchParams(options);
    const res = await Vue.axios.get(`users?${params.toString()}`);
    if (res.status) {
      return res.data;
    }
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export const storeUser = async function(url, payload) {
  try {
    const res = await Vue.axios.post(url, payload);
    if (res.status) {
      return res.data;
    }
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};
