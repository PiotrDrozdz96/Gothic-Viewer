import { ZenWorld, ZenWorlds } from '@worlds/types';

const zenDirectory = 'assets/Worlds/';
const loadingDirectory = 'assets/Textures/loadings/';

const createZenWorld = (name: string): ZenWorld => ({
  name: `${name}.ZEN`,
  zenPath: `${zenDirectory}${name}.ZEN`,
  imageUrl: `${loadingDirectory}${name}.jpg`,
});

export const zenWorlds: ZenWorlds = {
  'FREEMINE.ZEN': createZenWorld('FREEMINE'),
  'OLDMINE.ZEN': createZenWorld('OLDMINE'),
  'ORCGRAVEYARD.ZEN': createZenWorld('ORCGRAVEYARD'),
  'ORCTEMPEL.ZEN': {
    ...createZenWorld('ORCTEMPEL'),
    mapImageId: 'temple',
  },
  'WORLD.ZEN': {
    ...createZenWorld('WORLD'),
    mapImageId: 'world',
    additionalMapImageIds: ['oldcamp', 'psicamp', 'newcamp'],
  },
};

export const zenWorlds2: ZenWorlds = {
  'ADDONWORLD.ZEN': {
    ...createZenWorld('ADDONWORLD'),
    mapImageId: 'addonworld',
  },
  'DRAGONISLAND.ZEN': createZenWorld('DRAGONISLAND'),
  'OLDWORLD.ZEN': {
    ...createZenWorld('OLDWORLD'),
    mapImageId: 'oldworld',
    additionalMapImageIds: ['oldcamp2'],
  },
  'NEWWORLD.ZEN': {
    ...createZenWorld('NEWWORLD'),
    mapImageId: 'newworld',
    additionalMapImageIds: ['newworldCity'],
  },
};
