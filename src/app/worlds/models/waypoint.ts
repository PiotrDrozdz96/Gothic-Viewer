import { forEach, omit, join, isEmpty } from 'lodash';

import {
  wayRegexp, waypointRegexp,
  wayName, waypointName,
  waynetWhitespace, wayPropWhitespace,
  pointerSymbol,
} from '@worlds/consts';
import { BlockLine } from '@worlds/types';
import { getZenProp } from '@worlds/utils';

import { GString, GInt, GBool, GVec3 } from './g-types';
import { zenPropConstructors } from './zen-prop-constructors';


export class WayType implements BlockLine {
  name: string;
  index: string;
  ending: string;
  type: string; // zCWaypoint || §
  firstValue: string;
  secondValue: string;
  constructor(line: string) {
    const match = line.match(wayRegexp) || line.match(waypointRegexp);
    if (match) {
      const [, name, ending, index, type, firstValue, secondValue] = match;
      this.name = name;
      this.index = index;
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
  public isReference(): boolean { return pointerSymbol === this.type; }
}

export class ZCWaypoint {
  wayType: WayType;
  wpName?: GString;
  waterDepth?: GInt;
  underWater?: GBool;
  position?: GVec3;
  direction?: GVec3;
  constructor(lines: Array<string>) {
    const [wayTypeLine, ...zenProps] = lines;
    this.wayType = new WayType(wayTypeLine);
    if (!this.wayType.isReference()) {
      forEach(zenProps, (line) => {
        const { key, type, value } = getZenProp(line);
        this[key] = new zenPropConstructors[key](type, value);
      });
    }
  }

  public toString(): string {
    const wayProps = omit(this, ['wayType']);
    const lines = [];
    forEach(wayProps, (prop, key) => {
      if (key !== 'rest' && key !== 'triggerList') {
        lines.push(`${wayPropWhitespace}${key}=${prop.toString()}`);
      } else {
        lines.push(prop.toString());
      }
    });

    return (
      `${this.wayType.toString()}\n` +
      `${join(lines, '\n')}${!isEmpty(lines) ? '\n' : ''}` +
      `${waynetWhitespace}[]\n`
    );
  }

  public isWaypoint(): boolean { return this.wayType.isWaypoint(); }
  public isWay(): boolean { return this.wayType.isWay(); }
  public isReference(): boolean { return this.wayType.isReference(); }
  public getBlockNumber(): string { return this.wayType.secondValue; }
  public getName(): string { return this.wayType.name; }
}
