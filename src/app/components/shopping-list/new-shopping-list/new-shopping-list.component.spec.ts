import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewShoppingListComponent } from './new-shopping-list.component';

describe('NewShoppingListComponent', () => {
  let component: NewShoppingListComponent;
  let fixture: ComponentFixture<NewShoppingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewShoppingListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewShoppingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
