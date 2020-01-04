import { Component, OnChanges, Output, Input, EventEmitter, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { mapValues, forEach, has, get, map, values, includes, split } from 'lodash';

import { leftPanelAnimation } from '@common/animations';

import { OC_ITEM } from '../../consts/vobTypes';
import { World } from '../../models/world';
import { oneOfVobType } from '../../models/vob';
import { VobFilter, VobFilters } from '../../models/vobFilter';
import { GMarkersGroup } from '../../models/gMarkersGroup';
import { getSortedVobtree } from '../../utils/getSortedVobtree';
import { GMapService } from '../../services/gMap.service';
import { PrefixZenDataDialog } from '../../components/prefix-zen-data/prefix-zen-data.dialog';

const initChecked = [OC_ITEM];

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

  constructor(public gMap: GMapService, public dialog: MatDialog) {}

  ngOnChanges(changes: SimpleChanges) {
    const world: World = get(changes, ['world', 'currentValue']);
    if (world) {
      this.vobFilters = map(
        getSortedVobtree(world.vobtree),
        (vobs: Array<oneOfVobType>) => {
          return {
            checked: includes(initChecked, vobs[0].vobType.type),
            text: split(vobs[0].vobType.type || 'zCVob:', ':', 1)[0],
            gMarkersGroup: this.gMap.markersGroup(vobs),
          };
        }
      );
      forEach(this.vobFilters, (vobFilter: VobFilter) => {
        if (vobFilter.checked) {
          this.gMap.addMarkersGroup(vobFilter.gMarkersGroup);
        }
      });
    }
  }

  emitFileResult(fileResult: string) { this.fileResult.emit(fileResult); }
  setFileName(fileName: string) { this.fileName = fileName; }
  setIsOpenToolbar(value: boolean) { this.isOpenToolbar = value; }
  openDialog(): void {
    const dialogRef = this.dialog.open(PrefixZenDataDialog, {
      minWidth: 520,
      data: {
        fileName: this.fileName,
        prefixZenData: this.world.prefixZenData
      }
    });
  }
  onCheckboxChange({ checked }, gMarkersGroup: GMarkersGroup) {
    if (checked) {
      this.gMap.addMarkersGroup(gMarkersGroup);
    } else {
      this.gMap.removeMarkersGroup(gMarkersGroup);
    }
  }
}
