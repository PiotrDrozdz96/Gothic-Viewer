import { NgModule } from '@angular/core';
import {
  NgIsArrayPipeModule,
  NgKeysPipeModule,
  NgToArrayPipeModule,
  NgJoinPipeModule,
} from 'angular-pipes';

import { IncludesPipe, RgbPipe } from '@common/pipes';
const pipes = [
  IncludesPipe,
  RgbPipe,
];

@NgModule({
  declarations: pipes,
  exports: [
    NgIsArrayPipeModule,
    NgKeysPipeModule,
    NgToArrayPipeModule,
    NgJoinPipeModule,
    ...pipes,
  ],
})
export class PipesModule { }
