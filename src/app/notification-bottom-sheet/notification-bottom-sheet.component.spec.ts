import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationBottomSheetComponent } from './notification-bottom-sheet.component';

describe('NotificationBottomSheetComponent', () => {
  let component: NotificationBottomSheetComponent;
  let fixture: ComponentFixture<NotificationBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationBottomSheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
