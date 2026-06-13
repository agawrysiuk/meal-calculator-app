import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MealTime, RecipeSearchFilters, RecipeTag, MEAL_TIMES, ALL_RECIPE_TAGS} from '../../dto/dto';

@Component({
  selector: 'app-recipe-search',
  standalone: false,
  templateUrl: './recipe-search.component.html',
  styleUrl: './recipe-search.component.css'
})
export class RecipeSearchComponent {
  @Output() search = new EventEmitter<RecipeSearchFilters>();

  // Options for UI
  mealTimeOptions = MEAL_TIMES;
  tagOptions = ALL_RECIPE_TAGS;

  searchForm = new FormGroup({
    nameContains: new FormControl(''),
    minCaloriesPerServing: new FormControl<number | null>(null),
    maxCaloriesPerServing: new FormControl<number | null>(null),
    minProteinPerServing: new FormControl<number | null>(null),
    maxProteinPerServing: new FormControl<number | null>(null),
    minCarbsPerServing: new FormControl<number | null>(null),
    maxCarbsPerServing: new FormControl<number | null>(null),
    mealTimes: new FormControl<MealTime[]>([]),
    tags: new FormControl<RecipeTag[]>([])
  });

  onSearch() {
    const filters: RecipeSearchFilters = {};
    const formValue = this.searchForm.value;

    if (formValue.nameContains) filters.nameContains = formValue.nameContains;
    if (formValue.minCaloriesPerServing !== null) filters.minCaloriesPerServing = formValue.minCaloriesPerServing!;
    if (formValue.maxCaloriesPerServing !== null) filters.maxCaloriesPerServing = formValue.maxCaloriesPerServing!;
    if (formValue.minProteinPerServing !== null) filters.minProteinPerServing = formValue.minProteinPerServing!;
    if (formValue.maxProteinPerServing !== null) filters.maxProteinPerServing = formValue.maxProteinPerServing!;
    if (formValue.minCarbsPerServing !== null) filters.minCarbsPerServing = formValue.minCarbsPerServing!;
    if (formValue.maxCarbsPerServing !== null) filters.maxCarbsPerServing = formValue.maxCarbsPerServing!;
    if (formValue.mealTimes && formValue.mealTimes.length > 0) filters.mealTimes = formValue.mealTimes;
    if (formValue.tags && formValue.tags.length > 0) filters.tags = formValue.tags;

    this.search.emit(filters);
  }

  onClear() {
    this.searchForm.reset();
    this.searchForm.patchValue({ mealTimes: [], tags: [] });
    this.search.emit({});
  }
}
