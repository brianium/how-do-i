jest.dontMock('../');
jest.dontMock('babelify/polyfill');

describe('dom', function () {
  require("babelify/polyfill");
  let d = require('../');

  it('can create elements', function () {
    let p = d.createElement('p', {id:'para'}, 'hello');
    expect(p.tagName).toEqual('P');
    expect(p.innerHTML).toEqual('hello');
  });

  it('can create an appender function', function () {
    let div = d.createElement('div', {id: 'div'}, '');
    let p = d.createElement('p', {id:'para'}, 'hello');
    let appender = d.appender(div, p);
    appender();
    expect(div.innerHTML).toEqual('<p id="para">hello</p>');
  });
});