import _ from 'lodash';

const TOKEN_PATTERN = /#?(access_token)=([^&]+)&(token_type)=([\w]+)&(expires_in)=([\d]+)/;

/**
 * Append a a querystring parameter
 *
 * @param {String} queryString
 * @param {String} value
 * @param {String} param
 * @return {String}
 */
function appendParam(queryString, value, param) {
  return queryString + `${param}=${encodeURIComponent(value)}&`;
}

/**
 * Return a function with a pre applied start point for slicing
 * an array
 *
 * @param {Number} start
 * @return {Function}
 */
function slicer(start) {
  return function (array) {
    return array.slice(start);
  }
}

/**
 * Chunk an array in groups of 2
 *
 * @param {Array} array
 * @return {Array}
 */
const chunk2 = _.partialRight(_.chunk, 2).bind(_);

/**
 * Return a function that applies a function
 * to an object's key.
 *
 * @param {Object} object
 * @param {String} key
 * @param {Function} fn
 * @return {Function}
 */
function keySetter(key, fn) {
  return function(object) {
    let obj = _.clone(object);
    obj[key] = fn(object[key]);
    return obj;
  }
}

let auth =  {

  /**
   * Get the login link
   *
   * @param {String} clientID
   * @param {String} redirectUri
   * @return {String}
   */
  link(clientId, redirectUri) {
    let query = {
      client_id: clientId,
      redirect_uri: redirectUri,
      scope: 'https://www.googleapis.com/auth/youtube',
      response_type: 'token'
    };
    let root = 'https://accounts.google.com/o/oauth2/auth?';
    return root + _.reduce(query, appendParam, '').slice(0, -1);
  }

};

/**
 * Get a token from a hash fragment
 *
 * @param {String} fragment
 * @return {Object}
 */
auth.token = _.flow(
  TOKEN_PATTERN.exec.bind(TOKEN_PATTERN),
  slicer(1),
  chunk2,
  _.zipObject,
  keySetter('expires_in', parseInt)
);

export default auth;
