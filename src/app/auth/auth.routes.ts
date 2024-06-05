import { Routes } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
import { RecuperacionContraseniaPage } from './pages/recuperacion-contrasenia/recuperacion-contrasenia.page';
import { RegistroOrganizacionesPage } from './pages/registro-organizaciones/registro-organizaciones.page';
import { RegistroPage } from './pages/registro/registro.page';

export const routesAuth: Routes = [

  { path: '', component: LoginPage,},
  { path: 'registro', component: RegistroPage},
  { path: 'registro-organizaciones', component: RegistroOrganizacionesPage},
  { path: 'recuperacion-contrasenia', component: RecuperacionContraseniaPage},


]
