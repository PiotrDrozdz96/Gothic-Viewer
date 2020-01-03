import { Component } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

import { oneOfVobType } from '../../models/vob';
import { GMapService } from '../../services/gMap.service';

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

  constructor(private gMap: GMapService) {
    this.gMap.openedVob.subscribe((gMarker) => {
      if  (gMarker) {
        const { vob } = gMarker;
        this.vob = vob;
      } else {
        this.vob = undefined;
      }
    });
  }

  close() {
    this.gMap.closeVob();
  }

}
