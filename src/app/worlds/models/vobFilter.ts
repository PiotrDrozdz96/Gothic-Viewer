export interface VobFilter {
  checked: boolean;
  text: string;
  markers: Array<L.Marker>;
}

export type VobFilters = Array<VobFilter>;
