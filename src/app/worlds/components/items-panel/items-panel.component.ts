import { Component, OnDestroy } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';

import { leftPanelAnimation } from '@common/animations';

import { ToolbarService } from '@toolbar/services';
import { MapService } from '@worlds/services';
import { ITEMS } from '@toolbar/consts';

import { ItemFilter } from '@worlds/types';

@Component({
  selector: 'app-items-panel',
  templateUrl: './items-panel.component.html',
  styleUrls: ['./items-panel.component.scss'],
  animations: [ leftPanelAnimation ],
})
export class ItemsPanelComponent {
  public isOpenPanel = true;

  constructor(toolbarService: ToolbarService, private mapService: MapService) {
    toolbarService.getActiveObs().subscribe((active) => {
      this.isOpenPanel = active === ITEMS;
    });
  }


  get items(): ItemFilter[] { return this.mapService.filterItems; }


  public onChange() {
    this.mapService.handleItemsFilter();
  }
}
