import { Routes } from '@angular/router';

import { WorldPageComponent, MarkersPageComponent } from './pages';

export const worldsRoutes: Routes = [
  { path: '', component: WorldPageComponent },
  { path: 'markers', component: MarkersPageComponent },
  { path: '**', redirectTo: ''}
];
