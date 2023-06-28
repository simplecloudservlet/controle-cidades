import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalizarvisitaComponent } from './localizarvisita.component';

describe('LocalizarvisitaComponent', () => {
  let component: LocalizarvisitaComponent;
  let fixture: ComponentFixture<LocalizarvisitaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocalizarvisitaComponent]
    });
    fixture = TestBed.createComponent(LocalizarvisitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
