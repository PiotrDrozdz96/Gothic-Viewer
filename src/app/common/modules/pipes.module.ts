import { NgModule } from '@angular/core';

import { NgIsArrayPipeModule, NgKeysPipeModule } from 'angular-pipes';

@NgModule({
  exports: [
    NgIsArrayPipeModule,
    NgKeysPipeModule,
  ],
})
export class PipesModule { }
