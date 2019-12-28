import { Component, Output, Input, EventEmitter } from '@angular/core';

import { World } from '../../models/world';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
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
