import * as auth from './auth';
import * as yt from './youtube';

import {first} from './dom';
import {invokeIf} from './functions';
import {recognize, stop} from './speech';
import {flow, partial} from 'lodash';

const CLIENT_ID = '557105245399-h8k3tjrrtqc3nbvhbm4u8fr7fkre44i7.apps.googleusercontent.com';
const REDIRECT_URI = 'http://localhost:8000';
const VIDEO_SEARCH = /how[\s]do[\s]i/i;

/**
 * Return an authorized function. The passed in
 * function is invoked with a token when ready.
 *
 * @param {Function} ready
 * @return {Function}
 */
export function authorized(ready) {
  return flow(
    () => auth.link(CLIENT_ID, REDIRECT_URI),
    link => first('#login-link').href = link,
    auth.token,
    token => invokeIf(!!token, ready, token)
  );
}

/**
 * A listener for search terms
 *
 * @param {String} token
 * @param {Object} result
 * @param {Event} event
 */
export function video(token, result, event) {
  if (VIDEO_SEARCH.test(result.transcript)) {
    let term = result.transcript.replace(VIDEO_SEARCH, '').trim();
    yt.query(token, `how to ${term}`)
      .then(result => result.items[0])
      .then(video => first('#video').src = yt.videoUrl(video))
      .then(() => stop(event.target));
  }
}

/**
 * Function run when the user is authenticated.
 *
 * @param {String} token
 */
export function run(token) {
  first('.content-unauthorized').classList.add('hidden');
  first('.content-authorized').classList.remove('hidden');
  recognize(partial(video, token));
}
