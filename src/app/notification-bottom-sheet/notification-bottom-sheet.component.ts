import { Component,Inject  } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-notification-bottom-sheet',
  templateUrl: './notification-bottom-sheet.component.html',
  styleUrls: ['./notification-bottom-sheet.component.css'],
})
export class NotificationBottomSheetComponent {

  notifications: any[] = [];

  constructor(private bottomSheetRef: MatBottomSheetRef<NotificationBottomSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
  ) {
    this.notifications = data || [];
  }

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
