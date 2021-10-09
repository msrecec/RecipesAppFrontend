import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { catchError, tap } from 'rxjs/operators';
import { IngredientSaveCommand } from 'src/app/command/ingredient/ingredient-save-command';
import { IngredientUpdateCommand } from 'src/app/command/ingredient/ingredient-update-command';
import { Ingredient } from 'src/app/model/ingredient/ingredient';
import { IngredientPaginated } from 'src/app/model/ingredient/ingredient-paginated';

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  private ingredientURL = 'http://localhost:8080/api/v1/ingredient';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getIngredientById(id: number = 1): Observable<Ingredient> {
    return this.http.get<Ingredient>(`${this.ingredientURL}/id/${id}`).pipe(
      tap((_) => console.log(`Fetched ingredient by id: ${id}`)),
      catchError(this.handleError<Ingredient>(`get ingredient by id: ${id}`))
    );
  }

  getIngredientsPaginated(page: number = 0): Observable<IngredientPaginated> {
    return this.http
      .get<IngredientPaginated>(`${this.ingredientURL}/page/${page}`)
      .pipe(
        tap((_) =>
          console.log(`Fetched paginated ingredients from page: ${page}`)
        ),
        catchError(
          this.handleError<IngredientPaginated>(
            `get recipes from page: ${page}`
          )
        )
      );
  }

  updateIngredient(ingredient: IngredientUpdateCommand): Observable<any> {
    return this.http.put(this.ingredientURL, ingredient, this.httpOptions).pipe(
      tap((_) => console.log(`updated ingredient with id: ${ingredient.id}`)),
      catchError(
        this.handleError<any>(`update ingredient with id: ${ingredient.id}`)
      )
    );
  }

  postIngredient(ingredient: IngredientSaveCommand): Observable<any> {
    return this.http
      .post(this.ingredientURL, ingredient, this.httpOptions)
      .pipe(
        tap((_) =>
          console.log(`created ingredient with name: ${ingredient.name}`)
        ),
        catchError(
          this.handleError<any>(
            `create ingredient with name: ${ingredient.name}`
          )
        )
      );
  }

  deleteIngredientById(id: number): Observable<any> {
    return this.http.delete<Ingredient>(`${this.ingredientURL}/id/${id}`).pipe(
      tap((_) => console.log(`deleted ingredient with id: ${id}`)),
      catchError(this.handleError<Ingredient>('delete ingredient'))
    );
  }

  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation);
      console.error(error);
      return of(result as T);
    };
  }
}
