import { Component } from '@angular/core';
import {baseUrl, DataService} from '../service/data.service';
import {RecipeDto, RecipeSearchFilters} from '../dto/dto';
import {Observable} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogComponent, ConfirmationData} from '../common/confirmation-dialog/confirmation-dialog.component';
import {formatDate} from '../common/helper';

@Component({
  selector: 'app-recipes',
  standalone: false,

  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {

  recipes: Observable<RecipeDto[]>;
  isSearching: boolean = false;

  constructor(private dataService: DataService, private dialog: MatDialog) {
    this.recipes = this.dataService.recipes.asObservable();
  }

  onSearch(filters: RecipeSearchFilters) {
    if (Object.keys(filters).length === 0) {
      // No filters - show all recipes
      this.recipes = this.dataService.recipes.asObservable();
      this.isSearching = false;
    } else {
      // Apply filters
      this.recipes = this.dataService.searchRecipes(filters);
      this.isSearching = true;
    }
  }

  getImageUrl(recipeId: string): string {
    return `${baseUrl}/api/recipe/${recipeId}/image`;
  }

  getPdfUrl(recipeId: string): string {
    return `${baseUrl}/api/recipe/${recipeId}/pdf`;
  }

  openPdf(recipeId: string): void {
    window.open(this.getPdfUrl(recipeId), '_blank');
  }

  handleImageError(event: any): void {
    // Hide broken image icon by setting a transparent 1x1 pixel
    event.target.style.display = 'none';
  }

  refreshDay($event: { fromDate?: Date; toDate: Date }) {
    if (formatDate($event.toDate) == formatDate(new Date())) {
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
