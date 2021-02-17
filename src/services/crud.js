import Vue from 'vue';
import { pushNotif } from '@/helpers';
import { handleApiError } from '@/plugins/axios';

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
      pushNotif(res.data.message, 'success');
      return res.data.data || true;
    }
  } catch (err) {
    throw handleApiError(err, true);
  }
};

export const update = async function(url, payload) {
  try {
    const res = await Vue.axios.post(url, payload);
    if (res.status) {
      pushNotif(res.data.message, 'success');
      return res.data.data || true;
    }
  } catch (err) {
    throw handleApiError(err, true);
  }
};

export const destroy = async function(url) {
  try {
    const res = await Vue.axios.delete(url);
    if (res.status) {
      pushNotif(res.data.message, 'success');
      return true;
    }
  } catch (err) {
    throw handleApiError(err, true);
  }
};
