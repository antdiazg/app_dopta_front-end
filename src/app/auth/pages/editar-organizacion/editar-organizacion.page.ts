import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Organizacion } from '../../interface';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-editar-organizacion',
  templateUrl: './editar-organizacion.page.html',
  styleUrls: ['./editar-organizacion.page.css'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,ReactiveFormsModule]
})
export class EditarOrganizacionPage implements OnInit {
isMobilView!: boolean;
  organizacionForm!: FormGroup;
  user!: Organizacion;
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
    this.organizacionForm = this.fb.group({
      telefono: [''],
      direccion: [''],
      razon_social: [''],
      numrut_org: [''],
      dv: [''],
      telefono2: [''],
      //imagen_perfil: [''], //TODO:hay que ver como enviar el archivo
      //documento: [''],
    });
  }

  loadUserData(): void {
    this.authService.getProfile()
      .subscribe(user => {
        this.user = user;
        this.organizacionForm.patchValue({
          telefono: user.telefono,
          direccion: user.direccion,
          razon_social: user.razon_social,
          numrut_org: user.numrut_org,
          dv: user.dv,
          telefono2: user.telefono2,
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
    if (this.organizacionForm.valid) {
      const formData = new FormData();
      formData.append('telefono', this.organizacionForm.value.telefono);
      formData.append('telefono2', this.organizacionForm.value.telefono2);
      formData.append('direccion', this.organizacionForm.value.direccion);
      formData.append('razon_social', this.organizacionForm.value.razon_social);
      // formData.append('nombre', this.userForm.value.nombre);
      // formData.append('apellido', this.userForm.value.apellido);

      if (this.imgPerfil) {
        formData.append('imagen_perfil', this.imgPerfil);
      }

      this.authService.updateOrganizacion(formData)
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

