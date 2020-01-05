import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as L from 'leaflet';
import { forEach, map, omit } from 'lodash';

import { getImage } from '@common/utils';
import { getMarkerIcon, getMarkerIconUrl } from '../utils/get-marker-icon';
import { GVec3 } from '../models/g-types';
import { ZCVob } from '../models/vob';
import { VobMarkerGroup, VobMarker } from '../types/vob-marker-group';

const imageUrl = 'http://static.giantbomb.com/uploads/original/0/5684/805645-gothic_map_wp_1600x1200.png';
const divider = 190;
const toolbardisplacement = 2.5;

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private bouncingMarker: L.Marker;
  openedVob = new BehaviorSubject<VobMarker>(undefined);
  map: L.Map;

  constructor() {
    this.openedVob.subscribe((gMarker) => {
      if (!gMarker) {
        this.unbounceMarker();
      }
    });
  }

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

  private unbounceMarker() {
    if (this.bouncingMarker) {
      this.bouncingMarker.setIcon(new L.Icon(
        omit(this.bouncingMarker.getIcon().options, ['className'])
      ));
      this.bouncingMarker = undefined;
    }
  }

  private bounceMarker(marker: L.Marker) {
    this.unbounceMarker();
    this.bouncingMarker = marker.setIcon(new L.Icon({
      ...marker.getIcon().options,
      className: 'bounce-marker',
    }));
  }

  private highlightMarker(marker: L.Marker, isCenter: boolean) {
    const { lat, lng } = marker.getLatLng();
    this.bounceMarker(marker);
    if (isCenter) {
      this.map.setView({lat, lng: lng - toolbardisplacement}, this.map.getZoom());
    }
  }

  private createMarker(vobType: string, vec3: GVec3, title: string): L.Marker {
    const [x, y, z] = vec3.value; // x = north/south y = up/down z = east/west
    return L.marker([(z / divider), (x / divider)], {
      title,
      icon: getMarkerIcon(vobType),
    });
  }

  markersGroup(vobs: Array<ZCVob>): VobMarkerGroup {
    return {
      iconUrl: getMarkerIconUrl(vobs[0].vobType.type),
      markers: map(vobs, (vob: ZCVob) => ({
        vob,
        marker: this.createMarker(vob.vobType.type, vob.trafoOSToWSPos, vob.vobName.value),
      }))
    };
  }

  addMarker(gMarker: VobMarker) {
    const { marker } = gMarker;
    marker.addTo(this.map).on('click', () => {
      this.openVob(gMarker, false);
    });
  }
  removeMarker(gMarker: VobMarker) {
    const { marker } = gMarker;
    marker.removeFrom(this.map);
  }

  addMarkersGroup(gMarkers: VobMarkerGroup) {
    forEach(gMarkers.markers, (gMarker) => {
      this.addMarker(gMarker);
    });
  }

  removeMarkersGroup(gMarkers: VobMarkerGroup) {
    forEach(gMarkers.markers, (gMarker) => {
      this.removeMarker(gMarker);
    });
  }

  openVob(gMarker: VobMarker, isCenter: boolean) {
    this.highlightMarker(gMarker.marker, isCenter);
    this.openedVob.next(gMarker);
  }

  closeVob() {
    this.openedVob.next(undefined);
  }
}
