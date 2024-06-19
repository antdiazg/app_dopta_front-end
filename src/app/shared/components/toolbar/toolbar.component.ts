import { ChangeDetectorRef, Component, OnInit, computed, inject, signal } from '@angular/core';
import { ToolBarService } from '../../services/tool-bar.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { IonicModule,  } from '@ionic/angular';
import { User, Persona } from 'src/app/auth/interface';
import { CommonModule } from '@angular/common';
import { environments } from 'src/environments/environment';



@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './toolbar.component.html',
  styles: ``
})
export class ToolbarComponent implements OnInit {

  // @Input() routesDashboard!: SidebarRoutes[];
  public defaultImageURL = ('assets/icon/Logo_AppDopta.jpeg');
  isMobilView!: boolean;
  private toolBarService: ToolBarService = inject(ToolBarService);
  private authService: AuthService = inject(AuthService);
  // private uploadFileService: UploadFileService = inject( UploadFileService );
  private router: Router = inject(Router);

  public isNavOpen = signal<boolean>(false);
  public isOpenProfile = computed<boolean>(() => this.toolBarService.isProfileOpen());
  // public logoOrganization      = computed<string>( () => this.uploadFileService.logoComputed() );

  public currentUser!: Persona;
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  toggleNav() {
    this.isNavOpen.update(isNavOpen => isNavOpen = !isNavOpen);

  };
  //TODO: arreglar la redirección para modificar perfil (actualizar información)
  toggleProfile() {

    window.location.href = `${environments.BASE_URL}/auth/editar-persona`
    this.toolBarService.toggleProfileIcon();
  }
  toggleProfileOrganization() {

    window.location.href = `${environments.BASE_URL}/auth/editar-organizacion`
    this.toolBarService.toggleProfileIcon();
  }

  toggleProfileIcon() {
    this.toolBarService.toggleProfileIcon();

  };

  //TODO: arreglar funcionalidad de salir de sesión
  onLogout() {
    this.authService.logout();
    this.toolBarService.toggleProfileIcon();
    window.location.reload();
  };

  ngOnInit(): void {
    this.loadUserProfile();

    this.checkScreenWidth();
    window.addEventListener('resize', () => {
      this.checkScreenWidth();
    });


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

  checkScreenWidth(): void {
    if (window.innerWidth <= 768) {
      this.isMobilView = true;
    } else {
      this.isMobilView = false;
    }
  }

  navigateTo(page: string) {
    this.router.navigate([page]);
  }

}
