import { split, slice, forEach, has } from 'lodash';

import { getVob } from '../utils/get-vob';
import {
  ZCVob, ZCVobLevelCompo, ZCVobSpot, ZCVobLight, ZCVobSound, ZCVobSoundDaytime,
  ZCVobLensFlare, ZCVobStair, ZCVobFarPlane, ZCVobScreenFX,
  ZCVobAnimate, ZCVobStartPoint, ZCPFXController, ZCZoneZFog, OCCSTrigger, OCTriggerChangeLevel,
  ZCTriggerScript, ZCTriggerList, ZCMover, OCItem, OCZoneMusic, OCMob, OCMobInter,
  OCMobWheel, OCMobSwitch, OCMobLadder, OCMobBed, OCMobFire, OCMobDoor, OCMobContainer
} from '../models/vob';
import { VOB } from '../consts/vob-types';

interface VobTreeInterface {
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
  [VOB.ZC_CS_TRIGGER]?: Array<OCCSTrigger>;
  [VOB.ZC_TRIGGER_CHANGE_LEVEL]?: Array<OCTriggerChangeLevel>;
  [VOB.ZC_TRIGGER_SCRIPT]?: Array<ZCTriggerScript>;
  [VOB.ZC_TRIGGER_LIST]?: Array<ZCTriggerList>;
  [VOB.ZC_MOVER]?: Array<ZCMover>;

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
}

export class Vobtree implements VobTreeInterface {

  constructor(data: string) {
    const childs = slice(split(data, 'childs'), 1, -2);
    forEach(childs, (vobString) => {
      const vob = getVob(vobString);
      if (!has(this, vob.vobType.type)) {
        this[vob.vobType.type] = [];
      }
      this[vob.vobType.type].push(vob);
    });
  }
}
