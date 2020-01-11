import { Component, Input } from '@angular/core';

import { GColor } from '@worlds/models';

@Component({
  selector: 'app-g-color',
  templateUrl: './g-color.component.html',
  styleUrls: ['./g-color.component.scss'],
})
export class GColorComponent {

  @Input()
  color: GColor;

  constructor() { }

}
