import { Component, Injectable, OnInit } from '@angular/core';
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

  constructor(private ingredientService: IngredientService) {}

  ngOnInit(): void {
    this.ingredientService
      .getIngredientsPaginated()
      .subscribe((ingredientsPaginated) => {
        this.ingredientPaginated = ingredientsPaginated;
        console.log(this.ingredientPaginated);
      });
  }
}
