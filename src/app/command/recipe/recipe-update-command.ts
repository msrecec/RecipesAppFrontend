import { RecipeItemNestedSaveCommand } from './nested/recipe-item-nested-save-command';

export class RecipeUpdateCommand {
  id: number;
  name: string;
  shortDescription: string;
  description: string;
  recipeItems: RecipeItemNestedSaveCommand[];
  constructor(
    id: number,
    name: string,
    shortDescription: string,
    description: string,
    recipeItems: RecipeItemNestedSaveCommand[]
  ) {
    this.id = id;
    this.name = name;
    this.shortDescription = shortDescription;
    this.description = description;
    this.recipeItems = recipeItems;
  }
}
