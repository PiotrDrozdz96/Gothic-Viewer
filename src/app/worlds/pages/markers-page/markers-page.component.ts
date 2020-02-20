import { Component, AfterViewInit } from '@angular/core';
import * as html2canvas from 'html2canvas';
import * as JSZip from 'jszip';
import { forEach, replace } from 'lodash';

import { saveAs } from '@common/utils';
import { VOB } from '@worlds/consts';

export interface MarkerElement {
  name: string;
  // tslint:disable-next-line:max-line-length
  color: 'blue' | 'red' | 'orange-dark' | 'orange' | 'yellow' | 'blue-dark'| 'cyan' | 'purple' | 'violet' | 'pink' | 'green-dark' | 'green' | 'green-light' | 'black' | 'white';
  shape: 'circle' | 'square' | 'star' | 'penta';
  icon: string;
  src?: string;
}

const ELEMENT_DATA: Array<MarkerElement> = [
  { name: VOB.NAMED_SIMPLE, color: 'blue-dark', shape: 'circle', icon: 'contact_support' },
  { name: VOB.LEVEL_COMPO, color: 'orange', shape: 'circle', icon: 'business' },
  { name: VOB.SPOT, color: 'orange', shape: 'circle', icon: 'gps_fixed' },
  { name: VOB.LIGHT, color: 'orange', shape: 'circle', icon: 'highlight' },
  { name: VOB.SOUND, color: 'orange', shape: 'circle', icon: 'surround_sound' },
  { name: VOB.SOUND_DAYTIME, color: 'orange', shape: 'circle', icon: 'surround_sound' },
  { name: VOB.LENS_FLARE, color: 'orange', shape: 'circle', icon: 'flare' },
  { name: VOB.STAIR, color: 'orange', shape: 'circle', icon: 'trending_up' },
  { name: VOB.FAR_PLANE, color: 'orange', shape: 'square', icon: 'airplanemode_active' },
  { name: VOB.FAR_PLANE_DEFAULT, color: 'orange', shape: 'square', icon: 'airplanemode_active' },
  { name: VOB.SCREEN_FX, color: 'orange', shape: 'circle', icon: 'airplay' },
  { name: VOB.ANIMATE, color: 'orange', shape: 'circle', icon: 'screen_rotation' },
  { name: VOB.START_POINT, color: 'orange', shape: 'penta', icon: 'get_app' },

  { name: VOB.ZC_PFX_CONTROLLER, color: 'orange-dark', shape: 'circle', icon: 'control_camera' },
  { name: VOB.ZC_ZONE_FOG, color: 'orange-dark', shape: 'square', icon: 'cloud' },
  { name: VOB.ZC_ZONE_FOG_DEFAULT, color: 'orange-dark', shape: 'square', icon: 'cloud' },
  { name: VOB.ZC_TRIGGER_WORLD_START, color: 'orange-dark', shape: 'circle', icon: 'crop_original' },
  { name: VOB.ZC_TRIGGER_UNTOUCH, color: 'black', shape: 'circle', icon: 'fingerprint' },
  { name: VOB.ZC_TRIGGER, color: 'orange-dark', shape: 'circle', icon: 'snooze' },
  { name: VOB.ZC_CS_TRIGGER, color: 'orange-dark', shape: 'circle', icon: 'snooze' },
  { name: VOB.ZC_TRIGGER_CHANGE_LEVEL, color: 'orange-dark', shape: 'circle', icon: 'screen_share' },
  { name: VOB.ZC_TRIGGER_SCRIPT, color: 'orange-dark', shape: 'circle', icon: 'video_library' },
  { name: VOB.ZC_TRIGGER_LIST, color: 'orange-dark', shape: 'circle', icon: 'subscriptions' },
  { name: VOB.ZC_CODE_MASTER, color: 'black', shape: 'circle', icon: 'code' },
  { name: VOB.ZC_TOUCH_DAMAGE, color: 'black', shape: 'circle', icon: 'gavel' },
  { name: VOB.ZC_MOVER, color: 'orange-dark', shape: 'circle', icon: 'slow_motion_video' },
  { name: VOB.ZC_MOVER_CONTROLER, color: 'black', shape: 'circle', icon: 'slow_motion_video' },
  { name: VOB.ZC_MESSAGE_FILTER, color: 'black', shape: 'circle', icon: 'message' },
  { name: VOB.ZC_CAM_TRJ, color: 'yellow', shape: 'circle', icon: 'photo_camera' },
  { name: VOB.ZC_CS_CAMERA, color: 'black', shape: 'circle', icon: 'photo_camera' },

  { name: VOB.OC_ITEM, color: 'green', shape: 'star', icon: 'star' },
  { name: VOB.OC_ZONE_MUSIC, color: 'blue', shape: 'square', icon: 'music_note' },
  { name: VOB.OC_ZONE_MUSIC_DEFAULT, color: 'blue', shape: 'square', icon: 'music_note' },
  { name: VOB.OC_MOB, color: 'blue', shape: 'circle', icon: 'event_seat' },
  { name: VOB.OC_MOB_INTER, color: 'blue', shape: 'circle', icon: 'event_seat' },
  { name: VOB.OC_MOB_WHEEL, color: 'blue', shape: 'circle', icon: 'settings' },
  { name: VOB.OC_MOB_SWITCH, color: 'blue', shape: 'circle', icon: 'switch_camera' },
  { name: VOB.OC_MOB_LADDER, color: 'blue', shape: 'circle', icon: 'dns' },
  { name: VOB.OC_MOB_BED, color: 'blue', shape: 'circle', icon: 'airline_seat_individual_suite' },
  { name: VOB.OC_MOB_FIRE, color: 'blue', shape: 'circle', icon: 'smoking_rooms' },
  { name: VOB.OC_MOB_DOOR, color: 'blue', shape: 'circle', icon: 'tab' },
  { name: VOB.OC_MOB_CONTAINER, color: 'blue', shape: 'circle', icon: 'lock' },
];

@Component({
  selector: 'app-markers-page',
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.scss'],
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
        { backgroundColor: 'transparent' },
      ).then((canvas) => {
        this.dataSource[index] = {...element, src: canvas.toDataURL('image/png') };
        canvas.toBlob((blob) => {
          this.zip.file(
            replace(`${element.name}marker.png`, ':', '_'),
            blob,
            { base64: true },
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
