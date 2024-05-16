import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginPage } from '../login/login.page';
import { User } from '../../interface';

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
      id: new FormControl<string>(''),
      username: new FormControl<string>('', { nonNullable: true}),
      password: new FormControl<string>('', { nonNullable: true}),
      // confirmPassword: new FormControl('', { nonNullable: true}),
      email: new FormControl<string>('', { nonNullable: true}),
      telefono: new FormControl<number>(0, { nonNullable: true}),
      direccion: new FormControl<string>('', { nonNullable: true}),
      nombre: new FormControl<string>('', { nonNullable: true}),
      apellido: new FormControl<string>('', { nonNullable: true}),
      isActive: new FormControl<boolean>(false),
      isStaff: new FormControl<boolean>(false),
      // 'fechaNacimiento': new FormControl("",Validators.required), //TODO: hay que agregarlo en el backend o hacer validacion
  });
  registroError: string = '';
  isMobilView!     : boolean;

  constructor(
    @Inject(Router) private router: Router,
    private authService: AuthService
    ) {}

  get currentUser(): User{
    const user = this.formularioRegistro.value as User;

    return user;
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

    if ( this.formularioRegistro.invalid) return;

    if ( this.currentUser.id ){
      console.log("Ya existe el usuario");
      console.error("Usuario existe en la base de datos");
      return;
    }

    this.authService.addUser( this.currentUser )
      .subscribe( user => {
        console.log("Usuario creado en la base de datos!!");
      })


  }

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
