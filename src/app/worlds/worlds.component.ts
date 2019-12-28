import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import _forEach from 'lodash/forEach';

import { getImage } from './utils/getImage';
import { World } from './models/world';
import { OCItem } from './models/vob';

const divider = 190;

@Component({
  selector: 'app-worlds',
  templateUrl: './worlds.component.html',
  styleUrls: ['./worlds.component.css']
})
export class WorldsComponent implements AfterViewInit {
  private map: L.Map;

  constructor() { }

  ngAfterViewInit() {
    this.initMap();
  }

  openFile(event) {
    const world = new World(event.target.files[0]);
    setTimeout(() => {
      _forEach(world.vobtree.ocItems, (vob: OCItem) => {
        this.addGMarker(vob.trafoOSToWSPos.value, vob.itemInstance.value);
      });
    }, 1000);
  }

  private addGMarker(cords: Array<number>, title: string) {
    L.marker([(cords[2] / divider), (cords[0] / divider)], {title}).addTo(this.map);
  }

  private initMap(): void {
    this.map = L.map('map', {
      crs: L.CRS.Simple,
    });
    const imageUrl = 'http://static.giantbomb.com/uploads/original/0/5684/805645-gothic_map_wp_1600x1200.png';
    getImage(imageUrl).subscribe((imageElement) => {
      const bounds: L.LatLngBoundsExpression = [
        [-(imageElement.naturalHeight / 4), -(imageElement.naturalWidth / 4)],
        [imageElement.naturalHeight / 4, imageElement.naturalWidth / 4]
      ];
      const image = L.imageOverlay(imageUrl, bounds).addTo(this.map);
      this.map.fitBounds(bounds);
    });
  }
}
