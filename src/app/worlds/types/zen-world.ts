export interface ZenWorld {
  name: string;
  zenPath: string;
  imageUrl: string;
  mapImageIds?: Array<string>;
}

export interface ZenWorlds {
  [key: string]: ZenWorld;
}
