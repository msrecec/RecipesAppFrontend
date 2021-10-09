import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ShoppingList } from 'src/app/model/shopping-list/shopping-list';
import { ShoppingListPaginated } from 'src/app/model/shopping-list/shopping-list-paginated';
import { ShoppingListService } from 'src/app/services/shopping-list/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  shoppingListPaginated!: ShoppingListPaginated;

  constructor(
    private shoppingListService: ShoppingListService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.shoppingListService
      .getShoppingListPaginated()
      .subscribe((shoppingListPaginated) => {
        this.shoppingListPaginated = shoppingListPaginated;
        console.log(shoppingListPaginated);
      });
  }

  getPage(pageEvent: PageEvent): void {
    this.shoppingListService
      .getShoppingListPaginated(pageEvent.pageIndex)
      .subscribe((shoppingListPaginated) => {
        this.shoppingListPaginated = shoppingListPaginated;
        console.log(shoppingListPaginated);
      });
  }

  onClick(shoppingList: ShoppingList) {
    console.log(shoppingList);
    this.router.navigate(['shopping-list', shoppingList.id]);
  }

  addNewShoppingList() {
    this.router.navigate(['shopping-list', 'new']);
  }
}
