import { Component, OnChanges, Output, Input, EventEmitter, SimpleChanges } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { mapValues, forEach, has } from 'lodash';

import { VobTreeFilter, OC_ITEM } from '../../consts/vobTypes';
import { World } from '../../models/world';
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
  public vobTreeFilter: VobTreeFilter;

  @Output() fileResult = new EventEmitter<string>();

  @Input() world: World;

  constructor(public dialog: MatDialog) {}

  ngOnChanges(changes: SimpleChanges) {
    const { previousValue, currentValue, firstChange } = changes.world as SimpleChange<World>;
    if (currentValue) {
      this.vobTreeFilter = mapValues(currentValue.vobtree, () => false);
      forEach(initChecked, (key) => {
        if (has(this.vobTreeFilter, key)) {
          this.vobTreeFilter[key] = true;
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
