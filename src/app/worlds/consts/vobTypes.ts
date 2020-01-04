import {
  ZCVob, ZCVobLevelCompo, ZCVobSpot, ZCVobLight, ZCVobSound, ZCVobSoundDaytime,
  ZCVobLensFlare, ZCVobStair, ZCVobFarPlane, ZCVobScreenFX,
  ZCVobAnimate, ZCVobStartPoint, ZCPFXController, ZCZoneZFog, OCCSTrigger, OCTriggerChangeLevel,
  ZCTriggerScript, ZCTriggerList, ZCMover, OCItem, OCZoneMusic, OCMob, OCMobInter,
  OCMobWheel, OCMobSwitch, OCMobLadder, OCMobBed, OCMobFire, OCMobDoor, OCMobContainer
} from '../models/vob';

export const VOB = {
  SIMPLE: '' as '',
  NAMED_SIMPLE: 'zCVob:' as 'zCVob:',
  LEVEL_COMPO: 'zCVobLevelCompo:' as 'zCVobLevelCompo:',
  SPOT: 'zCVobSpot:' as 'zCVobSpot:',
  LIGHT: 'zCVobLight:' as 'zCVobLight:',
  SOUND: 'zCVobSound:' as 'zCVobSound:',
  SOUND_DAYTIME: 'zCVobSoundDaytime:zCVobSound:' as 'zCVobSoundDaytime:zCVobSound:',
  LENS_FLARE: 'zCVobLensFlare:' as 'zCVobLensFlare:',
  STAIR: 'zCVobStair:' as 'zCVobStair:',
  FAR_PLANE: 'zCZoneVobFarPlane:' as 'zCZoneVobFarPlane:',
  FAR_PLANE_DEFAULT: 'zCZoneVobFarPlaneDefault:zCZoneVobFarPlane:' as 'zCZoneVobFarPlaneDefault:zCZoneVobFarPlane:',
  SCREEN_FX: 'zCVobScreenFX:' as 'zCVobScreenFX:',
  ANIMATE: 'zCVobAnimate:' as 'zCVobAnimate:',
  START_POINT: 'zCVobStartpoint:' as 'zCVobStartpoint:',

  ZC_PFX_CONTROLLER: 'zCPFXControler:' as 'zCPFXControler:',
  ZC_ZONE_FOG: 'zCZoneZFog:' as 'zCZoneZFog:',
  ZC_ZONE_FOG_DEFAULT: 'zCZoneZFogDefault:zCZoneZFog:' as 'zCZoneZFogDefault:zCZoneZFog:',
  ZC_CS_TRIGGER: 'oCCSTrigger:zCTrigger:' as 'oCCSTrigger:zCTrigger:',
  ZC_TRIGGER_CHANGE_LEVEL: 'oCTriggerChangeLevel:zCTrigger:' as 'oCTriggerChangeLevel:zCTrigger:',
  ZC_TRIGGER_SCRIPT: 'oCTriggerScript:zCTrigger:' as 'oCTriggerScript:zCTrigger:',
  ZC_TRIGGER_LIST: 'zCTriggerList:zCTrigger:' as 'zCTriggerList:zCTrigger:',
  ZC_MOVER: 'zCMover:zCTrigger:' as 'zCMover:zCTrigger:',

  OC_ITEM: 'oCItem:' as 'oCItem:',
  OC_ZONE_MUSIC: 'oCZoneMusic:' as 'oCZoneMusic:',
  OC_ZONE_MUSIC_DEFAULT: 'oCZoneMusicDefault:oCZoneMusic:' as 'oCZoneMusicDefault:oCZoneMusic:',
  OC_MOB: 'oCMOB:' as 'oCMOB:',
  OC_MOB_INTER: 'oCMobInter:oCMOB:' as 'oCMobInter:oCMOB:',
  OC_MOB_WHEEL: 'oCMobWheel:oCMobInter:oCMOB:' as 'oCMobWheel:oCMobInter:oCMOB:',
  OC_MOB_SWITCH: 'oCMobSwitch:oCMobInter:oCMOB:' as 'oCMobSwitch:oCMobInter:oCMOB:',
  OC_MOB_LADDER: 'oCMobLadder:oCMobInter:oCMOB:' as 'oCMobLadder:oCMobInter:oCMOB:',
  OC_MOB_BED: 'oCMobBed:oCMobInter:oCMOB:' as 'oCMobBed:oCMobInter:oCMOB:',
  OC_MOB_FIRE: 'oCMobFire:oCMobInter:oCMOB:' as 'oCMobFire:oCMobInter:oCMOB:',
  OC_MOB_DOOR: 'oCMobDoor:oCMobInter:oCMOB:' as 'oCMobDoor:oCMobInter:oCMOB:',
  OC_MOB_CONTAINER: 'oCMobContainer:oCMobInter:oCMOB:' as 'oCMobContainer:oCMobInter:oCMOB:',
};

export const constructors = {
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

export const emptyVobtree = {
  [VOB.LEVEL_COMPO]: [],
  [VOB.SIMPLE]: [],
  [VOB.SPOT]: [],
  [VOB.LIGHT]: [],
  [VOB.SOUND]: [],
  [VOB.SOUND_DAYTIME]: [],
  [VOB.LENS_FLARE]: [],
  [VOB.STAIR]: [],
  [VOB.FAR_PLANE]: [],
  [VOB.FAR_PLANE_DEFAULT]: [],
  [VOB.SCREEN_FX]: [],
  [VOB.ANIMATE]: [],
  [VOB.START_POINT]: [],

  [VOB.ZC_PFX_CONTROLLER]: [],
  [VOB.ZC_ZONE_FOG]: [],
  [VOB.ZC_ZONE_FOG_DEFAULT]: [],
  [VOB.ZC_CS_TRIGGER]: [],
  [VOB.ZC_TRIGGER_CHANGE_LEVEL]: [],
  [VOB.ZC_TRIGGER_SCRIPT]: [],
  [VOB.ZC_TRIGGER_LIST]: [],
  [VOB.ZC_MOVER]: [],

  [VOB.OC_ITEM]: [],
  [VOB.OC_ZONE_MUSIC]: [],
  [VOB.OC_ZONE_MUSIC_DEFAULT]: [],

  [VOB.OC_MOB]: [],
  [VOB.OC_MOB_INTER]: [],
  [VOB.OC_MOB_WHEEL]: [],
  [VOB.OC_MOB_SWITCH]: [],
  [VOB.OC_MOB_LADDER]: [],
  [VOB.OC_MOB_BED]: [],
  [VOB.OC_MOB_FIRE]: [],
  [VOB.OC_MOB_DOOR]: [],
  [VOB.OC_MOB_CONTAINER]: [],
};

export class VobTreeInterface {
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
