import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AlertController } from '@ionic/angular';
import { environments } from 'src/environments/environment';

@Component({
  selector: 'app-recuperacion-contrasenia',
  templateUrl: './recuperacion-contrasenia.page.html',
  styleUrls: ['./recuperacion-contrasenia.page.css'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule]
})
export class RecuperacionContraseniaPage implements OnInit {

  recuperarContrasenia!: FormGroup;
  mensaje: string = '';
  isMobilView!     : boolean;

  constructor(
    public fb: FormBuilder,
    @Inject(Router) private router: Router,
    private authService: AuthService,
    private alertController: AlertController
    ) {


  }

  ngOnInit(): void {
      this.recuperarContrasenia = this.fb.group({
        email: ['', [Validators.required, Validators.email]],

      })

      this.checkScreenWidth();
      window.addEventListener('resize', () => {
        this.checkScreenWidth();
      });
  }

    onSubmit(): void {
    if (this.recuperarContrasenia.valid) {
      const email = this.recuperarContrasenia.get('email')?.value;
      this.authService.passRecovery(email)
        .subscribe({
        next: async (response) => {
          this.mensaje = 'Se ha enviado un enlace de recuperación a tu correo electrónico.';
          await this.presentWelcomeAlert();

        },
        error: async (error) => {
          this.mensaje = 'Error al enviar el correo de recuperación.';
          if (error.status === 500) {
            this.mensaje = 'El correo no existe en nuestra base de datos, o no es un correo valido';
            await this.presentErrorAlert(this.mensaje);
          }
        }
      });
    }
  }

  checkScreenWidth(){
    if (window.innerWidth <= 768) {
      this.isMobilView = true;
    } else{
      this.isMobilView = false;
    }
  }

    async presentWelcomeAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Recuperación Exitosa!',
      message: 'Se ha enviado un enlace de recuperación al correo registrado, por favor activa tu cuenta para poder iniciar sesión.',
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
      header: 'Error al recuperar contraseña',
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
    window.location.href = `${environments.BASE_URL}`;
    this.recuperarContrasenia.reset();
  }

}
