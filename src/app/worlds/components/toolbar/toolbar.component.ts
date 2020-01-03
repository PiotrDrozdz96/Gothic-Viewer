import { Component, OnChanges, Output, Input, EventEmitter, SimpleChanges } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { mapValues, forEach, has, get, map, values, includes, split } from 'lodash';

import { OC_ITEM } from '../../consts/vobTypes';
import { World } from '../../models/world';
import { GMap } from '../../models/gMap';
import { oneOfVobType } from '../../models/vob';
import { VobFilter, VobFilters } from '../../models/vobFilter';
import { getSortedVobtree } from '../../utils/getSortedVobtree';
import { PrefixZenDataDialog } from '../../components/prefix-zen-data/prefix-zen-data.dialog';

const initChecked = [OC_ITEM];

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({ left: -360 }),
          animate('200ms', style({ left: 0 }))
        ]),
        transition(':leave', [
          style({ left: 0}),
          animate('200ms', style({ left: -360 }))
        ])
      ]
    )
  ],
})
export class ToolbarComponent implements OnChanges {
  public fileName = '';
  public isOpenToolbar = true;
  public vobFilters: VobFilters;

  @Output() fileResult = new EventEmitter<string>();

  @Input() world: World;
  @Input() gMap: GMap;

  constructor(public dialog: MatDialog) {}

  ngOnChanges(changes: SimpleChanges) {
    const world: World = get(changes, ['world', 'currentValue']);
    if (world) {
      this.vobFilters = map(
        getSortedVobtree(world.vobtree),
        (vobs: Array<oneOfVobType>) => {
          return {
            checked: includes(initChecked, vobs[0].vobType.type),
            text: split(vobs[0].vobType.type || 'zCVob:', ':', 1)[0],
            layerGroup: this.gMap.layerGroup(vobs),
          };
        }
      );
      forEach(this.vobFilters, (vobFilter: VobFilter) => {
        if (vobFilter.checked) {
          this.gMap.addLayer(vobFilter.layerGroup.layer);
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
  onCheckboxChange({ checked }, layerGroup: L.LayerGroup) {
    if (checked) {
      this.gMap.addLayer(layerGroup);
    } else {
      this.gMap.removeLayer(layerGroup);
    }
  }
}
