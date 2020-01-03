import {
  ZCVob, ZCVobLevelCompo, ZCVobSpot, ZCVobLight, ZCVobSound, ZCVobSoundDaytime,
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
  [SIMPLE_VOB]: ZCVob,
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

export const emptyVobtree = {
  [VOB_LEVEL_COMPO]: [],
  [SIMPLE_VOB]: [],
  [VOB_SPOT]: [],
  [VOB_LIGHT]: [],
  [VOB_SOUND]: [],
  [VOB_SOUND_DAYTIME]: [],
  [VOB_LENS_FLARE]: [],
  [VOB_STAIR]: [],
  [VOB_FAR_PLANE]: [],
  [VOB_FAR_PLANE_DEFAULT]: [],
  [VOB_SCREEN_FX]: [],
  [VOB_ANIMATE]: [],
  [VOB_START_POINT]: [],

  [ZC_PFX_CONTROLLER]: [],
  [ZC_ZONE_FOG]: [],
  [ZC_ZONE_FOG_DEFAULT]: [],
  [ZC_CS_TRIGGER]: [],
  [ZC_TRIGGER_CHANGE_LEVEL]: [],
  [ZC_TRIGGER_SCRIPT]: [],
  [ZC_TRIGGER_LIST]: [],
  [ZC_MOVER]: [],

  [OC_ITEM]: [],
  [OC_ZONE_MUSIC]: [],
  [OC_ZONE_MUSIC_DEFAULT]: [],

  [OC_MOB]: [],
  [OC_MOB_INTER]: [],
  [OC_MOB_WHEEL]: [],
  [OC_MOB_SWITCH]: [],
  [OC_MOB_LADDER]: [],
  [OC_MOB_BED]: [],
  [OC_MOB_FIRE]: [],
  [OC_MOB_DOOR]: [],
  [OC_MOB_CONTAINER]: [],
};

export class VobTreeInterface {
  [SIMPLE_VOB]?: Array<ZCVob>;
  [VOB_LEVEL_COMPO]?: Array<ZCVobLevelCompo>;
  [VOB_SPOT]?: Array<ZCVobSpot>;
  [VOB_LIGHT]?: Array<ZCVobLight>;
  [VOB_SOUND]?: Array<ZCVobSound>;
  [VOB_SOUND_DAYTIME]?: Array<ZCVobSoundDaytime>;
  [VOB_LENS_FLARE]?: Array<ZCVobLensFlare>;
  [VOB_STAIR]?: Array<ZCVobStair>;
  [VOB_FAR_PLANE]?: Array<ZCVobFarPlane>;
  [VOB_FAR_PLANE_DEFAULT]?: Array<ZCVobFarPlane>;
  [VOB_SCREEN_FX]?: Array<ZCVobScreenFX>;
  [VOB_ANIMATE]?: Array<ZCVobAnimate>;
  [VOB_START_POINT]?: Array<ZCVobStartPoint>;

  [ZC_PFX_CONTROLLER]?: Array<ZCPFXController>;
  [ZC_ZONE_FOG]?: Array<ZCZoneZFog>;
  [ZC_ZONE_FOG_DEFAULT]?: Array<ZCZoneZFog>;
  [ZC_CS_TRIGGER]?: Array<OCCSTrigger>;
  [ZC_TRIGGER_CHANGE_LEVEL]?: Array<OCTriggerChangeLevel>;
  [ZC_TRIGGER_SCRIPT]?: Array<ZCTriggerScript>;
  [ZC_TRIGGER_LIST]?: Array<ZCTriggerList>;
  [ZC_MOVER]?: Array<ZCMover>;

  [OC_ITEM]?: Array<OCItem>;
  [OC_ZONE_MUSIC]?: Array<OCZoneMusic>;
  [OC_ZONE_MUSIC_DEFAULT]?: Array<OCZoneMusic>;

  [OC_MOB]?: Array<OCMob>;
  [OC_MOB_INTER]?: Array<OCMobInter>;
  [OC_MOB_WHEEL]?: Array<OCMobWheel>;
  [OC_MOB_SWITCH]?: Array<OCMobSwitch>;
  [OC_MOB_LADDER]?: Array<OCMobLadder>;
  [OC_MOB_BED]?: Array<OCMobBed>;
  [OC_MOB_FIRE]?: Array<OCMobFire>;
  [OC_MOB_DOOR]?: Array<OCMobDoor>;
  [OC_MOB_CONTAINER]?: Array<OCMobContainer>;
}
