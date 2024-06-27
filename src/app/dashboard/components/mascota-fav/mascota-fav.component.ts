import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController } from '@ionic/angular';
import { PublicationService } from 'src/app/shared/services/publication.service';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle, IonButton } from '@ionic/angular/standalone';
import { Mascota } from '../../Interfaces/mascota.interface';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FavoritoService } from 'src/app/shared/services/favorito.service';
import { addIcons } from 'ionicons';
import { heart, heartOutline } from 'ionicons/icons';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-mascota-fav',
  standalone: true,
  templateUrl: './mascota-fav.component.html',
  styleUrls: ['./mascota-fav.component.css'],
  imports: [
    IonButton, IonicModule, IonCardSubtitle, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule
  ]
})
export class MascotaFavComponent implements OnInit {

  mascotas: Mascota[] = [];
  usuarios: User[] = [];
  private router: Router = inject(Router);
  public currentUser!: User;
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  constructor(
    private publicationService: PublicationService,
    private authService: AuthService,
    private favoritoService: FavoritoService,
    private alertController: AlertController
  ) {
    // Registrar iconos
    addIcons({
      'heart': heart,
      'heart-outline': heartOutline
    });
  }

  ngOnInit() {
    if (!this.isLoggedIn()) {
      window.location.href = `${environment.BASE_URL}/dashboard/`
    }
    this.obteneraMascotasFav();
  }

  obteneraMascotasFav() {
    this.publicationService.obtenerMascotas().subscribe((data: Mascota[]) => {
      this.mascotas = data.filter(mascota => mascota.is_favorito);
      console.log('Mascotas listadas:', this.mascotas);  // Mostrar en consola los datos de las tarjetas listadas
      this.cdr.detectChanges();
    });
  }


  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  navigateTo(page: string) {
    this.router.navigate([page]);
  }

  toggleFavorito(mascota: Mascota) {
    this.favoritoService.removeFavorito(mascota.id).subscribe(() => {

      mascota.is_favorito = false;
      this.mascotas = this.mascotas.filter(m => m.id !== mascota.id);
      this.EliminarFavAlert();
      this.cdr.detectChanges();
    }, error => {
      console.error('Error al remover favorito:', error);
    });

  }

  async EliminarFavAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: '¡Listo!',
      message: 'Mascota eliminada de favoritos',
    });

    await alert.present();
    setTimeout(() => {
      alert.dismiss().then(() => {
      });
    }, 800);

  }
}