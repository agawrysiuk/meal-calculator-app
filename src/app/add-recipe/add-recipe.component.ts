import {Component} from '@angular/core';
import {ItemUsedDto, RecipeDto} from '../dto/dto';
import {DataService} from '../service/data.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {AddItemFromListDialogComponent} from '../common/add-item-from-list-dialog/add-item-from-list-dialog.component';

@Component({
  selector: 'app-add-recipe',
  standalone: false,

  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.css'
})
export class AddRecipeComponent {

  items: ItemUsedDto[] = [];
  itemsUsed: ItemUsedDto[] = []
  sumCalories: number = 0;
  sumProtein: number = 0;
  sumFat: number = 0;
  sumCarbohydrates: number = 0;

  constructor(private dataService: DataService, private router: Router, private dialog: MatDialog) {
    this.dataService.items.asObservable().subscribe(next => {
      this.items = next;
    });
  }

  onAddItem(itemForm: any) {
    if (itemForm.valid) {
      const newRecipe: RecipeDto = {
        name: itemForm.value.name,
        servings: itemForm.value.servings,
        link: itemForm.value.link!! ? itemForm.value.link : null,
        description: itemForm.value.description!! ? itemForm.value.description : null,
        itemsUsed: this.itemsUsed
      };

      this.dataService.addRecipe(newRecipe)
        .subscribe(
          (response) => {
            this.dataService.updateRecipes()
            this.router.navigate(['/recipes']);
          },
          (error) => {
            console.error('Error adding recipe:', error);
          }
        );
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddItemFromListDialogComponent, {
      width: '80vw',
    });

    dialogRef.afterClosed().subscribe((result: ItemUsedDto) => {
      if (result.name != "closeDialog") {
        this.itemsUsed.push(result);
        this.itemsUsed = [...this.itemsUsed];
        this.sumCalories += Number(result.properties.calories);
        this.sumProtein += Number(result.properties.protein);
        this.sumFat += Number(result.properties.fat);
        this.sumCarbohydrates += Number(result.properties.carbohydrates);
      }
    });
  }

  catchItemToDelete(event: ItemUsedDto) {
    this.itemsUsed = this.itemsUsed.filter(obj => obj !== event);
    this.sumCalories -= Number(event.properties.calories);
    this.sumProtein -= Number(event.properties.protein);
    this.sumFat -= Number(event.properties.fat);
    this.sumCarbohydrates -= Number(event.properties.carbohydrates);
  }
}
