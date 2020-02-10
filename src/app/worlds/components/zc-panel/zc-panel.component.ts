import { Component } from '@angular/core';
import { omit, entries, map } from 'lodash';

import { leftPanelAnimation } from '@common/animations';
import { ZCVob } from '@worlds/models';
import { MapService } from '@worlds/services';
import { ZenProperty } from '@worlds/types';

@Component({
  selector: 'app-zc-panel',
  templateUrl: './zc-panel.component.html',
  styleUrls: ['./zc-panel.component.scss'],
  animations: [leftPanelAnimation],
})
export class ZCPanelComponent {

  public vob: ZCVob;
  public panelData: Array<ZenProperty>;

  constructor(private mapService: MapService) {
    this.mapService.openedZC.subscribe((gMarker) => {
      if (gMarker) {
        const { value } = gMarker;
        this.vob = value;
        this.mapPanelData(value);
      } else {
        this.vob = undefined;
      }
    });
  }

  private mapPanelData(vob: ZCVob) {
    this.panelData = map(
      entries(omit(vob, ['index', 'unknownValue', 'zcType'])),
      ([key, gType]: [string, any]) => ({
        key,
        property: gType,
      }),
    );
  }

  public close() {
    this.mapService.closeZC();
  }
}
