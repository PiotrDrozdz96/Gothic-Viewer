import { Routes } from '@angular/router';

import {
  WorldPageComponent,
  WorldSettingsPageComponent,
  MarkersPageComponent,
} from './pages';

export const worldsRoutes: Routes = [
  { path: '', component: WorldPageComponent },
  { path: 'settings', component: WorldSettingsPageComponent },
  { path: 'markers', component: MarkersPageComponent },
  { path: '**', redirectTo: ''},
];
