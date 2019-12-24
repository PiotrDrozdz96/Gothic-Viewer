import _split from 'lodash/split';
import _find from 'lodash/find';

import { ZCVob, VobType } from '../models/vob';
import { constructors } from '../consts/vobTypes';


export function getVob(vobString: string): ZCVob {
  const lines = _split(vobString, '\n');
  const [, index, unknownValue] = lines[0].match(/(\d+)=int:(\d+)/);
  const vobType = new VobType(lines[1]);
  const vobConstructor = vobType.type === ''
  ? ZCVob : _find(constructors, (constructor) => vobType.type.includes(constructor.type)).class;

  return new vobConstructor(index, unknownValue, vobType, lines.slice(2, -1));
}
