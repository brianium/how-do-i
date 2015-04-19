import _ from 'lodash';

let speech = {

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
   * @return {SpeechRecognition}
   */
  start(speech) {
    speech.start();
    return speech;
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
  },

  /**
   * Returns a confident listener. The listener
   * will only execute if the level of confidence is reached.
   *
   * @param {Function} listener
   * @param {Number} level
   * @return {Function}
   */
  confident(listener, level) {
    level || (level = 80);
    return function(event) {
      let results = event.results;
      let result = results[results.length - 1][0];
      let confidence = result.confidence * 100;
      if (confidence > level) {
        listener(result, event);
      }
    }
  }

};

/**
 * Start streaming speech recognition
 *
 * @return {SpeechRecognition}
 */
speech.stream = _.flow(
  speech.create,
  speech.streamable,
  speech.start
);

export default speech;
