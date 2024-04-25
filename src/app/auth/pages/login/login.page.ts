import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonLabel, IonItem, IonInput, IonRouterOutlet } from '@ionic/angular/standalone';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { RegistroPage } from '../registro/registro.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css'],
  standalone: true,
  imports: [
    IonRouterOutlet,
    IonInput,
    IonItem,
    IonLabel,
    IonCard,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RegistroPage
    ]
})
export class LoginPage  {

  formularioLogin: FormGroup;

  constructor(public fb: FormBuilder) {
    this.formularioLogin = this.fb.group({
      'correo': new FormControl("",Validators.required),
      'password': new FormControl("",Validators.required),

    })
  }



}
