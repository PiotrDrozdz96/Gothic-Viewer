import { Component, AfterViewInit } from '@angular/core';
import { forEach } from 'lodash';

import { World } from './models/world';
import { OCItem } from './models/vob';
import { OC_ITEM } from './consts/vobTypes';
import { GMapService } from './services/gMap.service';

@Component({
  selector: 'app-worlds',
  templateUrl: './worlds.component.html',
  styleUrls: ['./worlds.component.css']
})
export class WorldsComponent implements AfterViewInit {
  public world: World;

  constructor(public gMap: GMapService) { }

  ngAfterViewInit() {
    this.gMap.init();
  }

  initWorld(fileResult) {
    this.world = new World(fileResult);
  }

}
