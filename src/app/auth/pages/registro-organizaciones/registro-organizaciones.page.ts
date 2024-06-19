import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { environments } from 'src/environments/environment';
import { Organizacion } from '../../interface';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-registro-organizaciones',
  templateUrl: './registro-organizaciones.page.html',
  styleUrls: ['./registro-organizaciones.page.css'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule]
})
export class RegistroOrganizacionesPage implements OnInit {


  public formularioRegistro = new FormGroup({
    username: new FormControl<string>('', { nonNullable: true }),
    password: new FormControl<string>('', { nonNullable: true }),
    email: new FormControl<string>('', { nonNullable: true }),
    telefono: new FormControl<number>(9, [Validators.minLength(9)]),
    direccion: new FormControl<string>('', { nonNullable: true }),
    numrut_org: new FormControl<number>(0, { nonNullable: true }),
    dv: new FormControl<string>('', { nonNullable: true }),
    razon_social: new FormControl<string>('', { nonNullable: true }),
    telefono2: new FormControl<number>(9, [Validators.minLength(9)]),
  });
  registroError: string = '';
  isMobilView!: boolean;

  constructor(
    @Inject(Router) private router: Router,
    private authService: AuthService,
    private alertController: AlertController,
  ) { }

  get currentOrganization(): Organizacion {
  return {
    user: {
      username: this.formularioRegistro.get('username')?.value ?? '',
      email: this.formularioRegistro.get('email')?.value ?? '',
      password: this.formularioRegistro.get('password')?.value ?? '',
      is_persona: false,
      is_organizacion: true,
      is_staff: false
    },
    telefono: this.formularioRegistro.get('telefono')?.value ?? 0,
    direccion: this.formularioRegistro.get('direccion')?.value ?? '',
    dv: this.formularioRegistro.get('dv')?.value ?? '',
    numrut_org: this.formularioRegistro.get('numrut_org')?.value ?? 0,
    razon_social: this.formularioRegistro.get('razon_social')?.value ?? '',
    telefono2: this.formularioRegistro.get('telefono2')?.value ?? 0,
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
    console.log("Datos del formulario:", this.currentOrganization);

    this.authService.addOrganization(this.currentOrganization)
      .subscribe({
        next: async (RegisterResponse) => {
          console.log('Registro succesful!', RegisterResponse);
          await this.presentWelcomeAlert();
        },
        error: async (error) => {
          console.error('Registro error', error);
          if (error.status === 400) {
            this.presentErrorAlert('El correo o usuario ya se encuentra registrado.');
            this.registroError = 'Registro organización invalido';
          }else{
            this.presentErrorAlert('Error al registrar la organización.');
            this.registroError = 'Registro organización invalido';
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
    window.location.href = `${environments.BASE_URL}`;
    this.formularioRegistro.reset();
  }
}
