import _split from 'lodash/split';

import { extractPrefixZenData } from '../utils/extractPrefixZenData';

import { PrefixZenData } from './prefixZenData';
import { Waynet } from './wayNet';
import { Vobtree } from './vobtree';

export class World {
  prefixZenData: PrefixZenData;
  binary: string;
  vobtree: Vobtree;
  waynet: Waynet;

  constructor(file: File) {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      const [prefixZenData, withoutPrefix] = extractPrefixZenData(reader.result as string);
      if (!prefixZenData.isValid) {
        alert(prefixZenData.error);
      } else {
        this.prefixZenData = prefixZenData;
        const [binary, vobtree, waynet] = _split(
          withoutPrefix,
          /[VobTree % 0 0] | [WayNet % 0 0]/,
          3
        );
        this.binary = binary;
        this.vobtree = new Vobtree(vobtree);
        this.waynet = new Waynet(waynet);
      }
    };
  }
}
