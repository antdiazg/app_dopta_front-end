import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, IonTextarea, AlertController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonTextarea
  ]
})
export class ContactoPage implements OnInit {
  isMobilView!: boolean;
  contactForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private alertController: AlertController) { }

  ngOnInit() {
    this.checkScreenWidth();
    window.addEventListener('resize', () => {
      this.checkScreenWidth();
    });

    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  checkScreenWidth(): void {
    this.isMobilView = window.innerWidth <= 768;
  }

  async onSubmit() {
    if (this.contactForm.valid) {
      const alert = await this.alertController.create({
        header: 'Formulario Enviado',
        message: 'Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.',
        buttons: ['OK']
      });
      await alert.present();
      this.contactForm.reset();
    }
  }
}
