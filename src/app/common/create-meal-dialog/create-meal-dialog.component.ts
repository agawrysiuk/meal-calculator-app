import {Component} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-create-meal-dialog',
  standalone: false,
  templateUrl: './create-meal-dialog.component.html',
  styleUrl: './create-meal-dialog.component.css'
})
export class CreateMealDialogComponent {
  mealName: string = '';

  constructor(public dialogRef: MatDialogRef<CreateMealDialogComponent>) {
  }

  closeDialog() {
    this.dialogRef.close(null)
  }

  onCreateMeal() {
    const trimmedName = this.mealName.trim();
    if (trimmedName) {
      this.dialogRef.close(trimmedName)
    }
  }

  isNameValid(): boolean {
    return this.mealName.trim().length > 0;
  }
}