import { RecipeItem } from '../recipe-item/recipe-item';

export class Recipe {
  id: number;
  name: string;
  shortDescription: string;
  description: string;
  date: Date;
  totalPriceHrk: number;
  totalPriceEur: number;
  recipeItemDTO: RecipeItem[];
  constructor(
    id: number,
    name: string,
    shortDescription: string,
    description: string,
    date: Date,
    totalPriceHrk: number,
    totalPriceEur: number,
    recipeItemDTO: RecipeItem[]
  ) {
    this.id = id;
    this.name = name;
    this.shortDescription = shortDescription;
    this.description = description;
    this.date = date;
    this.totalPriceHrk = totalPriceHrk;
    this.totalPriceEur = totalPriceEur;
    this.recipeItemDTO = recipeItemDTO;
  }
}
