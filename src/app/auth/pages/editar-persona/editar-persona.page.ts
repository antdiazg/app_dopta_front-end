import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRouterOutlet } from '@ionic/angular/standalone';
import { User, Persona } from '../../interface';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { environments } from 'src/environments/environment';

@Component({
  selector: 'app-editar-persona',
  templateUrl: './editar-persona.page.html',
  styleUrls: ['./editar-persona.page.css'],
  standalone: true,
  imports: [IonRouterOutlet, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule]
})
export class EditarPersonaPage implements OnInit {
  isMobilView!: boolean;
  userForm!: FormGroup;
  user!: Persona;
  imgPerfil: File | null = null;
  documento: File | null = null;

  constructor(
    private fb: FormBuilder,
    @Inject(Router) private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadUserData();

    this.checkScreenWidth();
    window.addEventListener('resize', () => {
      this.checkScreenWidth();
    });
  }

  initForm(): void {
    this.userForm = this.fb.group({
      telefono: [''],
      direccion: [''],
      nombre: [''],
      apellido: [''],
      fec_nac: [''],
      //imagen_perfil: [''], //TODO:hay que ver como enviar el archivo
      //documento: [''],
    });
  }

  loadUserData(): void {
    this.authService.getProfile()
      .subscribe(user => {
        this.user = user;
        this.userForm.patchValue({
          telefono: user.telefono,
          direccion: user.direccion,
          nombre: user.nombre,
          apellido: user.apellido,
          fec_nac: user.fec_nac,
          //imagen_perfil: user.imagen_perfil,
          //documento: user.documento,
        });
      })
  }

  onImgSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.imgPerfil = target.files[0];
    }
  }
  onDocumentSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.documento = target.files[0];
    }
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const formData = new FormData();
      formData.append('telefono', this.userForm.value.telefono);
      formData.append('direccion', this.userForm.value.direccion);
      // formData.append('nombre', this.userForm.value.nombre);
      // formData.append('apellido', this.userForm.value.apellido);

      if (this.imgPerfil) {
        formData.append('imagen_perfil', this.imgPerfil);
      }
      if (this.documento) {
        formData.append('documento', this.documento);
      }
      this.authService.updateUser(formData)
        .subscribe(response => {
          console.log('Persona Actualizada correctamente :', response);
          setTimeout(() => {
            window.location.reload();
          }, 4000);
        });

    }

  }

  volver():void {
    window.location.reload();
  }
  checkScreenWidth(): void {
    if (window.innerWidth <= 768) {
      this.isMobilView = true;
    } else {
      this.isMobilView = false;
    }
  }
}
