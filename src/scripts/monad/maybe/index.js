/**
 * Bind a function to the maybe monad
 *
 * @param {Object} monad
 * @param {Function} transform
 * @return {Object}
 */
function bind(monad, transform) {
  if (monad.isEmpty) {
    return NOTHING;
  }
  let result = transform(monad.value);
  return maybe(result , !!!result);
}

/**
 * Map a non empty monad into a value
 *
 * @param {Function} fn
 */
function map(monad, fn) {
  if (! monad.isEmpty) {
    return fn(monad.value);
  }
  return undefined;
}

/**
 * Create a new maybe monad
 *
 * @return {Object}
 */
export function maybe(value, isEmpty) {
  let monad = {
    value,
    isEmpty
  };
  monad.bind = bind.bind(null, monad);
  monad.map = map.bind(null, monad);
  return monad;
};

export const NOTHING = maybe(null, true);
