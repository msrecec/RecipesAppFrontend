import { Recipe } from './recipe';

export class RecipePaginated {
  recipeDTO: Recipe[];
  totalPages: number;
  totalElements: number;
  constructor(recipeDTO: Recipe[], totalPages: number, totalElements: number) {
    this.recipeDTO = recipeDTO;
    this.totalPages = totalPages;
    this.totalElements = totalElements;
  }
}
