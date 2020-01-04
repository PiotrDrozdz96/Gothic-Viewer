import { VobMarkerGroup } from './vob-marker-group';

export interface VobFilter {
  checked: boolean;
  text: string;
  vobMarkerGroup: VobMarkerGroup;
}

export type VobFilters = Array<VobFilter>;
