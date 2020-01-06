import * as moment from 'moment';
import { split } from 'lodash';

import { PrefixZenData } from '@worlds/models';

import { prefixZenDataMock } from './mocks';

describe('PrefixZenData', () => {
  const prefixZenData = new PrefixZenData(split(prefixZenDataMock, '\n', 11));

  it('should be valid', () => {
    expect(prefixZenData.isValid).toEqual(true);
  });

  it('should save correctly ver', () => {
    expect(prefixZenData.ver).toEqual('1');
  });

  it('should save correctly saveGame', () => {
    expect(prefixZenData.saveGame).toEqual('0');
  });

  it('should save correctly date', () => {
    expect(prefixZenData.date.diff(moment([2019, 7, 19, 23, 20, 15]))).toEqual(0);
  });

  it('should save correctly user', () => {
    expect(prefixZenData.user).toEqual('MSI');
  });

  it('should save correctly number of objects as string', () => {
    expect(prefixZenData.objects).toEqual('19633');
  });

  it('toString should return the same value', () => {
    expect(prefixZenData.toString()).toEqual(prefixZenDataMock);
  });

  it('should be invalid', () => {
    const invalidPrefixZenData = new PrefixZenData([]);
    expect(invalidPrefixZenData.isValid).toEqual(false);
  });
});
