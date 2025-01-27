import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {MealDto} from '../../dto/dto';

@Component({
  selector: 'app-meal-from-list-dialog',
  standalone: false,

  templateUrl: './meal-from-list-dialog.component.html',
  styleUrl: './meal-from-list-dialog.component.css'
})
export class MealFromListDialogComponent {
  selection?: MealDto;
  meals: MealDto[] = [];

  constructor(public dialogRef: MatDialogRef<MealFromListDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.meals = data;
  }

  closeDialog() {
    this.dialogRef.close(null)
  }

  onMealChange(event: any) {
    this.selection = event;
  }

  pickMeal() {
    if (this.selection) {
      this.dialogRef.close(this.selection)
    }
  }
}
