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

import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { VobsListComponent } from './components/vobs-list/vobs-list.component';
import { VobPanelComponent } from './components/vob-panel/vob-panel.component';
import { WorldPageComponent } from './pages/world-page/world-page.component';
import { MarkersPageComponent } from './pages/markers-page/markers-page.component';

const components = [
  ToolbarComponent,
  VobsListComponent,
  VobPanelComponent,
  WorldPageComponent,
  MarkersPageComponent,
];

import { PrefixZenDataComponent } from './dialogs/prefix-zen-data/prefix-zen-data.component';

const dialogs = [PrefixZenDataComponent];

@NgModule({
  declarations: [
    ...components,
    ...dialogs,
  ],
  imports: [
    ...modules
  ],
  entryComponents: [
    ...dialogs
  ],
})
export class WorldsModule { }
