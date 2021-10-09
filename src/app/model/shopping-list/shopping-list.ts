import { ShoppingListItem } from '../shopping-list-item/shopping-list-item';

export interface ShoppingList {
  id: number;
  name: string;
  date: Date;
  totalPriceHrk: number;
  totalPriceEur: number;
  shoppingListItemDTO: ShoppingListItem[];
}
