import _ from 'lodash';

export default {

  /**
   * Return a function that applies a function
   * to an object's key.
   *
   * @param {Object} object
   * @param {String} key
   * @param {Function} fn
   * @return {Function}
   */
  keySetter(key, fn) {
    return function(object) {
      let obj = _.clone(object);
      obj[key] = fn(object[key]);
      return obj;
    }
  }
};
