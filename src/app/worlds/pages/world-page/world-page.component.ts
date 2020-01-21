import { Component, AfterViewInit } from '@angular/core';
import { forEach } from 'lodash';

import { World } from '@worlds/models';
import { MapService, WorldSettingsService } from '@worlds/services';
import { WorldSettings } from '@worlds/types';

@Component({
  selector: 'app-worlds',
  templateUrl: './world-page.component.html',
  styleUrls: ['./world-page.component.scss'],
})
export class WorldPageComponent implements AfterViewInit {
  public world: World;
  private worldSettings: WorldSettings;

  constructor(
    private mapService: MapService,
    private worldSettingsService: WorldSettingsService,
  ) {
    worldSettingsService.get().subscribe((settings) => {
      this.worldSettings = settings;
    });
  }

  ngAfterViewInit() {
    this.mapService.init();
  }

  initWorld(fileResult) {
    this.world = new World(fileResult);
  }

}
