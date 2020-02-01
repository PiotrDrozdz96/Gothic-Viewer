import { NgModule } from '@angular/core';

import { NgIsArrayPipeModule, NgKeysPipeModule, NgToArrayPipeModule } from 'angular-pipes';

@NgModule({
  exports: [
    NgIsArrayPipeModule,
    NgKeysPipeModule,
    NgToArrayPipeModule,
  ],
})
export class PipesModule { }
