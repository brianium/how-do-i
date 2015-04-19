import speech from './speech';
import auth from './auth';
import dom from './dom';
import fn from './functions';
import _ from 'lodash';

const CLIENT_ID = '557105245399-h8k3tjrrtqc3nbvhbm4u8fr7fkre44i7.apps.googleusercontent.com';
const REDIRECT_URI = 'http://localhost:8000';

/**
 * This function is invoked when an access_token is returned.
 *
 * @param {String} token
 */
const authorized = function(token) {
  alert(token);
};

/**
 * Run the application
 */
let run = _.flow(
  dom.appender(document.body, dom.createElement('a', {href: auth.link(CLIENT_ID, REDIRECT_URI)}, 'Login')),
  auth.token,
  token => fn.invokeIf(!!token, authorized, token)
);

document.addEventListener('DOMContentLoaded', run);
