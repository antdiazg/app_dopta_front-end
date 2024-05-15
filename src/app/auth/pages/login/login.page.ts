import { Component, OnInit, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonLabel, IonItem, IonInput, IonRouterOutlet } from '@ionic/angular/standalone';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { RegistroPage } from '../registro/registro.page';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthStatus } from '../../enums/auth-status.enum';
import { swalCustomError } from 'src/app/shared/helpers/swal-custom.helper';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css'],
  standalone: true,
  imports: [
    IonRouterOutlet,
    IonInput,
    IonItem,
    IonLabel,
    IonCard,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RegistroPage
    ]
})
export class LoginPage implements OnInit {

  private router: Router              = inject( Router );
  private fb: FormBuilder             = inject( FormBuilder );
  private authService: AuthService    = inject( AuthService );

  public dashboardIndex: string = '/index'; // TODO: crear pagina index con navegador para los usuarios guest.
  public status                 = computed( () => this.authService.authStatus() ); // TODO: debo arreglar el auth.service
  public authStatus             = computed( () => AuthStatus.authenticated );


  isMobilView!     : boolean;


    formularioLogin: FormGroup = this.fb.group({
      correo: ["",[Validators.required]],
      password: ["",[Validators.required]],

    });


  login(): void{
    if( this.formularioLogin.invalid) {
      this.formularioLogin.markAllAsTouched();
      return

    };

    const { correo, password } = this.formularioLogin.value;


    this.authService.login( correo, password )
      .subscribe({
        next : () => this.router.navigateByUrl( this.dashboardIndex ),
        error: ( error ) => {
          swalCustomError( 'Error', error );
        }
      })
  }


  //! de aqui para abajo es funcionalidad del cambio de tamaño de la pantalla.
  ngOnInit(): void {
      this.checkScreenWidth();
      window.addEventListener('resize', () => {
        this.checkScreenWidth();
      });
  }

  checkScreenWidth(){
    if (window.innerWidth <= 768) {
      this.isMobilView = true;
    } else{
      this.isMobilView = false;
    }
  }

}
