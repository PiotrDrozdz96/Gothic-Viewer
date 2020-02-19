import { Pipe, PipeTransform } from '@angular/core';

import { Dictionary, NumericDictionary, includes } from 'lodash';

@Pipe({ name: 'includes' })
export class IncludesPipe implements PipeTransform {

  transform(
    collection: Dictionary<unknown> | NumericDictionary<unknown>,
    target: unknown,
    fromIndex: number = 0,
  ): boolean {
    return includes(collection, target, fromIndex);
  }

}
