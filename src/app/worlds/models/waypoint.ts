import { forEach, omit, join, isEmpty, parseInt } from 'lodash';

import {
  wayRegexp, waypointRegexp,
  wayName, waypointName,
  waynetWhitespace, wayPropWhitespace,
  pointerSymbol,
} from '@worlds/consts';
import { BlockLine, ZC, WayName, } from '@worlds/types';
import { getZenProp } from '@worlds/utils';

import { GString, GInt, GBool, GVec3 } from './g-types';
import { zenPropConstructors } from './zen-prop-constructors';

export class WayType implements BlockLine {
  name: string;
  index: number;
  ending: string;
  type: string; // zCWaypoint || §
  firstValue: string;
  secondValue: string;
  constructor(line: string) {
    const match = line.match(wayRegexp) || line.match(waypointRegexp);
    if (match) {
      const [, name, ending, index, type, firstValue, secondValue] = match;
      this.name = name;
      this.index = parseInt(index, 10);
      this.ending = ending;
      this.type = type;
      this.firstValue = firstValue;
      this.secondValue = secondValue;
    }
  }
  static firstLineIsBlock(lines: Array<string>): boolean {
    return wayRegexp.test(lines[0]) || waypointRegexp.test(lines[0]);
  }

  public toString(whitespace = waynetWhitespace): string {
    return `${whitespace}[${this.name}${this.ending}${this.index} ${this.type} ${this.firstValue} ${this.secondValue}]`;
  }
  public isWaypoint(): boolean { return waypointName === this.name; }
  public isWay(): boolean { return wayName === this.name; }
  public isPointer(): boolean { return pointerSymbol === this.type; }
  public getPointerNumber(): string { return this.secondValue; }
  public getWayName(): WayName { return { name: this.name, index: this.index, ending: this.ending }; }
}

export class ZCWaypoint implements ZC {
  zcType: WayType;
  wpName: GString;
  waterDepth: GInt;
  underWater: GBool;
  position: GVec3;
  direction: GVec3;
  constructor(lines: Array<string>) {
    const [wayTypeLine, ...zenProps] = lines;
    this.zcType = new WayType(wayTypeLine);
    if (!this.zcType.isPointer()) {
      forEach(zenProps, (line) => {
        const { key, type, value } = getZenProp(line);
        this[key] = new zenPropConstructors[key](type, value);
      });
    }
  }

  public toString(): string {
    const wayProps = omit(this, ['zcType']);
    const lines = [];
    forEach(wayProps, (prop, key) => {
      lines.push(`${wayPropWhitespace}${key}=${prop.toString()}`);
    });

    return (
      `${this.zcType.toString()}\n` +
      `${join(lines, '\n')}${!isEmpty(lines) ? '\n' : ''}` +
      `${waynetWhitespace}[]\n`
    );
  }

  public isWaypoint(): boolean { return this.zcType.isWaypoint(); }
  public isWay(): boolean { return this.zcType.isWay(); }
  public isPointer(): boolean { return this.zcType.isPointer(); }
  public getPointerNumber(): string { return this.zcType.getPointerNumber(); }
  public getName(): string { return this.zcType.name; }
  public getWayName(): WayName { return this.zcType.getWayName(); }
}
