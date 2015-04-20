jest.dontMock('../');
jest.dontMock('lodash');
import {keySetter} from '../';

describe('objects', function () {
  it('can create a key setting function', function () {
    let obj = {greeting: 'hello'};
    let setter = keySetter('greeting', () => 'goodbye');
    expect(setter(obj).greeting).toEqual('goodbye');
  });
});
