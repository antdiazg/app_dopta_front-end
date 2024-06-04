import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'index',
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
  {
    path: 'registro-organizaciones',
    loadComponent: () => import('./auth/pages/registro-organizaciones/registro-organizaciones.page').then( m => m.RegistroOrganizacionesPage)
  },
  {
    path: 'recuperacion-contrasenia',
    loadComponent: () => import('./auth/pages/recuperacion-contrasenia/recuperacion-contrasenia.page').then( m => m.RecuperacionContraseniaPage)
  },
  {
    path: 'index',
    loadComponent: () => import('./dashboard/pages/index/index.page').then( m => m.IndexPage)
  },
];
