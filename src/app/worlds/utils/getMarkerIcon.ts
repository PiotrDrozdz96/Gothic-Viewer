import * as L from 'leaflet';
import { replace } from 'lodash';

export const getMarkerIcon = (vobType: string): L.Icon => (
  new L.Icon({
    iconUrl: `assets/markers/${replace(vobType || 'zCVob:', /:/g, '_')}marker.png`,
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  })
);
