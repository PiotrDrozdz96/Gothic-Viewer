import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toolbar-icon',
  templateUrl: './toolbar-icon.component.html',
  styleUrls: ['./toolbar-icon.component.scss'],
})
export class ToolbarIconComponent {

  @Input() isVisible = true;
  @Input() isActive = false;

  constructor() { }

}
