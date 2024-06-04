import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
    private authService: AuthService
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
      this.authService.passRecovery(email).subscribe({
        next: (response) => {
          this.mensaje = 'Se ha enviado un enlace de recuperación a tu correo electrónico.';
          console.log(response);
        },
        error: (error) => {
          this.mensaje = 'Error al enviar el correo de recuperación.';
          console.error(error);
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

}
