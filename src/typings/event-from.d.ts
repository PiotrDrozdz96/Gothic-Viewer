interface EventFrom<T = HTMLElement>
extends Omit<Event, 'currentTarget' | 'srcElement' | 'target' | 'composedPath'> {
  readonly currentTarget: T | null;
  /** @deprecated */
  readonly srcElement: T | null;
  readonly target: T | null;
  composedPath(): T[];
}
