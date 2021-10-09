import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ShoppingListSaveCommand } from 'src/app/command/shopping-list/shopping-list-save-command';
import { ShoppingListUpdateCommand } from 'src/app/command/shopping-list/shopping-list-update-command';
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

  putShoppingList(
    shoppingListUpdateCommand: ShoppingListUpdateCommand
  ): Observable<any> {
    return this.http
      .put(this.shoppingListURL, shoppingListUpdateCommand, this.httpOptions)
      .pipe(
        tap((_) =>
          console.log(
            `Updated shopping list with id: ${shoppingListUpdateCommand.id}`
          )
        ),
        catchError(
          this.handleError<any>(
            `Error while updating shopping list with id: ${shoppingListUpdateCommand.id}`
          )
        )
      );
  }

  postShoppingList(shoppingListSaveCommand: ShoppingListSaveCommand) {
    return this.http
      .post<any>(
        this.shoppingListURL,
        shoppingListSaveCommand,
        this.httpOptions
      )
      .pipe(
        tap((_) =>
          console.log(
            `Posted shopping list with name: ${shoppingListSaveCommand.name}`
          )
        ),
        catchError(
          this.handleError<any>(
            `Error while posting shopping list with name ${shoppingListSaveCommand.name}`
          )
        )
      );
  }

  deleteShoppingListById(id: number): Observable<any> {
    console.log('deleting shopping list');
    return this.http
      .delete<ShoppingList>(`${this.shoppingListURL}/id/${id}`)
      .pipe(
        tap((_) => console.log(`Deleted shopping list with id: ${id}`)),
        catchError(
          this.handleError<ShoppingList>(
            `Error while deleting shopping list with id: ${id}`
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
