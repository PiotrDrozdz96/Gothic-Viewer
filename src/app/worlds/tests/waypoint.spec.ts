import { WayType } from '@worlds/models';

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
        expect(wayType.name).toEqual('waypoint18');
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
        expect(wayType.name).toEqual('wayr3');
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
      const line = '			[wayl3 § 0 16872]';
      const wayType = new WayType(line);
      it('create an instance', () => {
        expect(wayType).toBeTruthy();
      });
      it('type should be §', () => {
        expect(wayType.type).toEqual('§');
      });
      it('name should be wayr3', () => {
        expect(wayType.name).toEqual('wayl3');
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
});
