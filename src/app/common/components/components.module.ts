import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

import { InputFileComponent } from './input-file/input-file.component';

const components = [
  InputFileComponent
];

const modules = [
  BrowserAnimationsModule,
  MatButtonModule,
  MatIconModule,
  MatDialogModule,
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
