import { Component } from '@angular/core';

import { ToolbarService } from '@toolbar/services';
import { MAP, WAYNET } from '@toolbar/consts';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {

  readonly MAP = MAP;
  readonly WAYNET = WAYNET;

  public active: string;

  constructor(private toolbarService: ToolbarService) {
    toolbarService.getActiveObs().subscribe((active) => {
      this.active = active;
    });
  }

  public setActive(active: string) {
    this.toolbarService.setActive(active);
  }

}
