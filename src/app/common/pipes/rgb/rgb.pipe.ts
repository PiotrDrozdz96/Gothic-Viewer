import { Pipe, PipeTransform } from '@angular/core';
import { join } from 'lodash';

import { Color } from '@common/types';

@Pipe({ name: 'rgb' })
export class RgbPipe implements PipeTransform {

  transform(color: Color): any {
    return `rgb(${join(color, ', ')})`;
  }

}
