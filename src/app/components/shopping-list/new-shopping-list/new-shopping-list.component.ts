import { Location } from '@angular/common';
import { Component, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ShoppingListItemNestedSaveCommand } from 'src/app/command/shopping-list/nested/shopping-list-item-nested-save-command';
import { ShoppingListSaveCommand } from 'src/app/command/shopping-list/shopping-list-save-command';
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
  valid: boolean = false;
  saveForm: FormGroup = new FormGroup({});
  name!: string;
  date!: Date;
  ingredientsPaginated?: IngredientPaginated;
  ingredients?: { ingredient: Ingredient; quantity: number }[] = [];
  selectedIngredients: { ingredient: Ingredient; quantity: number }[] = [];
  shoppingListItems: ShoppingListItemNestedSaveCommand[] = [];

  constructor(
    private ingredientService: IngredientService,
    private shoppingListService: ShoppingListService,
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
    if (this.valid) {
      this.selectedIngredients.forEach((i) => {
        this.shoppingListItems.push(
          new ShoppingListItemNestedSaveCommand(i.ingredient.id, i.quantity)
        );
      });

      this.shoppingListService
        .postShoppingList(
          new ShoppingListSaveCommand(
            this.name,
            this.date,
            this.shoppingListItems
          )
        )
        .subscribe(() => {
          this._location.back();
        });
      this.saveForm.reset();
      this.valid = false;
    }
  }

  // formSize(control: FormControl): { [s: string]: boolean } {
  //   if (control.value <= 3 || control.value >= 50) {
  //     return { sizeIsInvalid: true };
  //   }
  //   return null;
  // }

  ngOnInit(): void {
    this.saveForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      date: new FormControl(null, [Validators.required]),
    });

    this.saveForm.statusChanges.subscribe((value) => {
      if (value == 'VALID') {
        this.valid = true;
      } else {
        this.valid = false;
      }
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
