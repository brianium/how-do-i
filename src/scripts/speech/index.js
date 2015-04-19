export default {

  /**
   * @return {SpeechRecognition}
   */
  create() {
    return new webkitSpeechRecognition();
  },

  /**
   * Make a SpeechRecognition object streamable
   *
   * @param {SpeechRecognition} speech
   * @return {SpeechRecognition}
   */
  streamable(speech) {
    speech.continuous = true;
    speech.interimResults = true;
    return speech;
  },

  /**
   * Start listening for speech
   *
   * @param {SpeechRecognition} speech
   */
  start(speech) {
    speech.start();
  },

  /**
   * Stop listening for speech
   *
   * @param {SpeechRecognition} speech
   */
  stop(speech) {
    speech.stop();
  },

  /**
   * Listen for a speech event
   *
   * @param {SpeechRecognition} speech
   * @param {String} event
   * @param {Function} listener
   * @return {SpeechRecognition}
   */
  listen(speech, event, listener) {
    speech[`on${event}`] = listener;
    return speech;
  }

};
