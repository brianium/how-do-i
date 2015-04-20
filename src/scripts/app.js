import * as auth from './auth';
import * as yt from './youtube';

import {first} from './dom';
import {invokeIf} from './functions';
import {stop} from './speech';
import {flow} from 'lodash';

const CLIENT_ID = '557105245399-h8k3tjrrtqc3nbvhbm4u8fr7fkre44i7.apps.googleusercontent.com';
const REDIRECT_URI = 'http://localhost:8000';
const VIDEO_SEARCH = /how[\s]do[\s]i/i;

/**
 * Return an application running function. The passed in
 * function is invoked with a token if found.
 *
 * @param {Function} authorized
 * @return {Function}
 */
export function run(authorized) {
  return flow(
    () => auth.link(CLIENT_ID, REDIRECT_URI),
    link => first('#login-link').href = link,
    auth.token,
    token => invokeIf(!!token, authorized, token)
  );
}

/**
 * A listener for search terms
 *
 * @param {String} token
 * @param {Object} result
 * @param {Event} event
 */
export function onResult(token, result, event) {
  if (VIDEO_SEARCH.test(result.transcript)) {
    let term = result.transcript.replace(VIDEO_SEARCH, '').trim();
    yt.query(token, `how to ${term}`)
      .then(result => result.items[0])
      .then(video => first('#video').src = yt.videoUrl(video))
      .then(() => stop(event.target));
  }
}
