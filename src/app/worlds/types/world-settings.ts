import { World } from '@worlds/models';

export interface WorldSettings {
  world: World;
  name: string;
  images: Array<L.ImageOverlay>;
}
