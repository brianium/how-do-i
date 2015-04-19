jest.dontMock('../');

describe('maybe', function() {
  let maybe = require('../').maybe;

  it('returns an empty monad when isEmpty', function () {
    let monad = maybe(null, true);
    expect(monad.isEmpty).toBe(true);
  });

  it('stops at first failure in bind', function () {
    let monad = maybe(true);
    monad = monad
      .bind(() => null)
      .bind(() => 'hello');
    expect(monad.isEmpty).toBe(true);
  });

  it('stops at subsequent failures', function () {
    let monad = maybe(true);
    monad = monad
      .bind(() => true)
      .bind(() => null);
    expect(monad.isEmpty).toBe(true);
  });

  it('maps valid values', function () {
    let val = maybe('hello')
      .bind(greeting => greeting.replace('h','j'))
      .map(val => val);
    expect(val).toBe('jello');
  });
});
