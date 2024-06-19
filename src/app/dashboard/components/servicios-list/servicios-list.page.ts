import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCardSubtitle, IonCardContent, IonCardTitle, IonCardHeader, IonCard } from '@ionic/angular/standalone';
import { Servicio } from '../../Interfaces/servicio.interface';
import { Router } from '@angular/router';
import { PublicationService } from '../../../shared/services/publication.service';
import { AuthService } from '../../../auth/services/auth.service';
import { Organizacion } from 'src/app/auth/interface';
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
  private router: Router = inject(Router);

  constructor(
    private publicationService: PublicationService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.obtenerServicios();
  }

  obtenerServicios(){
    this.publicationService.obtenerServicios().subscribe((data: any) => {
      this.servicios = data;
    });
  }

  navigateTo(page: string){
    this.router.navigate([page]);
  }



}
