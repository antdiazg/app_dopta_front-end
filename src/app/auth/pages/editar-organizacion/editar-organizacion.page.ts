import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-editar-organizacion',
  templateUrl: './editar-organizacion.page.html',
  styleUrls: ['./editar-organizacion.page.css'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class EditarOrganizacionPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
