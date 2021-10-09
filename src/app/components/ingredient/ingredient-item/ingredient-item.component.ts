import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { Ingredient } from 'src/app/model/ingredient/ingredient';
import { IngredientService } from 'src/app/services/ingredient/ingredient.service';
import { IngredientDialogComponent } from './ingredient-dialog/ingredient-dialog.component';

@Component({
  selector: 'app-ingredient-item',
  templateUrl: './ingredient-item.component.html',
  styleUrls: ['./ingredient-item.component.css'],
})
export class IngredientItemComponent implements OnInit {
  ingredient!: Ingredient;

  constructor(
    private route: ActivatedRoute,
    private _location: Location,
    private ingredientsService: IngredientService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.route.data.subscribe((data: Data) => {
      this.ingredient = data['ingredient'];
    });
  }

  goBack() {
    this._location.back();
  }

  openDialog() {
    let dialogRef = this.dialog.open(IngredientDialogComponent, {
      data: this.ingredient,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  editIngredient() {
    this.router.navigate(['ingredient', 'edit', this.ingredient.id]);
  }

  ngOnInit(): void {}
}
