import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as L from 'leaflet';
import { forEach, map, omit, replace } from 'lodash';

import { ClassNames } from '@common/utils';

import { waypointIcon, bounceMarkerClassName } from '@worlds/consts';
import { ZCVob, ZCWaypoint, GVec3 } from '@worlds/models';
import { GMarker, GMarkerGroup, ZC } from '@worlds/types';
import { isImageIcon } from '@worlds/utils';

const divider = 150;
const toolbardisplacement = 2.5;

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private bouncingMarker: L.Marker;
  openedZC = new BehaviorSubject<GMarker<ZC>>(undefined);
  map: L.Map;

  constructor() {
    this.openedZC.subscribe((gMarker) => {
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
      iconUrl: this.getMarkerIconUrl(vobs[0].zcType.type),
      markers: map(vobs, (vob: ZCVob) => {
        const gMarker: GMarker<ZCVob> = {
          value: vob,
          marker: this.createMarker(
            vob.trafoOSToWSPos, vob.vobName.value, this.getMarkerIcon(vob.zcType.type),
          ),
        };
        gMarker.marker.on('click', () => { this.openZC(gMarker, false); });

        return gMarker;
      }),
    };
  }

  public waypointsMarkersGroup(waypoints: Array<ZCWaypoint>): GMarkerGroup<ZCWaypoint> {
    return {
      markers: map(waypoints, (waypoint: ZCWaypoint) => {
        const gMarker = {
          value: waypoint,
          marker: this.createMarker(waypoint.position, waypoint.wpName.value, waypointIcon),
        };
        gMarker.marker.on('click', () => { this.openZC(gMarker, false); });

        return gMarker;
      }),
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

  public openZC(gMarker: GMarker<ZC>, isCenter: boolean) {
    this.highlightMarker(gMarker.marker, isCenter);
    this.openedZC.next(gMarker);
  }

  public closeZC() {
    this.openedZC.next(undefined);
  }

  private unbounceMarker() {
    if (this.bouncingMarker) {
      const markerIcon = this.bouncingMarker.getIcon();
      const iconConstructor = this.getIconContructor(markerIcon);

      this.bouncingMarker.setIcon(new iconConstructor({
        ...omit(markerIcon.options, ['className']),
        className: ClassNames.omit(markerIcon.options.className, [bounceMarkerClassName]),
      }));
      this.bouncingMarker = undefined;
    }
  }

  private bounceMarker(marker: L.Marker) {
    this.unbounceMarker();
    const markerIcon = marker.getIcon();
    const iconConstructor = this.getIconContructor(markerIcon);

    this.bouncingMarker = marker.setIcon(new iconConstructor({
      ...markerIcon.options,
      className: ClassNames.add(markerIcon.options.className, [bounceMarkerClassName]),
    }));
  }

  private getIconContructor(icon: L.Icon | L.DivIcon): typeof L.Icon | typeof L.DivIcon {
    return isImageIcon(icon) ? L.Icon : L.DivIcon;
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
