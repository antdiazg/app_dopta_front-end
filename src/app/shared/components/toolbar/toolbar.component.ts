import { ChangeDetectorRef, Component, OnInit, computed, inject, signal } from '@angular/core';
import { ToolBarService } from '../../services/tool-bar.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { User } from 'src/app/auth/interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './toolbar.component.html',
  styles: ``
})
export class ToolbarComponent implements OnInit{
    // @Input() routesDashboard!: SidebarRoutes[];

  private toolBarService   : ToolBarService    = inject( ToolBarService );
  private authService      : AuthService       = inject( AuthService );
  // private uploadFileService: UploadFileService = inject( UploadFileService );
  private router           : Router            = inject( Router );

  public isNavOpen             = signal<boolean>( false );
  public isOpenProfile         = computed<boolean>( () => this.toolBarService.isProfileOpen() );
  // public logoOrganization      = computed<string>( () => this.uploadFileService.logoComputed() );

  public currentUser!  : User;
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  toggleNav() {
    this.isNavOpen.update( isNavOpen => isNavOpen = !isNavOpen );

  };
//TODO: arreglar la redirección para modificar perfil (actualizar información)
  toggleProfile() {
    this.router.navigateByUrl( '/dashboard/configuraciones/perfilOrg' );
    this.toolBarService.toggleProfileIcon();

  };

  toggleProfileIcon() {
    this.toolBarService.toggleProfileIcon();

  };

//TODO: arreglar funcionalidad de salir de sesión
  onLogout() {
    this.authService.logout();
    this.toolBarService.toggleProfileIcon();

  };

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
