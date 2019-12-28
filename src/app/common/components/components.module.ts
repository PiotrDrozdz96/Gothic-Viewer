import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';

import { InputFileComponent } from './input-file/input-file.component';

@NgModule({
  declarations: [
    InputFileComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [
    InputFileComponent
  ]
})
export class ComponentsModule { }
