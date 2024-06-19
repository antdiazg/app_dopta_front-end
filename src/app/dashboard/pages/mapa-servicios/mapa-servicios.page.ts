import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ServiciosListPage } from '../../components/servicios-list/servicios-list.page';

@Component({
  selector: 'app-mapa-servicios',
  templateUrl: './mapa-servicios.page.html',
  styleUrls: ['./mapa-servicios.page.css'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ServiciosListPage]
})
export class MapaServiciosPage implements OnInit {
isMobilView! :boolean;
  constructor() { }

  ngOnInit() {
    this.checkScreenWidth();
      window.addEventListener('resize', () => {
        this.checkScreenWidth();
      });
  }

  checkScreenWidth(): void{
    if (window.innerWidth <= 768) {
      this.isMobilView = true;
    } else{
      this.isMobilView = false;
    }
  }

}
