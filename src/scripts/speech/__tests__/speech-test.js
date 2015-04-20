jest.dontMock('../')

import * as speech from '../';

describe('speech', function () {

  beforeEach(function () {
    this.recognition = {};
    this.recognition.start = jest.genMockFn();
  });

  it('makes speech objects streamable', function () {
    let ret = speech.streamable(this.recognition);
    expect(this.recognition.continuous).toBe(true);
    expect(this.recognition.interimResults).toBe(true);
    expect(ret).toBe(this.recognition);
  });

  it('can start a speech object', function () {
    speech.start(this.recognition);
    expect(this.recognition.start.mock.calls.length).toEqual(1);
  });

  it('can add listeners to a speech object', function () {
    let listener = () => console.log('hello');
    let ret = speech.listen(this.recognition, 'result', listener);
    expect(this.recognition.onresult).toBe(listener);
    expect(ret).toBe(this.recognition);
  });

});
