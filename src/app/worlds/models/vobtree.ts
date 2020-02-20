import { split, slice, forEach, has, includes, values, mapValues, pickBy } from 'lodash';

import { pointerSymbol, emptyVobtree, VOB } from '@worlds/consts';

import {
  ZCVob, ZCVobLevelCompo, ZCVobSpot, ZCVobLight, ZCVobSound, ZCVobSoundDaytime,
  ZCVobLensFlare, ZCVobStair, ZCVobFarPlane, ZCVobScreenFX, ZCVobAnimate, ZCVobStartPoint,
  ZCPFXController, ZCZoneZFog, ZCTriggerWorldStart, ZCTriggerUntouch, ZCTrigger, OCCSTrigger,
  OCTriggerChangeLevel, ZCTriggerScript, ZCTriggerList, ZCCodeMaster, ZCTouchDamage, ZCMover,
  ZCMoverControler, ZCMessageFilter, ZCCSCamera, OCItem, OCZoneMusic, OCMob, OCMobInter,
  OCMobWheel, OCMobSwitch, OCMobLadder, OCMobBed, OCMobFire, OCMobDoor, OCMobContainer,
  VobType,
} from './vob';
import { vobConstructors } from './vob-constructors';
import { GInt } from './g-types';

export class Vobtree {
  [VOB.SIMPLE]?: Array<ZCVob>;
  [VOB.LEVEL_COMPO]?: Array<ZCVobLevelCompo>;
  [VOB.SPOT]?: Array<ZCVobSpot>;
  [VOB.LIGHT]?: Array<ZCVobLight>;
  [VOB.SOUND]?: Array<ZCVobSound>;
  [VOB.SOUND_DAYTIME]?: Array<ZCVobSoundDaytime>;
  [VOB.LENS_FLARE]?: Array<ZCVobLensFlare>;
  [VOB.STAIR]?: Array<ZCVobStair>;
  [VOB.FAR_PLANE]?: Array<ZCVobFarPlane>;
  [VOB.FAR_PLANE_DEFAULT]?: Array<ZCVobFarPlane>;
  [VOB.SCREEN_FX]?: Array<ZCVobScreenFX>;
  [VOB.ANIMATE]?: Array<ZCVobAnimate>;
  [VOB.START_POINT]?: Array<ZCVobStartPoint>;

  [VOB.ZC_PFX_CONTROLLER]?: Array<ZCPFXController>;
  [VOB.ZC_ZONE_FOG]?: Array<ZCZoneZFog>;
  [VOB.ZC_ZONE_FOG_DEFAULT]?: Array<ZCZoneZFog>;
  [VOB.ZC_TRIGGER_WORLD_START]?: Array<ZCTriggerWorldStart>;
  [VOB.ZC_TRIGGER_UNTOUCH]?: Array<ZCTriggerUntouch>;
  [VOB.ZC_TRIGGER]?: Array<ZCTrigger>;
  [VOB.ZC_CS_TRIGGER]?: Array<OCCSTrigger>;
  [VOB.ZC_TRIGGER_CHANGE_LEVEL]?: Array<OCTriggerChangeLevel>;
  [VOB.ZC_TRIGGER_SCRIPT]?: Array<ZCTriggerScript>;
  [VOB.ZC_TRIGGER_LIST]?: Array<ZCTriggerList>;
  [VOB.ZC_CODE_MASTER]?: Array<ZCCodeMaster>;
  [VOB.ZC_TOUCH_DAMAGE]: Array<ZCTouchDamage>;
  [VOB.ZC_MOVER]?: Array<ZCMover>;
  [VOB.ZC_MOVER_CONTROLER]?: Array<ZCMoverControler>;
  [VOB.ZC_MESSAGE_FILTER]?: Array<ZCMessageFilter>;
  [VOB.ZC_CS_CAMERA]?: Array<ZCCSCamera>;

  [VOB.OC_ITEM]?: Array<OCItem>;
  [VOB.OC_ZONE_MUSIC]?: Array<OCZoneMusic>;
  [VOB.OC_ZONE_MUSIC_DEFAULT]?: Array<OCZoneMusic>;

  [VOB.OC_MOB]?: Array<OCMob>;
  [VOB.OC_MOB_INTER]?: Array<OCMobInter>;
  [VOB.OC_MOB_WHEEL]?: Array<OCMobWheel>;
  [VOB.OC_MOB_SWITCH]?: Array<OCMobSwitch>;
  [VOB.OC_MOB_LADDER]?: Array<OCMobLadder>;
  [VOB.OC_MOB_BED]?: Array<OCMobBed>;
  [VOB.OC_MOB_FIRE]?: Array<OCMobFire>;
  [VOB.OC_MOB_DOOR]?: Array<OCMobDoor>;
  [VOB.OC_MOB_CONTAINER]?: Array<OCMobContainer>;

  pointers?: Array<Array<string>>;

  constructor(data: string) {
    const childs = slice(split(data, 'childs'), 1, -1);
    forEach(childs, (vobString) => {
      const lines = split(vobString, '\n');
      if (includes(lines[1], pointerSymbol)) {
        this.addPointer(lines);
      } else {
        const vob = this.getVob(lines);
        if (!has(this, vob.zcType.type)) {
          this[vob.zcType.type] = [];
        }
        this[vob.zcType.type].push(vob);
      }
    });
  }

  private addPointer(lines: Array<string>): void {
    if (!this.pointers) {
      this.pointers = [];
    } else {
      this.pointers.push(lines);
    }
  }

  private getVob(lines: Array<string>): ZCVob {
    const [, index, unknownValue] = lines[0].match(/(\d+)=int:(\d+)/);
    const vobType = new VobType(lines[1]);
    const vobConstructor = vobConstructors[vobType.type];
    console.log(vobType);
    return new vobConstructor(index, new GInt('int', unknownValue), vobType, lines.slice(2, -2));
  }

  public getSortedVobtree() {
    return values(pickBy(mapValues(emptyVobtree, (emptyVobs, key) => (
      this[key]
    ))));
  }
}
