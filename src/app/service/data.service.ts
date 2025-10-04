import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {BasePropertiesPer100HundredGramDto, DayDto, ItemUsedDto, MealDto, MoveUsedItemDto, RecipeDto} from '../dto/dto';
import {HttpClient} from '@angular/common/http';
import {emptyBaseProperties, formatDate, sumDataFromMeals} from '../common/helper';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseUrl = 'http://localhost:8080';
  public items: BehaviorSubject<ItemUsedDto[]> = new BehaviorSubject<ItemUsedDto[]>([]);
  public recipes: BehaviorSubject<RecipeDto[]> = new BehaviorSubject<RecipeDto[]>([]);
  public today: BehaviorSubject<BasePropertiesPer100HundredGramDto> = new BehaviorSubject<BasePropertiesPer100HundredGramDto>(emptyBaseProperties());

  constructor(private http: HttpClient) {
  }

  init() {
    this.updateItems()
    this.updateRecipes()
    this.updateToday()
  }

  updateItems() {
    this.http.get<ItemUsedDto[]>(this.baseUrl + '/api/item')
      .subscribe(response => {
        this.items.next(response.sort((a, b) => a.name.localeCompare(b.name)));
      })
  }

  updateRecipes() {
    this.http.get<RecipeDto[]>(this.baseUrl + '/api/recipe')
      .subscribe(response => {
        this.recipes.next(response);
      })
  }

  updateToday() {
    this.getMeals(new Date())
      .subscribe(response => {
        this.today.next(sumDataFromMeals(response.meals));
      })
  }

  addItem(newItem: ItemUsedDto): Observable<ItemUsedDto> {
    return this.http.post<ItemUsedDto>(this.baseUrl + '/api/item', newItem)
  }

  addRecipe(newItem: RecipeDto): Observable<RecipeDto> {
    return this.http.post<RecipeDto>(this.baseUrl + '/api/recipe', newItem)
  }

  updateRecipe(recipe: RecipeDto): Observable<RecipeDto> {
    return this.http.put<RecipeDto>(this.baseUrl + '/api/recipe/' + recipe.id, recipe)
  }

  deleteRecipe(id: string): Observable<unknown> {
    return this.http.delete(this.baseUrl + '/api/recipe/' + id)
  }

  getMeals(date: Date): Observable<DayDto> {
    return this.http.get<DayDto>(this.baseUrl + '/api/day?date=' + formatDate(date))
  }

  addMeal(mealDto: MealDto): Observable<MealDto> {
    return this.http.post<MealDto>(this.baseUrl + '/api/meal', mealDto)
  }

  deleteMeal(id: string): Observable<unknown> {
    return this.http.delete(this.baseUrl + '/api/meal/' + id)
  }

  copyToDate(fromDate: Date, toDate: Date): Observable<DayDto> {
    return this.http.post<DayDto>(this.baseUrl + '/api/day?fromDate=' + formatDate(fromDate) + '&toDate=' + formatDate(toDate), null)
  }

  moveItemFromMealToMeal(request: MoveUsedItemDto): Observable<unknown> {
    return this.http.patch<unknown>(this.baseUrl + '/api/item-used/move', request)
  }

  deleteItemUsedFromMeal(id: string): Observable<unknown> {
    return this.http.delete<unknown>(this.baseUrl + '/api/item-used/' + id)
  }

  editItem(item: ItemUsedDto): Observable<unknown> {
    return this.http.put<unknown>(this.baseUrl + '/api/item-used/' + item.id, item)
  }

  addItemToMeal(mealId: string, item: ItemUsedDto): Observable<unknown> {
    return this.http.post<unknown>(this.baseUrl + '/api/meal/' + mealId + '/items-used', item)
  }

  renameMeal(mealId: string, newName: string): Observable<unknown> {
    return this.http.put<unknown>(this.baseUrl + '/api/meal/' + mealId + '/name', newName)
  }
}
