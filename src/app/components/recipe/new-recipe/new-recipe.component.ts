import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css'],
})
export class NewRecipeComponent implements OnInit {
  saveForm: FormGroup = new FormGroup({});
  name!: string;
  shortDescription!: string;
  description!: string;
  ingredientsPaginated?: IngredientPaginated;
  ingredients?: { ingredient: Ingredient; quantity: number }[] = [];
  selectedIngredients: { ingredient: Ingredient; quantity: number }[] = [];
  recipeItems: RecipeItemNestedSaveCommand[] = [];

  constructor(
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
          this.name,
          this.shortDescription,
          this.description,
          this.recipeItems
        )
      )
      .subscribe(() => {
        this._location.back();
      });
    this.saveForm.reset();
  }

  // formSize(control: FormControl): { [s: string]: boolean } {
  //   if (control.value <= 3 || control.value >= 50) {
  //     return { sizeIsInvalid: true };
  //   }
  //   return null;
  // }

  ngOnInit(): void {
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
