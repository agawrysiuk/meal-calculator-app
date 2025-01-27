import { Component } from '@angular/core';
import {DataService} from '../service/data.service';
import {RecipeDto} from '../dto/dto';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-recipes',
  standalone: false,

  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {

  recipes: Observable<RecipeDto[]>;

  constructor(private dataService: DataService) {
    this.recipes = this.dataService.recipes.asObservable();
  }

  refreshDay($event: { fromDate?: Date; toDate: Date }) {
    if ($event.toDate == new Date()) {
      this.dataService.updateToday();
    }
  }
}
