import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import {
  FormGroup,

  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginPage } from '../login/login.page';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.css'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    ReactiveFormsModule, LoginPage]
})
export class RegistroPage implements OnInit{

  formularioRegistro! : FormGroup;
  registroError: string = '';
  isMobilView!     : boolean;

  constructor(
    private fb: FormBuilder,
    @Inject(Router) private router: Router,
    private authService: AuthService
    ) {}


  ngOnInit(): void {
    this.formularioRegistro = this.fb.group({
      username: ['',Validators.required],
      password: ['',Validators.required],
      // confirmPassword: ['',Validators.required],
      email: ['',Validators.required],
      telefono: ['',Validators.required],
      direccion: ['',Validators.required],
      nombre: ['',Validators.required],
      apellido: ['',Validators.required],
      // 'fechaNacimiento': new FormControl("",Validators.required), //TODO: hay que agregarlo en el backend o hacer validacion
    })


      this.checkScreenWidth();
      window.addEventListener('resize', () => {
        this.checkScreenWidth();
      });
  }

  onSubmit(): void{
    if (this.formularioRegistro.invalid){
      return
    }

    const { username, password, email, telefono, direccion, nombre, apellido } = this.formularioRegistro.value;

    this.authService.register( username, password, email, telefono, direccion, nombre, apellido)
      .subscribe({
        next: (registroResponse) => {
          console.log('Registro Successful!', registroResponse);
          this.router.navigate(['/login']);
          this.formularioRegistro.reset();
        },
        error: (error) => {
          console.error('Registro error:', error);

        }
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
