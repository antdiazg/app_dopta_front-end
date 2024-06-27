import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdoptarPage } from './adoptar.page';

describe('AdoptarPage', () => {
  let component: AdoptarPage;
  let fixture: ComponentFixture<AdoptarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdoptarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
