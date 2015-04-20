import _ from 'lodash';

/**
 * Return a function with a pre applied start point for slicing
 * an array
 *
 * @param {Number} start
 * @return {Function}
 */
export function slicer(start) {
  return function (array) {
    return array.slice(start);
  }
}

/**
 * Returns a chunk function for grouping
 *
 * @param {Number} chunk size
 * @return {Function}
 */
export function chunker(size) {
  return function(array) {
    return _.chunk(array, size);
  }
}
