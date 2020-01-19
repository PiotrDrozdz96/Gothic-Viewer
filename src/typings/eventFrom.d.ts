interface EventFrom<T extends HTMLElement = HTMLElement> extends Event {
  readonly currentTarget: T;
  readonly target: T;
  deepPath(): T[];
}