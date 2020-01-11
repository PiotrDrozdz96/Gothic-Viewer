import { ArrayToStringPipe } from './array-to-string.pipe';

describe('ArrayToStringPipe', () => {
  const pipe = new ArrayToStringPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should correctly joined string', () => {
    expect(pipe.transform(['1', '2'])).toEqual('1\n2');
  });

  it('array of number should return string anyway', () => {
    expect(pipe.transform([1, 2])).toEqual('1\n2');
  });

  it('array of mixed should return string anyway', () => {
    expect(pipe.transform([1, '2'])).toEqual('1\n2');
  });
});
