import vuexStore from '@/store';
export const convArrToObj = function(arr, keyBy = 'value') {
  return arr.reduce(function(obj, next) {
    let { [keyBy]: index, ...rest } = next;
    obj[index] = rest;
    return obj;
  }, {});
};

export const pushNotif = function(msg, type) {
  let notif = {
    text: msg,
    isOpen: true,
    color: type,
    multiLine: true,
  };
  vuexStore.commit('global/setNotification', notif);
};
