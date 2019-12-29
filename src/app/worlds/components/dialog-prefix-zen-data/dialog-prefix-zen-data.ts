import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { PrefixZenData } from '../../models/prefixZenData';

interface Data {
  fileName: string;
  prefixZenData: PrefixZenData;
}

@Component({
  selector: 'dialog-prefix-zen-data',
  styleUrls: ['./dialog-prefix-zen-data.css'],
  templateUrl: 'dialog-prefix-zen-data.html',
})
export class DialogPrefixZenData {
  constructor(
    public dialogRef: MatDialogRef<DialogPrefixZenData>,
    @Inject(MAT_DIALOG_DATA) public data: Data
  ) { }
}
