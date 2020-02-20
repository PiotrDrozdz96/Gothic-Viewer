import { Component, AfterViewInit } from '@angular/core';
import { get } from 'lodash';

import { World, PrefixZenData, Waynet, Vobtree } from '@worlds/models';
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
    const {images, zenRaw } = this.worldSettings;
    setTimeout(() => {
      this.mapService.init(images);
      this.world = new World(zenRaw);
    }, 0);
  }

  get prefixZenData(): PrefixZenData { return get(this.world, 'prefixZenData', undefined); }
  get vobtree(): Vobtree { return get(this.world, 'vobtree', undefined); }
  get waynet(): Waynet { return get(this.world, 'waynet', undefined); }
}
