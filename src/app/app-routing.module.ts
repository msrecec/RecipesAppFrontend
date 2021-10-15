import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { AuthGuard } from './components/guards/auth.guard';
import { EditIngredientComponent } from './components/ingredient/edit-ingredient/edit-ingredient.component';
import { IngredientItemComponent } from './components/ingredient/ingredient-item/ingredient-item.component';
import { IngredientResolver } from './components/ingredient/ingredient-item/ingredient-resolver.service';
import { IngredientComponent } from './components/ingredient/ingredient.component';
import { NewIngredientComponent } from './components/ingredient/new-ingredient/new-ingredient.component';
import { EditRecipeComponent } from './components/recipe/edit-recipe/edit-recipe.component';
import { NewRecipeComponent } from './components/recipe/new-recipe/new-recipe.component';
import { RecipeItemComponent } from './components/recipe/recipe-item/recipe-item.component';
import { RecipeResolver } from './components/recipe/recipe-item/recipe-resolver.service';
import { RecipeComponent } from './components/recipe/recipe.component';
import { EditShoppingListComponent } from './components/shopping-list/edit-shopping-list/edit-shopping-list.component';
import { NewShoppingListComponent } from './components/shopping-list/new-shopping-list/new-shopping-list.component';
import { ShoppingListItemComponent } from './components/shopping-list/shopping-list-item/shopping-list-item.component';
import { ShoppingListResolver } from './components/shopping-list/shopping-list-item/shopping-list-resolver.service';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'recipe', pathMatch: 'full' },
  { path: 'recipe', component: RecipeComponent, canActivate: [AuthGuard] },
  {
    path: 'recipe/new',
    component: NewRecipeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'recipe/edit/:id',
    component: EditRecipeComponent,
    canActivate: [AuthGuard],
    resolve: { recipe: RecipeResolver },
  },
  {
    path: 'recipe/:id',
    component: RecipeItemComponent,
    canActivate: [AuthGuard],
    resolve: { recipe: RecipeResolver },
  },
  { path: 'login', component: AuthComponent },
  {
    path: 'ingredient',
    component: IngredientComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'ingredient/new',
    component: NewIngredientComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'ingredient/edit/:id',
    component: EditIngredientComponent,
    canActivate: [AuthGuard],
    resolve: { ingredient: IngredientResolver },
  },
  {
    path: 'ingredient/:id',
    component: IngredientItemComponent,
    canActivate: [AuthGuard],
    resolve: { ingredient: IngredientResolver },
  },
  {
    path: 'shopping-list',
    component: ShoppingListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'shopping-list/new',
    component: NewShoppingListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'shopping-list/edit/:id',
    component: EditShoppingListComponent,
    canActivate: [AuthGuard],
    resolve: { shoppingList: ShoppingListResolver },
  },
  {
    path: 'shopping-list/:id',
    component: ShoppingListItemComponent,
    canActivate: [AuthGuard],
    resolve: { shoppingList: ShoppingListResolver },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
