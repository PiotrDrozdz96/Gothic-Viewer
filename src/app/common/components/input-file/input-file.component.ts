import { Component, Output, Input, EventEmitter } from '@angular/core';

type InputFileType = 'mat-rised-button' | 'icon';

@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.css']
})
export class InputFileComponent {
  public label = 'Nie wybrano pliku';

  @Input() type: InputFileType = 'mat-rised-button';
  @Input() showLabel = false;

  @Output() fileResult = new EventEmitter<string>();
  @Output() fileName = new EventEmitter<string>();

  constructor() { }

  onFileSelected(event) {
    const reader = new FileReader();
    reader.readAsText(event.target.files[0]);
    this.label = event.target.files[0].name;
    this.fileName.emit(this.label);
    reader.onload = () => {
      this.fileResult.emit(reader.result as string);
    };
  }

}
