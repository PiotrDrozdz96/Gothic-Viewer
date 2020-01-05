import { Observable } from 'rxjs';
import { split } from 'lodash';

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
      const [binary, withoutBinary] = split(withoutPrefix, '[VobTree % 0 0]', 2);
      const [vobtree, waynet] = split(withoutBinary, '[WayNet % 0 0]', 2);
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
