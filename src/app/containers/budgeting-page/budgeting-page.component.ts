import { ActivatedRoute } from '@angular/router';
import { UUID } from 'angular2-uuid';
import { AppState } from './../../reducers/index';
import { ActiveDate, Budget, Transaction, Category } from './../../models/interfaces';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'yb-budgeting-page',
  templateUrl: './budgeting-page.component.html',
  styleUrls: ['./budgeting-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BudgetingPageComponent implements OnInit {

  categories$: Observable<Category[]>;


  budgetAmount$: number = 40000;
  remainingYearlyBudget$: number = 10000;
  remainingMonthlyBudget$: number = 2000;
  selectedMonthAndYear$: ActiveDate = {
    month: 3,
    year: 2017
  };
  spentThisYear$: number = 30000;
  spentThisMonth$: number = 1000;
  getRunningSurplus$: number = 200;

  budgetId: string;
  currentMonth: string;
  currentYear: string;

  constructor(private store: Store<AppState>, private activatedRoute: ActivatedRoute) {
    this.categories$ = this.store.select(s => s.category);

  }

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {
      this.budgetId = params['budgetId'];

      this.selectedMonthAndYear$  = {
        month: params['month'],
        year: params['year']
      };

      this.store.dispatch({
        type: 'LOAD_BUDGET_DATA',
        payload: this.budgetId
      });
    });
  }

  previousMonth() {

  }
  nextMonth() {

  }

  addTransaction(transaction: Transaction) {

    transaction.id = UUID.UUID();
    transaction.budgetId = this.budgetId;

    this.store.dispatch({
      type: 'ADD_TRANSACTION',
      payload: transaction
    });
  }

  addCategory(categoryName: any) {
    const newCategory: Category = {
        name: categoryName.name,
        id: UUID.UUID(),
        budgetId: this.budgetId
    };

    this.store.dispatch({
      type: 'ADD_CATEGORY',
      payload: newCategory
    });
  }


}
