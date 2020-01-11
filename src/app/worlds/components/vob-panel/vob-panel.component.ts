import { Component } from '@angular/core';
import { omit, entries, map, join, isArray } from 'lodash';

import { leftPanelAnimation } from '@common/animations';
import { ZCVob } from '@worlds/models';
import { MapService } from '@worlds/services';
import { VobProperty } from '@worlds/types';

@Component({
  selector: 'app-vob-panel',
  templateUrl: './vob-panel.component.html',
  styleUrls: ['./vob-panel.component.scss'],
  animations: [leftPanelAnimation],
})
export class VobPanelComponent {

  public vob: ZCVob;
  public panelData: Array<VobProperty>;

  constructor(private mapService: MapService) {
    this.mapService.openedVob.subscribe((gMarker) => {
      if (gMarker) {
        const { vob } = gMarker;
        this.vob = vob;
        this.mapPanelData(vob);
      } else {
        this.vob = undefined;
      }
    });
  }

  private mapPanelData(vob: ZCVob) {
    this.panelData = map(
      entries(omit(vob, ['index', 'unknownValue', 'vobType'])),
      ([key, gType]: [string, any]) => ({
        key,
        value: gType.value,
      }),
    );
  }

  public close() {
    this.mapService.closeVob();
  }
}
