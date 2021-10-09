export class IngredientSaveCommand {
  name: string;
  description: string;
  rating: number;
  priceHrk: number;
  constructor(
    name: string,
    description: string,
    rating: number,
    priceHrk: number
  ) {
    this.name = name;
    this.description = description;
    this.rating = rating;
    this.priceHrk = priceHrk;
  }
}
