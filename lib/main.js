import app from './app';
import yt from './youtube';

/**
 * Run the application as soon as dom content has loaded
 */
document.addEventListener('DOMContentLoaded', app.run(token => {
  yt.query(token, 'hello').then(result => {
    let item = result.items[0];

    let iframe = document.createElement('iframe');
    iframe.width = 640;
    iframe.height = 360;
    iframe.src = `http://www.youtube.com/v/${item.id.videoId}?version=3&enablejsapi=1&autoplay=1`

    document.body.appendChild(iframe);
  });
}));
