import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ComponentsModule } from '../common/components/components.module';

const modules = [
  CommonModule,
  ComponentsModule,
  RouterModule.forChild([
    { path: '', component: WorldsComponent },
    { path: 'markers', component: MarkersPageComponent },
    { path: '**', redirectTo: ''}
  ]),
];

import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { WorldsComponent } from './worlds.component';
import { MarkersPageComponent } from './+markers-page/markers-page.component';

const components = [
  WorldsComponent,
  ToolbarComponent,
  MarkersPageComponent,
];

import { PrefixZenDataDialog } from './components/prefix-zen-data/prefix-zen-data.dialog';

const dialogs = [PrefixZenDataDialog];

@NgModule({
  declarations: [
    ...components,
    ...dialogs,
  ],
  imports: modules,
  entryComponents: dialogs,
})
export class WorldsModule { }
