jest.dontMock('../');
jest.dontMock('lodash');

describe('arrays', function () {

  let arrays = require('../');

  it('can create a slicer function', function () {
    let slicer = arrays.slicer(1);
    expect(slicer([1,2,3,4])).toEqual([2,3,4]);
  });

  it('can create a chunking function', function () {
    let chunk = arrays.chunk(2);
    expect(chunk([1,2,3,4])).toEqual([[1,2], [3,4]]);
  });
});
