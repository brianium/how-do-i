/**
 * Conditionally invoke a function
 *
 * @param {Boolean} bool
 * @param {Function} func
 */
export function invokeIf(bool, func /** arguments */) {
  if (!!bool) {
    return func.apply(null, Array.prototype.slice.call(arguments, 2));
  }
}
