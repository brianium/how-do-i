import {run, video} from './app';
import {first} from './dom';
import {listen, stream, confident} from './speech';

let start = function(token) {
  first('.content-unauthorized').classList.add('hidden');
  first('.content-authorized').classList.remove('hidden');
  listen(stream(), 'result', confident(video.bind(null, token)));
}

/**
 * Run the application as soon as dom content has loaded
 */
document.addEventListener('DOMContentLoaded', run(start));
