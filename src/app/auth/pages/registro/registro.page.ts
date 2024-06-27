import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginPage } from '../login/login.page';
import { RegistroPersona } from '../../interface/register-response.interface';
import { environment } from 'src/environments/environment';
import { Persona, User } from '../../interface';
import { AlertController } from '@ionic/angular';

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
    telefono: new FormControl<number>(9, [Validators.minLength(9)]),
    direccion: new FormControl<string>('', { nonNullable: true }),
    nombre: new FormControl<string>('', { nonNullable: true }),
    apellido: new FormControl<string>('', { nonNullable: true }),
    fec_nac: new FormControl<Date | null>(null, { nonNullable: true }),
  });
  registroError: string = '';
  isMobilView!: boolean;

  constructor(

    @Inject(Router) private router: Router,
    private authService:  AuthService,
    private alertController:  AlertController,
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
      window.location.href = `${environment.BASE_URL}/dashboard/`
    }
  }

  onSubmit(): void {

    if (this.formularioRegistro.invalid) return;
    console.log("Datos del formulario:", this.currentPerson);

    this.authService.addPerson(this.currentPerson)
      .subscribe({
        next: async (RegisterResponse) => {
          console.log('Registro successful!', RegisterResponse);
          await this.presentWelcomeAlert();
        },
        error: async (error) => {
          console.error('Registro error', error);
          if (error.status === 400){
            this.presentErrorAlert('El correo o usuario ya se encuentra registrado.');
            this.registroError = 'Registro invalido.';
          }else{
            this.presentErrorAlert('Error al registrar revise que los datos esten correctos.');
            this.registroError = 'Registro invalido.';
          }
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

  get telefono() {
    return this.formularioRegistro.get('telefono');
  }

  checkPasswords(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { notSame: true };
  }

  async presentWelcomeAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Registro Exitoso!',
      message: 'Se ha enviado un enlace de activación al correo registrado, por favor activa tu cuenta para poder iniciar sesión.',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            console.log('Alerta cerrada por el usuario.');
            this.navigateToHome(); // Redirigir después de cerrar la alerta
          }
        }
      ]
    });

    await alert.present();
    setTimeout(() => {
      alert.dismiss().then(() => {
        console.log('Alerta cerrada automáticamente.');
        this.navigateToHome(); // Redirigir después de cerrar automáticamente
      });
    }, 10000); // 5000 milisegundos = 5 segundos

  }

  async presentErrorAlert(message: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Error al registrar',
      message: message,
      buttons: ['OK']
    });

    await alert.present();

    // Cerrar la alerta automáticamente después de 5 segundos (ajusta el tiempo según tus necesidades)
    setTimeout(() => {
      alert.dismiss().then(() => {
        console.log('Alerta de error cerrada automáticamente.');
      });
    }, 10000); // 5000 milisegundos = 5 segundos
  }

  navigateToHome(): void {
    // Redirige a la página principal después de cerrar la alerta
    window.location.href = `${environment.BASE_URL}`;
    this.formularioRegistro.reset();
  }
}
