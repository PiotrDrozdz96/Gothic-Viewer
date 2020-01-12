import { Pipe, PipeTransform } from '@angular/core';

import { join } from 'lodash';

@Pipe({ name: 'arrayToString' })
export class ArrayToStringPipe implements PipeTransform {

  transform(array: Array<any>): any {
    return join(array, '\n');
  }

}
