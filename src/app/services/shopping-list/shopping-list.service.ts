import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ShoppingList } from 'src/app/model/shopping-list/shopping-list';
import { ShoppingListPaginated } from 'src/app/model/shopping-list/shopping-list-paginated';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  private shoppingListURL = 'http://localhost:8080/api/v1/shopping-list';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getShoppingListById(id: number): Observable<ShoppingList> {
    return this.http.get<ShoppingList>(`${this.shoppingListURL}/id/${id}`).pipe(
      tap((_) => console.log(`Fetched shopping list with id = ${id}`)),
      catchError(
        this.handleError<ShoppingList>(
          `Error while getting shopping list with id: ${id}`
        )
      )
    );
  }

  getShoppingListPaginated(
    page: number = 0
  ): Observable<ShoppingListPaginated> {
    return this.http
      .get<ShoppingListPaginated>(`${this.shoppingListURL}/page/${page}`)
      .pipe(
        tap((_) =>
          console.log(`Fetched paginated shopping list from page: ${page}`)
        ),
        catchError(
          this.handleError<ShoppingListPaginated>(
            `get shopping list from page: ${page}`
          )
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
