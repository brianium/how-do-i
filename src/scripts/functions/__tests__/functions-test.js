jest.dontMock('../');

describe('functions', function () {
  let fn = require('../');

  it('can conditionally invoke a function', function () {
    let result = fn.invokeIf(true, (greeting) => greeting, 'hello');
    expect(result).toBe('hello');

    let invoked = false;
    fn.invokeIf(false, () => invoked = true);;
    expect(invoked).toBe(false);
  });
});
