import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { RecipeSaveCommand } from 'src/app/command/recipe/recipe-save-command';
import { RecipeUpdateCommand } from 'src/app/command/recipe/recipe-update-command';
import { Recipe } from 'src/app/model/recipe/recipe';
import { RecipePaginated } from 'src/app/model/recipe/recipe-paginated';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipeURL = 'http://localhost:8080/api/v1/recipe';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getRecipeById(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.recipeURL}/id/${id}`).pipe(
      tap((_) => console.log(`Fetched recipe with id = ${id}`)),
      catchError(
        this.handleError<Recipe>(`Error while getting recipe with id: ${id}`)
      )
    );
  }

  getRecipePaginated(page: number = 0): Observable<RecipePaginated> {
    return this.http
      .get<RecipePaginated>(`${this.recipeURL}/page/${page}`)
      .pipe(
        tap((_) => console.log(`Fetched paginated recipes from page: ${page}`)),
        catchError(
          this.handleError<RecipePaginated>(`get recipes from page ${page}`)
        )
      );
  }

  putRecipe(recipeUpdateCommand: RecipeUpdateCommand): Observable<any> {
    return this.http
      .put(this.recipeURL, recipeUpdateCommand, this.httpOptions)
      .pipe(
        tap((_) =>
          console.log(`Updated recipes with id: ${recipeUpdateCommand.id}`)
        ),
        catchError(
          this.handleError<any>(
            `Error while updating recipes with id: ${recipeUpdateCommand.id}`
          )
        )
      );
  }

  postRecipe(recipeSaveCommand: RecipeSaveCommand): Observable<any> {
    return this.http
      .post<any>(this.recipeURL, recipeSaveCommand, this.httpOptions)
      .pipe(
        tap((_) =>
          console.log(`Posted recipe with name: ${recipeSaveCommand.name}`)
        ),
        catchError(
          this.handleError<any>(
            `Error while posting recipe with name: ${recipeSaveCommand.name}`
          )
        )
      );
  }

  deleteRecipeById(id: number): Observable<any> {
    return this.http.delete<Recipe>(`${this.recipeURL}/id/${id}`).pipe(
      tap((_) => console.log(`Deleted recipe with id: ${id}`)),
      catchError(
        this.handleError<any>(`Error while deleting recipe with id: ${id}`)
      )
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
