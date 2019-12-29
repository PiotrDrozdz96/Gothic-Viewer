import { Component, OnInit } from '@angular/core';
import { forEach } from 'lodash';

import { World } from './models/world';
import { GMap } from './models/gMap';
import { OCItem } from './models/vob';
import { OC_ITEM } from './consts/vobTypes';

@Component({
  selector: 'app-worlds',
  templateUrl: './worlds.component.html',
  styleUrls: ['./worlds.component.css']
})
export class WorldsComponent implements OnInit {
  public gMap: GMap;
  public world: World;

  constructor() { }

  ngOnInit() {
    this.gMap = new GMap();
  }

  initWorld(fileResult) {
    this.world = new World(fileResult);
  }

}
