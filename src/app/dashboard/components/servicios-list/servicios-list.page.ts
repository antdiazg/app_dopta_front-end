import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCardSubtitle, IonCardContent, IonCardTitle, IonCardHeader, IonCard } from '@ionic/angular/standalone';
import { Servicio } from '../../Interfaces/servicio.interface';
import { Router } from '@angular/router';
import { PublicationService } from '../../../shared/services/publication.service';
import { AuthService } from '../../../auth/services/auth.service';
import { Organizacion, Persona } from 'src/app/auth/interface';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-servicios-list',
  templateUrl: './servicios-list.page.html',
  styleUrls: ['./servicios-list.page.css'],
  standalone: true,
  imports: [IonButton, IonicModule, IonCardSubtitle, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ServiciosListPage implements OnInit {

  servicios : Servicio[] = [];
  public organizacion : Organizacion[] = [];
  public currentUser! : Persona;
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private router: Router = inject(Router);

  constructor(
    private publicationService: PublicationService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.obtenerServicios();
    this.loadUserProfile();
  }

  obtenerServicios(){
    this.publicationService.obtenerServicios().subscribe((data: any) => {
      this.servicios = data;
    });
  }

  navigateTo(page: string){
    this.router.navigate([page]);
  }

  loadUserProfile() {
    this.authService.getProfile().subscribe(
      response => {
        if (response && response.user && response.user.username) {
          console.log({ response });
          this.currentUser = response;
          this.cdr.markForCheck(); // Forzar la detección de cambios
        } else {
          console.error('Invalid user profile response', response);
        }
      },
      error => {
        console.error('Error fetching user profile', error);
      }
    );
  }

}
