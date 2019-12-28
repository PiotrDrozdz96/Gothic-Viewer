import { Component, AfterViewInit } from '@angular/core';
import _forEach from 'lodash/forEach';

import { World } from './models/world';
import { GMap } from './models/gMap';
import { OCItem } from './models/vob';

@Component({
  selector: 'app-worlds',
  templateUrl: './worlds.component.html',
  styleUrls: ['./worlds.component.css']
})
export class WorldsComponent implements AfterViewInit {
  private gMap: GMap;

  constructor() { }

  ngAfterViewInit() {
    this.gMap = new GMap();
  }

  initWorld(fileResult) {
    const world = new World(fileResult);
    _forEach(world.vobtree.ocItems, (vob: OCItem) => {
      this.gMap.addMarker(vob.trafoOSToWSPos, vob.itemInstance.value);
    });
  }

}
