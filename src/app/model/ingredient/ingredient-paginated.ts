import { Ingredient } from './ingredient';

export interface IngredientPaginated {
  ingredientDTO: Ingredient[];
  totalPages: number;
  totalElements: number;
}
