import { Component, computed, inject, signal } from '@angular/core';
import { ToolBarService } from '../../services/tool-bar.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [IonicModule],
  templateUrl: './toolbar.component.html',
  styles: ``
})
export class ToolbarComponent {
    // @Input() routesDashboard!: SidebarRoutes[];

  private toolBarService   : ToolBarService    = inject( ToolBarService );
  private authService      : AuthService       = inject( AuthService );
  // private uploadFileService: UploadFileService = inject( UploadFileService );
  private router           : Router            = inject( Router );

  public isNavOpen             = signal<boolean>( false );
  public isOpenProfile         = computed<boolean>( () => this.toolBarService.isProfileOpen() );
  // public logoOrganization      = computed<string>( () => this.uploadFileService.logoComputed() );


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

}
