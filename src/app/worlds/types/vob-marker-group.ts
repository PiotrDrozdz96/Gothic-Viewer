import { ZCVob } from '../models/vob';

export interface VobMarker {
  vob: ZCVob;
  marker: L.Marker;
}

export interface VobMarkerGroup {
  iconUrl: string;
  markers: Array<VobMarker>;
}
