import { split } from 'lodash';
import { VOB } from './vob-types';

export const itemsVobs = [VOB.OC_ITEM, VOB.OC_MOB_CONTAINER].map((x) => split(x, ':')[0]);
