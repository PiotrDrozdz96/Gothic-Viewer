import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';

import { InputFileComponent } from './input-file/input-file.component';
import { CustomScrollbarComponent } from './custom-scrollbar/custom-scrollbar.component';

const modules = [
  CommonModule,
  FormsModule,
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatTableModule,
  MatDialogModule,
];

const components = [
  InputFileComponent,
  CustomScrollbarComponent,
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
