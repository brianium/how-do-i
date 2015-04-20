import _ from 'lodash';

/**
 * Return a function that applies a function
 * to an object's key.
 *
 * @param {Object} object
 * @param {String} key
 * @param {Function} fn
 * @return {Function}
 */
export function keySetter(key, fn) {
  return function(object) {
    let obj = _.clone(object);
    obj[key] = fn(object[key]);
    return obj;
  }
}
