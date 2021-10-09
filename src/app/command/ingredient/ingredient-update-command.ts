export class IngredientUpdateCommand {
  id: number;
  name: string;
  description: string;
  rating: number;
  priceHrk: number;
  constructor(
    id: number,
    name: string,
    description: string,
    rating: number,
    priceHrk: number
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.rating = rating;
    this.priceHrk = priceHrk;
  }
}
