import speech from './speech';
import _ from 'lodash';

let loop = _.flow(
  speech.create,
  speech.streamable,
  _.partialRight(speech.listen, 'result', console.log.bind(console)),
  speech.start
);

loop();
