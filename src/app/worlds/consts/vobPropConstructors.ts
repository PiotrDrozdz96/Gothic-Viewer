import {
  GInt, GString, GRawFloat, GRaw, GVec3, GBool, GEnum, GFloat,
  GColor, GColorList, TriggerList, Chest
} from '../models/gTypes';

export const vobPropConstructors = {
  // ZCVob
  pack: GInt,
  presetName: GString,
  bbox3DWS: GRawFloat,
  trafoOSToWSRot: GRaw,
  trafoOSToWSPos: GVec3,
  vobName: GString,
  visual: GString,
  showVisual: GBool,
  visualCamAlign: GEnum,
  cdStatic: GBool,
  cdDyn: GBool,
  staticVob: GBool,
  dynShadow: GEnum,
  // ZCVobLight
  lightPresetInUse: GString,
  lightType: GEnum,
  range: GFloat,
  color: GColor,
  spotConeAngle: GFloat,
  lightStatic: GBool,
  lightQuality: GEnum,
  lensflareFX: GString,
  turnedOn: GBool,
  rangeAniScale: GString,
  rangeAniFPS: GFloat,
  rangeAniSmooth: GBool,
  colorAniList: GColorList,
  colorAniFPS: GFloat,
  colorAniSmooth: GBool,
  // ZCVobSound
  sndVolume: GFloat,
  sndMode: GEnum,
  sndRandDelay: GFloat,
  sndRandDelayVar: GFloat,
  sndStartOn: GBool,
  sndAmbient3D: GBool,
  sndObstruction: GBool,
  sndConeAngle: GFloat,
  sndVolType: GEnum,
  sndRadius: GFloat,
  sndName: GString,
  // ZCVobSoundDaytime
  sndStartTime: GFloat,
  sndEndTime: GFloat,
  sndName2: GString,
  // ZCVobFarPlane
  vobFarPlaneZ: GFloat,
  innerRangePerc: GFloat,
  // ZCVobAnimate
  startOn: GBool,
  // ZCPFXController
  pfxName: GString,
  killVobWhenDone: GBool,
  pfxStartOn: GBool,
  // ZCZoneZFog
  fogRangeCenter: GFloat,
  fogColor: GColor,
  // ZCTrigger
  triggerTarget: GString,
  flags: GRaw,
  filterFlags: GRaw,
  respondToVobName: GString,
  numCanBeActivated: GInt,
  retriggerWaitSec: GFloat,
  damageThreshold: GFloat,
  fireDelaySec: GFloat,
  // OCTriggerChangeLevel
  levelName: GString,
  startVobName: GString,
  // ZCTriggerScript
  scriptFunc: GString,
  // ZCTriggerList
  listProcess: GEnum,
  // ZCMover
  moverBehavior: GEnum,
  touchBlockerDamage: GFloat,
  stayOpenTimeSec: GFloat,
  moverLocked: GBool,
  autoLinkEnabled: GBool,
  numKeyframes: GInt,
  moveSpeed: GFloat,
  posLerpType: GEnum,
  speedType: GEnum,
  keyframes: GRaw,
  sfxOpenStart: GString,
  sfxOpenEnd: GString,
  sfxMoving: GString,
  sfxCloseStart: GString,
  sfxCloseEnd: GString,
  sfxLock: GString,
  sfxUnlock: GString,
  sfxUseLocked: GString,
  // OCItem
  itemInstance: GString,
  // OCZoneMusic
  enabled: GBool,
  priority: GInt,
  ellipsoid: GBool,
  reverbLevel: GFloat,
  volumeLevel: GFloat,
  loop: GBool,
  // OCMob
  focusName: GString,
  hitpoints: GInt,
  damage: GInt,
  moveable: GBool,
  takeable: GBool,
  focusOverride: GBool,
  soundMaterial: GEnum,
  visualDestroyed: GString,
  owner: GString,
  ownerGuild: GString,
  isDestroyed: GBool,
  stateNum: GInt,
  useWithItem: GString,
  conditionFunc: GString,
  onStateFunc: GString,
  rewind: GBool,
  // OCMobFire
  fireSlot: GString,
  fireVobtreeName: GString,
  // OCMobDoor
  locked: GBool,
  keyInstance: GString,
  pickLockStr: GString,
  // OCMobContainer
  contains: Chest,
};
