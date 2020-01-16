import { slash } from '@common/utils';

describe('slash', () => {
  it('when string don`t have separator should return value and empty string', () => {
    expect(slash('example string', '\n')).toEqual(['example string', '']);
  });
  it('when separator starting string should return empty string and value', () => {
    expect(slash('\nexample string', '\n')).toEqual(['', 'example string']);
  });
  it('when separator is in the end should return value and empty string', () => {
    expect(slash('example string\n', '\n')).toEqual(['example string', '']);
  });
  it('when separator is in middle should should slash string to two parts', () => {
    expect(slash('example string', ' ')).toEqual(['example', 'string']);
  });
  it('if value have many separator should return first part and rest', () => {
    expect(slash('example  string  string', '  ')).toEqual(['example', 'string  string']);
  });
});
