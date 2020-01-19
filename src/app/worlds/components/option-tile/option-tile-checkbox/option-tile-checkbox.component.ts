import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-option-tile-checkbox',
  templateUrl: './option-tile-checkbox.component.html',
  styleUrls: ['../option-tile.component.scss'],
})
export class OptionTileCheckboxComponent {

  @Input() control: FormControl;
  @Input() text: string;
  @Input() backgroundImage: string;

  constructor() { }

  public get checked(): boolean { return this.control.value; }

}
