// ========================================
// Meal Times - when the recipe is suitable
// ========================================
export type MealTime = 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SUPPER' | 'SNACK';

export const MEAL_TIMES: { value: MealTime; label: string }[] = [
  { value: 'BREAKFAST', label: 'Breakfast' },
  { value: 'LUNCH', label: 'Lunch' },
  { value: 'DINNER', label: 'Dinner' },
  { value: 'SUPPER', label: 'Supper' },
  { value: 'SNACK', label: 'Snack' }
];

// ========================================
// Recipe Tags - flat list (what backend stores)
// ========================================
export type RecipeTag =
  // Protein Source
  | 'CHICKEN' | 'BEEF' | 'PORK' | 'FISH' | 'SEAFOOD' | 'TURKEY' | 'LAMB' | 'EGGS' | 'TOFU' | 'LEGUMES'
  // Diet Type
  | 'VEGETARIAN' | 'VEGAN' | 'KETO' | 'LOW_CARB' | 'HIGH_PROTEIN' | 'GLUTEN_FREE' | 'DAIRY_FREE'
  // Preparation Style
  | 'QUICK' | 'ONE_POT' | 'MEAL_PREP' | 'PREPARE_AHEAD' | 'NO_COOK' | 'SLOW_COOKER' | 'AIR_FRYER'
  // Carb Base
  | 'PASTA' | 'RICE' | 'POTATO' | 'NOODLES' | 'BREAD' | 'QUINOA'
  // Dish Type
  | 'SOUP' | 'SALAD' | 'STIR_FRY' | 'CASSEROLE' | 'CURRY' | 'STEW' | 'BOWL' | 'SANDWICH' | 'WRAP'
  // Cuisine
  | 'ITALIAN' | 'MEXICAN' | 'ASIAN' | 'INDIAN' | 'MEDITERRANEAN' | 'POLISH' | 'THAI' | 'JAPANESE'
  // Characteristic
  | 'COMFORT_FOOD' | 'LIGHT' | 'BUDGET_FRIENDLY' | 'KID_FRIENDLY' | 'SPICY';

// ========================================
// FRONTEND-ONLY: Tag Groupings for UI
// ========================================
// These groups are ONLY used for organizing the chip selection UI.
// Backend stores/searches on flat RecipeTag[] - no category awareness.

export interface RecipeTagGroup {
  name: string;
  tags: { value: RecipeTag; label: string }[];
}

export const RECIPE_TAG_GROUPS: RecipeTagGroup[] = [
  {
    name: 'Protein Source',
    tags: [
      { value: 'CHICKEN', label: 'Chicken' },
      { value: 'BEEF', label: 'Beef' },
      { value: 'PORK', label: 'Pork' },
      { value: 'FISH', label: 'Fish' },
      { value: 'SEAFOOD', label: 'Seafood' },
      { value: 'TURKEY', label: 'Turkey' },
      { value: 'LAMB', label: 'Lamb' },
      { value: 'EGGS', label: 'Eggs' },
      { value: 'TOFU', label: 'Tofu' },
      { value: 'LEGUMES', label: 'Legumes' }
    ]
  },
  {
    name: 'Diet Type',
    tags: [
      { value: 'VEGETARIAN', label: 'Vegetarian' },
      { value: 'VEGAN', label: 'Vegan' },
      { value: 'KETO', label: 'Keto' },
      { value: 'LOW_CARB', label: 'Low Carb' },
      { value: 'HIGH_PROTEIN', label: 'High Protein' },
      { value: 'GLUTEN_FREE', label: 'Gluten Free' },
      { value: 'DAIRY_FREE', label: 'Dairy Free' }
    ]
  },
  {
    name: 'Preparation',
    tags: [
      { value: 'QUICK', label: 'Quick (<30 min)' },
      { value: 'ONE_POT', label: 'One Pot' },
      { value: 'MEAL_PREP', label: 'Meal Prep' },
      { value: 'PREPARE_AHEAD', label: 'Prepare Ahead' },
      { value: 'NO_COOK', label: 'No Cook' },
      { value: 'SLOW_COOKER', label: 'Slow Cooker' },
      { value: 'AIR_FRYER', label: 'Air Fryer' }
    ]
  },
  {
    name: 'Carb Base',
    tags: [
      { value: 'PASTA', label: 'Pasta' },
      { value: 'RICE', label: 'Rice' },
      { value: 'POTATO', label: 'Potato' },
      { value: 'NOODLES', label: 'Noodles' },
      { value: 'BREAD', label: 'Bread' },
      { value: 'QUINOA', label: 'Quinoa' }
    ]
  },
  {
    name: 'Dish Type',
    tags: [
      { value: 'SOUP', label: 'Soup' },
      { value: 'SALAD', label: 'Salad' },
      { value: 'STIR_FRY', label: 'Stir Fry' },
      { value: 'CASSEROLE', label: 'Casserole' },
      { value: 'CURRY', label: 'Curry' },
      { value: 'STEW', label: 'Stew' },
      { value: 'BOWL', label: 'Bowl' },
      { value: 'SANDWICH', label: 'Sandwich' },
      { value: 'WRAP', label: 'Wrap' }
    ]
  },
  {
    name: 'Cuisine',
    tags: [
      { value: 'ITALIAN', label: 'Italian' },
      { value: 'MEXICAN', label: 'Mexican' },
      { value: 'ASIAN', label: 'Asian' },
      { value: 'INDIAN', label: 'Indian' },
      { value: 'MEDITERRANEAN', label: 'Mediterranean' },
      { value: 'POLISH', label: 'Polish' },
      { value: 'THAI', label: 'Thai' },
      { value: 'JAPANESE', label: 'Japanese' }
    ]
  },
  {
    name: 'Characteristic',
    tags: [
      { value: 'COMFORT_FOOD', label: 'Comfort Food' },
      { value: 'LIGHT', label: 'Light' },
      { value: 'BUDGET_FRIENDLY', label: 'Budget Friendly' },
      { value: 'KID_FRIENDLY', label: 'Kid Friendly' },
      { value: 'SPICY', label: 'Spicy' }
    ]
  }
];

// Helper to get all tags as flat array
export const ALL_RECIPE_TAGS = RECIPE_TAG_GROUPS.flatMap(g => g.tags);

// ========================================
// Core DTOs
// ========================================

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
  mealTimes: MealTime[];    // when the recipe is suitable
  tags: RecipeTag[];        // flat list (categories are frontend-only)
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
  mealTimes?: MealTime[];   // OR filter - matches if recipe has ANY of these
  tags?: RecipeTag[];       // OR filter - matches if recipe has ANY of these
}
