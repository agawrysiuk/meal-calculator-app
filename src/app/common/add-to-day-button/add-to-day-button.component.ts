import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DataService} from '../../service/data.service';
import {ItemUsedDto, MealDto} from '../../dto/dto';
import {formatDate} from '../helper';
import {MatDialog} from '@angular/material/dialog';
import {PickDateDialogComponent} from '../pick-date-dialog/pick-date-dialog.component';

@Component({
  selector: 'app-add-to-day-button',
  standalone: false,

  templateUrl: './add-to-day-button.component.html',
  styleUrl: './add-to-day-button.component.css'
})
export class AddToDayButtonComponent {

  @Input() toAdd!: { name: string, itemsUsed: ItemUsedDto[], fromDate?: Date };
  @Input() onlyEmit: Boolean = false;
  @Input() buttonText: string = 'Add to day...';
  @Input() servings: number = 1;
  @Output() actionMadeEmitter: EventEmitter<{ fromDate?: Date, toDate: Date }> = new EventEmitter<{
    fromDate?: Date,
    toDate: Date
  }>();

  constructor(private dataService: DataService, private dialog: MatDialog) {
  }

  openDialog() {
    const dialogRef = this.dialog.open(PickDateDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result && result instanceof Date) {
        const meal: MealDto = {
          mealDay: formatDate(result),
          name: this.toAdd.name,
          itemsUsed: this.divideItemsUsedByServings(this.toAdd.itemsUsed)
        }
        if (!this.onlyEmit) {
          this.dataService.addMeal(meal).subscribe(response => {
            if (result == new Date()) {
              this.dataService.updateToday()
            }
            this.actionMadeEmitter.emit({toDate: result})
          })
        } else {
          this.actionMadeEmitter.emit({fromDate: this.toAdd.fromDate, toDate: result})
        }
      }
    });
  }

  divideItemsUsedByServings(items: ItemUsedDto[]): ItemUsedDto[] {
    if (this.servings == 1) return items;
    return items.map(it => {
      return {
        id: it.id,
        name: it.name,
        grams: this.divideBy(it.grams),
        properties: {
          calories: this.divideBy(it.properties.calories)!!,
          protein: this.divideBy(it.properties.protein)!!,
          fat: this.divideBy(it.properties.fat)!!,
          carbohydrates: this.divideBy(it.properties.carbohydrates)!!,
        }
      }
    })
  }

  private divideBy(num?: number): number | undefined {
    if (!num) return undefined;
    return Number((num / this.servings).toFixed(2));
  }
}
