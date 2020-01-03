import * as L from 'leaflet';
import { forEach, map } from 'lodash';

import { getImage } from '../utils/getImage';
import { getMarkerIcon, getMarkerIconUrl } from '../utils/getMarkerIcon';
import { GLayerGroup } from './gLayerGroup';
import { GVec3 } from './gTypes';
import { oneOfVobType } from './vob';

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

  createMarker(vobType: string, vec3: GVec3, title: string): L.Marker {
    const [x, y, z] = vec3.value; // x = north/south y = up/down z = east/west
    return L.marker([(z / divider), (x / divider)], {
      title,
      icon: getMarkerIcon(vobType),
    });
  }

  layerGroup(vobs: Array<oneOfVobType>): GLayerGroup {
    return {
      vobs,
      iconUrl: getMarkerIconUrl(vobs[0].vobType.type),
      layer: L.layerGroup(map(vobs, (vob: oneOfVobType) =>
        this.createMarker(vob.vobType.type, vob.trafoOSToWSPos, vob.vobName.value)
      ))
    };
  }

  addLayer(layer: L.Layer) {
    layer.addTo(this.map);
  }

  removeLayer(layer: L.Layer) {
    layer.removeFrom(this.map);
  }
}

