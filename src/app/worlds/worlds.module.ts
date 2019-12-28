import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsModule } from '../common/components/components.module';
import { WorldsComponent } from './worlds.component';

@NgModule({
  declarations: [
    WorldsComponent
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
