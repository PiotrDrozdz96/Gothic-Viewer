export interface BlockLine {
  type: string;
  firstValue: string;
  secondValue: string;
  toString(whitespace?: string): string;
}
