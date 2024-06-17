import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { environments } from 'src/environments/environment';
import { Organizacion } from '../../interface';


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
    telefono: new FormControl<number>(0, { nonNullable: true }),
    direccion: new FormControl<string>('', { nonNullable: true }),
    numrut_org: new FormControl<number>(0, { nonNullable: true }),
    dv: new FormControl<string>('', { nonNullable: true }),
    razon_social: new FormControl<string>('', { nonNullable: true }),
    telefono2: new FormControl<number>(0, { nonNullable: true }),
  });
  registroError: string = '';
  isMobilView!: boolean;

  constructor(
    @Inject(Router) private router: Router,
    private authService: AuthService
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
  }

  onSubmit(): void {

    if (this.formularioRegistro.invalid) return;
    console.log("Datos del formulario:", this.currentOrganization);

    this.authService.addOrganization(this.currentOrganization)
      .subscribe({
        next: (RegisterResponse) => {
          console.log('Registro succesful!', RegisterResponse);
          window.location.href = `${environments.BASE_URL}/auth/login/`
          this.formularioRegistro.reset();
        },
        error: (error) => {
          console.error('Error al registrar la organización', error);
          this.registroError = 'Registro organización invalido';
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
