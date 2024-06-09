import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit{

  constructor( private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // if(this.authService.isAuthenticated()){
    //   this.router.navigate(['/auth/login']);
    // } else {
    //   this.router.navigate(['/dashboard']);
    // }
  }
}
