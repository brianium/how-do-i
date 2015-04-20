import _ from 'lodash';
import {slicer, chunker} from '../array';
import obj from '../object';
import {maybe} from '../monad/maybe';
import Cookies from 'cookies-js';

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
 * Converts a fragment matched against TOKEN_PATTERN
 * into a JWT object
 *
 * @param {Array} matches
 * @return {Object}
 */
const matchToJWT = _.flow(
  slicer(1),
  chunker(2),
  _.zipObject,
  obj.keySetter('expires_in', parseInt)
);

/**
 * Get the login link
 *
 * @param {String} clientID
 * @param {String} redirectUri
 * @return {String}
 */
export function link(clientId, redirectUri) {
  let query = {
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: 'https://www.googleapis.com/auth/youtube',
    response_type: 'token'
  };
  let root = 'https://accounts.google.com/o/oauth2/auth?';
  return root + _.reduce(query, appendParam, '').slice(0, -1);
}

/**
 * Get a token from a hash fragment
 *
 * @param {String} fragment
 * @return {Object}
 */
export function parse(fragment) {
  let result = TOKEN_PATTERN.exec(fragment);
  return maybe(result, !!!result)
    .bind(matchToJWT)
    .map(jwt => jwt);
}

/**
 * Get an auth token from a fragment or a cookie
 *
 * @return {String}
 */
export const token = _.flow(
  parse.bind(null, window.location.hash),
  token => maybe(token, !!!token).map(jwt => Cookies.set('access_token', jwt.access_token, {
    expires: jwt.expires_in
  })),
  () => Cookies.get('access_token')
);
