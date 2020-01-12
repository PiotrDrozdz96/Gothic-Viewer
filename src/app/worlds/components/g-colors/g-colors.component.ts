import { Component, Input } from '@angular/core';

import { Colors } from '@common/types';

@Component({
  selector: 'app-g-colors',
  templateUrl: './g-colors.component.html',
  styleUrls: ['./g-colors.component.scss'],
})
export class GColorsComponent {

  @Input()
  colors: Colors;

  constructor() { }

}
