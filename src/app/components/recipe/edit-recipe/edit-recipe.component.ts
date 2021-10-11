import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { RecipeItemNestedSaveCommand } from 'src/app/command/recipe/nested/recipe-item-nested-save-command';
import { RecipeSaveCommand } from 'src/app/command/recipe/recipe-save-command';
import { ShoppingListItemNestedSaveCommand } from 'src/app/command/shopping-list/nested/shopping-list-item-nested-save-command';
import { Ingredient } from 'src/app/model/ingredient/ingredient';
import { IngredientPaginated } from 'src/app/model/ingredient/ingredient-paginated';
import { Recipe } from 'src/app/model/recipe/recipe';
import { RecipePaginated } from 'src/app/model/recipe/recipe-paginated';
import { IngredientService } from 'src/app/services/ingredient/ingredient.service';
import { RecipeService } from 'src/app/services/recipe/recipe.service';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css'],
})
export class EditRecipeComponent implements OnInit {
  recipe?: Recipe;
  ingredientsPaginated?: IngredientPaginated;
  ingredients?: { ingredient: Ingredient; quantity: number }[] = [];
  selectedIngredients: { ingredient: Ingredient; quantity: number }[] = [];
  recipeItems: RecipeItemNestedSaveCommand[] = [];

  constructor(
    private route: ActivatedRoute,
    private ingredientService: IngredientService,
    private recipeService: RecipeService,
    private _location: Location
  ) {}

  getPage(pageEvent: PageEvent): void {
    this.ingredientService
      .getIngredientsPaginated(pageEvent.pageIndex)
      .subscribe((ingredientsPaginated) => {
        this.ingredientsPaginated = undefined;
        this.ingredients = [];
        this.ingredientsPaginated = ingredientsPaginated;
        ingredientsPaginated.ingredientDTO.forEach((i) => {
          this.ingredients?.push({ ingredient: i, quantity: 0 });
        });
      });
  }

  addIngredient(ingredient: { ingredient: Ingredient; quantity: number }) {
    if (!this.isSelected(ingredient.ingredient)) {
      this.selectedIngredients.push(ingredient);
    }
  }

  removeIngredient(ingredient: { ingredient: Ingredient; quantity: number }) {
    if (this.isSelected(ingredient.ingredient)) {
      this.selectedIngredients = this.selectedIngredients.filter(
        (i) => i.ingredient.id !== ingredient.ingredient.id
      );
    }
  }

  isSelected(ingredient: Ingredient) {
    let flag = false;
    this.selectedIngredients?.forEach((i) => {
      if (i.ingredient.id === ingredient.id) {
        flag = true;
      }
    });
    return flag;
  }

  goBack() {
    this._location.back();
  }

  save() {
    this.selectedIngredients.forEach((i) => {
      this.recipeItems.push(
        new RecipeItemNestedSaveCommand(i.ingredient.id, i.quantity)
      );
    });

    this.recipeService
      .postRecipe(
        new RecipeSaveCommand(
          this.recipe?.name || 'name',
          this.recipe?.shortDescription || 'sd',
          this.recipe?.description || 'd',
          this.recipeItems
        )
      )
      .subscribe(() => {
        this._location.back();
      });
  }

  // formSize(control: FormControl): { [s: string]: boolean } {
  //   if (control.value <= 3 || control.value >= 50) {
  //     return { sizeIsInvalid: true };
  //   }
  //   return null;
  // }

  ngOnInit(): void {
    this.route.data.subscribe((data: Data) => {
      this.recipe = data['recipe'];
      console.log(this.recipe);
      this.recipe?.recipeItemDTO.forEach((i) => {
        this.selectedIngredients.push({
          ingredient: i.ingredientDTO,
          quantity: i.quantity,
        });
      });
    });

    this.ingredientService
      .getIngredientsPaginated()
      .subscribe((ingredientsPaginated) => {
        this.ingredientsPaginated = undefined;
        this.ingredients = [];
        this.ingredientsPaginated = ingredientsPaginated;
        ingredientsPaginated.ingredientDTO.forEach((i) => {
          this.ingredients?.push({ ingredient: i, quantity: 0 });
        });
      });
  }
}
