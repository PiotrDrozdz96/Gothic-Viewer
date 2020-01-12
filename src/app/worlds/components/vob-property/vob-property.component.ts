import { Component, Input } from '@angular/core';

import { VobProperty } from '@worlds/types';

@Component({
  selector: 'app-vob-property',
  templateUrl: './vob-property.component.html',
  styleUrls: ['./vob-property.component.scss'],
})
export class VobPropertyComponent {

  @Input()
  vobProperty: VobProperty;

  constructor() {}

}
