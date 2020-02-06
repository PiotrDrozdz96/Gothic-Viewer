import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as L from 'leaflet';
import { forEach, map, omit, replace } from 'lodash';

import { waypointIcon } from '@worlds/consts';
import { ZCVob, ZCWaypoint, GVec3 } from '@worlds/models';
import { GMarker, GMarkerGroup } from '@worlds/types';

const divider = 150;
const toolbardisplacement = 2.5;

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private bouncingMarker: L.Marker;
  openedVob = new BehaviorSubject<GMarker<ZCVob>>(undefined);
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

  public vobMarkersGroup(vobs: Array<ZCVob>): GMarkerGroup<ZCVob> {
    return {
      iconUrl: this.getMarkerIconUrl(vobs[0].vobType.type),
      markers: map(vobs, (vob: ZCVob) => {
        const gMarker: GMarker<ZCVob> = {
          value: vob,
          marker: this.createMarker(
            vob.trafoOSToWSPos, vob.vobName.value, this.getMarkerIcon(vob.vobType.type),
          ),
        };
        gMarker.marker.on('click', () => { this.openVob(gMarker, false); });

        return gMarker;
      }),
    };
  }

  public waypointsMarkersGroup(waypoints: Array<ZCWaypoint>): GMarkerGroup<ZCWaypoint> {
    return {
      markers: map(waypoints, (waypoint: ZCWaypoint) => ({
        value: waypoint,
        marker: this.createMarker(waypoint.position, waypoint.wpName.value, waypointIcon),
      })),
    };
  }

  public addMarkersGroup(gMarkers: GMarkerGroup<any>) {
    forEach(gMarkers.markers, (gMarker) => {
      this.addMarker(gMarker);
    });
  }

  public removeMarkersGroup(gMarkers: GMarkerGroup<any>) {
    forEach(gMarkers.markers, (gMarker) => {
      this.removeMarker(gMarker);
    });
  }

  public openVob(gMarker: GMarker<ZCVob>, isCenter: boolean) {
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

  private createMarker(vec3: GVec3, title: string, icon: L.DivIcon): L.Marker {
    const [x, y, z] = vec3.value; // x = north/south y = up/down z = east/west
    return L.marker([(z / divider), (x / divider)], {
      title,
      icon,
    });
  }

  private addMarker(gMarker: GMarker<any>) {
    const { marker } = gMarker;
    marker.addTo(this.map);
  }

  private removeMarker(gMarker: GMarker<any>) {
    const { marker } = gMarker;
    marker.removeFrom(this.map);
  }

}
