import { forEach, findIndex, trim, omit, keys, join } from 'lodash';

import { vobWhitespace, vobPropWhitespace } from '../consts/whitespaces';
import { vobPropConstructors } from './vob-prop-constructors';
import { getVobProp } from '../utils/get-vob-prop';
import {
  GInt, GString, GRawFloat, GRaw, GVec3, GBool, GEnum, GFloat,
  GColor, GColorList, TriggerList, Chest, Rest
} from './g-types';

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
  dynShadow: GEnum;
  rest: Rest;
  constructor(
    public index: string,
    public unknownValue: GInt,
    public vobType: VobType,
    vobProps: Array<string>
  ) {
    let restMode = false;
    forEach(vobProps, (line) => {
      if (!restMode) {
        const {key, type, value} = getVobProp(line);
        if (key === 'rest') {
          if (this.rest) {
            this.rest.push(value);
          } else {
            this.rest = new Rest();
            this.rest.push(value);
          }
          restMode = true;
        } else {
          this[key] = new vobPropConstructors[key](type, value);
        }
      } else {
        if (line.includes('[]')) {
          restMode = false;
        }
        this.rest.push(trim(line));
      }
    });
  }
  toString(): any {
    const vobProps = omit(this, ['index', 'unknownValue', 'vobType']);
    const lines = [];
    forEach(vobProps, (prop, key) => {
      if (key !== 'rest' && key !== 'triggerList') {
        lines.push(`${vobPropWhitespace}${key}=${prop.toString()}`);
      } else {
        lines.push(prop.toString());
      }
    });
    return (
      `${vobWhitespace}childs${this.index}=${this.unknownValue.toString()}\n` +
      `${this.vobType.toString()}\n` +
      `${join(lines, '\n')}\n` +
      `${vobWhitespace}[]\n`
    );
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

export class ZCVobSoundDaytime extends ZCVobSound {
  // type: 'zCVobSoundDaytime:zCVobSound:'
  sndStartTime: GFloat;
  sndEndTime: GFloat;
  sndName2: GString;
}

export class ZCVobLensFlare extends ZCVob {
  // type: 'zCVobLensFlare:'
  lensflareFX: GString;
}

export class ZCVobStair extends ZCVob {
  // type: 'zCVobStair:'
}

export class ZCVobFarPlane extends ZCVob {
  // type: 'zCZoneVobFarPlane:'
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
  // type: 'zCPFXControler:'
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
  constructor(
    public index: string,
    public unknownValue: GInt,
    public vobType: VobType,
    vobProps: Array<string>
  ) {
    super(
      index,
      unknownValue,
      vobType,
      vobProps.slice(0, findIndex(vobProps, (line) => (
        /numTarget=int:\d*/.test(line)
      )))
    );
    this.triggerList = new TriggerList(
      vobProps.slice(findIndex(vobProps, (line) => (
        /numTarget=int:\d*/.test(line)
      )) + 1)
    );
  }
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

export class OCZoneMusic extends ZCVob {
  // type: 'oCZoneMusic:'
  enabled: GBool;
  priority: GInt;
  ellipsoid: GBool;
  reverbLevel: GFloat;
  volumeLevel: GFloat;
  loop: GBool;
}

export class OCMob extends ZCVob {
  // type: 'oCMOB:'
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
}

export class OCMobInter extends OCMob {
  // type: 'oCMobInter:oCMOB:'
  stateNum: GInt;
  triggerTarget: GString;
  useWithItem: GString;
  conditionFunc: GString;
  onStateFunc: GString;
  rewind: GBool;
}

export class OCMobWheel extends OCMobInter {
  // type: 'oCMobWheel:oCMobInter:oCMOB:'
}

export class OCMobSwitch extends OCMobInter {
   // type: 'oCMobSwitch:oCMobInter:oCMOB:'
}

export class OCMobLadder extends OCMobInter {
  // type: 'oCMobLadder:oCMobInter:oCMOB:'
}

export class OCMobBed extends OCMobInter {
  // type: 'oCMobBed:oCMobInter:oCMOB:'
}

export class OCMobFire extends OCMobInter {
  // type: 'oCMobFire:oCMobInter:oCMOB:'
  fireSlot: GString;
  fireVobtreeName: GString;
}

export class OCMobDoor extends OCMobInter {
  // type: 'oCMobDoor:oCMobInter:oCMOB:'
  locked: GBool;
  keyInstance: GString;
  pickLockStr: GString;
}

export class OCMobContainer extends OCMobDoor {
  // type: 'oCMobContainer:oCMobInter:oCMOB:'
  contains: Chest;
}
