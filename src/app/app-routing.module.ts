import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngredientComponent } from './components/ingredient/ingredient.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'recipe', pathMatch: 'full' },
  { path: 'recipe', component: RecipeComponent },
  { path: 'ingredient', component: IngredientComponent },
  { path: 'shopping-list', component: ShoppingListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
