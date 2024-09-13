import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttribuermissionComponent } from './attribuermission.component';

describe('AttribuermissionComponent', () => {
  let component: AttribuermissionComponent;
  let fixture: ComponentFixture<AttribuermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttribuermissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttribuermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
