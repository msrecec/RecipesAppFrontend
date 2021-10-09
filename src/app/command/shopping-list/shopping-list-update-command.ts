import { ShoppingListItemNestedSaveCommand } from './nested/shopping-list-item-nested-save-command';

export interface ShoppingListUpdateCommand {
  id: number;
  name: string;
  date: Date;
  shoppingListItems: ShoppingListItemNestedSaveCommand[];
}
