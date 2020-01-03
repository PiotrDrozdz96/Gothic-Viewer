import { oneOfVobType } from './vob';

export interface GLayerGroup {
  iconUrl: string;
  vobs: Array<oneOfVobType>;
  layer: L.Layer;
}
