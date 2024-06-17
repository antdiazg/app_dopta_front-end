import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Team } from '../../Interfaces/team.interface';

@Component({
  selector: 'app-sobre-nosotros',
  templateUrl: './sobre-nosotros.page.html',
  styleUrls: ['./sobre-nosotros.page.css'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class SobreNosotrosPage implements OnInit {
isMobilView! :boolean;
appDoptaTeam :Team[] = [
  {
    nombre: "Jean Castro",
    usuario: "@jeancastro",
    cargo: "Desarrollador",
    foto: "../../../../assets/team/jean.jpeg",
    descripcion: "Desarrollador de software, apasionado por la tecnología y la innovación."
  },
  {
    nombre: "Antonio Diaz",
    usuario: "@antoniodiaz",
    cargo: "Desarrollador",
    foto: "../../../../assets/team/antonio.jpeg",
    descripcion: "Desarrollador de software, apasionado por la tecnología y la innovación."
  },
  {
    nombre: "Nicolas Espinoza",
    usuario: "@nicoespinoza",
    cargo: "Desarrollador",
    foto: "../../../../assets/team/nico.jpeg",
    descripcion: "Desarrollador de software, apasionado por la tecnología y la innovación."
  },
  {
    nombre: "Hugo Navarrete",
    usuario: "@pipedsl",
    cargo: "Desarrollador",
    foto: "../../../../assets/team/hugo.jpeg",
    descripcion: "Desarrollador de software, apasionado por la tecnología y la innovación."
  }

]

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
