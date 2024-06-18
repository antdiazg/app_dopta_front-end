import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginPage } from '../login/login.page';
import { RegistroPersona } from '../../interface/register-response.interface';
import { environments } from 'src/environments/environment';
import { Persona, User } from '../../interface';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.css'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    ReactiveFormsModule, LoginPage]
})
export class RegistroPage implements OnInit {

  public formularioRegistro = new FormGroup({
    username: new FormControl<string>('', { nonNullable: true }),
    email: new FormControl<string>('', { nonNullable: true }),
    password: new FormControl<string>('', { nonNullable: true }),
    // confirmPassword: new FormControl('', { nonNullable: true}),
    telefono: new FormControl<number>(0, { nonNullable: true }),
    direccion: new FormControl<string>('', { nonNullable: true }),
    nombre: new FormControl<string>('', { nonNullable: true }),
    apellido: new FormControl<string>('', { nonNullable: true }),
    fec_nac: new FormControl<Date | null>(null, { nonNullable: true }),
  });
  registroError: string = '';
  isMobilView!: boolean;

  constructor(

    @Inject(Router) private router: Router,
    private authService: AuthService
  ) { }

  get currentPerson(): Omit<Persona, 'id' | 'user.id' | 'user.is_persona' | 'user.is_organizacion' | 'user.is_staff' | 'imagen_perfil' | 'documento'> {
    const user: Omit<User, 'id' | 'is_persona' | 'is_organizacion' | 'is_staff'> = {
      username: this.formularioRegistro.get('username')!.value!,
      email: this.formularioRegistro.get('email')!.value!,
      password: this.formularioRegistro.get('password')!.value!,
    };

    return {
      user: user as User,
      telefono: this.formularioRegistro.get('telefono')!.value!,
      direccion: this.formularioRegistro.get('direccion')!.value!,
      nombre: this.formularioRegistro.get('nombre')!.value!,
      apellido: this.formularioRegistro.get('apellido')!.value!,
      fec_nac: this.formularioRegistro.get('fec_nac')!.value as Date,
    };
  }


  ngOnInit(): void {
    this.checkScreenWidth();
    window.addEventListener('resize', () => {
      this.checkScreenWidth();
    });
    if (this.authService.isAuthenticated()) {
      window.location.href = `${environments.BASE_URL}/dashboard/` 
    }
  }

  onSubmit(): void {

    if (this.formularioRegistro.invalid) return;
    console.log("Datos del formulario:", this.currentPerson);
 
    this.authService.addPerson(this.currentPerson)
      .subscribe({
        next: (RegisterResponse) => {
          console.log('Registro successful!', RegisterResponse);
          window.location.href = `${environments.BASE_URL}/auth/login/`
          this.formularioRegistro.reset();
        },
        error: (error) => {
          console.error('Registro error', error);
          this.registroError = 'Registro invalido.';
        }

      })

  }


  checkScreenWidth() {
    if (window.innerWidth <= 768) {
      this.isMobilView = true;
    } else {
      this.isMobilView = false;
    }
  }

  checkPasswords(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { notSame: true };
  }

}
