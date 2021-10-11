import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Ingredient } from 'src/app/model/ingredient/ingredient';
import { Recipe } from 'src/app/model/recipe/recipe';
import { RecipeService } from 'src/app/services/recipe/recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css'],
})
export class RecipeItemComponent implements OnInit {
  recipe!: Recipe;

  constructor(
    private route: ActivatedRoute,
    private _location: Location,
    private router: Router,
    public dialog: MatDialog,
    private recipeService: RecipeService
  ) {}

  goBack() {
    this._location.back();
  }

  deleteShoppingList() {
    this.recipeService.deleteRecipeById(this.recipe.id).subscribe((back) => {
      this.goBack();
    });
  }

  openDialog() {
    // let dialogRef = this.dialog.open(ShoppingListDialogComponent, {
    //   data: this.shoppingList,
    // });
    // dialogRef.afterClosed().subscribe((result) => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }

  editShoppingList() {
    this.router.navigate(['recipe', 'edit', this.recipe.id]);
  }

  onClick(ingredient: Ingredient) {
    console.log(ingredient);
    this.router.navigate(['ingredient', ingredient.id]);
  }

  ngOnInit(): void {
    this.route.data.subscribe((data: Data) => {
      console.log(data['recipe']);
      this.recipe = data['recipe'];
    });
  }
}
