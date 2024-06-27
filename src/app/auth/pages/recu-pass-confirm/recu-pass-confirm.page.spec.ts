import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecuPassConfirmPage } from './recu-pass-confirm.page';

describe('RecuPassConfirmPage', () => {
  let component: RecuPassConfirmPage;
  let fixture: ComponentFixture<RecuPassConfirmPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuPassConfirmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
