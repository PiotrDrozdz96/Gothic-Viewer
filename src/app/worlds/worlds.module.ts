import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsModule } from '../common/components/components.module';

import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { WorldsComponent } from './worlds.component';

@NgModule({
  declarations: [
    WorldsComponent,
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule
  ],
  exports: [
    WorldsComponent
  ]
})
export class WorldsModule { }
