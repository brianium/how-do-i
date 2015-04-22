import * as auth from './auth';

import {first} from './dom';
import {invokeIf} from './functions';
import {recognize, stop} from './speech';
import {flow, partial} from 'lodash';

const CLIENT_ID = '557105245399-h8k3tjrrtqc3nbvhbm4u8fr7fkre44i7.apps.googleusercontent.com';
const REDIRECT_URI = 'http://localhost:8000';
const VIDEO_SEARCH = /how[\s]do[\s]i/i;

/**
 * Return a result listener that is invoked if the result transcript
 * contains the how do i pattern. The listener will be invoked with the
 * term being searched for.
 *
 * @param {Function} listener
 * @return {Function}
 */
function result(listener, token) {
  return function(result, event) {
    let term = result.transcript.replace(VIDEO_SEARCH, '').trim();
    invokeIf(VIDEO_SEARCH.test(result.transcript), listener, token, term, event);
  };
}

/**
 * Function run when the user is authenticated.
 *
 * @param {String} token
 */
export function run(token, listener) {
  first('.content-unauthorized').classList.add('hidden');
  first('.content-authorized').classList.remove('hidden');
  recognize(result(listener, token));
}

/**
 * Return an authorized function. The passed in
 * function is invoked with a token when ready.
 *
 * @param {Function} ready
 * @return {Function}
 */
export function authorized(listener) {
  return flow(
    partial(auth.link, CLIENT_ID, REDIRECT_URI),
    link => first('#login-link').href = link,
    auth.token,
    token => invokeIf(!!token, partial(run, token, listener), token)
  );
}
