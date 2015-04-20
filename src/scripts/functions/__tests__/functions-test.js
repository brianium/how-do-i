jest.dontMock('../');

import {invokeIf} from '../';

describe('functions', function () {

  it('can conditionally invoke a function', function () {
    let result = invokeIf(true, (greeting) => greeting, 'hello');
    expect(result).toBe('hello');

    let invoked = false;
    invokeIf(false, () => invoked = true);;
    expect(invoked).toBe(false);
  });
});
