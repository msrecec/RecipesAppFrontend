import { Location } from '@angular/common';
import { Component, OnChanges, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ShoppingListItemNestedSaveCommand } from 'src/app/command/shopping-list/nested/shopping-list-item-nested-save-command';
import { Ingredient } from 'src/app/model/ingredient/ingredient';
import { IngredientPaginated } from 'src/app/model/ingredient/ingredient-paginated';
import { ShoppingList } from 'src/app/model/shopping-list/shopping-list';
import { IngredientService } from 'src/app/services/ingredient/ingredient.service';
import { ShoppingListService } from 'src/app/services/shopping-list/shopping-list.service';

@Component({
  selector: 'app-new-shopping-list',
  templateUrl: './new-shopping-list.component.html',
  styleUrls: ['./new-shopping-list.component.css'],
})
export class NewShoppingListComponent implements OnInit {
  name!: string;
  ingredients?: Ingredient[];
  ingredientsPaginated?: IngredientPaginated;
  selectedIngredients: Ingredient[] = [];

  constructor(
    private ingredientService: IngredientService,
    private _location: Location
  ) {}

  getPage(pageEvent: PageEvent): void {
    this.ingredientService
      .getIngredientsPaginated(pageEvent.pageIndex)
      .subscribe((ingredientsPaginated) => {
        this.ingredientsPaginated = ingredientsPaginated;
        this.ingredients = ingredientsPaginated.ingredientDTO;
      });
  }

  addIngredient(ingredient: Ingredient) {
    if (!this.isSelected(ingredient)) {
      this.selectedIngredients.push(ingredient);
    }
  }

  removeIngredient(ingredient: Ingredient) {
    if (this.isSelected(ingredient)) {
      this.selectedIngredients = this.selectedIngredients.filter(
        (i) => i.id !== ingredient.id
      );
    }
  }

  isSelected(ingredient: Ingredient) {
    let flag = false;
    this.selectedIngredients?.forEach((i) => {
      if (i.id === ingredient.id) {
        flag = true;
      }
    });
    return flag;
  }

  goBack() {
    this._location.back();
  }

  save() {}

  ngOnInit(): void {
    this.ingredientService
      .getIngredientsPaginated()
      .subscribe((ingredientsPaginated) => {
        this.ingredientsPaginated = ingredientsPaginated;
        this.ingredients = ingredientsPaginated.ingredientDTO;
      });
  }
}
