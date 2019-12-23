import _split from 'lodash/split';

import { extractPrefixZenData } from '../utils/extractPrefixZenData';
import { PrefixZenData } from './prefixZenData';

export class World {

  prefixZenData: PrefixZenData;
  binary: string;
  // vobTree: VobTree;
  vobTree: Array<string>;
  // wayNet: WayNet;
  wayNet: string;

  constructor(file: File) {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      const [prefixZenData, withoutPrefix] = extractPrefixZenData(reader.result as string);
      if (!prefixZenData.isValid) {
        alert(prefixZenData.error);
      } else {
        console.log(prefixZenData.toString());
        this.prefixZenData = prefixZenData;
        const [binary, withoutBinary] = _split(withoutPrefix, '[VobTree % 0 0]');
        this.binary = binary;
      }
    };
  }
}
