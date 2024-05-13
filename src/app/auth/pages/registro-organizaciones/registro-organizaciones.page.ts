import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-registro-organizaciones',
  templateUrl: './registro-organizaciones.page.html',
  styleUrls: ['./registro-organizaciones.page.css'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule]
})
export class RegistroOrganizacionesPage implements OnInit {

  formularioRegistro : FormGroup;
  isMobilView!     : boolean;

  constructor(public fb: FormBuilder) {
    this.formularioRegistro = this.fb.group({
      'username': new FormControl("",Validators.required),
      'password': new FormControl("",Validators.required),
      'confirmPassword': new FormControl("",Validators.required),
      'email': new FormControl("",Validators.required),
      'telefono': new FormControl("",Validators.required),
      'direccion': new FormControl("",Validators.required),
    }, {
      validator: this.checkPasswords
    })

  }


  ngOnInit(): void {
      this.checkScreenWidth();
      window.addEventListener('resize', () => {
        this.checkScreenWidth();
      });
  }

  checkScreenWidth(){
    if (window.innerWidth <= 768) {
      this.isMobilView = true;
    } else{
      this.isMobilView = false;
    }
  }

  checkPasswords(group: FormGroup){
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password === confirmPassword ? null : {notSame: true};
  }
}
