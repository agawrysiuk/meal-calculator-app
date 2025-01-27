import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ItemUsedDto} from '../../dto/dto';
import {DataService} from '../../service/data.service';

@Component({
  selector: 'app-add-item-dialog',
  templateUrl: './add-item-dialog.component.html',
  standalone: false,
})
export class AddItemDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AddItemDialogComponent>,
    private dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  onAddItem(itemForm: any) {
    if (itemForm.valid) {
      const newItem: ItemUsedDto = {
        name: itemForm.value.name,
        properties: {
          calories: itemForm.value.calories,
          protein: itemForm.value.protein,
          fat: itemForm.value.fat,
          carbohydrates: itemForm.value.carbohydrates
        }
      };

      this.dataService.addItem(newItem)
        .subscribe(
          (response) => {
            this.dialogRef.close(newItem);
          },
          (error) => {
            console.error('Error adding item:', error);
          }
        );
    }
  }

  closeDialog() {
    this.dialogRef.close(null)
  }
}
