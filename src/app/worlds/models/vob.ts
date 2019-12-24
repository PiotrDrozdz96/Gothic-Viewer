import { vobWhitespace } from '../consts/whitespaces';
import {
  GInt, GString, GRawFloat, GRaw, GVec3, GBool, GEnum, GFloat,
  GColor, GColorList, TriggerList
} from './gTypes';

export class VobType {
  type: string;
  firstValue: string;
  secondValue: string;
  constructor(line: string) {
    const [, type, firstValue, secondValue] = line.match(/\[% ([\w|:]+)?zCVob (\d+) (\d+)]/);
    this.type = type || '';
    this.firstValue = firstValue;
    this.secondValue = secondValue;
  }
  toString(whitespace = vobWhitespace): string {
    return `${whitespace}[% ${this.type}zCVob ${this.firstValue} ${this.secondValue}]`;
  }
}

export class ZCVob {
  pack: GInt;
  presetName: GString;
  bbox3DWS: GRawFloat;
  trafoOSToWSRot: GRaw;
  trafoOSToWSPos: GVec3;
  vobName: GString;
  visual: GString;
  showVisual: GBool;
  visualCamAlign: GEnum;
  cdStatic: GBool;
  cdDyn: GBool;
  staticVob: GBool;
  dynamicShadow: GEnum;
  rest: string;
  constructor(public index: number, public unknownValue: GInt, public vobType: VobType) {

  }
}

export class ZCVobLevelCompo extends ZCVob {
  // type: 'zCVobLevelCompo:';
}

export class ZCVobSpot extends ZCVob {
  // type: 'zCVobSpot:';
}

export class ZCVobLight extends ZCVob {
  // type: 'zCVobLight:';
  lightPresetInUse: GString;
  lightType: GEnum;
  range: GFloat;
  color: GColor;
  spotConeAngle: GFloat;
  lightStatic: GBool;
  lightQuality: GEnum;
  lensflareFX: GString;
  turnedOn: GBool;
  rangeAniScale: GString;
  rangeAniFPS: GFloat;
  rangeAniSmooth: GBool;
  colorAniList: GColorList;
  colorAniFPS: GFloat;
  colorAniSmooth: GBool;
}

export class ZCVobSound extends ZCVob {
  // type: 'zCVobSound:'
  sndVolume: GFloat;
  sndMode: GEnum;
  sndRandDelay: GFloat;
  sndRandDelayVar: GFloat;
  sndStartOn: GBool;
  sndAmbient3D: GBool;
  sndObstruction: GBool;
  sndConeAngle: GFloat;
  sndVolType: GEnum;
  sndRadius: GFloat;
  sndName: GString;
}

export class ZCVobLensFlare extends ZCVob {
  // type: 'zCVobLensFlare:'
  lensflareFX: GString;
}

export class ZCVobStair extends ZCVob {
  // type: 'zCVobStair:'
}

export class ZCVobFarPlane extends ZCVob {
  // type: 'zCZoneVobFarPlane:
  vobFarPlaneZ: GFloat;
  innerRangePerc: GFloat;
}

export class ZCVobScreenFX extends ZCVob {
  // type: 'zCVobScreenFX:'
}

export class ZCVobAnimate extends ZCVob {
  // type: 'zCVobAnimate:'
  startOn: GBool;
}

export class ZCVobStartPoint extends ZCVob {
  // type: 'zCVobStartpoint:'
}

export class ZCPFXController extends ZCVob {
  // type: 'CPFXControler:'
  pfxName: GString;
  killVobWhenDone: GBool;
  pfxStartOn: GBool;
}

export class ZCZoneZFog extends ZCVob {
  // type: 'zCZoneZFog:'
  fogRangeCenter: GFloat;
  innerRangePerc: GFloat;
  fogColor: GColor;
}

abstract class ZCTrigger extends ZCVob {
  triggerTarget: GString;
  flags: GRaw;
  filterFlags: GRaw;
  respondToVobName: GString;
  numCanBeActivated: GInt;
  retriggerWaitSec: GFloat;
  damageThreshold: GFloat;
  fireDelaySec: GFloat;
}

export class OCCSTrigger extends ZCTrigger {
  // type: 'oCCSTrigger:zCTrigger:'
}

export class OCTriggerChangeLevel extends ZCTrigger {
  // type: 'oCTriggerChangeLevel:zCTrigger:'
  levelName: GString;
  startVobName: GString;
}

export class ZCTriggerScript extends ZCTrigger {
  // type: 'oCTriggerScript:zCTrigger:'
  scriptFunc: GString;
}

export class ZCTriggerList extends ZCTrigger {
  // type: 'zCTriggerList:zCTrigger:'
  listProcess: GEnum;
  triggerList: TriggerList;
}

export class ZCMover extends ZCTrigger {
  // type: 'zCMover:zCTrigger:'
  moverBehavior: GEnum;
  touchBlockerDamage: GFloat;
  stayOpenTimeSec: GFloat;
  moverLocked: GBool;
  autoLinkEnabled: GBool;
  numKeyframes: GInt;
  moveSpeed: GFloat;
  posLerpType: GEnum;
  speedType: GEnum;
  keyframes: GRaw;
  sfxOpenStart: GString;
  sfxOpenEnd: GString;
  sfxMoving: GString;
  sfxCloseStart: GString;
  sfxCloseEnd: GString;
  sfxLock: GString;
  sfxUnlock: GString;
  sfxUseLocked: GString;
}

export class OCItem extends ZCVob {
  // type: 'oCItem:'
  itemInstance: GString;
}

export class OCMob extends ZCVob {
  // type: '*oCMOB:'
  focusName: GString;
  hitpoints: GInt;
  damage: GInt;
  moveable: GBool;
  takeable: GBool;
  focusOverride: GBool;
  soundMaterial: GEnum;
  visualDestroyed: GString;
  owner: GString;
  ownerGuild: GString;
  isDestroyed: GBool;
  stateNum: GInt;
  triggerTarget: GString;
  useWithItem: GString;
  conditionFunc: GString;
  onStateFunc: GString;
  rewind: GBool;
}

export class OCZoneMusic extends ZCVob {
  // type: 'oCZoneMusic:'
  enabled: GBool;
  priority: GInt;
  ellipsoid: GBool;
  reverbLevel: GFloat;
  volumeLevel: GFloat;
  loop: GBool;
}
