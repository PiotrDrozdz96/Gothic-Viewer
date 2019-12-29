import { split, slice, forEach, has } from 'lodash';

import { getVob } from '../utils/getVob';
import { VobTreeInterface } from '../consts/vobTypes';

export class Vobtree implements VobTreeInterface {

  constructor(data: string) {
    const childs = slice(split(data, 'childs'), 1, -2);
    forEach(childs, (vobString) => {
      const vob = getVob(vobString);
      if (!has(this, vob.vobType.type)) {
        this[vob.vobType.type] = [];
      }
      this[vob.vobType.type].push(vob);
    });
  }
}
