import { Component, OnChanges, Output, Input, EventEmitter, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { mapValues, forEach, has, get, map, values, includes, split } from 'lodash';

import { leftPanelAnimation } from '@common/animations';

import { VOB } from '../../consts/vob-types';
import { World } from '../../models/world';
import { oneOfVobType } from '../../types/one-of-vob-type';
import { VobFilter, VobFilters } from '../../types/vob-filter';
import { VobMarkerGroup } from '../../types/vob-marker-group';
import { getSortedVobtree } from '../../utils/get-sorted-vobtree';
import { MapService } from '../../services/map.service';
import { PrefixZenDataComponent } from '../../dialogs/prefix-zen-data/prefix-zen-data.component';

const initChecked = [VOB.OC_ITEM];

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  animations: [ leftPanelAnimation ]
})
export class ToolbarComponent implements OnChanges {
  public fileName = '';
  public isOpenToolbar = true;
  public vobFilters: VobFilters;

  @Output() fileResult = new EventEmitter<string>();

  @Input() world: World;

  constructor(public mapService: MapService, public dialog: MatDialog) {}

  ngOnChanges(changes: SimpleChanges) {
    const world: World = get(changes, ['world', 'currentValue']);
    if (world) {
      this.vobFilters = map(
        getSortedVobtree(world.vobtree),
        (vobs: Array<oneOfVobType>) => {
          return {
            checked: includes(initChecked, vobs[0].vobType.type),
            text: split(vobs[0].vobType.type || 'zCVob:', ':', 1)[0],
            vobMarkerGroup: this.mapService.markersGroup(vobs),
          };
        }
      );
      forEach(this.vobFilters, (vobFilter: VobFilter) => {
        if (vobFilter.checked) {
          this.mapService.addMarkersGroup(vobFilter.vobMarkerGroup);
        }
      });
    }
  }

  emitFileResult(fileResult: string) { this.fileResult.emit(fileResult); }
  setFileName(fileName: string) { this.fileName = fileName; }
  setIsOpenToolbar(value: boolean) { this.isOpenToolbar = value; }
  openDialog(): void {
    const dialogRef = this.dialog.open(PrefixZenDataComponent, {
      minWidth: 520,
      data: {
        fileName: this.fileName,
        prefixZenData: this.world.prefixZenData
      }
    });
  }
  onCheckboxChange({ checked }, vobMarkerGroup: VobMarkerGroup) {
    if (checked) {
      this.mapService.addMarkersGroup(vobMarkerGroup);
    } else {
      this.mapService.removeMarkersGroup(vobMarkerGroup);
    }
  }
}
