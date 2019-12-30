import { Component, OnChanges, Output, Input, EventEmitter, SimpleChanges } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { mapValues, forEach, has, get, map, values, includes } from 'lodash';

import { OC_ITEM } from '../../consts/vobTypes';
import { World } from '../../models/world';
import { GMap } from '../../models/gMap';
import { oneOfVobType } from '../../models/vob';
import { VobFilter, VobFilters } from '../../models/vobFilter';
import { DialogPrefixZenData } from '../../components/dialog-prefix-zen-data/dialog-prefix-zen-data';

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
  public vobfilters: VobFilters;

  @Output() fileResult = new EventEmitter<string>();

  @Input() world: World;
  @Input() gMap: GMap;

  constructor(public dialog: MatDialog) {}

  ngOnChanges(changes: SimpleChanges) {
    const world: World = get(changes, ['world', 'currentValue']);
    if (world) {
      this.vobfilters = map(values(world.vobtree), (vobs: Array<oneOfVobType>) => {
        return {
          checked: includes(initChecked, vobs[0].vobType.type),
          markers: map(vobs, (vob: oneOfVobType) =>
            this.gMap.createMarker(vob.trafoOSToWSPos, vob.vobName.value))
        };
      });
      forEach(this.vobfilters, (vobFilter: VobFilter) => {
        if (vobFilter.checked) {
          forEach(vobFilter.markers, (marker: L.Marker) => {
            this.gMap.addMarker(marker);
          });
        }
      });
    }
  }

  emitFileResult(fileResult: string) { this.fileResult.emit(fileResult); }
  setFileName(fileName: string) { this.fileName = fileName; }
  setIsOpenToolbar(value: boolean) { this.isOpenToolbar = value; }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogPrefixZenData, {
      minWidth: 520,
      data: {
        fileName: this.fileName,
        prefixZenData: this.world.prefixZenData
      }
    });
  }
}
