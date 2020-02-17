import { ZenWorlds } from '@worlds/types';

const zenDirectory = 'assets/Worlds/';
const loadingDirectory = 'assets/Textures/loadings/';

export const zenWorlds: ZenWorlds = {
  freemine: {
    name: 'FREEMINE.ZEN',
    zenPath: `${zenDirectory}FREEMINE.ZEN`,
    imageUrl: `${loadingDirectory}FREEMINE.jpg`,
  },
  oldmine: {
    name: 'OLDMINE.ZEN',
    zenPath: `${zenDirectory}OLDMINE.ZEN`,
    imageUrl: `${loadingDirectory}OLDMINE.jpg`,
  },
  orcgraveyard: {
    name: 'ORCGRAVEYARD.ZEN',
    zenPath: `${zenDirectory}ORCGRAVEYARD.ZEN`,
    imageUrl: `${loadingDirectory}ORCGRAVEYARD.jpg`,
  },
  orctempel: {
    name: 'ORCTEMPEL.ZEN',
    zenPath: `${zenDirectory}ORCTEMPEL.ZEN`,
    imageUrl: `${loadingDirectory}ORCTEMPEL.jpg`,
    mapImageIds: ['temple'],
  },
  world: {
    name: 'WORLD.ZEN',
    zenPath: `${zenDirectory}WORLD.ZEN`,
    imageUrl: `${loadingDirectory}WORLD.jpg`,
    mapImageIds: ['worldHD'],
  },
};
