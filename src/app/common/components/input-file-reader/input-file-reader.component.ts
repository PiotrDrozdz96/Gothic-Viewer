import { Component, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { pick } from 'lodash';

import { ReadedFile } from '@common/types';

const pickFile = (file) => pick(file, [
  'name',
  'lastModified',
  'lastModifiedDate',
  'webkitRelativePath',
  'size',
  'type',
  'result',
]);

@Component({
  selector: 'app-input-file-reader',
  templateUrl: './input-file-reader.component.html',
})
export class InputFileReaderComponent {

  @Output() readedFile = new EventEmitter<ReadedFile>();

  @ViewChild('elementRef', { static: true }) elementRef: ElementRef<HTMLInputElement>;

  constructor() { }

  get nativeElement(): HTMLInputElement { return this.elementRef.nativeElement; }

  public fileChange({ target: { files } }: EventFrom<HTMLInputElement>) {
    const reader = new FileReader();
    const file = files[0];

    reader.readAsText(file);
    reader.onload = () => {
      const result = reader.result as string;
      this.readedFile.emit({...pickFile(file), result});
    };
  }

}
