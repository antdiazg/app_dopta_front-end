import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearMascotaPage } from './crear-mascota.page';

describe('CrearMascotaPage', () => {
  let component: CrearMascotaPage;
  let fixture: ComponentFixture<CrearMascotaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearMascotaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
