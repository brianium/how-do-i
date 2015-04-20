/**
 * Return a uri for making a youtube query
 *
 * @param {String} token
 * @param {String} query
 * @return {String}
 */
export function uri(token, query) {
    return `https://www.googleapis.com/youtube/v3/search?access_token=${token}&part=id,snippet&q=${query}&type=video&videoEmbeddable=true`
}

/**
 * Return a promise with the JSON result of a youtube query
 *
 * @param {String} token
 * @param {String} query
 * @return {Promise}
 */
export function query(token, query) {
  return fetch(uri(token, query))
    .then(resp => resp.text())
    .then(JSON.parse);
}

/**
 * Return a video url used for embedding a
 * video from youtube.
 *
 * @param {Object} video
 * @return {String}
 */
export function videoUrl(video) {
  return `http://www.youtube.com/v/${video.id.videoId}?version=3&enablejsapi=1&autoplay=1`;
}
