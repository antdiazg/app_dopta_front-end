import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.routes').then( m => m.routesDashboard),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then(m => m.routesAuth),
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  }

];
