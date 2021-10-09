import { Component, Injectable, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Ingredient } from 'src/app/model/ingredient/ingredient';
import { IngredientPaginated } from 'src/app/model/ingredient/ingredient-paginated';
import { IngredientService } from 'src/app/services/ingredient/ingredient.service';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.css'],
})
@Injectable()
export class IngredientComponent implements OnInit {
  ingredientPaginated!: IngredientPaginated;
  ingredientCard?: Ingredient;

  constructor(
    private ingredientService: IngredientService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ingredientService
      .getIngredientsPaginated()
      .subscribe((ingredientsPaginated) => {
        this.ingredientPaginated = ingredientsPaginated;
        console.log(this.ingredientPaginated);
      });
  }

  getPage(pageEvent: PageEvent): void {
    this.ingredientService
      .getIngredientsPaginated(pageEvent.pageIndex)
      .subscribe((ingredientsPaginated) => {
        this.ingredientPaginated = ingredientsPaginated;
        console.log(this.ingredientPaginated);
      });
  }

  onClick(ingredient: Ingredient) {
    console.log(ingredient);
    this.router.navigate(['ingredient', ingredient.id]);
  }

  onEnter(ingredient: Ingredient) {
    this.ingredientCard = ingredient;
  }

  onLeave() {
    this.ingredientCard = undefined;
  }
}
