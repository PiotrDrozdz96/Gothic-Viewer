import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-option-tile-radio',
  templateUrl: './option-tile-radio.component.html',
  styleUrls: ['../option-tile.component.scss'],
})
export class OptionTileRadioComponent {

  @Input() control: FormControl;
  @Input() value: string;
  @Input() text: string;
  @Input() backgroundImage: string;

  constructor() { }

  public get checked(): boolean { return this.control.value === this.value; }

}
