import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Recipe } from 'src/app/model/recipe/recipe';
import { RecipePaginated } from 'src/app/model/recipe/recipe-paginated';
import { RecipeService } from 'src/app/services/recipe/recipe.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
})
export class RecipeComponent implements OnInit {
  recipePaginated!: RecipePaginated;

  constructor(private recipeService: RecipeService, private router: Router) {}

  ngOnInit(): void {
    this.recipeService.getRecipePaginated().subscribe((recipePaginated) => {
      this.recipePaginated = recipePaginated;
      console.log(recipePaginated);
    });
  }

  getPage(pageEvent: PageEvent): void {
    this.recipeService
      .getRecipePaginated(pageEvent.pageIndex)
      .subscribe((recipePaginated) => {
        this.recipePaginated = recipePaginated;
        console.log(recipePaginated);
      });
  }

  onClick(recipe: Recipe) {
    console.log(recipe);
    this.router.navigate(['recipe', recipe.id]);
  }

  addNewRecipe() {
    this.router.navigate(['recipe', 'new']);
  }
}
