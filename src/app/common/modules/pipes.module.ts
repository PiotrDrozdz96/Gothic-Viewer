import { NgModule } from '@angular/core';
import { NgIsArrayPipeModule, NgKeysPipeModule, NgToArrayPipeModule } from 'angular-pipes';

import { ArrayToStringPipe, IncludesPipe, RgbPipe } from '@common/pipes';
const pipes = [
  ArrayToStringPipe,
  IncludesPipe,
  RgbPipe,
];

@NgModule({
  declarations: pipes,
  exports: [
    NgIsArrayPipeModule,
    NgKeysPipeModule,
    NgToArrayPipeModule,
    ...pipes,
  ],
})
export class PipesModule { }
