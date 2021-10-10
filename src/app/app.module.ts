import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipeComponent } from './components/recipe/recipe.component';
import { IngredientComponent } from './components/ingredient/ingredient.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HttpClientModule } from '@angular/common/http';
import { IngredientItemComponent } from './components/ingredient/ingredient-item/ingredient-item.component';
import { IngredientResolver } from './components/ingredient/ingredient-item/ingredient-resolver.service';
import { NewIngredientComponent } from './components/ingredient/new-ingredient/new-ingredient.component';
import { EditIngredientComponent } from './components/ingredient/edit-ingredient/edit-ingredient.component';
import { IngredientDialogComponent } from './components/ingredient/ingredient-item/ingredient-dialog/ingredient-dialog.component';
import { EditShoppingListComponent } from './components/shopping-list/edit-shopping-list/edit-shopping-list.component';
import { NewShoppingListComponent } from './components/shopping-list/new-shopping-list/new-shopping-list.component';
import { ShoppingListItemComponent } from './components/shopping-list/shopping-list-item/shopping-list-item.component';
import { ShoppingListDialogComponent } from './components/shopping-list/shopping-list-item/shopping-list-dialog/shopping-list-dialog.component';
import { ShoppingListResolver } from './components/shopping-list/shopping-list-item/shopping-list-resolver.service';

@NgModule({
  declarations: [
    AppComponent,
    RecipeComponent,
    IngredientComponent,
    ShoppingListComponent,
    NavigationComponent,
    IngredientItemComponent,
    NewIngredientComponent,
    EditIngredientComponent,
    IngredientDialogComponent,
    EditShoppingListComponent,
    NewShoppingListComponent,
    ShoppingListItemComponent,
    ShoppingListDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [IngredientResolver, ShoppingListResolver],
  bootstrap: [AppComponent],
})
export class AppModule {}
