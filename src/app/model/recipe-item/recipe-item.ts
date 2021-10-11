import { Ingredient } from '../ingredient/ingredient';

export class RecipeItem {
  id: number;
  quantity: number;
  ingredientDTO: Ingredient;
  constructor(id: number, quantity: number, ingredientDTO: Ingredient) {
    this.id = id;
    this.quantity = quantity;
    this.ingredientDTO = ingredientDTO;
  }
}
