type EventFrom<T = HTMLElement> = Event & {
  readonly currentTarget: T | null;
  /** @deprecated */
  readonly srcElement: T | null;
  readonly target: T | null;
  composedPath(): T[];
}