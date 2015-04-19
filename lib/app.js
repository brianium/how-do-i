import auth from './auth';
import dom from './dom';
import fn from './functions';
import _ from 'lodash';

const CLIENT_ID = '557105245399-h8k3tjrrtqc3nbvhbm4u8fr7fkre44i7.apps.googleusercontent.com';
const REDIRECT_URI = 'http://localhost:8000';

export default {
  run(authorized /** arguments */) {
    return _.flow(
      dom.appender(document.body, dom.createElement('a', {href: auth.link(CLIENT_ID, REDIRECT_URI)}, 'Login')),
      auth.token,
      token => fn.invokeIf(!!token, authorized, token)
    );
  }
}
