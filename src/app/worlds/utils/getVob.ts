import _split from 'lodash/split';
import _find from 'lodash/find';

import { VobType, ZCVob, oneOfVobType } from '../models/vob';
import { GInt } from '../models/gTypes';
import { constructors } from '../consts/vobTypes';


export function getVob(vobString: string): oneOfVobType {
  const lines = _split(vobString, '\n');
  const [, index, unknownValue] = lines[0].match(/(\d+)=int:(\d+)/);
  const vobType = new VobType(lines[1]);
  const vobConstructor = vobType.type === '' ? ZCVob : constructors[vobType.type];
  return new vobConstructor(index, new GInt('int', unknownValue), vobType, lines.slice(2, -2));
}
