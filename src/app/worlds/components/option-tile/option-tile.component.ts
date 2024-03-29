import { Component, Input, ContentChildren, QueryList, ElementRef } from '@angular/core';
import { invokeMap } from 'lodash';

@Component({
  selector: 'app-option-tile',
  templateUrl: './option-tile.component.html',
  styleUrls: ['./option-tile.component.scss'],
})
export class OptionTileComponent {

  @Input() text: string;
  @Input() backgroundImage: string;
  @Input() isActive: boolean;

  @ContentChildren('click') clickableChildren: QueryList<ElementRef<HTMLInputElement>>;

  constructor() { }

  public click() {
    invokeMap(this.clickableChildren.toArray(), 'nativeElement.click');
  }

}
