import { Component, AfterViewInit } from '@angular/core';
import { forEach } from 'lodash';

import { World } from '../../models/world';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-worlds',
  templateUrl: './world-page.component.html',
  styleUrls: ['./world-page.component.css']
})
export class WorldPageComponent implements AfterViewInit {
  public world: World;

  constructor(public mapService: MapService) { }

  ngAfterViewInit() {
    this.mapService.init();
  }

  initWorld(fileResult) {
    this.world = new World(fileResult);
  }

}