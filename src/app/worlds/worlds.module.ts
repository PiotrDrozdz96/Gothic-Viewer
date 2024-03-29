import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule, PipesModule, ComponentsModule } from '@common/modules';
import { worldsRoutes } from './worlds.routing';

const modules = [
  CommonModule,
  HttpClientModule,
  ReactiveFormsModule,
  MaterialModule,
  PipesModule,
  ComponentsModule,
  RouterModule.forChild(worldsRoutes),
];

import { WorldPageComponent, MarkersPageComponent, WorldSettingsPageComponent } from './pages';
const pages = [
  WorldPageComponent,
  WorldSettingsPageComponent,
  MarkersPageComponent,
];

import {
  WaynetPanelComponent,
  ItemsPanelComponent,
  VobtreePanelComponent,
  ZCPanelComponent,
  VobsListComponent,
  ZenPropertyComponent,
  GColorsComponent,
  GColorComponent,
  OptionTileComponent,
} from './components';
const components = [
  WaynetPanelComponent,
  ItemsPanelComponent,
  VobtreePanelComponent,
  VobsListComponent,
  ZCPanelComponent,
  ZenPropertyComponent,
  GColorsComponent,
  GColorComponent,
  OptionTileComponent,
];

import { PrefixZenDataComponent, WaynetDataComponent } from './dialogs/';
const dialogs = [
  PrefixZenDataComponent,
  WaynetDataComponent,
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
