import {authorized} from './app';
import {stop} from './speech';
import {query, videoUrl} from './youtube';
import {first} from './dom';

/**
 * Run the application as soon as dom content has loaded
 */
document.addEventListener('DOMContentLoaded', authorized(function(token, term, event) {
  query(token, `how to ${term}`)
    .then(result => result.items[0])
    .then(video => first('#video').src = videoUrl(video))
    .then(stop.bind(null, event.target));
}));
