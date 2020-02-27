import { Component, Output, Input, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { pick } from 'lodash';

import { ReadedFile } from '@common/types';

const pickFile = (file: File) => pick(file, [
  'name',
  'lastModified',
  'lastModifiedDate',
  'webkitRelativePath',
  'size',
  'type',
]);

@Component({
  selector: 'app-input-file-reader',
  templateUrl: './input-file-reader.component.html',
})
export class InputFileReaderComponent {

  private reader = new FileReader();

  @Output() readedFile = new EventEmitter<ReadedFile>();
  @Input() accept: string;
  @ViewChild('elementRef', { static: true }) elementRef: ElementRef<HTMLInputElement>;

  constructor() { }

  get nativeElement(): HTMLInputElement { return this.elementRef.nativeElement; }

  public fileChange({ target }: EventFrom<HTMLInputElement>) {
    const file = target.files[0];

    this.reader.readAsText(file);
    this.reader.onload = () => {
      const result = this.reader.result as string;
      this.readedFile.emit({...pickFile(file), result});
      target.value = '';
    };
  }

}
