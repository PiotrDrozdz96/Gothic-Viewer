import { Component, Input } from '@angular/core';

import { ZenProperty } from '@worlds/types';

@Component({
  selector: 'app-zen-property',
  templateUrl: './zen-property.component.html',
  styleUrls: ['./zen-property.component.scss'],
})
export class ZenPropertyComponent {

  @Input()
  zenProperty: ZenProperty;

  constructor() { }

  get key(): string { return this.zenProperty.key; }
  get value(): any { return this.zenProperty.property.value; }
  get type(): string { return this.zenProperty.property.type; }

}
