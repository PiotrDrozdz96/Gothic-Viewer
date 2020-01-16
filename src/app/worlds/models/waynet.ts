import { split, forEach } from 'lodash';

import { getZenProp } from '@worlds/utils';

import { GInt } from './g-types';
import { WayType, ZCWaypoint } from './waypoint';

interface WaypointsBlock { [key: string]: WayType; }
interface Way { l?: WayType; r?: WayType; }

export class Waynet {
  waynetVersion: GInt;
  numWaypoints: GInt;
  numWays: GInt;

  singleWaypoints: Array<WayType> = [];
  waypointsBlock: WaypointsBlock = {};
  ways: Array<Way> = [];

  constructor(data: string) {
    const waypoints: Array<string> = split(data, '[]\n').slice(0, -5);
    forEach(waypoints, (waypointString) => {
      const lines = split(waypointString, '\n').slice(0, -1);
      while (!WayType.firstLineIsBlock(lines)) {
        const { key, type, value } = getZenProp(lines.shift());
        this[key] = new GInt(type, value);
      }

      const zcWaypoint = new ZCWaypoint(lines);
      if (!zcWaypoint.isPointer()) {
        this.waypointsBlock[zcWaypoint.getPointerNumber()] = zcWaypoint.wayType;
      }
      if (zcWaypoint.isWaypoint()) {
        this.singleWaypoints.push(zcWaypoint.wayType);
      } else if (zcWaypoint.isWay()) {
        const { index, ending } = zcWaypoint.getWayName();
        if (!this.ways[index]) {
          this.ways[index] = {};
        }
        this.ways[index][ending] = zcWaypoint.wayType;
      }
    });
  }
}
