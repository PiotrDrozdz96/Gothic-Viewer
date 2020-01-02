import { Component, AfterViewInit } from '@angular/core';
import * as html2canvas from 'html2canvas';
import * as JSZip from 'jszip';
import { forEach, replace } from 'lodash';
import { saveAs } from 'src/app/utils/fileSaver';

import {
  VOB_LEVEL_COMPO, VOB_SPOT, VOB_LIGHT, VOB_SOUND, VOB_SOUND_DAYTIME,
  VOB_LENS_FLARE, VOB_STAIR, VOB_FAR_PLANE, VOB_FAR_PLANE_DEFAULT, VOB_SCREEN_FX,
  VOB_ANIMATE, VOB_START_POINT, ZC_PFX_CONTROLLER, ZC_ZONE_FOG, ZC_ZONE_FOG_DEFAULT,
  ZC_CS_TRIGGER, ZC_TRIGGER_CHANGE_LEVEL, ZC_TRIGGER_SCRIPT, ZC_TRIGGER_LIST, ZC_MOVER,
  OC_ITEM, OC_ZONE_MUSIC, OC_ZONE_MUSIC_DEFAULT, OC_MOB, OC_MOB_INTER, OC_MOB_WHEEL,
  OC_MOB_SWITCH, OC_MOB_LADDER, OC_MOB_BED, OC_MOB_FIRE, OC_MOB_DOOR, OC_MOB_CONTAINER
} from '../consts/vobTypes';

export interface MarkerElement {
  name: string;
  // tslint:disable-next-line:max-line-length
  color: 'blue' | 'red' | 'orange-dark' | 'orange' | 'yellow' | 'blue-dark'| 'cyan' | 'purple' | 'violet' | 'pink' | 'green-dark' | 'green' | 'green-light' | 'black' | 'white';
  shape: 'circle' | 'square' | 'star' | 'penta';
  icon: string;
  src?: string;
}

const SIMPLE_VOB = 'zCVob:';

const ELEMENT_DATA: Array<MarkerElement> = [
  { name: SIMPLE_VOB, color: 'blue-dark', shape: 'circle', icon: 'contact_support' },
  { name: VOB_LEVEL_COMPO, color: 'orange', shape: 'circle', icon: 'business' },
  { name: VOB_SPOT, color: 'orange', shape: 'circle', icon: 'gps_fixed' },
  { name: VOB_LIGHT, color: 'orange', shape: 'circle', icon: 'highlight' },
  { name: VOB_SOUND, color: 'orange', shape: 'circle', icon: 'surround_sound' },
  { name: VOB_SOUND_DAYTIME, color: 'orange', shape: 'circle', icon: 'surround_sound' },
  { name: VOB_LENS_FLARE, color: 'orange', shape: 'circle', icon: 'flare' },
  { name: VOB_STAIR, color: 'orange', shape: 'circle', icon: 'trending_up' },
  { name: VOB_FAR_PLANE, color: 'orange', shape: 'square', icon: 'airplanemode_active' },
  { name: VOB_FAR_PLANE_DEFAULT, color: 'orange', shape: 'square', icon: 'airplanemode_active' },
  { name: VOB_SCREEN_FX, color: 'orange', shape: 'circle', icon: 'airplay' },
  { name: VOB_ANIMATE, color: 'orange', shape: 'circle', icon: 'screen_rotation' },
  { name: VOB_START_POINT, color: 'orange', shape: 'penta', icon: 'get_app' },

  { name: ZC_PFX_CONTROLLER, color: 'orange-dark', shape: 'circle', icon: 'control_camera' },
  { name: ZC_ZONE_FOG, color: 'orange-dark', shape: 'square', icon: 'cloud' },
  { name: ZC_ZONE_FOG_DEFAULT, color: 'orange-dark', shape: 'square', icon: 'cloud' },
  { name: ZC_CS_TRIGGER, color: 'orange-dark', shape: 'circle', icon: 'snooze' },
  { name: ZC_TRIGGER_CHANGE_LEVEL, color: 'orange-dark', shape: 'circle', icon: 'screen_share' },
  { name: ZC_TRIGGER_SCRIPT, color: 'orange-dark', shape: 'circle', icon: 'video_library' },
  { name: ZC_TRIGGER_LIST, color: 'orange-dark', shape: 'circle', icon: 'subscriptions' },
  { name: ZC_MOVER, color: 'orange-dark', shape: 'circle', icon: 'slow_motion_video' },

  { name: OC_ITEM, color: 'green', shape: 'star', icon: 'star' },
  { name: OC_ZONE_MUSIC, color: 'blue', shape: 'square', icon: 'music_note' },
  { name: OC_ZONE_MUSIC_DEFAULT, color: 'blue', shape: 'square', icon: 'music_note' },
  { name: OC_MOB, color: 'blue', shape: 'circle', icon: 'event_seat' },
  { name: OC_MOB_INTER, color: 'blue', shape: 'circle', icon: 'event_seat' },
  { name: OC_MOB_WHEEL, color: 'blue', shape: 'circle', icon: 'settings' },
  { name: OC_MOB_SWITCH, color: 'blue', shape: 'circle', icon: 'switch_camera' },
  { name: OC_MOB_LADDER, color: 'blue', shape: 'circle', icon: 'dns' },
  { name: OC_MOB_BED, color: 'blue', shape: 'circle', icon: 'airline_seat_individual_suite' },
  { name: OC_MOB_FIRE, color: 'blue', shape: 'circle', icon: 'smoking_rooms' },
  { name: OC_MOB_DOOR, color: 'blue', shape: 'circle', icon: 'tab' },
  { name: OC_MOB_CONTAINER, color: 'blue', shape: 'circle', icon: 'lock' },
];

@Component({
  selector: 'app-markers-page',
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css']
})
export class MarkersPageComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'color', 'shape', 'icon', 'marker', 'canvas'];
  dataSource = ELEMENT_DATA;
  private renderedCount = 0;
  private zip = new JSZip();

  constructor() { }

  ngAfterViewInit() {
    forEach(this.dataSource, (element, index) => {
      html2canvas(
        document.getElementById(element.name),
        { backgroundColor: 'transparent' }
      ).then((canvas) => {
        this.dataSource[index] = {...element, src: canvas.toDataURL('image/png') };
        canvas.toBlob((blob) => {
          this.zip.file(
            replace(`${element.name}marker.png`, ':', '_'),
            blob,
            { base64: true }
          );
        });
        this.renderedCount++;
        if (this.renderedCount === this.dataSource.length) {
          this.dataSource = [...this.dataSource];
        }
      });
    });
  }

  download() {
    this.zip.generateAsync({ type: 'blob' }).then((blob) => {
      saveAs('markers.zip', blob);
    });
  }

}
