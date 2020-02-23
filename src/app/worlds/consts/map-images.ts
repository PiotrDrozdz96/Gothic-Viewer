import { MapImages } from '@worlds/types';

const directory = 'assets/Textures/maps/';

export const mapImages: MapImages = {
  blank: {
    imageUrl: `${directory}BLANK.PNG`,
    name: 'BLANK',
    bounds: [[-330, -480], [320, 470]],
  },
  world: {
    imageUrl: `${directory}MAP_WORLD.PNG`,
    name: 'MAP_WORLD',
    bounds: [[-330, -480], [320, 470]],
  },
  temple: {
    imageUrl: `${directory}MAP_TEMPLE.PNG`,
    name: 'MAP_TEMPLE',
    bounds: [[-87, -115], [208, 285]],
  },
  oldcamp: {
    imageUrl: `${directory}MAP_OLDCAMP.PNG`,
    name: 'MAP_OLDCAMP',
    bounds: [[-55, -57], [40, 53]],
  },
  psicamp: {
    imageUrl: `${directory}MAP_PSICAMP.PNG`,
    name: 'MAP_PSICAMP',
    bounds: [[-145, 215], [23, 450]],
  },
  newcamp: {
    imageUrl: `${directory}MAP_NEWCAMP.PNG`,
    name: 'MAP_NEWCAMP',
    bounds: [[-10, -428], [109, -282]],
  },
  oldworld: {
    imageUrl: `${directory}MAP_OLDWORLD.PNG`,
    name: 'MAP_OLDWORLD',
    bounds: [[-330, -515], [320, 345]],
  },
  oldcamp2: {
    imageUrl: `${directory}MAP_OLDCAMP2.PNG`,
    name: 'MAP_OLDCAMP2',
    bounds: [[-55, -57], [40, 53]],
  },
  newworld: {
    imageUrl: `${directory}MAP_NEWWORLD.PNG`,
    name: 'MAP_NEWWORLD',
    bounds: [[-265, -180], [320, 615]],
  },
  newworldCity: {
    imageUrl: `${directory}MAP_NEWWORLD_CITY.PNG`,
    name: 'MAP_NEWWORLD_CITY',
    bounds: [[-51, -38], [63, 120]],
  },
  addonworld: {
    imageUrl: `${directory}MAP_ADDONWORLD.PNG`,
    name: 'MAP_ADDONWORLD',
    bounds: [[-210, -300], [240, 270]],
  },
};
