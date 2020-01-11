import { IsArrayPipe } from './is-array.pipe';

describe('IsArrayPipe', () => {
  const pipe = new IsArrayPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('empty array should return true', () => {
    expect(pipe.transform([])).toEqual(true);
  });

  it('array should return true', () => {
    expect(pipe.transform(['isArray'])).toEqual(true);
  });

  it('not array should return false', () => {
    expect(pipe.transform('isNotArray')).toEqual(false);
  });
});
