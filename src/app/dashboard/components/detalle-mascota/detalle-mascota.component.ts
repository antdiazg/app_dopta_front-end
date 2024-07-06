import { Component, Input, OnInit } from '@angular/core';
import { ModalController, } from '@ionic/angular';
import { Mascota } from 'src/app/dashboard/Interfaces/mascota.interface';
import { CommonModule } from '@angular/common';
import { IonContent, IonButton, IonButtons, IonIcon, IonToolbar, IonHeader, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCardContent, IonCard, IonTitle } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';

@Component({
  selector: 'app-detalle-mascota',
  templateUrl: './detalle-mascota.component.html',
  styleUrls: ['./detalle-mascota.component.css'],
  standalone: true,
  imports: [IonTitle,
    CommonModule,
    IonCard,
    IonContent,
    IonCardSubtitle,
    IonCardTitle,
    IonCardHeader,
    IonCardContent,
    IonButton,
    IonButtons,
    IonIcon,
    IonToolbar,
    IonHeader
  ]
})
export class DetalleMascotaComponent implements OnInit {
  @Input() mascota!: Mascota;

  constructor(private modalCtrl: ModalController) {
    addIcons({
      'close': close,
    });
  }

  ngOnInit() { }

  cerrarModal() {
    this.modalCtrl.dismiss();
  }
}
