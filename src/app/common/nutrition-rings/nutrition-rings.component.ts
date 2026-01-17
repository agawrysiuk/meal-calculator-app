import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

interface RingData {
  label: string;
  value: number;
  max: number;
  color: string;
  strokeWidth: number;
  radius: number;
}

@Component({
  selector: 'app-nutrition-rings',
  standalone: false,
  templateUrl: './nutrition-rings.component.html',
  styleUrl: './nutrition-rings.component.css'
})
export class NutritionRingsComponent implements OnChanges {
  @Input() calories: number = 0;
  @Input() protein: number = 0;
  @Input() carbs: number = 0;
  @Input() fat: number = 0;

  @Input() targetCalories: number = 2200;
  @Input() targetProtein: number = 150;
  @Input() targetCarbs: number = 250;
  @Input() targetFat: number = 70;

  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() showLabels: boolean = true;

  rings: RingData[] = [];
  svgSize: number = 200;
  centerX: number = 100;
  centerY: number = 100;

  ngOnChanges(changes: SimpleChanges): void {
    this.calculateRings();
  }

  private calculateRings(): void {
    // Set dimensions based on size
    switch (this.size) {
      case 'small':
        this.svgSize = 120;
        break;
      case 'medium':
        this.svgSize = 200;
        break;
      case 'large':
        this.svgSize = 280;
        break;
    }

    this.centerX = this.svgSize / 2;
    this.centerY = this.svgSize / 2;

    // Define rings from outermost to innermost
    const baseRadius = this.svgSize * 0.38;
    const strokeWidth = this.svgSize * 0.06;
    const gap = this.svgSize * 0.02;

    this.rings = [
      {
        label: 'Calories',
        value: this.calories,
        max: this.targetCalories,
        color: 'var(--color-calories)',
        strokeWidth: strokeWidth,
        radius: baseRadius
      },
      {
        label: 'Protein',
        value: this.protein,
        max: this.targetProtein,
        color: 'var(--color-protein)',
        strokeWidth: strokeWidth,
        radius: baseRadius - strokeWidth - gap
      },
      {
        label: 'Carbs',
        value: this.carbs,
        max: this.targetCarbs,
        color: 'var(--color-carbs)',
        strokeWidth: strokeWidth,
        radius: baseRadius - (strokeWidth + gap) * 2
      },
      {
        label: 'Fat',
        value: this.fat,
        max: this.targetFat,
        color: 'var(--color-fat)',
        strokeWidth: strokeWidth,
        radius: baseRadius - (strokeWidth + gap) * 3
      }
    ];
  }

  getCircumference(radius: number): number {
    return 2 * Math.PI * radius;
  }

  getStrokeDashoffset(ring: RingData): number {
    const circumference = this.getCircumference(ring.radius);
    const percentage = Math.min((ring.value / ring.max) * 100, 100);
    return circumference - (percentage / 100) * circumference;
  }

  getPercentage(ring: RingData): number {
    return Math.min(Math.round((ring.value / ring.max) * 100), 100);
  }
}
