import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorldsComponent } from './worlds.component';



@NgModule({
  declarations: [WorldsComponent],
  imports: [
    CommonModule
  ],
  exports: [
    WorldsComponent
  ]
})
export class WorldsModule { }
