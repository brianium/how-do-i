import auth from './auth';
import dom from './dom';
import fn from './functions';
import speech from './speech';
import yt from './youtube';
import _ from 'lodash';

const CLIENT_ID = '557105245399-h8k3tjrrtqc3nbvhbm4u8fr7fkre44i7.apps.googleusercontent.com';
const REDIRECT_URI = 'http://localhost:8000';
const VIDEO_SEARCH = /how[\s]do[\s]i/i;

export default {

  /**
   * Return an application running function. The passed in
   * function is invoked with a token if found.
   *
   * @param {Function} authorized
   * @return {Function}
   */
  run(authorized) {
    return _.flow(
      () => auth.link(CLIENT_ID, REDIRECT_URI),
      link => document.getElementById('login-link').href = link,
      auth.token,
      token => fn.invokeIf(!!token, authorized, token)
    );
  },

  /**
   * A listener for search terms
   *
   * @param {String} token
   * @param {Object} result
   * @param {Event} event
   */
  onResult(token, result, event) {
    if (VIDEO_SEARCH.test(result.transcript)) {
      let term = result.transcript.replace(VIDEO_SEARCH, '').trim();
      yt.query(token, `how to ${term}`)
        .then(result => result.items[0])
        .then(video => dom.first('#video').src = yt.videoUrl(video))
        .then(() => speech.stop(event.target));
    }
  }
};
