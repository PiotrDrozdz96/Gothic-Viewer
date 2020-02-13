import { Component } from '@angular/core';
import { omit, entries, map } from 'lodash';

import { leftPanelAnimation } from '@common/animations';
import { MapService } from '@worlds/services';
import { ZenProperty, ZC, BlockLine } from '@worlds/types';

@Component({
  selector: 'app-zc-panel',
  templateUrl: './zc-panel.component.html',
  styleUrls: ['./zc-panel.component.scss'],
  animations: [leftPanelAnimation],
})
export class ZCPanelComponent {

  public zc: ZC;
  public panelData: Array<ZenProperty>;

  constructor(private mapService: MapService) {
    this.mapService.openedZC.subscribe((gMarker) => {
      if (gMarker) {
        const { value } = gMarker;
        this.zc = value;
        this.mapPanelData(value);
      } else {
        this.zc = undefined;
      }
    });
  }

  get zcType(): BlockLine { return this.zc.zcType; }

  private mapPanelData(zc: ZC) {
    this.panelData = map(
      entries(omit(zc, ['index', 'unknownValue', 'zcType'])),
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
