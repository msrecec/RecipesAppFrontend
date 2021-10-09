import { ShoppingListItemNestedSaveCommand } from './nested/shopping-list-item-nested-save-command';

export interface ShoppingListSaveCommand {
  name: string;
  date: Date;
  shoppingListItems: ShoppingListItemNestedSaveCommand[];
}
