import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { AuthService } from './auth/services/auth.service';
import { User } from './auth/interface';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit{

    public currentUser!  : User;
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  constructor( private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.authService.getProfile().subscribe(
      response => {
        if (response && response.user && response.user.username) {
          console.log({ response });
          this.currentUser = response;
          this.cdr.markForCheck(); // Forzar la detección de cambios
        } else {
          console.error('Invalid user profile response', response);
        }
      },
      error => {
        console.error('Error fetching user profile', error);
      }
    );
  }
}
