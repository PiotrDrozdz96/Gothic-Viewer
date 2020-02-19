import { NgModule } from '@angular/core';
import { NgIsArrayPipeModule, NgKeysPipeModule, NgToArrayPipeModule } from 'angular-pipes';

import { ArrayToStringPipe, RgbPipe } from '@common/pipes';
const pipes = [
  ArrayToStringPipe,
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
