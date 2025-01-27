import {BasePropertiesPer100HundredGramDto, MealDto} from '../dto/dto';

export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function sumDataFromMeals(meals: MealDto[]): BasePropertiesPer100HundredGramDto {
  return {
    calories: Number(meals.map(it => it.sumCalories!).reduce((sum, current) => sum + current, 0).toFixed(2)),
    carbohydrates: Number(meals.map(it => it.sumCarbohydrates!).reduce((sum, current) => sum + current, 0).toFixed(2)),
    fat: Number(meals.map(it => it.sumFat!).reduce((sum, current) => sum + current, 0).toFixed(2)),
    protein: Number(meals.map(it => it.sumProtein!).reduce((sum, current) => sum + current, 0).toFixed(2))
  }
}

export function emptyBaseProperties(): BasePropertiesPer100HundredGramDto {
  return {
    calories: 0,
    carbohydrates: 0,
    fat: 0,
    protein: 0
  }
}
