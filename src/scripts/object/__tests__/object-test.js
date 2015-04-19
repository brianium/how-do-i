jest.dontMock('../');
jest.dontMock('lodash');

describe('objects', function () {
  let objects = require('../');

  it('can create a key setting function', function () {
    let obj = {greeting: 'hello'};
    let setter = objects.keySetter('greeting', () => 'goodbye');
    expect(setter(obj).greeting).toEqual('goodbye');
  });
});
