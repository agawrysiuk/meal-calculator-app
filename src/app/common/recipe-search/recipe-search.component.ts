import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {RecipeSearchFilters} from '../../dto/dto';

@Component({
  selector: 'app-recipe-search',
  standalone: false,
  templateUrl: './recipe-search.component.html',
  styleUrl: './recipe-search.component.css'
})
export class RecipeSearchComponent {
  @Output() search = new EventEmitter<RecipeSearchFilters>();

  searchForm = new FormGroup({
    nameContains: new FormControl(''),
    minCaloriesPerServing: new FormControl<number | null>(null),
    maxCaloriesPerServing: new FormControl<number | null>(null),
    minProteinPerServing: new FormControl<number | null>(null),
    maxProteinPerServing: new FormControl<number | null>(null),
    minCarbsPerServing: new FormControl<number | null>(null),
    maxCarbsPerServing: new FormControl<number | null>(null),
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

    this.search.emit(filters);
  }

  onClear() {
    this.searchForm.reset();
    this.search.emit({});
  }
}
