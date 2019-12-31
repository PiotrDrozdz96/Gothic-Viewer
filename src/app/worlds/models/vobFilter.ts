export interface VobFilter {
  checked: boolean;
  text: string;
  layerGroup: L.LayerGroup;
}

export type VobFilters = Array<VobFilter>;
