import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

import { InputFileComponent } from './input-file/input-file.component';

const components = [
  InputFileComponent
];

const modules = [
  CommonModule,
  FormsModule,
  BrowserAnimationsModule,
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatDialogModule,
];

@NgModule({
  declarations: components,
  imports: [
    ...modules
  ],
  exports: [
    ...modules,
    ...components
  ]
})
export class ComponentsModule { }
