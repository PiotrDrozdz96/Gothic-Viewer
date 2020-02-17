import * as L from 'leaflet';

import { isImageIcon } from '@worlds/utils';

describe('isImageIcon', () => {
  it('L.Icon shuld return true', () => {
    const icon = new L.Icon({ iconUrl: 'exampleUrl' });
    expect(isImageIcon(icon)).toEqual(true);
  });
  it('L.DivIcon should return false', () => {
    const icon = new L.DivIcon({ className: 'waypoint-icon '});
    expect(isImageIcon(icon)).toEqual(false);
  });
});
