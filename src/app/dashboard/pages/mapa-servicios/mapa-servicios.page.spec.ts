import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapaServiciosPage } from './mapa-servicios.page';

describe('MapaServiciosPage', () => {
  let component: MapaServiciosPage;
  let fixture: ComponentFixture<MapaServiciosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaServiciosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
