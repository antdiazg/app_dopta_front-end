import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiciosListPage } from './servicios-list.page';

describe('ServiciosListPage', () => {
  let component: ServiciosListPage;
  let fixture: ComponentFixture<ServiciosListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiciosListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
