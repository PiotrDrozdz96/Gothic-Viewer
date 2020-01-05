import { Observable } from 'rxjs';
import { split } from 'lodash';

import { extractPrefixZenData } from '../utils/extract-prefix-zen-data';

import { PrefixZenData } from './prefix-zen-data';
import { Waynet } from './wayNet';
import { Vobtree } from './vobtree';

export class World {
  prefixZenData: PrefixZenData;
  binary: string;
  vobtree: Vobtree;
  waynet: Waynet;

  constructor(fileResult: string) {
    const [prefixZenData, withoutPrefix] = extractPrefixZenData(fileResult);
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
}
