import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import { get } from 'lodash';

import { GLayerGroup } from '../../models/GLayerGroup';
import { GMapService } from '../../services/gMap.service';

@Component({
  selector: 'app-vobs-list',
  templateUrl: './vobs-list.component.html',
  styleUrls: ['./vobs-list.component.css']
})
export class VobsListComponent implements OnChanges {
  isOpened = false;

  @Input() checked: boolean;
  @Input() text: string;
  @Input() layerGroup: GLayerGroup;

  constructor(public gMap: GMapService) { }

  ngOnChanges(changes: SimpleChanges) {
    const checked: boolean = get(changes, ['checked', 'currentValue']);
    if (!checked) {
      this.isOpened = false;
    }
  }

  setOpened() { this.isOpened = !this.isOpened; }

}
