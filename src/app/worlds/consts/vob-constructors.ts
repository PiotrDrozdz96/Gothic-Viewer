import {
  ZCVob, ZCVobLevelCompo, ZCVobSpot, ZCVobLight, ZCVobSound, ZCVobSoundDaytime,
  ZCVobLensFlare, ZCVobStair, ZCVobFarPlane, ZCVobScreenFX,
  ZCVobAnimate, ZCVobStartPoint, ZCPFXController, ZCZoneZFog, OCCSTrigger, OCTriggerChangeLevel,
  ZCTriggerScript, ZCTriggerList, ZCMover, OCItem, OCZoneMusic, OCMob, OCMobInter,
  OCMobWheel, OCMobSwitch, OCMobLadder, OCMobBed, OCMobFire, OCMobDoor, OCMobContainer
} from '../models/vob';
import { VOB } from './vob-types';

export const vobConstructors = {
  [VOB.SIMPLE]: ZCVob,
  [VOB.LEVEL_COMPO]: ZCVobLevelCompo,
  [VOB.SPOT]: ZCVobSpot,
  [VOB.LIGHT]: ZCVobLight,
  [VOB.SOUND]: ZCVobSound,
  [VOB.SOUND_DAYTIME]: ZCVobSoundDaytime,
  [VOB.LENS_FLARE]: ZCVobLensFlare,
  [VOB.STAIR]: ZCVobStair,
  [VOB.FAR_PLANE]: ZCVobFarPlane,
  [VOB.FAR_PLANE_DEFAULT]: ZCVobFarPlane,
  [VOB.SCREEN_FX]: ZCVobScreenFX,
  [VOB.ANIMATE]: ZCVobAnimate,
  [VOB.START_POINT]: ZCVobStartPoint,

  [VOB.ZC_PFX_CONTROLLER]: ZCPFXController,
  [VOB.ZC_ZONE_FOG]: ZCZoneZFog,
  [VOB.ZC_ZONE_FOG_DEFAULT]: ZCZoneZFog,
  [VOB.ZC_CS_TRIGGER]: OCCSTrigger,
  [VOB.ZC_TRIGGER_CHANGE_LEVEL]: OCTriggerChangeLevel,
  [VOB.ZC_TRIGGER_SCRIPT]: ZCTriggerScript,
  [VOB.ZC_TRIGGER_LIST]: ZCTriggerList,
  [VOB.ZC_MOVER]: ZCMover,

  [VOB.OC_ITEM]: OCItem,
  [VOB.OC_ZONE_MUSIC]: OCZoneMusic,
  [VOB.OC_ZONE_MUSIC_DEFAULT]: OCZoneMusic,

  [VOB.OC_MOB]: OCMob,
  [VOB.OC_MOB_INTER]: OCMobInter,
  [VOB.OC_MOB_WHEEL]: OCMobWheel,
  [VOB.OC_MOB_SWITCH]: OCMobSwitch,
  [VOB.OC_MOB_LADDER]: OCMobLadder,
  [VOB.OC_MOB_BED]: OCMobBed,
  [VOB.OC_MOB_FIRE]: OCMobFire,
  [VOB.OC_MOB_DOOR]: OCMobDoor,
  [VOB.OC_MOB_CONTAINER]: OCMobContainer,
};