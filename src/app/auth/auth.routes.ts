import { Routes } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
import { RecuperacionContraseniaPage } from './pages/recuperacion-contrasenia/recuperacion-contrasenia.page';
import { RegistroOrganizacionesPage } from './pages/registro-organizaciones/registro-organizaciones.page';
import { RegistroPage } from './pages/registro/registro.page';
import { EditarPersonaPage } from './pages/editar-persona/editar-persona.page';
import { EditarOrganizacionPage } from './pages/editar-organizacion/editar-organizacion.page';
import { ResetPasswordConfirm } from './pages/recu-pass-confirm/recu-pass-confirm.page';
export const routesAuth: Routes = [

  { path: 'login', component: LoginPage, },
  { path: 'registro', component: RegistroPage },
  { path: 'registro-organizaciones', component: RegistroOrganizacionesPage },
  { path: 'recuperacion-contrasenia', component: RecuperacionContraseniaPage },
  { path: 'recu-pass-confirm', component: ResetPasswordConfirm },
  { path: 'editar-persona', component: EditarPersonaPage },
  { path: 'editar-organizacion', component: EditarOrganizacionPage },
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  }


]
