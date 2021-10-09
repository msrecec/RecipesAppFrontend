import { ShoppingListItemNestedSaveCommand } from './nested/shopping-list-item-nested-save-command';

export class ShoppingListSaveCommand {
  name: string;
  date: Date;
  shoppingListItems: ShoppingListItemNestedSaveCommand[];

  constructor(
    name: string,
    date: Date,
    shoppingListItems: ShoppingListItemNestedSaveCommand[]
  ) {
    this.name = name;
    this.date = date;
    this.shoppingListItems = shoppingListItems;
  }
}
