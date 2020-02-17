import { MapImages } from '@worlds/types';

const directory = 'assets/Textures/maps/';

export const mapImages: MapImages = {
  blank: {
    imageUrl: `${directory}BLANK.PNG`,
    name: 'BLANK',
    bounds: [[-325, -475], [325, 475]],
  },
  worldHD: {
    imageUrl: `${directory}MAP_WORLD_HD.PNG`,
    name: 'MAP_WORLD_HD',
    bounds: [[-330, -480], [320, 470]],
  },
};
