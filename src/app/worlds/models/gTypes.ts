import _split from 'lodash/split';
import _join from 'lodash/join';
import _map from 'lodash/map';
import _compact from 'lodash/compact';
import _chunk from 'lodash/chunk';

import { getVobProp } from '../utils/getVobProp';

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

export class GRawFloat extends GTypeSimilarString {
  type: 'rawFloat';
}

export class GRaw extends GTypeSimilarString {
  type: 'raw';
}

export class GVec3 extends GTypeSimilarString {
  type: 'vec3';
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
    public type: 'string',
    value: string,
  ) {
    this.value = _split(value, ' ');
  }
  toString(): string {
    return `${this.type}:${_join(this.value, ' ')}`;
  }
}

export class GColorList implements GType {
  value: Array<Color>;
  constructor(
    public type: 'string',
    value: string,
  ) {
    this.value = _map(_split(value, ' '), (color) => (
      _split(color.slice(1, -1), ' ')
    ));
  }
  toString(): string {
    return _join(_map(this.value, (color: Color) => (
      `(${_join(color)})`
    )), ' ');
  }
}

interface Trigger {
  triggerTarget: GString;
  fireDelay: GFloat;
}

export class TriggerList {
  value: Array<Trigger>;
  constructor(lines: Array<string>) {
    this.value = _map(_chunk(lines, 2), (chunk) => {
      const triggerTarget = getVobProp(chunk[0]);
      const fireDelay = getVobProp(chunk[1]);
      return {
        triggerTarget: new GString(triggerTarget.type, triggerTarget.value),
        fireDelay: new GFloat(fireDelay.type, fireDelay.value)
      };
    });
  }
  // toString(): string
}

class Items {
  instance: string;
  number: string;
  constructor(item: string) {
    const [, instance, numberOf] = item.match(/([^:]+):?(\d?)/);
    this.instance = instance;
    this.number = numberOf || '1';
  }
  toString(): string {
    return `${this.instance}${this.number !== '1' ? `:${this.number}` : ''}`;
  }
}

export class Chest {
  value: Array<Items>;
  constructor(
    public type: 'string',
    value: string,
  ) {
    const items = _map(_compact(_split(value, ',')), (item) => new Items(item));
  }
  toString(): string {
    return _join(_map(this.value, (item) => item.toString()), ',');
  }
}
