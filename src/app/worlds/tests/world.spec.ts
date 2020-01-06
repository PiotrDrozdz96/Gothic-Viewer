import { split } from 'lodash';

import { vobWhitespace } from '@worlds/consts';
import { World, PrefixZenData, Vobtree } from '@worlds/models';

import { worldMock, prefixZenDataMock, binaryMock, vobtreeMock } from './mocks';

describe('World', () => {
  const world = new World(worldMock);

  it('should save correctly prefixZenData', () => {
    const prefixZenData = new PrefixZenData(split(prefixZenDataMock, '\n', 11));
    expect(world.prefixZenData).toEqual(prefixZenData);
  });

  it('should save correctly binary part', () => {
    expect(world.binary).toEqual(`\n${binaryMock}\n${vobWhitespace}`);
  });

  it('should save correctly vobtree', () => {
    const vobtree = new Vobtree(vobtreeMock);
    expect(world.vobtree).toEqual(vobtree);
  });
});
