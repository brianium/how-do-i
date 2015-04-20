jest.dontMock('../');
jest.dontMock('lodash');
import {slicer, chunker} from '../';

describe('arrays', function () {
  it('can create a slicer function', function () {
    let fn = slicer(1);
    expect(fn([1,2,3,4])).toEqual([2,3,4]);
  });

  it('can create a chunking function', function () {
    let fn = chunker(2);
    expect(fn([1,2,3,4])).toEqual([[1,2], [3,4]]);
  });
});
