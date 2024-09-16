import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerNotificationComponent } from './banner-notification.component';

describe('BannerNotificationComponent', () => {
  let component: BannerNotificationComponent;
  let fixture: ComponentFixture<BannerNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerNotificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
