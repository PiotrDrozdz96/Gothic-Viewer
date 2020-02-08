import { Component, Input } from '@angular/core';

import { ZenProperty } from '@worlds/types';

@Component({
  selector: 'app-zen-property',
  templateUrl: './zen-property.component.html',
  styleUrls: ['./zen-property.component.scss'],
})
export class ZenPropertyComponent {

  @Input()
  vobProperty: ZenProperty;

  constructor() { }

}
