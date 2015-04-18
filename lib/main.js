import speech from './speech';
import auth from './auth';
import dom from './dom';
import _ from 'lodash';

const CLIENT_ID = '557105245399-h8k3tjrrtqc3nbvhbm4u8fr7fkre44i7.apps.googleusercontent.com';
const REDIRECT_URI = 'http://localhost:8000';

/**
 * Start the speech recognition
 */
let startSpeech = _.flow(
  speech.create,
  speech.streamable,
  _.partialRight(speech.listen, 'result', console.log.bind(console)),
  speech.start
);

/**
 * Run the application
 */
let run = _.flow(
  dom.appender(document.body, dom.createElement('a', {href: auth.link(CLIENT_ID, REDIRECT_URI)}, 'Login'))
);

document.addEventListener('DOMContentLoaded', run);
