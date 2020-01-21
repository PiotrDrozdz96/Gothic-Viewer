import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { ComponentsModule } from '@common/components';
import { worldsRoutes } from './worlds.routing';

const modules = [
  CommonModule,
  HttpClientModule,
  ReactiveFormsModule,
  ComponentsModule,
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
  VobtreePanelComponent,
  VobPanelComponent,
  VobsListComponent,
  VobPropertyComponent,
  GColorsComponent,
  GColorComponent,
  OptionTileCheckboxComponent,
  OptionTileRadioComponent,
} from './components';
const components = [
  VobtreePanelComponent,
  VobsListComponent,
  VobPanelComponent,
  VobPropertyComponent,
  GColorsComponent,
  GColorComponent,
  OptionTileCheckboxComponent,
  OptionTileRadioComponent,
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
