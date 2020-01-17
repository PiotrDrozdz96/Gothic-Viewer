import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
const modules = [
  CommonModule,
  FormsModule,
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatTableModule,
  MatDialogModule,
];

import { InputFileComponent } from './input-file/input-file.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ToolbarIconComponent } from './toolbar-icon/toolbar-icon.component';
const components = [
  InputFileComponent,
  ToolbarComponent,
  ToolbarIconComponent,
];

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    ...modules,
  ],
  exports: [
    ...modules,
    ...components,
  ],
})
export class ComponentsModule { }
