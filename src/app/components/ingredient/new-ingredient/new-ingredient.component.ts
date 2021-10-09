import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { IngredientSaveCommand } from 'src/app/command/ingredient/ingredient-save-command';
import { Ingredient } from 'src/app/model/ingredient/ingredient';
import { IngredientService } from 'src/app/services/ingredient/ingredient.service';

@Component({
  selector: 'app-new-ingredient',
  templateUrl: './new-ingredient.component.html',
  styleUrls: ['./new-ingredient.component.css'],
})
export class NewIngredientComponent implements OnInit {
  name!: string;
  description!: string;
  rating!: number;
  priceHrk!: number;

  constructor(
    private _location: Location,
    private ingredientService: IngredientService
  ) {}

  ngOnInit(): void {}

  goBack() {
    this._location.back();
  }

  save() {
    this.ingredientService
      .postIngredient(
        new IngredientSaveCommand(
          this.name,
          this.description,
          this.rating,
          this.priceHrk
        )
      )
      .pipe(
        tap((_) => console.log(`Creating ingredient with name: ${this.name}`)),
        catchError(
          this.ingredientService.handleError<Ingredient>(
            `error while deleting ingredient with name: ${this.name}`
          )
        )
      )
      .subscribe(() => {
        this.goBack();
      });
  }
}
