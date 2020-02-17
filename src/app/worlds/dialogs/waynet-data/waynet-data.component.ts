import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ZenProperty } from '@worlds/types';

export interface WaynetDialogData {
  startLine: string;
  properties: Array<ZenProperty>;
}

@Component({
  selector: 'app-waynet-data',
  templateUrl: './waynet-data.component.html',
  styleUrls: ['./waynet-data.component.scss'],
})
export class WaynetDataComponent {

  constructor(
    public dialogRef: MatDialogRef<WaynetDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: WaynetDialogData,
  ) { }

  get startLine(): string { return this.data.startLine; }
  get properties(): Array<ZenProperty> { return this.data.properties; }

}
