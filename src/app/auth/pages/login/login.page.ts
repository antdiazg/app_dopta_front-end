import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent,IonButton, IonHeader, IonTitle, IonToolbar, IonCard, IonLabel, IonItem, IonInput, IonRouterOutlet } from '@ionic/angular/standalone';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  FormGroup,

  Validators,
  FormBuilder,
} from '@angular/forms';
import { RegistroPage } from '../registro/registro.page';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { IonicModule } from '@ionic/angular';
import { LoginResponse } from '../../interface/login-response.interface';


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
    IonButton,
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RegistroPage,
    ],
    providers: [
    ]
})
export class LoginPage implements OnInit {

  formularioLogin!: FormGroup;
  loginError: string = '';
  isMobilView! :boolean;
  private tokenKey = 'authToken';

  constructor(
    private fb: FormBuilder,
    @Inject(Router) private router: Router,
    private authService: AuthService
  ){}


  ngOnInit(): void {
      this.formularioLogin = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      })

      this.checkScreenWidth();
      window.addEventListener('resize', () => {
        this.checkScreenWidth();
      });
  }

  onSubmit(): void {
    if (this.formularioLogin.invalid){
      return
    }

    const { email, password } = this.formularioLogin.value;

    this.authService.login(email, password) // Call AuthService login method
    .subscribe({
      next: (loginResponse) => {
        console.log('Login successful!', {loginResponse});
        
        //this.authService.setToken(loginResponse.token);
        this.router.navigateByUrl('/'); // Replace with your desired route
        this.formularioLogin.reset(); // Reset form after successful login
      },
      error: (error) => {
        console.error('Login error:', error);
        this.loginError = 'Invalid email or password.';
      }
    });

  }

  checkScreenWidth(): void{
    if (window.innerWidth <= 768) {
      this.isMobilView = true;
    } else{
      this.isMobilView = false;
    }
  }

}
