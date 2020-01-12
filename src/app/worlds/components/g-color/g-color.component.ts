import { Component, Input } from '@angular/core';

import { Color } from '@common/types';

@Component({
  selector: 'app-g-color',
  templateUrl: './g-color.component.html',
  styleUrls: ['./g-color.component.scss'],
})
export class GColorComponent {

  @Input()
  color: Color;

  constructor() { }

}
