import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ItemsComponent} from './items/items.component';
import {RecipesComponent} from './recipes/recipes.component';
import {RecipeFormComponent} from './recipe-form/recipe-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'items', component: ItemsComponent },
  { path: 'recipes', component: RecipesComponent },
  { path: 'add-recipe', component: RecipeFormComponent },
  { path: 'edit-recipe/:id', component: RecipeFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
