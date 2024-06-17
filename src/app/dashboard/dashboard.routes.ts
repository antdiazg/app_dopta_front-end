import { Routes } from '@angular/router';
import { IndexPage } from './pages/index/index.page';
import { EventosPage } from './pages/eventos/eventos.page';
import { AdoptarPage } from './pages/adoptar/adoptar.page';
import { FavoritosPage } from './pages/favoritos/favoritos.page';
import { MapaServiciosPage } from './pages/mapa-servicios/mapa-servicios.page';
import { SobreNosotrosPage } from './pages/sobre-nosotros/sobre-nosotros.page';
import { ContactoPage } from './pages/contacto/contacto.page';
import { MascotasListPage } from './components/mascotas-list/mascotas-list.page';
import { CrearMascotaPage } from './pages/crear-mascota/crear-mascota.page';

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
      { path: 'crear-mascota', component: CrearMascotaPage }
    ]
  },
  // {
  //   path: '',
  //   redirectTo: 'adoptar',
  //   pathMatch: 'full'
  // }

]
