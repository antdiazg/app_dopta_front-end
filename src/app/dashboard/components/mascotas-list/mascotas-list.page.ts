import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController, ModalController } from '@ionic/angular';
import { PublicationService } from 'src/app/shared/services/publication.service';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle, IonButton } from '@ionic/angular/standalone';
import { Mascota } from '../../Interfaces/mascota.interface';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FavoritoService } from 'src/app/shared/services/favorito.service';
import { addIcons } from 'ionicons';
import { heart, heartOutline, filterOutline } from 'ionicons/icons';
import { DetalleMascotaComponent } from 'src/app/dashboard/components/detalle-mascota/detalle-mascota.component';

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
  filteredMascotas: Mascota[] = [];
  filtros: any = {
    titulo: '',
    especie: '',
    raza: '',
    sexo: '',
    usuario__username: ''
  };
  mostrarFiltros: boolean = false;
  opcionesEspecie = ['Gato', 'Perro'];

  private router: Router = inject(Router);
  public currentUser!: User;
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private modalCtrl: ModalController = inject(ModalController);

  constructor(
    private publicationService: PublicationService,
    private authService: AuthService,
    private favoritoService: FavoritoService,
    private alertController: AlertController

  ) {
    // Registrar iconos
    addIcons({
      'heart': heart,
      'heart-outline': heartOutline,
      'filter-outline': filterOutline
    });
  }

  ngOnInit() {
    this.obtenerMascotas();
  }

  obtenerMascotas() {
    this.publicationService.obtenerMascotas().subscribe((data: any) => {
      this.mascotas = data;
      this.filteredMascotas = data;
      console.log('Mascotas listadas:', this.mascotas);  // Mostrar en consola los datos de las tarjetas listadas
    });
  }

  aplicarFiltros() {
    let mascotasFiltradas = this.mascotas;

    if (this.filtros.titulo) {
      mascotasFiltradas = mascotasFiltradas.filter(mascota => mascota.titulo.toLowerCase().includes(this.filtros.titulo.toLowerCase()));
    }

    if (this.filtros.especie) {
      mascotasFiltradas = mascotasFiltradas.filter(mascota => mascota.especie.toLowerCase().includes(this.filtros.especie.toLowerCase()));
    }

    if (this.filtros.raza) {
      mascotasFiltradas = mascotasFiltradas.filter(mascota => mascota.raza.toLowerCase().includes(this.filtros.raza.toLowerCase()));
    }

    if (this.filtros.sexo) {
      mascotasFiltradas = mascotasFiltradas.filter(mascota => mascota.sexo.toLowerCase().includes(this.filtros.sexo.toLowerCase()));
    }

    if (this.filtros.usuario__username) {
      mascotasFiltradas = mascotasFiltradas.filter(mascota => mascota.usuario.username.toLowerCase().includes(this.filtros.usuario__username.toLowerCase()));
    }

    // Aplicar más filtros según los campos que tengas en el objeto filtros

    this.filteredMascotas = mascotasFiltradas;
    this.toggleFiltros();
  }
  toggleFiltros() {
    // Mostrar u ocultar la sección de filtros
    this.mostrarFiltros = !this.mostrarFiltros;
  }

  resetFiltros() {
    this.filtros = {
      titulo: '',
      especie: '',
      raza: '',
      sexo: '',
      usuario__username: ''
      // Agrega aquí más campos según los filtros que tengas en el backend
    };
    this.filteredMascotas = this.mascotas;
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
        mascota.is_favorito = false;
        this.EliminarFavAlert();
        this.cdr.detectChanges();
      }, error => {
        console.error('Error al remover favorito:', error);
      });
    } else {
      this.favoritoService.addFavorito(mascota.id).subscribe(() => {
        mascota.is_favorito = true;
        this.AgregarFavAlert();
        this.cdr.detectChanges();
      }, error => {
        console.error('Error al agregar favorito:', error);
      });
    }
  }

  async AgregarFavAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: '¡Listo!',
      message: 'Mascota Agregada a favoritos',
    });

    await alert.present();
    setTimeout(() => {
      alert.dismiss().then(() => {
      });
    }, 800);

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


  async verDetalle(mascota: Mascota) {
    const modal = await this.modalCtrl.create({
      component: DetalleMascotaComponent,
      componentProps: {
        mascota: mascota
      }
    });
    await modal.present();
  }
}
