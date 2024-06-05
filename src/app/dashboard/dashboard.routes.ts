import { Routes } from '@angular/router';
import { IndexPage } from './pages/index/index.page';
import { EventosPage } from './pages/eventos/eventos.page';

export const routesDashboard: Routes = [
  {
    path: '',
    component: IndexPage,
    children: [
      { path: 'eventos', component: EventosPage },
    ]
  },

]
