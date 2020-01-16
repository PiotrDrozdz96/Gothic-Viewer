import { size } from 'lodash';

import { Waynet } from '@worlds/models';

import { waynetMock } from './mocks';

describe('Waynet', () => {
  const waynet = new Waynet(waynetMock);
  it('create an instance', () => {
    expect(waynet).toBeTruthy();
  });
  it('should save correctly startLine', () => {
    expect(waynet.startLine).toEqual('		[% zCWayNet 0 16848]');
  });
  it('waynetVersion should be 1', () => {
    expect(waynet.waynetVersion.value).toEqual('1');
  });
  it('numWaypoints should be equal to singleWaypoint.length and be equal 4', () => {
    expect(waynet.numWaypoints.value).toEqual(waynet.singleWaypoints.length.toString());
    expect(waynet.numWaypoints.value).toEqual('4');
  });
  it('numWays should be equal to ways.length and be equal 4', () => {
    expect(waynet.numWays.value).toEqual(waynet.ways.length.toString());
    expect(waynet.numWays.value).toEqual('4');
  });
  it('waynet should save 9 waypointsBlock', () => {
    expect(size(waynet.waypointsBlock)).toEqual(9);
  });
});
