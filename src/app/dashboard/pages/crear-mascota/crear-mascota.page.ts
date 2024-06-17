import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingController, ToastController, IonicModule } from '@ionic/angular';
import { PublicationService } from 'src/app/shared/services/publication.service'; // Ajusta la ruta según tu estructura de archivos
import { MascotaInput } from '../../Interfaces/mascota.interface'; // Ajusta la ruta según tu estructura de archivos
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle, IonItem, IonLabel, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-crear-mascota',
  templateUrl: './crear-mascota.page.html',
  styleUrls: ['./crear-mascota.page.scss'],
  standalone: true,
  imports: [IonButton, IonLabel, IonItem, IonicModule, IonCardSubtitle,
    IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonContent, IonHeader,
    IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule]
})
export class CrearMascotaPage implements OnInit, OnDestroy{
  selectedFile: File | null = null;
  isMobileView = false;
  registroError = '';

  formularioMascota: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private publicationService: PublicationService,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {
    this.formularioMascota = this.formBuilder.group({
      titulo: ['', Validators.required],
      nom_mascota: ['', Validators.required],
      especie: ['', Validators.required],
      raza: ['', Validators.required],
      sexo: ['H', Validators.required], // Valor por defecto 'H'
      tamanio: ['', Validators.required],
      edad: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.checkScreenWidth();
    window.addEventListener('resize', this.checkScreenWidth.bind(this));
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.checkScreenWidth.bind(this));
  }

  async onSubmit() {
    if (this.formularioMascota.invalid) {
      console.log('Formulario inválido:', this.formularioMascota);
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Guardando publicación...'
    });
    await loading.present();

    const formData = new FormData();
    Object.keys(this.formularioMascota.value).forEach(key => {
      formData.append(key, this.formularioMascota.value[key]);
    });
    if (this.selectedFile) {
      formData.append('foto_archivo', this.selectedFile);
    }

    this.publicationService.crearMascotaPublicacion(formData).subscribe({
      next: async (res) => {
        console.log("Mascota creada", res);
        await loading.dismiss();
        const toast = await this.toastController.create({
          message: 'Publicación creada con éxito.',
          duration: 2000
        });
        toast.present();
        this.formularioMascota.reset();
      },
      error: async (err) => {
        console.error("Error al crear la mascota", err);
        await loading.dismiss();
        const toast = await this.toastController.create({
          message: 'Error al crear la publicación.',
          duration: 2000
        });
        toast.present();
      }
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.files) {
      this.selectedFile = input.files[0];
    }
  }

  checkScreenWidth(): void {
    this.isMobileView = window.innerWidth <= 768;
  }
}
