import {Component, Inject, OnInit} from '@angular/core';
import {ItemUsedDto} from '../../dto/dto';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../../service/data.service';

@Component({
  selector: 'add-item-from-list-dialog',
  standalone: false,

  templateUrl: './add-item-from-list-dialog.component.html',
  styleUrl: './add-item-from-list-dialog.component.css'
})
export class AddItemFromListDialogComponent {

  form: FormGroup;
  items: ItemUsedDto[] = [];
  chosenItem?: ItemUsedDto = undefined;
  editMode: boolean = false;
  buttonText: string;
  injectedData: any

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    public dialogRef: MatDialogRef<AddItemFromListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.injectedData = data
    this.items = this.dataService.items.getValue();
    if (data
      && data.id
      && data.grams
      && data.name
      && data.properties
      && data.properties.calories
      && data.properties.carbohydrates
      && data.properties.fat
      && data.properties.protein) {
      this.editMode = true;
      this.chosenItem = this.items.find(item => data.id == item.id);
    }
    this.buttonText = this.editMode ? 'Edit Item' : 'Add Item'
    this.form = this.formBuilder.group({
      name: [{value: this.editMode ? data.name : null, disabled: !this.editMode}, [Validators.required]],
      grams: [this.editMode ? data.grams : 100, [Validators.required, Validators.min(1)]],
      calories: [{value: this.editMode ? data.properties.calories : null, disabled: !this.editMode}, [Validators.required]],
      protein: [{value: this.editMode ? data.properties.protein : null, disabled: !this.editMode}, [Validators.required]],
      fat: [{value: this.editMode ? data.properties.fat : null, disabled: !this.editMode}, [Validators.required]],
      carbohydrates: [{value: this.editMode ? data.properties.carbohydrates : null, disabled: !this.editMode}, [Validators.required]],
    })

    this.form.controls["grams"].valueChanges.subscribe(value => {
      this.updateForGramsChanging()
    });

    // In edit mode, convert per-100g values to totals for display
    if (this.editMode && this.chosenItem) {
      this.updateForGramsChanging();
    }
  }

  submit() {
    if (this.form.valid && this.chosenItem) {
      const grams = this.form.controls["grams"].value;

      // IMPORTANT: properties must contain per-100g values, not totals
      // The form shows totals for user convenience, but we need to convert back to per-100g
      const newItem: ItemUsedDto = {
        id: this.chosenItem?.id || this.injectedData?.id,
        name: this.form.controls["name"].value,
        grams: grams,
        properties: {
          calories: Number(((this.form.controls["calories"].value / grams) * 100).toFixed(2)),
          protein: Number(((this.form.controls["protein"].value / grams) * 100).toFixed(2)),
          fat: Number(((this.form.controls["fat"].value / grams) * 100).toFixed(2)),
          carbohydrates: Number(((this.form.controls["carbohydrates"].value / grams) * 100).toFixed(2))
        }
      };
      this.dialogRef.close(newItem);
    }
  }

  closeDialog() {
    this.dialogRef.close(null)
  }

  onItemSelect($event: ItemUsedDto) {
    this.chosenItem = $event;
    this.form.controls["name"].setValue($event.name);
    this.updateForGramsChanging()
  }

  updateForGramsChanging() {
    const grams = this.form.controls["grams"].value as number;
    if (this.chosenItem) {
      this.form.controls["calories"].setValue((this.chosenItem.properties.calories / 100 * grams).toFixed(2));
      this.form.controls["protein"].setValue((this.chosenItem.properties.protein / 100 * grams).toFixed(2));
      this.form.controls["fat"].setValue((this.chosenItem.properties.fat / 100 * grams).toFixed(2));
      this.form.controls["carbohydrates"].setValue((this.chosenItem.properties.carbohydrates / 100 * grams).toFixed(2));
    }
  }
}
