import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { forEach, map } from 'lodash';

import { getImage } from '../utils/getImage';
import { getMarkerIcon, getMarkerIconUrl } from '../utils/getMarkerIcon';
import { GMarkersGroup } from '../models/gMarkersGroup';
import { GVec3 } from '../models/gTypes';
import { oneOfVobType } from '../models/vob';

const imageUrl = 'http://static.giantbomb.com/uploads/original/0/5684/805645-gothic_map_wp_1600x1200.png';
const divider = 190;
const zoom = 6;
const toolbardisplacement = 2.5;

@Injectable({
  providedIn: 'root'
})
export class GMapService {
  map: L.Map;
  frontIndex = 20000;

  constructor() { }

  init() {
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

  markersGroup(vobs: Array<oneOfVobType>): GMarkersGroup {
    return {
      iconUrl: getMarkerIconUrl(vobs[0].vobType.type),
      markers: map(vobs, (vob: oneOfVobType) => ({
        vob,
        marker: this.createMarker(vob.vobType.type, vob.trafoOSToWSPos, vob.vobName.value),
      }))
    };
  }

  addMarker(marker: L.Marker): L.Marker { return marker.addTo(this.map); }
  removeMarker(marker: L.Marker): L.Marker { return marker.removeFrom(this.map); }

  goToFront(marker: L.Marker) {
    marker.removeFrom(this.map).setZIndexOffset(this.frontIndex++).addTo(this.map);
  }

  addMarkersGroup(gMarkers: GMarkersGroup) {
    forEach(gMarkers.markers, (gMarker) => {
      this.addMarker(gMarker.marker);
    });
  }

  removeMarkersGroup(gMarkers: GMarkersGroup) {
    forEach(gMarkers.markers, (gMarker) => {
      this.removeMarker(gMarker.marker);
    });
  }

  centerMarker(marker: L.Marker) {
    const { lat, lng } = marker.getLatLng();
    console.log(marker);
    this.goToFront(marker);
    this.map.setView({lat, lng: lng - toolbardisplacement}, zoom);
  }
}
