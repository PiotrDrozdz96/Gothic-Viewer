import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as L from 'leaflet';
import { forEach, map, omit, replace } from 'lodash';

import { ZCVob, GVec3 } from '@worlds/models';
import { VobMarkerGroup, VobMarker } from '@worlds/types';

const divider = 150;
const toolbardisplacement = 2.5;

@Injectable({
  providedIn: 'root',
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

  public init(bounds: L.LatLngBoundsExpression, imageUrl: string) {
    this.map = L.map('map', {
      crs: L.CRS.Simple,
      zoomControl: false,
    });
    L.imageOverlay(imageUrl, bounds).addTo(this.map);
    this.map.fitBounds(bounds);
  }

  public markersGroup(vobs: Array<ZCVob>): VobMarkerGroup {
    return {
      iconUrl: this.getMarkerIconUrl(vobs[0].vobType.type),
      markers: map(vobs, (vob: ZCVob) => ({
        vob,
        marker: this.createMarker(vob.vobType.type, vob.trafoOSToWSPos, vob.vobName.value),
      })),
    };
  }

  public addMarkersGroup(gMarkers: VobMarkerGroup) {
    forEach(gMarkers.markers, (gMarker) => {
      this.addMarker(gMarker);
    });
  }

  public removeMarkersGroup(gMarkers: VobMarkerGroup) {
    forEach(gMarkers.markers, (gMarker) => {
      this.removeMarker(gMarker);
    });
  }

  public openVob(gMarker: VobMarker, isCenter: boolean) {
    this.highlightMarker(gMarker.marker, isCenter);
    this.openedVob.next(gMarker);
  }

  public closeVob() {
    this.openedVob.next(undefined);
  }

  private unbounceMarker() {
    if (this.bouncingMarker) {
      this.bouncingMarker.setIcon(new L.Icon(
        omit(this.bouncingMarker.getIcon().options, ['className']),
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

  private getMarkerIconUrl(vobType: string): string {
    return `assets/markers/${replace(vobType || 'zCVob:', /:/g, '_')}marker.png`;
  }

  private getMarkerIcon(vobType: string): L.Icon {
    return new L.Icon({
      iconUrl: this.getMarkerIconUrl(vobType),
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
  }

  private createMarker(vobType: string, vec3: GVec3, title: string): L.Marker {
    const [x, y, z] = vec3.value; // x = north/south y = up/down z = east/west
    return L.marker([(z / divider), (x / divider)], {
      title,
      icon: this.getMarkerIcon(vobType),
    });
  }

  private addMarker(gMarker: VobMarker) {
    const { marker } = gMarker;
    marker.addTo(this.map).on('click', () => {
      this.openVob(gMarker, false);
    });
  }

  private removeMarker(gMarker: VobMarker) {
    const { marker } = gMarker;
    marker.removeFrom(this.map);
  }

}
