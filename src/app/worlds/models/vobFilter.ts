import { GMarkersGroup } from './gMarkersGroup';

export interface VobFilter {
  checked: boolean;
  text: string;
  gMarkersGroup: GMarkersGroup;
}

export type VobFilters = Array<VobFilter>;
