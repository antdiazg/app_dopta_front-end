import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'registro',
    loadComponent: () => import('./auth/pages/registro/registro.page').then( m => m.RegistroPage)
  },
];
