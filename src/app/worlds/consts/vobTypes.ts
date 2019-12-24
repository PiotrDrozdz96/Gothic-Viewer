import {
  VobType, ZCVob, ZCVobLevelCompo, ZCVobSpot, ZCVobLight, ZCVobSound, ZCVobSoundDaytime,
  ZCVobLensFlare, ZCVobStair, ZCVobFarPlane, ZCVobScreenFX,
  ZCVobAnimate, ZCVobStartPoint, ZCPFXController, ZCZoneZFog, OCCSTrigger, OCTriggerChangeLevel,
  ZCTriggerScript, ZCTriggerList, ZCMover, OCItem, OCZoneMusic, OCMob, OCMobInter,
  OCMobWheel, OCMobSwitch, OCMobLadder, OCMobBed, OCMobFire, OCMobDoor, OCMobContainer
} from '../models/vob';

export const SIMPLE_VOB = '';
export const VOB_LEVEL_COMPO = 'zCVobLevelCompo:';
export const VOB_SPOT = 'zCVobSpot:';
export const VOB_LIGHT = 'zCVobLight:';
export const VOB_SOUND = 'zCVobSound:';
export const VOB_SOUND_DAYTIME = 'zCVobSoundDaytime:zCVobSound:';
export const VOB_LENS_FLARE = 'zCVobLensFlare:';
export const VOB_STAIR = 'zCVobStair:';
export const VOB_FAR_PLANE = 'zCZoneVobFarPlane:';
export const VOB_FAR_PLANE_DEFAULT = 'zCZoneVobFarPlaneDefault:zCZoneVobFarPlane:';
export const VOB_SCREEN_FX = 'zCVobScreenFX:';
export const VOB_ANIMATE = 'zCVobAnimate:';
export const VOB_START_POINT = 'zCVobStartpoint:';

export const ZC_PFX_CONTROLLER = 'zCPFXControler:';
export const ZC_ZONE_FOG = 'zCZoneZFog:';
export const ZC_ZONE_FOG_DEFAULT = 'zCZoneZFogDefault:zCZoneZFog:';
export const ZC_CS_TRIGGER = 'oCCSTrigger:zCTrigger:';
export const ZC_TRIGGER_CHANGE_LEVEL = 'oCTriggerChangeLevel:zCTrigger:';
export const ZC_TRIGGER_SCRIPT = 'oCTriggerScript:zCTrigger:';
export const ZC_TRIGGER_LIST = 'zCTriggerList:zCTrigger:';
export const ZC_MOVER = 'zCMover:zCTrigger:';

export const OC_ITEM = 'oCItem:';
export const OC_ZONE_MUSIC = 'oCZoneMusic:';
export const OC_ZONE_MUSIC_DEFAULT = 'oCZoneMusicDefault:oCZoneMusic:';
export const OC_MOB = 'oCMOB:';
export const OC_MOB_INTER = 'oCMobInter:oCMOB:';
export const OC_MOB_WHEEL = 'oCMobWheel:oCMobInter:oCMOB:';
export const OC_MOB_SWITCH = 'oCMobSwitch:oCMobInter:oCMOB:';
export const OC_MOB_LADDER = 'oCMobLadder:oCMobInter:oCMOB:';
export const OC_MOB_BED = 'oCMobBed:oCMobInter:oCMOB:';
export const OC_MOB_FIRE = 'oCMobFire:oCMobInter:oCMOB:';
export const OC_MOB_DOOR = 'oCMobDoor:oCMobInter:oCMOB:';
export const OC_MOB_CONTAINER = 'oCMobContainer:oCMobInter:oCMOB:';

export const constructors = {
  [VOB_LEVEL_COMPO]: ZCVobLevelCompo,
  [VOB_SPOT]: ZCVobSpot,
  [VOB_LIGHT]: ZCVobLight,
  [VOB_SOUND]: ZCVobSound,
  [VOB_SOUND_DAYTIME]: ZCVobSoundDaytime,
  [VOB_LENS_FLARE]: ZCVobLensFlare,
  [VOB_STAIR]: ZCVobStair,
  [VOB_FAR_PLANE]: ZCVobFarPlane,
  [VOB_FAR_PLANE_DEFAULT]: ZCVobFarPlane,
  [VOB_SCREEN_FX]: ZCVobScreenFX,
  [VOB_ANIMATE]: ZCVobAnimate,
  [VOB_START_POINT]: ZCVobStartPoint,

  [ZC_PFX_CONTROLLER]: ZCPFXController,
  [ZC_ZONE_FOG]: ZCZoneZFog,
  [ZC_ZONE_FOG_DEFAULT]: ZCZoneZFog,
  [ZC_CS_TRIGGER]: OCCSTrigger,
  [ZC_TRIGGER_CHANGE_LEVEL]: OCTriggerChangeLevel,
  [ZC_TRIGGER_SCRIPT]: ZCTriggerScript,
  [ZC_TRIGGER_LIST]: ZCTriggerList,
  [ZC_MOVER]: ZCMover,

  [OC_ITEM]: OCItem,
  [OC_ZONE_MUSIC]: OCZoneMusic,
  [OC_ZONE_MUSIC_DEFAULT]: OCZoneMusic,

  [OC_MOB]: OCMob,
  [OC_MOB_INTER]: OCMobInter,
  [OC_MOB_WHEEL]: OCMobWheel,
  [OC_MOB_SWITCH]: OCMobSwitch,
  [OC_MOB_LADDER]: OCMobLadder,
  [OC_MOB_BED]: OCMobBed,
  [OC_MOB_FIRE]: OCMobFire,
  [OC_MOB_DOOR]: OCMobDoor,
  [OC_MOB_CONTAINER]: OCMobContainer,
};
