import { Component, OnChanges, Input, SimpleChanges, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { skip } from 'rxjs/operators';
import { forEach, get, map, includes, split } from 'lodash';

import { leftPanelAnimation } from '@common/animations';

import { ToolbarService } from '@toolbar/services';
import { MAP } from '@toolbar/consts';

import { VOB } from '@worlds/consts';
import { PrefixZenDataComponent, PrefixZenDialogData } from '@worlds/dialogs';
import { Vobtree, PrefixZenData, ZCVob, OCItem, OCMobContainer } from '@worlds/models';
import { GMarkerGroup, ItemFilter } from '@worlds/types';
import { MapService, WorldSettingsService } from '@worlds/services';
import { itemsVobs } from '@worlds/consts/items-vobs';
import { Subscription } from 'rxjs';

interface VobFilter {
  checked: boolean;
  text: string;
  vobMarkerGroup: GMarkerGroup<ZCVob>;
}

type VobFilters = Array<VobFilter>;

const initChecked = [VOB.ZC_TRIGGER_CHANGE_LEVEL, VOB.START_POINT];

@Component({
  selector: 'app-vobtree-panel',
  templateUrl: './vobtree-panel.component.html',
  styleUrls: ['./vobtree-panel.component.scss'],
  animations: [ leftPanelAnimation ],
})
export class VobtreePanelComponent implements OnChanges, OnDestroy {
  public isOpenPanel = true;
  public vobFilters: VobFilters;
  public name: string;

  private subscriptions: Subscription[] = [];

  @Input() vobtree: Vobtree;
  @Input() prefixZenData: PrefixZenData;

  constructor(
    private mapService: MapService,
    private dialog: MatDialog,
    worldSettingsService: WorldSettingsService,
    toolbarService: ToolbarService,
  ) {
    this.subscriptions.push(worldSettingsService.get().subscribe((settings) => {
      const { name } = settings;
      this.name = name;
    }));
    this.subscriptions.push(toolbarService.getActiveObs().subscribe((active) => {
      this.isOpenPanel = active === MAP;
    }));
    this.subscriptions.push(mapService.triggerFilterItems.pipe(skip(1)).subscribe(() => {
      const itemVobFilters = itemsVobs.map((value) => this.vobFilters.find((vobFilter) => vobFilter.text === value));
      itemVobFilters.forEach((vobFilter) => {
        if(vobFilter && vobFilter.checked) {
          this.mapService.removeMarkersGroup(vobFilter.vobMarkerGroup);
          if(this.mapService.withFilters) {
            const newGroup = { ...vobFilter.vobMarkerGroup };
            if(vobFilter.text === 'oCItem') {
              newGroup.markers = newGroup.markers.filter((marker) => this.selectedItems.includes((marker.value as OCItem).itemInstance.value));
            }
            if(vobFilter.text === 'oCMobContainer') {
              newGroup.markers = newGroup.markers.filter((marker) => (marker.value as OCMobContainer).contains.value.find((item) => this.selectedItems.includes(item.instance)));
            }
            this.mapService.addMarkersGroup(newGroup);
          } else {
            this.mapService.addMarkersGroup(vobFilter.vobMarkerGroup);
          }
        }
      });
    }));
  }

  get selectedItems(): Array<string> {
    return this.mapService.filterItems.filter((item) => item.checked).map((item) => item.text);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  ngOnChanges(changes: SimpleChanges) {
    const vobtree: Vobtree = get(changes, ['vobtree', 'currentValue']);
    if (vobtree) {
      this.vobFilters = map(
        vobtree.getSortedVobtree(),
        (vobs: Array<ZCVob>) => {
          return {
            checked: includes(initChecked, vobs[0].zcType.type),
            text: split(vobs[0].zcType.type || 'zCVob:', ':', 1)[0],
            vobMarkerGroup: this.mapService.vobMarkersGroup(vobs),
          };
        },
      );
      forEach(this.vobFilters, (vobFilter: VobFilter) => {
        if (vobFilter.checked) {
          this.mapService.addMarkersGroup(vobFilter.vobMarkerGroup);
        }
      });
    }
  }

  public openDialog(): void {
    this.dialog.open<PrefixZenDataComponent, PrefixZenDialogData>(PrefixZenDataComponent, {
      minWidth: 520,
      data: {
        fileName: this.name,
        prefixZenData: this.prefixZenData,
      },
    });
  }

  public onCheckboxChange(
    { checked }: MatCheckboxChange,
    text: string,
    vobMarkerGroup: GMarkerGroup<ZCVob>,
  ) {
    if (itemsVobs.includes(text)) {
      this.mapService.handleItemsFilter();
    } else if (checked) {
      this.mapService.addMarkersGroup(vobMarkerGroup);
    } else {
      this.mapService.removeMarkersGroup(vobMarkerGroup);
    }
  }
}
