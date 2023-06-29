import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalizarvisitasComponent } from './localizarvisitas.component';

describe('LocalizarvisitasComponent', () => {
  let component: LocalizarvisitasComponent;
  let fixture: ComponentFixture<LocalizarvisitasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LocalizarvisitasComponent]
    });
    fixture = TestBed.createComponent(LocalizarvisitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
