import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginPage } from '../login/login.page';
import { RegistroPersona } from '../../interface/register-response.interface';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.css'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    ReactiveFormsModule, LoginPage]
})
export class RegistroPage implements OnInit{

  public formularioRegistro = new FormGroup({
      username: new FormControl<string>('', { nonNullable: true}),
      password: new FormControl<string>('', { nonNullable: true}),
      // confirmPassword: new FormControl('', { nonNullable: true}),
      email: new FormControl<string>('', { nonNullable: true}),
      telefono: new FormControl<number>(0, { nonNullable: true}),
      direccion: new FormControl<string>('', { nonNullable: true}),
      nombre: new FormControl<string>('', { nonNullable: true}),
      apellido: new FormControl<string>('', { nonNullable: true}),
      // 'fechaNacimiento': new FormControl("",Validators.required), //TODO: hay que agregarlo en el backend o hacer validacion
  });
  registroError: string = '';
  isMobilView!     : boolean;

  constructor(
    @Inject(Router) private router: Router,
    private authService: AuthService
    ) {}

  get currentPerson(): RegistroPersona{
    return {
    user: {
      username: this.formularioRegistro.get('username')!.value!,
      email: this.formularioRegistro.get('email')!.value!,
      password: this.formularioRegistro.get('password')!.value!
    },
    telefono: this.formularioRegistro.get('telefono')!.value!,
    direccion: this.formularioRegistro.get('direccion')!.value!,
    nombre: this.formularioRegistro.get('nombre')!.value!,
    apellido: this.formularioRegistro.get('apellido')!.value!
  };
  }


  ngOnInit(): void {
    // this.formularioRegistro = this.fb.group({
    //   username: ['',Validators.required],
    //   password: ['',Validators.required],
    //   // confirmPassword: ['',Validators.required],
    //   email: ['',Validators.required],
    //   telefono: ['',Validators.required],
    //   direccion: ['',Validators.required],
    //   nombre: ['',Validators.required],
    //   apellido: ['',Validators.required],
    //   // 'fechaNacimiento': new FormControl("",Validators.required), //TODO: hay que agregarlo en el backend o hacer validacion
    // })


      this.checkScreenWidth();
      window.addEventListener('resize', () => {
        this.checkScreenWidth();
      });
  }

  onSubmit(): void{

    if ( this.formularioRegistro.invalid ) return;
    console.log("Datos del formulario:", this.currentPerson);
    // if ( this.currentPerson.user.email ){
    //   console.log("Ya existe el usuario");
    //   console.error("Usuario existe en la base de datos");
    //   return;
    // }

    this.authService.addPerson( this.currentPerson )
      .subscribe({
        next: (RegisterResponse) => {
          console.log('Registro successful!', RegisterResponse);
          this.router.navigateByUrl('/auth/login/');
          this.formularioRegistro.reset();
        },
        error: (error) => {
          console.error('Registro error', error);
          this.registroError = 'Registro invalido.';
        }

      })

  }

    // onSubmit(): void{

  //   if ( this.formularioRegistro.invalid) return;
  //   console.log("Datos del formulario:", this.currentPerson);

  //   this.authService.personExists(this.currentPerson.user.email)
  //     .subscribe({
  //       next: exists => {
  //         if ( exists ) {
  //           console.log("Ya existe el usuario");
  //           console.error("Usuario existe en la base de datos");
  //           this.registroError = "Usuario ya existe en la base de datos";
  //         }else {
  //           this.authService.addPerson(this.currentPerson)
  //             .subscribe({
  //               next: persona => {
  //                 console.log("Persona creada en la base de datos!!");
  //                 this.router.navigate(['/login']);
  //               },
  //               error: err => {
  //                 console.error("Error al crear la persona", err);
  //                 this.registroError = 'Error al crear la persona';
  //               }
  //             });
  //         }
  //       },
  //       error: err => {
  //         console.error("Error al verificar el usuario", err);
  //         this.registroError = 'Error al verificar el usuario';
  //       }
  //     });
  // }

  checkScreenWidth(){
    if (window.innerWidth <= 768) {
      this.isMobilView = true;
    } else{
      this.isMobilView = false;
    }
  }

  checkPasswords(group: FormGroup){
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password === confirmPassword ? null : {notSame: true};
  }

}
