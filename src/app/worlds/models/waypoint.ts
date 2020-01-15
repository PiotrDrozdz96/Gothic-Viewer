import {
  wayRegexp, waypointRegexp,
  wayNameRegexp, waypointNameRegexp,
  waynetWhitespace, referenceSymbol,
} from '@worlds/consts';
import { BlockLine } from '@worlds/types';

import { GString, GInt, GBool, GVec3 } from './g-types';

export class WayType implements BlockLine {
  name: string;
  type: string; // zCWaypoint || §
  firstValue: string;
  secondValue: string;
  constructor(line: string) {
    const match = line.match(wayRegexp) || line.match(waypointRegexp);
    if (match) {
      const [, name, type, firstValue, secondValue] = match;
      this.name = name;
      this.type = type;
      this.firstValue = firstValue;
      this.secondValue = secondValue;
    }
  }
  static firstLineIsBlock(lines: Array<string>): boolean {
    return wayNameRegexp.test(lines[0]) || waypointNameRegexp.test(lines[0]);
  }

  public toString(whitespace = waynetWhitespace): string {
    return `${whitespace}[${this.name} ${this.type} ${this.firstValue} ${this.secondValue}]`;
  }
  public isWaypoint(): boolean { return waypointNameRegexp.test(this.name); }
  public isWay(): boolean { return wayNameRegexp.test(this.name); }
  public isReference(): boolean { return referenceSymbol === this.type; }
}

export class ZCWaypoint {
  wayType: WayType;
  wpName: GString;
  waterDepth: GInt;
  underWater: GBool;
  position: GVec3;
  direction: GVec3;
}
