declare module '*mock' {
  const contents: string;
  export default contents;
}

type CallbackFunction = () => void;

type SimpleChange<T> = {
  previousValue: T;
  currentValue: T;
  firstChange: boolean;
}