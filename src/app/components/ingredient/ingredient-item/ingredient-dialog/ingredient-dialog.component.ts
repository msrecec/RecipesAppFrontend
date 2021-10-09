import { Location } from '@angular/common';
import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { Ingredient } from 'src/app/model/ingredient/ingredient';
import { IngredientService } from 'src/app/services/ingredient/ingredient.service';

@Component({
  selector: 'app-ingredient-dialog',
  templateUrl: './ingredient-dialog.component.html',
  styleUrls: ['./ingredient-dialog.component.css'],
})
@Injectable()
export class IngredientDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public ingredient: any,
    private ingredientsService: IngredientService,
    private _location: Location,
    private router: Router
  ) {}

  goBack() {
    this.router.navigate(['ingredient']);
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

  ngOnInit(): void {}
}
