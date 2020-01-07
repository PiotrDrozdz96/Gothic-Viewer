import {
  split,
  join,
  map,
  compact,
  chunk,
  replace,
  last,
  trim,
  flatten
} from 'lodash';

import { vobPropWhitespace } from '@worlds/consts';
import { getVobProp } from '@worlds/utils';

type Color = Array<string>;

interface GType {
  type: string;
  value: any;
  toString(): string;
}

abstract class GTypeSimilarString implements GType {
  constructor(
    public type: string,
    public value: string,
  ) {}
  toString(): string {
    return `${this.type}:${this.value}`;
  }
}

export class GInt extends GTypeSimilarString {
  type: 'int';
}

export class GString extends GTypeSimilarString {
  type: 'string';
}

export class GRawFloat implements GType {
  value: Array<number>;
  constructor(
    public type: 'rawFloat',
    value: string,
  ) {
    this.value = map(split(trim(value), ' '), parseFloat);
  }
  toString(): string {
    return `${this.type}:${join(this.value, ' ')} `;
  }
}

export class GRaw extends GTypeSimilarString {
  type: 'raw';
}

export class GVec3 implements GType {
  value: Array<number>;
  constructor(
    public type: 'vec3',
    value: string,
  ) {
    this.value = map(split(value, ' '), parseFloat);
  }
  toString(): string {
    return `${this.type}:${join(this.value, ' ')}`;
  }
}

export class GEnum extends GTypeSimilarString {
  type: 'enum';
}

export class GFloat extends GTypeSimilarString {
  type: 'float';
}

export class GBool implements GType {
  value: boolean;

  constructor(
    public type: 'bool',
    value: string,
  ) {
    this.value = value === '1';
  }
  toString(): string {
    return `${this.type}:${this.value ? '1' : '0'}`;
  }
}

export class GColor implements GType {
  value: Color;
  constructor(
    public type: 'color',
    value: string,
  ) {
    this.value = split(value, ' ');
  }
  toString(): string {
    return `${this.type}:${join(this.value, ' ')}`;
  }
}

export class GColorList implements GType {
  value: Array<Color>;
  constructor(
    public type: 'string',
    value: string,
  ) {
    const colors = split(trim(value), ') (');
    colors[0] = replace(colors[0], '(', '');
    colors[colors.length - 1] = replace(last(colors), ')', '');
    this.value = map(colors, (color) => split(color, ' '));
  }
  toString(): string {
    return `${this.type}:${join(map(this.value, (color: Color) => (
      `(${join(color, ' ')})`
    )), ' ')}`;
  }
}

export class Items {
  instance: string;
  number: string;
  constructor(item: string) {
    const [, instance, numberOf] = item.match(/([^:]+):?(\d*)/);
    this.instance = instance;
    this.number = numberOf || '1';
  }
  toString(): string {
    return `${this.instance}${this.number !== '1' ? `:${this.number}` : ''}`;
  }
}

export class Chest implements GType {
  value: Array<Items>;
  constructor(
    public type: 'string',
    value: string,
  ) {
    this.value = map(compact(split(value, ',')), (item) => new Items(item));
  }
  toString(): string {
    return join(map(this.value, (item) => item.toString()), ',');
  }
}

export class Rest {
  value: Array<string> = [];
  push(value: string): void {
    this.value.push(value);
  }
  toString(whitespace = vobPropWhitespace): string {
    return join(map(this.value, (line) => `${whitespace}${line}`), '\n');
  }
}
