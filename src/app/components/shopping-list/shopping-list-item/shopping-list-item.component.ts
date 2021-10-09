import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { ShoppingList } from 'src/app/model/shopping-list/shopping-list';
import { ShoppingListService } from 'src/app/services/shopping-list/shopping-list.service';
import { ShoppingListDialogComponent } from './shopping-list-dialog/shopping-list-dialog.component';

@Component({
  selector: 'app-shopping-list-item',
  templateUrl: './shopping-list-item.component.html',
  styleUrls: ['./shopping-list-item.component.css'],
})
export class ShoppingListItemComponent implements OnInit {
  shoppingList!: ShoppingList;

  constructor(
    private route: ActivatedRoute,
    private _location: Location,
    private router: Router,
    public dialog: MatDialog
  ) {}

  goBack() {
    this._location.back();
  }

  openDialog() {
    let dialogRef = this.dialog.open(ShoppingListDialogComponent, {
      data: this.shoppingList,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  editShoppingList() {
    this.router.navigate(['shopping-list', 'edit', this.shoppingList.id]);
  }

  ngOnInit(): void {
    this.route.data.subscribe((data: Data) => {
      console.log(data['shoppingList']);
      this.shoppingList = data['shoppingList'];
    });
  }
}
