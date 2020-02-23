import { ZenWorld, ZenWorlds } from '@worlds/types';

const zenDirectory = 'assets/Worlds/';
const loadingDirectory = 'assets/Textures/loadings/';

const createZenWorld = (name: string): ZenWorld => ({
  name: `${name}.ZEN`,
  zenPath: `${zenDirectory}${name}.ZEN`,
  imageUrl: `${loadingDirectory}${name}.jpg`,
});

export const zenWorlds: ZenWorlds = {
  freemine: createZenWorld('FREEMINE'),
  oldmine: createZenWorld('OLDMINE'),
  orcgraveyard: createZenWorld('ORCGRAVEYARD'),
  orctempel: {
    ...createZenWorld('ORCTEMPEL'),
    mapImageId: 'temple',
  },
  world: {
    ...createZenWorld('WORLD'),
    mapImageId: 'world',
    additionalMapImageIds: ['oldcamp', 'psicamp', 'newcamp'],
  },
};

export const zenWorlds2: ZenWorlds = {
  addonworld: {
    ...createZenWorld('ADDONWORLD'),
    mapImageId: 'addonworld',
  },
  dragonisland: createZenWorld('DRAGONISLAND'),
  oldworld: {
    ...createZenWorld('OLDWORLD'),
    mapImageId: 'oldworld',
    additionalMapImageIds: ['oldcamp2'],
  },
  newworld: {
    ...createZenWorld('NEWWORLD'),
    mapImageId: 'newworld',
    additionalMapImageIds: ['newworldCity'],
  },
};
