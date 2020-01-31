import { Component, AfterViewInit } from '@angular/core';

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
    worldSettingsService: WorldSettingsService,
  ) {
    worldSettingsService.get().subscribe((settings) => {
      this.worldSettings = settings;
    });
  }

  ngAfterViewInit() {
    const {imageUrl, bounds, zenRaw } = this.worldSettings;
    setTimeout(() => {
      this.mapService.init(bounds, imageUrl);
      this.world = new World(zenRaw);
    }, 0);
  }
}
