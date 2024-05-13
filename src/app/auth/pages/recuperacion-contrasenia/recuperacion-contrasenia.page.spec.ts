import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecuperacionContraseniaPage } from './recuperacion-contrasenia.page';

describe('RecuperacionContraseniaPage', () => {
  let component: RecuperacionContraseniaPage;
  let fixture: ComponentFixture<RecuperacionContraseniaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuperacionContraseniaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
