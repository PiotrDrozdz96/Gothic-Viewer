import _split from 'lodash/split';
import _slice from 'lodash/slice';
import _map from 'lodash/map';

import { getVob } from '../utils/getVob';
import { OC_MOB_INTER, OC_ITEM } from '../consts/vobTypes';
import { oneOfVobType, OCMobInter, OCItem } from './vob';

export class Vobtree {
  vobtree: Array<oneOfVobType> = [];
  ocMobsInter: Array<OCMobInter> = [];
  ocItems: Array<OCItem> = [];

  constructor(data: string) {
    const childs = _slice(_split(data, 'childs'), 1, -2);
    this.vobtree = _map(childs, (vobString) => {
      const vob = getVob(vobString);
      if (vob.vobType.type === OC_MOB_INTER) {
        this.ocMobsInter.push(vob as OCMobInter);
      } else if (vob.vobType.type === OC_ITEM) {
        this.ocItems.push(vob as OCItem);
      }
      return vob;
    });
  }
}
