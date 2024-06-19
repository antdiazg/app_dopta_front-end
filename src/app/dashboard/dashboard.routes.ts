import { Routes } from '@angular/router';
import { IndexPage } from './pages/index/index.page';
import { EventosPage } from './pages/eventos/eventos.page';
import { AdoptarPage } from './pages/adoptar/adoptar.page';
import { FavoritosPage } from './pages/favoritos/favoritos.page';
import { MapaServiciosPage } from './pages/mapa-servicios/mapa-servicios.page';
import { SobreNosotrosPage } from './pages/sobre-nosotros/sobre-nosotros.page';
import { ContactoPage } from './pages/contacto/contacto.page';
import { MascotasListPage } from './components/mascotas-list/mascotas-list.page';
import { EventosListComponent } from './components/eventos-list/eventos-list.component';
import { CrearMascotaPage } from './pages/crear-mascota/crear-mascota.page';
import { CrearEventoPage } from './pages/crear-evento/crear-evento.page';
import { CrearServicioPage } from './pages/crear-servicio/crear-servicio.page';

export const routesDashboard: Routes = [
  {
    path: '',
    component: IndexPage,
    children: [
      { path: 'eventos', component: EventosPage },
      { path: '', component: AdoptarPage },
      { path: 'favoritos', component: FavoritosPage },
      { path: 'mapa-servicios', component: MapaServiciosPage },
      { path: 'sobre-nosotros', component: SobreNosotrosPage },
      { path: 'contacto', component: ContactoPage },
      { path: 'mascota-list', component: MascotasListPage },
      { path: 'evento-list', component: EventosListComponent },
      { path: 'crear-mascota', component: CrearMascotaPage },
      { path: 'crear-evento', component: CrearEventoPage },
      { path: 'crear-servicio', component: CrearServicioPage },

    ]
  },
  // {
  //   path: '',
  //   redirectTo: 'adoptar',
  //   pathMatch: 'full'
  // }

]
