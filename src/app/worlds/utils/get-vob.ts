import { split, find } from 'lodash';

import { vobConstructors } from '../consts/vob-constructors';
import { VobType, ZCVob } from '../models/vob';
import { GInt } from '../models/g-types';

export const getVob = (vobString: string): ZCVob => {
  const lines = split(vobString, '\n');
  const [, index, unknownValue] = lines[0].match(/(\d+)=int:(\d+)/);
  const vobType = new VobType(lines[1]);
  const vobConstructor = vobConstructors[vobType.type];
  return new vobConstructor(index, new GInt('int', unknownValue), vobType, lines.slice(2, -2));
};
