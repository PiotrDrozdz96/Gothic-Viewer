import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { PrefixZenData } from '../../models/prefixZenData';

interface Data {
  fileName: string;
  prefixZenData: PrefixZenData;
}

@Component({
  selector: 'app-prefix-zen-data',
  styleUrls: ['./prefix-zen-data.dialog.css'],
  templateUrl: 'prefix-zen-data.dialog.html',
})
export class PrefixZenDataDialog {
  constructor(
    public dialogRef: MatDialogRef<PrefixZenDataDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Data
  ) { }
}
