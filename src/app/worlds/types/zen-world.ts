export interface ZenWorld {
  name: string;
  zenPath: string;
  imageUrl: string;
  mapImageId?: string;
  additionalMapImageIds?: Array<string>;
}

export interface ZenWorlds {
  [key: string]: ZenWorld;
}
