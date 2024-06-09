import { Routes } from '@angular/router';
import { IndexPage } from './pages/index/index.page';
import { EventosPage } from './pages/eventos/eventos.page';
import { AdoptarPage } from './pages/adoptar/adoptar.page';
import { FavoritosPage } from './pages/favoritos/favoritos.page';
import { MapaServiciosPage } from './pages/mapa-servicios/mapa-servicios.page';
import { SobreNosotrosPage } from './pages/sobre-nosotros/sobre-nosotros.page';
import { ContactoPage } from './pages/contacto/contacto.page';

export const routesDashboard: Routes = [
  {
    path: '',
    component: IndexPage,
    children: [
      { path: 'eventos', component: EventosPage },
      { path: 'adoptar', component: AdoptarPage },
      { path: 'favoritos', component: FavoritosPage },
      { path: 'mapa-servicios', component: MapaServiciosPage },
      { path: 'sobre-nosotros', component: SobreNosotrosPage },
      { path: 'contacto', component: ContactoPage },

    ]
  },

]
