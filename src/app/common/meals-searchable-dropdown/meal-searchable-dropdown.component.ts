import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ItemUsedDto, MealDto} from '../../dto/dto';

@Component({
  selector: 'app-meal-searchable-dropdown',
  standalone: false,

  templateUrl: './meal-searchable-dropdown.component.html',
  styleUrl: './meal-searchable-dropdown.component.css'
})
export class MealSearchableDropdownComponent implements OnChanges, OnInit {

  @Input() meals: MealDto[] = [];
  @Input() meal?: MealDto;
  @Input() editMode: boolean = false;
  @Output() mealChange: EventEmitter<MealDto> = new EventEmitter<MealDto>();

  selectedItemControl: FormControl = new FormControl('');
  filteredMeals: MealDto[] = [];

  ngOnInit(): void {
    if(this.meal) {
      this.selectedItemControl.setValue(this.meal, {onlySelf: true, emitEvent: false})
    }
  }

  filterMeals(event: KeyboardEvent) {
    const searchValue = (event.target as HTMLInputElement).value;
    if (!searchValue && searchValue.trim().length > 0) {
      this.filteredMeals = this.meals.filter(it => it.name.toLowerCase().includes(searchValue.toLowerCase()));
    } else {
      const searchLower = searchValue.toLowerCase();
      this.filteredMeals = this.meals.filter(item =>
        item.name.toLowerCase().includes(searchLower)
      );
    }
  }

  onSelectionChange(event: any) {
    this.mealChange.emit(event.value);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["meals"]) {
      this.filteredMeals = changes["meals"].currentValue;
    }
  }

  onClosed() {
    this.filteredMeals = this.meals;
  }
}
