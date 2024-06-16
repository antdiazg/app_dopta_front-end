import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRouterOutlet } from '@ionic/angular/standalone';
import { User, Persona, Organizacion } from '../../interface';
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
  personaForm!: FormGroup;
  organizacionForm!: FormGroup;
  persona!: Persona;
  organizacion!: Organizacion;
  imgPerfil: File | null = null;
  documento: File | null = null;


  constructor(
    private fb: FormBuilder,
    @Inject(Router) private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.initFormPersona();
    this.initFormOrganizacion();
    this.loadPersonaData();
    this.loadOrganizacionData();

    this.checkScreenWidth();
    window.addEventListener('resize', () => {
      this.checkScreenWidth();
    });
  }

  initFormPersona(): void {
    this.personaForm = this.fb.group({
      telefono: [''],
      direccion: [''],
      nombre: [''],
      apellido: [''],
      fec_nac: [''],
      //imagen_perfil: [''], //TODO:hay que ver como enviar el archivo
      //documento: [''],
    });
  }
  loadPersonaData(): void {
    this.authService.getProfile()
      .subscribe(user => {
        this.persona = user;
        this.personaForm.patchValue({
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

  initFormOrganizacion(): void {
    this.organizacionForm = this.fb.group({
      telefono: [''],
      telefono2: [''],
      direccion: [''],
      razon_social: [''],
      rut_emp: [''],
      //imagen_perfil: [''], //TODO:hay que ver como enviar el archivo
      //documento: [''],
    });
  }

  loadOrganizacionData(): void {
    this.authService.getProfile()
      .subscribe(user => {
        this.organizacion = user;
        this.organizacionForm.patchValue({
          telefono: user.telefono,
          telefono2: user.telefono2,
          direccion: user.direccion,
          razon_social: user.razon_social,
          rut_emp: user.rut_emp,
          //imagen_perfil: user.imagen_perfil,

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

  onSubmitPersona(): void {
    if (this.personaForm.valid) {
      const formData = new FormData();
      formData.append('telefono', this.personaForm.value.telefono);
      formData.append('direccion', this.personaForm.value.direccion);
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
  onSubmitOrganizacion(): void {
    if (this.organizacionForm.valid) {
      const formData = new FormData();
      formData.append('razon_social', this.organizacionForm.value.razon_social);
      formData.append('telefono', this.organizacionForm.value.telefono);
      formData.append('telefono2', this.organizacionForm.value.telefono2);
      formData.append('direccion', this.organizacionForm.value.direccion);
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
          console.log('Organización Actualizada correctamente :', response);
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
