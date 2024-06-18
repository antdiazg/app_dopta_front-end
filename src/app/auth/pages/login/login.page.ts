import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { environments } from 'src/environments/environment';
import { CommonModule } from '@angular/common';
import { IonContent, IonButton, IonHeader, IonTitle, IonToolbar, IonCard, IonLabel, IonItem, IonInput, IonRouterOutlet } from '@ionic/angular/standalone';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { RegistroPage } from '../registro/registro.page';
import { IonicModule } from '@ionic/angular';
import { LoginResponse } from '../../interface/login-response.interface';

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
    IonButton,
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RegistroPage,
  ],
  providers: [
  ]
})
export class LoginPage implements OnInit {

  formularioLogin!: FormGroup;
  loginError: string = '';
  isMobilView!: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private alertController: AlertController
  ) { }

  ngOnInit(): void {
    this.formularioLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    if (this.authService.isAuthenticated()) {
      window.location.href = `${environments.BASE_URL}/dashboard/`
    }

    this.checkScreenWidth();
    window.addEventListener('resize', () => {
      this.checkScreenWidth();
    });
  }

  async onSubmit(): Promise<void> {
    if (this.formularioLogin.invalid) {
      return;
    }

    const { email, password } = this.formularioLogin.value;

    this.authService.login(email, password)
      .subscribe({
        next: async (loginResponse) => {
          console.log('Login successful!', { loginResponse });
          await this.presentWelcomeAlert();
          // No redirige de inmediato, espera la interacción del usuario o el cierre automático de la alerta
        },
        error: async (error) => {
          console.error('Login error:', error);
          if (error.status === 403 && error.error && error.error.error === 'La cuenta está desactivada, se reenviara un correo con el nuevo link de actualizacion') {
            await this.presentErrorAlert('La cuenta está desactivada. Se ha enviado un correo con un nuevo enlace de activación.');
          } else {
            await this.presentErrorAlert('Error al iniciar sesión. Por favor, verifica tus credenciales e intenta nuevamente.');
          }
        }
      });
  }


  async presentWelcomeAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: '¡Bienvenido!',
      message: 'Has iniciado sesión exitosamente.',
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
    }, 3000); // 5000 milisegundos = 5 segundos

  }

  async presentErrorAlert(message: string): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Error al iniciar sesión',
      message: message,
      buttons: ['OK']
    });

    await alert.present();

    // Cerrar la alerta automáticamente después de 5 segundos (ajusta el tiempo según tus necesidades)
    setTimeout(() => {
      alert.dismiss().then(() => {
        console.log('Alerta de error cerrada automáticamente.');
      });
    }, 5000); // 5000 milisegundos = 5 segundos
  }


  navigateToHome(): void {
    // Redirige a la página principal después de cerrar la alerta
    window.location.href = `${environments.BASE_URL}`;
    this.formularioLogin.reset();
  }

  checkScreenWidth(): void {
    this.isMobilView = window.innerWidth <= 768;
  }

}
