export interface VobFilter {
  checked: boolean;
  text: string;
  layerGroup: L.LayerGroup;
  length: number;
}

export type VobFilters = Array<VobFilter>;
