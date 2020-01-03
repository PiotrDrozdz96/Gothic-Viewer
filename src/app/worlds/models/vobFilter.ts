import { GLayerGroup } from './gLayerGroup';

export interface VobFilter {
  checked: boolean;
  text: string;
  layerGroup: GLayerGroup;
}

export type VobFilters = Array<VobFilter>;
