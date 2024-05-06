import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.css'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    ReactiveFormsModule,]
})
export class RegistroPage implements OnInit{

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
      'nombre': new FormControl("",Validators.required),
      'apellido': new FormControl("",Validators.required),
      'fechaNacimiento': new FormControl("",Validators.required),
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
