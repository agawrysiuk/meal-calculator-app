import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PickDateDialogComponent} from '../pick-date-dialog/pick-date-dialog.component';

@Component({
  selector: 'app-pick-string-dialog',
  standalone: false,

  templateUrl: './pick-string-dialog.component.html',
  styleUrl: './pick-string-dialog.component.css'
})
export class PickStringDialogComponent {
  selectedString: string = '';

  constructor(public dialogRef: MatDialogRef<PickDateDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    if (this.data) {
      this.selectedString = this.data
    }
  }

  closeDialog() {
    this.dialogRef.close(null)
  }

  onPickString() {
    if (this.selectedString) {
      this.dialogRef.close(this.selectedString)
    }
  }
}
