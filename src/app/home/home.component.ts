import {Component} from '@angular/core';
import {BasePropertiesPer100HundredGramDto, ItemUsedDto, MealDto, MoveUsedItemDto} from '../dto/dto';
import {DataService} from '../service/data.service';
import {emptyBaseProperties, formatDate, sumDataFromMeals} from '../common/helper';
import {MatDialog} from '@angular/material/dialog';
import {AddItemFromListDialogComponent} from '../common/add-item-from-list-dialog/add-item-from-list-dialog.component';
import {MealFromListDialogComponent} from '../common/meal-from-list-dialog/meal-from-list-dialog.component';

@Component({
  selector: 'app-home',
  standalone: false,

  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  selectedDate: Date = new Date();
  dayMeals: MealDto[] = [];
  daySum: BasePropertiesPer100HundredGramDto = emptyBaseProperties()

  constructor(private dataService: DataService, private dialog: MatDialog) {
    this.getMeals()
  }

  getMeals() {
    this.dataService.getMeals(this.selectedDate).subscribe(response => {
      this.dayMeals = response.meals
      this.daySum = sumDataFromMeals(response.meals);
    })
  }

  openAddItemFromListDialog(mealId: string | undefined = undefined) {
    const dialogRef = this.dialog.open(AddItemFromListDialogComponent, {
      width: '80vw',
    });

    dialogRef.afterClosed().subscribe((result?: ItemUsedDto) => {
      if (result && result.name != "closeDialog") {
        if (mealId && mealId != "") {
          this.addItemToMeal(mealId, result)
        } else {
          this.createNewMeal(result)
        }
      }
    });
  }

  private addItemToMeal(mealId: string, result: ItemUsedDto) {
    this.dataService.addItemToMeal(mealId, result).subscribe(response => {
      this.update();
    })
  }

  private createNewMeal(result: ItemUsedDto) {
    const meal: MealDto = {
      mealDay: formatDate(this.selectedDate),
      name: result.name,
      itemsUsed: [
        {
          name: result.name,
          grams: result.grams,
          properties: result.properties,
        }
      ]
    }
    this.dataService.addMeal(meal).subscribe(response => {
      this.update();
    })
  }

  deleteMeal(id: string) {
    this.dataService.deleteMeal(id).subscribe(response => {
      this.update();
    })
  }

  catchItemToDelete($event: ItemUsedDto) {
    this.dataService.deleteItemUsedFromMeal($event.id!).subscribe(response => {
      this.update();
    })
  }

  catchItemToEdit($event: ItemUsedDto) {
    const dialogRef = this.dialog.open(AddItemFromListDialogComponent, {
      width: '80vw',
      data: $event,
    });

    dialogRef.afterClosed().subscribe((result?: ItemUsedDto) => {
      if (result && result.name != "closeDialog") {
        this.dataService.editItem(result).subscribe(response => {
          this.update();
        })
      }
    });
  }

  private update() {
    if (formatDate(new Date()) == formatDate(this.selectedDate)) {
      this.dataService.updateToday()
    }
    this.getMeals()
  }

  copyToDay($event: { fromDate?: Date, toDate: Date }) {
    this.dataService.copyToDate($event.fromDate!, $event.toDate).subscribe(response => {
      this.update()
    })
  }

  catchItemToMove($event: ItemUsedDto, fromMealId: string) {
    const dialogRef = this.dialog.open(MealFromListDialogComponent, {
      data: this.dayMeals,
    });

    dialogRef.afterClosed().subscribe((result?: MealDto) => {
      if (result && result.name != "closeDialog" && result.id != $event.id) {
        const request: MoveUsedItemDto = {
          fromMealId: fromMealId,
          toMealId: result.id!,
          usedItemId: $event.id!
        }
        this.dataService.moveItemFromMealToMeal(request).subscribe(response => {
          this.update();
        })
      }
    });
  }
}
