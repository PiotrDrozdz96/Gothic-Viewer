import _split from 'lodash/split';
import _slice from 'lodash/slice';
import _map from 'lodash/map';

import { getVob } from '../utils/getVob';
import { ZCVob } from './vob';

export class Vobtree {
  vobtree: Array<ZCVob>;

  constructor(data: string) {
    // this.vobtree = data;
    const childs = _slice(_split(data, 'childs'), 1, -2);
    this.vobtree = _map(childs, (vobString) => getVob(vobString));
    console.log(this.vobtree[0]);
    console.log(this.vobtree[1]);
    console.log(this.vobtree[2]);
    console.log(this.vobtree[3]);
  }
}
