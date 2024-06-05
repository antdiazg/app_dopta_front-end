import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MascotasListPage } from './mascotas-list.page';

describe('MascotasListPage', () => {
  let component: MascotasListPage;
  let fixture: ComponentFixture<MascotasListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MascotasListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
