import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PublicationService } from 'src/app/shared/services/publication.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle, IonButton } from '@ionic/angular/standalone';
import { Evento } from 'src/app/dashboard/Interfaces/evento.interface';
import { Router } from '@angular/router';
import { Persona, User } from 'src/app/auth/interface';


@Component({
  selector: 'app-eventos-list',
  templateUrl: './eventos-list.component.html',
  styleUrls: ['./eventos-list.component.css'],
  standalone: true,
  imports: [ FormsModule, CommonModule, IonicModule, IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle, IonButton ]
})
export class EventosListComponent implements OnInit {

  eventos: Evento[] = [];
  usuarios: User[] = [];
  public currentUser!  : Persona;
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private router: Router = inject(Router);

  constructor(
    private publicationService: PublicationService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.obtenerEventos();
    this.loadUserProfile();
  }

  obtenerEventos() {
    this.publicationService.obtenerEventos().subscribe((data: any) => {
      this.eventos = data;
    })
  }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }
  navigateTo(page: string) {
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
