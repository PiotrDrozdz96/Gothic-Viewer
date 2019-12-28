import { Component, Output, Input, EventEmitter } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

import { World } from '../../models/world';

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
export class ToolbarComponent {
  public fileName = '';
  public isOpenToolbar = true;

  @Output() fileResult = new EventEmitter<string>();

  @Input() world: World;

  constructor() { }

  emitFileResult(fileResult: string) { this.fileResult.emit(fileResult); }
  setFileName(fileName: string) { this.fileName = fileName; }
  setIsOpenToolbar(value: boolean) { this.isOpenToolbar = value; }
}
