import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoumettreBesionComponent } from './soumettre-besion.component';

describe('SoumettreBesionComponent', () => {
  let component: SoumettreBesionComponent;
  let fixture: ComponentFixture<SoumettreBesionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoumettreBesionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoumettreBesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
