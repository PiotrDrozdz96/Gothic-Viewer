export interface ZenWorld {
  name: string;
  zenPath: string;
  imageUrl: string;
}

export interface ZenWorlds {
  [key: string]: ZenWorld;
}
