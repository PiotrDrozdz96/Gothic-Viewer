import { split } from 'lodash';

import { slash } from '@common/utils';

import { PrefixZenData } from './prefix-zen-data';
import { Waynet } from './waynet';
import { Vobtree } from './vobtree';

export class World {
  prefixZenData: PrefixZenData;
  binary: string;
  vobtree: Vobtree;
  waynet: Waynet;

  constructor(fileResult: string) {
    const [prefixZenData, withoutPrefix] = this.extractPrefixZenData(fileResult);
    if (!prefixZenData.isValid) {
      alert(prefixZenData.error);
    } else {
      this.prefixZenData = prefixZenData;
      const [binary, withoutBinary] = slash(withoutPrefix, '[VobTree % 0 0]\n');
      const [vobtree, waynet] = slash(withoutBinary, '[WayNet % 0 0]\n');
      this.binary = binary;
      this.vobtree = new Vobtree(vobtree);
      this.waynet = new Waynet(waynet);
    }
  }

  private extractPrefixZenData(data: string): [PrefixZenData, string] {
    const prefixZenData = new PrefixZenData(split(data, '\n', 11));
    if (!prefixZenData.isValid) {
      return [prefixZenData, data];
    } else {
      return [prefixZenData, data.slice(prefixZenData.toString().length - 1)];
    }
  }
}
