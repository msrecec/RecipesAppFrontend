import { ShoppingList } from './shopping-list';

export interface ShoppingListPaginated {
  shoppingListDTO: ShoppingList[];
  totalPages: number;
  totalElements: number;
}
