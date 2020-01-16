import { split } from 'lodash';

import { WayType, ZCWaypoint } from '@worlds/models';

import { waypointMock, wayMock } from './mocks';

describe('Waypoint', () => {
  describe('WayType', () => {
    describe('static method firstLineIsBlock', () => {
      it('if empty should return false', () => {
        const lines = [];
        expect(WayType.firstLineIsBlock(lines)).toEqual(false);
      });
      it('should return false', () => {
        const lines = [
          '			waynetVersion=int:1',
          '			numWaypoints=int:20',
          '			[waypoint0 zCWaypoint 0 16849]',
        ];
        expect(WayType.firstLineIsBlock(lines)).toEqual(false);
      });
      it('should return true', () => {
        const lines = ['			[waypoint0 zCWaypoint 0 16849]'];
        expect(WayType.firstLineIsBlock(lines)).toEqual(true);
      });
      it('should return true', () => {
        const lines = split(wayMock, '\n').slice(0, -1);
        expect(WayType.firstLineIsBlock(lines)).toEqual(true);
      });
    });

    describe('WaypointType', () => {
      const line = '			[waypoint18 zCWaypoint 0 16867]';
      const wayType = new WayType(line);
      it('create an instance', () => {
        expect(wayType).toBeTruthy();
      });
      it('type should be zCWaypoint', () => {
        expect(wayType.type).toEqual('zCWaypoint');
      });
      it('name should be waypoint18', () => {
        expect(wayType.name).toEqual('waypoint');
      });
      it('first value should be 0', () => {
        expect(wayType.firstValue).toEqual('0');
      });
      it('second value should be 16867', () => {
        expect(wayType.secondValue).toEqual('16867');
      });
      it('toString should return the same line', () => {
        expect(wayType.toString()).toEqual(line);
      });
      it('isWaypoint should return true', () => {
        expect(wayType.isWaypoint()).toEqual(true);
      });
      it('isWay should return false', () => {
        expect(wayType.isWay()).toEqual(false);
      });
      it('isReference should return false', () => {
        expect(wayType.isReference()).toEqual(false);
      });
    });

    describe('WayType', () => {
      const line = '			[wayr3 zCWaypoint 0 16873]';
      const wayType = new WayType(line);
      it('create an instance', () => {
        expect(wayType).toBeTruthy();
      });
      it('type should be zCWaypoint', () => {
        expect(wayType.type).toEqual('zCWaypoint');
      });
      it('name should be wayr3', () => {
        expect(wayType.name).toEqual('way');
      });
      it('ending should be r', () => {
        expect(wayType.ending).toEqual('r');
      });
      it('first value should be 0', () => {
        expect(wayType.firstValue).toEqual('0');
      });
      it('second value should be 16873', () => {
        expect(wayType.secondValue).toEqual('16873');
      });
      it('toString should return the same line', () => {
        expect(wayType.toString()).toEqual(line);
      });
      it('isWay should return true', () => {
        expect(wayType.isWay()).toEqual(true);
      });
      it('isWaypoint should return false', () => {
        expect(wayType.isWaypoint()).toEqual(false);
      });
      it('isReference should return false', () => {
        expect(wayType.isReference()).toEqual(false);
      });
    });

    describe('copy way', () => {
      const line = '			[wayl3 � 0 16872]';
      const wayType = new WayType(line);
      it('create an instance', () => {
        expect(wayType).toBeTruthy();
      });
      it('type should be §', () => {
        expect(wayType.type).toEqual('�');
      });
      it('name should be wayr3', () => {
        expect(wayType.name).toEqual('way');
      });
      it('ending should be l', () => {
        expect(wayType.ending).toEqual('l');
      });
      it('first value should be 0', () => {
        expect(wayType.firstValue).toEqual('0');
      });
      it('second value should be 16873', () => {
        expect(wayType.secondValue).toEqual('16872');
      });
      it('toString should return the same line', () => {
        expect(wayType.toString()).toEqual(line);
      });
      it('isWay should return true', () => {
        expect(wayType.isWay()).toEqual(true);
      });
      it('isWaypoint should return false', () => {
        expect(wayType.isWaypoint()).toEqual(false);
      });
      it('isReference should return true', () => {
        expect(wayType.isReference()).toEqual(true);
      });
    });
  });

  describe('ZCWaypoint', () => {
    const closeBlock = '			[]\n';
    describe('waypoint', () => {
      const waypoint = new ZCWaypoint(split(waypointMock, '\n').slice(0, -1));
      it('create an instance', () => {
        expect(waypoint).toBeTruthy();
      });
      it('isWaypoint should return true', () => {
        expect(waypoint.isWaypoint()).toEqual(true);
      });
      it('getBlockNumber return 16849', () => {
        expect(waypoint.getBlockNumber()).toEqual('16849');
      });
      it('should save wayProp', () => {
        expect(waypoint.wpName).toBeTruthy();
      });
      it('toString should return correctly string', () => {
        expect(waypoint.toString()).toEqual(`${waypointMock}${closeBlock}`);
      });
    });

    describe('way', () => {
      const waypoint = new ZCWaypoint(split(wayMock, '\n').slice(0, -1));
      it('create an instance', () => {
        expect(waypoint).toBeTruthy();
      });
      it('isWay should return true', () => {
        expect(waypoint.isWay()).toEqual(true);
      });
      it('getBlockNumber return 16870', () => {
        expect(waypoint.getBlockNumber()).toEqual('16870');
      });
      it('should save wayProp', () => {
        expect(waypoint.position).toBeTruthy();
      });
      it('toString should return correctly string', () => {
        expect(waypoint.toString()).toEqual(`${wayMock}${closeBlock}`);
      });
    });

    describe('way reference', () => {
      const wayReferenceMock = '			[wayl1 � 0 16869]\n';
      const waypoint = new ZCWaypoint(split(wayReferenceMock, '\n').slice(0, -1));
      it('create an instance', () => {
        expect(waypoint).toBeTruthy();
      });
      it('isReference should return true', () => {
        expect(waypoint.isReference()).toEqual(true);
      });
      it('getBlockNumber return 16869', () => {
        expect(waypoint.getBlockNumber()).toEqual('16869');
      });
      it('toString should return correctly string', () => {
        expect(waypoint.toString()).toEqual(`${wayReferenceMock}${closeBlock}`);
      });
    });
  });
});
