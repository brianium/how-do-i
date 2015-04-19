import app from './app';
import yt from './youtube';
import dom from './dom';

/**
 * Run the application as soon as dom content has loaded
 */
document.addEventListener('DOMContentLoaded', app.run(token => {
  document.getElementById('login-link').classList.add('hidden');
  yt.query(token, 'hello')
    .then(result => result.items[0])
    .then(item => dom.createElement('iframe', {width: 640, height: 360, src: yt.videoUrl(item)}))
    .then(document.body.appendChild.bind(document.body));
}));
