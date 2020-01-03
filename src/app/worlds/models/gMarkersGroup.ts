import { oneOfVobType } from './vob';

export interface GMarker {
  vob: oneOfVobType;
  marker: L.Marker;
}

export interface GMarkersGroup {
  iconUrl: string;
  markers: Array<GMarker>;
}
