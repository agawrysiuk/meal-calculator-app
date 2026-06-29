import {Component, Inject} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NutritionTargetSettingsDto} from '../../dto/dto';

@Component({
  selector: 'app-nutrition-target-dialog',
  standalone: false,
  templateUrl: './nutrition-target-dialog.component.html',
  styleUrl: './nutrition-target-dialog.component.css'
})
export class NutritionTargetDialogComponent {
  form;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<NutritionTargetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NutritionTargetSettingsDto
  ) {
    this.form = this.formBuilder.group({
      bodyWeightKg: [this.data.bodyWeightKg, [Validators.required, Validators.min(1)]],
      dailyCalories: [this.data.dailyCalories, [Validators.required, Validators.min(1)]],
      proteinPerKg: [this.data.proteinPerKg, [Validators.required, Validators.min(0)]],
      carbsPercentOfRemaining: [this.data.carbsPercentOfRemaining, [Validators.required, Validators.min(0)]],
      fatPercentOfRemaining: [this.data.fatPercentOfRemaining, [Validators.required, Validators.min(0)]],
    });
  }

  get preview() {
    const value = this.form.getRawValue();
    const bodyWeightKg = Number(value.bodyWeightKg ?? 0);
    const dailyCalories = Number(value.dailyCalories ?? 0);
    const proteinPerKg = Number(value.proteinPerKg ?? 0);
    const carbsPercent = Number(value.carbsPercentOfRemaining ?? 0);
    const fatPercent = Number(value.fatPercentOfRemaining ?? 0);
    const proteinGrams = Math.round(bodyWeightKg * proteinPerKg);
    const remainingCalories = Math.max(dailyCalories - proteinGrams * 4, 0);
    const splitTotal = carbsPercent + fatPercent;
    const carbsRatio = splitTotal > 0 ? carbsPercent / splitTotal : 0.5;
    const carbsGrams = Math.round(remainingCalories * carbsRatio / 4);
    const fatGrams = Math.round(remainingCalories * (1 - carbsRatio) / 9);

    return {
      calories: Math.round(dailyCalories),
      proteinGrams,
      carbohydratesGrams: carbsGrams,
      fatGrams
    };
  }

  save() {
    if (this.form.invalid) {
      return;
    }

    this.dialogRef.close({
      ...this.data,
      ...this.form.getRawValue()
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}
