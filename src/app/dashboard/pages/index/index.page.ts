import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { ToolbarComponent } from 'src/app/shared/components/toolbar/toolbar.component';
import { EventosPage } from '../eventos/eventos.page';
import { RouterOutlet } from '@angular/router';
import { AdoptarPage } from '../adoptar/adoptar.page';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  standalone: true,
  imports: [
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonicModule,
    ToolbarComponent,
    RouterOutlet,
    EventosPage,
    AdoptarPage

    ]
})
export class IndexPage  {

  constructor() { }



}
