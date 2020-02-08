import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule, PipesModule } from '@common/modules';
import { worldsRoutes } from './worlds.routing';

const modules = [
  CommonModule,
  HttpClientModule,
  ReactiveFormsModule,
  MaterialModule,
  PipesModule,
  RouterModule.forChild(worldsRoutes),
];

import { ArrayToStringPipe, RgbPipe } from '@common/pipes';
const pipes = [
  ArrayToStringPipe,
  RgbPipe,
];

import { WorldPageComponent, MarkersPageComponent, WorldSettingsPageComponent } from './pages';
const pages = [
  WorldPageComponent,
  WorldSettingsPageComponent,
  MarkersPageComponent,
];

import {
  WaynetPanelComponent,
  VobtreePanelComponent,
  VobPanelComponent,
  VobsListComponent,
  ZenPropertyComponent,
  GColorsComponent,
  GColorComponent,
  OptionTileComponent,
} from './components';
const components = [
  WaynetPanelComponent,
  VobtreePanelComponent,
  VobsListComponent,
  VobPanelComponent,
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
    ...pipes,
  ],
  imports: [
    ...modules,
  ],
  entryComponents: [
    ...dialogs,
  ],
})
export class WorldsModule { }
