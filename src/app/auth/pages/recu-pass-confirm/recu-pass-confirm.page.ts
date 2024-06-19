import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController, IonicModule } from '@ionic/angular';
import { environments } from 'src/environments/environment';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-recu-pass-confirm',
  templateUrl: './recu-pass-confirm.page.html',
  styleUrls: ['./recu-pass-confirm.page.css'],
  standalone: true,
  imports: [IonContent, IonicModule, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule]
})
export class RecuPassConfirmPage implements OnInit {
  resetPasswordForm: FormGroup;
  email: string = '';
  token: string = '';
  isMobilView!: boolean;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private alertController: AlertController
  ) {

    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmNewPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'];
      this.token = params['token'];
    });

    this.resetPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmNewPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });

    this.checkScreenWidth();
    window.addEventListener('resize', () => {
      this.checkScreenWidth();
    });
  }
  checkScreenWidth() {
    if (window.innerWidth <= 768) {
      this.isMobilView = true;
    } else {
      this.isMobilView = false;
    }
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('newPassword')?.value === form.get('confirmNewPassword')?.value
      ? null : { 'mismatch': true };
  }

  async onSubmit() {
    if (this.resetPasswordForm.valid) {
      const formData = this.resetPasswordForm.value;
      const data = {
        email: this.email,
        token: this.token,
        new_password: formData.newPassword,
        confirm_new_password: formData.confirmNewPassword,
      };

      this.http.post(`${environments.URL_USER}user/recuperar-confirmacion/`, data)
        .subscribe({
          next: async (response) => {
            await this.CambioAlerta();

          },
          error: async (error) => {
            const alert = await this.alertController.create({
              header: 'Error',
              message: 'Hubo un problema al restablecer tu contraseña. Por favor, inténtalo de nuevo.',
              buttons: ['OK']
            });
            await alert.present();
          }
        });
    }
  }

  async CambioAlerta(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Contraseña restablecida',
      message: 'Tu contraseña se ha restablecido correctamente.',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            console.log('Alerta cerrada por el usuario.');
            this.redirectToLogin();
          }
        }
      ]
    });

    await alert.present();
    setTimeout(() => {
      alert.dismiss().then(() => {
        console.log('Alerta cerrada automáticamente.');
        this.redirectToLogin();
      });
    }, 3000); // 5000 milisegundos = 5 segundos

  }

  redirectToLogin() {
    console.log('redireccionando');
    window.location.href = `${environments.BASE_URL}/auth/`;
  }
}
