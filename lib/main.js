import app from './app';

/**
 * Run the application as soon as dom content has loaded
 */
document.addEventListener('DOMContentLoaded', app.run(token => {
  fetch(`https://www.googleapis.com/youtube/v3/search?access_token=${token}&part=id,snippet&q=hello&type=video&videoEmbeddable=true`, {mode: 'cors'})
    .then(resp => resp.text())
    .then(JSON.parse)
    .then(result => {
      let item = result.items[0];

      let iframe = document.createElement('iframe');
      iframe.width = 640;
      iframe.height = 360;
      iframe.src = `http://www.youtube.com/v/${item.id.videoId}?version=3&enablejsapi=1&autoplay=1`

      document.body.appendChild(iframe);
    });
}));
