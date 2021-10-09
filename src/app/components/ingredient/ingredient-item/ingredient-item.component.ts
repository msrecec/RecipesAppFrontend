import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { Ingredient } from 'src/app/model/ingredient/ingredient';

@Component({
  selector: 'app-ingredient-item',
  templateUrl: './ingredient-item.component.html',
  styleUrls: ['./ingredient-item.component.css'],
})
export class IngredientItemComponent implements OnInit {
  @Input() ingredient!: Ingredient;

  constructor(private route: ActivatedRoute, private _location: Location) {
    this.route.data.subscribe((data: Data) => {
      this.ingredient = data['ingredient'];
    });
  }

  goBack() {
    this._location.back();
  }

  ngOnInit(): void {}
}
