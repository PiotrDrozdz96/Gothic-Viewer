import {
  VobType, ZCVob, ZCVobLevelCompo, ZCVobSpot, ZCVobLight, ZCVobSound, ZCVobLensFlare,
  ZCVobStair, ZCVobFarPlane, ZCVobScreenFX, ZCVobAnimate, ZCVobStartPoint,
  ZCPFXController, ZCZoneZFog, OCCSTrigger, OCTriggerChangeLevel,
  ZCTriggerScript, ZCTriggerList, ZCMover, OCItem, OCMob, OCZoneMusic
} from '../models/vob';

export const SIMPLE_VOB = '';
export const VOB_LEVEL_COMPO = 'zCVobLevelCompo:';
export const VOB_SPOT = 'zCVobSpot:';
export const VOB_LIGHT = 'zCVobLight:';
export const VOB_SOUND = 'zCVobSound:';
export const VOB_LENS_FLARE = 'zCVobLensFlare:';
export const VOB_STAIR = 'zCVobStair:';
export const VOB_FAR_PLANE = 'zCZoneVobFarPlane:';
export const VOB_SCREEN_FX = 'zCVobScreenFX:';
export const VOB_ANIMATE = 'zCVobAnimate:';
export const VOB_START_POINT = 'zCVobStartpoint:';

export const ZC_PFX_CONTROLLER = 'CPFXControler:';
export const ZC_ZONE_FOG = 'zCZoneZFog:';
export const ZC_CS_TRIGGER = 'oCCSTrigger:zCTrigger:';
export const ZC_TRIGGER_CHANGE_LEVEL = 'oCTriggerChangeLevel:zCTrigger:';
export const ZC_TRIGGER_SCRIPT = 'oCTriggerScript:zCTrigger:';
export const ZC_TRIGGER_LIST = 'zCTriggerList:zCTrigger:';
export const ZC_MOVER = 'zCMover:zCTrigger:';

export const OC_ITEM = 'oCItem:';
export const OC_MOB = 'oCMOB:';
export const OC_ZONE_MUSIC = 'oCZoneMusic:';

export const constructors = [
  {type: VOB_LEVEL_COMPO, class: ZCVobLevelCompo},
  {type: VOB_SPOT, class: ZCVobSpot},
  {type: VOB_LIGHT, class: ZCVobLight},
  {type: VOB_SOUND, class: ZCVobSound},
  {type: VOB_LENS_FLARE, class: ZCVobLensFlare},
  {type: VOB_STAIR, class: ZCVobStair},
  {type: VOB_FAR_PLANE, class: ZCVobFarPlane},
  {type: VOB_SCREEN_FX, class: ZCVobScreenFX},
  {type: VOB_ANIMATE, class: ZCVobAnimate},
  {type: VOB_START_POINT, class: ZCVobStartPoint},

  {type: ZC_PFX_CONTROLLER, class: ZCPFXController},
  {type: ZC_ZONE_FOG, class: ZCZoneZFog},
  {type: ZC_CS_TRIGGER, class: OCCSTrigger},
  {type: ZC_TRIGGER_CHANGE_LEVEL, class: OCTriggerChangeLevel},
  {type: ZC_TRIGGER_SCRIPT, class: ZCTriggerScript},
  {type: ZC_TRIGGER_LIST, class: ZCTriggerList},
  {type: ZC_MOVER, class: ZCMover},

  {type: OC_ITEM, class: OCItem},
  {type: OC_MOB, class: OCMob},
  {type: OC_ZONE_MUSIC, class: OCZoneMusic},
];

// const constructors = {
//   [VOB_LEVEL_COMPO]: ZCVobLevelCompo,
//   [VOB_SPOT]: ZCVobSpot,
//   [VOB_LIGHT]: ZCVobLight,
//   [VOB_SOUND]: ZCVobSound,
//   [VOB_LENS_FLARE]: ZCVobLensFlare,
//   [VOB_STAIR]: ZCVobStair,
//   [VOB_FAR_PLANE]: ZCVobFarPlane,
//   [VOB_SCREEN_FX]: ZCVobScreenFX,
//   [VOB_ANIMATE]: ZCVobAnimate,
//   [VOB_START_POINT]: ZCVobStartPoint,

//   [ZC_PFX_CONTROLLER]: ZCPFXController,
//   [ZC_ZONE_FOG]: ZCZoneZFog,
//   [ZC_CS_TRIGGER]: OCCSTrigger,
//   [ZC_TRIGGER_CHANGE_LEVEL]: OCTriggerChangeLevel,
//   [ZC_TRIGGER_SCRIPT]: ZCTriggerScript,
//   [ZC_TRIGGER_LIST]: ZCTriggerList,
//   [ZC_MOVER]: ZCMover,

//   [OC_ITEM]: OCItem,
//   [OC_MOB]: OCMob,
//   [OC_ZONE_MUSIC]: OCZoneMusic,
// };
