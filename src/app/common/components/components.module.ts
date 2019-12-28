import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { InputFileComponent } from './input-file/input-file.component';

const components = [
  InputFileComponent
];

const modules = [
  MatButtonModule,
  MatIconModule
];

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    ...modules
  ],
  exports: [
    ...modules,
    ...components
  ]
})
export class ComponentsModule { }
