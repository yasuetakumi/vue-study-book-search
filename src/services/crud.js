import Vue from "vue";

export const getAll = async function(url, options) {
  try {
    const params = new URLSearchParams(options);
    const res = await Vue.axios.get(`${url}?${params.toString()}`);
    if (res.status) {
      return res.data;
    }
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export const show = async function(url) {
  try {
    const res = await Vue.axios.get(url);
    if (res.status) {
      return res.data;
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
      return res.data;
    }
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export const update = async function(url, payload) {
  try {
    const res = await Vue.axios.put(url, payload);
    if (res.status) {
      return res.data;
    }
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export const destroy = async function(url) {
  try {
    const res = await Vue.axios.delete(url);
    if (res.status) {
      return true;
    }
  } catch (err) {
    throw new Error(err);
  }
};
