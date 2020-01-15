import { split, forEach } from 'lodash';

import { getZenProp } from '@worlds/utils';

import { GInt } from './g-types';
import { WayType, ZCWaypoint } from './waypoint';

interface WaypointsBlock { [key: string]: ZCWaypoint; }
interface Way { l: ZCWaypoint; r: ZCWaypoint; }

export class Waynet {
  waynetVersion: GInt;
  numWaypoints: GInt;
  numWays: GInt;

  singleWaypoints: Array<ZCWaypoint> = [];
  waypointsBlock: WaypointsBlock = {};
  ways: Array<Way> = [];

  constructor(data: string) {
    const waypoints: Array<string> = split(data, '[]\n').slice(0, -5);
    forEach(waypoints, (waypointString) => {
      const lines = split(waypointString, '\n').slice(0, -1);
      while (!WayType.firstLineIsBlock(lines)) {
        const test = lines.shift();
        const { key, type, value } = getZenProp(test);
        this[key] = new GInt(type, value);
      }

      const zcWaypoint = new ZCWaypoint(lines);
      if (zcWaypoint.isWaypoint()) {
        this.singleWaypoints.push(zcWaypoint);
      } else if (zcWaypoint.isWay()) {
        if (!zcWaypoint.isReference()) {
          this.waypointsBlock[zcWaypoint.getBlockNumber()] = zcWaypoint;
        }
        // put to ways
      }
    });
    console.log(this.waypointsBlock);
  }
}
