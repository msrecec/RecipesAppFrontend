import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { Ingredient } from 'src/app/model/ingredient/ingredient';
import { IngredientService } from 'src/app/services/ingredient/ingredient.service';

@Component({
  selector: 'app-ingredient-item',
  templateUrl: './ingredient-item.component.html',
  styleUrls: ['./ingredient-item.component.css'],
})
export class IngredientItemComponent implements OnInit {
  ingredient!: Ingredient;

  constructor(
    private route: ActivatedRoute,
    private _location: Location,
    private ingredientsService: IngredientService,
    private router: Router
  ) {
    this.route.data.subscribe((data: Data) => {
      this.ingredient = data['ingredient'];
    });
  }

  goBack() {
    this._location.back();
  }

  deleteIngredient() {
    this.ingredientsService
      .deleteIngredientById(this.ingredient.id)
      .pipe(
        tap((_) =>
          console.log(`Deleted ingredient with id: ${this.ingredient.id}`)
        ),
        catchError(
          this.ingredientsService.handleError<Ingredient>(
            `error while deleting ingredient with id: ${this.ingredient.id}`
          )
        )
      )
      .subscribe(() => {
        this.goBack();
      });
  }

  editIngredient() {
    this.router.navigate(['ingredient', 'edit', this.ingredient.id]);
  }

  ngOnInit(): void {}
}
