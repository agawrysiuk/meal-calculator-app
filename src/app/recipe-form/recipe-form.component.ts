import {Component, OnInit} from '@angular/core';
import {ItemUsedDto, RecipeDto} from '../dto/dto';
import {DataService} from '../service/data.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {AddItemFromListDialogComponent} from '../common/add-item-from-list-dialog/add-item-from-list-dialog.component';

@Component({
  selector: 'app-recipe-form',
  standalone: false,
  templateUrl: './recipe-form.component.html',
  styleUrl: './recipe-form.component.css'
})
export class RecipeFormComponent implements OnInit {

  items: ItemUsedDto[] = [];
  itemsUsed: ItemUsedDto[] = []
  sumCalories: number = 0;
  sumProtein: number = 0;
  sumFat: number = 0;
  sumCarbohydrates: number = 0;
  
  mode: 'add' | 'edit' = 'add';
  recipeId: string = '';
  recipe: RecipeDto = {
    name: '',
    servings: 1,
    link: '',
    description: '',
    itemsUsed: []
  };

  constructor(
    private dataService: DataService, 
    private router: Router, 
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {
    this.dataService.items.asObservable().subscribe(next => {
      this.items = next;
    });
  }

  ngOnInit() {
    // Determine mode based on route
    this.mode = this.router.url.includes('/edit-recipe') ? 'edit' : 'add';
    
    if (this.mode === 'edit') {
      this.recipeId = this.route.snapshot.paramMap.get('id') || '';
      this.loadRecipe();
    }
  }

  loadRecipe() {
    this.dataService.recipes.asObservable().subscribe(recipes => {
      const foundRecipe = recipes.find(r => r.id === this.recipeId);
      if (foundRecipe) {
        this.recipe = { ...foundRecipe };
        this.itemsUsed = [...foundRecipe.itemsUsed];
        this.calculateSums();
      }
    });
  }

  calculateSums() {
    this.sumCalories = this.itemsUsed.reduce((sum, item) => sum + Number(item.properties.calories), 0);
    this.sumProtein = this.itemsUsed.reduce((sum, item) => sum + Number(item.properties.protein), 0);
    this.sumFat = this.itemsUsed.reduce((sum, item) => sum + Number(item.properties.fat), 0);
    this.sumCarbohydrates = this.itemsUsed.reduce((sum, item) => sum + Number(item.properties.carbohydrates), 0);
  }

  getTitle(): string {
    return this.mode === 'add' ? 'Add Recipe' : 'Edit Recipe';
  }

  getButtonText(): string {
    return this.mode === 'add' ? 'Add Recipe' : 'Update Recipe';
  }

  onSubmit(itemForm: any) {
    if (itemForm.valid) {
      const recipeData: RecipeDto = {
        ...this.recipe,
        itemsUsed: this.itemsUsed
      };

      if (this.mode === 'add') {
        this.addRecipe(recipeData);
      } else {
        this.updateRecipe(recipeData);
      }
    }
  }

  private addRecipe(recipeData: RecipeDto) {
    this.dataService.addRecipe(recipeData)
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

  private updateRecipe(recipeData: RecipeDto) {
    recipeData.id = this.recipeId;
    this.dataService.updateRecipe(recipeData)
      .subscribe(
        (response) => {
          this.dataService.updateRecipes()
          this.router.navigate(['/recipes']);
        },
        (error) => {
          console.error('Error updating recipe:', error);
        }
      );
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