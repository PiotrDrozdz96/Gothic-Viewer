import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { skip } from 'rxjs/operators';
import * as L from 'leaflet';
import { forEach, map, omit, replace } from 'lodash';

import { ClassNames } from '@common/utils';

import { waypointIcon, bounceMarkerClassName } from '@worlds/consts';
import {
  ZCVob, ZCWaypoint, GVec3,
  Waypoints, WayType, Way, WorldItems,
} from '@worlds/models';
import { GMarker, GMarkerGroup, ItemFilter, ZC } from '@worlds/types';
import { isImageIcon } from '@worlds/utils';

const divider = 150;
const toolbardisplacement = 2.5;

interface ZoomedMarkers { [key: number]: Array<L.Marker>; }

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private bouncingMarker: L.Marker;
  private map: L.Map;
  private layers: ZoomedMarkers;
  public filterItems: ItemFilter[] = [];
  public openedZC = new BehaviorSubject<GMarker<ZC>>(undefined);
  public triggerFilterItems = new BehaviorSubject<boolean>(false);

  constructor() {
    this.openedZC.subscribe((gMarker) => {
      if (!gMarker) {
        this.unbounceMarker();
      }
    });
  }

  public init(images: Array<L.ImageOverlay>, items: WorldItems) {
    this.layers = {};
    this.map = L.map('map', {
      crs: L.CRS.Simple,
      zoomControl: false,
    });
    forEach(images, (image) => { image.addTo(this.map); });
    this.map.fitBounds(images[0].getBounds());
    this.map.on('moveend', () => this.placeMarkersInBounds());

    this.filterItems = items.chest.value.map((item) => ({
      checked: false,
      text: item.instance,
      number: item.number,
    }));
  }

  get withFilters (): boolean {
    return this.filterItems.some((item) => item.checked);
  }

  public handleItemsFilter() {
    this.triggerFilterItems.next(!this.triggerFilterItems.getValue());
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

  public waynetPolyline(waypoints: Waypoints, ways: Array<Way>): L.Polyline {
    return L.polyline(map(ways, (way: Way): Array<L.LatLngExpression> => (
      map(way, (point: WayType): L.LatLngExpression => (
        this.latLngFromVec3(waypoints[point.getPointerNumber()].position)
      ))
    )), { color: '#ff0000' });
  }

  public addMarkersGroup(gMarkers: GMarkerGroup<any>, zoom: number = 0) {
    forEach(gMarkers.markers, ({ marker }) => {
      this.add(marker, zoom, true);
    });
    this.placeMarkersInBounds();
  }

  public removeMarkersGroup(gMarkers: GMarkerGroup<any>, zoom: number = 0) {
    forEach(gMarkers.markers, ({ marker }) => {
      this.remove(marker, zoom, true);
    });
    this.placeMarkersInBounds();
  }

  public openZC(gMarker: GMarker<ZC>, isCenter: boolean) {
    this.highlightMarker(gMarker.marker, isCenter);
    this.openedZC.next(gMarker);
  }

  public closeZC() {
    this.openedZC.next(undefined);
  }

  public add(layer: L.Layer, zoom: number = 0, isFromGroup: boolean = false) {
    if (zoom !== -1) {
      if (!this.layers[zoom]) {
        this.layers[zoom] = [];
      }
      this.layers[zoom].push(layer as L.Marker);
    } else {
      layer.addTo(this.map);
    }
    if (!isFromGroup) { this.placeMarkersInBounds(); }
  }

  public remove(layer: L.Layer, zoom: number = 0, isFromGroup: boolean = false) {
    layer.removeFrom(this.map);
    if (zoom !== -1 && this.layers[zoom]) {
      this.layers[zoom] = this.layers[zoom].filter((value) => value !== layer);
    }
    if (!isFromGroup) { this.placeMarkersInBounds(); }
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

  private latLngFromVec3(vec3: GVec3): L.LatLngExpression {
    const [x, y, z] = vec3.value; // x = north/south y = up/down z = east/west
    return [(z / divider), (x / divider)];
  }

  private createMarker(vec3: GVec3, title: string, icon: L.DivIcon): L.Marker {
    return L.marker(this.latLngFromVec3(vec3), {
      title,
      icon,
    });
  }

  private placeMarkersInBounds() {
    const zoom: number = this.map.getZoom();
    const mapBounds: L.LatLngBounds = this.map.getBounds();
    const myMarkers: Array<L.Marker> = [];

    forEach(this.layers, (markers, key) => {
      if (parseInt(key, 10) <= zoom) { // breakdown based on zoom
        forEach(markers, (marker) => {
          marker.removeFrom(this.map);
          const shouldBeVisible = mapBounds.contains(marker.getLatLng());
          if (shouldBeVisible) { // breakdown based on viewport
            myMarkers.push(marker);
          }
        });
      } else {
        forEach(markers, (marker) => {
          marker.removeFrom(this.map);
        });
      }
    });

    if (myMarkers.length <= 1000) {
      forEach(myMarkers, (marker) => {
        marker.addTo(this.map);
      });
    }
  }
}
