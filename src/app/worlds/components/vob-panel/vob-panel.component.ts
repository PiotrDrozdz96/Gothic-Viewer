import { Component } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { omit, entries, map } from 'lodash';

import { oneOfVobType } from '../../models/vob';
import { GMapService } from '../../services/gMap.service';

interface Property {
  key: string;
  value: any;
}

@Component({
  selector: 'app-vob-panel',
  templateUrl: './vob-panel.component.html',
  styleUrls: ['./vob-panel.component.css'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({ left: -360 }),
          animate('200ms', style({ left: 0 }))
        ]),
        transition(':leave', [
          style({ left: 0}),
          animate('200ms', style({ left: -360 }))
        ])
      ]
    )
  ],
})
export class VobPanelComponent {

  public vob: oneOfVobType;
  public panelData: Array<Property>;

  constructor(private gMap: GMapService) {
    this.gMap.openedVob.subscribe((gMarker) => {
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
    this.gMap.closeVob();
  }

  mapPanelData(vob: oneOfVobType) {
    this.panelData = map(
      entries(omit(vob, ['index', 'unknownValue', 'vobType'])),
      ([key, gType]) => ({
        key,
        value: gType.value
      })
    );
    console.log(this.panelData);
  }

}
