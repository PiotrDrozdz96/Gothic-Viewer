import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import { get } from 'lodash';

import { OCItem, OCMobContainer, ZCVob } from '@worlds/models';
import { GMarker, GMarkerGroup } from '@worlds/types';
import { MapService } from '@worlds/services';
import { VOB } from '@worlds/consts';

@Component({
  selector: 'app-vobs-list',
  templateUrl: './vobs-list.component.html',
  styleUrls: ['./vobs-list.component.scss'],
})
export class VobsListComponent implements OnChanges {
  isOpened = false;

  @Input() checked: boolean;
  @Input() text: string;
  @Input() vobMarkerGroup: GMarkerGroup<ZCVob>;

  constructor(public mapService: MapService) { }

  ngOnChanges(changes: SimpleChanges) {
    const checked: boolean = get(changes, ['checked', 'currentValue']);
    if (!checked) {
      this.isOpened = false;
    }
  }

  public setOpened() { this.isOpened = !this.isOpened; }

  get selectedItems(): Array<string> {
    return this.mapService.filterItems.filter((item) => item.checked).map((item) => item.text);
  }

  public isVisible(gMarker: GMarker<ZCVob>): boolean {
    switch(gMarker.value.zcType.type) {
      case VOB.OC_ITEM:
        if(this.mapService.withFilters) {
          return this.selectedItems.includes((gMarker.value as OCItem).itemInstance.value);
        } else {
          return true;
        }
      case VOB.OC_MOB_CONTAINER:
        if(this.mapService.withFilters) {
          return !!(gMarker.value as OCMobContainer).contains.value.find((item) => this.selectedItems.includes(item.instance));
        } else {
          return true;
        }
      default:
        return true;
    }
  };

  public openVob(index: number) {
    this.mapService.openZC(this.vobMarkerGroup.markers[index], true);
  }

}
