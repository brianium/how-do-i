import app from './app';

/**
 * Run the application as soon as dom content has loaded
 */
document.addEventListener('DOMContentLoaded', app.run(token => {
  fetch(`https://www.googleapis.com/youtube/v3/search?access_token=${token}&part=id,snippet&q=hello`, {mode: 'cors'})
    .then(resp => resp.text())
    .then(JSON.parse)
    .then(result => console.log(result));
}));
