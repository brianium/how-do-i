import {run, onResult} from './app';
import {first} from './dom';
import {listen, stream, confident} from './speech';

/**
 * Run the application as soon as dom content has loaded
 */
document.addEventListener('DOMContentLoaded', run(token => {
  first('.content-unauthorized').classList.add('hidden');
  first('.content-authorized').classList.remove('hidden');

  let listener = onResult.bind(null, token);
  listen(stream(), 'result', confident(listener));
}));
