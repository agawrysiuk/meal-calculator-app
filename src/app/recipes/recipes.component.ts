import { Component } from '@angular/core';
import {DataService} from '../service/data.service';
import {RecipeDto} from '../dto/dto';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogComponent, ConfirmationData} from '../common/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-recipes',
  standalone: false,

  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {

  recipes: Observable<RecipeDto[]>;

  constructor(private dataService: DataService, private dialog: MatDialog) {
    this.recipes = this.dataService.recipes.asObservable();
  }

  refreshDay($event: { fromDate?: Date; toDate: Date }) {
    if ($event.toDate == new Date()) {
      this.dataService.updateToday();
    }
  }

  confirmDelete(recipe: RecipeDto) {
    const confirmationData: ConfirmationData = {
      title: 'Delete Recipe',
      message: `Are you sure you want to delete "${recipe.name}"? This action cannot be undone.`,
      confirmText: 'Delete',
      cancelText: 'Cancel',
      isDangerous: true
    };

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: confirmationData,
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed && recipe.id) {
        this.deleteRecipe(recipe.id);
      }
    });
  }

  private deleteRecipe(id: string) {
    this.dataService.deleteRecipe(id)
      .subscribe(
        () => {
          this.dataService.updateRecipes();
        },
        (error) => {
          console.error('Error deleting recipe:', error);
        }
      );
  }
}
