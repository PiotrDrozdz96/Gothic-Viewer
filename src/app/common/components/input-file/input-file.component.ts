import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.css']
})
export class InputFileComponent {

  @Output() fileResult = new EventEmitter<string>();
  fileName = 'Nie wybrano pliku';

  constructor() { }

  onFileSelected(event) {
    const reader = new FileReader();
    reader.readAsText(event.target.files[0]);
    this.fileName = event.target.files[0].name;
    reader.onload = () => {
      this.fileResult.emit(reader.result);
    };
  }

}
