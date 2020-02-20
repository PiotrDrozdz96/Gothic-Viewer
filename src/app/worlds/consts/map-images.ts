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
  worldHD: {
    imageUrl: `${directory}MAP_WORLD_HD.PNG`,
    name: 'MAP_WORLD_HD',
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
};
