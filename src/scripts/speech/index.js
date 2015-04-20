import _ from 'lodash';

/**
 * @return {SpeechRecognition}
 */
export function create() {
  return new webkitSpeechRecognition();
}

/**
 * Make a SpeechRecognition object streamable
 *
 * @param {SpeechRecognition} speech
 * @return {SpeechRecognition}
 */
export function streamable(speech) {
  speech.continuous = true;
  speech.interimResults = true;
  return speech;
}

/**
 * Start listening for speech
 *
 * @param {SpeechRecognition} speech
 * @return {SpeechRecognition}
 */
export function start(speech) {
  speech.start();
  return speech;
}

/**
 * Stop listening for speech
 *
 * @param {SpeechRecognition} speech
 */
export function stop(speech) {
  speech.stop();
}

/**
 * Listen for a speech event
 *
 * @param {SpeechRecognition} speech
 * @param {String} event
 * @param {Function} listener
 * @return {SpeechRecognition}
 */
export function listen(speech, event, listener) {
  speech[`on${event}`] = listener;
  return speech;
}

/**
 * Returns a confident listener. The listener
 * will only execute if the level of confidence is reached.
 *
 * @param {Function} listener
 * @param {Number} level
 * @return {Function}
 */
export function confident(listener, level) {
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

/**
 * Start streaming speech recognition
 *
 * @return {SpeechRecognition}
 */
export const stream = _.flow(
  create,
  streamable,
  start
)
