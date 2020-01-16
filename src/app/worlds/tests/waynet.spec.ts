import { Waynet } from '@worlds/models';

import { waynetMock } from './mocks';

describe('Waynet', () => {
  const waynet = new Waynet(waynetMock);
  it('create an instance', () => {
    expect(waynet).toBeTruthy();
  });
  // it('should save correctly startLine', () => {
  //   expect(waynet.startLine).toEqual('		[% zCWayNet 0 16848]');
  // });
  // it('waynetVersion should be 1', () => {
  //   expect(waynet.waynetVersion.value).toEqual('1');
  // });
});
