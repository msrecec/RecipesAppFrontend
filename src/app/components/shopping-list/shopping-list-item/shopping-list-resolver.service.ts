import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ShoppingList } from 'src/app/model/shopping-list/shopping-list';
import { ShoppingListService } from 'src/app/services/shopping-list/shopping-list.service';

@Injectable()
export class ShoppingListResolver implements Resolve<ShoppingList> {
  constructor(private shoppingListService: ShoppingListService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ShoppingList> | ShoppingList {
    return this.shoppingListService.getShoppingListById(route.params['id']);
  }
}
