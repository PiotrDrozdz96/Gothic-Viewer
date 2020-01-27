import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgIsArrayPipeModule, NgKeysPipeModule } from 'angular-pipes';

@NgModule({
  exports: [
    NgIsArrayPipeModule,
    NgKeysPipeModule,
  ],
})
export class PipesModule { }
