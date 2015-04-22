import {run, video} from './app';
import {first} from './dom';
import {recognize} from './speech';

/**
 * Function run when the user is authenticated.
 *
 * @param {String} token
 */
let start = function(token) {
  first('.content-unauthorized').classList.add('hidden');
  first('.content-authorized').classList.remove('hidden');
  recognize(video.bind(null, token));
}

/**
 * Run the application as soon as dom content has loaded
 */
document.addEventListener('DOMContentLoaded', run(start));
