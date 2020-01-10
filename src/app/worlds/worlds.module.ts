import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ComponentsModule } from '@common/components';
import { worldsRoutes } from './worlds.routing';

const modules = [
  CommonModule,
  ComponentsModule,
  RouterModule.forChild(worldsRoutes),
];

import { WorldPageComponent, MarkersPageComponent } from './pages';
const pages = [
  WorldPageComponent,
  MarkersPageComponent,
];

import { VobtreePanelComponent, VobPanelComponent, VobsListComponent } from './components';
const components = [
  VobtreePanelComponent,
  VobsListComponent,
  VobPanelComponent,
];

import { PrefixZenDataComponent } from './dialogs/';
const dialogs = [
  PrefixZenDataComponent,
];

@NgModule({
  declarations: [
    ...pages,
    ...components,
    ...dialogs,
  ],
  imports: [
    ...modules,
  ],
  entryComponents: [
    ...dialogs,
  ],
})
export class WorldsModule { }
