import * as L from 'leaflet';

export interface GMarker<ZC> {
  value: ZC;
  marker: L.Marker;
}

export interface GMarkerGroup<ZC> {
  iconUrl: string;
  markers: Array<GMarker<ZC>>;
}

