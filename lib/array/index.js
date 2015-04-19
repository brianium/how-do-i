import _ from 'lodash';

export default {
  /**
   * Return a function with a pre applied start point for slicing
   * an array
   *
   * @param {Number} start
   * @return {Function}
   */
  slicer(start) {
    return function (array) {
      return array.slice(start);
    }
  },

  /**
   * Returns a chunk function for grouping
   *
   * @param {Number} chunk size
   * @return {Function}
   */
  chunk(size) {
    return function(array) {
      return _.chunk(array, size);
    }
  }
};
