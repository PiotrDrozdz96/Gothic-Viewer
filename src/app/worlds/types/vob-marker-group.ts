import { oneOfVobType } from './one-of-vob-type';

export interface VobMarker {
  vob: oneOfVobType;
  marker: L.Marker;
}

export interface VobMarkerGroup {
  iconUrl: string;
  markers: Array<VobMarker>;
}
