import { RecipeItemNestedSaveCommand } from './nested/recipe-item-nested-save-command';

export class RecipeSaveCommand {
  name: string;
  shortDescription: string;
  description: string;
  recipeItems: RecipeItemNestedSaveCommand[];
  constructor(
    name: string,
    shortDescription: string,
    description: string,
    recipeItems: RecipeItemNestedSaveCommand[]
  ) {
    this.name = name;
    this.shortDescription = shortDescription;
    this.description = description;
    this.recipeItems = recipeItems;
  }
}
