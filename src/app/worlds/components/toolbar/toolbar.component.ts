import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  @Output() fileResult = new EventEmitter<string>();

  constructor() { }

  emitFileResult(fileResult) { this.fileResult.emit(fileResult); }
}
