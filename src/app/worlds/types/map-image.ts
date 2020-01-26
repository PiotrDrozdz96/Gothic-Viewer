export interface MapImage {
  imageUrl: string;
  name: string;
  bounds: L.LatLngBoundsExpression;
}

export interface MapImages {
  [key: string]: MapImage;
}
