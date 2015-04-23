import {authorized} from './app';
import {stop} from './speech';
import {query, videoUrl, relevant} from './youtube';
import {first} from './dom';

/**
 * Run the application as soon as dom content has loaded
 */
document.addEventListener('DOMContentLoaded', authorized(function main(token, term, event) {
  query(token, `how to ${term}`)
    .then(relevant)
    .then(video => first('#video').src = videoUrl(video))
    .then(stop.bind(null, event.target));
}));
