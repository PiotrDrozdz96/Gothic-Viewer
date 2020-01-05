import { Component } from '@angular/core';
import { omit, entries, map } from 'lodash';

import { leftPanelAnimation } from '@common/animations';

import { ZCVob } from '../../models/vob';
import { MapService } from '../../services/map.service';

interface Property {
  key: string;
  value: any;
}

@Component({
  selector: 'app-vob-panel',
  templateUrl: './vob-panel.component.html',
  styleUrls: ['./vob-panel.component.css'],
  animations: [leftPanelAnimation]
})
export class VobPanelComponent {

  public vob: ZCVob;
  public panelData: Array<Property>;

  constructor(private mapService: MapService) {
    this.mapService.openedVob.subscribe((gMarker) => {
      if  (gMarker) {
        const { vob } = gMarker;
        this.vob = vob;
        this.mapPanelData(vob);
      } else {
        this.vob = undefined;
      }
    });
  }

  close() {
    this.mapService.closeVob();
  }

  mapPanelData(vob: ZCVob) {
    this.panelData = map(
      entries(omit(vob, ['index', 'unknownValue', 'vobType'])),
      ([key, gType]: [string, any]) => ({
        key,
        value: gType.value
      })
    );
  }

}
