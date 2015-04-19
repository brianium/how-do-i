export default {
  /**
   * Return a uri for making a youtube query
   *
   * @param {String} token
   * @param {String} query
   * @return {String}
   */
  uri(token, query) {
      return `https://www.googleapis.com/youtube/v3/search?access_token=${token}&part=id,snippet&q=${query}&type=video&videoEmbeddable=true`
  },

  /**
   * Return a promise with the JSON result of a youtube query
   *
   * @param {String} token
   * @param {String} query
   * @return {Promise}
   */
  query(token, query) {
    return fetch(this.uri(token, query))
      .then(resp => resp.text())
      .then(JSON.parse);
  }
};
