import { split, find } from 'lodash';

import { VobType } from '../models/vob';
import { GInt } from '../models/g-types';
import { oneOfVobType } from '../types/one-of-vob-type';
import { vobConstructors } from '../consts/vob-constructors';


export const getVob = (vobString: string): oneOfVobType => {
  const lines = split(vobString, '\n');
  const [, index, unknownValue] = lines[0].match(/(\d+)=int:(\d+)/);
  const vobType = new VobType(lines[1]);
  const vobConstructor = vobConstructors[vobType.type];
  return new vobConstructor(index, new GInt('int', unknownValue), vobType, lines.slice(2, -2));
};
