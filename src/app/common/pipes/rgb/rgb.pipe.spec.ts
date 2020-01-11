import { RgbPipe } from './rgb.pipe';

describe('RgbPipe', () => {
  const pipe = new RgbPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return css rgb function', () => {
    expect(pipe.transform([211, 147, 107])).toEqual('rgb(211, 147, 107)');
  });

  it('should return css rgb function with opacity', () => {
    expect(pipe.transform([225, 197, 100, 255])).toEqual('rgb(225, 197, 100, 255)');
  });
});
