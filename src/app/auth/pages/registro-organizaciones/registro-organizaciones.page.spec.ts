import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroOrganizacionesPage } from './registro-organizaciones.page';

describe('RegistroOrganizacionesPage', () => {
  let component: RegistroOrganizacionesPage;
  let fixture: ComponentFixture<RegistroOrganizacionesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroOrganizacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
