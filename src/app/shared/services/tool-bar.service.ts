import { Injectable, computed, signal } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class ToolBarService {

  private _isProfileOpen = signal<boolean>( false );

  public isProfileOpen = computed( () => this._isProfileOpen() );


  toggleProfile( isOpen: boolean ) {
    this._isProfileOpen.update( value => value = isOpen );

  };

  toggleProfileIcon() {
    this._isProfileOpen.update( value => value = !value );

  };

};
