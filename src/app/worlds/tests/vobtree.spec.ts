import { keys, map } from 'lodash';

import { VOB } from '@worlds/consts';
import { Vobtree, ZCVob, ZCVobLevelCompo, ZCVobLight } from '@worlds/models';

import { vobtreeMock } from './mocks';

describe('Vobtree', () => {
  const vobtree = new Vobtree(vobtreeMock);

  it('type should save three Arrays', () => {
    expect(keys(vobtree)).toEqual([VOB.LEVEL_COMPO, VOB.LIGHT, VOB.SIMPLE]);
  });

  it('should save vob as good type', () => {
    expect(vobtree[VOB.LIGHT][0].constructor).toEqual(ZCVobLight);
  });

  it('getSortedVobtree should return sorted values as Array', () => {
    const values = vobtree.getSortedVobtree();
    const constructors = map(values, (value) => value[0].constructor);
    expect(constructors).toEqual([ZCVobLevelCompo, ZCVob, ZCVobLight]);
  });
});
