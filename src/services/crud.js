import Vue from 'vue';
import axios from 'axios';
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
    let errors = err.response.data.errors;
    if(errors){
      return errors;
    }else{
      throw handleApiError(err, true);
    }
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
    let errors = err.response.data.errors;
    if(errors){
      return errors;
    }else{
      throw handleApiError(err, true);
    }
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

export const download = async function(url, options) {
  try {
    let postConfig = {
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
      responseType: 'blob',
    };

    const params = new URLSearchParams(options);
    const res = await Vue.axios.get(`${url}?${params.toString()}`, postConfig);
    if (res.status) {
      return res;
    }
    
  } catch (err) {
    throw handleApiError(err);
  }
};

export const importCsv = async function(url, payload) {
  try {
    let postConfig = {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    };
    const res = await Vue.axios.post(url, payload, postConfig);
    if (res.status) {
      pushNotif(res.data.message, 'success');
      return true;
    }
  } catch (err) {
    if (typeof err.response.data.errors.file != 'undefined') {
      pushNotif(err.response.data.errors.file[0], 'error');
    } else if (typeof err.response.data.errors.errors != 'undefined') {
      pushNotif(err.response.data.errors.errors[0], 'error');
    } else {
      pushNotif(err.response.data.message, 'error');
    }
    // throw handleApiError(err, false);
  }
};
