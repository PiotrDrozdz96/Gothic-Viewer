import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '@common/modules';
const modules = [
  CommonModule,
  MaterialModule,
];

import { ToolbarComponent } from './toolbar/toolbar.component';
import { ToolbarIconComponent } from './toolbar-icon/toolbar-icon.component';
const components = [
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
export class ToolbarModule { }

