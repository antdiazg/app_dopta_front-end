import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonButton } from '@ionic/angular/standalone';
import { PublicationService } from 'src/app/shared/services/publication.service';
import { LoadingController, ToastController, IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-crear-evento',
  templateUrl: './crear-evento.page.html',
  styleUrls: ['./crear-evento.page.css'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, ReactiveFormsModule, IonicModule]
})
export class CrearEventoPage implements OnInit, OnDestroy {
  isMobileView = false;
  registroError = '';

  formularioEvento: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private publicationService: PublicationService,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {
    this.formularioEvento = this.formBuilder.group({
      titulo: ['', Validators.required],
      nombre: ['', Validators.required],
      localizacion: ['', Validators.required],
      fec_evento: ['', Validators.required],
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
    if (this.formularioEvento.invalid) {
      console.log('Formulario inválido:', this.formularioEvento);
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Guardando publicación...'
    });
    await loading.present();

    const formData = new FormData();
    Object.keys(this.formularioEvento.value).forEach(key => {
      formData.append(key, this.formularioEvento.value[key]);
    });

    this.publicationService.crearEventoPublicacion(formData).subscribe({
      next: async (res) => {
        console.log("Evento creado", res);
        await loading.dismiss();
        const toast = await this.toastController.create({
          message: 'Publicación creada con éxito.',
          duration: 2000
        });
        toast.present();
        this.formularioEvento.reset();
      },
      error: async (err) => {
        console.error("Error al crear la publicación.", err);
        await loading.dismiss();
        const toast = await this.toastController.create({
          message: "Error al crear la publicación.",
          duration: 2000
        });
        toast.present();
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
