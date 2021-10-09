import { ShoppingListItemNestedSaveCommand } from './nested/shopping-list-item-nested-save-command';

export class ShoppingListUpdateCommand {
  id: number;
  name: string;
  date: Date;
  shoppingListItems: ShoppingListItemNestedSaveCommand[];
  constructor(
    id: number,
    name: string,
    date: Date,
    shoppingListItems: ShoppingListItemNestedSaveCommand[]
  ) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.shoppingListItems = shoppingListItems;
  }
}
