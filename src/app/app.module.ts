import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_DATE_LOCALE, MatNativeDateModule, MatOption} from '@angular/material/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ItemsComponent} from './items/items.component';
import {DataService} from './service/data.service';
import {provideHttpClient} from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {AddItemDialogComponent} from './items/add-item-dialog/add-item-dialog.component';
import { RecipesComponent } from './recipes/recipes.component';
import { ItemSearchableDropdownComponent } from './common/item-searchable-dropdown/item-searchable-dropdown.component';
import {MatSelect} from '@angular/material/select';
import { ItemsTableComponent } from './common/items-table/items-table.component';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { AddItemFromListDialogComponent } from './common/add-item-from-list-dialog/add-item-from-list-dialog.component';
import { ConfirmationDialogComponent } from './common/confirmation-dialog/confirmation-dialog.component';
import { AddToDayButtonComponent } from './common/add-to-day-button/add-to-day-button.component';
import { PickDateDialogComponent } from './common/pick-date-dialog/pick-date-dialog.component';
import { DatePickerInputComponent } from './common/date-picker-input/date-picker-input.component';
import {MealSearchableDropdownComponent} from './common/meals-searchable-dropdown/meal-searchable-dropdown.component';
import { MealFromListDialogComponent } from './common/meal-from-list-dialog/meal-from-list-dialog.component';
import { PickStringDialogComponent } from './common/pick-string-dialog/pick-string-dialog.component';

export function initData(dataService: DataService) {
  return () => dataService.init();
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ItemsComponent,
    AddItemDialogComponent,
    RecipesComponent,
    ItemSearchableDropdownComponent,
    MealSearchableDropdownComponent,
    ItemsTableComponent,
    RecipeFormComponent,
    AddItemFromListDialogComponent,
    ConfirmationDialogComponent,
    AddToDayButtonComponent,
    PickDateDialogComponent,
    DatePickerInputComponent,
    MealFromListDialogComponent,
    PickStringDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatSelect,
    MatOption,
  ],
  providers: [
    provideHttpClient(),
    provideAnimationsAsync(),
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    {
      provide: APP_INITIALIZER,
      useFactory: initData,
      deps: [DataService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
