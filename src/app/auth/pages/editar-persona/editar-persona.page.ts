import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { User } from '../../interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-editar-persona',
  templateUrl: './editar-persona.page.html',
  styleUrls: ['./editar-persona.page.css'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule]
})
export class EditarPersonaPage implements OnInit {
  isMobilView! :boolean;
  userForm!: FormGroup;
  user!: User;

  constructor(
    private fb: FormBuilder,
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

  initForm(): void{
    this.userForm = this.fb.group({
      telefono: [''],
      direccion: [''],
      nombre: [''],
      apellido: [''],
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
          //imagen_perfil: user.imagen_perfil,
          //documento: user.documento,
        });
      })
  }

  onSubmit(): void{
    if(this.userForm.valid){
      this.authService.updateUser(this.userForm.value)
        .subscribe(response => {
          console.log('Persona Actualizada correctamente :', response);
          });
    }
  }

  checkScreenWidth(): void{
    if (window.innerWidth <= 768) {
      this.isMobilView = true;
    } else{
      this.isMobilView = false;
    }
  }

}
