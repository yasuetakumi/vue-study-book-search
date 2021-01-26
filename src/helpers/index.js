export const convArrToObj = function(arr, keyBy = "value") {
  return arr.reduce(function(obj, next) {
    let { [keyBy]: index, ...rest } = next;
    obj[index] = rest;
    return obj;
  }, {});
};
