import { values, mapValues, pickBy } from 'lodash';
import { VobTreeInterface, emptyVobtree } from '../consts/vobTypes';

export const getSortedVobtree = (vobtree: VobTreeInterface) => (
  values(pickBy(mapValues(emptyVobtree, (emptyVobs, key) => (
    vobtree[key]
  ))))
);
