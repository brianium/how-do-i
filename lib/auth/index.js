import _ from 'lodash';
import arr from '../array';
import obj from '../object';

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
  arr.slicer(1),
  arr.chunk(2),
  _.zipObject,
  obj.keySetter('expires_in', parseInt)
);

export default auth;
