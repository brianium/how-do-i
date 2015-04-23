/**
 * Return a uri for making a youtube query
 *
 * @param {String} token
 * @param {String} query
 * @return {String}
 */
export function uri(token, query) {
    let q = encodeURIComponent(query);
    return `https://www.googleapis.com/youtube/v3/search?access_token=${token}&part=id,snippet&q=${q}&type=video&videoEmbeddable=true`
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
  return `http://www.youtube.com/embed/${video.id.videoId}?version=3&enablejsapi=1&autoplay=1`;
}

/**
 * Return the best result given a pattern
 *
 * @param {RegExp} pattern
 * @param {Object} result1
 * @param {Object} result2
 * @return {Object}
 */
function best(pattern, result1, result2) {
  let first = pattern.test(result1.snippet.title);
  let second = pattern.test(result2.snippet.title);
  return first && !second ? result1 : result2;
}

/**
 * Try to get the most relevant result.
 *
 * @param {Object} result
 * @return {Object}
 */
export function relevant(result) {
  let video = result.items[0];
  let pattern = /how[\s]*to/i;
  return result.items.reduce(
    (prev, current) => best(pattern, current, prev),
    video
  );
}
