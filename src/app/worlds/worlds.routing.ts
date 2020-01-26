import { Routes } from '@angular/router';

import {
  WorldPageComponent,
  WorldSettingsPageComponent,
  MarkersPageComponent,
} from './pages';

import { WorldsGuard } from './worlds.guard';

export const worldsRoutes: Routes = [
  {
    path: '',
    component: WorldPageComponent,
    canActivate: [ WorldsGuard ],
    canActivateChild: [ WorldsGuard ],
  },
  { path: 'settings', component: WorldSettingsPageComponent },
  { path: 'markers', component: MarkersPageComponent },
  { path: '**', redirectTo: ''},
];
