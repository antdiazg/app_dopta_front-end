import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonItem, IonButton } from '@ionic/angular/standalone';
import { PublicationService } from 'src/app/shared/services/publication.service';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-crear-mascota',
  templateUrl: './crear-mascota.page.html',
  styleUrls: ['./crear-mascota.page.scss'],
  standalone: true,
  imports: [IonButton, IonItem, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule, IonicModule]
})
export class CrearMascotaPage {
  publicacionForm: FormGroup;
  selectedFile: File | null = null;
  isMobilView!: boolean;

  constructor(
    private fb: FormBuilder,
    private publicationService: PublicationService,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {
    this.publicacionForm = this.fb.group({
      titulo: ['', Validators.required],
      nom_mascota: ['', Validators.required],
      especie: ['', Validators.required],
      raza: ['', Validators.required],
      sexo: ['', Validators.required],
      tamanio: ['', Validators.required],
      edad: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.files) {
      this.selectedFile = input.files[0];
    }
  }

  async onSubmit() {
    if (this.publicacionForm.valid) {
      const loading = await this.loadingController.create({
        message: 'Guardando publicación...'
      });
      await loading.present();

      const formData = new FormData();
      Object.keys(this.publicacionForm.value).forEach(key => {
        formData.append(key, this.publicacionForm.value[key]);
      });
      if (this.selectedFile) {
        formData.append('foto_archivo', this.selectedFile);
      }

      this.publicationService.crearMascotaPublicacion(formData).subscribe({
        next: 
        async (res) => {
          console.log("mascota creada", {res});
          await loading.dismiss();
          const toast = await this.toastController.create({
            message: 'Publicación creada con éxito.',
            duration: 2000
          });
          toast.present();
        },
        
        error: async (err) => {
          console.log("error al crear mascota", err);
          await loading.dismiss();
          const toast = await this.toastController.create({
            message: 'Error al crear la publicación.',
            duration: 2000
          });
          toast.present();
        }
      });
    }
  }

  checkScreenWidth(): void {
    if (window.innerWidth <= 768) {
      this.isMobilView = true;
    } else {
      this.isMobilView = false;
    }
  }
}
