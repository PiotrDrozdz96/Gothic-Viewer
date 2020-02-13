import { GType } from './g-type';
import { BlockLine } from './block-line';
import { zenPropConstructors } from '@worlds/models';

export type ZC = {
  [key in keyof typeof zenPropConstructors]?: GType;
} & {
  index?: string,
  zcType: BlockLine;
  toString(): string;
};
