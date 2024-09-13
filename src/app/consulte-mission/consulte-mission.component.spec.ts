import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulteMissionComponent } from './consulte-mission.component';

describe('ConsulteMissionComponent', () => {
  let component: ConsulteMissionComponent;
  let fixture: ComponentFixture<ConsulteMissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsulteMissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsulteMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
