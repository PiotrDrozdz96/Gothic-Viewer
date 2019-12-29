import * as L from 'leaflet';

import { getImage } from '../utils/getImage';
import { greenIcon } from '../consts/leaflet-color-markers';
import { GVec3 } from './gTypes';

const imageUrl = 'http://static.giantbomb.com/uploads/original/0/5684/805645-gothic_map_wp_1600x1200.png';
const divider = 190;

export class GMap {
  map: L.Map;

  constructor() {
    this.map = L.map('map', {
      crs: L.CRS.Simple,
      zoomControl: false,
    });
    const imageObs = getImage(imageUrl).subscribe((imageElement) => {
      const bounds: L.LatLngBoundsExpression = [
        [-(imageElement.naturalHeight / 4), -(imageElement.naturalWidth / 4)],
        [imageElement.naturalHeight / 4, imageElement.naturalWidth / 4]
      ];
      const image = L.imageOverlay(imageUrl, bounds).addTo(this.map);
      this.map.fitBounds(bounds);
      imageObs.unsubscribe();
    });
  }

  createMarker(vec3: GVec3, title: string): L.Marker {
    const [x, y, z] = vec3.value; // x = north/south y = up/down z = east/west
    return L.marker([(z / divider), (x / divider)], {
      title,
      icon: greenIcon
    });
  }

  addMarker(marker: L.Marker) {
    marker.addTo(this.map);
  }

  removeMarker(marker: L.Marker) {
    marker.removeFrom(this.map);
  }
}

