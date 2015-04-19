import auth from './auth';
import dom from './dom';
import fn from './functions';
import _ from 'lodash';

const CLIENT_ID = '557105245399-h8k3tjrrtqc3nbvhbm4u8fr7fkre44i7.apps.googleusercontent.com';
const REDIRECT_URI = 'http://localhost:8000';

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
  }
}
