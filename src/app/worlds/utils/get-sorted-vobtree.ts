import { values, mapValues, pickBy } from 'lodash';

import { emptyVobtree } from '../consts/empty-vobtree';
import { Vobtree } from '../models/vobtree';

export const getSortedVobtree = (vobtree: Vobtree) => (
  values(pickBy(mapValues(emptyVobtree, (emptyVobs, key) => (
    vobtree[key]
  ))))
);
