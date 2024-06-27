import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarOrganizacionPage } from './editar-organizacion.page';

describe('EditarOrganizacionPage', () => {
  let component: EditarOrganizacionPage;
  let fixture: ComponentFixture<EditarOrganizacionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarOrganizacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
