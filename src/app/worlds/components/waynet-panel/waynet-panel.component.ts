import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { get, values, trim } from 'lodash';

import { leftPanelAnimation } from '@common/animations';

import { ToolbarService } from '@toolbar/services';
import { WAYNET } from '@toolbar/consts';

import { WaynetDataComponent, WaynetDialogData } from '@worlds/dialogs';
import { Waynet, Waypoints, ZCWaypoint } from '@worlds/models';
import { MapService } from '@worlds/services';
import { GMarkerGroup } from '@worlds/types';

@Component({
  selector: 'app-waynet-panel',
  templateUrl: './waynet-panel.component.html',
  styleUrls: ['./waynet-panel.component.scss'],
  animations: [ leftPanelAnimation ],
})
export class WaynetPanelComponent implements OnChanges {
  public isOpenPanel = true;
  public waynetChecked = true;
  public waypointsChecked = false;
  public markersGroup: GMarkerGroup<ZCWaypoint>;
  public waynetPolyline: L.Polyline;

  @Input() waynet: Waynet;

  constructor(
    private mapService: MapService,
    private dialog: MatDialog,
    toolbarService: ToolbarService,
  ) {
    toolbarService.getActiveObs().subscribe((active) => {
      this.isOpenPanel = active === WAYNET;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    const waynet: Waynet = get(changes, ['waynet', 'currentValue']);
    if (waynet) {
      this.markersGroup = this.mapService.waypointsMarkersGroup(values(waynet.waypoints));
      this.waynetPolyline = this.mapService.waynetPolyline(waynet.waypoints, waynet.ways);
      this.mapService.add(this.waynetPolyline, -1);
    }
  }

  get waypoints(): Waypoints { return this.waynet.waypoints; }

  public onWaynet({ checked }: MatCheckboxChange) {
    if (checked) {
      this.mapService.add(this.waynetPolyline, -1);
    } else {
      this.mapService.remove(this.waynetPolyline, -1);
    }
  }

  public onWaypoints({ checked }: MatCheckboxChange) {
    if (checked) {
      this.mapService.addMarkersGroup(this.markersGroup, 3);
    } else {
      this.mapService.removeMarkersGroup(this.markersGroup, 3);
    }
  }

  public openDialog(): void {
    this.dialog.open<WaynetDataComponent, WaynetDialogData>(WaynetDataComponent, {
      minWidth: 520,
      data: {
        startLine: trim(this.waynet.startLine),
        properties: [
          { key: 'waynetVersion', property: this.waynet.waynetVersion },
          { key: 'numWaypoints', property: this.waynet.numWaypoints },
          { key: 'numWays', property: this.waynet.numWays },
        ],
      },
    });
  }

  public openWaypoint(index: number) {
    if (this.waypointsChecked) {
      this.mapService.openZC(this.markersGroup.markers[index], true);
    }
  }

}
