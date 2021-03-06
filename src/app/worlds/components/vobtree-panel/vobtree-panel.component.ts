import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { forEach, get, map, includes, split } from 'lodash';

import { leftPanelAnimation } from '@common/animations';

import { ToolbarService } from '@toolbar/services';
import { MAP } from '@toolbar/consts';

import { VOB } from '@worlds/consts';
import { PrefixZenDataComponent, PrefixZenDialogData } from '@worlds/dialogs';
import { Vobtree, PrefixZenData, ZCVob } from '@worlds/models';
import { GMarkerGroup } from '@worlds/types';
import { MapService, WorldSettingsService } from '@worlds/services';

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
export class VobtreePanelComponent implements OnChanges {
  public isOpenPanel = true;
  public vobFilters: VobFilters;
  public name: string;

  @Input() vobtree: Vobtree;
  @Input() prefixZenData: PrefixZenData;

  constructor(
    private mapService: MapService,
    private dialog: MatDialog,
    worldSettingsService: WorldSettingsService,
    toolbarService: ToolbarService,
  ) {
    worldSettingsService.get().subscribe((settings) => {
      const { name } = settings;
      this.name = name;
    });
    toolbarService.getActiveObs().subscribe((active) => {
      this.isOpenPanel = active === MAP;
    });
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
    vobMarkerGroup: GMarkerGroup<ZCVob>,
  ) {
    if (checked) {
      this.mapService.addMarkersGroup(vobMarkerGroup);
    } else {
      this.mapService.removeMarkersGroup(vobMarkerGroup);
    }
  }
}
