import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { PrefixZenData } from '@worlds/models';

export interface PrefixZenDialogData {
  fileName: string;
  prefixZenData: PrefixZenData;
}

@Component({
  selector: 'app-prefix-zen-data',
  templateUrl: 'prefix-zen-data.component.html',
  styleUrls: ['./prefix-zen-data.component.scss'],
})
export class PrefixZenDataComponent {
  constructor(
    public dialogRef: MatDialogRef<PrefixZenDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PrefixZenDialogData,
  ) { }

  get fileName(): string { return this.data.fileName; }
  get prefixZenData(): PrefixZenData { return this.data.prefixZenData; }
}
