import { Component, OnInit, Input } from '@angular/core';

import { leftPanelAnimation } from '@common/animations';

import { ToolbarService } from '@toolbar/services';
import { WAYNET } from '@toolbar/consts';

import { Waynet } from '@worlds/models';
import { MapService, WorldSettingsService } from '@worlds/services';

@Component({
  selector: 'app-waynet-panel',
  templateUrl: './waynet-panel.component.html',
  styleUrls: ['./waynet-panel.component.scss'],
  animations: [ leftPanelAnimation ],
})
export class WaynetPanelComponent implements OnInit {
  public isOpenPanel = true;

  @Input() waynet: Waynet;

  constructor(
    private mapService: MapService,
    toolbarService: ToolbarService,
  ) {
    toolbarService.getActiveObs().subscribe((active) => {
      this.isOpenPanel = active === WAYNET;
    });
  }

  ngOnInit() {
  }

}
