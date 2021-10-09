export class Ingredient {
  id: number;
  name: string;
  description: string;
  date: Date;
  rating: number;
  priceHrk: number;
  priceEur: number;

  constructor(
    id: number,
    name: string,
    description: string,
    date: Date,
    rating: number,
    priceHrk: number,
    priceEur: number
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.date = date;
    this.rating = rating;
    this.priceHrk = priceHrk;
    this.priceEur = priceEur;
  }
}
