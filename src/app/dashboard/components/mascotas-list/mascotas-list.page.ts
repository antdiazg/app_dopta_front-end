import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonIcon } from '@ionic/angular';
import { PublicationService } from 'src/app/shared/services/publication.service';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle, IonButton } from '@ionic/angular/standalone';
import { Mascota } from '../../Interfaces/mascota.interface';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FavoritoService } from 'src/app/shared/services/favorito.service';
import { addIcons } from 'ionicons';
import { heart, heartOutline } from 'ionicons/icons';

@Component({
  selector: 'app-mascotas-list',
  templateUrl: './mascotas-list.page.html',
  styleUrls: ['./mascotas-list.page.css'],
  standalone: true,
  imports: [
    IonButton, IonicModule, IonCardSubtitle, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule
  ]
})
export class MascotasListPage implements OnInit {
  mascotas: Mascota[] = [];
  usuarios: User[] = [];
  private router: Router = inject(Router);

  constructor(
    private publicationService: PublicationService,
    private authService: AuthService,
    private favoritoService: FavoritoService
  ) { 
    // Registrar iconos
    addIcons({
      'heart': heart,
      'heart-outline': heartOutline
    });
  }

  ngOnInit() {
    this.obtenerMascotas();
  }

  obtenerMascotas() {
    this.publicationService.obtenerMascotas().subscribe((data: any) => {
      this.mascotas = data;
      console.log('Mascotas listadas:', this.mascotas);  // Mostrar en consola los datos de las tarjetas listadas
    });
  }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  navigateTo(page: string) {
    this.router.navigate([page]);
  }

  toggleFavorito(mascota: Mascota) {
    if (mascota.is_favorito) {
      this.favoritoService.removeFavorito(mascota.id).subscribe(() => {
      }, error => {
        console.error('Error al remover favorito:', error);
      });
    } else {
      this.favoritoService.addFavorito(mascota.id).subscribe(() => {
      }, error => {
        console.error('Error al agregar favorito:', error);
      });
    }
  }

 
}
