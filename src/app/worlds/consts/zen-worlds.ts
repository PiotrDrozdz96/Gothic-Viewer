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
    mapImageIds: ['temple'],
  },
  world: {
    ...createZenWorld('WORLD'),
    mapImageIds: ['world', 'worldHD'],
    additionalMapImageIds: ['oldcamp', 'psicamp', 'newcamp'],
  },
  oldworld: {
    ...createZenWorld('OLDWORLD'),
    mapImageIds: ['oldworld'],
    additionalMapImageIds: ['oldcamp2'],
  },
  newworld: {
    ...createZenWorld('NEWWORLD'),
    mapImageIds: ['newworld'],
    additionalMapImageIds: ['newworldCity'],
  },
};
