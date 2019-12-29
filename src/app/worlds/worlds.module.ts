import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsModule } from '../common/components/components.module';

import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { WorldsComponent } from './worlds.component';
import { DialogPrefixZenData } from './components/dialog-prefix-zen-data/dialog-prefix-zen-data';

@NgModule({
  declarations: [
    WorldsComponent,
    ToolbarComponent,
    DialogPrefixZenData
  ],
  imports: [
    CommonModule,
    ComponentsModule
  ],
  exports: [
    WorldsComponent
  ],
  entryComponents: [
    DialogPrefixZenData
  ]
})
export class WorldsModule { }
