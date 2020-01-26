import { Component, OnChanges, Output, Input, EventEmitter, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { mapValues, forEach, has, get, map, values, includes, split } from 'lodash';

import { leftPanelAnimation } from '@common/animations';

import { ToolbarService } from '@toolbar/services';
import { MAP } from '@toolbar/consts';

import { VOB } from '@worlds/consts';
import { World, ZCVob } from '@worlds/models';
import { VobFilter, VobFilters, VobMarkerGroup } from '@worlds/types';
import { MapService, WorldSettingsService } from '@worlds/services';
import { PrefixZenDataComponent } from '@worlds/dialogs';

const initChecked = [VOB.ZC_TRIGGER_CHANGE_LEVEL, VOB.START_POINT, VOB.LEVEL_COMPO];

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

  @Output() fileResult = new EventEmitter<string>();

  @Input() world: World;

  constructor(
    private mapService: MapService,
    private worldSettingsService: WorldSettingsService,
    private toolbarService: ToolbarService,
    private dialog: MatDialog,
  ) {
    worldSettingsService.get().subscribe((settings) => {
      const { name } = settings;
      this.name = name;
    });
    toolbarService.getActiveObs().subscribe((active) => {
      this.isOpenPanel = active === MAP;
    });
  }

  public ngOnChanges(changes: SimpleChanges) {
    const world: World = get(changes, ['world', 'currentValue']);
    if (world) {
      this.vobFilters = map(
        world.vobtree.getSortedVobtree(),
        (vobs: Array<ZCVob>) => {
          return {
            checked: includes(initChecked, vobs[0].vobType.type),
            text: split(vobs[0].vobType.type || 'zCVob:', ':', 1)[0],
            vobMarkerGroup: this.mapService.markersGroup(vobs),
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
    const dialogRef = this.dialog.open(PrefixZenDataComponent, {
      minWidth: 520,
      data: {
        fileName: this.name,
        prefixZenData: this.world.prefixZenData,
      },
    });
  }

  public onCheckboxChange({ checked }, vobMarkerGroup: VobMarkerGroup) {
    if (checked) {
      this.mapService.addMarkersGroup(vobMarkerGroup);
    } else {
      this.mapService.removeMarkersGroup(vobMarkerGroup);
    }
  }
}
