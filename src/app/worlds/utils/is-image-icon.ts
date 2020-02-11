import { has } from 'lodash';

export const isImageIcon = (icon: L.Icon | L.DivIcon): boolean => (
  has(icon, ['options', 'iconUrl'])
);
