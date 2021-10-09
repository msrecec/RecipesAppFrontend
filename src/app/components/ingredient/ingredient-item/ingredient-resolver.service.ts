import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Ingredient } from 'src/app/model/ingredient/ingredient';
import { IngredientService } from 'src/app/services/ingredient/ingredient.service';

@Injectable()
export class IngredientResolver implements Resolve<Ingredient> {
  constructor(private ingredientService: IngredientService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Ingredient> | Ingredient {
    return this.ingredientService.getIngredientById(route.params['id']);
  }
}
