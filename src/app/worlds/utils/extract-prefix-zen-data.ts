import { split } from 'lodash';

import { PrefixZenData } from '../models/prefix-zen-data';

export const extractPrefixZenData = (data: string): [PrefixZenData, string] => {
  const prefixZenData = new PrefixZenData(split(data, '\n', 11));
  if (!prefixZenData.isValid) {
    return [prefixZenData, data];
  } else {
    return [prefixZenData, data.slice(prefixZenData.toString().length - 1)];
  }
};