import {Component, Input} from '@angular/core';

interface MacroPill {
  label: string;
  value: number;
  unit: string;
  type: 'protein' | 'carbs' | 'fat' | 'calories';
}

@Component({
  selector: 'app-macro-pills',
  standalone: false,
  templateUrl: './macro-pills.component.html',
  styleUrl: './macro-pills.component.css'
})
export class MacroPillsComponent {
  @Input() calories?: number;
  @Input() protein?: number;
  @Input() carbs?: number;
  @Input() fat?: number;

  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() layout: 'horizontal' | 'vertical' = 'horizontal';
  @Input() showLabels: boolean = true;

  get pills(): MacroPill[] {
    const pills: MacroPill[] = [];

    if (this.calories !== undefined) {
      pills.push({
        label: 'Calories',
        value: this.calories,
        unit: 'kcal',
        type: 'calories'
      });
    }

    if (this.protein !== undefined) {
      pills.push({
        label: 'Protein',
        value: this.protein,
        unit: 'g',
        type: 'protein'
      });
    }

    if (this.carbs !== undefined) {
      pills.push({
        label: 'Carbs',
        value: this.carbs,
        unit: 'g',
        type: 'carbs'
      });
    }

    if (this.fat !== undefined) {
      pills.push({
        label: 'Fat',
        value: this.fat,
        unit: 'g',
        type: 'fat'
      });
    }

    return pills;
  }

  formatValue(value: number): string {
    return Math.round(value).toString();
  }
}
