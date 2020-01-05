import * as L from 'leaflet';
import { replace } from 'lodash';

export const getMarkerIconUrl = (vobType: string): string => (
  `assets/markers/${replace(vobType || 'zCVob:', /:/g, '_')}marker.png`
);

export const getMarkerIcon = (vobType: string): L.Icon => (
  new L.Icon({
    iconUrl: getMarkerIconUrl(vobType),
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  })
);
