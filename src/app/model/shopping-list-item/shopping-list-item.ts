import { Ingredient } from '../ingredient/ingredient';

export interface ShoppingListItem {
  id: number;
  quantity: number;
  ingredient: Ingredient;
}
