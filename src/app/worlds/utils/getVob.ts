import { split, find } from 'lodash';

import { VobType } from '../models/vob';
import { GInt } from '../models/gTypes';
import { oneOfVobType } from '../types/one-of-vob-type';
import { constructors } from '../consts/vobTypes';


export function getVob(vobString: string): oneOfVobType {
  const lines = split(vobString, '\n');
  const [, index, unknownValue] = lines[0].match(/(\d+)=int:(\d+)/);
  const vobType = new VobType(lines[1]);
  const vobConstructor = constructors[vobType.type];
  return new vobConstructor(index, new GInt('int', unknownValue), vobType, lines.slice(2, -2));
}
