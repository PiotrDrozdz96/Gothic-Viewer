import _split from 'lodash/split';

import { PrefixZenData } from '../models/prefixZenData';

export function extractPrefixZenData(data: string): [PrefixZenData, string] {
  const prefixZenData = new PrefixZenData(_split(data, '\n', 11));
  if (!prefixZenData.isValid) {
    return [prefixZenData, data];
  } else {
    return [prefixZenData, data.slice(prefixZenData.toString().length - 1)];
  }
}
