import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IngredientPaginated } from 'src/app/model/ingredient-paginated';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  private ingredientURL = 'http://localhost:8080/api/v1/ingredient';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getIngredientsPaginated(page: number = 0): Observable<IngredientPaginated> {
    return this.http
      .get<IngredientPaginated>(this.ingredientURL + '/page/' + page)
      .pipe(
        tap((_) =>
          console.log(`Fetched paginated ingredients from page: ${page}`)
        ),
        catchError(
          this.handleError<IngredientPaginated>('get recipes paginated')
        )
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation);
      console.error(error);
      return of(result as T);
    };
  }
}
