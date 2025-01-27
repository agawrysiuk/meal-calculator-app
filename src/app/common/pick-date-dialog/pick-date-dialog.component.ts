import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-pick-date-dialog',
  standalone: false,

  templateUrl: './pick-date-dialog.component.html',
  styleUrl: './pick-date-dialog.component.css'
})
export class PickDateDialogComponent {

  selectedDate: Date = new Date();

  constructor(public dialogRef: MatDialogRef<PickDateDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  closeDialog() {
    this.dialogRef.close(null)
  }

  onPickDate() {
    if (this.selectedDate) {
      this.dialogRef.close(this.selectedDate)
    }
  }
}
