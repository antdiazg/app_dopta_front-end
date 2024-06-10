import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PublicationService } from 'src/app/shared/services/publication.service';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle } from '@ionic/angular/standalone';
import { Mascota } from '../../Interfaces/mascota.interface';
import { User } from 'src/app/auth/interface';

@Component({
  selector: 'app-mascotas-list',
  templateUrl: './mascotas-list.page.html',
  styleUrls: ['./mascotas-list.page.css'],
  standalone: true,
  imports: [IonCardSubtitle, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class MascotasListPage implements OnInit {

  mascotas: Mascota[] = [];
  usuarios: User[] = [];

  constructor(private publicationService: PublicationService) { }

  ngOnInit() {
    this.obtenerMascotas();
  }

  obtenerMascotas() {
    this.publicationService.obtenerMascotas().subscribe((data: any) => {

      this.mascotas = data;
      
    })
  }





}
