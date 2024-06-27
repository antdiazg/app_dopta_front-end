import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { PublicationService } from 'src/app/shared/services/publication.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-crear-servicio',
  templateUrl: './crear-servicio.page.html',
  styleUrls: ['./crear-servicio.page.css'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule]
})
export class CrearServicioPage implements OnInit, OnDestroy {
  isMobileView!: boolean;
  registroError = '';

  formularioServicio: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private publicationService: PublicationService,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {
    this.formularioServicio = this.formBuilder.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      tipo_servicio: ['', Validators.required],
      ubicacion: ['', Validators.required]
    });
  }



  ngOnInit() {
    this.checkScreenWidth();
    window.addEventListener('resize', this.checkScreenWidth.bind(this));
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.checkScreenWidth.bind(this));
  }

async onSubmit(){
    if (this.formularioServicio.invalid) {
      console.log('Formulario inválido:', this.formularioServicio);
      const missingFields = Object.keys(this.formularioServicio.controls).filter(field => this.formularioServicio.get(field)?.invalid);
      if (missingFields.length > 0) {
        this.registroError = `El campo(s) ${missingFields.join(', ')} es requerido(s)`;
      } else {
        this.registroError = 'El formulario es inválido';
      }
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Guardando publicación...'
    });
    await loading.present();

    const formData = new FormData();
    Object.keys(this.formularioServicio.value).forEach(key => {
      formData.append(key, this.formularioServicio.value[key]);
    });

    this.publicationService.crearServicioPublicacion(formData).subscribe({
      next: async (res) => {
        console.log("Servicio creado", res);
        await loading.dismiss();
        const toast = await this.toastController.create({
          message: 'Servicio creado con éxito',
          duration: 2000
        });
        await toast.present();
        this.formularioServicio.reset();
      },
      error: async (err) => {
        console.error("Error al crear la publicación", err);
        await loading.dismiss();
        const toast = await this.toastController.create({
          message: 'Error al crear la publicación',
          duration: 2000
        });
        await toast.present();
      }
    });
  }

  checkScreenWidth(): void {
    if (window.innerWidth <= 768) {
      this.isMobileView = true;
    } else {
      this.isMobileView = false;
    }
  }

}
