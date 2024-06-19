import { Component, Input, OnInit } from '@angular/core';
import { Mascota } from 'src/app/dashboard/Interfaces/mascota.interface';
import { CommonModule } from '@angular/common';
import { IonContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCardContent, IonCard } from "@ionic/angular/standalone";

@Component({
  selector: 'app-detalle-mascota',
  templateUrl: './detalle-mascota.component.html',
  styleUrls: ['./detalle-mascota.component.css'],
  standalone: true,
  imports: [IonCard, IonContent, CommonModule, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCardContent]
})
export class DetalleMascotaComponent implements OnInit {
  @Input() mascota!: Mascota;

  constructor() {}

  ngOnInit() {
  }

}
