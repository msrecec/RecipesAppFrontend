import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { IngredientUpdateCommand } from 'src/app/command/ingredient/ingredient-update-command';
import { Ingredient } from 'src/app/model/ingredient/ingredient';
import { IngredientService } from 'src/app/services/ingredient/ingredient.service';

@Component({
  selector: 'app-edit-ingredient',
  templateUrl: './edit-ingredient.component.html',
  styleUrls: ['./edit-ingredient.component.css'],
})
export class EditIngredientComponent implements OnInit {
  ingredient!: Ingredient;

  constructor(
    private route: ActivatedRoute,
    private _location: Location,
    private ingredientsService: IngredientService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data: Data) => {
      console.log(this.ingredient);
      this.ingredient = data['ingredient'];
    });
  }

  goBack() {
    this._location.back();
  }

  update() {
    this.ingredientsService
      .updateIngredient(
        new IngredientUpdateCommand(
          this.ingredient.id,
          this.ingredient.name,
          this.ingredient.description,
          this.ingredient.rating,
          this.ingredient.priceHrk
        )
      )
      .pipe(
        tap((_) =>
          console.log(`Updating ingredient with id: ${this.ingredient.id}`)
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
}
