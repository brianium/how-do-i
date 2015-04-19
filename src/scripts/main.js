import app from './app';
import dom from './dom';
import speech from './speech';

/**
 * Run the application as soon as dom content has loaded
 */
document.addEventListener('DOMContentLoaded', app.run(token => {
  dom.first('.content-unauthorized').classList.add('hidden');
  dom.first('.content-authorized').classList.remove('hidden');

  let listener = app.onResult.bind(null, token);
  speech.listen(speech.stream(), 'result', speech.confident(listener, 90));
}));
