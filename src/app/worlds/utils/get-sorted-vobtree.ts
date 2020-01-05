import { values, mapValues, pickBy } from 'lodash';
import { Vobtree } from '../models/vobtree';
import { emptyVobtree } from '../consts/empty-vobtree';

export const getSortedVobtree = (vobtree: Vobtree) => (
  values(pickBy(mapValues(emptyVobtree, (emptyVobs, key) => (
    vobtree[key]
  ))))
);
