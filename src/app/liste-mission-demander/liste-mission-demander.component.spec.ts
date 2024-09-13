import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeMissionDemanderComponent } from './liste-mission-demander.component';

describe('ListeMissionDemanderComponent', () => {
  let component: ListeMissionDemanderComponent;
  let fixture: ComponentFixture<ListeMissionDemanderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeMissionDemanderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeMissionDemanderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
