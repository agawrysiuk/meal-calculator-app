export interface ItemUsedDto {
  id?: string;
  name: string;
  grams?: number;
  properties: BasePropertiesPer100HundredGramDto;
}

export interface BasePropertiesPer100HundredGramDto {
  calories: number;
  protein: number;
  fat: number;
  carbohydrates: number;
}

export interface MealDto {
  id?: string;
  mealDay: string;
  name: string;
  itemsUsed: ItemUsedDto[];
  sumCalories?: number;
  sumProtein?: number;
  sumFat?: number;
  sumCarbohydrates?: number;
}

export interface RecipeDto {
  id?: string;
  name: string;
  itemsUsed: ItemUsedDto[];
  servings: number;
  sumCalories?: number;
  sumProtein?: number;
  sumFat?: number;
  sumCarbohydrates?: number;
  caloriesPerServing?: number;
  proteinPerServing?: number;
  fatPerServing?: number;
  carbohydratesPerServing?: number;
  link?: string;
  description?: string;
  hasImage?: boolean;
  hasPdf?: boolean;
}

export interface DayDto {
  date: string;
  meals: MealDto[];
}

export interface MoveUsedItemDto {
  usedItemId: string;
  fromMealId: string;
  toMealId: string;
}

export interface CreateMealFromRecipeRequest {
  recipeId: string;
  servings: number;
  mealDay: string;
  mealName?: string;
}

export interface RecipeSearchFilters {
  maxCaloriesPerServing?: number;
  minCaloriesPerServing?: number;
  maxProteinPerServing?: number;
  minProteinPerServing?: number;
  maxCarbsPerServing?: number;
  minCarbsPerServing?: number;
  maxFatPerServing?: number;
  minFatPerServing?: number;
  nameContains?: string;
}
