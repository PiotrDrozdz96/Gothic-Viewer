import {
  ZCVob, ZCVobLevelCompo, ZCVobSpot, ZCVobLight, ZCVobSound, ZCVobSoundDaytime,
  ZCVobLensFlare, ZCVobStair, ZCVobFarPlane, ZCVobScreenFX,
  ZCVobAnimate, ZCVobStartPoint, ZCPFXController, ZCZoneZFog, OCCSTrigger, OCTriggerChangeLevel,
  ZCTriggerScript, ZCTriggerList, ZCMover, OCItem, OCZoneMusic, OCMob, OCMobInter,
  OCMobWheel, OCMobSwitch, OCMobLadder, OCMobBed, OCMobFire, OCMobDoor, OCMobContainer
} from '../models/vob';

export type oneOfVobType = ZCVob | ZCVobLevelCompo | ZCVobSpot | ZCVobLight | ZCVobSound
  | ZCVobSoundDaytime | ZCVobLensFlare | ZCVobStair | ZCVobFarPlane | ZCVobScreenFX
  | ZCVobAnimate | ZCVobStartPoint | ZCPFXController | ZCZoneZFog | OCCSTrigger
  | OCTriggerChangeLevel | ZCTriggerScript | ZCTriggerList | ZCMover | OCItem | OCZoneMusic
  | OCMob | OCMobInter | OCMobWheel | OCMobSwitch | OCMobLadder | OCMobBed | OCMobFire
  | OCMobDoor | OCMobContainer;
