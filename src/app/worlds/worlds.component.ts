import { Component, AfterViewInit } from '@angular/core';
import { forEach } from 'lodash';

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
  public world: World;

  constructor() { }

  ngAfterViewInit() {
    this.gMap = new GMap();
  }

  initWorld(fileResult) {
    this.world = new World(fileResult);
    forEach(this.world.vobtree.ocItems, (vob: OCItem) => {
      this.gMap.addMarker(vob.trafoOSToWSPos, vob.itemInstance.value);
    });
  }

}
