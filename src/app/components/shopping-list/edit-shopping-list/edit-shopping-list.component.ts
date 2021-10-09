import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Data } from '@angular/router';
import { ShoppingListItemNestedSaveCommand } from 'src/app/command/shopping-list/nested/shopping-list-item-nested-save-command';
import { ShoppingListSaveCommand } from 'src/app/command/shopping-list/shopping-list-save-command';
import { ShoppingListUpdateCommand } from 'src/app/command/shopping-list/shopping-list-update-command';
import { Ingredient } from 'src/app/model/ingredient/ingredient';
import { IngredientPaginated } from 'src/app/model/ingredient/ingredient-paginated';
import { ShoppingList } from 'src/app/model/shopping-list/shopping-list';
import { IngredientService } from 'src/app/services/ingredient/ingredient.service';
import { ShoppingListService } from 'src/app/services/shopping-list/shopping-list.service';

@Component({
  selector: 'app-edit-shopping-list',
  templateUrl: './edit-shopping-list.component.html',
  styleUrls: ['./edit-shopping-list.component.css'],
})
export class EditShoppingListComponent implements OnInit {
  shoppingList?: ShoppingList;
  ingredientsPaginated?: IngredientPaginated;
  ingredients?: { ingredient: Ingredient; quantity: number }[] = [];
  selectedIngredients: { ingredient: Ingredient; quantity: number }[] = [];
  shoppingListItems: ShoppingListItemNestedSaveCommand[] = [];

  constructor(
    private route: ActivatedRoute,
    private _location: Location,
    private shoppingListService: ShoppingListService,
    private ingredientService: IngredientService
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
      this.shoppingListItems.push(
        new ShoppingListItemNestedSaveCommand(i.ingredient.id, i.quantity)
      );
    });

    this.shoppingListService
      .putShoppingList(
        new ShoppingListUpdateCommand(
          this.shoppingList?.id || 1,
          this.shoppingList?.name || 'test',
          this.shoppingList?.date || new Date(),
          this.shoppingListItems
        )
      )
      .subscribe(() => {
        this._location.back();
      });
  }

  ngOnInit(): void {
    this.route.data.subscribe((data: Data) => {
      this.shoppingList = data['shoppingList'];
      console.log(this.shoppingList);
      this.shoppingList?.shoppingListItemDTO.forEach((i) => {
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
